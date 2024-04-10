'use client';
import Image from 'next/image';
import React, { useState } from 'react';
import nbcIcon from '@/assets/image/scc-og.jpg';

const RegisterPage = () => {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
    passwordCheck: '',
    track: '',
    admin: false,
    recommend: '',
  });

  const inputHandler = (e: any) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };
  const inputCheckHandler = (e: any) => {
    console.log(e);
    setInputs({ ...inputs, [e.target.name]: e.target.checked });
  };

  const cancelRegister = () => {
    setInputs({
      name: '',
      email: '',
      password: '',
      passwordCheck: '',
      track: '',
      admin: false,
      recommend: '',
    });
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    console.log(inputs);
    alert('회원가입 성공');
  };

  return (
    <div className='flex justify-center items-center h-screen'>
      <div>
        <Image src={nbcIcon} alt='이미지' width={800} height={400} />
      </div>
      <form
        className='flex flex-col gap-2 justify-center items-center w-[800px]'
        onSubmit={submitHandler}
      >
        <input
          type='text'
          name='name'
          value={inputs.name}
          placeholder='name'
          className='regis-input'
          onChange={inputHandler}
        />
        <input
          type='text'
          name='email'
          value={inputs.email}
          placeholder='email'
          className='regis-input'
          onChange={inputHandler}
        />
        <input
          type='text'
          name='password'
          value={inputs.password}
          placeholder='password'
          className='regis-input'
          onChange={inputHandler}
        />
        <input
          type='text'
          name='passwordCheck'
          value={inputs.passwordCheck}
          placeholder='passwordCheck'
          className='regis-input'
          onChange={inputHandler}
        />
        <select name='track' onChange={inputHandler} value={inputs.track}>
          <option defaultValue={'트랙선택'}>트랙선택</option>
          <option value='react3기'>리액트3기</option>
          <option value='spring'>스프링3기</option>
        </select>
        <div>
          <label htmlFor='adminCheck'>관리자이신가요?</label>
          <input
            type='checkbox'
            id='adminCheck'
            name='admin'
            checked={inputs.admin}
            placeholder='adminCheck'
            onChange={inputCheckHandler}
          />
        </div>
        <input
          type='text'
          name='recommend'
          value={inputs.recommend}
          placeholder='추천인 email'
          className='regis-input'
          onChange={inputHandler}
        />
        <div>
          <button className='regis-button mr-2'>회원가입</button>
          <button
            type='button'
            className='regis-button'
            onClick={cancelRegister}
          >
            취소
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterPage;
