import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '../../lib/database';

const AuthCallback = () => {
    const router = useRouter();

    useEffect(() => {
        const handleAuthCallback = async () => {
            const url = new URL(window.location.href);
            const access_token = url.searchParams.get('access_token');
            const refresh_token = url.searchParams.get('refresh_token');

            if (access_token && refresh_token) {
                const { error } = await supabase.auth.setSession({
                    access_token,
                    refresh_token,
                });

                if (error) {
                    console.error('Error setting session:', error);
                } else {
                    router.push('/');
                }
            } else {
                console.error('Missing tokens in URL');
            }
        };

        handleAuthCallback();
    }, [router]);

    return <div>Loading...</div>;
};

export default AuthCallback;