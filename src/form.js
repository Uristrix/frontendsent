import {useForm} from "react-hook-form";
import React, {useState, useEffect} from 'react';
import axios from "axios";
import M from "materialize-css";
import data from "./def_value.txt"
const URL = process.env.REACT_APP_FLASK_API

const Form = (props) =>
{
    const [url, setUrl] = useState(null);
    const [textarea, setTextArea] = useState(['add phrases_1'])
    const { register, handleSubmit, setValue, formState: { errors } } = useForm({shouldUnregister: true});

    useEffect(() =>
    {
        fetch(data).then(r => r.json()
            .then(r =>
            {
                setValue("phrases", r['phrases'])
                setValue('text', r['text'])
                setValue('add phrases_1', r['add phrases_1'])

                M.updateTextFields()
                M.textareaAutoResize(document.getElementById('textarea2'))
            }))
    });

    const changeURL = (str) => setUrl(str)

    const addTextArea = () =>
    {
        textarea.push('add phrases_' + (textarea.length + 1))
        setTextArea(textarea)
    }

    const delTextArea = (elem) => {

        if (textarea.length !== 0)
        {
            const index = textarea.indexOf(elem) + 1
            for(let i = index; i <= textarea.length - 1; i++)
            {
                let el1 = document.getElementById('add phrases_' + index)
                let el2 = document.getElementById('add phrases_' + (index+1))
                el1.value  = el2.value
            }
            textarea.pop()
            setTextArea(textarea)
        }
    }

    const onSubmit = (data) =>
    {
        if (url === URL+'nlp/table')
        {
            props.updateLoad(true)
            axios.post(url, data)
                .then(res=> {
                    props.updateData(res.data)
                    props.updateLoad(false)
                    changeURL(URL)
                })
                .catch(err =>{
                    props.updateLoad(false)
                    changeURL(URL)
                })
        }

        else if (url === URL+'nlp/xlsx')
        {
            props.updateLoad(true)
            axios.post(url, data, { responseType: 'blob' })
                .then(res=> {
                    const url = window.URL.createObjectURL(new Blob([res.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'file.xlsx'); //or any other extension
                    document.body.appendChild(link);
                    link.click();
                    props.updateLoad(false);
                    changeURL(URL)
                })
                .catch(err =>{
                    props.updateLoad(false)
                    changeURL(URL)
                })
        }
    }

    useEffect(() =>
    {
        const ta = document.querySelectorAll('.has-character-counter');
        M.CharacterCounter.init(ta);
    }, [])

    return(
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className='flex-area'>
                <div className="input-field inputs">
                <textarea
                    id="textarea1"
                    className='materialize-textarea has-character-counter'
                    style={{"height":"70px"}}
                    data-length="100"
                    {...register("phrases", {required: true, maxLength: 100})}
                />
                    <label htmlFor='textarea1'>Phrases (sep. by commas)</label>
                </div>

                <button className=" add-phrases btn-floating btn-small waves-effect waves-light blue"
                        onClick={() => addTextArea()}>
                    <i className="material-icons">add</i>
                </button>
            </div>
            {
                textarea.map((el) => {
                        return <div className='flex-area animation'>
                            <div className="input-field inputs">
                        <textarea
                            id={el}
                            className='materialize-textarea has-character-counter'
                            style={{"height":"70px"}}
                            data-length="100"
                            {...register(el, {required: true, maxLength: 100})}
                        />
                                        <label htmlFor='textarea1'>Phrases (sep. by commas)</label>
                                    </div>

                                    <button className=" add-phrases btn-floating btn-small
                                            waves-effect waves-light blue"
                                            onClick={() => delTextArea(el)}>
                                        <i className="material-icons">close</i>
                                    </button>
                                </div>
                            }
                )
            }
            <div className='input-field' >
                <textarea
                    id="textarea2"
                    className="materialize-textarea has-character-counter"
                    style={{"height":"300px"}}
                    data-length="10000"
                    {...register("text", {required: true, maxLength: 10000})} //максимальная длина по ТЗ
                />
                <label htmlFor='textarea2'>Text</label>
            </div>

            <div style={{'display':'flex'}}>
                <button className="btn btn-large waves-effect waves-light light-blue"
                        style={{"width":"9em", 'margin': "0 15px 30px auto"}}
                        type='submit'
                        onClick={() => changeURL(URL +'nlp/table')}
                        >TABLE
                </button>
                <button className="btn btn-large waves-effect waves-light light-blue"
                        style={{"width":"9em", 'margin': "0 auto 30px 15px"}}
                        type='submit'
                        onClick={() => changeURL(URL + 'nlp/xlsx')}
                        >XLSX
                </button>

            </div>

            {errors.exampleRequired && <span>Error(((</span>}
        </form>
    )
}

export default Form