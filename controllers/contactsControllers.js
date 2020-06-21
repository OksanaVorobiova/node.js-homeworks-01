import Contact from "../models/contactsModel";

export const listContacts = async (req, res) => {
  try {
    const contacts = await Contact.listContacts();
    res.status(200).send(contacts);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

export const getContactById = async (req, res) => {
  try {
    const contact = await Contact.getContactById(req.params.contactId);
    if (!contact) {
      res.status(404).send({
        message: "Not found",
      });
    }
    res.status(200).send(contact);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
};

export const addContact = async (req, res) => {
  try {
    const newContact = await Contact.addContact(req.body);
    res.status(201).send(newContact);
  } catch (error) {
    res.status(500).send("Server error");
  }
};

export const removeContact = async (req, res) => {
  try {
    const contact = await Contact.removeContact(req.params.contactId);
    if (!contact) {
      res.status(404).json({
        message: "Not found",
      });
    }
    res.status(200).json({
      message: "contact deleted",
    });
  } catch (error) {
    res.status(500).send("Server error");
  }
};

export const updateContact = async (req, res) => {
  try {
    const updatedContact = await Contact.updateContact(
      req.params.contactId,
      req.body
    );
    if (!updatedContact) {
      res.status(404).json({
        message: "Not found",
      });
    }
    res.status(201).send(updatedContact);
  } catch (error) {
    res.status(500).send("Server error");
  }
};
