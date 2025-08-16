import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { z } from 'zod';
import OpenAI from 'openai';
import { Clerk } from '@clerk/clerk-sdk-node';
import pkg from '@prisma/client';

const { PrismaClient } = pkg;

const app = express();
const port = process.env.PORT || 8787;
const corsOrigin = process.env.CORS_ORIGIN || 'http://localhost:8080';

app.use(cors({ origin: corsOrigin, credentials: true }));
app.use(express.json({ limit: '10mb' }));
app.use(morgan('dev'));

const prisma = new PrismaClient();

// Clerk (optional in dev; routes can be public if keys missing)
const clerkSecret = process.env.CLERK_SECRET_KEY;
const clerk = clerkSecret ? new Clerk({ secretKey: clerkSecret }) : null;

const requireAuth = async (req, res, next) => {
  if (!clerk) return next(); // skip in dev if not configured
  const header = req.headers['authorization'] || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });
  try {
    const session = await clerk.sessions.verifySession(token);
    req.auth = session;
    next();
  } catch (e) {
    res.status(401).json({ error: 'Invalid token' });
  }
};

// Health
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// Summarize
const SummarizeSchema = z.object({
  text: z.string().min(1, 'text is required')
});

app.post('/api/summarize', requireAuth, async (req, res) => {
  const parse = SummarizeSchema.safeParse(req.body);
  if (!parse.success) {
    return res.status(400).json({ error: parse.error.flatten() });
  }
  const { text } = parse.data;
  try {
    const openaiKey = process.env.OPENAI_API_KEY;
    if (!openaiKey) {
      // Fallback mock
      return res.json({ summary: text.slice(0, 200) + (text.length > 200 ? '...' : '') });
    }
    const client = new OpenAI({ apiKey: openaiKey });
    const completion = await client.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a concise summarizer. Return a short, clear summary.' },
        { role: 'user', content: text }
      ]
    });
    const summary = completion.choices[0].message.content || '';
    res.json({ summary });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Summarization failed' });
  }
});

// Notes CRUD
app.get('/api/notes', requireAuth, async (req, res) => {
  const userId = req.auth?.userId || 'dev-user';
  const notes = await prisma.note.findMany({ where: { userId }, orderBy: { createdAt: 'desc' } });
  res.json(notes);
});

app.post('/api/notes', requireAuth, async (req, res) => {
  const userId = req.auth?.userId || 'dev-user';
  const { content, title, summary } = req.body || {};
  if (!content) return res.status(400).json({ error: 'content is required' });
  const note = await prisma.note.create({ data: { userId, content, title: title || null, summary: summary || null } });
  res.status(201).json(note);
});

app.listen(port, () => {
  console.log(`Server on http://localhost:${port}`);
});
