import createHttpError from 'http-errors';
import {
  deleteDiagram,
  getDiagram,
  getDiagrams,
  patchDiagram,
  postDiagram,
} from '../services/diagrams.js';

export const getDiagramsController = async (req, res) => {
  const diagrams = await getDiagrams();
  res.status(200).json({
    status: res.statusCode,
    message: 'Successfully found diagrams!',
    data: diagrams,
  });
};

export const getDiagramController = async (req, res) => {
  const diagram = await getDiagram(req.params.id);
  res.status(200).json({
    status: res.statusCode,
    message: 'Successfully found diagram!',
    data: diagram,
  });
};

export const postDiagramController = async (req, res) => {
  const diagram = await postDiagram({ ...req.body });
  res.status(201).json({
    status: res.statusCode,
    message: 'Successfully created diagram!',
    data: diagram,
  });
};

export const deleteDiagramController = async (req, res, next) => {
  const diagram = await deleteDiagram(req.params.id);
  if (!diagram) {
    next(createHttpError(404, 'Block not found'));
    return;
  }
  res.status(204).send();
};

export const patchDiagramController = async (req, res, next) => {
  const diagram = await patchDiagram(req.params.id, { ...req.body });
  if (!diagram) {
    next(createHttpError(404, 'Block not found'));
    return;
  }
  res.json({
    status: 200,
    message: `Successfully patched a block!`,
    data: diagram,
  });
};
