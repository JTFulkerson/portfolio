// app/resume/page.tsx
import dynamic from 'next/dynamic';

const ResumeRedirect = dynamic(() => import('../components/ResumeRedirect'), { ssr: false });

const ResumePage = () => {
    return <ResumeRedirect />;
};

export default ResumePage;