import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import TermsDialog from './components/TermsDialog';

function App() {
  const [termsAccepted, setTermsAccepted] = useState(false);

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
      <h1>Currency Exchange</h1>
      <p>Page Content</p>
    </Layout>
  )
}

export default App
