import React from 'react'
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";

import App from './App'
import Home from './home';

function Base() {
    return (
        <div>
            <Router>
                <Switch>
                    <Route exact path="/:id">
                        <App />
                    </Route>
                    <Route exact path="/" >
                        <App />
                    </Route>

                </Switch>
            </Router>
            
        </div>
    )
}

export default Base
