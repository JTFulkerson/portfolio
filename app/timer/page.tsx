"use client";
import { useEffect } from 'react';

export default function TimerRedirectPage() {
    useEffect(() => {
        window.location.href = 'https://timer.johnfulkerson.com';
    }, []);
}