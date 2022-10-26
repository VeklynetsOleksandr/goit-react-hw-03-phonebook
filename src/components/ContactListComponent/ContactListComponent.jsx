import { Element, Button } from './ContactListComponent.Styled';


export const ContactListComponent = ({ contact, deleteContact }) => (
  <Element>
    <p>
      {contact.name}: {contact.number}
    </p>
    <Button type="button" onClick={() => deleteContact(contact.id)}>
      Delete
    </Button>
  </Element>
);