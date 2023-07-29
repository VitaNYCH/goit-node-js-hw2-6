const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(id) {
  const contacts = await listContacts();
  const result = contacts.find((contact) => contact.id === id);
  return result || null;
}

async function removeContact(id) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return result;
}

async function addContact({ name, email, phone }) {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(),
    ...{ name, email, phone },
  };

  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

async function updateById(id, { name, email, phone }) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) {
    return null;
  }
  console.log(contacts[index].email);

  if (name === undefined && email === undefined) {
    contacts[index] = {
      id,
      ...{
        name: contacts[index].name,
        email: contacts[index].email,
        phone,
      },
    };
  } else if (name === undefined && phone == undefined) {
    contacts[index] = {
      id,
      ...{
        name: contacts[index].name,
        email,
        phone: contacts[index].phone,
      },
    };
  } else if (phone === undefined && email === undefined) {
    contacts[index] = {
      id,
      ...{
        name,
        email: contacts[index].email,
        phone: contacts[index].phone,
      },
    };
  } else if (phone === undefined) {
    contacts[index] = {
      id,
      ...{
        name,
        email,
        phone: contacts[index].phone,
      },
    };
  } else if (name === undefined) {
    contacts[index] = {
      id,
      ...{
        name: contacts[index].name,
        email,
        phone,
      },
    };
  } else if (email === undefined) {
    contacts[index] = {
      id,
      ...{
        name,
        email: contacts[index].email,
        phone,
      },
    };
  }

  console.log(contacts[index]);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateById,
};
