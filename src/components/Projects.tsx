"use client";

import { motion } from "framer-motion";

interface Project {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    language: string | null;
    stargazers_count: number;
    updated_at: string;
}

export default function Projects({ projects }: { projects: Project[] }) {
    return (
        <section className="relative z-20 bg-[#121212] min-h-screen py-32 px-6 md:px-20">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="mb-20"
                >
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Selected Works</h2>
                    <div className="h-1 w-20 bg-white/20"></div>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {projects.map((project, index) => (
                        <motion.a
                            href={project.html_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 p-8 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/20 flex flex-col cursor-pointer"
                        >

                            <div className="relative z-10 flex flex-col h-full">
                                <div className="flex justify-between items-start mb-4">
                                    <p className="text-xs font-mono text-white/50">{project.language || "Development"}</p>
                                    {project.stargazers_count > 0 && (
                                        <span className="text-xs font-mono text-white/40 flex items-center gap-1">
                                            ★ {project.stargazers_count}
                                        </span>
                                    )}
                                </div>

                                <h3 className="text-2xl md:text-3xl font-semibold text-white mb-4 group-hover:text-white transition-colors break-words">
                                    {project.name}
                                </h3>
                                <p className="text-white/70 mb-8 line-clamp-3 leading-relaxed flex-grow">
                                    {project.description || "No description available."}
                                </p>

                                <div
                                    className="flex items-center text-sm font-medium text-white/50 group-hover:text-white transition-colors mt-auto inline-block w-max"
                                >
                                    <span>View Repository</span>
                                    {/* Arrow Icon */}
                                    <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </div>
                            </div>

                            {/* Soft glow gradient effect */}
                            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none group-hover:bg-white/10 transition-colors duration-500"></div>
                        </motion.a>
                    ))}
                </div>
            </div>

            {/* Footer / Contact simple placeholder */}
            <footer className="mt-40 border-t border-white/10 pt-20">
                <div className="flex flex-col md:flex-row justify-between items-center text-white/40 text-sm">
                    <p>© {new Date().getFullYear()} Aditya. All rights reserved.</p>
                    <p>Designed & Built with Next.js</p>
                </div>
            </footer>
        </section>
    );
}
