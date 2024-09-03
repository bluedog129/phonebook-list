import React, { useState } from "react";

interface Contact {
  name: string;
  phone: string;
  group: string;
  shortDesc: string;
}

interface ContactFormProps {
  onAddContact: (contact: Contact) => void;
}

const ContactForm: React.FC<ContactFormProps> = ({ onAddContact }) => {
  const [contact, setContact] = useState<Contact>({
    name: "",
    phone: "",
    group: "가족",
    shortDesc: "",
  });
  const [errors, setErrors] = useState<Partial<Contact>>({});

  const validateName = (name: string) => {
    if (name.length < 2 || !/^[가-힣]+$/.test(name)) {
      return "이름은 한글로 두 글자 이상이어야 합니다.";
    }
    return "";
  };

  const validatePhone = (phone: string) => {
    if (!/^010-\d{4}-\d{4}$/.test(phone)) {
      return "전화번호는 010-0000-0000 형식이어야 합니다.";
    }
    return "";
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setContact({ ...contact, [name]: value });

    // 실시간 유효성 검사
    if (name === "name") {
      setErrors((prev) => ({ ...prev, name: validateName(value) }));
    } else if (name === "phone") {
      setErrors((prev) => ({ ...prev, phone: validatePhone(value) }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const nameError = validateName(contact.name);
    const phoneError = validatePhone(contact.phone);

    if (nameError || phoneError) {
      setErrors({ name: nameError, phone: phoneError });
      return;
    }

    onAddContact(contact);
    setContact({ name: "", phone: "", group: "가족", shortDesc: "" });
    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div>
        <input
          type="text"
          name="name"
          value={contact.name}
          onChange={handleChange}
          placeholder="이름"
          required
        />
        {errors.name && <p className="error-message">{errors.name}</p>}
      </div>
      <div>
        <input
          type="tel"
          name="phone"
          value={contact.phone}
          onChange={handleChange}
          placeholder="전화번호"
          required
        />
        {errors.phone && <p className="error-message">{errors.phone}</p>}
      </div>
      <select name="group" value={contact.group} onChange={handleChange}>
        <option value="가족">가족</option>
        <option value="친구">친구</option>
        <option value="직장">회사</option>
        <option value="스터디">스터디</option>
      </select>
      <input
        type="text"
        name="shortDesc"
        value={contact.shortDesc}
        onChange={handleChange}
        placeholder="간단한기록"
      />
      <button type="submit">저장</button>
    </form>
  );
};

export default ContactForm;
