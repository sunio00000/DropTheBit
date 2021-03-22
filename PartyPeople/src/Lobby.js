import React, {Component} from 'react';
import { Button, TextField, Fab, Grid, Paper, makeStyles } from '@material-ui/core';
import {withRouter} from 'react-router-dom';

function Lobby(props) {

    const putPlayer = (player) => {
        return(
            <Paper>
                {player.playerID}
                {player.cash}
                {player.asset}
            </Paper>
        );
    }
    const MakeURL = (props) => {
        document.querySelector('#gameLink').value = `${window.location.protocol}//${window.location.host}/?id=${props.roomId}`;
        putPlayer(props.player); // playerInfo
    }

    return(
        <> 
        <Button variant="contained" color="primary" onClick={()=>props.history.push('/game')}> StartGame </Button> 
        <Paper>{props.name}</Paper>
        <Grid>
            <TextField type="text" id="gameLink" onChange={handleChange} class="form-control text-center fw-bold bg-white"
                    value="" readonly />
            <Button class="btn btn-warning" type="button" id="copy">Copy Link</Button>
            <putPlayer/>
        </Grid>
        </>
    );
}

export default withRouter(Lobby);