import { useState } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { Menu, X, Home, Truck, LogOut } from 'lucide-react';

interface SideNavbarProps {
    className?: string;
}

const UserSideNav: React.FC<SideNavbarProps> = ({ className }) => {
    const supabase = useSupabaseClient();
    const [isOpen, setIsOpen] = useState(true);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error('Error logging out:', error.message);
                alert('Failed to log out. Please try again.');
                window.location.href = '/';
            } else {
                window.location.reload();
            }
        } catch (err) {
            console.error('Unexpected error during logout:', err);
            alert('An unexpected error occurred. Please try again.');
            window.location.href = '/';
        }
    };

    return (
        <nav className={`side-navbar bg-gray-900 flex flex-col z-40 h-screen py-6 drop-shadow absolute top-0 left-0 transform transition-transform duration-300 ease-in-out md:relative ${isOpen ? 'w-64' : 'w-20'} ${className}`}>
            <button className="text-white absolute top-4 left-4 z-50" onClick={toggleSidebar}>
                {isOpen ? <X className="w-6 h-6 text-stone-50" /> : <Menu className="w-6 h-6 text-stone-50" />}
            </button>
            <h1 className={`text-xl mb-4 mt-10 self-center text-white ${isOpen ? 'block' : 'hidden'}`}>NTS Noetics</h1>
            <ul className='mt-4 flex gap-3 flex-col justify-start items-center flex-grow space-y-1 overflow-y-auto'>
                <li className="w-full flex flex-col items-center gap-1 justify-center m-0">
                    <h3 className={`font-medium text-lg text-white ${isOpen ? 'block' : 'hidden'}`}>Welcome!</h3>
                </li>
                <li className="w-full text-center flex justify-center m-0">
                    <Link href="/nationwide-equipment-funding" className="flex items-center gap-2 bg-slate-100 text-slate-900 text-sm font-bold px-4 py-1 rounded-sm w-4/5">
                        <Home className="w-6 h-6" />
                        <span className={`${isOpen ? 'block' : 'hidden'}`}>Nationwide Equipment Funding</span>
                    </Link>
                </li>
                <li className="w-full text-center flex justify-center m-0">
                    <Link href="/home-moving-leads" className="flex  text-sm items-center gap-2 bg-slate-100 text-slate-900 font-bold px-4 py-1 rounded-sm w-4/5">
                        <Truck className="w-6 h-6" />
                        <span className={`${isOpen ? 'block' : 'hidden'}`}>Home Moving Leads</span>
                    </Link>
                </li>
            </ul>
            <ul className='flex gap-3 flex-col justify-end items-center flex-grow space-y-1 overflow-y-auto'>
                <li className="w-full flex flex-col items-center gap-1 justify-center m-0">
                    {/* Add your navigation items here */}
                </li>
                <li className="w-full flex flex-col items-center gap-1 justify-center m-0">
                    <button onClick={handleLogout} className="flex items-center gap-2 text-gray-900 bg-stone-50 px-4 py-2 text-base font-semibold w-2/3 rounded-sm">
                        <LogOut className="w-6 h-6" />
                        <span className={`${isOpen ? 'block' : 'hidden'}`}>Logout</span>
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default UserSideNav;