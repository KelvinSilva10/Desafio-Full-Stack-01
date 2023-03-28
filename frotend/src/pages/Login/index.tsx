import { Flex } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { useAuth } from '../../contexts/AuthContexts';
import { LoginInfo } from './LoginInfo';
import { LoginForm } from './LoginForm';

const signInSchema = yup.object().shape({
  firstEmail: yup
    .string()
    .required('Email obrigatório')
    .email('Email inválido'),
  password: yup.string().required('Senha obrigatória'),
});

interface iSignInData {
  firstEmail: string;
  password: string;
}

export const Login = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const { signIn } = useAuth();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<iSignInData>({
    resolver: yupResolver(signInSchema),
  });

  const handleSignIn = (data: iSignInData) => {
    setLoading(true);
    signIn(data)
      .then((_) => {
        setLoading(false);
        history.push('/dashboard');
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  };

  return (
    <Flex
      padding={['10px 15px', '10px 15px', '0px 0px', '0px 0px']}
      alignItems='center'
      justifyContent='center'
      height={['auto', 'auto', '100vh', '100vh']}
      bgGradient={[
        'linear(to-b, #000000 65%, white 35%)',
        'linear(to-b, #000000 65%, white 35%)',
        'linear(to-r, #000000 65%, white 35%)',
        'linear(to-r, #000000 65%, white 35%)',
      ]}
      color='white'
    >
      <Flex
        w={['100%', '100%', '90%', '65%']}
        justifyContent='center'
        flexDirection={['column', 'column', 'row', 'row']}
        alignItems='center'
      >
        <LoginInfo />
        <LoginForm
          errors={errors}
          handleSignIn={handleSubmit(handleSignIn)}
          loading={loading}
          register={register}
        />
      </Flex>
    </Flex>
  );
};
