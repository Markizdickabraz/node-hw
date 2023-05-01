const {program} = require('commander')
const contacts = require('./contacts');

async function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case "list":
            const allContacts = await contacts.listContacts();
            console.table(allContacts)  
        break;

    case "get":
          const contactsById = await contacts.getContactById(id);
          console.log(contactsById)
          break;

      case "add":
          const newContact = await contacts.addContact(name, email, phone);
          console.log(newContact)
      break;

    case "remove":
          const deleteContact = await contacts.removeContact(id);
          console.log(deleteContact)
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

program
    .option('--action <type>')
    .option('--id <type>' )
    .option('--name <type>' )    
    .option('--email <type>')
    .option('--phone <type>' )
    
program.parse();

const option = program.opts();
invokeAction(option)