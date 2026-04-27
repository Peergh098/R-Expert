const {
  readAllContacts, appendContact, findContactById, updateContactById, generateContactId,
} = require('../utils/contactCsvStore');
const { sendContactConfirmation, sendAdminReply, sendAdminContactNotification } = require('../utils/email');

const createContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const now = new Date().toISOString();
    const contact = {
      id: generateContactId(),
      name,
      email: email.toLowerCase().trim(),
      subject,
      message,
      isRead: 'false',
      replyMessage: '',
      repliedAt: '',
      createdAt: now,
      updatedAt: now,
    };

    appendContact(contact);

    sendContactConfirmation(contact).catch(err =>
      console.error('Contact confirmation email error:', err.message)
    );
    sendAdminContactNotification(contact).catch(err =>
      console.error('Admin contact notification error:', err.message)
    );

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (err) {
    next(err);
  }
};

const getAllContacts = (req, res, next) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const rows = readAllContacts().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const total = rows.length;
    const p = parseInt(page), l = parseInt(limit);
    const contacts = rows.slice((p - 1) * l, p * l).map(r => ({ ...r, _id: r.id, isRead: r.isRead === 'true' }));

    res.json({ contacts, pagination: { total, page: p, pages: Math.ceil(total / l) } });
  } catch (err) {
    next(err);
  }
};

const replyToContact = async (req, res, next) => {
  try {
    const { replyMessage } = req.body;
    const contact = findContactById(req.params.id);
    if (!contact) return res.status(404).json({ message: 'Message not found' });

    updateContactById(req.params.id, {
      isRead: 'true',
      replyMessage,
      repliedAt: new Date().toISOString(),
    });

    await sendAdminReply(contact.email, contact.name, replyMessage, contact.subject);
    res.json({ message: 'Reply sent successfully' });
  } catch (err) {
    next(err);
  }
};

module.exports = { createContact, getAllContacts, replyToContact };
