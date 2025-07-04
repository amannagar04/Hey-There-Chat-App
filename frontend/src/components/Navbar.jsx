import React from 'react'
import { useAuthStore } from '../store/useAuthStore.js'

const Navbar = () => {
  const {authUser} = useAuthStore();

  return (
    <div className="w-full p-4 bg-amber-600 text-white font-mono text-center shadow-md">
  <h1 className="text-2xl md:text-3xl font-semibold">
    Welcome, {authUser.fullName}!
  </h1>
</div>

  )
}

export default Navbar
