import { Box, Grid } from '@chakra-ui/react';
import { Card } from '../../components/Card';
import { SearchBox } from '../../components/Form/SearchBox';
import { Header } from '../../components/Header';
import { CardSkeleton } from '../../components/Skeleton/CardSkeleton';

interface iContact {
  id: string;
  name: string;
  firstEmail: string;
  secondaryEmail?: string;
  mainPhone: string;
  secondaryPhone?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface iContactListProps {
  loading: boolean;
  contacts: iContact[];
  handleClick: (task: iContact) => void;
}

export const ContactLists = ({
  loading,
  contacts,
  handleClick,
}: iContactListProps) => (
  <Box>
    <Header />
    <SearchBox />
    <Grid
      w='100%'
      templateColumns='repeat(auto-fill, minmax(420px, 1fr))'
      gap={10}
      mt='8'
      padding='6'
    >
      {loading ? (
        <CardSkeleton repeatCount={9} />
      ) : (
        contacts.map((contact) => (
          <Card key={contact.id} contact={contact} handleClick={handleClick} />
        ))
      )}
    </Grid>
  </Box>
);
