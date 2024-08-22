import React, { useState } from 'react';
import Button from '../../atoms/Button';
import Icon from '../../atoms/Icon';
import Menu from '../../molecules/Menu';
import { ProfileDropdown } from '../../atoms/Dropdown';

const Navbar: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const toggleProfileMenu = () => setIsProfileOpen(!isProfileOpen);

    const menuItems = [
        { label: 'Dashboard', href: '#', isActive: true },
        { label: 'Team', href: '#' },
        { label: 'Projects', href: '#' },
        { label: 'Calendar', href: '#' },
    ];

    return (
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    {/* Mobile menu button */}
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <Button onClick={toggleMobileMenu} className="p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:ring-2 focus:ring-inset focus:ring-white" ariaLabel="Toggle mobile menu">
                            <Icon path={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"} />
                        </Button>
                    </div>

                    {/* Logo and menu */}
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <img
                                className="h-8 w-auto"
                                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500"
                                alt="Your Company"
                            />
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <Menu items={menuItems} />
                        </div>
                    </div>

                    {/* Profile button */}
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <Button
                            onClick={toggleProfileMenu}
                            className="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                            ariaLabel="View notifications"
                        >
                            <Icon path="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0" />
                        </Button>

                        {/* Profile dropdown */}
                        <div className="relative ml-3">
                            <Button
                                onClick={toggleProfileMenu}
                                className="flex rounded-full bg-gray-800 text-sm focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                ariaLabel="Open user menu"
                            >
                                <img
                                    className="h-8 w-8 rounded-full"
                                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                    alt=""
                                />
                            </Button>
                            <ProfileDropdown isOpen={isProfileOpen} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            {isMobileMenuOpen && (
                <div className="sm:hidden" id="mobile-menu">
                    <Menu items={menuItems.map(item => ({ ...item, isActive: false }))} />
                </div>
            )}
        </nav>
    );
};

export default Navbar;
