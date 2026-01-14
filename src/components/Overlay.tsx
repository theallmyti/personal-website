"use client";

import { motion, useScroll, useTransform } from "framer-motion";

export default function Overlay() {
    const { scrollYProgress } = useScroll();

    // Animations configuration
    // Section 1: 0% - 15% visible, fade out by 25%
    const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.25], [1, 1, 0]);
    const y1 = useTransform(scrollYProgress, [0, 0.25], [0, -50]);

    // Section 2: 25% start, 30% visible, fade out by 50%
    const opacity2 = useTransform(scrollYProgress, [0.25, 0.35, 0.45, 0.55], [0, 1, 1, 0]);
    const y2 = useTransform(scrollYProgress, [0.25, 0.55], [50, -50]);

    // Section 3: 55% start, 60% visible, fade out by 85%
    const opacity3 = useTransform(scrollYProgress, [0.55, 0.65, 0.75, 0.85], [0, 1, 1, 0]);
    const y3 = useTransform(scrollYProgress, [0.55, 0.85], [50, -50]);

    return (
        <div className="fixed inset-0 z-10 pointer-events-none flex flex-col justify-center px-8 md:px-20 text-white mix-blend-difference">
            {/* Section 1: Center */}
            <motion.div
                style={{ opacity: opacity1, y: y1 }}
                className="absolute inset-0 flex items-center justify-center p-4"
            >
                <h1 className="text-4xl md:text-7xl font-bold tracking-tighter text-center">
                    Aditya Prasad <br /> <span className="font-light text-white/80">Creative Developer</span>
                </h1>
            </motion.div>

            {/* Section 2: Left */}
            <motion.div
                style={{ opacity: opacity2, y: y2 }}
                className="absolute inset-0 flex items-center justify-start p-10 md:p-32"
            >
                <h2 className="text-3xl md:text-6xl font-medium max-w-2xl leading-tight text-white/90">
                    I build <span className="text-white">digital experiences</span>.
                </h2>
            </motion.div>

            {/* Section 3: Right */}
            <motion.div
                style={{ opacity: opacity3, y: y3 }}
                className="absolute inset-0 flex items-center justify-end p-10 md:p-32"
            >
                <h2 className="text-3xl md:text-6xl font-medium max-w-2xl text-right leading-tight text-white/90">
                    Bridging <span className="text-white">design</span> <br /> and engineering.
                </h2>
            </motion.div>
        </div>
    );
}
