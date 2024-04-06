export const generateOtp = (length = 6): string => {
  let otp = "";
  for (let i = 0; i < length; i++) {
    otp += Math.floor(Math.random() * 10); // Generates a single digit
  }
  return otp;
};
export const maskEmail = (email: string) => {
  const [user, domain] = email.split("@");

  if (user && user.length > 1) {
    const visiblePart = user.substring(0, 3);
    const maskedPart =
      visiblePart + "*".repeat(user.length - visiblePart.length);

    return `${maskedPart}@${domain}`;
  }

  return email;
};
