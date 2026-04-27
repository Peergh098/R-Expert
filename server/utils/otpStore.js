// In-memory OTP store: email → { otp, expiresAt }
const store = new Map();

const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes

function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function saveOtp(email, otp) {
  store.set(email.toLowerCase(), {
    otp,
    expiresAt: Date.now() + OTP_TTL_MS,
  });
}

function verifyOtp(email, otp) {
  const entry = store.get(email.toLowerCase());
  if (!entry) return false;
  if (Date.now() > entry.expiresAt) { store.delete(email.toLowerCase()); return false; }
  if (entry.otp !== otp) return false;
  store.delete(email.toLowerCase()); // one-time use
  return true;
}

module.exports = { generateOtp, saveOtp, verifyOtp };
