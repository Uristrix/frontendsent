import React, {useState} from 'react';
import ReactDOM from 'react-dom';
import Table from "./table";
import Form from "./form";
import "./style.css"
import Download from "./download";

const App = () =>
{
    const [data, setData] = useState(null)

    const updateData = (data) => setData(data)

    return (
        <div>
            <h2>Search for offers</h2>
            <Form updateData = {updateData}/>
            {data !== null && <Table data = {data}/>}
            {data !== null && <Download data ={data}/>}
        </div>
    );
}

ReactDOM.render(<App/>, document.getElementById('root'));