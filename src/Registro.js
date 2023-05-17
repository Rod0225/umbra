import FormRegister from "./componentes/formRegister";
import { useRef, useState, useEffect } from "react";
import { faCheck,faTimes,faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from 'axios';
import swal from "sweetalert2";

import React from 'react';
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}/;
const NAMES_REGEX = /^[a-zA-Z][a-zA-Z_]{3,50}/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&-]).{8,24}$/;
const EML_REGEX = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%&'*/=?^_+-`{|.}~]).{8,150}$/;




export default function Register() {
  const [formValue, setformValue] = React.useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    password2: "",
  });

  const userRef =useRef();
  const errRef=useRef();


  const[user,setUser]=useState('');
  const[validName, setValidName]= useState(false);
  const[userFocus, setUserFocus]= useState(false);

  const[firstName,setFirstName]=useState('');
  const[validFirstName, setValidFirstName]= useState(false);
  const[firstNameFocus, setFirstNameFocus]= useState(false);
  
  const[lastName,setLastName]=useState('');
  const[validLastName, setValidLastName]= useState(false);
  const[lastNameFocus, setLastNameFocus]= useState(false);
  
  const[email,setEmail]=useState('');
  const[validEmail, setValidEmail]= useState(false);
  const[emailFocus, setEmailFocus]= useState(false);

  const[pwd,setPassword]=useState('');
  const[validPwd, setValidPwd]= useState(false);
  const[pwdFocus, setPwdFocus]= useState(false);

  const[matchPwd,setMatchPwd]=useState('');
  const[validMatch, setValidMatch]= useState(false);
  const[matchFocus, setMatchFocus]= useState(false);

  const[errMsg,setErrMsg]=useState('');
  const[success, setSuccess]= useState(false);

  useEffect(() =>{
    userRef.current.focus();
  },[]);

  useEffect(() =>{
    const result = USER_REGEX.test(user);
    setValidName(result);  
  },[user]);

  useEffect(() =>{
    const result = NAMES_REGEX.test(firstName);
    setValidFirstName(result);  
  },[firstName]);

  useEffect(() =>{
    const result = NAMES_REGEX.test(lastName);
    setValidLastName(lastName);  
  },[lastName]);

  useEffect(() =>{
    const result = EML_REGEX.test(email);
    setValidEmail(email);  
  },[email]);

  useEffect(() =>{
    const result = PWD_REGEX.test(pwd);
    setValidPwd(result);
    const match=pwd=== matchPwd;
    setValidMatch(match);  
  },[pwd, matchPwd]);

  useEffect(() =>{
    setErrMsg('');
  },[user,pwd,matchPwd]);

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value,
    });
  };

  const baseURL = "http://localhost:8000/register/";

  const handleSubmit = (event) => {
    event.preventDefault();

    const SignupFormData = new FormData();
    SignupFormData.append("username", formValue.username);
    SignupFormData.append("first_name", formValue.first_name);
    SignupFormData.append("last_name", formValue.last_name);
    SignupFormData.append("email", formValue.email);
    SignupFormData.append("password", formValue.password);
    SignupFormData.append("password2", formValue.password2);

    axios
      .post(baseURL, SignupFormData)
      .then((response) => {
        console.log(response.data);

        new swal({
          title: "Usuario registrado",
          icon: "success",
        }).then(() => {
          //window.location.reload(false);
          window.location.href = 'http://localhost:3000/login';
        });
      })
      .catch((error) => {
        console.log(error.response.data);

        new swal({
          title: "Error",
          icon: "error",
          text: JSON.stringify(error.response.data)
            .replaceAll("[", "")
            .replaceAll("]", "")
            .replaceAll("{", "")
            .replaceAll("}", "")
            .replaceAll(",", "\n")
            .replaceAll('"', "")                
            .replaceAll('username:A user with that username already exists.',"Ya existe un usuario con ese nombre.")
            .replaceAll('password:This password is too short.','La contraseña es muy corta, debe contener por lo menos 8 caracteres')
            .replaceAll('It must contain at least 8 characters.',' '),
        });
      });
    };
  
  return (
    <>
    {success ? (
      <section>
        <h1>Success!</h1>
        <p>
          <a href="http://localhost:3000/index">index</a>
        </p>
      </section>
    ) :(
    <section>
      <p ref={errRef} className={errMsg ? "errmsg" :
      "offscreen"} aria-live="assertive">{errMsg}</p>
      <h1 className='text-5xl font-semibold'>Registrarse</h1>
      <form onSubmit={handleSubmit}>
        <div className='mt-3 '>
                <div>
                    <label htmlFor="username" className='text-lg font-medium'>
                      Nombre de usuario:
                      <span className={validName ? "valid" : "hidden"}>
                        <FontAwesomeIcon icon={faCheck}/>
                      </span>
                      <span className={validName || !user ? "hidden" : 
                      "invalid"}>
                        <FontAwesomeIcon icon={faTimes}/>
                      </span>
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      ref={userRef}
                      autoComplete="off"
                      onChange={handleChange}
                      required
                      aria-invalid={validName ? "false" : "true"}
                      aria-describedby="uidnote"
                      onFocus={() => setUserFocus(true)}
                      onBlur={() => setUserFocus(false)}
                      className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                      placeholder='Ingresa tu nombre de usuario'
                    />
                    <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "hidden"}>
                      <FontAwesomeIcon icon={faInfoCircle}/>
                      4 to 24 caracteres.<br/>
                      Deben empezar con una letra.<br/>
                      Letras, numeros, guion bajo,guion son permitidos
                    </p>
                </div>

                <div>
                    <label htmlFor="first_name" className='text-lg font-medium'>
                      Nombre(s):
                      <span className={validFirstName ? "valid" : "hidden"}>
                        <FontAwesomeIcon icon={faCheck}/>
                      </span>
                      <span className={validFirstName || !firstName ? "hidden" : 
                      "invalid"}>
                        <FontAwesomeIcon icon={faTimes}/>
                      </span>
                    </label>
                    <input
                      type="text"
                      id="first_name"
                      name="first_name"
                      //ref={userRef}
                      autoComplete="off"
                      onChange={handleChange}
                      required
                      aria-invalid={validName ? "false" : "true"}
                      aria-describedby="uidnote"
                      onFocus={() => setFirstNameFocus(true)}
                      onBlur={() => setFirstNameFocus(false)}
                      className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                      placeholder='Ingresa tu(s) nombres(s)'
                    />
                    <p id="uidnote" className={firstNameFocus && firstName && !validFirstName ? "instructions" : "hidden"}>
                      <FontAwesomeIcon icon={faInfoCircle}/>
                      4 to 50 caracteres.<br/>
                      Deben empezar con una letra.<br/>
                    </p>
                </div>

                <div>
                    <label htmlFor="last_name" className='text-lg font-medium'>
                      Apellido(s):
                      <span className={validLastName ? "valid" : "hidden"}>
                        <FontAwesomeIcon icon={faCheck}/>
                      </span>
                      <span className={validLastName || !lastName ? "hidden" : 
                      "invalid"}>
                        <FontAwesomeIcon icon={faTimes}/>
                      </span>
                    </label>
                    <input
                      id="last_name"
                      name="last_name"
                      //ref={userRef}
                      autoComplete="off"
                      onChange={handleChange}
                      required
                      aria-invalid={validName ? "false" : "true"}
                      aria-describedby="uidnote"
                      onFocus={() => setLastNameFocus(true)}
                      onBlur={() => setLastNameFocus(false)}
                      className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                      placeholder='Ingresa tus apellidos'
                    />
                    <p id="uidnote" className={lastNameFocus && lastName && !validLastName ? "instructions" : "hidden"}>
                      <FontAwesomeIcon icon={faInfoCircle}/>
                      4 to 50 caracteres.<br/>
                      Deben empezar con una letra.<br/>
                    </p>
                </div>

                

                {/*<div>
                    <label className='text-lg font-medium'>Correo</label>
                    <input
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder='Ingresa tu correo'
                        type='email'

                    />
                    </div>*/}

                <div>
                    <label htmlFor="email" className='text-lg font-medium'>
                        Correo electronico:
                        <span className={validEmail ? "valid" : "hidden"}>
                          <FontAwesomeIcon icon={faCheck}/>
                        </span>
                        <span className={validEmail || !email ? "hidden" : 
                        "invalid"}>
                          <FontAwesomeIcon icon={faTimes}/>
                        </span>
                    </label>
                    <input

                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder='Ingresa tu correo electronico'
                        type='email'
                        id="email"
                        name="email"
                        onChange={handleChange}
                        required
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setEmailFocus(true)}
                        onBlur={() => setEmailFocus(false)}
                    />
                    <p id="pwdnote" className={emailFocus && !validEmail ? "instructions" : "hidden"}>
                      <FontAwesomeIcon icon={faInfoCircle}/>
                      De 8 a 200 caracteres.<br/>
                      Debe contener:
                      <span aria-label="at symbol">@</span>
                      
                    </p>
                </div>      

                <div>
                    <label htmlFor="password" className='text-lg font-medium'>
                        Contraseña:
                        <span className={validPwd ? "valid" : "hidden"}>
                          <FontAwesomeIcon icon={faCheck}/>
                        </span>
                        <span className={validPwd || !pwd ? "hidden" : 
                        "invalid"}>
                          <FontAwesomeIcon icon={faTimes}/>
                        </span>
                    </label>
                    <input

                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder='Ingresa tu contraseña'
                        type='password'
                        id="password"
                        name="password"
                        onChange={handleChange}
                        required
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                    />
                    <p id="pwdnote" className={pwdFocus && !validPwd ? "instructions" : "hidden"}>
                      <FontAwesomeIcon icon={faInfoCircle}/>
                      De 8 a 24 caracteres.<br/>
                      Debe contener mayúsculas y minúsculas, numeros y <br/>
                      caracteres especiales.<br/>
                      Caracteres especiales permitidos:
                      <span aria-label="exclamation mark">!</span>
                      <span aria-label="at symbol">@</span>
                      <span aria-label="dollar sign">$</span>
                      <span aria-label="percent">%</span>
                      <span aria-label="bajo">-</span>
                    </p>
                </div>

                    
                <div>
                    <label htmlFor="confirm_pwd" className='text-lg font-medium'>
                        Confirmar contraseña:
                        <span className={validMatch && matchPwd  ? "valid" : "hidden"}>
                          <FontAwesomeIcon icon={faCheck}/>
                        </span>
                        <span className={validMatch || !matchPwd ? "hidden" : 
                        "invalid"}>
                          <FontAwesomeIcon icon={faTimes}/>
                        </span>
                    </label>
                    <input
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder='Confirma tu contraseña'
                        type='password'
                        id="password2"
                        name="password2"
                        onChange={handleChange}
                        required
                        aria-invalid={validPwd ? "false" : "true"}
                        aria-describedby="confirmnote"
                        onFocus={() => setMatchFocus(true)}
                        onBlur={() => setMatchFocus(false)}
                    />
                    <p id="confirmnote" className={matchFocus && !validMatch ? "instructions" : "hidden"}>
                      <FontAwesomeIcon icon={faInfoCircle}/>
                      Debe coincidir con la primer contraseña.<br/>
                      
                      
                    </p>
                </div>    

                
                <div className='mt-8 flex flex-col gap-y-4'>
                  
                    <button 
                    type="submit"
                    
                    className=' hover:scale-[1.02] easy-in-out transition-all  py-3 rounded-xl bg-green-500 text-white text-lg font-bold'>Registrarse</button>
                  
                </div>
        </div>
      </form>
      <div className='mt-8 flex justify-center items-center'>
                    <p className='font-medium text-base'>¿Ya tienes cuenta?</p>
                    <button className='text-green-500 text-base font-medium ml-2'>Iniciar sesion</button>
                </div>
    </section>
    )}
    </>
  )
}
