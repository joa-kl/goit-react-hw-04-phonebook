import css from './App.module.css';
import { nanoid } from 'nanoid';
import ContactForm  from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import { useEffect, useState } from 'react';

const App = () => {

  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ]);
 
  useEffect(() => {
    const localData = localStorage.getItem('contacts');
    setContacts(localData ? JSON.parse(localData) : []);
  }, []);
  
   useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);


   const [filter, setFilter] = useState("");
  
  // useEffect(() => {
  //   setContacts(prevContact => prevContact + JSON.parse(localStorage.getItem(contacts)));
  // }, [contacts]);
  
  
  const handleFilterChange = evt => {
    setFilter(evt.currentTarget.value);
  };

  const handleContactFormSubmit = (name, number) => {
    const contact = {
      id: nanoid(),
      name,
      number,
    }
  
    const contactsLists = [...contacts];
    const doesExist = contactsLists.findIndex(contact => name === contact.name) !== -1;

    doesExist
      ? alert(`${name} is already in contacts.`)
      : setContacts(prevContacts => [contact, ...prevContacts]);
  };

  const handleContactDelete = evt => {
    setContacts(contacts.filter(contact => contact.id !== evt));
  };

  const getFilteredContacts = () => {
    const filterContactsList = filter.toString().toLowerCase();
    return contacts.filter(({ name }) =>
      name
        .toLowerCase()
        .includes(filterContactsList)
    );
  };

    return (
      <div className={css.container}>
        <h1>Phonebook</h1>
        <ContactForm onSubmit={handleContactFormSubmit} />
        <h2> Contacts</h2>
        <Filter filter={filter} onFilterChange={handleFilterChange} />
        <ContactList
          contacts={getFilteredContacts()}
          onContactDelete={handleContactDelete}
        />
      </div>
    );
};

export default App;
