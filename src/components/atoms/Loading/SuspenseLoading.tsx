// src/components/SuspenseLoading.tsx
import React from 'react';

const SuspenseLoading: React.FC = () => {
    return (
        <div
            className="flex h-screen flex-col items-center justify-center"
            style={{
                background:
                    "linear-gradient(90deg, #F2F5F9 0%, rgba(242, 245, 249, 0) 100%)",
            }}
        >
            <div className="relative flex items-center justify-center">
                <svg
                    className="w-16 h-16 text-blue-500 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle
                        className="opacity-10"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                    <path
                        className="opacity-100"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8 8 8 0 010 16 8 8 0 01-8-8zm10.8 0a2.8 2.8 0 10-5.6 0 2.8 2.8 0 005.6 0z"
                    />
                </svg>
            </div>
        </div>
    );
};

export default SuspenseLoading;
