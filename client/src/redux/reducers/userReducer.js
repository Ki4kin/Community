import {
    SET_USER,
    LOGOUT,
    UPDATE_USER,
    ADD_RESUME, ADD_PHOTO, INIT_ALL_STUDENTS
} from "../actionTypes/actionTypes";

const defaultState = {
    // currentStudent: {},

}

export default function userReducer(state = {}, action) {
    switch (action.type) {
        case SET_USER:
            // return {
            //     ...state,
            //     currentStudent: action.payload.student,
            //     isAuth: true,
            // }
            action.payload.student.isAuth = true
            return action.payload.student


        case LOGOUT:
            localStorage.removeItem('token')
            // return {
            //     ...state,
            //     currentStudent: {},
            // }
            return {student:action.payload}



        case ADD_PHOTO:
          // return{
          //   ...state,
          //   currentStudent:{
          //     ...state.currentStudent,
          //     photo:action.payload
          //   }
          // }

            return {...state,photo:action.payload}

          case UPDATE_USER:
          // return{
          //   ...state,
          //       currentStudent: action.payload,
          //       // isAuth: true,
          // }

            return action.payload


          case ADD_RESUME:
              return{...state, resume: action.payload }


        default:
            return state
    }
}



