import { ContactListComponent } from 'components/ContactListComponent/ContactListComponent';

export const ContactList = ({ values, deleteContact }) => {
  if (values.length === 0) return null;
  return (
  <ul>
    {values.map(contact => (
          <ContactListComponent
            key={contact.id}
            contact={contact}
            deleteContact={deleteContact}
          />
        ))
      }
  </ul>
);
} 

