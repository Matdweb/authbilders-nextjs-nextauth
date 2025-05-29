import type {
    AuthServerActionState,
    User,
    AuthServerActionStateErrors
} from "../defintions";

type AuthServerActionStateExtras = {
    user?: User;
    errors?: AuthServerActionStateErrors;
};

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
