'use client';
import AuthForm from '@/components/(AuthBilders)/Form/AuthForm'
import { passwordSchema } from '../lib/(AuthBilders)/zod';
import Link from 'next/link'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const { data: session } = useSession();
    const router = useRouter();

    if (session?.user) {
        router.push('/');
    }

    return (
        <AuthForm
            title="Login"
            strategy="next-auth"
            redirectTo='/'
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
                <section className="mt-4 text-gray-400">
                    <p className="text-center">
                        Don&apos;t have an account? <Link href="/signUp" className="text-blue-500">Sign Up</Link>
                    </p>
                    <p className="text-center">
                        A lot in mind? <Link href="/forgot-password/provide-email" className="text-blue-500 cursor-pointer">Forgot password</Link>
                    </p>
                </section>
            }
        />
    )
}
