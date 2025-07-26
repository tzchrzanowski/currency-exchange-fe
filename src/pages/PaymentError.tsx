import React, { useState } from 'react';
import { Card, CardContent, Button, Typography, CircularProgress } from '@mui/material';
import { type StateFrom } from 'xstate';
import { exchangeMachine } from '../machines/ExchangeMachine';
import { useTranslation } from 'react-i18next';
import { postPayment } from '../services/paymentService';

type PaymentErrorProps = {
    send: (event: {type: 'PAYMENT_FAILED'}) => void;
    state: StateFrom<typeof exchangeMachine>;
};

const PaymentError: React.FC<PaymentErrorProps> = ({ send, state }) => {
    const { t } = useTranslation();
    
    const hadleGoBack = async () => {
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="h4">
                    {t('payment_failed')}
                </Typography>
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

export default PaymentError;

