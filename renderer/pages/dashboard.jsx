import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

function Dashboard() {
  return (
    <React.Fragment>
      <Head>
        <title>Admin: Dashboard</title>
      </Head>
      <section className='py-4'>
        <div className='container'>
          <div className='bg-gray-200 rounded-md px-5 py-3 flex justify-between items-center gap-4'>
            <label htmlFor='calc' className='block text-lg md:text-xl font-bold'>
              Admin Dashboard
            </label>
            <Link href='/create-calculator'>
              <a className='px-4 py-2 rounded-md bg-blue-600 text-white'>Create New Calculator</a>
            </Link>
            <Link href='home'>
              <a className='text-blue-600 underline'>Back to home</a>
            </Link>
          </div>
          <div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='activeCalc'>
              <h3 className='text-base md:text-lg font-bold'>
                Active Calculators:
              </h3>
              <hr className='my-2' />
              <ul className='space-y-4 pt-2'>
                <li className='bg-gray-100 px-3 py-2 rounded-md hover:bg-blue-400/20 duration-300 cursor-pointer'>
                  <div className='flex items-center justify-between gap-4'>
                      <a href="">
                        Calculator one
                      </a>
                      <div className='flex gap-2'>
                        <Link href='edit-calculator'>
                          <a className='text-red-500 underline'>Edit</a>
                        </Link>
                        <Link href='calculator-list' >
                          <a className='text-blue-500 underline'>Test</a>
                        </Link>
                      </div>
                  </div>
                  <hr className='mt-2' />
                  <p className='text-sm opacity-70'>
                    Culpa pariatur proident dolor occaecat deserunt cillum.
                  </p>
                </li>
                <li className='bg-gray-100 px-3 py-2 rounded-md hover:bg-blue-400/20 duration-300 cursor-pointer'>
                  <div className='flex items-center justify-between gap-4'>
                      <a href="">
                        Calculator Two
                      </a>
                      <div className='flex gap-2'>
                        <Link href='edit-calculator'>
                          <a className='text-red-500 underline'>Edit</a>
                        </Link>
                        <Link href='calculator-list' >
                          <a className='text-blue-500 underline'>Test</a>
                        </Link>
                      </div>
                  </div>
                  <hr className='mt-2' />
                  <p className='text-sm opacity-70'>
                    Quis irure laborum id excepteur consequat laborum amet aute laborum reprehenderit laboris exercitation amet consequat.
                  </p>
                </li>
                <li className='bg-gray-100 px-3 py-2 rounded-md hover:bg-blue-400/20 duration-300 cursor-pointer'>
                  <div className='flex items-center justify-between gap-4'>
                      <a href="">
                        Calculator Three
                      </a>
                      <div className='flex gap-2'>
                        <Link href='edit-calculator'>
                          <a className='text-red-500 underline'>Edit</a>
                        </Link>
                        <Link href='calculator-list' >
                          <a className='text-blue-500 underline'>Test</a>
                        </Link>
                      </div>
                  </div>
                  <hr className='mt-2' />
                  <p className='text-sm opacity-70'>
                    Cupidatat sunt labore aliquip labore occaecat quis dolor deserunt mollit magna sit aliqua sunt.
                  </p>
                </li>
                <li className='bg-gray-100 px-3 py-2 rounded-md hover:bg-blue-400/20 duration-300 cursor-pointer'>
                  <div className='flex items-center justify-between gap-4'>
                      <a href="">
                        Calculator Four
                      </a>
                      <div className='flex gap-2'>
                        <Link href='edit-calculator'>
                          <a className='text-red-500 underline'>Edit</a>
                        </Link>
                        <Link href='calculator-list' >
                          <a className='text-blue-500 underline'>Test</a>
                        </Link>
                      </div>
                  </div>
                  <hr className='mt-2' />
                  <p className='text-sm opacity-70'>
                    Sint elit elit excepteur proident cupidatat fugiat commodo.
                  </p>
                </li>
              </ul>
            </div>
            <div className='draftCalc'>
              <h3 className='text-base md:text-lg font-bold'>
                Draft Calculators:
              </h3>
              <hr className='my-2' />
              <ul className='space-y-4 pt-2'>
                <li className='bg-gray-100 px-3 py-2 rounded-md hover:bg-blue-400/20 duration-300 cursor-pointer'>
                  <div className='flex items-center justify-between gap-4'>
                      <a href="">
                        Calculator one
                      </a>
                      <div className='flex gap-2'>
                        <Link href='edit-calculator'>
                          <a className='text-red-500 underline'>Edit</a>
                        </Link>
                        <Link href='calculator-list' >
                          <a className='text-blue-500 underline'>Test</a>
                        </Link>
                      </div>
                  </div>
                  <hr className='mt-2' />
                  <p className='text-sm opacity-70'>
                    Culpa pariatur proident dolor occaecat deserunt cillum.
                  </p>
                </li>
                <li className='bg-gray-100 px-3 py-2 rounded-md hover:bg-blue-400/20 duration-300 cursor-pointer'>
                  <div className='flex items-center justify-between gap-4'>
                      <a href="">
                        Calculator Two
                      </a>
                      <div className='flex gap-2'>
                        <Link href='edit-calculator'>
                          <a className='text-red-500 underline'>Edit</a>
                        </Link>
                        <Link href='calculator-list' >
                          <a className='text-blue-500 underline'>Test</a>
                        </Link>
                      </div>
                  </div>
                  <hr className='mt-2' />
                  <p className='text-sm opacity-70'>
                    Quis irure laborum id excepteur consequat laborum amet aute laborum reprehenderit laboris exercitation amet consequat.
                  </p>
                </li>
                <li className='bg-gray-100 px-3 py-2 rounded-md hover:bg-blue-400/20 duration-300 cursor-pointer'>
                  <div className='flex items-center justify-between gap-4'>
                      <a href="">
                        Calculator Three
                      </a>
                      <div className='flex gap-2'>
                        <Link href='edit-calculator'>
                          <a className='text-red-500 underline'>Edit</a>
                        </Link>
                        <Link href='calculator-list' >
                          <a className='text-blue-500 underline'>Test</a>
                        </Link>
                      </div>
                  </div>
                  <hr className='mt-2' />
                  <p className='text-sm opacity-70'>
                    Cupidatat sunt labore aliquip labore occaecat quis dolor deserunt mollit magna sit aliqua sunt.
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      {/* <div>
        <p>
          ⚡ Electron + Next.js ⚡ -
          <Link href="/home">
            <a>Go to home page</a>
          </Link>
        </p>
      </div> */}
    </React.Fragment>
  );
};

export default Dashboard;
