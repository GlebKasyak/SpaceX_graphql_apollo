import React, { FC } from "react";
import gql from "graphql-tag";
import cn from "classnames";
import { useQuery } from "react-apollo";
import { Link, RouteComponentProps } from "react-router-dom";

import { LaunchType } from "../interfaces/launch.interface";

const LAUNCH_QUERY = gql`
    query LaunchQuery($flight_number: Int!) {
        launch(flight_number: $flight_number) {
            flight_number
            mission_name
            launch_year
            launch_date_local
            launch_success
            rocket {
                rocket_id
                rocket_name
                rocket_type
            }
        }
    }
`;

type Props = RouteComponentProps<{ id: string }>;

const Launch: FC<Props> = ({ match }) => {
    const { id } = match.params;
    const number = parseInt(id);

    const { loading, data, error } = useQuery<{ launch: LaunchType }, { flight_number: number }>(
        LAUNCH_QUERY,
        { variables: { flight_number: number } }
    );

    if(loading) return <h4>Loading...</h4>;
    if(error) console.log(error);

    const {
        mission_name,
        flight_number,
        launch_date_local,
        launch_success,
        launch_year,
        rocket: {
            rocket_id,
            rocket_name,
            rocket_type
        }
    } = data!.launch;

    return (
        <div>
            <h1 className="display-4 my-3">
                <span className="text-dark" >
                    Mission:
                </span>
                &nbsp;{ mission_name }
            </h1>
            <h4 className="mb-3" >Launch Details</h4>
            <ul className="list-group">
                <li className="list-group-item">
                    Flight Number: { flight_number }
                </li>
                <li className="list-group-item">
                    Launch Year: { launch_year }
                </li>
                <li className="list-group-item">
                    Launch Successful:&nbsp;
                    <span
                        className={ cn({
                            "text-success": launch_success,
                            "text-danger": !launch_success
                        }) }
                    >
                        { launch_success ? "Yes" : "No" }
                    </span>
                </li>
            </ul>
            <h4 className="my-3" >Rocket Details</h4>
            <ul className="list-group">
                <li className="list-group-item">Rocket ID: { rocket_id }</li>
                <li className="list-group-item">Rocket Name: { rocket_name }</li>
                <li className="list-group-item">Rocket Type: { rocket_type }</li>
            </ul>
            <hr/>
            <Link to="/" className="btn btn-secondary" >Back</Link>
        </div>
    );
};

export default Launch;