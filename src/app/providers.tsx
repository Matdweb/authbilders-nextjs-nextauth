'use client'

import { HeroUIProvider, ToastProvider } from '@heroui/react';
import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

export function Providers({ children, session }: { children: React.ReactNode, session?: Session | null }) {
    return (
        <SessionProvider session={session}>
            <HeroUIProvider>
                <ToastProvider placement="bottom-left" />
                {children}
            </HeroUIProvider>
        </SessionProvider>
    )
}