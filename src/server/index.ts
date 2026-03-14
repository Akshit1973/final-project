import express from 'express';
import cors from 'cors';
import { PrismaClient } from '../generated/prisma/index.js';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();
const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      include: { skills: true }
    });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const { username, email } = req.body;
    // Basic validation
    if (!username || !email) {
      return res.status(400).json({ error: 'Username and Email are required' });
    }

    const user = await prisma.user.create({
      data: { 
        username, 
        email, 
        avatarColor: ['#5865F2', '#EC4899', '#22C55E', '#00F5FF', '#F59E0B', '#8B5CF6'][Math.floor(Math.random() * 6)],
        rating: 5.0,
        totalSwaps: 0,
        hoursExchanged: 0
      },
      include: { 
        skills: true,
        sentSwaps: true,
        receivedSwaps: true 
      }
    });
    res.status(201).json(user);
  } catch (error: any) {
    if (error.code === 'P2002') {
      res.status(400).json({ error: 'Username or Email already exists' });
    } else {
      res.status(400).json({ error: 'Bad request' });
    }
  }
});

// Get single user with skills
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
      include: { 
        skills: true,
        sentSwaps: { include: { receiver: true } },
        receivedSwaps: { include: { sender: true } }
      }
    });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update skills
app.post('/api/users/:id/skills', async (req, res) => {
  try {
    const { name, type, category } = req.body;
    const skill = await prisma.skill.create({
      data: {
        name,
        type,
        category: category || 'other',
        userId: req.params.id
      }
    });
    res.status(201).json(skill);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});

app.delete('/api/skills/:id', async (req, res) => {
  try {
    await prisma.skill.delete({
      where: { id: req.params.id }
    });
    res.status(204).send();
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});

// Swap Requests
app.post('/api/swaps', async (req, res) => {
  try {
    const { senderId, receiverId, skillOffered, skillWanted } = req.body;
    const swap = await prisma.swapRequest.create({
      data: {
        senderId,
        receiverId,
        skillOffered,
        skillWanted
      }
    });
    res.status(201).json(swap);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});

app.patch('/api/swaps/:id', async (req, res) => {
  try {
    const { status } = req.body;
    const swap = await prisma.swapRequest.update({
      where: { id: req.params.id },
      data: { status }
    });
    res.json(swap);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running strongly!' });
});

app.listen(port, () => {
  console.log(`🚀 Strong Backend Server is running on port ${port}`);
});
