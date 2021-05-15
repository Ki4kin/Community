import React, { useState } from "react";
import { useDispatch } from "react-redux";
// import StudentAboutItem from "./StudentAboutItem";
import { setUser } from "../../redux/actionCreators/actionCreatorAuth";

import { ThunkUpdateProfile } from "../../redux/Thunk/ThunkStudent";




function StudentAbout({ student }) {
  const [btnUpdate, setBtnUpdate] = useState(false);
  const dispatch = useDispatch();
  const btnUpdateHandler = () => {
    setBtnUpdate(true);
  };
  const id = student._id;

  const btnFormHandler = (e) => {
    setBtnUpdate(false);
    const {
      name: { value: name },
      phone: { value: phone },
      email: { value: email },
      year: { value: year },
      group: { value: group },
      city: { value: city },
      stack: { value: stack },
      language: { value: language },
      socialLinkedin: { value: socialLinkedin },
      socialGitHab: { value: socialGitHab },
      placeWork: { value: placeWork },
    } = e.target;

    dispatch(
      ThunkUpdateProfile(
        id,
        name,
        phone,
        email,
        year,
        group,
        city,
        stack,
        language,
        socialLinkedin,
        socialGitHab,
        placeWork
      )
    );
  };
  
  return (
    <>
      <button className="student-update__text" onClick={btnUpdateHandler}>
        ✎
      </button>

      {!btnUpdate && (
        <>
          <li className="student-about__item">{student?.name}</li>
          <li className="student-about__item">{student?.phone} </li>
          <li className="student-about__item">{student?.email} </li>
          <li className="student-about__item"> {student?.year}</li>
          <li className="student-about__item"> {student?.group}</li>
          <li className="student-about__item"> {student?.city}</li>
          <li className="student-about__item"> {student?.stack}</li>
          <li className="student-about__item"> {student?.language}</li>
          <li className="student-about__item"> {student?.socialLinkedin}</li>
          <li className="student-about__item"> {student?.socialGitHab}</li>
          <li className="student-about__item">{student?.placeWork} </li>
          <li className="student-about__item">

          <a href={`/img/${student?.resume}`}>download</a>

      
          </li>
        </>
      )}


      {/* <embed src={`/img/${user.resume}`}  type="application/pdf"   height="700px" width="500"></embed> */}
      {btnUpdate && (
        <>
          <form className="about-form__update" onSubmit={btnFormHandler}>
            <input
              className="about-item__change"
              type="text"
              name="name"
              defaultValue={student?.name}
            />
            <input
              className="about-item__change"
              type="text"
              name="phone"
              defaultValue={student?.phone}
            />
            <input
              className="about-item__change"
              type="text"
              name="email"
              defaultValue={student?.email}
            />
            <input
              className="about-item__change"
              type="text"
              name="year"
              placeholder="Год поступления"
              defaultValue={student?.year}
            />

            <select
                className="student-about__item form-select"
              aria-label="Default select example"
              name="group"
            >
              <option defaultValue={student?.group}>{student?.group}</option>
              <option value="Ежи">Ежи</option>
              <option value="Пчелы">Пчелы</option>
              <option value="Бобры">Бобры</option>
              <option value="Медведи">Медведи</option>
              <option value="Барсы">Барсы</option>
              <option value="Песцы">Песцы</option>
              <option value="Тигры">Тигры</option>
              <option value="Киты">Киты</option>
              <option value="Сойки">Сойки</option>
              <option value="Рыси">Рыси</option>
              <option value="Еноты">Еноты</option>
              <option value="Волки">Волки</option>
              <option value="Лисы">Лисы</option>
              <option value="Орлы">Орлы</option>
              <option value="Совы">Совы</option>
            </select>
            <select
                className="student-about__item form-select"
              aria-label="Default select example"
              name="city"
            >
              <option defaultValue={student?.city}>{student?.city}</option>
              <option value="Москва">Москва</option>
              <option value="Санкт-Петербург">Санкт-Петербург</option>
            </select>

            <input
              className="about-item__change"
              type="text"
              name="stack"
              placeholder="Языки програмирования"
              defaultValue={student?.stack}
            />
            <input
              className="about-item__change"
              type="text"
              name="language"
              placeholder="Иностранные языки"
              defaultValue={student?.language}
            />
            <input
              className="about-item__change"
              type="text"
              name="socialLinkedin"
              placeholder="Linkedin"
              defaultValue={student?.socialLinkedin}
            />
            <input
              className="about-item__change"
              type="text"
              name="socialGitHab"
              placeholder="GitHub"
              defaultValue={student.socialGitHab}
            />
            <input
              className="about-item__change"
              type="text"
              name="placeWork"
              placeholder="Место работы"
              defaultValue={student?.placeWork}
            />

            <button className="about-item-btn">Сохранить</button>
          </form>
        </>
      )}

    </>
  );
}

export default StudentAbout;
