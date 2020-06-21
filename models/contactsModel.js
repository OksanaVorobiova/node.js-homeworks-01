import mongoose, { Schema } from "mongoose";

const contactSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    validate: (value) => value.includes("@"),
  },
  phone: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return /^\((\d{3})\)?[ ]?\d{3}[-]?\d{4}/.test(value);
      },
    },
  },
  subscription: {
    type: String,
    enum: ["free", "pro", "premium"],
  },
  password: {
    type: String,
    default: "password",
  },
  token: {
    type: String,
    default: "",
  },
});

class Contact {
  constructor() {
    this.contact = mongoose.model("Contact", contactSchema);
  }

  listContacts = () => {
    return this.contact.find();
  };

  getContactById = (id) => {
    return this.contact.findById(id);
  };

  addContact = (data) => {
    return this.contact.create(data);
  };

  removeContact = (id) => {
    return this.contact.findByIdAndRemove(id);
  };

  updateContact = (id, data) => {
    return this.contact.findByIdAndUpdate(id, data, {
      new: true,
    });
  };
}

export default new Contact();
