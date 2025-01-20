import { Router } from 'express';
import diagramsRouter from './diagrams.js';

const router = Router();

router.use('/api/diagrams', diagramsRouter);

export default router;
