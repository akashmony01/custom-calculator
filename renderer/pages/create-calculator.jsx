import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

function CreateCalculator() {
  return (
    <React.Fragment>
      <Head>
        <title>Create Caqlculator</title>
      </Head>
      <section className='min-h-screen flex justify-center items-center py-10'>
        <div className='container max-w-screen-md'>
            <div className='flex justify-between gap-4'>
              <h1 htmlFor='calc' className='block text-xl md:text-2xl font-bold'>
                Create Calculator
              </h1>
              <Link href='home'>
                <a className='text-blue-600 underline'>Back to home</a>
              </Link>
            </div>
            <hr className='my-2' />


            <form className=''>
                <div className='block mt-4'>
                    <label htmlFor='cn' className='inline-block cursor-pointer mb-2'>
                        Calculator Name
                    </label>
                    <input 
                        id='cn'
                        className='w-full border border-gray-200 focus:border-gray-400 rounded-md outline-none px-4 py-2 focus:outline-none duration-300'
                        type='text'
                        placeholder='Calculator name'
                        name='cn' 
                    />
                </div>
                <div className='block mt-4'>
                    <label htmlFor='cd' className='inline-block cursor-pointer mb-2'>
                        Calculator Description
                    </label>
                    <textarea 
                        id='cd'
                        className='w-full border border-gray-200 focus:border-gray-400 rounded-md outline-none px-4 py-2 focus:outline-none duration-300'
                        placeholder='Calculator Description'
                        name='cd' 
                        rows={'4'}
                    ></textarea>
                </div>
                <h3 className='mt-4 font-bold'>
                    Calculator Inputs 
                </h3>
                <div className='block mt-4 bg-gray-200 rounded-md space-y-4 px-5 py-4'>
                    <div className='block'>
                        <label htmlFor='cn' className='inline-block cursor-pointer mb-2'>
                            Input Name
                        </label>
                        <input 
                            id='cn'
                            className='w-full border border-gray-200 focus:border-gray-400 rounded-md outline-none px-4 py-2 focus:outline-none duration-300'
                            type='text'
                            placeholder='Calculator name'
                            name='cn' 
                        />
                    </div>
                    <div className='block'>
                        <label htmlFor='cn' className='inline-block cursor-pointer mb-2'>
                            Variable Name
                        </label>
                        <input 
                            id='cn'
                            className='w-full border border-gray-200 focus:border-gray-400 rounded-md outline-none px-4 py-2 focus:outline-none duration-300'
                            type='text'
                            placeholder='Calculator name'
                            name='cn' 
                        />
                    </div>
                </div>
                <div className='block mt-4 bg-gray-200 rounded-md space-y-4 px-5 py-4'>
                    <div className='block'>
                        <label htmlFor='cn' className='inline-block cursor-pointer mb-2'>
                            Input Name
                        </label>
                        <input 
                            id='cn'
                            className='w-full border border-gray-200 focus:border-gray-400 rounded-md outline-none px-4 py-2 focus:outline-none duration-300'
                            type='text'
                            placeholder='Calculator name'
                            name='cn' 
                        />
                    </div>
                    <div className='block'>
                        <label htmlFor='cn' className='inline-block cursor-pointer mb-2'>
                            Variable Name
                        </label>
                        <input 
                            id='cn'
                            className='w-full border border-gray-200 focus:border-gray-400 rounded-md outline-none px-4 py-2 focus:outline-none duration-300'
                            type='text'
                            placeholder='Calculator name'
                            name='cn' 
                        />
                    </div>
                </div>
                <div className='mt-4'>
                    <button className='ml-auto block px-10 py-2 bg-blue-600 rounded-md text-white'>
                        Add Inputs
                    </button>
                </div>
                <h3 className='mt-4 font-bold'>
                    Calculator Outputs 
                </h3>
                <div className='block mt-4 bg-gray-200 rounded-md space-y-4 px-5 py-4'>
                    <div className='block'>
                        <label htmlFor='cn' className='inline-block cursor-pointer mb-2'>
                            Output Name
                        </label>
                        <input 
                            id='cn'
                            className='w-full border border-gray-200 focus:border-gray-400 rounded-md outline-none px-4 py-2 focus:outline-none duration-300'
                            type='text'
                            placeholder='Output name'
                            name='cn' 
                        />
                    </div>
                    <div className='block'>
                        <label htmlFor='cn' className='inline-block cursor-pointer mb-2'>
                            Output Expression
                        </label>
                        <textarea 
                            id='cd'
                            className='w-full border border-gray-200 focus:border-gray-400 rounded-md outline-none px-4 py-2 focus:outline-none duration-300'
                            placeholder='Outout Expression'
                            name='cd' 
                            rows={'4'}
                        ></textarea>
                    </div>
                </div>
                <div className='mt-4 flex items-center justify-between gap-4'>
                    <button className='px-10 py-2 bg-blue-600 rounded-md text-white'>
                        Save Draft
                    </button>
                    <button className='px-10 py-2 bg-green-600 rounded-md text-white'>
                        Publish Calculator
                    </button>
                </div>
            </form>
        </div>
      </section>
    </React.Fragment>
  );
};

export default CreateCalculator;