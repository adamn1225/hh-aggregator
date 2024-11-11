import { Database } from '@/lib/schema';
import { Session, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';

type HomeMovingLeads = Database['public']['Tables']['home_moving_leads']['Row'];

export default function HomeMoving({ session }: { session: Session }) {
    const supabase = useSupabaseClient<Database>();
    const [movingLeads, setmovingLeads] = useState<HomeMovingLeads[]>([]);

    useEffect(() => {
        const fetchFinanceLeads = async () => {
            const { data: movingLeads, error } = await supabase
                .from('home_moving_leads')
                .select('*')
                .order('id', { ascending: true });

            if (error) console.log('error', error);
            else setmovingLeads(movingLeads);
        };

        fetchFinanceLeads();
    }, [supabase]);

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">Home Moving Leads</h1>
            <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 px-4 py-2">ID</th>
                            <th className="border border-gray-300 px-4 py-2">First Name</th>
                            <th className="border border-gray-300 px-4 py-2">Last Name</th>
                            <th className="border border-gray-300 px-4 py-2">Email</th>
                            <th className="border border-gray-300 px-4 py-2">Phone</th>
                            <th className="border border-gray-300 px-4 py-2">Moving Date</th>
                            <th className="border border-gray-300 px-4 py-2">Shipping From</th>
                            <th className="border border-gray-300 px-4 py-2">Shipping To</th>
                            <th className="border border-gray-300 px-4 py-2">Room Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        {movingLeads.map((lead) => (
                            <tr key={lead.id} className="hover:bg-gray-100">
                                <td className="border border-gray-300 px-4 py-2">{lead.id}</td>
                                <td className="border border-gray-300 px-4 py-2">{lead.contact_first_name}</td>
                                <td className="border border-gray-300 px-4 py-2">{lead.contact_last_name}</td>
                                <td className="border border-gray-300 px-4 py-2">{lead.contact_email}</td>
                                <td className="border border-gray-300 px-4 py-2">{lead.contact_phone}</td>
                                <td className="border border-gray-300 px-4 py-2">{lead.moving_date}</td>
                                <td className="border border-gray-300 px-4 py-2">{lead.shipping_from}</td>
                                <td className="border border-gray-300 px-4 py-2">{lead.shipping_to}</td>
                                <td className="border border-gray-300 px-4 py-2">{lead.room_count}</td>
                            </tr>
                        ))}
                        {/* Empty row for appearance */}
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">&nbsp;</td>
                            <td className="border border-gray-300 px-4 py-2">&nbsp;</td>
                            <td className="border border-gray-300 px-4 py-2">&nbsp;</td>
                            <td className="border border-gray-300 px-4 py-2">&nbsp;</td>
                            <td className="border border-gray-300 px-4 py-2">&nbsp;</td>
                            <td className="border border-gray-300 px-4 py-2">&nbsp;</td>
                            <td className="border border-gray-300 px-4 py-2">&nbsp;</td>
                            <td className="border border-gray-300 px-4 py-2">&nbsp;</td>
                            <td className="border border-gray-300 px-4 py-2">&nbsp;</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}