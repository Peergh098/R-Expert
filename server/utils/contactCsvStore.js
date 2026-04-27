const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const CSV_PATH = path.join(__dirname, '../data/contacts.csv');

const HEADERS = [
  'id', 'name', 'email', 'subject', 'message',
  'isRead', 'replyMessage', 'repliedAt', 'createdAt', 'updatedAt',
];

function escapeField(val) {
  if (val === null || val === undefined) return '';
  const str = String(val).replace(/\r/g, '').replace(/\n/g, '\\n');
  if (str.includes(',') || str.includes('"')) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

function unescapeField(val) {
  return val.replace(/\\n/g, '\n');
}

function parseLine(line) {
  const fields = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (inQuotes) {
      if (ch === '"') {
        if (line[i + 1] === '"') { field += '"'; i++; }
        else { inQuotes = false; }
      } else { field += ch; }
    } else {
      if (ch === '"') { inQuotes = true; }
      else if (ch === ',') { fields.push(field); field = ''; }
      else { field += ch; }
    }
  }
  fields.push(field);
  return fields;
}

function rowToObj(fields) {
  const obj = {};
  HEADERS.forEach((h, i) => { obj[h] = unescapeField(fields[i] !== undefined ? fields[i] : ''); });
  return obj;
}

function objToLine(obj) {
  return HEADERS.map(h => escapeField(obj[h])).join(',');
}

function ensureContactFile() {
  const dir = path.dirname(CSV_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(CSV_PATH)) {
    fs.writeFileSync(CSV_PATH, HEADERS.join(',') + '\n', 'utf8');
  }
}

function readAllContacts() {
  ensureContactFile();
  const content = fs.readFileSync(CSV_PATH, 'utf8');
  const lines = content.split('\n').filter(l => l.trim());
  if (lines.length <= 1) return [];
  return lines.slice(1).map(l => rowToObj(parseLine(l)));
}

function writeAllContacts(rows) {
  ensureContactFile();
  const lines = [HEADERS.join(','), ...rows.map(objToLine)];
  fs.writeFileSync(CSV_PATH, lines.join('\n') + '\n', 'utf8');
}

function appendContact(obj) {
  ensureContactFile();
  fs.appendFileSync(CSV_PATH, objToLine(obj) + '\n', 'utf8');
}

function findContactById(id) {
  return readAllContacts().find(r => r.id === id) || null;
}

function updateContactById(id, updates) {
  const rows = readAllContacts();
  const idx = rows.findIndex(r => r.id === id);
  if (idx === -1) return null;
  rows[idx] = { ...rows[idx], ...updates, updatedAt: new Date().toISOString() };
  writeAllContacts(rows);
  return rows[idx];
}

function generateContactId() {
  return Date.now().toString(36) + crypto.randomBytes(4).toString('hex');
}

module.exports = {
  readAllContacts, appendContact, findContactById, updateContactById,
  generateContactId, ensureContactFile,
};
