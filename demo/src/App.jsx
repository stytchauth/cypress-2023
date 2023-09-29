import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import EmailLogin from './EmailLogin';
import SMSLogin from './SMSLogin';
import Authenticate from './Authenticate';
import Profile from './Profile';
import WebAuthnLogin from './WebAuthnLogin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<EmailLogin />} />
        <Route path="/sms" element={<SMSLogin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/webauthn" element={<WebAuthnLogin />} />
        <Route path="/authenticate" element={<Authenticate />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
