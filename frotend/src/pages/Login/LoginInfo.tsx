import { Grid, Heading, Image, Text } from '@chakra-ui/react';
import LogoPrimary from '../../assets/logo.png';

export const LoginInfo = () => (
  <Grid w={['100%', '100%', '50%', '50%']} paddingRight='100px'>
    <Image
      src={LogoPrimary}
      alt='doit'
      boxSize={['120px', '120px', '150px', '150px']}
    />
    <Heading mt={['4']} as='h1'>
      Gerencie seus contatos
    </Heading>
    <Text maxW={['350']}>
      de forma fácil e eficiente
      <b> em nosso aplicativo gratuito</b>
    </Text>
  </Grid>
);
