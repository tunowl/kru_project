"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Loader2, AlertCircle } from "lucide-react";
import { createClient } from "@/utils/supabase/client";

function LoginContent() {
    const searchParams = useSearchParams();
    const errorParam = searchParams.get("error");

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        if (errorParam === "Unauthorized") {
            setErrorMessage("อีเมลของคุณไม่ได้รับอนุญาตให้เข้าใช้งานระบบ โปรดใช้เมล @nssc.ac.th หรือ @student.nssc.ac.th");
        } else if (errorParam) {
            setErrorMessage("เกิดข้อผิดพลาดในการเข้าสู่ระบบ");
        }
    }, [errorParam]);

    const supabase = createClient();

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        setErrorMessage("");

        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });

        if (error) {
            setErrorMessage("เกิดข้อผิดพลาดในการเชื่อมต่อกับ Google");
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-white flex flex-col justify-center items-center p-4 font-sarabun text-slate-800">
            <div className="max-w-sm w-full">
                <div className="text-center mb-10">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-slate-50 border border-slate-100 mb-5">
                        <span className="text-2xl">🎓</span>
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">CbKST</h1>
                    <p className="text-slate-500 text-sm mt-1.5 font-medium">
                        ระบบฐานข้อมูลสมรรถนะการเขียนภาษาอังกฤษ
                    </p>
                </div>

                {errorMessage && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 animate-in fade-in zoom-in duration-300">
                        <AlertCircle className="text-red-500 shrink-0 mt-0.5" size={18} />
                        <p className="text-sm text-red-700 leading-relaxed">
                            {errorMessage}
                        </p>
                    </div>
                )}

                <button
                    onClick={handleGoogleLogin}
                    disabled={isLoading}
                    className="w-full flex items-center justify-center gap-3 bg-white border border-slate-200 text-slate-700 font-medium text-sm py-3 px-4 rounded-2xl hover:bg-slate-50 hover:border-slate-300 transition-all focus:outline-none focus:ring-2 focus:ring-slate-200 disabled:opacity-70 disabled:cursor-not-allowed shadow-sm"
                >
                    {isLoading ? (
                        <Loader2 className="animate-spin text-slate-400" size={18} />
                    ) : (
                        <>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 256 262"
                                className="shrink-0"
                                style={{ width: '18px', height: '18px', display: 'block' }}
                            >
                                <path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"></path>
                                <path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"></path>
                                <path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"></path>
                                <path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"></path>
                            </svg>
                            <span>Sign in with Google</span>
                        </>
                    )}
                </button>

                <div className="mt-8 text-center">
                    <p className="text-xs text-slate-400">
                        สำหรับนักเรียนและบุคลากร
                    </p>
                </div>
            </div>
        </div>
    );
}

export default function LoginPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <Loader2 className="animate-spin text-blue-600" size={32} />
            </div>
        }>
            <LoginContent />
        </Suspense>
    );
}