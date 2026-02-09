
import { useState } from 'react';

export interface ValidationData {
    code: string;
    status: 'success' | 'error';
    message: string;
    ticket?: {
        dealTitle: string;
        customerName: string;
        discount: string;
        originalPrice: number;
        finalPrice: number;
        savedAmount: number;
    };
    errorType?: 'expired' | 'redeemed' | 'invalid' | 'wrong_store';
}

export function useTicketValidation() {
    const [isLoading, setIsLoading] = useState(false);

    const validateTicket = async (code: string): Promise<ValidationData> => {
        setIsLoading(true);

        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        setIsLoading(false);

        // Mock logic based on code patterns
        if (code.startsWith('WIN-')) {
            if (code.includes('EXP')) {
                return {
                    code,
                    status: 'error',
                    message: 'This ticket has expired.',
                    errorType: 'expired'
                };
            }
            if (code.includes('USED')) {
                return {
                    code,
                    status: 'error',
                    message: 'This ticket has already been redeemed.',
                    errorType: 'redeemed'
                };
            }
            if (code.includes('STORE')) {
                return {
                    code,
                    status: 'error',
                    message: 'This ticket is for a different store.',
                    errorType: 'wrong_store'
                };
            }

            return {
                code,
                status: 'success',
                message: 'Variables ticket!',
                ticket: {
                    dealTitle: '50% Off Gourmet Burger Menu',
                    customerName: 'Ahmed Ben Ali',
                    discount: '50%',
                    originalPrice: 35.00,
                    finalPrice: 17.50,
                    savedAmount: 17.50
                }
            };
        }

        return {
            code,
            status: 'error',
            message: 'Invalid ticket code format.',
            errorType: 'invalid'
        };
    };

    return { validateTicket, isLoading };
}
