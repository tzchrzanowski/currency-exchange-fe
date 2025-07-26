import React, { useState, useEffect } from 'react';
import { Card, CardContent, Button, Typography, CircularProgress } from '@mui/material';
import { type StateFrom } from 'xstate';
import { exchangeMachine } from '../machines/ExchangeMachine';
import { useTranslation } from 'react-i18next';
import { postTransaction, type TransactionBody} from '../services/paymentService';

type FinalPageProps = {
    send: (event: {type: 'PAYMENT_SUCCESS'; transactionId: string}) => void;
    state: StateFrom<typeof exchangeMachine>;
};

const FinalPage: React.FC<FinalPageProps> = ({ send, state }) => {
    const [finalResponse, setFinalResponse] = useState<string>('');
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

    useEffect(()=> {
        const load = async() => {
            setLoading(true);
            const payload: TransactionBody = {
                transactionId: 1,
                currency: state.context.selectedCurrency || '',
                type: "buy",
                amount: state.context.amount || 0 
            };

            try {
                const data = await postTransaction(payload);
                setFinalResponse(data);
            } catch (error) {
                console.error("Failed to fetch currencies list: ", error);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const hadleGoBack = async () => {
    }
    
    if (loading) return <CircularProgress />;
    
    return (
        <Card>
            <CardContent>
                <Typography variant="h4">
                    {t('final_step')}
                </Typography>
                {finalResponse == '200' ?
                        <Typography variant="h5">{t('success')}</Typography>
                        :
                        <Typography variant="h5">{t('failure')}</Typography>
                    }
                <Button
                    variant="contained"
                    color="primary"
                    onClick={hadleGoBack}
                >
                    {t('go_back')}
                </Button>
            </CardContent>
        </Card>
    )
};

export default FinalPage;

