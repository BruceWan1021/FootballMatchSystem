import StarIcon from "@mui/icons-material/Star";
import SportsIcon from "@mui/icons-material/SportsSoccer";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";

export const formatRole = (role) => role ? role.charAt(0).toUpperCase() + role.slice(1).toLowerCase() : "";

export const roleColors = {
  captain: "warning",
  player: "primary",
  coach: "success",
  manager: "info",
  default: "secondary"
};

export const roleIcons = {
  captain: <StarIcon fontSize="small" />,
  player: <SportsIcon fontSize="small" />,
  coach: <PersonIcon fontSize="small" />,
  manager: <GroupsIcon fontSize="small" />,
  default: <PersonIcon fontSize="small" />
};

export const getRoleColor = (role) => roleColors[role] || roleColors.default;
export const getRoleIcon = (role) => roleIcons[role] || roleIcons.default;