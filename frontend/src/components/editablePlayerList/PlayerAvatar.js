import { Avatar, Badge, Tooltip } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { getRoleIcon } from "./roleUtils";

export const PlayerAvatar = ({ role, size = 'medium' }) => {
  const sizes = {
    small: { width: 40, height: 40, icon: 'small' },
    medium: { width: 56, height: 56, icon: 'medium' },
    large: { width: 72, height: 72, icon: 'large' }
  };

  return (
    <Badge
      overlap="circular"
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      badgeContent={getRoleIcon(role)}
    >
      <Avatar sx={{ 
        bgcolor: 'primary.main', 
        width: sizes[size].width,
        height: sizes[size].height
      }}>
        <PersonIcon fontSize={sizes[size].icon} />
      </Avatar>
    </Badge>
  );
};