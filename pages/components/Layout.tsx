import React, { ReactNode } from 'react';
import SideNavbar from './SideNavbar';
import TopNavbar from './TopNavbar';

interface LayoutProps {
    children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="layout">
            <TopNavbar />
            <div className="flex flex-grow">
                <SideNavbar />
                <main className="main-content p-4">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default Layout;