import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Progress,
  Text,
} from '@chakra-ui/react';
import {
  FaCheck,
  FaCube,
  FaExclamation,
  FaTimes,
  FaTrash,
} from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContexts';
import { useContacts } from '../../contexts/ContactsContext';
import { theme } from '../../styles/theme';

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

interface iModalContactDetailProps {
  isOpen: boolean;
  onClose: () => void;
  contact: iContact;
}

export const ModalContactDetail = ({
  contact,
  isOpen,
  onClose,
}: iModalContactDetailProps) => {
  const { accessToken, user } = useAuth();
  const { deleteContact, updateContact } = useContacts();

  const handleDelete = () => {
    deleteContact(contact.id, accessToken);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent padding='2' bg='white' color='gray.800'>
        <ModalHeader display='flex' justifyContent='space-between'>
          <Flex>
            <Center bgColor='#4e71a2' w='30px' h='30px' borderRadius='5px'>
              <FaCube color={theme.colors.white} />
            </Center>
            <Text fontWeight='bold' ml='2'>
              Visualizar
            </Text>
          </Flex>

          <HStack spacing='2'>
            <Center
              as='button'
              w='30px'
              h='30px'
              borderWidth='1px'
              borderRadius='5px'
              borderColor='gray.200'
              bgColor='white'
              onClick={handleDelete}
            >
              <FaTrash color={theme.colors.gray[300]} />
            </Center>
            {/* <Center
              as='button'
              w='30px'
              h='30px'
              borderWidth='1px'
              borderRadius='5px'
              borderColor='gray.200'
              bgColor='white'
              onClick={() => updateContact(contact.id, user.id, accessToken)}
            >
              <FaCheck color={theme.colors.gray[300]} />
            </Center> */}
            <Center
              as='button'
              ml='auto'
              w='32px'
              h='32px'
              bg='red.600'
              fontSize='lg'
              borderRadius='md'
              onClick={onClose}
              _hover={{ bg: 'red.700' }}
            >
              <FaTimes color={theme.colors.white} />
            </Center>
          </HStack>
        </ModalHeader>

        <ModalBody>
          <Heading as='h1' fontSize='2xl'>
            {contact.name}
          </Heading>
          <Text color='gray.400'>{contact.firstEmail}</Text>
        </ModalBody>

        <Box padding='6'>
          {/* <Progress colorScheme='purple' value={task.completed ? 100 : 10} /> */}
          <Text color='gray.300' mt='3'>
            07 March 2022
          </Text>
        </Box>
      </ModalContent>
    </Modal>
  );
};
