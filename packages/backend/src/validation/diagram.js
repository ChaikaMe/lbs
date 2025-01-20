import Joi from 'joi';

const blockSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().required(),
  position: Joi.object({ x: Joi.number(), y: Joi.number() }).optional(),
  blocks: Joi.array().items(Joi.link('#block')).optional(),
}).id('block');

export const createDiagram = Joi.object({
  diagramName: Joi.string().min(1).max(20).required(),
  blocks: Joi.array().items(blockSchema).optional(),
  connections: Joi.array()
    .items(
      Joi.object({
        from: Joi.string().required(),
        to: Joi.array().items(Joi.string()).required(),
      }),
    )
    .optional(),
});

export const patchDiagram = Joi.object({
  _id: Joi.string().required(),
  createdAt: Joi.date().optional(),
  __v: Joi.number().optional(),
  diagramName: Joi.string().min(1).max(20).optional(),
  blocks: Joi.array().items(blockSchema).optional(),
  connections: Joi.array()
    .items(
      Joi.object({
        from: Joi.string().required(),
        to: Joi.array().items(Joi.string()).required(),
      }),
    )
    .optional(),
});
