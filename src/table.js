import React from "react";
import M from "materialize-css";
import {Modal} from "./modal";

const Table = (props) =>
{
    const len = () => { return {'width': (1000 +(Object.keys(props.data['data'][0]).length - 1)*150) + 'px'} }

    const genTemplate = (str) => {
        for(let i = 0;  i < Object.keys(props.data['data'][0]).length - 2; i++) str = '2fr ' + str
        return {'gridTemplateColumns': str}
    }

    const openModal = () => {
        document.getElementById("textarea3").value = ""
        const elem = document.querySelector('#modal');
        M.Modal.getInstance(elem).open()
    }

    if (props.data['data'].length !== 0)
    {
        const keys = Object.keys(props.data['data'][0]).sort()
            .concat(Object.keys(props.data['data'][0]['sentences'][0])).slice(0,-1)

        const bar = keys.map( (elem, i) => {return <div className= 'el bar' >{elem}</div>})

        const paragraphs = props.data['data'].map((el) =>
        {
            return <div className='grid second' style={genTemplate('1fr 9fr')}>
                {Object.keys(el).sort().slice(0,-1).map((el3) =>
                {
                    return <div className='el'>{el[el3].join(', ')}</div>
                })
                }
                <div>{el['sentences'].map((el2) =>
                    {

                        return <div className= 'sub' style={{'gridTemplateColumns':'3fr 2fr 2fr 2fr'}}>
                            {/*{Object.keys(el2).map((el3) =>*/}
                            {/*{*/}
                            {/*    return <div className='el'>{el2[el3].join(', ')}</div>*/}
                            {/*})*/}
                            {/*}*/}
                            <div className='el'>{el2['text'].join(', ')}</div>
                            <div className='el'>{el2['date/time'].join(', ')}</div>
                            <div className='el'>{el2['keywords'].join(', ')}</div>
                            <div className='el'>{el2['rest entities'].join(', ')}</div>
                        </div>
                    })
                }</div>
            </div>
        })

        return(
            <div>
                <div className='overflow'>
                    <div className='table' style={len()}>
                        <div className='grid' style={genTemplate('1fr 3fr 2fr 2fr 2fr')}>{bar}
                            <button className=" add-phrases btn-floating btn-small waves-effect waves-light black"
                                    onClick={() => openModal()}>
                                <i className="material-icons">add</i>
                            </button>
                        </div>
                        <div>{paragraphs}</div>
                    </div>
                </div>
                <Modal updateLoad = {props.updateLoad} udateData = {props.updateData} data = {props.data}/>
            </div>
        )
    }
    else return <div className='info'>Sorry, such key phrases were not found in any sentence</div>
}

export default Table