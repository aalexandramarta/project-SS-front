// ai server/server.js

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());

// Log every request
app.use((req, res, next) => {
  console.log(`📡 Incoming ${req.method} request to ${req.url}`);
  next();
});

const OPENAI_API_KEY = 'sk-live_OtgeklGDOqEr9XwPlyY8c8glgUiv5B7VWt4d06Tb5UCB8SJB'; // valid through June 20

app.post('/chat', async (req, res) => {
  console.log('🛬 /chat route HIT');

  const userMessage = req.body.message;

  if (!userMessage) {
    return res.status(400).json({ error: 'Message is required.' });
  }

  console.log('📩 Incoming message:', userMessage);

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: userMessage }
        ]
      })
    });

    const data = await openaiRes.json();
    console.log('🔍 OpenAI response:', JSON.stringify(data, null, 2));

    if (data.error) {
      console.error('OpenAI error:', data.error);
      return res.status(500).json({ error: 'OpenAI API error.' });
    }

    const reply = data.choices?.[0]?.message?.content || '🤖 Sorry, I didn’t catch that.';
    res.json({ reply });
  } catch (error) {
    console.error('❌ Server error:', error.message || error);
    console.error('❌ Full stack trace:', error.stack || 'no stack');
    res.status(500).json({ error: 'Server failed to respond.' });
  }
});

// Catch unmatched routes
app.use((req, res) => {
  console.warn('⚠️ 404 - No matching route');
  res.status(404).send('Not found');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`✅ AI Proxy server running at http://localhost:${PORT}/chat`);
});