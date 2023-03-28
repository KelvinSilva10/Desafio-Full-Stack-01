import {
  Box,
  Center,
  Flex,
  Heading,
  HStack,
  Progress,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaPen, FaTrash } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContexts';
import { useContacts } from '../../contexts/ContactsContext';
import { theme } from '../../styles/theme';
import { ModalUpdateContact } from '../Modal/ModalUpdateContact';

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
interface iCardProps {
  contact: iContact;
  handleClick: (task: iContact) => void;
}

// eslint-disable-next-line arrow-body-style
export const Card = ({ contact, handleClick }: iCardProps) => {
  const { deleteContact, updateContact } = useContacts();

  const { user, accessToken } = useAuth();
  const [updatedContact, setUpdatedContact] = useState(contact);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box
        cursor='pointer'
        _hover={{ transform: 'translate(-7px)', borderColor: 'gray.100' }}
        transition='border 0.2s, ease 0s, transform 0.2s'
        borderWidth='1px'
        borderColor='gray.50'
        boxShadow='base'
        padding='7'
        w={['80vw', 'auto']}
      >
        <Flex justify='space-between'>
          <Heading as='h1' size='md'>
            {contact.name}
          </Heading>
          <HStack spacing='4'>
            <Center
              as='button'
              w='30px'
              h='30px'
              borderWidth='1px'
              borderRadius='5px'
              borderColor='gray.200'
              bgColor='white'
              onClick={() => deleteContact(contact.id, accessToken)}
            >
              <FaTrash color={theme.colors.gray[300]} />
            </Center>
            <Center
              as='button'
              w='30px'
              h='30px'
              borderWidth='1px'
              borderRadius='5px'
              borderColor='gray.200'
              bgColor='white'
              // onClick={() => console.log('Função para update card')}
              onClick={() => {
                setUpdatedContact(contact);
                onOpen();
              }}
            >
              <FaPen color={theme.colors.gray[300]} />
            </Center>
          </HStack>
        </Flex>

        <Box onClick={() => handleClick(contact)} w='100%' mt='4'>
          <Text> Email principal: {contact.firstEmail}</Text>
          <Text color='gray.300'>
            Email secundário: {contact.secondaryEmail}
          </Text>
          <Text>Tel.: {contact.mainPhone}</Text>
          <Text color='gray.300'>
            Telefone secundário: {contact.secondaryPhone}
          </Text>
        </Box>
      </Box>
      <ModalUpdateContact
        isOpen={isOpen}
        onClose={onClose}
        contactId={contact.id}
        contact={contact}
      />
    </>
  );
};
