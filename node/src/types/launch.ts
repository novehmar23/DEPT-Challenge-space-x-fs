export interface Rocket {
  rocket_id: string;
  rocket_name: string;
  active: boolean;
  cost_per_launch: number;
  company: string;
}

export interface Launch {
  flight_number: number;
  mission_name: string;
  mission_patch: string;
  launch_date_unix: number;
  details: string;
  rocket: Rocket;
  favorite?: boolean;
}
