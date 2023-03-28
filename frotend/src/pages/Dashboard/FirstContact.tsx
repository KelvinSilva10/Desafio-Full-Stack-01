import {
  Box,
  Button,
  Center,
  Heading,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import React from 'react';
import { FaClipboard } from 'react-icons/fa';
import { Header } from '../../components/Header';
import { ModalCreateContact } from '../../components/Modal/ModalCreateContact';

// eslint-disable-next-line arrow-body-style
export const FirstContact = () => {
  const {
    isOpen: isCreateTaskOpen,
    onOpen: onCreateTaskOpen,
    onClose: onCreateTaskClose,
  } = useDisclosure();

  return (
    <>
      <ModalCreateContact
        isOpen={isCreateTaskOpen}
        onClose={onCreateTaskClose}
      />
      <Header />
      <Box
        mt='4'
        w='90vw'
        ml='5vw'
        paddingY='16'
        paddingX={['6', '6', '0', '0']}
        justifyContent='center'
        textAlign='center'
        borderWidth='2px'
        borderColor='gray.200'
        borderStyle='dashed'
      >
        <Center fontSize='5xl'>
          <FaClipboard color='#bdbdbd' />
        </Center>
        <Heading fontSize='4xl' as='h1' mt='4'>
          Você não tem nenhum contato cadastrado
        </Heading>
        <Button
          padding='6'
          mt='6'
          bgColor='purple.800'
          color='white'
          _hover={{ bg: 'purpple.900' }}
          onClick={onCreateTaskOpen}
        >
          Criar contato
        </Button>
      </Box>
    </>
  );
};
