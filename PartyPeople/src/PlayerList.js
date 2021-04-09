import React, { useState, makeStyle, useLayoutEffect, useEffect } from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import {
    IconButton,
    Button,
    Box,
    TextField,
    GridList,
    Grid,
    Paper,
    makeStyles,
} from '@material-ui/core';
import { blue } from '@material-ui/core/colors';
import Timer from './Timer';

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
        // padding: theme.spacing(1),
        textAlign: 'left',
        color: '#CDD7E0',
        backgroundColor: '#0C151C',
    },
    score: {},
}));

function MakePlayerPaper(props) {
    const classes = useStyles(greenTheme);

    return (
        <Paper style={{ height: '9.8vh' }} className={classes.paper}>
            <Grid container direction="row" alignItems="center">
                <Grid style={{ width: '20%', height: '5vh' }} className="score">
                    {props.index}
                </Grid>
                <Grid>
                    <Grid container direction="col" className="score">
                        <Grid>{props.player.playerID}</Grid>
                    </Grid>
                    <Grid container direction="col" className="score">
                        <Grid>{props.player.asset}</Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
    );
}

export default function PlayerList(props) {
    const classes = useStyles(greenTheme);
    const testXs = 12;
    const [players, setPlayers] = useState([
        {
            socketID: 'socketID',
            playerID: 'playerID',
            asset: 'asset',
        },
    ]);
    const [isInit, setInit] = useState(false);
    if (!isInit) setInit(true);

    useLayoutEffect(() => {
        if (props.socket == null) {
            // props.requestSocket('MakePlayerPaper', props.socket);
            // setInit(true);
        } else {
            props.socket.on('roomRank', (playerArray) => {
                setPlayers(playerArray);
            });
        }
    }, [isInit]);

    function ExpBySymbol(value) {
        let ret = value;
        let length = ret.length;
        let isPlus = true;
        if (ret.charAt() === '-') {
            ret = ret.substring(1, length);
            length -= 1;
            isPlus = false;
        }
        let color = isPlus ? '#e53935' : '#1e88e5';
        let ans = '';
        if (length >= 9) {
            // 199489230 -> 1억 9948만 9230
            ans += ret.substring(0, ret.length - 9 + 1) + '억 '; // 1억
            ret = ret.substring(ret.length - 9 + 1);
        }
        if (length >= 5) {
            // value 99489230
            ans += ret.substring(0, ret.length - 5 + 1) + '만 '; // 9948만
            ret = ret.substring(ret.length - 5 + 1);
        }
        ans += ret;
        let minus = isPlus ? '+' : '-';
        ans = minus + ans;
        return <span style={{ color: color }}>{ans}</span>;
    }

    const parseWonToStr = (won) => {
        if (typeof won == 'number') {
            won = won - 100000000;
            won = won.toString();
        }
        return won;
    };

    let defaultPage = {
        playerID: '',
        asset: '',
    };
    const [myRankPage, setMyRankPage] = useState(defaultPage);
    const [myRank, setMyRank] = useState(null);
    function MyRank() {
        props.socket.once('MyRank', (myRankPage, myRank) => {
            setMyRankPage(myRankPage);
            setMyRank(myRank);
        });
        return (
            <div>
                <Paper
                    className={classes.paper}
                    style={{
                        height: '90%',
                        border: 'solid',
                        borderColor: '#2D4053',
                        margin: '0 0 10px 0',
                        padding: '2%',
                        // boxShadow: '12px 12px 2px 1px #ffffff',
                    }}
                >
                    <Grid container direction="row" alignItems="center">
                        <Grid
                            style={{
                                fontSize: '1vw',
                                width: '30%',
                                height: '100%',
                                padding: '2%',
                            }}
                            className="score"
                            item
                        >
                            <span style={{ fontSize: '1.5vw' }}>{myRank}</span>
                            {'위'}
                        </Grid>
                        <Grid
                            item
                            style={{
                                fontSize: '1vw',
                                width: '70%',
                                height: '100%',
                                padding: '2%',
                            }}
                            container
                            direction="column"
                            className="score"
                        >
                            <Grid alignItems="right" style={{ padding: '2%' }}>
                                {myRankPage.playerID}
                            </Grid>
                            <Grid alignItems="right" style={{ padding: '2%' }}>
                                {ExpBySymbol(parseWonToStr(myRankPage.asset))}
                                {/* {myRankPage.asset} */}
                                {' 원'}
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </div>
        );
    }

    return (
        <>
            <Grid>
                {props.isStart && (
                    <Timer
                        socket={props.socket}
                        gameTime={props.roomInfo['gameTime']}
                    />
                )}
            </Grid>
            {MyRank()}
            <Grid
                wrap="wrap"
                container
                direction="column"
                justify="flex-start"
                alignItems="stretch"
                spacing={1}
            >
                {players.map((player, index) => {
                    const myColor =
                        player.socketID === props.socket.id
                            ? '#2D4053'
                            : '#0C151C';
                    const myFont =
                        player.socketID === props.socket.id ? 'bold' : 'normal';
                    return (
                        <Grid item>
                            <Paper
                                style={{
                                    backgroundColor: myColor,
                                    fontWeight: myFont,
                                    padding: '1vh 1vw',
                                    margin: '3% 0 3% 0%',
                                }}
                                className={classes.paper}
                                align="center"
                            >
                                <Grid
                                    container
                                    direction="row"
                                    alignItems="center"
                                >
                                    <Grid
                                        style={{
                                            fontSize: '1vw',
                                            width: '30%',
                                            height: '100%',
                                            padding: '2%',
                                        }}
                                        className="score"
                                    >
                                        <span style={{ fontSize: '1.5vw' }}>
                                            {index + 1}
                                        </span>
                                        {'위'}
                                    </Grid>
                                    <Grid
                                        style={{
                                            fontSize: '1vw',
                                            width: '70%',
                                            height: '100%',
                                        }}
                                        container
                                        direction="column"
                                        className="score"
                                    >
                                        <Grid
                                            alignItems="right"
                                            style={{ padding: '2%' }}
                                        >
                                            {player.playerID}
                                        </Grid>
                                        <Grid
                                            alignItems="right"
                                            style={{ padding: '2%' }}
                                        >
                                            {ExpBySymbol(
                                                parseWonToStr(player.asset)
                                            )}{' '}
                                            원
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    );
                })}
            </Grid>
        </>
    );
}
