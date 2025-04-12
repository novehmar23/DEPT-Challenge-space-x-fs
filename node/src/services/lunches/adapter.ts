import { Launch, Rocket } from "../../types/launch";
import { NOT_PROVIDED_STRING, NOT_PROVIDED_NUMBER } from "../constants";

export const adaptLaunchData = (
  launch: Launch,
  rocket: Rocket | undefined
): Launch => {
  return {
    flight_number: launch.flight_number,
    mission_name: launch.mission_name,
    mission_patch: launch.mission_patch,
    details: launch.details,
    rocket: {
      rocket_id: rocket?.rocket_id,
      rocket_name: rocket?.rocket_name,
      active: rocket?.active || false,
      cost_per_launch: rocket?.cost_per_launch ?? NOT_PROVIDED_NUMBER,
      company: rocket?.company || NOT_PROVIDED_STRING,
    },
  };
};
