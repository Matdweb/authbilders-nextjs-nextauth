import { errorResponse, successResponse } from './response';
import { signIn } from 'next-auth/react';
import type { ThirdPartyProvidersNames } from '@/components/(AuthBilders)/Form/AuthForm';
import { extractErrorDetails } from './errors';

export const signInWithProvider = async (provider: ThirdPartyProvidersNames) => {
    try {
        await signIn(provider, {
            callbackUrl: '/',
        });
        return successResponse(['User signed in successfully'])
    } catch (error) {
        const { message = "Unexpected error occurred." } = extractErrorDetails(error);
        return errorResponse(['Failed to sign in'], {
            providers: [message],
        });
    }
}