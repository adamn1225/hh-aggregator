// components/Layout.tsx
import { ReactNode } from 'react';
import TopNavbar from './TopNavbar';
import SideNavbar from './SideNavbar';

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="layout grid grid-rows-[auto_1fr] grid-cols-[auto_1fr] h-full">
            <TopNavbar className="row-span-1 col-span-2" />
            <SideNavbar className="row-span-2 col-span-1" />
            <main className="content row-span-2 col-span-1 p-5">
                {children}
            </main>
        </div>
    );
};

export default Layout;