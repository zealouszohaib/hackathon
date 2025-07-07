import React from 'react'
import { Outlet } from 'react-router'
import SideBar from '../SideBar'
import Header from '../Header'

function Layout() {
  return (
    <div className="d-flex vh-100 overflow-hidden">
      <div style={{ width: '250px' }}>
        <SideBar />
      </div>

      <div className="d-flex flex-column flex-grow-1 vh-100 overflow-hidden">
        <div>
          <Header />
        </div>

        <div className="overflow-auto p-4 scrollbar--custom">
          <Outlet />
        </div>
      </div>
    </div>

  //   <div className="flex flex-col min-h-screen">
  //   <h1>this is header</h1>
  //   {/* Main Content */}
  //   <main className="flex-grow">
  //     <Outlet />
  //   </main>

  //   <h1>this is footer</h1>
  // </div>

    
  )
}

export default Layout