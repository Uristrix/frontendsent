import {useForm} from "react-hook-form";
import React, {useState, useEffect} from 'react';
import axios from "axios";
import M from "materialize-css";

const URL = process.env.REACT_APP_FLASK_API
const Form = (props) =>
{
    const [url, setUrl] = useState(null);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const changeURL = (str) => setUrl(str)

    const onSubmit = (data) =>
    {
        props.updateLoad(true)
        if (url === URL+'nlp/table')
            axios.post(url, data).then(res=> {
                props.updateData(res.data)
                props.updateLoad(false)
            })

        else
            axios.post(url, data, { responseType: 'blob' }).then(res=> {

               const url = window.URL.createObjectURL(new Blob([res.data]));
               const link = document.createElement('a');
               link.href = url;
               link.setAttribute('download', 'file.xlsx'); //or any other extension
               document.body.appendChild(link);
               link.click();
               props.updateLoad(false)
            })

    }

    useEffect(() =>
    {
        const ta = document.querySelectorAll('.has-character-counter');
        M.CharacterCounter.init(ta);
    },[]) //для 1 рендера подрубаем скрипты из materialize


    return(
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="input-field" style={{'minHeight':'105px'}}>
                <textarea
                    id="textarea1"
                    className='materialize-textarea has-character-counter'
                    style={{"height":"70px"}}
                    data-length="100"
                    {...register("phrases", {required: true, maxLength: 100})}
                />
                <label htmlFor='textarea1'>Phrases (separated by commas)</label>
            </div>

            <div className='input-field' style={{'minHeight':'335px'}}>
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