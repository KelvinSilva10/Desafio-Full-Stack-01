import { Center } from '@chakra-ui/react';
import { FaArrowLeft } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { theme } from '../../styles/theme';

interface iGoBackButton {
  top: string;
  left: string;
}

export const GoBackButton = ({ top, left }: iGoBackButton) => {
  const history = useHistory();

  return (
    <Center
      as='button'
      w={['60px', '80px']}
      h='60px'
      bg='#4e71a2'
      fontSize='2xl'
      borderRadius='md'
      position='absolute'
      top={top}
      left={left}
      _hover={{
        bg: '#3a567e',
      }}
      onClick={() => history.push('/')}
    >
      <FaArrowLeft color={theme.colors.white} />
    </Center>
  );
};
