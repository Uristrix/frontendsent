import React, {useEffect} from "react";
import {useForm} from "react-hook-form";
import M from "materialize-css";
import axios from "axios";

const URL = process.env.REACT_APP_FLASK_API

export const Modal = (props) =>
{
    const { register, handleSubmit} = useForm()

    useEffect(() =>
    {
        M.CharacterCounter.init(document.querySelector('#textarea3'))
        M.Modal.init(document.querySelector('#modal'))
    })

    const onSubmit = (data) =>
    {
        props.updateLoad(true)

        let text = '';
        for (let el of props.data['data'])
        {
            for(let el2 of el['sentences'])
                text += el2['text'].join()

            text += "\n\n"
        }

        data['text'] = text
        console.log(data)
        axios.post(URL + 'nlp/table', data).then(res=> {

            const name = 'key phrases_' + (Object.keys(props.data['data'][0]).length - 2)
            console.log(name)
            for(let el of props.data['data'])
            {
                console.log(el)
                console.log(el['paragraph num'])
                for(let el2 of res.data['data'])
                    if(el['paragraph num'][0] === el2['paragraph num'][0])
                        el[name] = el2['key phrases']

                    else if( el[name] === undefined) el[name] = []
            }
            console.log(props.data)
            props.udateData(props.data)
            props.updateLoad(false)
        })

        M.Modal.getInstance(document.querySelector('#modal')).close()
    }

        return (
        <div id="modal" className="modal modal-fixed-footer">
            <div className="modal-content">
                <h4>New key Phrases</h4>
                <form className="form2" onSubmit={handleSubmit(onSubmit)}>

                    <div className='input-field'>
                        <textarea
                            id="textarea3"
                            className="materialize-textarea has-character-counter"
                            style={{"height":"155px"}}
                            data-length="100"
                            {...register("phrases", {required: true, maxLength: 100})}
                        />
                        <label htmlFor='textarea3'>Phrases (separated by commas)</label>
                    </div>                  <div className="footer">
                    <button className="btn-large waves-effect waves-light light-blue center"
                            style={{"width":"15em", 'margin': "0 auto"}}
                            type='submit'
                    >add
                    </button>
                </div>
                </form>
            </div>

        </div>
    )
}