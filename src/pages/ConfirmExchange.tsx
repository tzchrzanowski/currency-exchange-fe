import React, { useState } from 'react';
import { Card, CardContent, Checkbox, FormControlLabel, Button, Typography } from '@mui/material';
import { type StateFrom } from 'xstate';
import { exchangeMachine } from '../machines/ExchangeMachine';
import { useTranslation } from 'react-i18next';

type ConfirmExchangeProps = {
    send: (event: {type: 'CONFIRM_AMOUNT'; amountConfirmed: boolean, amountToPay: number} | {type: 'GO_BACK'}) => void;
    state: StateFrom<typeof exchangeMachine>;
}

const ConfirmExchange: React.FC<ConfirmExchangeProps> = ({ send, state }) => {
    const [amountConfirmed, setAmountConfirmed] = useState<boolean>(false);

    const { t } = useTranslation();

    const amountCalc = state.context.amount ?? 0;
    const sellCalc = state.context.sell ?? 1;
    const resultCalc = (amountCalc / sellCalc);
    const sourceCurrency = state.context.selectedCurrency?.split("/")[1] ?? 'PLN';
    const targetCurrency = state.context.selectedCurrency?.split("/")[0] ?? '';
    
    const handleSubmit = () => {
        send({ type: "CONFIRM_AMOUNT", amountConfirmed: amountConfirmed, amountToPay: resultCalc});
    };

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
                <Typography variant="h6">
                    {t('exchange_rate')} {t('sell')}: {state.context.sell} {t('buy')}: {state.context.buy}
                </Typography>
                <Typography variant="h5">
                    {t('you_will_receive')}: {state.context.amount} {targetCurrency}
                </Typography>
                <Typography variant="h5">
                    {t('you_will_pay')} : {resultCalc.toFixed(2)} {sourceCurrency}
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
                    onClick={hadleGoBack}
                >
                    {t('go_back')}
                </Button>
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