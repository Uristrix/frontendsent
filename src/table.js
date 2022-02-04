import React from "react";

let test = {}
const Table = (props) =>
{
    console.log(props.data)
    if (props.data === null) return <span> </span>

    const keys = Object.keys(props.data['data'][0]).concat(Object.keys(props.data['data'][0]['sentences'][0])).slice(0,-1)
    const bar = keys.map( (elem, i) => {return <div className= 'el bar' >{elem}</div>})

    const paragraphs = props.data['data'].map((el) =>
    {
        const sentences = el['sentences'].map((el2) =>
        {
            return <div className= 'sub'>
                <div className='el'>{el2['text']}</div>
                <div className='el'>{el2['date/time'].join(' ')}</div>
                <div className='el'>{el2['keywords'].join(' ')}</div>
                <div className='el'>{el2['rest entities'].join(' ')}</div>
            </div>
        })

        return <div className='grid second'>
            <div className='el'>{el['key phrases'].join(' ')}</div>
            <div className='el'>{el["paragraph num"]}</div>
            <div className=''>{sentences}</div>
        </div>
    })

    return(
        <div className='overflow'>
            <div className='table'>
                <div className='grid'>{bar}</div>
                <div>{paragraphs}</div>
            </div>
        </div>

    )
}

export default Table