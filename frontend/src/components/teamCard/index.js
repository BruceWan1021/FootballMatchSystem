import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Button,
} from "@mui/material";

const TeamCard = ({ team, onViewDetails }) => {
  return (
    <Card>
      <CardMedia
        component="img"
        height="140"
        image={team.logoUrl}
        alt={`${team.name} logo`}
      />
      <CardContent>
        <Typography variant="h6">{team.name}</Typography>
        <Typography variant="body2" color="text.secondary">
          School: {team.school}
        </Typography>
        {team.tournamentName && (
          <Typography variant="body2" color="text.secondary">
            League: {team.tournamentName}
          </Typography>
        )}
        <Button size="small" onClick={onViewDetails} sx={{ mt: 1 }}>
          View Detail
        </Button>
      </CardContent>
    </Card>
  );
};

export default TeamCard;
