import { Database } from '@/lib/schema';
import { Session, useSupabaseClient } from '@supabase/auth-helpers-react';
import { useEffect, useState } from 'react';

type Todos = Database['public']['Tables']['todos']['Row'];

export default function TodoList({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>();
  const [todos, setTodos] = useState<Todos[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [newTaskDate, setNewTaskDate] = useState('');
  const [selectedApp, setSelectedApp] = useState('');
  const [otherAppUrl, setOtherAppUrl] = useState('');
  const [errorText, setErrorText] = useState('');

  const user = session.user;

  useEffect(() => {
    const fetchTodos = async () => {
      const { data: todos, error } = await supabase
        .from('todos')
        .select('*')
        .order('id', { ascending: true });

      if (error) console.log('error', error);
      else setTodos(todos);
    };

    fetchTodos();
  }, [supabase]);

  const addTodo = async (taskText: string, taskDate: string, appUrl: string) => {
    let task = taskText.trim();
    if (task.length && taskDate) {
      const { data: todo, error } = await supabase
        .from('todos')
        .insert({ task, user_id: user.id, due_date: taskDate, app_url: appUrl }) // Insert the task with the due date and app URL
        .select()
        .single();

      if (error) {
        setErrorText(error.message);
      } else {
        setTodos([...todos, todo]);
        setNewTaskText('');
        setNewTaskDate('');
        setSelectedApp('');
        setOtherAppUrl('');
        // Schedule email reminder if user.email is defined
        if (user.email) {
          await fetch('/api/sendEmail', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ to: user.email, task, date: taskDate, appUrl }),
          });
        } else {
          console.error('User email is undefined');
        }
      }
    }
  };

  const updateTodo = async (id: number, taskText: string, taskDate: string, appUrl: string, isComplete: boolean, inProgress: boolean) => {
    let task = taskText.trim();
    if (task.length && taskDate) {
      const { data: todo, error } = await supabase
        .from('todos')
        .update({ task, due_date: taskDate, app_url: appUrl, is_complete: isComplete, in_progress: inProgress })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        setErrorText(error.message);
      } else {
        setTodos(todos.map((t) => (t.id === id ? todo : t)));
      }
    }
  };

  const deleteTodo = async (id: number) => {
    try {
      await supabase.from('todos').delete().eq('id', id).throwOnError();
      setTodos(todos.filter((x) => x.id != id));
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const appUrl = selectedApp === 'Other' ? otherAppUrl : selectedApp;
    addTodo(newTaskText, newTaskDate, appUrl);
  };

  return (
    <div className="w-full flex flex-row gap-12">
      <div className="w-3/5">
        <h1 className="mb-12 text-2xl">Your Reminders</h1>
        <h3>Set up tasks, mark them complete or delete. Set up email reminders - you&apos;ll get an email once a task is created and the reminder email on the date & time selected.</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-2 my-2">
          <label className='text-slate-900 font-semibold'>Task/Goal<textarea
            className="rounded w-full p-2 border border-slate-900"
            placeholder="Post/Call order #611555, email, etc."
            value={newTaskText}
            onChange={(e) => {
              setErrorText('');
              setNewTaskText(e.target.value);
            }}
          /></label>
          <div className='flex flex-col gap-4'>
            <label className='text-slate-900 font-medium'>Task Reminder/Due/Goal Date
              <input
                className="rounded w-full p-2 border border-slate-900"
                type="datetime-local"
                value={newTaskDate}
                onChange={(e) => {
                  setErrorText('');
                  setNewTaskDate(e.target.value);
                }}
              /></label>
            <label className='text-slate-900 font-medium'>Which application is this for?
              <select
                className="rounded w-full p-2"
                value={selectedApp}
                onChange={(e) => setSelectedApp(e.target.value)}
              >
                <option value="">Select an app</option>
                <option value="https://main.truckstop.com/">Truckstop</option>
                <option value="https://crm.ntsconnect.com/">NTS Connect</option>
                <option value="https://outlook.office.com/">Outlook</option>
                <option value="https://express.dat.com/">DAT</option>
                <option value="Other">Other</option>
              </select></label>
            {selectedApp === 'Other' && (
              <input
                className="rounded w-full p-2"
                type="url"
                placeholder="Enter other app URL"
                value={otherAppUrl}
                onChange={(e) => setOtherAppUrl(e.target.value)}
              />
            )}
          </div>
          <button className="btn-slate" type="submit">
            Add
          </button>
        </form>
        {!!errorText && <Alert text={errorText} />}
      </div>
      <div className="w-full bg-white shadow overflow-hidden rounded-md border border-slate-400 max-h-screen overflow-y-auto flex-grow">
        <ul className="flex flex-col h-full">
          {todos.map((todo, index) => (
            <li
              key={todo.id}
              className={`border-b border-slate-400 ${index === todos.length - 1 ? '' : 'border-b'}`}
            >
              <Todo todo={todo} onDelete={() => deleteTodo(todo.id)} onUpdate={updateTodo} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const Todo = ({ todo, onDelete, onUpdate }: { todo: Todos; onDelete: () => void; onUpdate: (id: number, taskText: string, taskDate: string, appUrl: string, isComplete: boolean, inProgress: boolean) => void }) => {
  const supabase = useSupabaseClient<Database>();
  const [isCompleted, setIsCompleted] = useState(todo.is_complete ?? false);
  const [isInProgress, setIsInProgress] = useState(todo.in_progress ?? false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTaskText, setEditedTaskText] = useState(todo.task || '');
  const [editedTaskDate, setEditedTaskDate] = useState(todo.due_date || '');
  const [editedAppUrl, setEditedAppUrl] = useState(todo.app_url || '');

  const toggleCompletion = async () => {
    try {
      const { data } = await supabase
        .from('todos')
        .update({ is_complete: !isCompleted })
        .eq('id', todo.id)
        .throwOnError()
        .select()
        .single();

      if (data) setIsCompleted(data.is_complete ?? false);
    } catch (error) {
      console.log('error', error);
    }
  };

  const toggleProgress = async () => {
    try {
      const { data } = await supabase
        .from('todos')
        .update({ in_progress: !isInProgress })
        .eq('id', todo.id)
        .throwOnError()
        .select()
        .single();

      if (data) setIsInProgress(data.in_progress ?? false);
    } catch (error) {
      console.log('error', error);
    }
  };

  const handleUpdate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdate(todo.id, editedTaskText, editedTaskDate, editedAppUrl, isCompleted, isInProgress);
    setIsEditing(false);
  };

  return (
    <li className="w-full block cursor-pointer hover:bg-200 focus:outline-none focus:bg-200 transition duration-150 ease-in-out">
      <div className="flex flex-col w-full px-4 py-4 sm:px-6">
        {isEditing ? (
          <div className="w-full">
            <form onSubmit={handleUpdate} className="flex flex-col gap-2 w-full">
              <input
                className="rounded w-full p-2"
                type="text"
                value={editedTaskText}
                onChange={(e) => setEditedTaskText(e.target.value)}
              />
              <input
                className="rounded w-full p-2"
                type="datetime-local"
                value={editedTaskDate}
                onChange={(e) => setEditedTaskDate(e.target.value)}
              />
              <input
                className="rounded w-full p-2"
                type="url"
                value={editedAppUrl}
                onChange={(e) => setEditedAppUrl(e.target.value)}
              />
              <button className="btn-slate" type="submit">
                Save
              </button>
              <button
                className="btn-reverse-slate"
                type="button"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </form>
          </div>
        ) : (
          <div className="w-full flex flex-col">
            <div className="flex justify-between items-start mb-2">
              <div className="text-left flex gap-4 border-b border-slate-400/80">
                {todo.due_date && (
                  <p className="text-sm text-gray-500">Due: {new Date(todo.due_date).toLocaleString()}</p>
                )}
                {todo.app_url && (
                  <p className="text-sm text-blue-500">
                    <a href={todo.app_url} target="_blank" rel="noopener noreferrer">
                      App Link - {new URL(todo.app_url).hostname}
                    </a>
                  </p>
                )}
              </div>
              <div>
                <input
                  className="cursor-pointer"
                  onChange={(e) => toggleCompletion()}
                  type="checkbox"
                  checked={isCompleted}
                />
              </div>
            </div>
            <div className="flex justify-normal flex-grow">
              <p className="text-lg">{todo.task}</p>
            </div>
            <div className="flex justify-end mt-2">
              <select
                className="w-24 ml-2 border-2 rounded"
                onChange={(e) => {
                  const action = e.target.value;
                  if (action === 'edit') {
                    setIsEditing(true);
                  } else if (action === 'delete') {
                    onDelete();
                  } else if (action === 'complete') {
                    toggleCompletion();
                  } else if (action === 'progress') {
                    toggleProgress();
                  }
                  // Reset the select value to default
                  e.target.value = '';
                }}
              >
                <option value="">Actions</option>
                <option value="edit">Edit</option>
                <option value="delete">Delete</option>
                <option value="progress">Mark as In Progress</option>
                <option value="complete">Mark as Completed</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </li>
  );
};

const Alert = ({ text }: { text: string }) => (
  <div className="rounded-md bg-red-100 p-4 my-3">
    <div className="text-sm leading-5 text-red-700">{text}</div>
  </div>
);