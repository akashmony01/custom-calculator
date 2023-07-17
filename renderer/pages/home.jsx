import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import LoginModal from '../components/LoginModal'
import { useState } from 'react';

function Home() {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(!showModal);
  };


  return (
    <React.Fragment>
      <Head>
        <title>Home - welcome to custom calculator</title>
      </Head>
      
      <section className='min-h-screen flex justify-center items-center'>
        <div className="container text-center">
          <p className='text-base md:text-lg mb-4'>
            Wellcome to the most
          </p>
          <h1 className='relative text-2xl md:text-4xl font-bold'>
            <span className='inline-block sticky z-10 bg-white px-2'>Customizeable Calculator</span>
            <span className='absolute top-2/4 block w-full h-px bg-gray-200 z-0' />
          </h1>
          <div className='mt-8 flex flex-wrap items-center justify-center gap-4'>
            <div className='toolTipParent relative inline-block text-white'>
              <button onClick={toggleModal} className='px-4 py-2 bg-blue-600 rounded-md'>
                Proceed as Admin
              </button>
              <div className='toolTipItem invisible mt-4 absolute top-full left-2/4 transform -translate-x-2/4 w-60 inline-block duration-300 opacity-0'>
                {/* <span className='block bg-gray-700' /> */}
                <div class="absolute -top-4 left-2/4 h-4 w-4 origin-bottom-left -translate-x-2/4 transform rotate-45 bg-gray-700"></div>
                <p className='px-2 py-2 rounded-md bg-gray-700 text-sm'>
                  Proceed as admin to create, delete, update calculators. You need to provide the secret password.
                </p>
              </div>
            </div>
            <div className='toolTipParent relative inline-block text-white'>
              <Link href="/calculator-list">
                <a className='block px-4 py-2 bg-green-600 text-white rounded-md'>
                  Go as General User
                </a>
              </Link>
              <div className='toolTipItem invisible mt-4 absolute top-full left-2/4 transform -translate-x-2/4 w-60 inline-block duration-300 opacity-0'>
                {/* <span className='block bg-gray-700' /> */}
                <div class="absolute -top-4 left-2/4 h-4 w-4 origin-bottom-left -translate-x-2/4 transform rotate-45 bg-gray-700"></div>
                <p className='px-2 py-2 rounded-md bg-gray-700 text-sm'>
                  Proceed as general user to use pre defined calculators and calculate.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {showModal &&
        <LoginModal toggleModal={toggleModal} />
      }
    
    </React.Fragment>
  );
};

export default Home;
