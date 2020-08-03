
export type LaunchItemType = {
    flight_number: number,
    mission_name: string,
    launch_year: string,
    launch_date_local: string,
    launch_success: boolean
};

type RocketType = {
    rocket_id: string,
    rocket_name: string,
    rocket_type: string,
};

export type LaunchType = LaunchItemType & { rocket: RocketType };

