import React from "react";
import { toJS } from 'mobx'
import {observer} from "mobx-react-lite";

const Table = observer((props) =>
{
    const len = () => { return {'width': (900 + (Object.keys(table[0]['sentences'][0]).length - 1)*150) + 'px'} }

    const genTemplate = (str) => {
        for(let i = 0; i < Object.keys(table[0]['sentences'][0]).length - 1; i++) str += ' 2fr'
        return {'gridTemplateColumns': str}
    }

    const genTemplate2 = (str) => {
        str += ` ${3 + (Object.keys(table[0]['sentences'][0]).length - 1) * 2}fr`
        return {'gridTemplateColumns': str}
    }

    const checkSent = (obj) => {
        for(let el in obj)
            if(el !== 'text' && obj[el].length !== 0) return true

        return false
    }

    let table = toJS(props.appStore.data['data'])

    for (let el of table)
    {
        for(let el2 of el['sentences'])
        {
            if(!props.appStore.dt_box)
                delete el2['date/time']
            if(!props.appStore.keywords_box)
                delete el2['keywords']
            if(!props.appStore.rest_ent_box)
                delete el2['rest entities']
        }
    }

    for (let el of table)
        for(let i = 0; i <el['sentences'].length; i++)
            if(!checkSent(el['sentences'][i]))
                el['sentences'].splice(i, 1)


    if (table.length !== 0)
    {
        const keys = Object.keys(table[0])
            .concat(Object.keys(table[0]['sentences'][0])).slice(0,-1)

        const bar = keys.map( (elem) => {return <div className= 'el bar' >{elem}</div>})

        const paragraphs = table.map((el) =>
        {
            return <div className='grid second' style={genTemplate2('2fr 1fr')}>
                {Object.keys(el).sort().slice(0,-1).map((el3) => {
                    return <div className='el'>{el[el3].join(', ')}</div>
                })}
                <div>{el['sentences'].map((el2) => {
                            return <div className= 'sub' style={genTemplate('3fr')}>
                                <div className='el'>{el2['text'].join(', ')}</div>
                                {Object.keys(el2).slice(0,-1).map( (el3) => {
                                    return <div className='el'>{el2[el3].join(', ')}</div>}
                                )}
                            </div>
                    })
                }</div>
            </div>
        })

        return(
                <div className='overflow'>
                    <div className='table' style={len()}>
                        <div className='grid' style={genTemplate('2fr 1fr 3fr')}>{bar}</div>
                        <div>{paragraphs}</div>
                    </div>
                </div>
        )
    }
    else return <div className='info'>Sorry, such key phrases were not found in any sentence</div>
})

export default Table