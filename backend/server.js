require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/auth/google', async (req, res) => {
  try {
    const { token } = req.body;
    res.json({ success: true, message: 'Google auth received' });
  } catch (error) {
    res.status(500).json({ error: 'Authentication failed' });
  }
});

app.post('/api/auth/github', async (req, res) => {
  try {
    const { code } = req.body;
    
    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code
      },
      { headers: { Accept: 'application/json' } }
    );

    const accessToken = tokenResponse.data.access_token;

    const userResponse = await axios.get('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${accessToken}` }
    });

    res.json(userResponse.data);
  } catch (error) {
    res.status(500).json({ error: 'GitHub authentication failed' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
