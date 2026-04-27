const fs = require('fs');
const path = require('path');
const { readAll, writeAll } = require('./csvStore');

const UPLOADS_DIR = path.join(__dirname, '../uploads');
const FIVE_DAYS_MS = 5 * 24 * 60 * 60 * 1000;

function cleanupOldFiles() {
  const now = Date.now();
  const rows = readAll();
  let changed = false;

  rows.forEach(row => {
    // Skip if no file or already deleted
    if (!row.fileUrl || row.fileDeletedAt) return;

    const age = now - new Date(row.createdAt).getTime();
    if (age < FIVE_DAYS_MS) return;

    // Delete the physical file from disk
    if (row.fileName) {
      const filePath = path.join(UPLOADS_DIR, row.fileName);
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
          console.log(`🗑️  Deleted file: ${row.fileName} (submission ${row.id})`);
        } catch (e) {
          console.error(`File delete error for ${row.fileName}:`, e.message);
        }
      }
    }

    // Clear file fields but keep all other submission data
    row.fileUrl = '';
    row.fileName = '';
    row.originalFileName = '';
    row.fileDeletedAt = new Date().toISOString();
    changed = true;
  });

  if (changed) writeAll(rows);
}

function startCleanupScheduler() {
  // Run once on startup, then check every hour
  cleanupOldFiles();
  setInterval(cleanupOldFiles, 60 * 60 * 1000);
  console.log('🕐 File cleanup scheduler started (5-day auto-delete)');
}

module.exports = { startCleanupScheduler, cleanupOldFiles };
