import mongoose, { model } from 'mongoose';

const diagramSchema = new mongoose.Schema({
  diagramName: { type: String, required: true },
  blocks: { type: Array, default: [] },
  connections: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now },
});

export const DiagramCollection = model('diagram', diagramSchema, 'diagram');
