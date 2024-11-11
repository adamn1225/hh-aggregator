import { useSupabaseClient } from '@supabase/auth-helpers-react';
import Link from 'next/link';

interface SideNavbarProps {
    className?: string;
}

const SideNavbar: React.FC<SideNavbarProps> = ({ className }) => {
    const supabase = useSupabaseClient();

    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error('Error logging out:', error.message);
                alert('Failed to log out. Please try again.');
                window.location.href = '/login';
            } else {
                window.location.reload();
            }
        } catch (err) {
            console.error('Unexpected error during logout:', err);
            alert('An unexpected error occurred. Please try again.');
            window.location.href = '/login';
        }
    };

    return (
        <nav className={`side-navbar bg-slate-700 flex flex-col h-screen z-50 py-6 drop-shadow absolute top-0 left-0 ${className}`}>
            <h1 className='text-xl mb-4 self-center'>NTS Noetics</h1>
            <ul className='flex gap-3 flex-col justify-start items-center flex-grow space-y-1 overflow-y-auto'>
                <li className="w-full flex flex-col items-center gap-1 justify-center m-0">
                    <h3 className='font-medium text-lg'>Welcome!</h3>
                </li>
                <li className="w-full flex flex-col gap-3 items-center justify-center m-0">
                    <Link href="/login" legacyBehavior>
                        <button className="bg-slate-100 text-slate-900 text-nowrap font-bold px-4 py-1 rounded-sm w-4/5">
                            Log In
                        </button>
                    </Link>
                </li>
            </ul>

            <ul className='flex flex-col justify-end items-center'>
                <li className="w-full flex justify-center m-0">
                    <Link href="/login" legacyBehavior>
                        <a className="bg-slate-100 text-slate-900 text-center font-bold px-4 py-1 rounded-sm w-4/5">Log In</a>
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default SideNavbar;