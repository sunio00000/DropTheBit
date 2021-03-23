import socketio from 'socket.io';

import Room from './gameDJ/room.js';
import Game from './gameDJ/game.js';
import Disconnect from './gameDJ/disconnect.js';
import Test from './gameDJ/testfile.js';
import Refresh from './gameDJ/refresh.js';

import { dbset, dbget } from './gameDJ/redis.js';

export default {
    init(server) {
        const io = socketio(server);
        let day = 0;

        // db setting ------------------------------------- >>
        let bidDummy = {
            0: {
                dummyID: 'dummyRoom',
            },
        };
        let askDummy = {
            10000000000: {
                dummyID: 'dummyRoom',
            },
        };
        dbset('bidList', JSON.stringify(bidDummy));
        dbset('askList', JSON.stringify(askDummy));
        // db setting  ------------------------------------ <<

        // curPrice refresh --------------------------------- >>
        const gamePlay = function () {
            return Promise(function (resolve, reject) {
                let schedule = setInterval(() => {
                    new Refresh.renewalCurCoin();
                    // sendRoomInfo(roomID);
                }, 1000);
            });
        };
        gamePlay();
        // curPrice refresh --------------------------------- <<

        io.on('connection', (socket) => {
            console.log('connected');

            // test event ------------------------------------------ >>
            const chart = async () => {
                // await new Test(io, socket).testSendChart(day++);
                await new Game(io, socket).renewalCurCoin();
            };
            setInterval(chart, 2000);

            socket.on('testComment', (comment) => {
                new Test(io, socket).testComment(comment);
            });

            socket.on('testBuy', async (data) => {
                await new Test(io, socket).testBuy(data);
                console.log(data);
            });

            socket.on('testSell', async (data) => {
                await new Test(io, socket).testSell(data);
                console.log(data);
            });
            // test event << ------------------------------------------

            /////////////////////////////////////////
            console.log('connected user');
            socket.on('createPrivateRoom_Req', (playerID) => {
                console.log('playerId : ' + playerID);
                new Room(io, socket).createPrivateRoom(playerID);
            });

            // data : {roomID : roomID, playerID : name}
            socket.on('joinRoom_Req', async (data) => {
                await new Room(io, socket).joinRoom(data);
            });
            // 클라에서 뮤직 셀렉트할때 socket.emit('settingsUpdate_Req')  발생함
            socket.on('settingsUpdate_Req', (music_name) =>
                new Room(io, socket).updateSettings(music_name)
            );
            socket.on(
                'startGame_Req',
                async () => await new Game(io, socket).startGame()
            );
            socket.on('disconnect', () =>
                new Disconnect(io, socket).onDisconnect()
            );
            // room event << -----------------------------------------

            // In-game event ------------------------------------------ >>
            socket.on(
                'buy_Req',
                async (reqJson) => await new Game(io, socket).buy(reqJson)
            );
            socket.on(
                'sell_Req',
                async (reqJson) => await new Game(io, socket).sell(reqJson)
            );
            socket.on(
                'bidCancle_Req',
                async (reqJson) => await new Game(io, socket).bidCancle(reqJson)
            );
            socket.on(
                'askCancle_Req',
                async (reqJson) => await new Game(io, socket).askCancle(reqJson)
            );
            // In-game event << -----------------------------------------
        });
    },
};
