const fs = require("fs").promises;
const path = require("path");

const contactsPath = path.join(__dirname, "contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf8");
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId) || null;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const updatedContacts = contacts.filter(
    (contact) => contact.id !== contactId,
  );
  if (contacts.length === updatedContacts.length) return null;
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
  return contacts.find((contact) => contact.id === contactId);
}

async function addContact(name, email, phone) {
  const { nanoid } = await import("nanoid");
  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
