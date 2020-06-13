const readDataFromDb = require("../helpers/readDataFromDB");
const writeDataToDb = require('../helpers/writeDataToDB');
const validateClientdata = require("../helpers/validateClientData");

function listContacts(req, res) {
  readDataFromDb()
    .then((data) => {res.status(200).send(data)})
    .catch((error) => {throw error});
}

function getContactById(req, res) {
  readDataFromDb()
    .then((data) => {const contact = data.find(({id}) => id === Number(req.params.contactId));
      if (!contact) {res.status(404).json({"message": "Not found"})}
      res.status(200).send(contact);
    })
    .catch((error) => {throw error});
}

function addContact(req, res) {
  const result = validateClientdata(req, res);
  if (result.error) {res.status(400).json({"message": `missing required ${result.error.details[0].context.key} field`})}
  else {
    const newContact = {
      id: Date.now(),
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    };
    readDataFromDb()
      .then((data) => {
        const updatedData = JSON.stringify([...data, newContact], null, 2);
        writeDataToDb(updatedData);
      })
      .catch((error) => {throw error});
    res.status(201).send(newContact);
  }
}

function removeContact(req, res) {
  readDataFromDb()
    .then((data) => {
      const updatedData = JSON.stringify(data.filter(({id}) => id !== Number(req.params.contactId)), null, 2)
      writeDataToDb(updatedData);
      const contact = data.find(({id}) => id === Number(req.params.contactId));
      if (contact) {res.status(400).json({"message": "contact deleted"})}
      else {res.status(404).json({"message": "Not found"})}
  })
  .catch((error) => {throw error});
}

function updateContact(req, res) {
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {res.status(400).json({"message": "missing fields"})}
  else {
    readDataFromDb()
    .then((data) => {
        const contact = data.find(({id}) => id === Number(req.params.contactId));
        if(contact) {
          const updatedContact = Object.assign(contact, req.body)
          const dataWithoutEdittedcontact = data.filter(({id}) => id !== Number(req.params.contactId));
          writeDataToDb(JSON.stringify([...dataWithoutEdittedcontact, updatedContact], null, 2));
          res.status(200).send(updatedContact);
        } else {res.status(404).json({"message": "Not found"})}
    })
  .catch((error) => {throw error});
  }
}

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact
};