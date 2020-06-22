import { Router } from "express";
const contactsRouter = Router();
import validateClientData from "../helpers/validateClientData";
import checkFillingBody from "../helpers/checkFillingBody";
import {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} from "../controllers/contactsControllers.js";

contactsRouter.get("/", listContacts);
contactsRouter.get("/:contactId", getContactById);
contactsRouter.post("/", validateClientData, addContact);
contactsRouter.delete("/:contactId", removeContact);
contactsRouter.patch("/:contactId", checkFillingBody, updateContact);

export default contactsRouter;
