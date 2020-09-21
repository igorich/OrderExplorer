import * as React from 'react';
import './App.css';
import OrderTable from './components/orderTable';
// import { Route, Router, Switch } from 'react-router-dom';
import 'antd/dist/antd.css';
// import history from './history';

import logo from './logo.svg';

class App extends React.Component {
    public render() {
        return (
            <OrderTable/>
        );
    }
}

export default App;
