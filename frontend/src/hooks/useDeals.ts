import { useContext } from 'react';
import { DealsContext } from '../context/DealsContext';

export function useDeals() {
    const ctx = useContext(DealsContext);
    if (!ctx) {
        throw new Error('useDeals must be used within DealsProvider');
    }
    return ctx;
}
