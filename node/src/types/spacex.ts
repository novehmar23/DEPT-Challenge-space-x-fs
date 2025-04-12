export interface SpaceXLaunchLinks {
  mission_patch?: string;
}

export interface SpaceXLaunchRocket {
  rocket_id: string;
  rocket_name: string;
}

export interface SpaceXLaunch {
  flight_number: number;
  mission_name: string;
  rocket: SpaceXLaunchRocket;
  links?: SpaceXLaunchLinks;
  details?: string;
}

export interface SpaceXRocket {
  rocket_id: string;
  rocket_name: string;
  active: boolean;
  cost_per_launch: number;
  company: string;
}
