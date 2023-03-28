import {
  Box,
  Button,
  Center,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { FaClipboard, FaTimes } from 'react-icons/fa';
import * as yup from 'yup';
import { useAuth } from '../../contexts/AuthContexts';
import { useContacts } from '../../contexts/ContactsContext';
import { theme } from '../../styles/theme';
import { Input } from '../Form/Input';
import { TextArea } from '../Form/TextArea';

interface iModalCreateContactProps {
  isOpen: boolean;
  onClose: () => void;
}

interface iContactData {
  name: string;
  firstEmail: string;
  secondaryEmail?: string;
  mainPhone: string;
  secondaryPhone?: string;
}

const createContactSchema = yup.object().shape({
  name: yup
    .string()
    .max(50, 'Máximo de 50 caracteres')
    .required('Campo obrigatório'),
  firstEmail: yup
    .string()
    .email('Deve ser um email válido')
    .max(50, 'Máximo de 50 caracteres')
    .required('Campo obrigatório'),
  secondaryEmail: yup
    .string()
    .email('Deve ser um email válido')
    .max(50, 'Máximo de 50 caracteres')
    .optional(),
  mainPhone: yup.string().max(20).required('Campo obrigatório'),
  secondaryPhone: yup.string().max(20).optional(),
});

export const ModalCreateContact = ({
  isOpen,
  onClose,
}: iModalCreateContactProps) => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<iContactData>({
    resolver: yupResolver(createContactSchema),
  });

  const { user, accessToken } = useAuth();
  const { createContact } = useContacts();

  const handleCreateContact = (data: iContactData) => {
    // const newData = { ...data, userId: user.id };
    createContact(data, accessToken).then((res) => onClose());
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent
        as='form'
        onSubmit={handleSubmit(handleCreateContact)}
        padding='2'
        bg='white'
        color='gray.800'
      >
        <ModalHeader display='flex'>
          <Center bgColor='#4e71a2' w='30px' h='30px' borderRadius='5px'>
            <FaClipboard color={theme.colors.white} />
          </Center>
          <Text fontWeight='bold' ml='2'>
            Adicionar
          </Text>
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
        </ModalHeader>

        <ModalBody textAlign='center'>
          <VStack spacing='5'>
            <Input
              label='Nome'
              error={errors.name}
              {...register('name')}
              placeholder='Digite o nome'
            />
            <Input
              label='Email princial'
              error={errors.firstEmail}
              {...register('firstEmail')}
              placeholder='Digite o email principal'
            />
            <Input
              placeholder='Digite seu email secundário'
              label='Email Secundário'
              type='email'
              error={errors.secondaryEmail}
              {...register('secondaryEmail')}
            />
            <Input
              placeholder='Digite seu telefone principal'
              label='Telefone principal'
              type='tel'
              error={errors.mainPhone}
              {...register('mainPhone')}
            />
            <Input
              placeholder='Digite seu telefone secundário'
              label='Telefone secundário'
              type='tel'
              error={errors.secondaryPhone}
              {...register('secondaryPhone')}
            />
          </VStack>
        </ModalBody>

        <ModalFooter flexDirection='column'>
          <Button
            type='submit'
            bg='#4e71a2'
            color='white'
            w='100%'
            h='60px'
            _hover={{ bg: '#3a567e' }}
          >
            Adicionar Contato
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
