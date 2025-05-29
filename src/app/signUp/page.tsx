'use client';
import AuthForm from '@/components/(AuthBilders)/Form/AuthForm'
import { passwordSchema } from '../lib/(AuthBilders)/zod'
import { signUp } from '@/app/lib/(AuthBilders)/actions'
import Link from 'next/link'

export default function SignUpPage() {
    return (
        <AuthForm
            title="Sign Up"
            strategy="server"
            action={signUp}
            fields={[
                {
                    name: 'email',
                    label: 'Email',
                    type: 'email',
                    required: true,
                },
                {
                    name: 'password',
                    label: 'Password',
                    type: 'password',
                    required: true,
                    schema: passwordSchema,
                    onValueChange: (val) => passwordSchema.safeParse(val).success || undefined
                }
            ]}
            thirdPartyProviders={['google', 'github']}
            extraContent={
                <section className="mt-8 text-gray-400">
                    <p className="text-center">
                        You already have an account? <Link href="/login" className="text-blue-500">Login</Link>
                    </p>
                </section>
            }
        />
    )
}
