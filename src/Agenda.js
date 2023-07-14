import React, { useState, useEffect } from 'react';

function ContactList({ contacts }) {
  return (
    <div className="contact-grid">
      {contacts.map((contact, index) => (
        <div key={index} className="contact-box">
          <div className="contact-info">
            <span>{contact.nombre} {contact.apellido}</span>
            <span> {contact.telefono}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
function AddContact({ addContact }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    const newContact = {
      nombre: firstName,
      apellido: lastName,
      telefono: phone
    };
    addContact(newContact);
    setFirstName('');
    setLastName('');
    setPhone('');
  };
  return (
    <div className="add-contact">
      <h2>Agregar nuevo contacto:</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Nombre"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Apellido"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Teléfono"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button type="submit">Agregar</button>
      </form>
    </div>
  );
}
function Agenda() {
  const [contacts, setContacts] = useState([]);
  useEffect(() => {
    fetch('http://www.raydelto.org/agenda.php')
      .then(response => response.json())
      .then(data => {
        setContacts(data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  const addContact = (newContact) => {
    setContacts([...contacts, newContact]);
  };
  return (
    <div className="agenda-container">
      <h1>Agenda de contactos</h1>
      <AddContact addContact={addContact} />
      <ContactList contacts={contacts} />
    </div>
  );
}
export default Agenda;
