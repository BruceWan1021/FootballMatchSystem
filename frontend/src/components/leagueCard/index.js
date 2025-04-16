import React from "react";
import { Card, CardContent, CardMedia, CardActions, Typography, Chip, Button, Box, Avatar, Divider, useTheme, Tooltip, LinearProgress } from "@mui/material";
import {
    CalendarMonth as CalendarIcon,
    Groups as TeamsIcon,
    EmojiEvents as TrophyIcon,
    TrendingUp as ActiveIcon,
    Schedule as UpcomingIcon,
    CheckCircle as CompletedIcon,
    LocationCity as DepartmentIcon
} from "@mui/icons-material";
import WcIcon from "@mui/icons-material/Wc";

const LeagueCard = ({ league, onViewDetails }) => {
    const theme = useTheme();

    const getStatusIcon = () => {
        switch (league.status) {
            case "In Progress":
                return <ActiveIcon fontSize="small" />;
            case "Upcoming":
                return <UpcomingIcon fontSize="small" />;
            case "Completed":
                return <CompletedIcon fontSize="small" />;
            default:
                return null;
        }
    };

    const getStatusColor = () => {
        switch (league.status) {
            case "In Progress":
                return "warning";
            case "Upcoming":
                return "info";
            case "Completed":
                return "success";
            default:
                return "default";
        }
    };

    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        return new Date(dateStr).toISOString().split("T")[0];
    };

    const formatGender = (g) => {
        if (!g) return "Unknown";
        switch (g.toUpperCase()) {
            case "MALE":
                return "Male";
            case "FEMALE":
                return "Female";
            case "MIXED":
                return "Mixed";
            default:
                return g;
        }
    };

    return (
        <Card
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: theme.shadows[8]
                }
            }}
        >
            {/* Banner with league logo overlay */}
            <Box sx={{ position: "relative" }}>
                {league.bannerUrl && (
                    <CardMedia
                        component="img"
                        height="160"
                        image={league.bannerUrl}
                        alt={league.name}
                        sx={{ objectFit: "cover" }}
                    />
                )}
                <Avatar
                    src={league.logoUrl}
                    sx={{
                        position: "absolute",
                        bottom: -24,
                        left: 16,
                        width: 64,
                        height: 64,
                        border: `3px solid ${theme.palette.background.paper}`,
                        bgcolor: theme.palette.primary.light
                    }}
                >
                    {league.name.charAt(0)}
                </Avatar>
            </Box>

            <CardContent sx={{ mt: 3 }}>
                {/* League name and status */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
                        {league.name}
                    </Typography>
                    <Chip
                        icon={getStatusIcon()}
                        label={league.status}
                        color={getStatusColor()}
                        size="small"
                        sx={{ height: 24 }}
                    />
                </Box>

                {/* Department */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                    <DepartmentIcon fontSize="small" color="action" />
                    <Typography variant="body2" color="text.secondary">
                        {league.department}
                    </Typography>
                </Box>

                <Divider sx={{ my: 1.5 }} />

                {/* Date range */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                    <CalendarIcon fontSize="small" color="action" />
                    <Typography variant="body2">
                        {formatDate(league.startDate)} — {formatDate(league.endDate)}
                    </Typography>
                </Box>

                {/* Teams count */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                    <TeamsIcon fontSize="small" color="action" />
                    <Typography variant="body2">
                        {league.teams} teams participating
                    </Typography>
                </Box>

                {/* Gender */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                    <WcIcon fontSize="small" color="action" />
                    <Typography variant="body2">
                        Gender: {formatGender(league.gender)}
                    </Typography>
                </Box>


                {/* Progress indicator for active leagues */}
                {league.status === "In Progress" && league.progress && (
                    <Box sx={{ mt: 2 }}>
                        <Typography variant="caption" display="block" gutterBottom>
                            {league.progress}% completed
                        </Typography>
                        <LinearProgress
                            variant="determinate"
                            value={league.progress}
                            sx={{
                                height: 6,
                                borderRadius: 3,
                                "& .MuiLinearProgress-bar": {
                                    borderRadius: 3
                                }
                            }}
                        />
                    </Box>
                )}

                {/* Champion for completed leagues */}
                {league.status === "Completed" && league.champion && (
                    <Box sx={{ mt: 2, display: "flex", alignItems: "center", gap: 1 }}>
                        <TrophyIcon color="warning" fontSize="small" />
                        <Typography variant="body2">
                            Champion: <strong>{league.champion}</strong>
                        </Typography>
                    </Box>
                )}
            </CardContent>

            {/* Action buttons */}
            <CardActions sx={{ mt: "auto", p: 2 }}>
                <Button
                    variant="contained"
                    size="small"
                    fullWidth
                    sx={{ textTransform: "none", fontWeight: "bold", boxShadow: "none" }}
                    onClick={onViewDetails} 
                >
                    View League
                </Button>

            </CardActions>
        </Card>
    );
};

export default LeagueCard;