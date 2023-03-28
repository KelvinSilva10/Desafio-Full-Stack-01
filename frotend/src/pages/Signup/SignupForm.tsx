import { Box, Button, Grid, Heading, Text, VStack } from '@chakra-ui/react';

import { FieldErrorsImpl, FieldValues, UseFormRegister } from 'react-hook-form';
import { FaEnvelope, FaLock, FaUser, FaPhone } from 'react-icons/fa';
import { Input } from '../../components/Form/Input';

interface iSignUpData {
  name: string;
  firstEmail: string;
  secondaryEmail?: string;
  mainPhone: string;
  secondaryPhone?: string;
  password: string;
  confirm_password: string;
}

interface iSignUpFormProps {
  handleSignUp: () => void;
  errors: Partial<
    FieldErrorsImpl<{
      name: string;
      firstEmail: string;
      secondaryEmail?: string;
      mainPhone: string;
      secondaryPhone?: string;
      password: string;
      confirm_password: string;
    }>
  >;
  register: UseFormRegister<iSignUpData>;
  loading: boolean;
}

export const SignupForm = ({
  handleSignUp,
  errors,
  register,
  loading,
}: iSignUpFormProps) => (
  <Grid
    onSubmit={handleSignUp}
    as='form'
    padding='40px 25px'
    border='3px solid'
    borderColor='gray.100'
    bg='white'
    color='gray.900'
    mt={['4', '4', '0']}
    w={['100%', '100%', '40%', '40%']}
  >
    <Heading size='lg'>Crie sua conta</Heading>
    <VStack mt='6' spacing='5'>
      <Input
        placeholder='Digite seu nome'
        icon={FaUser}
        label='Nome'
        error={errors.name}
        {...register('name')}
      />
      <Box w='100%'>
        <Input
          placeholder='Digite seu email principal'
          icon={FaEnvelope}
          label='Email Principal'
          type='email'
          error={errors.firstEmail}
          {...register('firstEmail')}
        />
        {!errors.firstEmail && (
          <Text ml='1' mt='1' color='gray.300'>
            Exemplo: nome@email.com
          </Text>
        )}
        <Input
          placeholder='Digite seu email secundário'
          icon={FaEnvelope}
          label='Email Secundário'
          type='email'
          error={errors.secondaryEmail}
          {...register('secondaryEmail')}
        />
        {!errors.secondaryEmail && (
          <Text ml='1' mt='1' color='gray.300'>
            Exemplo: nome@email.com
          </Text>
        )}
        <Input
          placeholder='Digite seu telefone principal'
          icon={FaPhone}
          label='Telefone principal'
          type='tel'
          error={errors.mainPhone}
          {...register('mainPhone')}
        />
        {!errors.mainPhone && (
          <Text ml='1' mt='1' color='gray.300'>
            Exemplo: (79) 91111-1111
          </Text>
        )}
        <Input
          placeholder='Digite seu telefone secundário'
          icon={FaPhone}
          label='Telefone secundário'
          type='tel'
          error={errors.secondaryPhone}
          {...register('secondaryPhone')}
        />
        {!errors.secondaryPhone && (
          <Text ml='1' mt='1' color='gray.300'>
            Exemplo: (79) 91111-1111
          </Text>
        )}
      </Box>
      <Input
        placeholder='Digite sua senha'
        icon={FaLock}
        label='Senha'
        type='password'
        error={errors.password}
        {...register('password')}
      />
      <Input
        placeholder='Confirme sua senha'
        icon={FaLock}
        label='Confirmação de Senha'
        type='password'
        error={errors.confirm_password}
        {...register('confirm_password')}
      />
    </VStack>

    <Button
      mt='8'
      isLoading={loading}
      bg='#4e71a2'
      color='white'
      w='100%'
      h='60px'
      borderRadius='8px'
      _hover={{ bg: '#3a567e' }}
      type='submit'
    >
      Finalizar Cadastro
    </Button>
  </Grid>
);
