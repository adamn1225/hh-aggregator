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
      else {
        console.log('Fetched finance leads:', financeLeads);
        setFinLeads(financeLeads);
      }
    };

    fetchFinanceLeads();
  }, [supabase]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Finance Leads</h1>
      <div className="overflow-x-auto">
        <div className="hidden md:block">
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
            </tbody>
          </table>
        </div>
        <div className="block">
          {finLeads.map((lead) => (
            <div key={lead.id} className="border border-gray-300 mb-4 p-4 rounded-lg">
              <div className="flex flex-col">
                <div className="flex justify-between">
                  <span className="font-bold text-red">ID:</span>
                  <span>{lead.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">Created_at:</span>
                  <span>{lead.created_at}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">Company Name:</span>
                  <span>{lead.company_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">Contact Name:</span>
                  <span>{lead.contact_first_name} {lead.contact_last_name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">Contact Email/Phone:</span>
                  <span>{lead.contact_email} {lead.contact_phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">Business Address:</span>
                  <span>{lead.business_address}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">Revenue PM:</span>
                  <span>{lead.revenue_pm}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">Amount Requested:</span>
                  <span>{lead.amount_requested}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">FICO:</span>
                  <span>{lead.fico}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">Date Established:</span>
                  <span>{lead.date_business_established}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">Annual Income:</span>
                  <span>{lead.annual_income}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-bold">Loan Type:</span>
                  <span>{lead.loan_type}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}