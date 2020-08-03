import React from 'react';
import { Route } from "react-router-dom";

import { Launches, Launch } from "./components";

import "./assets/styles/app.scss";
import logo from "./assets/images/spacex-logo.jpg";

const App = () => (
    <div className="app">
        <div className="container">
            <img src={ logo } alt="SpaceX" className="app__logo" />
            <Route exact path="/" component={ Launches } />
            <Route exact path="/launch/:id" component={ Launch } />
        </div>
    </div>
)

export default App;
