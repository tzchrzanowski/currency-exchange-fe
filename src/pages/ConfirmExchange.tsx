import React, { useState } from 'react';
import { Card, CardContent, Checkbox, FormControlLabel, Button, Typography } from '@mui/material';
import { type StateFrom } from 'xstate';
import { exchangeMachine } from '../machines/ExchangeMachine';
import { useTranslation } from 'react-i18next';
import styles from './Pages.module.css';

type ConfirmExchangeProps = {
    send: (event: {
        type: 'CONFIRM_AMOUNT';
        amountConfirmed: boolean,
        amountToPay: number,
        selectedOption: string
    } | {type: 'GO_BACK'}) => void;
    state: StateFrom<typeof exchangeMachine>;
}

const ConfirmExchange: React.FC<ConfirmExchangeProps> = ({ send, state }) => {
    const [amountConfirmed, setAmountConfirmed] = useState<boolean>(false);
    const [selectedOption, setSelectedOption] = useState<'sell' | 'buy'>('sell');

    const { t } = useTranslation();

    const amountCalc = state.context.amount ?? 0;
    const sellCalc = state.context.sell ?? 1;
    const resultCalc = selectedOption === 'sell' ? 
        (amountCalc / sellCalc)
        :
        (amountCalc * (state.context.buy ?? 1)); 
    
    const handleSubmit = () => {
        send({ 
            type: "CONFIRM_AMOUNT",
            amountConfirmed: amountConfirmed,
            amountToPay: resultCalc,
            selectedOption: selectedOption
        });
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

                <div className={styles.optionToggle}>
                    <Button
                        variant={selectedOption === 'sell' ? 'contained' : 'outlined'}
                        color="secondary"
                        onClick={()=> setSelectedOption('sell')}
                    >
                        {t('sell')}
                    </Button>
                    <Button
                        variant={selectedOption === 'buy' ? 'contained' : 'outlined'}
                        color="secondary"
                        onClick={()=> setSelectedOption('buy')}
                    >
                        {t('buy')}
                    </Button>
                </div>
                <Typography variant="h5">
                    {t('you_will_receive')} : {resultCalc.toFixed(2)} {selectedOption}
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
                        onClick={handleSubmit}
                        disabled={!amountConfirmed}
                    >
                        {t('go_to_payment')}
                    </Button>
                </div>

            </CardContent>
        </Card>
    );
};

export default ConfirmExchange