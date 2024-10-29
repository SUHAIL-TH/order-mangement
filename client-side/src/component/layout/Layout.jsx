import React from 'react'
import Naavbar from '../Fallback/Navbar'
function Layout({children}) {
  return (
    <div>
    <Naavbar />
    <main>
      {children}  {/* Render the child components/pages here */}
    </main>
  </div>
  )
}

export default Layout