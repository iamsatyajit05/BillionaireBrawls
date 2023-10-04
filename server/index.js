const express = require('express');
const cors = require('cors');
const { google } = require('googleapis');
require('dotenv').config();

const app = express();
const port = 5000;

const { SPREADSHEET_ID, SHEET_ID_MUSK, SHEET_ID_ZUCK, SHEET_ID_TOTAL, SHEET_ID_EMAIL, GOOGLE_API_CLIENT_EMAIL, GOOGLE_API_PRIVATE_KEY } = process.env;

const allowedDomains = [
  'localhost',
];

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: GOOGLE_API_CLIENT_EMAIL,
    private_key: GOOGLE_API_PRIVATE_KEY.replace(/\\n/g, '\n'),
  },
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const sheets = google.sheets({ version: 'v4', auth });

app.use(express.json());
app.use(cors()); // Enable CORS for all routes

app.post('/api/saveemail', async (req, res) => {
  try {
    if (!allowedDomains.includes(req.hostname)) {
      return res.status(403).json({ error: 'Access forbidden' });
    }

    const { email } = req.body;
    // https://billionaire-brawl-api.vercel.app
    const values = [[email, new Date().toLocaleString()]];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_ID_EMAIL}!A:B`,
      valueInputOption: 'USER_ENTERED',
      resource: {
        values,
      },
    });

    res.status(200).json({ message: 'Email saved successfully' });
  } catch (err) {
    console.error('Error saving email:', err);
    res.status(500).json({ error: 'Failed to save email' });
  }
});

app.get('/api/fetchscore', async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_ID_TOTAL}!A:C`,
    });

    const rows = response.data.values;
    console.log(rows);
    const scores = {
      "musk": rows[0][0],
      "zuck": rows[0][1]
    }

    res.status(200).json({ score: scores, message: 'Score fetched successfully' });
  } catch (err) {
    console.error('Error fetching score:', err);
    res.status(500).json({ error: 'Failed to fetch score' });
  }
});

app.post('/api/savescore', async (req, res) => {
  try {
    const { team, score } = req.body;

    if (parseInt(score) && parseInt(score) >= 0) {
      const values = [[score, new Date().toLocaleString()]];

      if (team === "musk") {
        await sheets.spreadsheets.values.append({
          spreadsheetId: SPREADSHEET_ID,
          range: `${SHEET_ID_MUSK}!A:B`,
          valueInputOption: 'USER_ENTERED',
          resource: {
            values,
          },
        });
      } else if (team === "zuck") {
        await sheets.spreadsheets.values.append({
          spreadsheetId: SPREADSHEET_ID,
          range: `${SHEET_ID_ZUCK}!A:B`,
          valueInputOption: 'USER_ENTERED',
          resource: {
            values,
          },
        });
      } else {
        throw "Not valid team";
      }
    } else {
      throw "Not valid score";
    }

    console.log('Score saved:');

    res.status(200).json({ message: 'Score saved successfully' });
  } catch (err) {
    console.error('\nError saving score:', err);
    res.status(500).json({ error: 'Failed to save score' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = app;
