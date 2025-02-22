import React from 'react'
import MultistepForm from '@/components/form/multistep-form';
import AuthCheck from '@/components/auth/auth-check';

const GetStarted = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 sm:p-24 bg-[#0a0f18]">
      <AuthCheck routeIfAuthenticated={'/search'}/>
      <MultistepForm />
    </main>
  );
}

export default GetStarted