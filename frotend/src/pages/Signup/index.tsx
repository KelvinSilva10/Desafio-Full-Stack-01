import { Flex, useBreakpointValue, useDisclosure } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

import { SignupInfo } from './SignupInfo';
import { SignupForm } from './SignupForm';
import { GoBackButton } from '../Login/GoBackButton';
import { api } from '../../services/api';
import { ModalSuccess } from '../../components/Modal/ModalSucess';
import { ModalError } from '../../components/Modal/ModalError';

const signUpSchema = yup.object().shape({
  name: yup.string().max(50).required('Nome obrigatório'),
  firstEmail: yup
    .string()
    .max(50)
    .email('Email inválido')
    .required('Email obrigatório'),
  secondaryEmail: yup.string().max(50).email('Email inválido').notRequired(),
  mainPhone: yup
    .string()
    .max(20)
    .matches(
      /^(\([0-9]{2}\)\s)(9[0-9]{4}-[0-9]{4}|[0-9]{4}-[0-9]{4})$/,
      'Número Inválido'
    )
    .required(),
  secondaryPhone: yup
    .string()
    .max(20)
    // .matches(
    //   /^(\([0-9]{2}\)\s)(9[0-9]{4}-[0-9]{4}|[0-9]{4}-[0-9]{4})$/,
    //   "Número Inválido"
    // )
    .notRequired(),
  password: yup.string().min(4).max(120).required('Senha obrigatória'),
  confirm_password: yup
    .string()
    .required('Confirmação de senha obrigatória')
    .oneOf([yup.ref('password')], 'Senhas diferentes'),
});

interface iSignUpData {
  name: string;
  firstEmail: string;
  secondaryEmail?: string;
  mainPhone: string;
  secondaryPhone?: string;
  password: string;
  confirm_password: string;
}

type iSignUpDataWithoutConfirmPassword = Omit<iSignUpData, 'confirm_password'>;

export const Signup = () => {
  const [loading, setLoading] = useState(false);

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<iSignUpData>({
    resolver: yupResolver(signUpSchema),
  });

  const {
    isOpen: isModalSuccessOpen,
    onOpen: onModalSuccessOpen,
    onClose: onModalSuccessClose,
  } = useDisclosure();
  const {
    isOpen: isModalErrorOpen,
    onOpen: onModalErrorOpen,
    onClose: onModalErrorsClose,
  } = useDisclosure();

  const handleSignUp = async ({
    name,
    firstEmail,
    secondaryEmail,
    mainPhone,
    secondaryPhone,
    password,
  }: iSignUpData) => {
    setLoading(true);
    const data: iSignUpDataWithoutConfirmPassword = {
      name,
      firstEmail,
      mainPhone,
      password,
    };

    if (secondaryEmail) {
      data.secondaryEmail = secondaryEmail;
    }

    if (secondaryPhone) {
      data.secondaryPhone = secondaryPhone;
    }

    setLoading(true);

    try {
      await api.post('/clients', data);
      setLoading(false);
      onModalSuccessOpen();
    } catch (err: any) {
      setLoading(false);
      console.error(err);
      onModalErrorOpen();
      console.log(err.response.data);
    }
  };

  const isWideVersion = useBreakpointValue({
    base: false,
    md: true,
  });

  const history = useHistory();

  return (
    <>
      <ModalSuccess
        buttonMessage='Ir para o login agora'
        message='Seu cadastro deu super certo,<b>vamos lá</b>'
        onClick={() => history.push('/')}
        secondaryText='Você já pode começar criando <b>suas listas</b> de contatos agora mesmo...'
        isOpen={isModalSuccessOpen}
        onClose={onModalSuccessClose}
      />
      <ModalError
        error='Esse email ou telefone já existe'
        isOpen={isModalErrorOpen}
        onClose={onModalErrorsClose}
        secondaryText='Você já pode tentar novamente, <b>clicando</b> no botão acima ou
          aguarde alguns minutos...'
      />
      <Flex
        padding={['10px 15px', '10px 15px', '0px 0px', '40px 0px']}
        alignItems='center'
        justifyContent='center'
        height={['auto', 'auto', '100%', '100%']}
        bgGradient={[
          'linear(to-b, #000000 65%, white 35%)',
          'linear(to-b, #000000 65%, white 35%)',
          'linear(to-l, #000000 65%, white 35%)',
          'linear(to-l, #000000 65%, white 35%)',
        ]}
        color='white'
      >
        <Flex
          w={['100%', '100%', '90%', '65%']}
          justifyContent='center'
          flexDirection={['column', 'column', 'row', 'row']}
        >
          {isWideVersion ? (
            <>
              <GoBackButton top='10' left='24' />
              <SignupForm
                errors={errors}
                handleSignUp={handleSubmit(handleSignUp)}
                register={register}
                loading={loading}
              />
              <SignupInfo />
            </>
          ) : (
            <>
              <GoBackButton top='10' left='75vw' />
              <SignupInfo />
              <SignupForm
                errors={errors}
                handleSignUp={handleSubmit(handleSignUp)}
                register={register}
                loading={loading}
              />
            </>
          )}
        </Flex>
      </Flex>
    </>
  );
};
