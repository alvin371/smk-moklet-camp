import React from 'react';

type ButtonProps = {
    onClick?: () => void;
    className?: string;
    ariaLabel: string;
    children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ onClick, className, ariaLabel, children }) => (
    <button
        type="button"
        className={`relative ${className}`}
        onClick={onClick}
        aria-label={ariaLabel}
    >
        {children}
    </button>
);

export default Button;
