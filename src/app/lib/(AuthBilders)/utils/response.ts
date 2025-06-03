import type {
    AuthServerActionState,
    AuthServerActionStateErrors,
    AuthServerActionStateExtras
} from "../defintions";

export const successResponse = (
    message: string[] = [],
    extras?: Omit<AuthServerActionStateExtras, 'errors'>
): AuthServerActionState => ({
    success: true,
    message,
    ...(extras || {}),
});

export const errorResponse = (
    message: string[] = [],
    errors?: AuthServerActionStateErrors
): AuthServerActionState => ({
    success: false,
    message,
    errors,
});
