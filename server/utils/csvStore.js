const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const CSV_PATH = path.join(__dirname, '../data/submissions.csv');

const HEADERS = [
  'id', 'firstName', 'lastName', 'email', 'phone', 'country',
  'service', 'pages', 'language', 'message', 'fileUrl', 'fileName',
  'originalFileName', 'status', 'adminNotes', 'estimatedPrice',
  'createdAt', 'updatedAt', 'fileDeletedAt',
];

// Escape a single CSV field value
function escapeField(val) {
  if (val === null || val === undefined) return '';
  // Replace real newlines so each row stays one line
  const str = String(val).replace(/\r/g, '').replace(/\n/g, '\\n');
  if (str.includes(',') || str.includes('"')) {
    return '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

// Restore escaped newlines when reading
function unescapeField(val) {
  return val.replace(/\\n/g, '\n');
}

// Parse a single CSV line into an array of field strings
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
      } else {
        field += ch;
      }
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

function ensureFile() {
  const dir = path.dirname(CSV_PATH);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(CSV_PATH)) {
    fs.writeFileSync(CSV_PATH, HEADERS.join(',') + '\n', 'utf8');
  }
}

function readAll() {
  ensureFile();
  const content = fs.readFileSync(CSV_PATH, 'utf8');
  const lines = content.split('\n').filter(l => l.trim());
  if (lines.length <= 1) return [];
  return lines.slice(1).map(l => rowToObj(parseLine(l)));
}

function writeAll(rows) {
  ensureFile();
  const lines = [HEADERS.join(','), ...rows.map(objToLine)];
  fs.writeFileSync(CSV_PATH, lines.join('\n') + '\n', 'utf8');
}

function appendRow(obj) {
  ensureFile();
  fs.appendFileSync(CSV_PATH, objToLine(obj) + '\n', 'utf8');
}

function generateId() {
  return Date.now().toString(36) + crypto.randomBytes(4).toString('hex');
}

function findById(id) {
  return readAll().find(r => r.id === id) || null;
}

function updateById(id, updates) {
  const rows = readAll();
  const idx = rows.findIndex(r => r.id === id);
  if (idx === -1) return null;
  rows[idx] = { ...rows[idx], ...updates, updatedAt: new Date().toISOString() };
  writeAll(rows);
  return rows[idx];
}

module.exports = { readAll, writeAll, appendRow, findById, updateById, generateId, ensureFile };
