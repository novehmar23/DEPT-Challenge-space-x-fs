/* eslint-disable camelcase */
import { getUserFavorites } from "../favorites";
import { adaptLaunchData } from "./adapter";
import { Launch, Rocket } from "../../types/launch";
import { Favorites } from "../../entities/favorites";

export const processLaunches = async (
  userId: string,
  launches: Launch[],
  rockets: Rocket[]
): Promise<Launch[]> => {
  const userFavorites: Favorites[] = await getUserFavorites(userId);

  return launches.map((launch: Launch) => {
    const rocket = rockets.find(
      (rocket: Rocket) => rocket.rocket_id === launch.rocket?.rocket_id
    );

    return adaptLaunchData(launch, userFavorites, rocket);
  });
};
