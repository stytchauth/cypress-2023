import React from 'react';
import { StytchLogin } from '@stytch/react';
import { styleConfig } from './styleConfig';
import { BASE_URL } from './constants';
import { useIsLoggedIn } from './useIsLoggedIn';

const config = {
  products: ['emailMagicLinks'],
  emailMagicLinksOptions: {
    loginRedirectURL: `${BASE_URL}/authenticate`,
    signupRedirectURL: `${BASE_URL}/authenticate`
  }
};

const EmailLogin = () => {
  useIsLoggedIn();

  return <StytchLogin config={config} styles={styleConfig} />;
};

export default EmailLogin;
