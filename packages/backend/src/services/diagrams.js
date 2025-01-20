import { DiagramCollection } from '../db/models/diagrams.js';

export const getDiagrams = async () => {
  const result = await DiagramCollection.find();
  return result;
};

export const getDiagram = async (id) => {
  const result = await DiagramCollection.findById(id);
  return result;
};

export const postDiagram = async (payload) => {
  const result = await DiagramCollection.create(payload);
  return result;
};

export const deleteDiagram = async (id) => {
  const result = await DiagramCollection.findByIdAndDelete(id);
  return result;
};

export const patchDiagram = async (id, payload) => {
  const result = await DiagramCollection.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};
