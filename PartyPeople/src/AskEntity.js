import React, { useState, makeStyle, useLayoutEffect, useEffect } from 'react';
import { Grid, Paper, makeStyles } from '@material-ui/core';
import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';

const greenTheme = createMuiTheme({
    palette: {
        primary: green,
    },
});

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.primary,
    },
    score: {},
}));

export default function AskEntity(props) {
    const classes = useStyles(greenTheme);
    const [isInit, setInit] = useState(false);
    if (!isInit) setInit(true);

    const askCancel = () => {
        let reqJson = {
            socketID: props.socket.id,
            roomID: props.roomID,
            reqPrice: props.price,
            reqVol: props.vol,
        };

        props.socket.emit('cancelAsk_Req', reqJson);
    };
    return (
        <Grid
            wrap="wrap"
            container
            direction="column"
            justify="center"
            alignItems="stretch"
            spacing={2}
        >
            <Paper
                style={{ height: '4vh' }}
                className={classes.paper}
                onClick={askCancel}
            >
                <Grid container direction="row" alignItems="center">
                    <Grid
                        style={{ width: '20%', height: '4vh' }}
                        className="price"
                    >
                        <span style={{ fontStyle: 'italic' }}>
                            [{props.index}]
                        </span>
                    </Grid>
                    <Grid
                        style={{ width: '40%', height: '4vh' }}
                        className="price"
                    >
                        {props.price}
                    </Grid>
                    <Grid
                        style={{ width: '40%', height: '4vh' }}
                        className="vol"
                    >
                        {props.vol}
                    </Grid>
                </Grid>
            </Paper>
        </Grid>
    );
}
