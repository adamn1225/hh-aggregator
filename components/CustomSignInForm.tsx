import { useSupabaseClient, useSession } from '@supabase/auth-helpers-react'
import { Auth, ThemeSupa } from '@supabase/auth-ui-react'
import React from 'react'

export default function CustomSignInForm() {
    const supabase = useSupabaseClient()

    const handleSignInWithGoogle = async () => {
        const { error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
        })
        if (error) console.log('Error signing in with Google:', error.message)
    }

    const handleSignInWithEmail = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const email = (event.target as HTMLFormElement).email.value
        const password = (event.target as HTMLFormElement).password.value
        const { error } = await supabase.auth.signInWithPassword({ email, password })
        if (error) console.log('Error signing in with email:', error.message)
    }

    return (
        <div className="w-full h-full sm:h-auto sm:w-2/5 max-w-sm p-5 bg-white shadow flex flex-col text-base">
            <span className="font-sans text-4xl text-center pb-2 mb-1 border-b mx-4 align-center">
                Login
            </span>
            <form className="mt-4" onSubmit={handleSignInWithEmail}>
                <label htmlFor="email">Email address</label>
                <input type="email" id="email" name="email" required className="w-full p-2 mt-2 border rounded" />
                <label htmlFor="password" className="mt-4">Your Password</label>
                <input type="password" id="password" name="password" required className="w-full p-2 mt-2 border rounded" />
                <button type="submit" className="btn-black w-full mt-4">Sign in</button>
            </form>
            <button
                className="btn-black w-full mt-4"
                onClick={handleSignInWithGoogle}
            >
                Sign in with Google
            </button>
            <div className="mt-4 text-center">
                <a href="#" className="text-sm">Forgot your password?</a>
                <p className="text-sm mt-2">Don't have an account? <a href="#" className="text-blue-500">Sign up</a></p>
            </div>
        </div>
    )
}