import axios from "axios";
import { SpaceXLaunch, SpaceXRocket } from "../../types/spacex";
import { adaptLaunch, adaptRocket } from "./adapter";
import { Launch, Rocket } from "../../types/launch";

const fetchData = async (url) => {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const fetchLaunches = async (): Promise<Launch[]> => {
  const launches: SpaceXLaunch[] = await fetchData(
    `${process.env.SPACEX_API_URL}/launches`
  );
  return launches.map(adaptLaunch);
};

export const fetchRockets = async (): Promise<Rocket[]> => {
  const rockets: SpaceXRocket[] = await fetchData(
    `${process.env.SPACEX_API_URL}/rockets`
  );
  return rockets.map(adaptRocket);
};
