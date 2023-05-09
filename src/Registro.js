import FormRegister from "./componentes/formRegister";
import { useRef, useState, useEffect } from "react";
import { faCheck,faTimes,faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from 'react'
const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%&]).{8,24}$/;




const Registro = () => {
  const userRef =useRef();
  const errRef=useRef();


  const[user,setUser]=useState('');
  const[validName, setValidName]= useState(false);
  const[userFocus, setUserFocus]= useState(false);

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
  },[])

  useEffect(() =>{
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);  
  },[user])

  useEffect(() =>{
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match=pwd=== matchPwd;
    setValidMatch(match);  
  },[pwd, matchPwd])

  useEffect(() =>{
    setErrMsg('');
  },[user,pwd,matchPwd])

  const handleSubmit= async (e) =>{
    e.preventDefault();
    const v1=USER_REGEX.test(user);
    const v2=PWD_REGEX.test(pwd);
    if(!v1||!v2){
      setErrMsg("Entrada invalida");
      return;
    }
    console.log(user, pwd);
    setSuccess(true);
  }

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
                      ref={userRef}
                      autoComplete="off"
                      onChange={(e) => setUser(e.target.value)}
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
                {/*<div>
                    <label className='text-lg font-medium'>Correo</label>
                    <input
                        className='w-full border-2 border-gray-100 rounded-xl p-4 mt-1 bg-transparent'
                        placeholder='Ingresa tu correo'
                        type='email'

                    />
                    </div>*/}
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
                        onChange={(e) => setPassword(e.target.value)}
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
                        id="confirm_pwd"
                        onChange={(e) => setMatchPwd(e.target.value)}
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
                    disabled={!validName || !validPwd || !validMatch ? true : false}
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


export default Registro;
