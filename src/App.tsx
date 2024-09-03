import React, { useState, useEffect } from "react";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import "./App.css";

interface Contact {
  id: number;
  name: string;
  phone: string;
  group: string;
  shortDesc: string;
}

const App: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState<Contact[]>([]);

  useEffect(() => {
    const savedContacts = localStorage.getItem("contacts");
    if (savedContacts) {
      setContacts(JSON.parse(savedContacts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const addContact = (newContact: Omit<Contact, "id">) => {
    const contact = { ...newContact, id: Date.now() };
    setContacts([...contacts, contact]);
  };

  const deleteContact = (id: number) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  useEffect(() => {
    const results = contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        contact.phone.includes(searchTerm)
    );
    setSearchResult(results);
  }, [searchTerm, contacts]);

  return (
    <div className="app">
      <h1>연락처 리스트</h1>
      <div className="content">
        <div className="left-panel">
          <ContactForm onAddContact={addContact} />
        </div>
        <div className="right-panel">
          <input
            type="text"
            placeholder="검색어를 입력 후 엔터를 누르세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <ContactList
            contacts={searchResult}
            onDeleteContact={deleteContact}
            searchTerm={searchTerm}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
