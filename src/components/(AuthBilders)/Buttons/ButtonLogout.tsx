'use client';
import { signOut } from 'next-auth/react'

export default function ButtonLogout() {
    return (
        <p
            onClick={() => signOut()}
            className="text-sm/6 font-semibold text-gray-200 cursor-pointer">
            Sign out
            <span aria-hidden="true">→</span>
        </p>
    )
}