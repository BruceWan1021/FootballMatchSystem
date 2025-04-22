import React from "react";
import TeamForm from "../teamForm"; 
const TeamInfoEditor = ({ team, onUpdated }) => {
  return (
    <TeamForm
      team={team}
      onSuccess={onUpdated}
    />
  );
};

export default TeamInfoEditor;
