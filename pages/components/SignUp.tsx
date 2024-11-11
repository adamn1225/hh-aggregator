import { useState } from 'react';

const SignUp = () => {
    const [inviteEmail, setInviteEmail] = useState('');

    const handleInvite = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const response = await fetch('/api/send-invite', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: inviteEmail,
                redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
            }),
        });

        const data = await response.json();

        if (response.ok) {
            console.log('Invite sent successfully.');
        } else {
            console.error('Error sending invite:', data.error);
        }
    };

    return (
        <div className="xs:w-2/5 xs:h-auto w-full h-full max-w-sm p-5 bg-white shadow flex flex-col text-base">
            <span className="font-sans text-4xl text-center pb-2 mb-1 border-b mx-4 align-center">
                Send Invite
            </span>
            <form className="mt-4" onSubmit={handleInvite}>
                <label htmlFor="invite-email">Invite Email</label>
                <input
                    type="email"
                    id="invite-email"
                    name="invite-email"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    required
                    className="w-full p-2 mt-2 border rounded"
                />
                <button type="submit" className="btn-black w-full mt-4">Send Invite</button>
            </form>
        </div>
    );
};

export default SignUp;