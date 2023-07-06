import dotenv from "dotenv";
import http from "http";
import { app } from "./app";
import { config } from "./config/config";
import { log } from "./logs/logger";
import bodyParser from 'body-parser';

import express, { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';





dotenv.config();

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))


const port = config.serverPort.port || 8000;

const server = http.createServer(app);



// Secret key for JWT
const secretKey = 'your-secret-key';

// Sample user data
const users = [
  { id: 1, username: 'user1', password: '$2b$10$pfJ9...', role: 'user' },
  { id: 2, username: 'user2', password: '$2b$10$paJ9...', role: 'admin' },
];

// Custom interface for Request with user property
interface AuthenticatedRequest extends Request {
  user?: {
    id: number;
    username: string;
    role: string;
  };
}

// Middleware to verify JWT token
const authenticateToken = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, secretKey, (err: any, user: any) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.use(express.json());

// Login endpoint
app.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = users.find((u) => u.username === username);

  if (!user || !bcrypt.compareSync(password, user.password)) {
    return res.status(401).json({ error: 'Invalid username or password' });
  }

  const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, secretKey, { expiresIn: '1h' });

  res.json({ token });
});

// Protected endpoint example
app.get('/protected', authenticateToken, (req: AuthenticatedRequest, res: Response) => {
  res.json({ message: 'This is a protected endpoint', user: req.user });
});

server.listen(port, () => {
  log.info(`[Server]: I am running at http://localhost:${port}`);
});


export default server;
