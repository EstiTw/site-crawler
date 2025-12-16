export const validateLoginForm = (
    email: string,
    password: string
): { isValid: boolean; error: string | null } => {
    if (!email.trim()) {
        return { isValid: false, error: 'Email is required' };
    }
    if (!password.trim()) {
        return { isValid: false, error: 'Password is required' };
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return { isValid: false, error: 'Please enter a valid email address' };
    }
    return { isValid: true, error: null };
};
