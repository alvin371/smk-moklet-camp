import React from 'react';

type ProfileDropdownProps = {
    isOpen: boolean;
};

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ isOpen }) => (
    isOpen ? (
        <div
            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            role="menu"
            aria-orientation="vertical"
        >
            <a href="#" className="block px-4 py-2 text-sm text-gray-700">Your Profile</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700">Settings</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700">Sign out</a>
        </div>
    ) : null
);

export default ProfileDropdown;
