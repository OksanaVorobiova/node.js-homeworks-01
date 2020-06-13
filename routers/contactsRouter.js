const express = require('express');
const contactsRouter = express.Router();

const {listContacts, getContactById, addContact, removeContact, updateContact} = require('../controllers/contactsControllers.js');

contactsRouter.get('/', listContacts);
contactsRouter.get('/:contactId', getContactById);
contactsRouter.post('/', addContact);
contactsRouter.delete('/:contactId', removeContact);
contactsRouter.patch('/:contactId', updateContact);

module.exports = contactsRouter;