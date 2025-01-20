import { Router } from 'express';
import { isValidId } from '../middlewares/isValidId.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  deleteDiagramController,
  getDiagramController,
  getDiagramsController,
  patchDiagramController,
  postDiagramController,
} from '../controllers/diagrams.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createDiagram, patchDiagram } from '../validation/diagram.js';

const router = Router();

router.get('/', ctrlWrapper(getDiagramsController));

router.get('/:id', isValidId, ctrlWrapper(getDiagramController));

router.post(
  '/',
  validateBody(createDiagram),
  ctrlWrapper(postDiagramController),
);

router.delete('/:id', isValidId, ctrlWrapper(deleteDiagramController));

router.patch(
  '/:id',
  isValidId,
  validateBody(patchDiagram),
  ctrlWrapper(patchDiagramController),
);

export default router;
