import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { type StateFrom } from 'xstate';
import { exchangeMachine } from '../machines/ExchangeMachine';
import { useTranslation } from 'react-i18next';
import styles from './Pages.module.css';

type AmountInputProps = {
    send: (event: {type: 'ENTER_AMOUNT'; amount: number} | {type: 'GO_BACK'}) => void;
    state: StateFrom<typeof exchangeMachine>;
}

const AmountInput: React.FC<AmountInputProps> = ({ send, state }) => {
    const [amount, setAmount] = useState<string>('');

    const { t } = useTranslation();

    const handleSubmit = () => {
        const num = parseFloat(amount);
        send({ type: "ENTER_AMOUNT", amount: num});
    };

    const hadleGoBack = async () => {
        send({ type: 'GO_BACK'});
    }

    return (
        <div>
            <Typography variant="h5">
                {t('selected')}: {state.context.selectedCurrency}
            </Typography>
            <TextField
                label={t('enter_amount')}
                value={amount}
                onChange={((e)=> setAmount(e.target.value))}
                fullWidth
                margin="normal"
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
                    onClick={handleSubmit} 
                    variant="contained"
                    disabled={!amount}
                >{t('next')}</Button>
            </div>
        </div>
    );
};

export default AmountInput