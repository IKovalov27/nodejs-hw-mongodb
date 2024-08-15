import { Router } from "express";
import * as contactsController from "../controllers/contacts.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";
import { validateBody } from "../middlewares/validateBody.js";
import { isValidId } from "../middlewares/isValidId.js";
import { createContactSchema, updateContactSchema } from "../validation/contactSchemas.js";
import { authenticate } from "../middlewares/authenticate.js";

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", ctrlWrapper(contactsController.getAllContactsController));
contactsRouter.get("/:contactId", isValidId, ctrlWrapper(contactsController.getContactByIdController));
contactsRouter.post(
  "/",
  validateBody(createContactSchema),
  ctrlWrapper(contactsController.createContactController)
);
contactsRouter.patch(
  "/:contactId",
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(contactsController.updateContactController)
);
contactsRouter.delete("/:contactId", isValidId, ctrlWrapper(contactsController.deleteContactController));

export default contactsRouter;
