import { addVacantionAC,initVacantionAC } from '../../redux/actionCreators/actionCreatorVacantion';



export const addVacantion = (organization,vacantion,description,id)=>{
  return (dispatch)=>{

    fetch(`${process.env.REACT_APP_URL}/vacantion`, {
      method: 'POST',
      headers: { 'Content-Type': 'Application/json' },
      body: JSON.stringify({

        organization: organization,
        vacantion: vacantion,
        description:description,
        id:id

      }),
    })
      .then((res) => res.json())
      .then((data) => dispatch(addVacantionAC(data.vacantions) ));
      
  }
}



export const ThunkInitVacantion = ()=>{
  return (dispatch)=>{
    fetch(`${process.env.REACT_APP_URL}/vacantion`)
    .then(res=>res.json())
    .then(data=>dispatch(initVacantionAC(data)))
  }
}
