import { useState, useEffect } from 'react';
import { ContactForm } from './contactForm/ContactForm';
import { ContactsList } from './contactList/ContactList';
import { Filter } from './contactFilter/ContactFilter';
import { Container } from './App.styled';


export function App  ()  {
  const [contacts, setContacts] = useState(
    JSON.parse(window.localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

 // запис до сховища
  useEffect(() => {
    window.localStorage.setItem('contacts', JSON.stringify(contacts)) ;
  }, [contacts]);

  // функція запису отриманих даних до масиву contacts
const formSubmit = data => {
    const isExist = contacts.find(contact => contact.name === data.name)
    if (isExist) {
   return alert(`${data.name} is already in contacts.`);
    } else {
      setContacts(prevState => [...prevState, data]);
    }
  };

  // функція отримання даних з поля filter
  const changeFilter = event => {
    setFilter(event.currentTarget.value);
  };

  // функція видалення контакту зі списку
  const deleteContact = id => {
    setContacts(prevContacts => prevContacts.filter(contact => contact.id !== id));
  };

  // умова пошуку контактів у списку за значенням веденних даних у поле filter
  const visibleContact = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter.toLowerCase())
  );

 

  return (
    <Container>
      <h1>Phonebook</h1>
      <ContactForm formSubmit={formSubmit} />

      <h2>Contacts:</h2>
      <Filter value={filter} changeFilter={changeFilter} />
      {contacts.length !== 0 && (
        <ContactsList contacts={visibleContact} deleteContact={deleteContact} />
      )}
    </Container>
  );
};





