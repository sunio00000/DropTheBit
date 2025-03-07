// import React, { useState, makeStyle, useLayoutEffect, useEffect } from 'react';
// import { createMuiTheme } from '@material-ui/core/styles';
// import green from '@material-ui/core/colors/green';
// import {
//     IconButton,
//     Button,
//     Box,
//     TextField,
//     Grid,
//     GridList,
//     Paper,
//     makeStyles,
//     TableBody,
// } from '@material-ui/core';
// import Table from '@material-ui/core/Table';
// import TableCell from '@material-ui/core/TableCell';
// import TableContainer from '@material-ui/core/TableContainer';
// import TableHead from '@material-ui/core/TableHead';
// import TableRow from '@material-ui/core/TableRow';
// import AskEntity from './AskEntity';

// const greenTheme = createMuiTheme({
//     palette: {
//         primary: green,
//     },
// });

// const useStyles = makeStyles((theme) => ({
//     root: {
//         flexGrow: 1,
//     },
//     paper: {
//         color: '#0033dd',
//         textAlign: 'center',
//     },
//     score: {},
//     table: {
//         spacing: 1,
//     },
// }));

// // function MakeTableEntity(props) {
// //     const classes = useStyles(greenTheme);

// //     return (
// //         <Paper style={{ height: '9.8vh' }} className={classes.paper}>
// //             <Grid container direction="row" alignItems="center">
// //                 <Grid style={{ width: '50%', height: '5vh' }} className="price">
// //                     {props.price}
// //                 </Grid>
// //                 <Grid style={{ width: '50%', height: '5vh' }} className="vol">
// //                     {props.vol}
// //                 </Grid>
// //             </Grid>
// //         </Paper>
// //     );
// // }

// export default function AskTable(props) {
//     const classes = useStyles(greenTheme);
//     const testXs = 12;
//     const [AskTable, setTable] = useState([]);
//     const [isInit, setInit] = useState(false);
//     if (!isInit) setInit(true);

//     useLayoutEffect(() => {
//         let reqJson = {
//             socketID: props.socket.id,
//             roomID: props.roomID,
//         };
//         props.socket.emit('askTable_Req', reqJson);

//         if (props.socket == null) {
//             // props.requestSocket('makeTableEntity', props.socket);
//             // setInit(true);
//         } else {
//             props.socket.on('askTable_Res', (askTable) => {
//                 setTable(askTable);
//             });
//         }
//     }, [isInit]);

//     function CancelAsk(num, table) {
//         let reqJson = {
//             socketID: props.socket.id,
//             roomID: props.roomID,
//             reqPrice: table[num]['price'],
//             reqVol: table[num]['vol'],
//         };
//         props.socket.emit('cancelAsk_Req', reqJson);
//     }

//     function HandleKeyUp(e, AskTable) {
//         if (props.inputCtrl) return;
//         if (e.keyCode === 123 || e.keyCode === 27 || e.keyCode === 13) return; //_ 'F12' || 'esc' || 'enter'
//         e.preventDefault();

//         if (e.keyCode === 49 && AskTable.length >= 1) {
//             //_ 1
//             new Audio(Cancel1).play();
//             CancelAsk(0, AskTable);
//         } else if (e.keyCode === 50 && AskTable.length >= 2) {
//             //_ 2
//             new Audio(Cancel2).play();
//             CancelAsk(1, AskTable);
//         } else if (e.keyCode === 51 && AskTable.length >= 3) {
//             //_ 3
//             new Audio(Cancel3).play();
//             CancelAsk(2, AskTable);
//         }
//         // else if (e.keyCode === 52 && AskTable.length >= 4) {
//         //     //_ 4
//         //     new Audio(Cancel4).play();
//         //     CancelAsk(3, AskTable);
//         // } else if (e.keyCode === 53 && AskTable.length >= 5) {
//         //     //_ 5
//         //     new Audio(Cancel5).play();
//         //     CancelAsk(4, AskTable);
//         // } else if (e.keyCode === 54 && AskTable.length >= 6) {
//         //     //_ 6
//         //     new Audio(Cancel6).play();
//         //     CancelAsk(5, AskTable);
//         // } else if (e.keyCode === 55 && AskTable.length >= 7) {
//         //     //_ 7
//         //     new Audio(Cancel7).play();
//         //     CancelAsk(6, AskTable);
//         // } else if (e.keyCode === 56 && AskTable.length >= 8) {
//         //     //_ 8
//         //     new Audio(Cancel8).play();
//         //     CancelAsk(7, AskTable);
//         // }
//     }

//     useEffect(() => {
//         const CancelAskByKey = (e) => {
//             HandleKeyUp(e, AskTable);
//         };
//         document.addEventListener('keyup', CancelAskByKey);
//         return () => {
//             document.removeEventListener('keyup', CancelAskByKey);
//         };
//     });

//     return (
//         <Grid
//             wrap="wrap"
//             container
//             direction="column"
//             justify="flex-start"
//             alignItems="stretch"
//             style={{
//                 height: '50%',
//             }}
//         >
//             <TableContainer>
//                 <Table
//                     stickyHeader
//                     style={{}}
//                     className={classes.table}
//                     size="small"
//                     aria-label="a dense table"
//                 >
//                     <TableHead>
//                         <TableRow>
//                             <TableCell
//                                 style={{
//                                     backgroundColor: '#0C151C',
//                                     align: 'center',
//                                     minWidth: '20%',
//                                 }}
//                             >
//                                 <span
//                                     style={{
//                                         color: 'white',
//                                         fontWeight: 'bold',
//                                         fontSize: '1vw',
//                                         fontFamily: 'NEXON Lv1 Gothic OTF',
//                                     }}
//                                 >
//                                     취소버튼
//                                 </span>
//                             </TableCell>
//                             <TableCell
//                                 style={{
//                                     backgroundColor: '#0C151C',
//                                     align: 'center',
//                                     minWidth: '20%',
//                                 }}
//                             >
//                                 <span
//                                     style={{
//                                         color: 'white',
//                                         fontWeight: 'bold',
//                                         fontSize: '1vw',
//                                         fontFamily: 'NEXON Lv1 Gothic OTF',
//                                     }}
//                                 >
//                                     매도 가격
//                                 </span>
//                             </TableCell>
//                             <TableCell
//                                 style={{
//                                     backgroundColor: '#0C151C',
//                                     align: 'center',
//                                     minWidth: '20%',
//                                 }}
//                             >
//                                 <span
//                                     style={{
//                                         color: 'white',
//                                         fontWeight: 'bold',
//                                         fontSize: '1vw',
//                                         fontFamily: 'NEXON Lv1 Gothic OTF',
//                                     }}
//                                 >
//                                     매도 수량
//                                 </span>
//                             </TableCell>
//                         </TableRow>
//                     </TableHead>
//                 </Table>
//             </TableContainer>
//             <GridList style={{ width: '100%', height: '80%' }}>
//                 {AskTable.map((askElem, index, AskTable) => {
//                     return (
//                         <AskEntity
//                             price={askElem.price}
//                             vol={askElem.vol}
//                             index={index < 3 ? index + 1 : '?'}
//                             socket={props.socket}
//                             requestSocket={props.requestSocket}
//                             roomID={props.roomID}
//                         />
//                     );
//                 })}
//             </GridList>
//         </Grid>
//     );
// }
