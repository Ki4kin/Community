import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import axios from "axios";
import './SearchList.css'
import {initAllStudentsAC} from "../../redux/actionCreators/actionCreatorStudent";
import SearchStudent from "../SearchStudent/SearchStudent";
import SearchForm from "../SearchForm/SearchForm";

function Search(props) {
    const dispatch = useDispatch()
    const search = useSelector(state => state.search)

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_URL}/student/inits`)
            .then(({data:{list}})=>dispatch(initAllStudentsAC(list)))
            .catch(err => console.log(err))
    },[dispatch])

    return (
        <>
            <SearchForm/>
            <div className='search'>
                <div className='searchList'>
                    {search?.map(el =><SearchStudent key={el._id} wanted = {el} /> )}
                </div>
            </div>
        </>
    );
}

export default Search;
