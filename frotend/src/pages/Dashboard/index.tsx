import { useEffect, useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';

import { useAuth } from '../../contexts/AuthContexts';
import { useContacts } from '../../contexts/ContactsContext';
import { ModalContactDetail } from '../../components/Modal/ModalContactDetail';

import { ContactLists } from './ContactLists';
import { FirstContact } from './FirstContact';
import { NotFound } from './NotFound';

interface iContact {
  id: string;
  name: string;
  firstEmail: string;
  secondaryEmail?: string;
  mainPhone: string;
  secondaryPhone?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const { contacts, loadContacts, notFound, contactNotFound } = useContacts();
  const { user, accessToken } = useAuth();

  const [selectedContact, setSelectedContact] = useState<iContact>(
    {} as iContact
  );

  const {
    isOpen: isContactDetailOpen,
    onOpen: onContactDetailOpen,
    onClose: onContactDetailClose,
  } = useDisclosure();


  const handleClick = (contact: iContact) => {
    setSelectedContact(contact);
    onContactDetailOpen();
  };

  useEffect(() => {
    loadContacts(user.id, accessToken).then((_) => setLoading(false));
  }, []);

  if (notFound) {
    return (
      <NotFound
        isContactDetailOpen={isContactDetailOpen}
        onContactDetailClose={onContactDetailClose}
        selectedContact={selectedContact}
        contactNotFound={contactNotFound}
      />
    );
  }

  return (
    <>
      <ModalContactDetail
        isOpen={isContactDetailOpen}
        onClose={onContactDetailClose}
        contact={selectedContact}
      />
      {!loading && !contacts.length ? (
        <FirstContact />
      ) : (
        <ContactLists
          loading={loading}
          contacts={contacts}
          handleClick={handleClick}
        />
      )}
    </>
  );
};
