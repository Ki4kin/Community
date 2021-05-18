import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { thunkOrgAdd } from '../../redux/Thunk/ThunkOrganization';
import { Icon } from '@iconify/react';
import iosStar from '@iconify-icons/ion/ios-star';

const rating = ['','','','','']

function OrganizationAddForm() {

  const dispatch = useDispatch();

  const [addOrgFlag, setaddOrgFlag] = useState(false)
  const [rate, setRate] = useState(0)
  const [button , setButton] = useState(false)

  const formHandler = (event) => {
    event.preventDefault();

      dispatch(thunkOrgAdd(
        event.target.organization.value,
        event.target.comment.value,
        rate
        ))
      event.target.reset()
  };

  // const addOrgFunction = (event) => {
  //   event.preventDefault()
  //   setaddOrgFlag(!addOrgFlag)
  // }

  return (
    <div className="organization-box">
      {!button && <button onClick={()=>setButton(!button)}><h3>Добавить организацию</h3></button>}
    { button?

    <div className="organization container d-flex flex-column">
      <form method="POST" onSubmit={formHandler}>

          <input
            name="organization"
            className="form-control m-3"
            type="text"
            placeholder="название организации"
          />

           <p> Оцените организацию {rating.map((el,i) => {
                return <Icon
                          name={i}
                          key={i}
                          style={{color: (i+1) <= rate?"red":"initial"}}
                          icon={iosStar} onClick={() => {setRate(i+1)}} />
                 })}
          </p>

          <div className="form-floating">
            <textarea className="form-control m-3" name="comment" ></textarea>
            <label className="ms-2" htmlFor="floatingTextarea2">Ваше мнение об организации</label>
          </div>

          <button type="submit">Добавить</button>
          </form>
          </div>
        : null}
        </div>
  );
}

export default OrganizationAddForm;
