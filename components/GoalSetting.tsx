import { Element } from 'domhandler';
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { useSupabaseClient, Session } from '@supabase/auth-helpers-react';
import { Database } from '@/lib/schema';
import parse from 'html-react-parser';
import 'react-quill/dist/quill.snow.css'; // Import Quill styles

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

interface GoalSettingProps {
    session: Session | null;
}

type Goal = Database['public']['Tables']['goals']['Row'];

const GoalSetting = ({ session }: GoalSettingProps) => {
    const supabase = useSupabaseClient<Database>();
    const [goals, setGoals] = useState<Goal[]>([]);
    const [newGoal, setNewGoal] = useState<string>('');
    const [dueDate, setDueDate] = useState<string>('');
    const [isComplete, setIsComplete] = useState<boolean>(false);
    const [errorText, setErrorText] = useState<string>('');

    useEffect(() => {
        if (session?.user?.id) {
            fetchGoals();
        }
    }, [session]);

    const fetchGoals = async () => {
        if (!session?.user?.id) return;

        const { data, error } = await supabase
            .from('goals')
            .select('*')
            .eq('user_id', session.user.id);

        if (error) {
            console.error('Error fetching goals:', error.message);
        } else {
            setGoals(data || []);
        }
    };

    const addGoal = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!session?.user?.id) return;

        const { data, error } = await supabase
            .from('goals')
            .insert([{ goal: newGoal, user_id: session.user.id, due_date: dueDate, is_complete: isComplete }])
            .select();

        if (error) {
            console.error('Error adding goal:', error.message);
            setErrorText('Error adding goal');
        } else {
            setGoals([...goals, ...(data || [])]);
            setNewGoal('');
            setDueDate('');
            setIsComplete(false);
            setErrorText('');
        }
    };

    const updateGoal = async (id: number, is_complete: boolean) => {
        if (!session?.user?.id) return;

        const { error } = await supabase
            .from('goals')
            .update({ is_complete })
            .eq('id', id);

        if (error) {
            console.error('Error updating goal:', error.message);
        } else {
            fetchGoals();
        }
    };

    const deleteGoal = async (id: number) => {
        if (!session?.user?.id) return;

        const { error } = await supabase
            .from('goals')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Error deleting goal:', error.message);
        } else {
            fetchGoals();
        }
    };

    const toolbarOptions = [
        [{ 'header': [1, 2, false] }],
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
        ['link', 'image'],
        ['clean']                                         // remove formatting button
    ];

    const modules = {
        toolbar: toolbarOptions
    };

    const renderGoalContent = (htmlContent: string) => {
        return parse(htmlContent || '', {
            replace: (domNode) => {
                if (domNode instanceof Element && domNode.attribs && domNode.attribs['data-checked']) {
                    return (
                        <input
                            type="checkbox"
                            checked={domNode.attribs['data-checked'] === 'true'}
                            readOnly
                        />
                    );
                }
            }
        });
    };

    return (
        <div className="w-full flex flex-row gap-12">
            <div className="w-3/5">
                <h1 className="mb-12 text-2xl">Your Goals</h1>
                <h3>Set up goals, mark them complete or delete. Set up reminders for your goals.</h3>
                <form onSubmit={addGoal} className="flex flex-col gap-2 my-2">
                    <label className='text-slate-900 font-semibold'>Goal
                        <ReactQuill
                            value={newGoal}
                            onChange={(value) => {
                                setErrorText('');
                                setNewGoal(value);
                            }}
                            placeholder="Enter your goal"
                            className="rounded w-full p-2 border border-slate-900"
                            style={{ height: '300px', width: '100%' }}
                            modules={modules}
                        />
                    </label>
                    <div className='flex flex-col gap-4'>
                        <label className='text-slate-900 font-medium'>Goal Due Date
                            <input
                                className="rounded w-full p-2 border border-slate-900"
                                type="date"
                                value={dueDate}
                                onChange={(e) => {
                                    setErrorText('');
                                    setDueDate(e.target.value);
                                }}
                            />
                        </label>
                        <label className='text-slate-900 font-medium'>Complete
                            <input
                                type="checkbox"
                                checked={isComplete}
                                onChange={(e) => setIsComplete(e.target.checked)}
                                className="ml-2"
                            />
                        </label>
                    </div>
                    <button className="btn-slate" type="submit">
                        Add Goal
                    </button>
                </form>
                {!!errorText && <div className="text-red-500">{errorText}</div>}
            </div>
            <div className="w-full bg-white shadow overflow-hidden rounded-md border border-slate-400 max-h-screen overflow-y-auto flex-grow">
                <ul className="flex flex-col h-full">
                    {goals.map((goal, index) => (
                        <li
                            key={goal.id}
                            className={`border-b border-slate-400 ${index === goals.length - 1 ? '' : 'border-b'}`}
                        >
                            <div className="flex items-center p-4">
                                <input
                                    type="checkbox"
                                    checked={goal.is_complete || false}
                                    onChange={(e) => updateGoal(goal.id, e.target.checked)}
                                    className="mr-4"
                                />
                                <div className="flex-grow">
                                    {renderGoalContent(goal.goal || '')}
                                </div>
                                <div>(Due: {goal.due_date || 'No due date'})</div>
                                <button onClick={() => deleteGoal(goal.id)} className="text-red-500">
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

export default GoalSetting;