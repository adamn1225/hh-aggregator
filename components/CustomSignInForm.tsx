import { useSupabaseClient } from '@supabase/auth-helpers-react';
import React from 'react';

export default function CustomSignInForm() {
    const supabase = useSupabaseClient();

    const handleSignInWithEmail = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const email = (event.target as HTMLFormElement).email.value;
        const password = (event.target as HTMLFormElement).password.value;
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) console.log('Error signing in with email:', error.message);
    };

    return (
        <div className="xs:w-2/5 xs:h-auto w-full h-full max-w-sm p-5 bg-white shadow flex flex-col text-base">
            <span className="font-sans text-4xl text-center pb-2 mb-1 border-b mx-4 align-center">
                Login
            </span>
            <form className="mt-4" onSubmit={handleSignInWithEmail}>
                <label htmlFor="email">Email address</label>
                <input type="email" id="email" name="email" required className="w-full p-2 mt-2 border rounded" />
                <label htmlFor="password" className="mt-4">Your Password</label>
                <input type="password" id="password" name="password" required className="w-full p-2 mt-2 border rounded" />
                <button type="submit" className="btn-black w-full mt-4">Sign in</button>
            </form>
        </div>
    );
}