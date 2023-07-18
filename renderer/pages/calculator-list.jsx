import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

function CalculatorList() {
  return (
    <React.Fragment>
      <Head>
        <title>Next - Nextron (with-javascript)</title>
      </Head>
      <section className='min-h-screen flex justify-center items-center'>
        <div className='container max-w-screen-md'>
          <div className=''>
            <div className='flex justify-between'>
              <label htmlFor='calc' className='block text-lg md:text-xl font-bold mb-3'>
                Selecet A calculator to use:
              </label>
              <Link href='/'>
                <a className='text-blue-600 underline'>Back to home</a>
              </Link>
            </div>
            <select id='calc' name='calc' className='w-full border cursor-pointer rounded-md bg-transparent py-3 px-4'>
              <option value={""}>
                -- Select a calculator --
              </option>
              <option value={"1"}>
                Tax Calculator
              </option>
              <option value={"2"}>
                Age Calculator
              </option>
              <option value={"3"}>
                BMI Calculator
              </option>
              <option value={"4"}>
                Another Calculator
              </option>
            </select>
            <hr className='mt-4' />
          </div>
          <div className='mt-4'>
            {/* <p className='opacity-80'>
              No calculator choosen yet, Choose one to use.
            </p> */}
            <form className=''>
              <h4 className='text-lg md:text-xl font-bold'>
                Choosen Calculator is BMI Calculator
              </h4>
              <div className='block mt-4'>
                <label htmlFor='inp1' className='inline-block cursor-pointer mb-2'>
                  Input One
                </label>
                <input 
                  id='inp1'
                  className='w-full border border-gray-200 focus:border-gray-400 rounded-md outline-none px-4 py-2 focus:outline-none duration-300'
                  type='number'
                  placeholder='input one'
                  name='inp1' 
                />
              </div>
              <div className='block mt-4'>
                <label htmlFor='inp1' className='inline-block cursor-pointer mb-2'>
                  Input Two
                </label>
                <input 
                  id='inp1'
                  className='w-full border border-gray-200 focus:border-gray-400 rounded-md outline-none px-4 py-2 focus:outline-none duration-300'
                  type='number'
                  placeholder='input two'
                  name='inp1' 
                />
              </div>
              <div className='block mt-4'>
                <label htmlFor='inp1' className='inline-block cursor-pointer mb-2'>
                  Input Three
                </label>
                <input 
                  id='inp1'
                  className='w-full border border-gray-200 focus:border-gray-400 rounded-md outline-none px-4 py-2 focus:outline-none duration-300'
                  type='number'
                  placeholder='input three'
                  name='inp1' 
                />
              </div>
              <div className='mt-4'>
                <button className='w-full px-10 py-2 bg-blue-600 rounded-md text-white'>
                  Calculate
                </button>
              </div>
              <div className='mt-8'>
                <div className='relative flex items-center gap-4 justify-between'>
                  <span className='absolute top-2/4 block w-full h-px bg-gray-200 z-0' />
                  <p className='z-10 bg-white pr-4 font-medium text-lg'>
                    Output one result is: 
                  </p>
                  <p className='z-10 bg-white pl-4 font-medium text-lg'>
                    4655
                  </p>
                </div>
              </div>
            </form>
          </div>  
        </div>
      </section>
    </React.Fragment>
  );
};

export default CalculatorList;