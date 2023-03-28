import {
  Box,
  Center,
  Flex,
  Grid,
  Heading,
  Image,
  Text,
  VStack,
} from '@chakra-ui/react';
import { FaForward } from 'react-icons/fa';
// import LogoPrimary from '../../assets/logo.png';
import { theme } from '../../styles/theme';
import SimpleIcon from '../../assets/simple-icon.svg';

export const SignupInfo = () => (
  <Grid
    w={['100%', '100%', '50%', '50%']}
    paddingLeft={['10px', '10px', '150px', '150px']}
  >
    <VStack spacing='14' mt={['10px', '0', '0', '0']}>
      <Flex w='100%'>
        <Center borderRadius='5px' bg='white' w='50px' h='50px'>
          <FaForward color={theme.colors.purple['800']} size={25} />
        </Center>
        <Box ml='4'>
          <Heading size='lg'>Agilidade</Heading>
          <Text>
            Você pode adicionar e editar contatos com facilidade <br /> e muita
            perfomace{' '}
          </Text>
        </Box>
      </Flex>
      <Flex w='100%'>
        <Center borderRadius='5px' bg='white' w='50px' h='50px'>
          <Image src={SimpleIcon} w='25px' />
        </Center>
        <Box ml='4'>
          <Heading size='lg'>Simplicidade</Heading>
          <Text>
            nosso aplicativo é fácil de usar, <br /> mesmo para os usuários mais
            inexperientes.
          </Text>
        </Box>
      </Flex>
    </VStack>
  </Grid>
);
