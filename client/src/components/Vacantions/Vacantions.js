import React, {useEffect, useRef, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from "react-redux"
import {addVacantion, ThunkInitVacantion} from '../../redux/Thunk/VacantionThunk';
import VacantionCard from './VacantionCard'
import axios from "axios";
import Organization from "../Organization/Organization";
import VacantionForm from "../VacantionForm/VacantionForm";
import './Vacantion.css'

function Vacantions(props) {
    const sortInput = useRef()
        const history = useHistory();
    const student = useSelector(state => state.student)
    const id = student._id
    const organization = useRef();
    // const vacantion = useRef();
    const description = useRef();
    const salary = useRef()
    const vacantion = useSelector(state => state.vacantion)
    const dispatch = useDispatch();
    const [newState, setNewState] = useState(null)
    const [button , setButton] = useState(false)
    useEffect(() => {
        dispatch(ThunkInitVacantion())
    }, [dispatch])

    useEffect(() => {
        setNewState(() => vacantion)
    }, [vacantion])

    const formHandler = (event) => {
        event.preventDefault();
        const vacantion = event.target.vacantion.value
        dispatch(addVacantion(organization.current.value, vacantion,
            description.current.value,salary.current.value, id))
        event.target.reset()
        history.push('/vacantions');
    };

    const sortHandler = (e) => {
        e.preventDefault()
        if (sortInput.current.value === 'увеличению зарплаты') {
            setNewState(()=>[...vacantion].sort((a, b) => (a.salary - b.salary)))
        } else if (sortInput.current.value === 'уменьшению зарплаты') {
            setNewState(()=>[...vacantion].sort((a, b) => (b.salary - a.salary)))
        } else if (sortInput.current.value == 'новизне')
            setNewState(vacantion)
    }

    return (
        <>
            {!button &&<button onClick={()=>setButton(!button)} className='btn'>Добавить Вакансию</button>}
            {button && <div className="vacantion container d-flex flex-column text-center">
                <form method="POST" onSubmit={formHandler} className='text-center'>
                    <h3>Добавить Вакансию</h3>
                    <input
                        // ref={vacantion}
                        name="vacantion"
                        className="form-control text-center"
                        type="text"
                        placeholder="введите вакансию"/>
                    <input ref={organization}
                           className="form-control text-center"
                           name="organization"
                           type="text"
                           placeholder="введите организацию"/>
                    <input ref={salary}
                           className="form-control text-center"
                           name="salary"
                           type="text"
                           placeholder="введите зарплату"/>
                    <textarea
                        ref={description}
                        name="description"
                        className="form-control text-center p-2 m-auto"
                        type="text"
                        placeholder="введите описание"
                        rows="5" cols="15"/>
                    <button onClick={()=>setButton(!button)} type="submit">Добавить</button>
                </form>
            </div>}





            <div className='sort'>
                Сортировать по:
                <select onChange={sortHandler} ref={sortInput} className='selectSort'>
                    <option>новизне</option>
                    <option>увеличению зарплаты</option>
                    <option>уменьшению зарплаты</option>
                </select>
            </div>

            <div className='container d-flex flex-wrap'>
                {newState?.map(vac => <VacantionCard vacantion={vac} key={vac._id}/>)}
            </div>
        </>
    );
}

export default Vacantions;
