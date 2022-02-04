import {useForm} from "react-hook-form";
import React, {useEffect} from 'react';
import axios from "axios";
import M from "materialize-css";
import Download from "./download";

const URL = process.env.REACT_APP_FLASK_API //api-запрос

const Form = (props) =>
{
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = (data) =>
    {
        axios.post(URL, data).then(res=>{
            console.log(res.data)
            props.updateData(res.data)
        })
    }

    useEffect(() =>
    {
        let ta = document.querySelectorAll('.has-character-counter');
        M.CharacterCounter.init(ta);
    },[]) //для 1 рендера подрубаем скрипты из materialize


    return(
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
            <div className="input-field" style={{'min-height':'105px'}}>
                <textarea
                    id="textarea1"
                    className='materialize-textarea has-character-counter'
                    style={{"height":"70px"}}
                    data-length="100"
                    {...register("phrases", {required: true, maxLength: 100})}
                />
                <label htmlFor='textarea1'>Phrases (separated by commas)</label>
            </div>

            <div className='input-field' style={{'min-height':'335px'}}>
                <textarea
                    id="textarea2"
                    className="materialize-textarea has-character-counter"
                    style={{"height":"300px"}}
                    data-length="10000"
                    {...register("text", {required: true, maxLength: 10000})} //максимальная длина по ТЗ
                />
                <label htmlFor='textarea2'>Text</label>
            </div>

            <div style={{"margin": "auto"}}>
                <button className="btn btn-large waves-effect waves-light light-blue"
                        style={{"width":"9em", 'margin': "0 15px 30px 0"}}
                        type='submit'>
                    Show Table
                </button>
                <button className="btn btn-large waves-effect waves-light light-blue"
                        style={{"width":"9em", 'margin': "0 0 30px 15px"}}
                        // onClick= {() => }
                >
                    <i className="material-icons left">get_app</i>
                    XLSX
                </button>
            </div>

            {errors.exampleRequired && <span>Error(((</span>}
        </form>
    )
}

export default Form