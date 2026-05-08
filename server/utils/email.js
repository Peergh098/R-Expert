const nodemailer = require('nodemailer');

const SERVICE_LABELS = {
  'plagiarism-report': 'Plagiarism Report',
  'ai-detection-report': 'AI Detection Report',
  'drillbit-report': 'Drillbit Report',
  'ai-content-reduction': 'AI Content Reduction',
  'writing-assistance': 'Writing Assistance',
  'data-analysis': 'Data Analysis',
  'document-formatting': 'Document Formatting',
  'proofreading': 'Proofreading & Editing',
  'grammar-enhancement': 'Grammar Enhancement',
  'reference-formatting': 'Reference Formatting',
  'presentation-design': 'Presentation Design',
  'reviewer-comments-revision': 'Reviewer Comments Revision',
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
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Academic Sphere</title>
  <style>
    body { margin: 0; padding: 0; background-color: #f3f4f6; font-family: Arial, sans-serif; }
    .wrapper { width: 100%; background-color: #f3f4f6; padding: 24px 0; }
    .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
    .header { background-color: #1e3a5f; padding: 28px 32px; text-align: center; }
    .logo-box { display: inline-block; width: 38px; height: 38px; background: #d97706; border-radius: 8px; text-align: center; line-height: 38px; vertical-align: middle; margin-right: 10px; }
    .logo-letter { color: white; font-weight: 700; font-size: 20px; }
    .brand-name { color: white; font-weight: 700; font-size: 20px; vertical-align: middle; }
    .brand-accent { color: #fbbf24; }
    .tagline { color: #93c5fd; font-size: 12px; margin: 6px 0 0; }
    .body { padding: 32px; }
    .footer-bar { background: #f9fafb; border-top: 1px solid #e5e7eb; padding: 16px 32px; text-align: center; }
    .footer-text { color: #9ca3af; font-size: 11px; margin: 0; }
    h2 { color: #1e3a5f; margin-top: 0; font-size: 20px; }
    p { color: #374151; font-size: 14px; line-height: 1.7; margin: 10px 0; }
    .summary-box { background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 8px; padding: 20px; margin: 20px 0; }
    .summary-box h3 { color: #1e3a5f; margin: 0 0 14px; font-size: 14px; }
    .row { display: block; padding: 10px 0; border-bottom: 1px solid #f3f4f6; font-size: 13px; }
    .row:last-child { border-bottom: none; }
    .row-label { display: block; color: #6b7280; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 3px; }
    .row-value { display: block; font-weight: 600; color: #111827; word-break: break-word; overflow-wrap: break-word; }
    .info-box { background: #eff6ff; border-left: 4px solid #1e3a5f; border-radius: 0 8px 8px 0; padding: 16px 20px; margin: 20px 0; }
    .info-box p { margin: 0 0 6px; color: #1e3a5f; font-weight: 600; font-size: 14px; }
    .info-box ul { margin: 8px 0 0; padding-left: 18px; color: #374151; font-size: 13px; line-height: 1.9; }
    .badge { background: #fef3c7; color: #92400e; padding: 3px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
    .contact-link { color: #1e3a5f; text-decoration: none; font-weight: 500; }
    .divider { border: none; border-top: 1px solid #e5e7eb; margin: 24px 0; }
    .signature { color: #374151; font-size: 14px; margin-top: 20px; }
    @media only screen and (max-width: 600px) {
      .wrapper { padding: 0 !important; }
      .container { border-radius: 0 !important; box-shadow: none !important; }
      .header { padding: 20px 16px !important; }
      .body { padding: 20px 16px !important; }
      .footer-bar { padding: 12px 16px !important; }
      .summary-box { padding: 14px !important; }
      h2 { font-size: 18px !important; }
      .brand-name { font-size: 17px !important; }
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="container">
      <div class="header">
        <div>
          <div class="logo-box"><span class="logo-letter">A</span></div>
          <span class="brand-name">Academic <span class="brand-accent">Sphere</span></span>
        </div>
        <p class="tagline">Academic Excellence, Delivered</p>
      </div>
      <div class="body">
        ${content}
      </div>
      <div class="footer-bar">
        <p class="footer-text">© ${new Date().getFullYear()} Academic Sphere. All rights reserved.</p>
      </div>
    </div>
  </div>
</body>
</html>`;

const sendSubmissionConfirmation = async (submission) => {
  const transporter = createTransporter();
  const html = baseLayout(`
    <h2>We've Received Your Request!</h2>
    <p>Dear <strong>${submission.firstName} ${submission.lastName}</strong>,</p>
    <p>Thank you for choosing <strong>Academic Sphere</strong>. Your document has been successfully submitted and is now in our queue. Our expert team will review it carefully and reach out to you shortly with a personalised quote and timeline.</p>

    <div class="summary-box">
      <h3>📋 Submission Summary</h3>
      <div class="row"><span class="row-label">Service Requested:</span><span class="row-value">${SERVICE_LABELS[submission.service] || submission.service}</span></div>
      <div class="row"><span class="row-label">Number of Pages:</span><span class="row-value">${submission.pages}</span></div>
      ${submission.preferredTool ? `<div class="row"><span class="row-label">Preferred Tool:</span><span class="row-value">${submission.preferredTool}</span></div>` : ''}
      <div class="row"><span class="row-label">Language:</span><span class="row-value">${submission.language}</span></div>
      <div class="row"><span class="row-label">Status:</span><span class="row-value"><span class="badge">Pending Review</span></span></div>
    </div>

    <div class="info-box">
      <p>What happens next?</p>
      <ul>
        <li>Our team reviews your document and service requirements</li>
        <li>We prepare a personalised quote based on your document's complexity</li>
        <li>You receive the quote via email or WhatsApp for confirmation</li>
        <li>Once confirmed, we begin processing and deliver on time</li>
      </ul>
    </div>

    <p>Need help or have questions? You can reach us anytime:</p>
    <p>📧 <a href="mailto:peergh098@gmail.com" class="contact-link">peergh098@gmail.com</a></p>
    <p>💬 <a href="https://wa.me/919149797692" class="contact-link">WhatsApp: +91 9149797692</a></p>

    <hr class="divider" />
    <p class="signature">We appreciate your trust in Academic Sphere. We look forward to supporting your academic journey.<br/><br/>Warm regards,<br/><strong>The Academic Sphere Team</strong></p>
  `);

  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: submission.email,
    subject: 'Submission Received – Academic Sphere',
    html,
  });
};

const sendContactConfirmation = async (contact) => {
  const transporter = createTransporter();
  const html = baseLayout(`
    <h2>Thank You for Reaching Out!</h2>
    <p>Dear <strong>${contact.name}</strong>,</p>
    <p>We have received your message regarding <strong>"${contact.subject}"</strong>. Thank you for taking the time to get in touch — we truly value every enquiry and are committed to giving you a helpful and thorough response.</p>

    <div class="summary-box">
      <h3>📩 Your Message Details</h3>
      <div class="row"><span class="row-label">Name:</span><span class="row-value">${contact.name}</span></div>
      <div class="row"><span class="row-label">Subject:</span><span class="row-value">${contact.subject}</span></div>
    </div>

    <div class="info-box">
      <p>What to expect?</p>
      <ul>
        <li>Our team will review your message carefully</li>
        <li>We will get back to you shortly with a detailed response</li>
        <li>For urgent queries, feel free to reach us on WhatsApp</li>
      </ul>
    </div>

    <p>In the meantime, if you have any additional information to share, simply reply to this email and it will reach us directly.</p>
    <p>💬 <a href="https://wa.me/919149797692" class="contact-link">WhatsApp: +91 9149797692</a></p>
    <p>📧 <a href="mailto:peergh098@gmail.com" class="contact-link">peergh098@gmail.com</a></p>

    <hr class="divider" />
    <p class="signature">Thank you again for contacting Academic Sphere. We are here to support your academic needs every step of the way.<br/><br/>Warm regards,<br/><strong>The Academic Sphere Team</strong></p>
  `);

  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: contact.email,
    subject: 'We Received Your Message – Academic Sphere',
    html,
  });
};

const sendAdminReply = async (to, name, replyMessage, subject) => {
  const transporter = createTransporter();
  const formattedMessage = replyMessage
    .split('\n')
    .map((line) => `<p style="margin:5px 0;font-size:14px;color:#374151;">${line || '&nbsp;'}</p>`)
    .join('');

  const html = baseLayout(`
    <h2>Update on Your Request</h2>
    <p>Dear <strong>${name}</strong>,</p>
    <div style="background:#f9fafb;border-left:4px solid #1e3a5f;border-radius:0 8px 8px 0;padding:16px 20px;margin:20px 0;">
      ${formattedMessage}
    </div>
    <p>If you have any further questions, feel free to reply to this email or reach us on WhatsApp.</p>
    <p>💬 <a href="https://wa.me/919149797692" class="contact-link">WhatsApp: +91 9149797692</a></p>
    <hr class="divider" />
    <p class="signature">Warm regards,<br/><strong>The Academic Sphere Team</strong></p>
  `);

  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: `Re: ${subject} – Academic Sphere`,
    html,
  });
};

const sendAdminContactNotification = async (contact) => {
  const transporter = createTransporter();
  const html = baseLayout(`
    <h2>📬 New Contact Message</h2>
    <div class="summary-box">
      <div class="row"><span class="row-label">From:</span><span class="row-value">${contact.name}</span></div>
      <div class="row"><span class="row-label">Email:</span><span class="row-value">${contact.email}</span></div>
      <div class="row"><span class="row-label">Subject:</span><span class="row-value">${contact.subject}</span></div>
    </div>
    <div style="background:#fffbeb;border-left:4px solid #d97706;border-radius:0 8px 8px 0;padding:16px 20px;margin:20px 0;">
      <p style="margin:0;color:#374151;font-size:14px;line-height:1.7;">${contact.message.replace(/\n/g, '<br>')}</p>
    </div>
    <p style="color:#6b7280;font-size:13px;">Log in to your admin dashboard to reply to this message.</p>
  `);

  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.ADMIN_EMAIL,
    subject: `New Contact: ${contact.subject} – Academic Sphere`,
    html,
  });
};

const sendOtp = async (to, otp) => {
  const transporter = createTransporter();
  const html = baseLayout(`
    <h2>Your Verification Code</h2>
    <p>Use the code below to view your order status. It expires in <strong>10 minutes</strong>.</p>
    <div style="text-align:center;margin:32px 0;background:#f9fafb;border-radius:12px;padding:28px;">
      <span style="font-size:42px;font-weight:800;letter-spacing:14px;color:#1e3a5f;">${otp}</span>
    </div>
    <p style="color:#6b7280;font-size:13px;">If you didn't request this, you can safely ignore this email.</p>
  `);

  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to,
    subject: 'Your Order Tracking OTP – Academic Sphere',
    html,
  });
};

const sendDocumentReady = async (submission, fileUrl) => {
  const transporter = createTransporter();
  const html = baseLayout(`
    <h2>Your Document is Ready!</h2>
    <p>Dear <strong>${submission.firstName} ${submission.lastName}</strong>,</p>
    <p>Great news! Your <strong>${SERVICE_LABELS[submission.service] || submission.service}</strong> request has been completed. Your processed document is ready for download.</p>

    <div class="summary-box">
      <h3>📋 Order Summary</h3>
      <div class="row"><span class="row-label">Service:</span><span class="row-value">${SERVICE_LABELS[submission.service] || submission.service}</span></div>
      <div class="row"><span class="row-label">Pages:</span><span class="row-value">${submission.pages}</span></div>
      <div class="row"><span class="row-label">Status:</span><span class="row-value"><span class="badge" style="background:#dcfce7;color:#166534;">Completed</span></span></div>
    </div>

    <div style="text-align:center;margin:28px 0;">
      <a href="${fileUrl}" target="_blank"
        style="display:inline-block;background:#d97706;color:white;font-weight:700;font-size:15px;padding:14px 32px;border-radius:10px;text-decoration:none;">
        ⬇ Download Your Document
      </a>
    </div>

    <div class="info-box">
      <p>Important</p>
      <ul>
        <li>The download link may expire — please download your document promptly</li>
        <li>If you face any issues, reply to this email or contact us on WhatsApp</li>
      </ul>
    </div>

    <p>💬 <a href="https://wa.me/919149797692" class="contact-link">WhatsApp: +91 9149797692</a></p>
    <hr class="divider" />
    <p class="signature">Thank you for choosing Academic Sphere. We hope to serve you again!<br/><br/>Warm regards,<br/><strong>The Academic Sphere Team</strong></p>
  `);

  return transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: submission.email,
    subject: 'Your Document is Ready – Academic Sphere',
    html,
  });
};

module.exports = { sendSubmissionConfirmation, sendContactConfirmation, sendAdminReply, sendAdminContactNotification, sendOtp, sendDocumentReady };
