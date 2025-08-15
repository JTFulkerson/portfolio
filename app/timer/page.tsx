"use client";
import { useEffect } from 'react';

export default function TimerRedirectPage() {
    useEffect(() => {
        window.location.href = 'https://timer.johnfulkerson.com';
    }, []);

    return (
        <div className="flex items-center justify-center min-h-screen">
            <p>Redirecting to timer...</p>
        </div>
    );
}