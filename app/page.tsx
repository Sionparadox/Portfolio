import React from 'react';

export default function Home() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100'>
      <div className='text-center'>
        <h1 className='mb-4 text-4xl font-bold text-gray-900'>
          안녕하세요! 👋
        </h1>
        <p className='mb-8 text-lg text-gray-600'>
          Tailwind CSS가 성공적으로 설정되었습니다!
        </p>
        <div className='space-x-4'>
          <button className='rounded-lg bg-blue-500 px-4 py-2 font-medium text-white transition duration-200 hover:bg-blue-600'>
            시작하기
          </button>
          <button className='rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-800 transition duration-200 hover:bg-gray-200'>
            더 알아보기
          </button>
        </div>
      </div>
    </div>
  );
}
