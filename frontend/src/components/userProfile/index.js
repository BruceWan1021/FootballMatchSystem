import React from "react";
import { Avatar, Box, Typography, Paper, Divider, Chip } from "@mui/material";
import { styled } from "@mui/material/styles";

const ProfileContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadius * 2,
  boxShadow: theme.shadows[4],
  marginBottom: theme.spacing(4),
  background: 'linear-gradient(145deg, #f5f5f5, #ffffff)',
}));

const DetailRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

const UserProfile = ({ profile }) => {
  return (
    <ProfileContainer elevation={3}>
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 3 }}>
        <Avatar 
          src={profile.avatarUrl} 
          sx={{ 
            width: 120, 
            height: 120, 
            border: '4px solid',
            borderColor: 'primary.main',
            boxShadow: 3
          }} 
        />
        <Box sx={{ flex: 1 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            {profile.name} <Typography component="span" color="primary" fontWeight="bold">#{profile.jerseyNumber}</Typography>
          </Typography>
          
          <DetailRow>
            <Chip label={profile.role} color="primary" size="small" />
            <Chip label={profile.position} variant="outlined" size="small" />
            <Chip label={profile.team} color="secondary" size="small" />
          </DetailRow>
          
          <Divider sx={{ my: 2 }} />
          
          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 2 }}>
            <DetailRow>
              <Typography variant="body1" fontWeight="medium" color="text.secondary">
                Department:
              </Typography>
              <Typography variant="body1">{profile.department}</Typography>
            </DetailRow>
            
            <DetailRow>
              <Typography variant="body1" fontWeight="medium" color="text.secondary">
                Height:
              </Typography>
              <Typography variant="body1">{profile.height}</Typography>
            </DetailRow>
            
            <DetailRow>
              <Typography variant="body1" fontWeight="medium" color="text.secondary">
                Weight:
              </Typography>
              <Typography variant="body1">{profile.weight}</Typography>
            </DetailRow>
            
            <DetailRow>
              <Typography variant="body1" fontWeight="medium" color="text.secondary">
                Age:
              </Typography>
              <Typography variant="body1">{profile.age}</Typography>
            </DetailRow>
          </Box>
        </Box>
      </Box>
    </ProfileContainer>
  );
};

export default UserProfile; 