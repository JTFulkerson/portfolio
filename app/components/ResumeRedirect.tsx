// components/ResumeRedirect.tsx
"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const ResumeRedirect = () => {
    const router = useRouter();

    useEffect(() => {
        router.push('/documents/Fulkerson_John_Resume.pdf');
    }, [router]);

    return null;
};

export default ResumeRedirect;