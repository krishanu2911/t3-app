import React, { useState, useEffect, useRef } from 'react';

interface OTPInputProps {
  length: number;
  onOTPComplete: (otp: string) => void;
}

const OtpInput: React.FC<OTPInputProps> = ({ length, onOTPComplete }) => {
  const [otp, setOTP] = useState<string[]>(Array(length).fill(''));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const refs = inputRefs.current;
    refs.length = length;
    refs.fill(null);
    refs[0]?.focus();
  }, [length]);

  const handleOTPChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newOTP = [...otp];
    newOTP[index] = e.target.value;
    setOTP(newOTP);

    if (e.target.value !== '') {
      if (index === length - 1) {
        onOTPComplete(newOTP.join(''));
      } else {
        inputRefs.current[index + 1]?.focus();
      }
    } else if (index !== 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleOTPKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && otp[index] === '') {
      if (index !== 0) {
        const newOTP = [...otp];
        newOTP[index - 1] = '';
        setOTP(newOTP);
        inputRefs.current[index - 1]?.focus();
      }
    }
  };

  const setInputRef = (el: HTMLInputElement | null, index: number) => {
    const refs = inputRefs.current;
    refs[index] = el;
  };

  return (
    <div className="flex items-center justify-center  gap-3">
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleOTPChange(e, index)}
          onKeyDown={(e) => handleOTPKeyDown(e, index)}
          ref={(el) => setInputRef(el, index)}
          className=' border border-[#C1C1C1] rounded-md w-full h-12'
        />
      ))}
    </div>
  );
};

export default OtpInput;