import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Tabuada from './components/CalcTab.js';
import Todo from './components/Todo.js';

export default function Routes(){
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Tabuada}/>
                <Route path="/todo" component={Todo}/>
            </Switch>
        </BrowserRouter>
    )
}   