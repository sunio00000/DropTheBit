
import React, {Component} from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LayoutGrid from './LayoutGrid';
import EnterRoom from './EnterRoom';
import Lobby from './Lobby';

export default function Routes(props) {
    
    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/" render={() => <EnterRoom socket={props.socket} requestSocket={props.requestSocket} SetRoomIdAndInfo={props.SetRoomIdAndInfo}/>}/>
                    {/* <Route path="/lobby" render={() => <Lobby socket={props.socket} requestSocket={props.requestSocket}/>}/> */}
                    <Route path="/game" render={() => <LayoutGrid socket={props.socket} requestSocket={props.requestSocket}/>} roomId={props.roomId} roomInfo={props.roomInfo}/>
                </Switch>
            </Router>
        </>
    );

}

