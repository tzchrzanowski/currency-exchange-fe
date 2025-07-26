import React, { useState, useEffect } from 'react';
import { Card, CardContent, Checkbox, FormControlLabel, Button, Typography } from '@mui/material';
import { type StateFrom } from 'xstate';
import { exchangeMachine } from '../machines/ExchangeMachine';
import { useTranslation } from 'react-i18next';

type ConfirmExchangeProps = {
    send: (event: {type: 'CONFIRM_AMOUNT'; amountConfirmed: boolean}) => void;
    state: StateFrom<typeof exchangeMachine>;
}

const ConfirmExchange: React.FC<ConfirmExchangeProps> = ({ send, state }) => {
    const [amountConfirmed, setAmountConfirmed] = useState<boolean>(false);

    const { t } = useTranslation();

    const handleSubmit = () => {
        send({ type: "CONFIRM_AMOUNT", amountConfirmed: amountConfirmed});
    };

    return (
        <Card>
            <CardContent>
                <Typography variant="h5">
                    {t('confirm_exchange')}
                </Typography>
                <Typography variant="h5">
                    {t('selected')}: {state.context.selectedCurrency}
                </Typography>
                <Typography variant="h5">
                    {t('exchange_rate')} {t('sell')}: {state.context.sell}
                </Typography>
                <Typography variant="h5">
                    {t('exchange_rate')} {t('buy')}: {state.context.buy}
                </Typography>
                <FormControlLabel 
                    control={
                        <Checkbox 
                            checked={amountConfirmed}
                            onChange={(e)=> setAmountConfirmed(e.target.checked)}
                        />
                    }
                    label={t('agree_to_exchange')}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSubmit}
                    disabled={!amountConfirmed}
                >
                    {t('go_to_payment')}
                </Button>
            </CardContent>
        </Card>
    );
};

export default ConfirmExchange