import Team from "../models/Team";

export const findTeams = async () => Team.findAll();
