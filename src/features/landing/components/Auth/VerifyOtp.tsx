import React, { useState } from 'react';
import { confirmOtp } from '../../../../shared/services/auth';

interface Props {
  otpInfo: any;
  onDone: () => void;
}

const VerifyOtp: React.FC<Props> = ({ otpInfo, onDone }) => {
  const [code, setCode] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otpInfo) return setError('No OTP request found');
    try {
      await confirmOtp(otpInfo, code);
      onDone();
    } catch (err: any) {
      setError(err.message || 'Verification failed');
    }
  };

  return (
    <form onSubmit={handleVerify} className="auth-form">
      <label>Enter OTP</label>
      <div className="otp-inputs">
        <input value={code} onChange={(e) => setCode(e.target.value)} placeholder="123456" />
      </div>
      {error && <div className="auth-error">{error}</div>}
      <button className="btn-submit" type="submit">Verify</button>
    </form>
  );
};

export default VerifyOtp;
