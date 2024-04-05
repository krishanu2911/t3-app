export const generateOtp = (length = 6): string => {
    let otp = '';
    for (let i = 0; i < length; i++) {
      otp += Math.floor(Math.random() * 10); // Generates a single digit
    }
    return otp;
  }