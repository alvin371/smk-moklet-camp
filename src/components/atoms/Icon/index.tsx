import React from 'react';

type IconProps = {
    path: string;
    className?: string;
};

const Icon: React.FC<IconProps> = ({ path, className }) => (
    <svg
        className={`h-6 w-6 ${className}`}
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        aria-hidden="true"
    >
        <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
);

export default Icon;
