import React from 'react';
import { render } from 'react-dom';
import { socket } from 'socket.io-client';
import StockChart from './StockChart';
import ChartTitle from './ChartTitle';
import { getData } from "./utils"
import { tsvParse, csvParse } from  "d3-dsv";
import { timeParse } from "d3-time-format";

class ChartComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data : [
                {
                    "date": new Date(2010, 1, 1),
                    "open": 25.436282332605284,
                    "high": 25.835021381744056,
                    "low": 25.411360259406774,
                    "close": 25.71041,
                    "volume": 8370500,
                    "split": "",
                    "dividend": "",
                    "absoluteChange": "",
                    "percentChange": ""
                },                
                {
                    "date": new Date(2010, 1, 1,), //@ 분 초 단위로.
                    "open": 25.436282332605284,
                    "high": 25.835021381744056,
                    "low": 25.411360259406774,
                    "close": 25.71041,
                    "volume": 8370500,
                    "split": "",
                    "dividend": "",
                    "absoluteChange": "",
                    "percentChange": ""
                }
            ]
        };
    }
    componentDidUpdate() {
        console.log('[ componentDidUpdate ]');
    }
    componentWillMount() {
        console.log('[ componentWillMount ]', this.props.socket);
        if(this.props.socket === null) {
            console.log("socket is null")
            this.props.requestSocket('ChartComponent');
        }
    }
	componentDidMount() {
        //@ 소켓 통신 대기
        console.log('[ componentDidMount ]', this.props.socket);
        
        
    }
    setup = true;
    day = 0;
    addCandleData = data => {
        data.date = new Date(data.date);
        this.setState({data : [...this.state.data, data]});
        // console.log(this.state.datas);
        // getData(this.state.datas).then(data => {
            // })
        }
        render() {
            if(this.setup){
                console.log('setup print');
                //@ candle data callback
                if(this.props.socket == null) {
                    console.log("socket is null")
                    this.props.requestSocket('ChartComponent');
                }
                if(this.props.requestSocket == null) {
                    console.log("requestSocket is null")
                    this.props.requestSocket('ChartComponent');
                }
                else if(this.props.socket != null) {
                    // console.log('EMIT');
                    // const chart = () => {
                    //     this.props.socket.emit('chart', null);
                    //     console.log(('request Data from CLIENT.'))
                    // }
                    // setInterval(chart, 200);
                    
                    this.props.socket.on('chart', (data)=>{
                        console.log('receieved Datas from SERVER.', this.day++);
                        this.addCandleData(data);
                    });
                    this.setup = false;
                }
            }
        console.log('[ render() ]')

        if (this.props.socket == null) {
            return <div>Loading...</div>
		}
		return (
            <>
                <ChartTitle currentPrice={this.state.data.high}/>
                <StockChart type={'hybrid'} data={this.state.data} />
            </>
		)
	}
}

export default ChartComponent;