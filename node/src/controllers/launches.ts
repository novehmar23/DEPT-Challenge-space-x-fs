import { fetchLaunches, fetchRockets } from "../services/spacex/spacex";
import { processLaunches } from "../services/lunches/launches";
import { Launch, Rocket } from "../types/launch";

export const getLaunches = async (req, res) => {
  const userId = req.currentUserId;
  const [launches, rockets]: [Launch[], Rocket[]] = await Promise.all([
    fetchLaunches(),
    fetchRockets(),
  ]);
  const outputLaunches = await processLaunches(userId, launches, rockets);

  return res.status(200).json(outputLaunches);
};
