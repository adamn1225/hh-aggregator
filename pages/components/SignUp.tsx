// components/SignUp.tsx
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth, ThemeSupa } from '@supabase/auth-ui-react';

const SignUp = () => {
    const supabase = useSupabaseClient();

    const signUpWithGoogle = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: process.env.NODE_ENV === 'development'
                    ? 'http://localhost:3000/auth/callback'
                    : 'https://supabase-nextjs-todo-list-adamn1225s-projects.vercel.app/auth/callback',
            },
        });

        if (error) {
            console.error('Error signing up with Google:', error.message);
        }
    };

    return (
        <div className="mt-4">
            <button
                onClick={signUpWithGoogle}
                className="bg-gray-800 text-white font-semibold px-4 py-2 rounded"
            >
                Sign Up
            </button>
        </div>
    );
};

export default SignUp;