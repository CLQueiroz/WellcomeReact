import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Tabuada from './components/Tabuada';
import Todo from './components/Todo';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Tabuada} />
                <Route path="/todo" component={Todo} />
            </Switch>
        </BrowserRouter>
    )
}   