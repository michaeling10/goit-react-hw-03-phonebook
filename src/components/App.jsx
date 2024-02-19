import React, { Component } from 'react';
import { nanoid } from 'nanoid';

import ContactForm from './ContactForm';
import ContactList from './ContactList';
import Filter from './Filter';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ],
      filter: '',
    };
  }

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    if (contacts) {
      this.setState({ contacts: JSON.parse(contacts) });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  addContact = (name, number) => {
    const { contacts } = this.state;
    const namesList = contacts.map(contact =>
      contact.name.toLowerCase().trim()
    );
    const inputNameLowercased = name.toLowerCase().trim();

    if (namesList.includes(inputNameLowercased)) {
      alert(`${name} is already in contacts.`);
    } else {
      const newContact = { id: nanoid(), name, number };
      this.setState({ contacts: [...contacts, newContact] });
    }
  };

  handleFilter = event => {
    this.setState({ filter: event.target.value });
  };

  deleteItem = key => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== key),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const filterNames =
      filter.trim() === ''
        ? contacts
        : contacts.filter(contact =>
            contact.name.toLowerCase().includes(filter.toLowerCase())
          );

    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onAddContact={this.addContact} />
        <h2>Contacts</h2>
        <Filter filterValue={filter} handleSearch={this.handleFilter} />
        <ContactList contacts={filterNames} deleteContact={this.deleteItem} />
      </div>
    );
  }
}

export default App;
