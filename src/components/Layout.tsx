import React from 'react'
import { Outlet } from 'react-router-dom'

import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppWidget from './WhatsAppWidget'
import ScrollHint from './ScrollHint'

function Layout() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-amber-50/30 via-orange-50/20 to-white">
      <Navbar />

      <main className="flex-grow max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8">
        <Outlet />
      </main>

      <Footer />
      <ScrollHint />
      <WhatsAppWidget />
    </div>
  )
}

export default Layout

