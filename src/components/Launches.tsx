import React from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

import LaunchItem from "./LaunchItem";
import MissionKey from "./MissionKey";

import { LaunchItemType } from "../interfaces/launch.interface";

const LAUNCHES_QUERY = gql`
    query LaunchesQuery {
        launches {
            flight_number
            mission_name
            launch_year
            launch_date_local
            launch_success
        }
    }
`;

interface Data {
    launches: Array<LaunchItemType>
};

const Launches = () => (
    <>
        <h1 className="display-4 my-3" >Launches</h1>
        <MissionKey />
        <Query<Data> query={ LAUNCHES_QUERY } >
            {
                ({ loading, error, data }) => {
                    if(loading) return <h4>Loading...</h4>;
                    if(error) console.log(error);

                    return (
                        <>
                            { data && data.launches.map(launch =>
                                <LaunchItem
                                    launch={ launch }
                                    key={ launch.flight_number }
                                />
                            ) }
                        </>
                    )
                }
            }
        </Query>
    </>
);

export default Launches;