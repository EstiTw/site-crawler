export type ErrorType = 'network' | 'auth' | 'server' | 'validation';

export function categorizeError(error: unknown): {
    message: string;
    type: ErrorType;
} {
    if (error instanceof Error) {
        if (error.message.toLowerCase().includes('token')) {
            return { message: error.message, type: 'auth' };
        }
        if (error.message.toLowerCase().includes('network')) {
            return { message: error.message, type: 'network' };
        }
        return { message: error.message, type: 'server' };
    }

    return { message: 'Unknown error', type: 'server' };
}
