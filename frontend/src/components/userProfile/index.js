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
  const { username, email, roles = [], playerProfile, refereeProfile } = profile;

  const isPlayer = roles.includes("PLAYER") && playerProfile;
  const isReferee = roles.includes("REFEREE") && refereeProfile;

  const name = profile.name || username;
  const avatarUrl = profile.avatarUrl || "https://i.pravatar.cc/150?img=10";

  return (
    <ProfileContainer elevation={3}>
      <Box sx={{ display: "flex", alignItems: "flex-start", gap: 3 }}>
        <Avatar 
          src={avatarUrl} 
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
            {name}
            {isPlayer && playerProfile.jerseyNumber && (
              <Typography component="span" color="primary" fontWeight="bold"> #{playerProfile.jerseyNumber}</Typography>
            )}
          </Typography>
          
          <DetailRow>
            {roles.map(role => (
              <Chip key={role} label={role} color="primary" size="small" />
            ))}
            {isPlayer && playerProfile.position && (
              <Chip label={playerProfile.position} variant="outlined" size="small" />
            )}
            {isPlayer && playerProfile.teamName && (
              <Chip label={playerProfile.teamName} color="secondary" size="small" />
            )}
            {isReferee && refereeProfile.tournamentName && (
              <Chip label={`Referee: ${refereeProfile.tournamentName}`} variant="outlined" size="small" />
            )}
          </DetailRow>

          <Divider sx={{ my: 2 }} />

          <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 2 }}>
            <DetailRow>
              <Typography variant="body1" fontWeight="medium" color="text.secondary">
                Email:
              </Typography>
              <Typography variant="body1">{email}</Typography>
            </DetailRow>

            {(isPlayer || isReferee) && (
              <>
                <DetailRow>
                  <Typography variant="body1" fontWeight="medium" color="text.secondary">
                    Height:
                  </Typography>
                  <Typography variant="body1">{(playerProfile?.height || refereeProfile?.height) + " cm"}</Typography>
                </DetailRow>

                <DetailRow>
                  <Typography variant="body1" fontWeight="medium" color="text.secondary">
                    Weight:
                  </Typography>
                  <Typography variant="body1">{(playerProfile?.weight || refereeProfile?.weight) + " kg"}</Typography>
                </DetailRow>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </ProfileContainer>
  );
};

export default UserProfile;
