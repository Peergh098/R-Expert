const nodemailer = require('nodemailer');

const SERVICE_LABELS = {
  'plagiarism-check': 'Plagiarism Check',
  'plagiarism-removal': 'Plagiarism Removal',
  proofreading: 'Proofreading',
  'citation-formatting': 'Citation Formatting',
  'thesis-writing': 'Thesis Writing',
  'document-formatting': 'Document Formatting',
};

const createTransporter = () =>
  nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT) || 587,
    secure: process.env.EMAIL_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

const baseLayout = (content) => `
<!DOCTYPE html>
<html>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;padding:20px;color:#333;">
  <div style="background:#1e3a5f;padding:28px 30px;text-align:center;border-radius:8px 8px 0 0;">
    <div style="display:inline-flex;align-items:center;gap:10px;">
      <div style="width:36px;height:36px;background:#d97706;border-radius:8px;display:inline-block;text-align:center;line-height:36px;">
        <span style="color:white;font-weight:700;font-size:20px;vertical-align:middle;">R </span>
      </div>
      <span style="color:#fbbf24;font-weight:700;font-size:22px;letter-spacing:0.5px;">Experts</span>
    </div>
    <p style="color:#93c5fd;margin:6px 0 0;font-size:13px;">Academic Excellence, Delivered</p>
  </div>
  <div style="background:#f9fafb;padding:30px;border:1px solid #e5e7eb;border-top:none;border-radius:0 0 8px 8px;">
    ${content}
    <hr style="border:none;border-top:1px solid #e5e7eb;margin:24px 0 16px;">
    <p style="color:#9ca3af;font-size:11px;text-align:center;">© ${new Date().getFullYear()} Research Experts. All rights reserved.</p>
  </div>
</body>
</html>`;

const sendSubmissionConfirmation = async (submission) => {
  const transporter = createTransporter();
  const html = baseLayout(`
    <h2 style="color:#1e3a5f;margin-top:0;">Request Received!</h2>
    <p>Dear ${submission.firstName} ${submission.lastName},</p>
    <p>Thank you for submitting your request. Our team will review your document and get back to you shortly.</p>
    <div style="background:white;padding:20px;border-radius:8px;border:1px solid #e5e7eb;margin:20px 0;">
      <h3 style="color:#1e3a5f;margin-top:0;font-size:15px;">Request Summary</h3>
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:6px 0;color:#6b7280;width:40%;">Service:</td><td style="padding:6px 0;font-weight:600;">${SERVICE_LABELS[submission.service] || submission.service}</td></tr>
        <tr><td style="padding:6px 0;color:#6b7280;">Pages:</td><td style="padding:6px 0;font-weight:600;">${submission.pages}</td></tr>
        <tr><td style="padding:6px 0;color:#6b7280;">Language:</td><td style="padding:6px 0;font-weight:600;">${submission.language}</td></tr>
        <tr><td style="padding:6px 0;color:#6b7280;">Status:</td><td style="padding:6px 0;"><span style="background:#fef3c7;color:#92400e;padding:2px 10px;border-radius:20px;font-size:12px;">Pending Review</span></td></tr>
      </table>
    </div>
    <p>We will contact you within <strong>24 hours</strong> with a quote and timeline.</p>
    <p>Questions? Email us at <a href="mailto:support@researchexperts.in" style="color:#1e3a5f;">support@researchexperts.in</a></p>
  `);

  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: submission.email,
    subject: 'Your Request Has Been Received – Research Experts',
    html,
  });
};

const sendContactConfirmation = async (contact) => {
  const transporter = createTransporter();
  const html = baseLayout(`
    <h2 style="color:#1e3a5f;margin-top:0;">Thank You for Contacting Us!</h2>
    <p>Dear ${contact.name},</p>
    <p>We received your message regarding "<strong>${contact.subject}</strong>".</p>
    <p>Our team will respond within <strong>24 business hours</strong>.</p>
  `);

  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: contact.email,
    subject: 'Message Received – Research Experts',
    html,
  });
};

const sendAdminReply = async (to, name, replyMessage, subject) => {
  const transporter = createTransporter();
  const formattedMessage = replyMessage
    .split('\n')
    .map((line) => `<p style="margin:5px 0;">${line || '&nbsp;'}</p>`)
    .join('');

  const html = baseLayout(`
    <p>Dear ${name},</p>
    <div style="background:white;padding:20px;border-left:4px solid #1e3a5f;border-radius:0 8px 8px 0;margin:20px 0;">
      ${formattedMessage}
    </div>
    <p>Best regards,<br><strong>Research Experts Team</strong></p>
  `);

  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: `Re: ${subject} – Research Experts`,
    html,
  });
};

const sendAdminContactNotification = async (contact) => {
  const transporter = createTransporter();
  const html = baseLayout(`
    <h2 style="color:#1e3a5f;margin-top:0;">📬 New Contact Message</h2>
    <div style="background:white;padding:20px;border-radius:8px;border:1px solid #e5e7eb;margin:20px 0;">
      <table style="width:100%;border-collapse:collapse;">
        <tr><td style="padding:6px 0;color:#6b7280;width:30%;">From:</td><td style="padding:6px 0;font-weight:600;">${contact.name}</td></tr>
        <tr><td style="padding:6px 0;color:#6b7280;">Email:</td><td style="padding:6px 0;font-weight:600;">${contact.email}</td></tr>
        <tr><td style="padding:6px 0;color:#6b7280;">Subject:</td><td style="padding:6px 0;font-weight:600;">${contact.subject}</td></tr>
      </table>
    </div>
    <div style="background:white;padding:20px;border-left:4px solid #d97706;border-radius:0 8px 8px 0;margin:20px 0;">
      <p style="margin:0;color:#374151;">${contact.message.replace(/\n/g, '<br>')}</p>
    </div>
    <p style="color:#6b7280;font-size:13px;">Login to your admin dashboard to reply.</p>
  `);

  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.ADMIN_EMAIL,
    subject: `New Contact: ${contact.subject}`,
    html,
  });
};

const sendOtp = async (to, otp) => {
  const transporter = createTransporter();
  const html = baseLayout(`
    <h2 style="color:#1e3a5f;margin-top:0;">Your Verification Code</h2>
    <p>Use the code below to view your order status. It expires in <strong>10 minutes</strong>.</p>
    <div style="text-align:center;margin:30px 0;">
      <span style="font-size:40px;font-weight:800;letter-spacing:12px;color:#1e3a5f;">${otp}</span>
    </div>
    <p style="color:#6b7280;font-size:13px;">If you didn't request this, you can safely ignore this email.</p>
  `);

  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: 'Your Order Tracking OTP – Research Experts',
    html,
  });
};

module.exports = { sendSubmissionConfirmation, sendContactConfirmation, sendAdminReply, sendAdminContactNotification, sendOtp };
