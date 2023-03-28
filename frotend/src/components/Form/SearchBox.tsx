import { useForm } from 'react-hook-form';
import { Button, Center, Flex, useDisclosure } from '@chakra-ui/react';
import { FaSearch } from 'react-icons/fa';
import { theme } from '../../styles/theme';
import { ModalCreateContact } from '../Modal/ModalCreateContact';
import { Input } from './Input';
import { useContacts } from '../../contexts/ContactsContext';
import { useAuth } from '../../contexts/AuthContexts';

interface iSearchData {
  name: string;
}

// eslint-disable-next-line arrow-body-style
export const SearchBox = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const { searchContact } = useContacts();
  const { accessToken } = useAuth();

  const handleSearch = ({ name }: iSearchData) => {
    searchContact(name, accessToken);
  };

  const { register, handleSubmit } = useForm<iSearchData>();

  return (
    <>
      <ModalCreateContact isOpen={isOpen} onClose={onClose} />
      <Flex
        borderBottomWidth='1px'
        borderColor='gray.50'
        mt='6'
        w='100%'
        paddingX={['4', '8,']}
        paddingY='2'
        paddingBottom='6'
        flexDir={['column', 'column', 'row', 'row']}
      >
        <Flex as='form' onSubmit={handleSubmit(handleSearch)}>
          <Input
            w={['100%', '100%', '35vw', '35vw']}
            placeholder='Pesquisar por nome'
            {...register('name')}
          />
          <Center
            borderRadius='8px'
            as='button'
            ml='2'
            w='65px'
            h='60px'
            fontSize='2xl'
            bg='#3a567e'
          >
            <FaSearch color={theme.colors.white} />
          </Center>
        </Flex>
        <Button
          bg='#4e71a2'
          color='white'
          paddingX='16'
          ml={['0', '0', '4']}
          h='60px'
          borderRadius='8px'
          onClick={onOpen}
          mt={['4', '4', '0', '0']}
          _hover={{ bg: '#3a567e' }}
        >
          Adicionar um novo contato
        </Button>
      </Flex>
    </>
  );
};
