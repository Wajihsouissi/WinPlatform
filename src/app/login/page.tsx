'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowLeft, Mail, Lock, Facebook, Chrome } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function LoginPage() {
    const [isLoading, setIsLoading] = React.useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate login delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-background flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <Link href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-slate-900 mb-6 transition-colors">
                        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Home
                    </Link>
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-3xl font-bold text-slate-900 mb-2">Welcome back</h1>
                        <p className="text-slate-500">Enter your credentials to access your account</p>
                    </motion.div>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8"
                >
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-4">
                            <Input
                                label="Email"
                                type="email"
                                placeholder="name@example.com"
                                required
                            />
                            <div className="space-y-1">
                                <Input
                                    label="Password"
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                />
                                <div className="flex justify-end">
                                    <Link href="#" className="text-xs font-medium text-slate-500 hover:text-slate-900">
                                        Forgot password?
                                    </Link>
                                </div>
                            </div>
                        </div>

                        <Button className="w-full text-base py-6" isLoading={isLoading}>
                            Sign In
                        </Button>
                    </form>

                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-slate-200" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-white px-2 text-slate-500">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="w-full border-slate-300 text-slate-700 hover:bg-slate-50 hover:text-slate-900">
                            <Chrome className="mr-2 h-4 w-4" /> Google
                        </Button>
                        <Button variant="outline" className="w-full border-blue-200 text-[#1877F2] hover:bg-blue-50 hover:text-[#1877F2]">
                            <Facebook className="mr-2 h-4 w-4" /> Facebook
                        </Button>
                    </div>

                    <div className="mt-6 text-center text-sm text-slate-500">
                        Don&apos;t have an account?{' '}
                        <Link href="/signup" className="font-bold text-slate-900 hover:underline">
                            Sign up
                        </Link>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
