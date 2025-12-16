import {
    Box,
    Button,
    Spinner,
    Stack,
    Text,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Link,
} from '@chakra-ui/react';
import { useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDeals } from '../hooks/useDeals';
import { formatFileSize } from '../utils/format';

export const FilesList = ({ onBack }: { onBack: () => void }) => {
    const { dealId } = useParams<{ dealId: string }>();
    const { files, fetchFiles, isLoadingFiles, deals } = useDeals();

    const currentDeal = useMemo(
        () => deals.find(d => d.id === Number(dealId)),
        [deals, dealId]
    );

    useEffect(() => {
        if (!dealId) return;

        const loadFiles = async () => {
            await fetchFiles(Number(dealId));
        };

        loadFiles();
    }, [dealId, fetchFiles]);

    return (
        <Box minH="100vh" bg="gray.50" py={12} px={4}>
            <Box maxW="7xl" mx="auto">
                <Stack spacing={10}>

                    {/* Header */}
                    <Box>
                        <Button
                            variant="ghost"
                            colorScheme="blue"
                            mb={6}
                            size="lg"
                            onClick={onBack}
                            _hover={{ bg: 'blue.50' }}
                        >
                            ← Back to Deals
                        </Button>

                        <Heading as="h1" size="2xl" mb={2} color="gray.800">
                            Files for {currentDeal?.title ?? 'Deal'}
                        </Heading>

                        <Text color="gray.600" fontSize="md">
                            Deal ID:{' '}
                            <Text as="span" fontWeight="700">
                                {currentDeal?.id ?? dealId}
                            </Text>
                        </Text>
                    </Box>

                    {isLoadingFiles ? (
                        <Box display="flex" justifyContent="center" py={20}>
                            <Spinner size="xl" color="blue.500" thickness="4px" />
                        </Box>
                    ) : files.length === 0 ? (
                        <Box py={20} textAlign="center">
                            <Text fontSize="lg" color="gray.600">
                                No files available for this deal
                            </Text>
                        </Box>
                    ) : (
                        <Box
                            bg="white"
                            borderRadius="xl"
                            borderWidth={1}
                            borderColor="gray.200"
                            overflow="hidden"
                        >
                            <TableContainer>
                                <Table variant="simple" size="lg">
                                    <Thead bg="gray.100">
                                        <Tr>
                                            <Th fontSize="md" fontWeight="700" color="gray.700" py={4}>
                                                File Name
                                            </Th>
                                            <Th fontSize="md" fontWeight="700" color="gray.700">
                                                Size
                                            </Th>
                                            <Th fontSize="md" fontWeight="700" color="gray.700">
                                                Action
                                            </Th>
                                        </Tr>
                                    </Thead>

                                    <Tbody>
                                        {files.map(file => (
                                            <Tr
                                                key={file.id}
                                                borderColor="gray.100"
                                                _hover={{ bg: 'gray.50' }}
                                            >
                                                <Td fontWeight="500" color="gray.800" py={4}>
                                                    {file.name}
                                                </Td>

                                                <Td color="gray.600">
                                                    {formatFileSize(file.size_in_bytes)}
                                                </Td>

                                                <Td>
                                                    <Link
                                                        href={file.file_url}
                                                        isExternal
                                                        _hover={{ textDecoration: 'none' }}
                                                    >
                                                        <Button
                                                            colorScheme="blue"
                                                            size="sm"
                                                            variant="solid"
                                                        >
                                                            Download
                                                        </Button>
                                                    </Link>
                                                </Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )}
                </Stack>
            </Box>
        </Box>
    );
};
