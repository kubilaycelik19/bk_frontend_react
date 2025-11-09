// src/pages/RegisterPage.jsx
// Kayıt formunu ortalayan sayfa

import React from 'react';
import RegisterForm from '../components/RegisterForm';

function RegisterPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] py-12 px-4">
      <div className="max-w-md w-full">
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl border border-gray-100">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;

