import {
    Box,
    Button,
    Heading,
    SimpleGrid,
    Stack,
    Text,
} from '@chakra-ui/react';

interface WebsiteSelectorProps {
    onSelect: (website: string) => void;
}

const WEBSITES = [
    { id: 'fo1', name: 'FO1 Platform', description: 'Access FO1 deals and files' },
    { id: 'fo2', name: 'FO2 Platform', description: 'Access FO2 deals and files' },
];

export const WebsiteSelector = ({ onSelect }: WebsiteSelectorProps) => {
    return (
        <Box minH="100vh" bg="gray.50" py={20} px={4}>
            <Box maxW="5xl" mx="auto">
                <Stack spacing={16} align="center">
                    <Box textAlign="center">
                        <Heading as="h1" size="2xl" mb={4} color="gray.800">
                            Deals Management Platform
                        </Heading>
                        <Text fontSize="lg" color="gray.600" maxW="xl">
                            Choose a platform to access and manage deals
                        </Text>
                    </Box>

                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} w="full">
                        {WEBSITES.map((website) => (
                            <Button
                                key={website.id}
                                h="auto"
                                p={8}
                                variant="outline"
                                borderWidth={2}
                                borderRadius="xl"
                                onClick={() => onSelect(website.id)}
                                _hover={{
                                    bg: 'blue.50',
                                    borderColor: 'blue.500',
                                    shadow: 'lg',
                                    transform: 'translateY(-2px)',
                                    transition: 'all 0.2s',
                                }}
                                display="flex"
                                flexDirection="column"
                                alignItems="flex-start"
                                justifyContent="flex-start"
                            >
                                <Heading as="h3" size="lg" mb={2} color="gray.800">
                                    {website.name}
                                </Heading>
                                <Text fontSize="md" color="gray.600">
                                    {website.description}
                                </Text>
                            </Button>
                        ))}
                    </SimpleGrid>
                </Stack>
            </Box>
        </Box>
    );
};
