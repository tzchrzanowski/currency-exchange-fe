import api from './api';

export interface TransactionBody {
    transactionId: number,
    currency: string,
    type: string,
    amount: number
};

export async function postPayment(amount: number) {
    const response = await api.post('/pay', { amount });
    return response.data;
}

export async function postTransaction(payload: TransactionBody) {
    const response = await api.post('/transaction', payload);
    return response.data;
}