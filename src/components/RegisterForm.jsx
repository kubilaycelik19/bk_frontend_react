// src/components/RegisterForm.jsx

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import toast from 'react-hot-toast';

function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (event) => {
    event.preventDefault();
    
    setError(null);
    setLoading(true);

    try {
      const result = await register(email, password, firstName, lastName);
      
      if (result === true) {
        toast.success('Kayıt başarılı! Giriş sayfasına yönlendiriliyorsunuz...');
        setTimeout(() => {
          navigate('/login');
        }, 1500);
      } else {
        const errorMessage = result?.error?.message || 
                            result?.error?.detail || 
                            'Kayıt olunamadı. Lütfen bilgilerinizi kontrol edin.';
        setError(errorMessage);
        toast.error(errorMessage);
      }
    } catch (err) {
      const errorMessage = err?.error?.message || 
                          err?.message || 
                          'Bir hata oluştu. Lütfen tekrar deneyin.';
      setError(errorMessage);
      toast.error(errorMessage);
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="w-full">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2">
          Kayıt Ol
        </h1>
        <p className="text-gray-600 text-sm">Hesap oluşturarak randevu alabilirsiniz</p>
      </div>
      
      <form onSubmit={handleRegister} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="firstName">
              Ad
            </label>
            <input 
              id="firstName"
              type="text"
              required
              value={firstName}
              placeholder="Adınız"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              onChange={(e) => setFirstName(e.target.value)}
              disabled={loading}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="lastName">
              Soyad
            </label>
            <input 
              id="lastName"
              type="text"
              required
              value={lastName}
              placeholder="Soyadınız"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              onChange={(e) => setLastName(e.target.value)}
              disabled={loading}
            />
          </div>
        </div>

        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="email">
            E-posta Adresi
          </label>
          <input 
            id="email"
            type="email"
            required
            value={email}
            placeholder="ornek@email.com"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>
        
        <div>
          <label className="block text-gray-700 text-sm font-semibold mb-2" htmlFor="password">
            Şifre
          </label>
          <input 
            id="password"
            type="password"
            required
            value={password}
            placeholder="••••••••"
            minLength={8}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
          <p className="text-gray-500 text-xs mt-1">Şifre en az 8 karakter olmalıdır</p>
        </div>
        
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg">
            <p className="text-red-700 text-sm font-medium">{error}</p>
          </div>
        )}
        
        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed disabled:transform-none"
        >
          {loading ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Kayıt yapılıyor...
            </span>
          ) : (
            'Kayıt Ol'
          )}
        </button>

        <div className="text-center mt-4">
          <p className="text-gray-600 text-sm">
            Zaten hesabınız var mı?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-800 font-semibold">
              Giriş Yapın
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;

