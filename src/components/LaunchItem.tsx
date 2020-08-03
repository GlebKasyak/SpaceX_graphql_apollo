import React, { FC } from "react";
import cn from "classnames";
import Moment from "react-moment";
import { Link } from "react-router-dom";

import { LaunchItemType } from "../interfaces/launch.interface";

type Props = {
    launch: LaunchItemType
};

const LaunchItem: FC<Props> = (
    {
        launch: {
            flight_number,
            launch_date_local,
            launch_success,
            launch_year,
            mission_name
        }
    }) => (
    <div className="card card-body mb-3" >
        <div className="row">
            <div className="col-md-9">
                <h4>Mission:&nbsp;
                    <span className={ cn({
                        "text-success": launch_success,
                        "text-danger": !launch_success
                    }) }>
                        { mission_name }
                        </span>
                </h4>
                <p>Date: <Moment format="YYYY-MM-DD HH:mm" >{ launch_date_local }</Moment></p>
            </div>
            <div className="col-md-3">
                <Link className="btn btn-secondary" to={`/launch/${ flight_number }`} >Launch Details</Link>
            </div>
        </div>
    </div>
);

export default LaunchItem;