import React from "react";
import { Grid, Paper, Typography, Link, Box } from "@mui/material";
import { 
  SportsSoccer, Schedule, LocationOn, Person, 
  People, Rule, EmojiEvents, Cancel, Description 
} from "@mui/icons-material";
import InfoItem from "./infoItem";

const LeagueDetailsSection = ({ tournament }) => {
    return (
        <Grid container spacing={3}>
            {/* Tournament Details */}
            <Grid item xs={12}>
                <Paper elevation={3} sx={{ 
                    p: 3, 
                    borderRadius: 3, 
                    bgcolor: 'background.paper',
                    borderLeft: '4px solid',
                    borderColor: 'primary.main',
                    transition: 'transform 0.3s, box-shadow 0.3s',
                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)'
                    }
                }}>
                    <Typography 
                        variant="h5" 
                        gutterBottom 
                        sx={{ 
                            display: 'flex', 
                            alignItems: 'center',
                            fontWeight: 600,
                            color: 'text.primary',
                            mb: 3
                        }}
                    >
                        <SportsSoccer color="primary" sx={{ mr: 1.5, fontSize: '1.8rem' }} /> 
                        Tournament Details
                    </Typography>
                    
                    <Grid container spacing={3} sx={{ mt: 1 }}>
                        <InfoItem 
                            icon={<SportsSoccer color="secondary" />} 
                            label="Format" 
                            value={tournament.matchFormat} 
                            tooltip="Match format and rules" 
                        />
                        <InfoItem 
                            icon={<Schedule color="secondary" />} 
                            label="Game Duration" 
                            value={`${tournament.gameDuration} minutes`} 
                            tooltip="Duration per game" 
                        />
                        <InfoItem 
                            icon={<LocationOn color="secondary" />} 
                            label="Location" 
                            value={tournament.location} 
                            tooltip="Tournament venue" 
                        />
                        <InfoItem 
                            icon={<Person color="secondary" />} 
                            label="Age Group" 
                            value={tournament.ageGroup} 
                            tooltip="Age category" 
                        />
                        <InfoItem 
                            icon={<People color="secondary" />} 
                            label="Gender" 
                            value={tournament.gender} 
                            tooltip="Gender category" 
                        />
                        {tournament.ruleAttachmentUrl && (
                            <InfoItem
                                icon={<Rule color="secondary" />} 
                                label="Rules Document" 
                                tooltip="Official tournament rules"
                                value={
                                    <Link 
                                        href={tournament.ruleAttachmentUrl} 
                                        target="_blank" 
                                        rel="noopener"
                                        sx={{
                                            color: 'primary.main',
                                            fontWeight: 500,
                                            '&:hover': {
                                                textDecoration: 'underline',
                                                color: 'primary.dark'
                                            }
                                        }}
                                    >
                                        View Rules PDF
                                    </Link>
                                }
                            />
                        )}
                    </Grid>
                </Paper>
            </Grid>

            {/* Description */}
            {tournament.description && (
                <Grid item xs={12}>
                    <Paper elevation={3} sx={{ 
                        p: 3, 
                        borderRadius: 3, 
                        bgcolor: 'background.paper',
                        borderLeft: '4px solid',
                        borderColor: 'info.main',
                        transition: 'transform 0.3s, box-shadow 0.3s',
                        '&:hover': {
                            transform: 'translateY(-2px)',
                            boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)'
                        }
                    }}>
                        <Typography 
                            variant="h5" 
                            gutterBottom 
                            sx={{ 
                                display: 'flex', 
                                alignItems: 'center',
                                fontWeight: 600,
                                color: 'text.primary',
                                mb: 2
                            }}
                        >
                            <Description color="info" sx={{ mr: 1.5, fontSize: '1.8rem' }} /> 
                            Description
                        </Typography>
                        <Typography 
                            variant="body1" 
                            sx={{ 
                                whiteSpace: 'pre-line',
                                lineHeight: 1.7,
                                color: 'text.secondary'
                            }}
                        >
                            {tournament.description}
                        </Typography>
                    </Paper>
                </Grid>
            )}

            {/* Awards and Cancellation Policy */}
            <Grid item container spacing={3} xs={12}>
                {/* Awards */}
                {tournament.awards && (
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ 
                            p: 3, 
                            borderRadius: 3, 
                            bgcolor: 'background.paper',
                            borderLeft: '4px solid',
                            borderColor: 'warning.main',
                            height: '100%',
                            transition: 'transform 0.3s, box-shadow 0.3s',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)'
                            }
                        }}>
                            <Typography 
                                variant="h5" 
                                gutterBottom 
                                sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    fontWeight: 600,
                                    color: 'text.primary',
                                    mb: 2
                                }}
                            >
                                <EmojiEvents color="warning" sx={{ mr: 1.5, fontSize: '1.8rem' }} /> 
                                Awards
                            </Typography>
                            <Box sx={{
                                backgroundColor: 'rgba(255, 167, 38, 0.05)',
                                p: 2.5,
                                borderRadius: 2
                            }}>
                                <Typography 
                                    variant="body1" 
                                    sx={{ 
                                        whiteSpace: 'pre-line',
                                        lineHeight: 1.7,
                                        color: 'text.secondary'
                                    }}
                                >
                                    {tournament.awards}
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                )}

                {/* Cancellation Policy */}
                {tournament.cancellationPolicy && (
                    <Grid item xs={12} md={6}>
                        <Paper elevation={3} sx={{ 
                            p: 3, 
                            borderRadius: 3, 
                            bgcolor: 'background.paper',
                            borderLeft: '4px solid',
                            borderColor: 'error.main',
                            height: '100%',
                            transition: 'transform 0.3s, box-shadow 0.3s',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.1)'
                            }
                        }}>
                            <Typography 
                                variant="h5" 
                                gutterBottom 
                                sx={{ 
                                    display: 'flex', 
                                    alignItems: 'center',
                                    fontWeight: 600,
                                    color: 'text.primary',
                                    mb: 2
                                }}
                            >
                                <Cancel color="error" sx={{ mr: 1.5, fontSize: '1.8rem' }} /> 
                                Cancellation Policy
                            </Typography>
                            <Box sx={{
                                backgroundColor: 'rgba(244, 67, 54, 0.05)',
                                p: 2.5,
                                borderRadius: 2
                            }}>
                                <Typography 
                                    variant="body1" 
                                    sx={{ 
                                        whiteSpace: 'pre-line',
                                        lineHeight: 1.7,
                                        color: 'text.secondary'
                                    }}
                                >
                                    {tournament.cancellationPolicy}
                                </Typography>
                            </Box>
                        </Paper>
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
};

export default LeagueDetailsSection;