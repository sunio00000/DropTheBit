import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import GameManager from './GameManager';
import LoadingScreen from './LoadingScreen';
import Counter from './components/Counter';

import { createStore } from 'redux';
import reducers from './reducers';
import { Provider } from 'react-redux';
import CounterContainer from './containers/CounterContainer';

const store = createStore(reducers);

ReactDOM.render(
    <div className='GameManager'>
        <div className='main'>
            <Provider store = {store}>
             <CounterContainer/>
            </Provider>
        </div>
    </div>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
