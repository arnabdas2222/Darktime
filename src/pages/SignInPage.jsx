import React from 'react';
import { AuthForm } from '../components/AuthForm';

export const SignInPage = () => {
  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16">
      <AuthForm mode="signin" />
    </div>
  );
};
