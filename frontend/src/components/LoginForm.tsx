import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Text,
    Alert,
    AlertIcon,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useDeals } from '../hooks/useDeals';
import { validateLoginForm } from '../utils/validation';

interface LoginFormProps {
    onLoginSuccess: () => void;
    onBack: () => void;
}

export const LoginForm = ({ onLoginSuccess, onBack }: LoginFormProps) => {
    const { login, isLoadingDeals, error, errorType, website } = useDeals();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [localError, setLocalError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLocalError(null);

        const { isValid, error } = validateLoginForm(email, password);
        if (!isValid) {
            setLocalError(error);
            return;
        }

        try {
            await login(email, password);
            onLoginSuccess();
        } catch {
            // handled in context
        }
    };

    const displayError = localError || error;


    return (
        <Box minH="100vh" bg="gray.50" display="flex" alignItems="center" justifyContent="center">
            <Box maxW="md" w="full" bg="white" p={8} borderRadius="xl" borderWidth={1}>
                <Stack spacing={6}>
                    <Box>
                        <Button variant="ghost" onClick={onBack} mb={4}>
                            ← Back
                        </Button>
                        <Heading size="lg">Login</Heading>

                        <Text color="gray.600">
                            Sign in to {website ? website.toUpperCase() : 'selected website'}
                        </Text>
                    </Box>

                    {displayError && (
                        <Alert status="error" borderRadius="md">
                            <AlertIcon />
                            <Text fontSize="sm">
                                {errorType === 'auth'
                                    ? 'Invalid email or password'
                                    : displayError}
                            </Text>
                        </Alert>
                    )}

                    <Box as="form" onSubmit={handleSubmit}>
                        <Stack spacing={4}>
                            <FormControl isRequired>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        setLocalError(null);
                                    }}
                                    isDisabled={isLoadingDeals}
                                />
                            </FormControl>

                            <FormControl isRequired>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                        setLocalError(null);
                                    }}
                                    isDisabled={isLoadingDeals}
                                />
                            </FormControl>

                            <Button
                                type="submit"
                                colorScheme="blue"
                                isLoading={isLoadingDeals}
                            >
                                Login
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
            </Box>
        </Box>
    );
};
