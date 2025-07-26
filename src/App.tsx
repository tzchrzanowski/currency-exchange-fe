import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import TermsDialog from './components/TermsDialog';
import { useTranslation } from 'react-i18next';
import CurrencyList from './components/CurrencyList';

function App() {
  const [termsAccepted, setTermsAccepted] = useState(false);
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
      <CurrencyList />
    </Layout>
  )
}

export default App
