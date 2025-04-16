import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Grid,
  Divider,
  Chip,
  Paper,
  Avatar,
  Link,
  CircularProgress,
  Stack,
  Tooltip,
  IconButton
} from "@mui/material";
import {
  CalendarToday,
  People,
  SportsSoccer,
  Schedule,
  LocationOn,
  EventAvailable,
  EventBusy,
  Rule,
  EmojiEvents,
  Cancel,
  Description,
  ContactMail,
  Phone,
  Person
} from "@mui/icons-material";
import { useParams } from "react-router-dom";

const TournamentDetailsPage = () => {
  const { id } = useParams();
  const [tournament, setTournament] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTournament = async () => {
      try {
        setLoading(true);
        const res = await fetch(`http://localhost:8080/api/tournaments/${id}`);
        const data = await res.json();
        setTournament(data);
      } catch (error) {
        console.error("Failed to fetch tournament:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTournament();
  }, [id]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
  };

  const InfoItem = ({ icon, label, value, tooltip }) => (
    <Tooltip title={tooltip || ''} arrow>
      <Grid item xs={12} sm={6} md={4} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32, mr: 2 }}>
          {icon}
        </Avatar>
        <Box>
          <Typography variant="subtitle2" color="text.secondary">{label}</Typography>
          <Typography variant="body1">{value || "-"}</Typography>
        </Box>
      </Grid>
    </Tooltip>
  );

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!tournament) {
    return (
      <Container sx={{ mt: 4, textAlign: 'center' }}>
        <Typography variant="h6">Tournament not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 4, boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)' }}>
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h3" fontWeight="bold" gutterBottom sx={{ color: 'primary.main' }}>
            {tournament.name}
          </Typography>
          
          <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 2 }}>
            <Chip 
              label={`Season: ${tournament.season || 'N/A'}`} 
              color="secondary" 
              size="small" 
              icon={<EventAvailable fontSize="small" />}
            />
            <Chip 
              label={`Host: ${tournament.hostSchool}`} 
              size="small" 
              icon={<LocationOn fontSize="small" />}
            />
            {tournament.requiresApproval && (
              <Chip 
                label="Approval Required" 
                color="warning" 
                size="small" 
              />
            )}
          </Stack>
          
          <Divider sx={{ my: 2, borderColor: 'divider' }} />
        </Box>

        {/* Main Info Grid */}
        <Grid container spacing={3}>
          {/* Dates Section */}
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: 'background.paper', height: '100%' }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <CalendarToday color="primary" sx={{ mr: 1 }} /> Tournament Dates
              </Typography>
              
              <Box sx={{ pl: 3 }}>
                <Typography variant="subtitle1" gutterBottom sx={{ mt: 1 }}>
                  Signup Period
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Chip 
                    label={formatDate(tournament.signupStart)} 
                    icon={<EventAvailable fontSize="small" />}
                    variant="outlined"
                  />
                  <Chip 
                    label={formatDate(tournament.signupEnd)} 
                    icon={<EventBusy fontSize="small" />}
                    variant="outlined"
                  />
                </Stack>

                <Typography variant="subtitle1" gutterBottom sx={{ mt: 3 }}>
                  League Period
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Chip 
                    label={formatDate(tournament.leagueStart)} 
                    icon={<EventAvailable fontSize="small" />}
                    variant="outlined"
                  />
                  <Chip 
                    label={formatDate(tournament.leagueEnd)} 
                    icon={<EventBusy fontSize="small" />}
                    variant="outlined"
                  />
                </Stack>
              </Box>
            </Paper>
          </Grid>

          {/* Team Info Section */}
          <Grid item xs={12} md={6}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: 'background.paper', height: '100%' }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <People color="primary" sx={{ mr: 1 }} /> Team Information
              </Typography>
              
              <Grid container spacing={2} sx={{ pl: 2 }}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">Min Teams</Typography>
                  <Typography variant="h6" color="primary">{tournament.minTeams}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">Max Teams</Typography>
                  <Typography variant="h6" color="primary">{tournament.maxTeams}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">Min Players</Typography>
                  <Typography variant="h6" color="primary">{tournament.minPlayersPerTeam}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">Max Players</Typography>
                  <Typography variant="h6" color="primary">{tournament.maxPlayersPerTeam}</Typography>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Tournament Details Section */}
          <Grid item xs={12}>
            <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: 'background.paper' }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                <SportsSoccer color="primary" sx={{ mr: 1 }} /> Tournament Details
              </Typography>
              
              <Grid container spacing={3} sx={{ mt: 1 }}>
                <InfoItem 
                  icon={<SportsSoccer />} 
                  label="Format" 
                  value={tournament.matchFormat} 
                  tooltip="Match format and rules"
                />
                <InfoItem 
                  icon={<Schedule />} 
                  label="Game Duration" 
                  value={`${tournament.gameDuration} minutes`} 
                  tooltip="Duration per game"
                />
                <InfoItem 
                  icon={<LocationOn />} 
                  label="Location" 
                  value={tournament.location} 
                  tooltip="Tournament venue"
                />
                <InfoItem 
                  icon={<Person />} 
                  label="Age Group" 
                  value={tournament.ageGroup} 
                  tooltip="Age category"
                />
                <InfoItem 
                  icon={<People />} 
                  label="Gender" 
                  value={tournament.gender} 
                  tooltip="Gender category"
                />
                {tournament.ruleAttachmentUrl && (
                  <InfoItem 
                    icon={<Rule />} 
                    label="Rules Document" 
                    value={
                      <Link href={tournament.ruleAttachmentUrl} target="_blank" rel="noopener">
                        View Rules PDF
                      </Link>
                    } 
                    tooltip="Official tournament rules"
                  />
                )}
              </Grid>
            </Paper>
          </Grid>

          {/* Additional Information */}
          {tournament.description && (
            <Grid item xs={12}>
              <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: 'background.paper' }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <Description color="primary" sx={{ mr: 1 }} /> Description
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                  {tournament.description}
                </Typography>
              </Paper>
            </Grid>
          )}

          {tournament.awards && (
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: 'background.paper' }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <EmojiEvents color="primary" sx={{ mr: 1 }} /> Awards
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                  {tournament.awards}
                </Typography>
              </Paper>
            </Grid>
          )}

          {tournament.cancellationPolicy && (
            <Grid item xs={12} md={6}>
              <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: 'background.paper' }}>
                <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
                  <Cancel color="primary" sx={{ mr: 1 }} /> Cancellation Policy
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                  {tournament.cancellationPolicy}
                </Typography>
              </Paper>
            </Grid>
          )}
        </Grid>

        {/* Contacts Section */}
        {tournament.contacts?.length > 0 && (
          <Box sx={{ mt: 4 }}>
            <Divider sx={{ my: 3, borderColor: 'divider' }} />
            <Typography variant="h5" gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <ContactMail color="primary" sx={{ mr: 1 }} /> Contacts
            </Typography>
            
            <Grid container spacing={3}>
              {tournament.contacts.map((contact, idx) => (
                <Grid item xs={12} sm={6} key={idx}>
                  <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: 'background.paper' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                        <Person />
                      </Avatar>
                      <Box>
                        <Typography variant="h6">
                          {contact.name}
                          {contact.isPrimary && (
                            <Chip
                              label="Primary"
                              size="small"
                              color="primary"
                              sx={{ ml: 1 }}
                            />
                          )}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary">
                          {contact.role || "Tournament Contact"}
                        </Typography>
                      </Box>
                    </Box>
                    
                    <Stack spacing={1} sx={{ pl: 1 }}>
                      <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                        <ContactMail fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                        <Link href={`mailto:${contact.email}`}>{contact.email}</Link>
                      </Typography>
                      {contact.phone && (
                        <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                          <Phone fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                          <Link href={`tel:${contact.phone}`}>{contact.phone}</Link>
                        </Typography>
                      )}
                    </Stack>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default TournamentDetailsPage;