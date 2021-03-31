import React, { useState, useRef, useEffect } from 'react';
import {
    Button,
    Fab,
    Grid,
    Paper,
    makeStyles,
    TextField,
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import { propTypes } from 'react-bootstrap/esm/Image';
import Logo from './images/Logo.png';
import {PurpleButton} from './PurpleComponent';
const useStyles = makeStyles((theme) => ({
    input: {
        color: "white",
    },
}));
function SetPlayerName(props) {
    // const socket = io();
    // const [name, setName] = React.useState('');
    const classes = useStyles();
    const params = window.location
        .toString()
        .substring(window.location.toString().indexOf('?'));
    const searchParams = new URLSearchParams(params);
    const [tmp, setTemp] = React.useState('');

    // const nameInput = useRef();
    // useEffect(()=>{
    //     nameInput.current.focus();
    // });

    const onKeyPress = (e) => {
        if (e.key == 'Enter') {
            handleOnSave(e);
        }
    };

    const handleChange = (event) => {
        setTemp(event.target.value);
    };

    const handleOnSave = (event) => {
        if (tmp != '') {
            event.preventDefault();
            props.onSave(tmp);
        }
    };
    let buttonMsg = 'Create Private Room';
    if (searchParams.has('id')) {
        // 초대링크 받아서 온 사람
        buttonMsg = 'Join Room';
    } else {
        buttonMsg = 'Create Private Room';
    }
    return (
        <>
            <Grid
                container
                justify={'center'}
                alignItems={'center'}
                // spacing={2}
                direction="column"
                style={{ width: '100%', height: '100vh' }}
            >
                <Grid>
                    <img src={Logo} />
                </Grid>
                <Grid  style={{margin:'4vh' }} item>
                    <TextField
                        id="form-control text-center fw-bold bg-transparent"
                        label="인게임 닉네임 (8자 제한)"
                        inputRef={props.textInput}
                        onChange={handleChange}
                        variant="outlined"
                        size="medium"
                        InputProps={{
                            className: classes.input,
                        }}
                        InputLabelProps={{
                            style: { color: '#fff' },
                        }}
                        // ref={nameInput}
                        autoFocus
                        onKeyPress={onKeyPress}
                        inputProps={{ 'maxLength': 8 }}
                    />
                </Grid>

                <Grid item>
                    <PurpleButton
                        variant="contained"
                        color="primary"
                        onClick={handleOnSave}
                        style={{width:'50vh', height:"7vh"}}
                    >
                        {buttonMsg}
                    </PurpleButton>
                </Grid>
            </Grid>
        </>
    );
}
export default withRouter(SetPlayerName);
