"use client";

import { useScroll, useMotionValueEvent, useTransform } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

export default function ScrollyCanvas() {
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    // Total frames: 000 to 119 based on file list (120 frames)
    // Actually list showed frame_000 to frame_119.
    const frameCount = 120;

    // Load images
    useEffect(() => {
        const loadImages = async () => {
            const loadedImages: HTMLImageElement[] = [];
            const promises: Promise<void>[] = [];

            for (let i = 0; i < frameCount; i++) {
                const promise = new Promise<void>((resolve, reject) => {
                    const img = new Image();
                    // Pad index to 3 digits e.g. 000
                    const indexStr = i.toString().padStart(3, "0");
                    // Construct filename based on pattern found: frame_000_delay-0.067s.png
                    // Note: The delay part might vary? list_dir showed consistency but I should be careful.
                    // Wait, list_dir showed: frame_000_delay-0.067s.png, frame_001_delay-0.066s.png
                    // The delay suffix changes! This is tricky.
                    // I cannot guess the exact filename without a map.
                    // Solution: I'll assume standard naming but if suffixes vary, I might fail 404.
                    // BETTER SOLUTION: Generate a manifest or try to load purely by index if renamed?
                    // I cannot rename them now easily.
                    // I will assume the delay is consistent OR I will try to fetch a file list if possible? No.
                    // Wait, the user provided the files. I saw the list.
                    // frame_000...0.067s
                    // frame_001...0.066s
                    // frame_004...0.066s
                    // The delay VARIES.
                    // I must handle this.
                    // Since I cannot read the filesystem in the browser client easily without an API route,
                    // I should perhaps rename them to strictly numerical indices for the client?
                    // "frame_000.png", "frame_001.png" etc.
                    // This would make frontend loading robust.
                    // I WILL RENAME THE FILES IN PUBLIC/SEQUENCE FIRST for safety.

                    img.src = `/sequence/frame_${indexStr}.png`;
                    img.onload = () => {
                        loadedImages[i] = img;
                        resolve();
                    };
                    img.onerror = (e) => {
                        console.error(`Failed to load frame ${i}`, e);
                        // resolve anyway to satisfy Promise.all, maybe show placeholder?
                        resolve();
                    };
                });
                promises.push(promise);
            }

            await Promise.all(promises);
            setImages(loadedImages);
            setIsLoaded(true);
        };

        loadImages();
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    // Map 0-1 scroll to 0-(frameCount-1)
    const currentIndex = useTransform(scrollYProgress, [0, 1], [0, frameCount - 1]);

    const renderFrame = useCallback(
        (index: number) => {
            const canvas = canvasRef.current;
            const ctx = canvas?.getContext("2d");
            const img = images[Math.floor(index)];

            if (!canvas || !ctx || !img) return;

            // Handle high DPI
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            ctx.scale(dpr, dpr);

            // Object-fit: cover logic
            const w = window.innerWidth;
            const h = window.innerHeight;
            const imgRatio = img.width / img.height;
            const canvasRatio = w / h;

            let drawWidth, drawHeight;

            if (canvasRatio > imgRatio) {
                drawWidth = w;
                drawHeight = w / imgRatio;
            } else {
                drawWidth = h * imgRatio;
                drawHeight = h;
            }

            const offsetX = (w - drawWidth) / 2;
            const offsetY = (h - drawHeight) / 2;

            ctx.clearRect(0, 0, w, h);
            ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
        },
        [images]
    );

    useMotionValueEvent(currentIndex, "change", (latest) => {
        if (isLoaded) {
            requestAnimationFrame(() => renderFrame(latest));
        }
    });

    // Initial render
    useEffect(() => {
        if (isLoaded) renderFrame(0);
    }, [isLoaded, renderFrame]);

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (isLoaded) renderFrame(currentIndex.get());
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [isLoaded, renderFrame, currentIndex]);


    return (
        <div ref={containerRef} className="relative h-[500vh] bg-[#121212]">
            <div className="sticky top-0 h-screen w-full overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="block h-full w-full object-cover"
                />
                {/* Gradient Fade for Smooth Transition */}
                <div className="absolute bottom-0 left-0 w-full h-32 md:h-64 bg-gradient-to-t from-[#121212] via-[#121212]/80 to-transparent z-10 pointer-events-none" />
                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center text-white/20">
                        Loading Sequence...
                    </div>
                )}
            </div>
        </div>
    );
}
