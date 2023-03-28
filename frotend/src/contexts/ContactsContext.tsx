/* eslint-disable consistent-return */
import { AxiosResponse } from 'axios';
import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';
import { api } from '../services/api';

interface iContactsProviderProps {
  children: ReactNode;
}

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

interface IContactRequest {
  name: string;
  firstEmail: string;
  secondaryEmail?: string;
  mainPhone: string;
  secondaryPhone?: string;
}

interface IContactUpdate {
  name?: string;
  firstEmail?: string;
  secondaryEmail?: string;
  mainPhone?: string;
  secondaryPhone?: string;
}

interface iContactContextData {
  contacts: iContact[];
  createContact: (data: IContactRequest, accessToken: string) => Promise<void>;
  loadContacts: (userId: string, accessToken: string) => Promise<void>;
  deleteContact: (contactId: string, accessToken: string) => Promise<void>;
  updateContact: (
    contactId: string,
    data: IContactUpdate,
    accessToken: string
  ) => Promise<void>;
  searchContact: (ContactName: string, accessToken: string) => Promise<void>;
  notFound: boolean;
  contactNotFound: string;
}

const ContactsContext = createContext<iContactContextData>(
  {} as iContactContextData
);

export const useContacts = () => {
  const context = useContext(ContactsContext);

  if (!context) {
    throw new Error('useContacts must be used within an ContactsProvider');
  }

  return context;
};

export const ContactsProvider = ({ children }: iContactsProviderProps) => {
  const [contacts, setContacts] = useState<iContact[]>([]);
  const [notFound, setNotFound] = useState(false);
  const [contactNotFound, setContactNotFound] = useState('');

  const loadContacts = useCallback(
    async (userId: string, accessToken: string) => {
      try {
        const response = await api.get(`/contacts/`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setContacts(response.data);
        console.log(response);
      } catch (err) {
        console.log(err);
      }
    },
    []
  );

  const createContact = useCallback(
    async (data: IContactRequest, accessToken: string) => {
      api
        .post('/Contacts', data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response: AxiosResponse<iContact>) => {
          setContacts((oldContacts) => [...oldContacts, response.data]);
        })
        .catch((err) => console.error(err));
    },
    []
  );

  const deleteContact = useCallback(
    async (contactId: string, accessToken: string) => {
      await api
        .delete(`/contacts/${contactId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((_) => {
          const filteredContacts = contacts.filter(
            (contact) => contact.id !== contactId
          );
          setContacts(filteredContacts);
        })
        .catch((err) => console.log(err));
    },
    [contacts]
  );

  const updateContact = useCallback(
    async (contactId: string, data: IContactUpdate, accessToken: string) => {
      try {
        const response = await api.patch(`/contacts/${contactId}`, data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        setContacts((prevContacts) =>
          prevContacts.map((contact) => {
            if (contact.id === contactId) {
              return { ...contact, ...response.data };
            }
            return contact;
          })
        );
      } catch (error) {
        console.log(error);
      }
    },
    [setContacts]
  );

  const searchContact = useCallback(
    async (contactName: string, accessToken: string) => {
      const response = await api.get(`/contacts/${contactName}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(response);

      if (!response.data) {
        setContactNotFound(contactName);
        setNotFound(true);
        return;
      }
      setNotFound(false);
      setContacts(response.data);
    },
    []
  );

  const memoizedValue = React.useMemo(
    () => ({
      createContact,
      contacts,
      loadContacts,
      deleteContact,
      updateContact,
      searchContact,
      notFound,
      contactNotFound,
    }),
    [contacts, notFound]
  );

  return (
    <ContactsContext.Provider value={memoizedValue}>
      {children}
    </ContactsContext.Provider>
  );
};
