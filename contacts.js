const fs = require('fs/promises');
const path = require('path') 
const contactsPath = path.join(__dirname, 'db', 'contacts.json');
const {nanoid} = require('nanoid')
 
async function listContacts() {
    const data = await fs.readFile(contactsPath);
    return JSON.parse(data);
}

async function getContactById(contactId) {
    const contacts = await listContacts();
    const result = contacts.find(item => item.id === contactId);
    return result || null;
}

async function removeContact(contactId) {
    const data = await listContacts();
    const index = data.findIndex(item => item.id === contactId);
        if(index === -1){
        return null;
        }
    const [result] = data.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    return result;
}
 
async function addContact(name, email, phone) {
    const data = await listContacts();
    const newContact = await {
        id: nanoid(),
        name,
        email,
        phone,
    }
    data.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(data, null, 2));
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}