import { Component } from 'react';
import { ContactForm } from './ContactForm/ContactForm';
import { ContainerPhonebook } from './ContainerPhonebook/ContainerPhonebook';
import { ContactList } from './ContactList/ContactList';
import { nanoid } from 'nanoid';
import { Filter } from './Filter/Filter';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  componentDidMount() {
    const storageContacts = JSON.parse(localStorage.getItem('contacts'));

    if (storageContacts) {
      this.setState({ contacts: storageContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (contacts !== prevState.contacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }

  handleSubmit = ({ name, number }, { resetForm }) => {
    if (this.state.contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())) {
      alert(name + ' is already in contacts');
      return;
    }

    const contact = {
      name,
      number,
      id: nanoid(),
    };

    this.setState(({ contacts }) => ({
      contacts: [contact, ...contacts],
    }));

    resetForm();
    return;
  };

  filterContacts = e => {
    this.setState({ filter: e.currentTarget.value });
  };

  deleteContact = id => {
    console.log(id);
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
    return;
  };

  getFilteredContacts = () => {
    const { contacts, filter } = this.state;
    const normalizedFilter = filter.toLowerCase();
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter));
  }

  render() {
    return (
      <ContainerPhonebook>
        <h2>Phonebook</h2>
        <ContactForm handleSubmit={this.handleSubmit} />

        <h2>Contacts</h2>
        {this.state.contacts.length > 0 ? (
          <>
            <Filter filterContacts={this.filterContacts} />
            <ContactList values={this.getFilteredContacts()} deleteContact={this.deleteContact} />
          </>) : (
          <h4>Phonebook is empty</h4>
        )}
      </ContainerPhonebook>
    );
  }
}
