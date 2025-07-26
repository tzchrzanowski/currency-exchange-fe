import React, { useState, useEffect } from 'react';
import { fetchCurrencies, type Currency } from '../services/currencyService';
import { Typography, CircularProgress, List, ListItem, ListItemText, ListItemButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { type StateFrom } from 'xstate';
import { exchangeMachine } from '../machines/ExchangeMachine';

type CurrencyListProps = {
    send: (event: {type:'SELECT_CURRENCY'; currency: string}) => void;
    state: StateFrom<typeof exchangeMachine>;
}

const CurrencyList: React.FC<CurrencyListProps> = ({send, state}) => {
    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const { t } = useTranslation();

    useEffect(()=> {
        const load = async() => {
            try {
                const data = await fetchCurrencies();
                setCurrencies(data);
            } catch (error) {
                console.error("Failed to fetch currencies list: ", error);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    useEffect(()=> {
        console.log("state status:" , state);
    });

    if (loading) return <CircularProgress />;

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                {t('exchange_rates')}
            </Typography>
            <List>
                {currencies.map((c) => {
                    return (
                    <ListItem key={c.currency} disablePadding>
                        <ListItemButton
                            onClick={()=> send({ type: 'SELECT_CURRENCY', currency: c.currency})}
                        >
                            <ListItemText 
                                primary={c.currency}
                                secondary={`${t('buy')}: ${c.buy} | ${t('sell')}: ${c.sell}`}
                            />
                        </ListItemButton>
                    </ListItem>)

                })}
            </List>
        </div>
    )
}

export default CurrencyList