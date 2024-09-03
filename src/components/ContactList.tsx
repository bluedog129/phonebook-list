import React from "react";

interface Contact {
  id: number;
  name: string;
  phone: string;
  group: string;
  shortDesc: string;
}

interface ContactListProps {
  contacts: Contact[];
  onDeleteContact: (id: number) => void;
  searchTerm: string;
}

const ContactList: React.FC<ContactListProps> = ({
  contacts,
  onDeleteContact,
  searchTerm,
}) => {
  if (contacts.length === 0 && searchTerm) {
    return <div className="no-results">검색 결과가 없습니다.</div>;
  }

  return (
    <div className="contact-list">
      {contacts.map((contact) => (
        <div key={contact.id} className="contact-item">
          <span>{contact.name}</span>
          <span>{contact.phone}</span>
          <span>{contact.group}</span>
          <div>
            <button
              onClick={() => alert("상세보기 기능은 아직 구현되지 않았습니다.")}
            >
              상세보기
            </button>
            <button onClick={() => onDeleteContact(contact.id)}>삭제</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ContactList;
