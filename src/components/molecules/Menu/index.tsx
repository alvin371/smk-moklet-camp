import React from 'react';

type MenuItem = {
    label: string;
    href: string;
    isActive?: boolean;
};

type MenuProps = {
    items: MenuItem[];
};

const Menu: React.FC<MenuProps> = ({ items }) => (
    <div className="flex space-x-4">
        {items.map((item) => (
            <a
                key={item.label}
                href={item.href}
                className={`rounded-md px-3 py-2 text-sm font-medium ${item.isActive ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`}
            >
                {item.label}
            </a>
        ))}
    </div>
);

export default Menu;
