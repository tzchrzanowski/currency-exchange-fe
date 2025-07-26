import api from './api';

export interface Currency {
    currency: string;
    buy: number;
    sell: number;
}

export const fetchCurrencies = async (): Promise<Currency[]> => {
    const response = await api.get<Currency[]>('/currencies');
    return response.data;
}