import React from 'react';
import { StytchLogin } from '@stytch/react';
import { StytchEventType } from '@stytch/vanilla-js';
import { styleConfig } from './styleConfig';
import { useNavigate } from 'react-router-dom';
import { useIsLoggedIn } from './useIsLoggedIn';

const config = {
  products: ['otp'],
  otpOptions: {
    methods: ['sms']
  }
};

const SMSLogin = () => {
  const navigate = useNavigate();
  useIsLoggedIn();

  const onAuthenticate = (event) => {
    if (event.type === StytchEventType.OTPsAuthenticate) {
      navigate('/profile', { replace: true });
    }
  };

  return (
    <StytchLogin config={config} styles={styleConfig} callbacks={{ onEvent: onAuthenticate }} />
  );
};

export default SMSLogin;
