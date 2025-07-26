import React, { useState } from 'react';
import { Card, CardContent, Button, Typography, CircularProgress } from '@mui/material';
import { type StateFrom } from 'xstate';
import { exchangeMachine } from '../machines/ExchangeMachine';
import { useTranslation } from 'react-i18next';
import { postPayment } from '../services/paymentService';
import styles from './Pages.module.css';

type PaymentStepProps = {
    send: (event: {type: 'SUBMIT_PAYMENT'; transactionId: number}
        | {type: 'PAYMENT_FAILED'; error: string}
        | {type: 'GO_BACK'}
    ) => void;
    state: StateFrom<typeof exchangeMachine>;
};

const PaymentStep: React.FC<PaymentStepProps> = ({ send, state }) => {
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

    const handlePayment = async () => {
        setLoading(true);
            if (state.context.amount) {
            try {
                const data = await postPayment(state.context.amount);
                send({type: 'SUBMIT_PAYMENT', transactionId: data.transactionId});
            } catch (err) {
                console.error('Payment error: ', err);
                send({type: 'PAYMENT_FAILED', error: "error"});
            } finally {
                setLoading(false);
            }
        }
    }
    
    const hadleGoBack = async () => {
        send({ type: 'GO_BACK'});
    }

    return (
        <Card>
            <CardContent>
                <Typography variant="h4">
                    {t('confirm_exchange')}
                </Typography>
                <Typography variant="h6">
                    {t('selected')}: {state.context.selectedCurrency}
                </Typography>
                <Typography variant="h5">
                    {t('you_will_receive')}: {state.context.amount}
                </Typography>
                <div className={styles.buttonGroup}>
                    <Button
                        className={styles.buttonStyled}
                        variant="contained"
                        color="primary"
                        onClick={hadleGoBack}
                    >
                        {t('go_back')}
                    </Button>
                    <Button
                        className={styles.buttonStyled}
                        variant="contained"
                        color="primary"
                        onClick={handlePayment}
                        disabled={loading}
                    >
                        {loading ? <CircularProgress /> : <div>{t('pay_now')} {state.context.amountToPay.toFixed(2)}</div>}
                    </Button>
                </div>
            </CardContent>
        </Card>
    )
};

export default PaymentStep;

