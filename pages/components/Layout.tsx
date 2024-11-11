import React, { ReactNode } from 'react';
import SideNavbar from './SideNavbar';
import TopNavbar from './TopNavbar';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="relative flex flex-col h-screen overflow-hidden">
            <TopNavbar />
            <div className="flex flex-grow">
                <main className="flex-grow p-4">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;