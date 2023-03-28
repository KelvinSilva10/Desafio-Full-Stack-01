import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { theme } from '../styles/theme';
import { AuthProvider } from './AuthContexts';
import { ContactsProvider } from './ContactsContext';

interface iAppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: iAppProviderProps) => (
  <AuthProvider>
    <ContactsProvider>
      <ChakraProvider theme={theme}>{children}</ChakraProvider>
    </ContactsProvider>
  </AuthProvider>
);
