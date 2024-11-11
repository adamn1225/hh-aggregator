import React from 'react';
import { useSession } from '@supabase/auth-helpers-react';
import SignUp from '../components/SignUp';
import UserLayout from '../components/UserLayout';

const Home = () => {
    const session = useSession();

    if (!session) {
        return <p>Loading...</p>;
    }

    return (
        <UserLayout>
            <SignUp />
        </UserLayout>
    );
}

export default Home;