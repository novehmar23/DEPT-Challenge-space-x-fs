import { Launch, Rocket } from "../../types/launch";
import { SpaceXLaunch, SpaceXRocket } from "../../types/spacex";
import { NOT_PROVIDED_STRING, NOT_PROVIDED_NUMBER } from "../constants";

export const adaptLaunch = (launch: SpaceXLaunch): Launch => ({
  flight_number: launch.flight_number ?? NOT_PROVIDED_NUMBER,
  mission_name: launch.mission_name || NOT_PROVIDED_STRING,
  mission_patch: launch.links?.mission_patch || NOT_PROVIDED_STRING,
  launch_date_unix: launch.launch_date_unix ?? NOT_PROVIDED_NUMBER,
  details: launch.details || NOT_PROVIDED_STRING,
  rocket: {
    rocket_id: launch.rocket?.rocket_id || NOT_PROVIDED_STRING,
    rocket_name: launch.rocket?.rocket_name || NOT_PROVIDED_STRING,
    active: false,
    cost_per_launch: NOT_PROVIDED_NUMBER,
    company: NOT_PROVIDED_STRING,
  },
  favorite: false,
});

export const adaptRocket = (rocket: SpaceXRocket): Rocket => ({
  rocket_id: rocket.rocket_id || NOT_PROVIDED_STRING,
  rocket_name: rocket.rocket_name || NOT_PROVIDED_STRING,
  active: rocket.active || false,
  cost_per_launch: rocket.cost_per_launch ?? NOT_PROVIDED_NUMBER,
  company: rocket.company || NOT_PROVIDED_STRING,
});
