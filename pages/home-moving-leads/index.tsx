import react from 'react';
import { useSession } from '@supabase/auth-helpers-react';
import HomeMoving from '@/components/HomeMoving';
import UserLayout from '../components/UserLayout';
const HomeMovingLeads = () => {
    const session = useSession();

    if (!session) {
        return <p>Loading...</p>;
    }

    return (
        <UserLayout>
            <HomeMoving session={session}/>
        </UserLayout>
    );
}

export default HomeMovingLeads;