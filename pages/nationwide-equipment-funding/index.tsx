import React from 'react';
import { useSession } from '@supabase/auth-helpers-react';
import FinanceLeads from '@/components/FinanceLeads';
import UserLayout from '../components/UserLayout';

const FinanceLeadsPage = () => {
    const session = useSession();

    if (!session) {
        return <p>Loading...</p>;
    }

    return (
        <UserLayout>
            <FinanceLeads session={session} />
        </UserLayout>
    );
}

export default FinanceLeadsPage;