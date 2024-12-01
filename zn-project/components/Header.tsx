import React from 'react';
import logo from '../img/logo.png';
const Header: React.FC = () => {
    return (
        <header className="bg-white p-4 flex justify-center items-center shadow-md">
            <div className="flex justify-center items-center">
                {/* Logo Section */}
                <img
                    src={logo}
                    alt="Logo"
                    className="h-12 w-auto" // You can adjust the size here to suit your logo's proportions
                />
            </div>
        </header>
    );
};

export default Header;
