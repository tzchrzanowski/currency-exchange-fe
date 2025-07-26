import React, { useState, useEffect } from 'react';
import { fetchCurrencies, type Currency } from '../services/currencyService';
import { 
    Typography,
    CircularProgress,
    List,
    ListItem,
    ListItemText,
    ListItemButton,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { type StateFrom } from 'xstate';
import { exchangeMachine } from '../machines/ExchangeMachine';
import styles from './Pages.module.css';

type CurrencyListProps = {
    send: (event: {type:'SELECT_CURRENCY'; currency: string, buy: number, sell: number}) => void;
    state: StateFrom<typeof exchangeMachine>;
}

const CurrencyList: React.FC<CurrencyListProps> = ({send, state}) => {
    const [currencies, setCurrencies] = useState<Currency[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const { t, i18n } = useTranslation();

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
                    return (
                    <ListItem key={c.currency} disablePadding>
                        <ListItemButton
                            onClick={()=> {
                                send({ type: 'SELECT_CURRENCY', currency: c.currency, buy: c.buy, sell: c.sell})
                            }}
                        >
                            <ListItemText 
                                primary={c.currency}
                                secondary={`${t('buy')}: ${c.buy} | ${t('sell')}: ${c.sell}`}
                            />
                        </ListItemButton>
                    </ListItem>)

                })}
            </List>
            <FormControl variant="outlined">
                <InputLabel id="language-select">{t('language')}</InputLabel>
                <Select
                    className={styles.lngSelector}
                    labelId="language-select"
                    id="language-selector"
                    value={i18n.language}
                    onChange={(e)=> i18n.changeLanguage(e.target.value)}
                    label={t('language')}
                >
                    <MenuItem value="en">EN</MenuItem>
                    <MenuItem value="pl">PL</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}

export default CurrencyList