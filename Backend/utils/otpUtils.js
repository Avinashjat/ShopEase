export const generateOTP = () => {
  const otp = Math.floor(100000 + Math.random() * 900000); // 6-digit
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // expires in 5 min
  return { otp: otp.toString(), expiresAt };
};
