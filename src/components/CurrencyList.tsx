import React, { useState, useEffect } from 'react';
import { fetchCurrencies, type Currency } from '../services/currencyService';
import { Typography, CircularProgress, List, ListItem, ListItemText } from '@mui/material';
import { useTranslation } from 'react-i18next';

const CurrencyList: React.FC = () => {
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

    if (loading) return <CircularProgress />;

    return (
        <div>
            <Typography variant="h4" gutterBottom>
                {t('exchange_rates')}
            </Typography>
            <List>
                {currencies.map((c) => {
                    return (<ListItem key={c.currency}>
                        <ListItemText 
                            primary={c.currency}
                            secondary={`${t('buy')}: ${c.buy} | ${t('sell')}: ${c.sell}`}
                        />
                    </ListItem>)
                })}
            </List>
        </div>
    )
}

export default CurrencyList