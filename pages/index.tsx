// pages/index.tsx
import Head from 'next/head';
import Link from 'next/link';
import Layout from './components/Layout';
import SignUp from './components/SignUp'; // Import the SignUp component

export default function HomePage() {
  return (
    <Layout>
      <Head>
        <title>Lead Aggregator</title>
        <meta name="description" content="Welcome to SSTA Reminders & Tasks" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-w-full min-h-screen flex flex-col items-center justify-start py-4 bg-gray-50">
        <h1 className="text-4xl font-bold mb-4">Lead Aggregator</h1>
        <p className="text-lg mb-8">Manage your leads efficiently.</p>
        <div className="w-full h-full sm:h-auto sm:w-2/5 max-w-sm p-5 bg-white shadow flex flex-col items-center text-base">

          <div className="text-center">
            <Link href="/login" legacyBehavior>
              <a className="text-stone-50 bg-gray-900 py-2 px-3 rounded-sm font-semibold">Sign In</a>
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}