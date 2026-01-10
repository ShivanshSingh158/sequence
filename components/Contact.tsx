'use client';

import { motion } from 'framer-motion';
import { Linkedin } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';

interface ContactFormData {
    name: string;
    email: string;
    message: string;
}

export default function Contact() {
    const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm<ContactFormData>();
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const onSubmit = async (data: ContactFormData) => {
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                setStatus('success');
                reset();
            } else {
                setStatus('error');
            }
        } catch {
            setStatus('error');
        }
    };

    return (
        <section className="relative w-full py-32 px-6 bg-black flex flex-col items-center justify-center text-center z-10">
            <motion.h2
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="text-5xl md:text-7xl font-bold text-white tracking-tighter mb-8 max-w-5xl leading-[1.1]"
            >
                Let&apos;s Build Something<br />
                That Works.
            </motion.h2>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="w-full max-w-md mb-20 text-left"
            >
                <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                    <div>
                        <input
                            {...register("name", { required: true })}
                            placeholder="Your Name"
                            className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                        />
                        {errors.name && <span className="text-red-400 text-xs mt-1 ml-1">Name is required</span>}
                    </div>

                    <div>
                        <input
                            {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                            placeholder="Your Email"
                            type="email"
                            className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                        />
                        {errors.email && <span className="text-red-400 text-xs mt-1 ml-1">Valid email is required</span>}
                    </div>

                    <div>
                        <textarea
                            {...register("message", { required: true })}
                            placeholder="Tell me about your project..."
                            rows={4}
                            className="w-full bg-white/5 border border-white/10 p-4 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                        />
                        {errors.message && <span className="text-red-400 text-xs mt-1 ml-1">Message is required</span>}
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                    </motion.button>

                    {status === 'success' && (
                        <p className="text-green-400 text-center text-sm">Message sent successfully! I&apos;ll get back to you soon.</p>
                    )}
                    {status === 'error' && (
                        <p className="text-red-400 text-center text-sm">Something went wrong. Please try again.</p>
                    )}
                </form>
            </motion.div>

            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.4 }}
                className="flex items-center justify-center mt-8"
            >
                <a
                    href="https://www.linkedin.com/in/shivansh-singh-48026232a"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-3 group"
                >
                    <Linkedin className="w-12 h-12 text-white/50 group-hover:text-blue-400 transition-all duration-300" />
                    <span className="text-sm font-mono text-white/30 tracking-[0.3em] uppercase group-hover:text-white transition-colors">
                        Connect on LinkedIn
                    </span>
                </a>
            </motion.div>
        </section >
    );
}
