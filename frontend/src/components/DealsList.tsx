import {
    Box,
    Button,
    Heading,
    SimpleGrid,
    Spinner,
    Stack,
    Text,
} from '@chakra-ui/react';
import { useDeals } from '../hooks/useDeals';

interface DealsListProps {
    onSelectDeal: (dealId: number) => void;
    onLogout: () => void;
}

export const DealsList = ({ onSelectDeal, onLogout }: DealsListProps) => {
    const { deals, isLoadingDeals } = useDeals();

    return (
        <Box minH="100vh" bg="gray.50" py={12} px={4}>
            <Box maxW="7xl" mx="auto">
                <Stack spacing={10}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                        <Box>
                            <Heading size="xl">Available Deals</Heading>
                            <Text color="gray.600">
                                Select a deal to view available files
                            </Text>
                        </Box>
                        <Button colorScheme="red" onClick={onLogout}>
                            Logout
                        </Button>
                    </Box>

                    {isLoadingDeals ? (
                        <Spinner size="xl" />
                    ) : deals.length === 0 ? (
                        <Text color="gray.600">No deals available</Text>
                    ) : (
                        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                            {deals.map((deal) => (
                                <Box
                                    key={deal.id}
                                    p={6}
                                    bg="white"
                                    borderRadius="xl"
                                    borderWidth={1}
                                >
                                    <Stack spacing={3}>
                                        <Heading size="md">{deal.title}</Heading>
                                        <Text fontSize="sm" color="gray.500">
                                            Deal ID: {deal.id}
                                        </Text>
                                        <Button
                                            colorScheme="blue"
                                            onClick={() => onSelectDeal(deal.id)}
                                        >
                                            View Files
                                        </Button>
                                    </Stack>
                                </Box>
                            ))}
                        </SimpleGrid>
                    )}
                </Stack>
            </Box>
        </Box>
    );
};
