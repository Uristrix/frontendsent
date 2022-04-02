import React from 'react';
import ReactDOM from 'react-dom';

import {observer} from "mobx-react-lite";
import appStore from "./store/appStore";

import Table from "./components/table";
import Form from "./components/form";
import "./style/style.css"


const App = observer(() =>
{
    return (
        <div>
            <div className="navbar-fixed">
                <nav className=" nav-wrapper blue navbar_text">
                    Search for offers
                </nav>
            </div>
            {appStore.load === true && <div className="progress" style={{'position':'fixed'}}>
                <div className="indeterminate"> </div>
            </div>}

            <Form appStore = {appStore}/>
            {appStore.data !== null && <Table appStore = {appStore}/>}
        </div>
    );
})

ReactDOM.render(<App/>, document.getElementById('root'));