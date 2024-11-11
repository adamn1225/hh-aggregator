import React, { ReactNode } from 'react';
import UserSideNav from './UserSideNav';

interface UserLayoutProps {
    children: ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
    return (
        <div className="relative flex h-screen overflow-hidden">
            <UserSideNav />
            <main className="flex flex-col flex-grow p-4 overflow-auto ml-28 md:ml-0">
                {children}
            </main>
        </div>
    );
};

export default UserLayout;