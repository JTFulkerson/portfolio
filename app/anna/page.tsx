"use client";

import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { upload } from "@vercel/blob/client";

export default function Anna() {
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const siteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY ?? "";
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setSubmitting(true);
        const form = e.currentTarget;
        const formData = new FormData(form);
        const name = formData.get("name") as string;
        const date = formData.get("date") as string;
        const memory = formData.get("memory") as string;
        const share = formData.get("share") as string;
        const filesInput = form.querySelector("input[name='files']") as HTMLInputElement;
        const files = filesInput?.files ? Array.from(filesInput.files).slice(0, 5) : [];

        // Upload files to Vercel Blob
        const uploadedUrls: string[] = [];
        for (const file of files) {
            const { url } = await upload(file.name, file, { access: "public" });
            uploadedUrls.push(url);
        }

        // Get reCAPTCHA token
        const recaptchaToken = await recaptchaRef.current?.executeAsync();
        recaptchaRef.current?.reset();

        // Send all data to API
        await fetch("/api/memory", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, date, memory, share, recaptchaToken, files: uploadedUrls }),
        });
        setSubmitting(false);
        // Optionally, show a success message or reset the form
    }

    return (
        <div className="min-h-screen flex justify-center bg-gray-50 items-start md:items-center">
            <div className="max-w-2xl w-full py-12 px-4 sm:px-6 lg:px-8">
                <form className="bg-white rounded-xl shadow-lg p-8 space-y-6" onSubmit={handleSubmit}>
                    <h1 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Share a Memory</h1>
                    <div>
                        <label htmlFor="name" className="block text-lg font-medium text-gray-800 mb-2">Name <span className="text-red-500">*</span></label>
                        <input type="text" id="name" name="name" required className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="date" className="block text-lg font-medium text-gray-800 mb-2">Date of Memory</label>
                        <input type="date" id="date" name="date" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    </div>
                    <div>
                        <label htmlFor="memory" className="block text-lg font-medium text-gray-800 mb-2" style={{ minHeight: '20px' }}>Memory <span className="text-red-500">*</span></label>
                        <textarea id="memory" name="memory" required rows={4} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Share your memory here..." />
                    </div>
                    <div>
                        <label htmlFor="files" className="block text-lg font-medium text-gray-800 mb-2">Photo/Video (max 5 files)</label>
                        <input type="file" id="files" name="files" accept="image/*,video/*" multiple className="w-full" />
                    </div>
                    <div>
                        <label className="block text-lg font-medium text-gray-800 mb-2">Are you comfortable with this memory being shared?</label>
                        <div className="flex space-x-6">
                            <label className="flex items-center">
                                <input type="radio" name="share" value="yes" required className="mr-2" /> Yes
                            </label>
                            <label className="flex items-center">
                                <input type="radio" name="share" value="no" required className="mr-2" /> No
                            </label>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <ReCAPTCHA
                            ref={recaptchaRef}
                            sitekey={siteKey}
                            size="invisible"
                        />
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors" disabled={submitting}>
                        {submitting ? "Submitting..." : "Submit Memory"}
                    </button>
                </form>
            </div>
        </div>
    );
}
