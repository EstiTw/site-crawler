import React, { createContext, useCallback, useState } from 'react';
import { loginApi, fetchFilesApi } from '../api/dealsApi';
import { categorizeError } from '../utils/errorHandling';
import type { ErrorType } from '../utils/errorHandling';
import type { Deal, File } from '../types/deals';

interface DealsContextType {
    website: string | null;
    deals: Deal[];
    files: File[];
    isLoadingDeals: boolean;
    isLoadingFiles: boolean;
    error: string | null;
    errorType: ErrorType | null;

    setWebsite: (site: string) => void;
    login: (email: string, password: string) => Promise<void>;
    fetchFiles: (dealId: number) => Promise<void>;
    logout: () => void;
}

export const DealsContext = createContext<DealsContextType | undefined>(undefined);

function mapFile(apiFile: any) {
    return {
        id: apiFile.id,
        name: apiFile.name,
        size_in_bytes: apiFile.size_in_bytes,
        file_url: apiFile.file_url,
    };
}

export const DealsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [website, setWebsiteState] = useState<string | null>(
        () => localStorage.getItem('website')
    );
    const [deals, setDeals] = useState<Deal[]>([]);
    const [files, setFiles] = useState<File[]>([]);
    const [isLoadingDeals, setIsLoadingDeals] = useState(false);
    const [isLoadingFiles, setIsLoadingFiles] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [errorType, setErrorType] = useState<ErrorType | null>(null);

    const setWebsite = useCallback((site: string) => {
        setWebsiteState(site);
        localStorage.setItem('website', site);
    }, []);

    const login = useCallback(
        async (email: string, password: string) => {
            if (!website) throw new Error('Website not selected');

            setIsLoadingDeals(true);
            setError(null);

            try {
                const data = await loginApi(email, password, website);
                setDeals(data.available_deals);
            } catch (err) {
                const { message, type } = categorizeError(err);
                setError(message);
                setErrorType(type);
                throw err;
            } finally {
                setIsLoadingDeals(false);
            }
        },
        [website]
    );

    const fetchFiles = useCallback(
        async (dealId: number) => {
            if (!website) return;

            setIsLoadingFiles(true);
            setError(null);

            try {
                const data = await fetchFilesApi(dealId, website);
                const filesContainer = data.files?.[0]?.data ?? {};
                const rawFiles = Object.values(filesContainer);

                setFiles(rawFiles.map(mapFile));


            } catch (err) {
                const { message, type } = categorizeError(err);
                setError(message);
                setErrorType(type);

                if (type === 'auth') {
                    logout();
                }
            } finally {
                setIsLoadingFiles(false);
            }
        },
        [website]
    );

    const logout = useCallback(() => {
        setWebsiteState(null);
        setDeals([]);
        setFiles([]);
        setError(null);
        setErrorType(null);
        localStorage.removeItem('website');
    }, []);

    return (
        <DealsContext.Provider
            value={{
                website,
                deals,
                files,
                isLoadingDeals,
                isLoadingFiles,
                error,
                errorType,
                setWebsite,
                login,
                fetchFiles,
                logout,
            }}
        >
            {children}
        </DealsContext.Provider>
    );
};
