import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Table from "./table";
import Form from "./form";
import "./style.css"

const App = () =>
{
    const [data, setData] = useState(null)
    const [load, setLoad] = useState(false)
    const updateData = (data) => setData(data);
    const updateLoad = (load) => setLoad(load);
    return (
        <div>
            <div className="navbar-fixed">
                <nav className=" nav-wrapper blue navbar_text">
                    Search for offers
                </nav>

            </div>

            {load === true && <div className="progress" style={{'position':'fixed'}}>
                <div className="indeterminate"> </div>
            </div>}

            <Form updateData = {updateData} updateLoad = {updateLoad}/>
            {data !== null && <Table data = {data} updateData = {updateData} updateLoad = {updateLoad}/>}
        </div>
    );
}

ReactDOM.render(<App/>, document.getElementById('root'));