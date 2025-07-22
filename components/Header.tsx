
import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="bg-white shadow-md">
            <div className="container mx-auto px-4 md:px-8 py-4 max-w-4xl">
                <h1 className="text-3xl font-bold text-slate-800">Career Catalyst</h1>
                <p className="text-slate-500 mt-1">Your AI-powered job preparation partner.</p>
            </div>
        </header>
    );
};

export default Header;
