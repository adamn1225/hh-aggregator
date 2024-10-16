// pages/index.tsx
import React, { useEffect } from 'react';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';
import UserLayout from '../components/UserLayout';
import GoalSetting from '@/components/QuoteRequest';



const IndexPage = () => {
    const session = useSession();

    return (
        <UserLayout>
            <GoalSetting session={session} />
        </UserLayout>
    );
};

export default IndexPage;