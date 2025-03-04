'use client';

import { useEffect, useState } from 'react';
import Navbar from './Navbar';
import AuthenticatedNavbar from './AuthenicatedNavbar';

export default function NavbarSelector() {
  const [hasApiKey, setHasApiKey] = useState(false);

  const checkApiKeys = () => {
    const hasKey = Object.keys(localStorage).some(key => key.startsWith('apiKey'));
    setHasApiKey(hasKey);
  };

  useEffect(() => {
    // Initial check
    checkApiKeys();

    // Listen for custom localStorage change event
    window.addEventListener('localStorageChange', checkApiKeys);

    return () => {
      window.removeEventListener('localStorageChange', checkApiKeys);
    };
  }, []);

  return hasApiKey ? <AuthenticatedNavbar /> : <Navbar />;
}