import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import TermsDialog from './components/TermsDialog';
import { useTranslation } from 'react-i18next';
import { useMachine } from '@xstate/react';
import { exchangeMachine } from './machines/ExchangeMachine';

import CurrencyList from './pages/CurrencyList';
import AmountInput from './pages/AmountInput';
import ConfirmExchange from './pages/ConfirmExchange';
import PaymentStep from './pages/PaymentStep';
import FinalPage from './pages/FinalPage';

function App() {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [state, send] = useMachine(exchangeMachine);

  const { t } = useTranslation();

  useEffect(() => {
    const accepted = localStorage.getItem('termsAccepted');
    if (accepted) setTermsAccepted(true);
  }, []);

  const handleAccept = () => {
    localStorage.setItem('termsAccepted', 'true');
    setTermsAccepted(true);
  };

  return (
    <Layout>
      {!termsAccepted && <TermsDialog onAccept={handleAccept} />}
      <h1>{t('app_header')}</h1>
      
      {state.matches('selectCurrency') && (
        <CurrencyList send={send} state={state} />
      )}
      {state.matches('inputAmount') && (
        <AmountInput send={send} state={state} />
      )}
      {state.matches('confirmExchange') && (
        <ConfirmExchange send={send} state={state} />
      )}
      {state.matches('paymentStep') && (
        <PaymentStep send={send} state={state} />
      )}
      {state.matches('paymentErrorStep') && (
        <PaymentStep send={send} state={state} />
      )}
      {state.matches('finalConfirmationStep') && (
        <FinalPage send={send} state={state} />
      )}
    </Layout>
  )
}

export default App
