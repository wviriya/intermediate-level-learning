const { google } = require('googleapis');

const FOLDER_ID = '1_bwnA7PRSg2w4ZaqQ79Gq96_G0iUkXA8';

function getAuth() {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new Error('GOOGLE_SERVICE_ACCOUNT_JSON env var is not set');
  const credentials = JSON.parse(raw);
  return new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  });
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');

  const { action, name, parent, folderId, fileId } = req.query;

  try {
    const auth = getAuth();
    const drive = google.drive({ version: 'v3', auth });

    if (action === 'getFolderId') {
      const parentId = parent || FOLDER_ID;
      const q = `name='${name}' and mimeType='application/vnd.google-apps.folder' and parents='${parentId}' and trashed=false`;
      const { data } = await drive.files.list({ q, pageSize: 1, fields: 'files(id,name)' });
      const folder = data.files?.[0] || null;
      return res.json({ id: folder?.id || null });
    }

    if (action === 'listFiles') {
      const q = `parents='${folderId}' and trashed=false`;
      const { data } = await drive.files.list({ q, pageSize: 100, fields: 'files(id,name,mimeType,webViewLink)' });
      return res.json({ files: data.files || [] });
    }

    if (action === 'getFile') {
      const driveRes = await drive.files.get({ fileId, alt: 'media' }, { responseType: 'arraybuffer' });
      const text = Buffer.from(driveRes.data).toString('utf8');
      try {
        return res.json(JSON.parse(text));
      } catch (parseErr) {
        console.error(`JSON parse error in file ${fileId} at: ${parseErr.message}`);
        return res.status(422).json({ error: `Invalid JSON in file: ${parseErr.message}`, raw: text.substring(0, 200) });
      }
    }

    res.status(400).json({ error: `Unknown action: ${action}` });
  } catch (err) {
    console.error('Drive API error:', err.message);
    res.status(500).json({ error: err.message });
  }
};
