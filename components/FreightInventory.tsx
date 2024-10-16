import React, { useState, useEffect } from 'react';
import { useSupabaseClient, Session } from '@supabase/auth-helpers-react';
import { Database } from '@/lib/schema';

interface FreightInventoryProps {
  session: Session | null;
}

type Freight = Database['public']['Tables']['freight']['Row'];

const FreightInventory = ({ session }: FreightInventoryProps) => {
  const supabase = useSupabaseClient<Database>();
  const [freightList, setFreightList] = useState<Freight[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [yearAmount, setYearAmount] = useState<string>('');
  const [make, setMake] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [palletCount, setPalletCount] = useState<string>('');
  const [commodity, setCommodity] = useState<string>('');
  const [length, setLength] = useState<string>('');
  const [width, setWidth] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [errorText, setErrorText] = useState<string>('');

  const user = session?.user;

  useEffect(() => {
    if (user) {
      fetchFreight();
    }
  }, [user]);

  const fetchFreight = async () => {
    if (!user) return;

    const { data, error } = await supabase
      .from('freight')
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      setErrorText(error.message);
    } else {
      setFreightList(data);
    }
  };

  const addFreight = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const { data, error } = await supabase
      .from('freight')
      .insert([{
        user_id: user.id,
        year_amount: yearAmount,
        make: make,
        model: model,
        pallet_count: palletCount,
        commodity: commodity,
        length: length,
        width: width,
        height: height,
        weight: weight
      }])
      .select();

    if (error) {
      console.error('Error adding freight:', error.message);
      setErrorText('Error adding freight');
    } else {
      setFreightList([...freightList, ...(data || [])]);
      setYearAmount('');
      setMake('');
      setModel('');
      setPalletCount('');
      setCommodity('');
      setLength('');
      setWidth('');
      setHeight('');
      setWeight('');
      setErrorText('');
    }
  };

  const deleteFreight = async (id: number) => {
    if (!user) return;

    const { error } = await supabase
      .from('freight')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting freight:', error.message);
    } else {
      fetchFreight();
    }
  };

  return (
    <div className="w-full grid grid-cols-2 gap-12">
      <div className="w-full">
        <h1 className="mb-12 text-2xl">Your Freight and Equipment</h1>
        <form onSubmit={addFreight} className="flex flex-col w-full gap-2 my-2">
          <div className='flex flex-col gap-4 w-full'>
            <label className='text-slate-900 font-medium'>Freight Type
              <select
                className="rounded w-full p-2 border border-slate-900"
                value={selectedOption}
                onChange={(e) => {
                  setErrorText('');
                  setSelectedOption(e.target.value);
                }}
              >
                <option value="">Select...</option>
                <option value="equipment">Equipment/Machinery</option>
                <option value="ltl_ftl">LTL/FTL</option>
              </select>
            </label>

            {selectedOption === 'equipment' && (
              <div className='flex gap-2 w-full'>
                <label className='text-slate-900 font-medium'>Year/Amount
                  <input
                    className="rounded w-full p-2 border border-slate-900"
                    type="text"
                    value={yearAmount}
                    onChange={(e) => {
                      setErrorText('');
                      setYearAmount(e.target.value);
                    }}
                  />
                </label>
                <label className='text-slate-900 font-medium'>Make
                  <input
                    className="rounded w-full p-2 border border-slate-900"
                    type="text"
                    value={make}
                    onChange={(e) => {
                      setErrorText('');
                      setMake(e.target.value);
                    }}
                  />
                </label>
                <label className='text-slate-900 font-medium'>Model
                  <input
                    className="rounded w-full p-2 border border-slate-900"
                    type="text"
                    value={model}
                    onChange={(e) => {
                      setErrorText('');
                      setModel(e.target.value);
                    }}
                  />
                </label>
              </div>
            )}

            {selectedOption === 'ltl_ftl' && (
              <div className='flex gap-2 w-full'>
                <label className='text-slate-900 font-medium'>Pallet/Crate Count
                  <input
                    className="rounded w-full p-2 border border-slate-900"
                    type="text"
                    value={palletCount}
                    onChange={(e) => {
                      setErrorText('');
                      setPalletCount(e.target.value);
                    }}
                  />
                </label>
                <label className='text-slate-900 font-medium'>Commodity
                  <input
                    className="rounded w-full p-2 border border-slate-900"
                    type="text"
                    value={commodity}
                    onChange={(e) => {
                      setErrorText('');
                      setCommodity(e.target.value);
                    }}
                  />
                </label>
              </div>
            )}

            <div className='flex gap-2'>
              <label className='text-slate-900 font-medium'>Length
                <input
                  className="rounded w-full p-2 border border-slate-900"
                  type="text"
                  value={length}
                  onChange={(e) => {
                    setErrorText('');
                    setLength(e.target.value);
                  }}
                />
              </label>
              <label className='text-slate-900 font-medium'>Width
                <input
                  className="rounded w-full p-2 border border-slate-900"
                  type="text"
                  value={width}
                  onChange={(e) => {
                    setErrorText('');
                    setWidth(e.target.value);
                  }}
                />
              </label>
              <label className='text-slate-900 font-medium'>Height
                <input
                  className="rounded w-full p-2 border border-slate-900"
                  type="text"
                  value={height}
                  onChange={(e) => {
                    setErrorText('');
                    setHeight(e.target.value);
                  }}
                />
              </label>
              <label className='text-slate-900 font-medium'>Weight
                <input
                  className="rounded w-full p-2 border border-slate-900"
                  type="text"
                  value={weight}
                  onChange={(e) => {
                    setErrorText('');
                    setWeight(e.target.value);
                  }}
                />
              </label>
            </div>
          </div>
          <button className="btn-slate" type="submit">
            Add Freight
          </button>
        </form>
        {!!errorText && <div className="text-red-500">{errorText}</div>}
      </div>
      <div className="w-full bg-white shadow overflow-hidden rounded-md border border-slate-400 max-h-screen overflow-y-auto flex-grow">
        <ul className="flex flex-col h-full">
          {freightList.map((freight, index) => (
            <li
              key={freight.id}
              className={`border-b border-slate-400 ${index === freightList.length - 1 ? '' : 'border-b'}`}
            >
              <div className="flex items-center p-4">
                <div className="flex-grow">
                  {freight.make} {freight.model} ({freight.year})
                </div>
                <button onClick={() => deleteFreight(freight.id)} className="text-red-500">
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FreightInventory;