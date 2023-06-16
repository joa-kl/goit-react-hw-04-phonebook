import css from './App.module.css';
// import { Component } from "react";
import { nanoid } from 'nanoid';
import { ContactForm } from "./ContactForm/ContactForm";
import { ContactList } from "./ContactList/ContactList";
import { Filter } from "./Filter/Filter";
import { useState } from 'react';

const App = () => {

  const [contacts, setContacts] = useState([
    { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
  ],);
  const [filter, setFilter] = useState("");
  //  state = {
  //   contacts: 
  //   filter: '',
  // };

  // componentDidMount() {
  //   const contacts = localStorage.getItem('contacts');
  //   const parsedContacts = JSON.parse(contacts);
  //   if (parsedContacts) {
  //     this.setState({ contacts: parsedContacts });
  //   }
  // }

  // componentDidUpdate(_, prevState) {
  //   if (this.state.contacts !== prevState.contacts) {
  //     localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
  //   }
  // }

  const handleFilterChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  const handleContactFormSubmit = evt => {
    const id = nanoid();
    const name = evt.name;
    const number = evt.number;
    const contactsLists = [...this.state.contacts];
    const doesExist = contactsLists.findIndex(contact => name === contact.name) !== -1;

    doesExist
      ? alert(`${name} is already in contacts.`)
      : contactsLists.push({ id, name, number });
    
    this.setState({ contacts: contactsLists });
  };

  const handleContactDelete = evt => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== evt),
    }));
    // return contactToBeRemoved;
    // localStorage.getItem('contactList');

  };

  const getFilteredContacts = () => {
    const filterContactsList = setFilter(contacts => {
      return contacts.name
        .toLowerCase()
        .includes(filter.toLowerCase());
    });
    return filterContactsList;
  };
  
   
    // const { filter } = this.state;

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
