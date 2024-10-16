// pages/index.tsx
import Head from 'next/head';
import Link from 'next/link';
import Layout from './components/Layout';
import SignUp from './components/SignUp'; // Import the SignUp component
import QuoteRequest from '@/components/QuoteRequest'; // Import the GoalSetting component
import FreightInventory from '@/components/FreightInventory'; // Import the FreightInventory component
export default function HomePage() {
  return (
    <Layout>
      <Head>
        <title>NTS Client Portal</title>
        <meta name="description" content="Welcome to SSTA Reminders & Tasks" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-w-full min-h-screen flex flex-col items-center justify-start py-4 bg-gray-50">
        <h1 className="text-4xl font-bold mb-4">NTS Client Portal</h1>
        <p className="text-lg mb-8">Manage your freight inventory and logistics efficiently.</p>
        <div className="w-full h-full sm:h-auto sm:w-3/5">
          <QuoteRequest />          
        </div>
        <div className="w-full h-full sm:h-auto sm:w-3/5">
          <FreightInventory />
        </div>
      </div>
    </Layout>
  );
}