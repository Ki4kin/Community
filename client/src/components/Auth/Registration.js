import React, {useState} from 'react';
import axios from "axios";
import {useDispatch} from "react-redux";

function Registration(props) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()


    const registerHandler = (e) => {
        e.preventDefault()
        const info = new FormData(e.target);
        // const name = e.target.name.value
        // const phone = e.target.phone.value
        fetch('/registration',{
            method:"POST",
            body:info
        }).then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.student) {
                    alert(data.message)
                    e.target.reset()
                }else {
                    alert(data.errors.errors[0].msg)
                    e.target.reset()
                }})
            .catch((error)=> alert(`status: ${error.response.status} , ${error.response.data.message}`))
    }


        return (
            <div className='registration'>
                <form onSubmit={(e)=>registerHandler(e)} method='POST'
                      encType="multipart/form-data"
                >
                    <h3>Регистрация</h3>
                    <input name='name' type="text" placeholder='enter your name'/>
                    <input name='phone' type="number" placeholder='enter  phone number'/>
                    <input  type="email" name='email' placeholder='enter email'/>
                    <input  type="password" name='password' placeholder='enter password'/>
                    <input type="file" name="photo"  />
                    <button type='submit'>Регистрация</button>
                </form>
            </div>
        );
    }
    export default Registration;














