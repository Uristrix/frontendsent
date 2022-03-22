import React from "react";

const Table = (props) =>
{
    const len = () => { return {'width': (1000 +(Object.keys(props.data['data'][0]['sentences'][0]).length - 1)*150) + 'px'} }

    const genTemplate = (str) => {
        for(let i = 0; i < Object.keys(props.data['data'][0]['sentences'][0]).length - 1; i++) str += ' 2fr'
        return {'gridTemplateColumns': str}
    }

    const genTemplate2 = (str) => {
         str += ` ${3 + (Object.keys(props.data['data'][0]['sentences'][0]).length -1) * 2}fr`
        return {'gridTemplateColumns': str}
    }

    if (props.data['data'].length !== 0)
    {
        const keys = Object.keys(props.data['data'][0])
            .concat(Object.keys(props.data['data'][0]['sentences'][0])).slice(0,-1)

        const bar = keys.map( (elem, i) => {return <div className= 'el bar' >{elem}</div>})

        const paragraphs = props.data['data'].map((el) =>
        {
            return <div className='grid second' style={genTemplate2('2fr 1fr')}>
                {Object.keys(el).sort().slice(0,-1).map((el3) => {
                    return <div className='el'>{el[el3].join(', ')}</div>
                })
                }
                <div>{el['sentences'].map((el2) =>
                    {
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
            <div>
                <div className='overflow'>
                    <div className='table' style={len()}>
                        <div className='grid' style={genTemplate('2fr 1fr 3fr')}>{bar}</div>
                        <div>{paragraphs}</div>
                    </div>
                </div>
            </div>
        )
    }
    else return <div className='info'>Sorry, such key phrases were not found in any sentence</div>
}

export default Table