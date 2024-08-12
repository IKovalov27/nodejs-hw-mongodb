import { Router } from 'express';
import {
  getContactsController,
  getContactByIdController,
  createContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';

import { validateBody } from '../middlewares/validateBody.js';
import { validateId } from '../middlewares/validateId.js';
import { createContactSchema } from '../validation/createContactsSchema.js';
import { updateContactSchema } from '../validation/updateContactsSchema.js';
import { authenticate } from '../middlewares/authenticate.js';

const contactsRouter = Router();

contactsRouter.use('/', authenticate);

contactsRouter.use('/:contactId', validateId('contactId'));

contactsRouter.get('/', ctrlWrapper(getContactsController));

contactsRouter.get('/:contactId', ctrlWrapper(getContactByIdController));

contactsRouter.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

contactsRouter.patch(
  '/:contactId',
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

contactsRouter.delete('/:contactId', ctrlWrapper(deleteContactController));

export default contactsRouter;
