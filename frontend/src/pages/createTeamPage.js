import React from 'react';
import { Container } from '@mui/material';
import CreateTeamForm from '../components/teamForm';

const CreateTeamPage = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
      <CreateTeamForm />
    </Container>
  );
};

export default CreateTeamPage;
