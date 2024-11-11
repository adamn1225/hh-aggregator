import { Database } from '@/lib/schema';
import { Session, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';

type FinanceLead = Database['public']['Tables']['finance_leads']['Row'];

export default function FinanceLeads({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>();
  const [finLeads, setFinLeads] = useState<FinanceLead[]>([]);

  useEffect(() => {
    const fetchFinanceLeads = async () => {
      const { data: financeLeads, error } = await supabase
        .from('finance_leads')
        .select('*')
        .order('id', { ascending: true });

      if (error) console.log('error', error);
      else setFinLeads(financeLeads);
    };

    fetchFinanceLeads();
  }, [supabase]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Finance Leads</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border text-sm border-gray-300 px-4 py-2">ID</th>
              <th className="border text-sm border-gray-300 px-4 py-2">Created_at</th>
              <th className="border text-sm border-gray-300 px-4 py-2">Company Name</th>
              <th className="border text-sm border-gray-300 px-4 py-2">Contact Name</th>
              <th className="border text-sm border-gray-300 px-4 py-2">Contact Email/Phone</th>
              <th className="border text-sm border-gray-300 px-4 py-2">Business Address</th>
              <th className="border text-sm border-gray-300 px-4 py-2">Revenue PM</th>
              <th className="border text-sm border-gray-300 px-4 py-2">Amount Requested</th>
              <th className="border text-sm border-gray-300 px-4 py-2">FICO</th>
              <th className="border text-sm border-gray-300 px-4 py-2">Date Established</th>
              <th className="border text-sm border-gray-300 px-4 py-2">Annual Income</th>
              <th className="border text-sm border-gray-300 px-4 py-2">Loan Type</th>
            </tr>
          </thead>
          <tbody>
            {finLeads.map((lead) => (
              <tr key={lead.id} className="hover:bg-gray-100">
                <td className="border text-sm border-gray-300 px-4 py-2">{lead.id}</td>
                <td className="border text-sm border-gray-300 px-4 py-2">{lead.created_at}</td>
                <td className="border text-sm border-gray-300 px-4 py-2">{lead.company_name}</td>
                <td className="border text-sm border-gray-300 px-4 py-2">{lead.contact_first_name} {lead.contact_last_name}</td>
                <td className="border text-sm border-gray-300 px-4 py-2">{lead.contact_email} {lead.contact_phone}</td>
                <td className="border text-sm border-gray-300 px-4 py-2">{lead.business_address}</td>
                <td className="border text-sm border-gray-300 px-4 py-2">{lead.revenue_pm}</td>
                <td className="border text-sm border-gray-300 px-4 py-2">{lead.amount_requested}</td>
                <td className="border text-sm border-gray-300 px-4 py-2">{lead.fico}</td>
                <td className="border text-sm border-gray-300 px-4 py-2">{lead.date_business_established}</td>
                <td className="border text-sm border-gray-300 px-4 py-2">{lead.annual_income}</td>
                <td className="border text-sm border-gray-300 px-4 py-2">{lead.loan_type}</td>
              </tr>
            ))}
            {/* Empty row for appearance */}
            <tr>
              <td className="border text-sm border-gray-300 px-4 py-2">&nbsp;</td>
              <td className="border text-sm border-gray-300 px-4 py-2">&nbsp;</td>
              <td className="border text-sm border-gray-300 px-4 py-2">&nbsp;</td>
              <td className="border text-sm border-gray-300 px-4 py-2">&nbsp;</td>
              <td className="border text-sm border-gray-300 px-4 py-2">&nbsp;</td>
              <td className="border text-sm border-gray-300 px-4 py-2">&nbsp;</td>
              <td className="border text-sm border-gray-300 px-4 py-2">&nbsp;</td>
              <td className="border text-sm border-gray-300 px-4 py-2">&nbsp;</td>
              <td className="border text-sm border-gray-300 px-4 py-2">&nbsp;</td>
              <td className="border text-sm border-gray-300 px-4 py-2">&nbsp;</td>
              <td className="border text-sm border-gray-300 px-4 py-2">&nbsp;</td>
              <td className="border text-sm border-gray-300 px-4 py-2">&nbsp;</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}