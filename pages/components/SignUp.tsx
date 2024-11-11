import { useState } from 'react';
import { supabase } from '../../lib/database';

const SignUp = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    interface SignUpFormProps {
        email: string;
        password: string;
    }

    const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
            },
        });

        if (error) {
            console.error('Error signing up:', error);
        } else {
            console.log('Check your email for the confirmation link.');
        }
    };

    return (
        <form onSubmit={handleSignUp}>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignUp;