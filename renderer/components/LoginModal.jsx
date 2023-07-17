import React from 'react';
import { FaTimes } from 'react-icons/fa';
import Link from 'next/link';

function LoginModal({toggleModal}) {
  return (
    <React.Fragment>
      <section className='flex flex-col items-center justify-center fixed top-0 left-0 right-0 bottom-0 bg-black/40 z-50'>
        <form style={{minWidth: '40%', maxWidth: '90%'}} className='relative conatiner bg-white py-6 px-4 rounded-md'>
          <span onClick={toggleModal} className='cursor-pointer hover:opacity-80 duration-300 block absolute top-0 right-0 p-1.5 text-xl'>
            <FaTimes />
          </span>
          <h2 className='text-base md:text-xl font-bold mb-4'>
            Login with Admin details
          </h2>
          <div className='block mt-4'>
            <label htmlFor='username' className='inline-block cursor-pointer mb-2'>
              Admin Username
            </label>
            <input 
              id='username'
              className='w-full border border-gray-200 focus:border-gray-400 rounded-md outline-none px-4 py-2 focus:outline-none duration-300'
              type='text'
              placeholder='username'
              name='username' 
            />
          </div>
          <div className='block mt-4'>
            <label htmlFor='password' className='inline-block cursor-pointer mb-2'>
              Admin Password
            </label>
            <input 
              id='password'
              className='w-full border border-gray-200 focus:border-gray-400 rounded-md outline-none px-4 py-2 focus:outline-none duration-300'
              type='password'
              placeholder='password'
              name='password' 
            />
          </div>
          <Link href='dashboard'>
            <button className='mt-4 inline-block px-10 py-2 bg-blue-600 rounded-md text-white'>Login</button>
          </Link>
        </form>
      </section>
    </React.Fragment>
  );
};

export default LoginModal;