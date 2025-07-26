import React, { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { type StateFrom } from 'xstate';
import { exchangeMachine } from '../machines/ExchangeMachine';
import { useTranslation } from 'react-i18next';

type AmountInputProps = {
    send: (event: {type: 'ENTER_AMOUNT'; amount: number}) => void;
    state: StateFrom<typeof exchangeMachine>;
}

const AmountInput: React.FC<AmountInputProps> = ({ send, state }) => {
    const [amount, setAmount] = useState<string>('');

    const { t } = useTranslation();

    const handleSubmit = () => {
        const num = parseFloat(amount);
        send({ type: "ENTER_AMOUNT", amount: num});
    };

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
            <Button onClick={handleSubmit} variant="contained">{t('next')}</Button>
        </div>
    );
};

export default AmountInput