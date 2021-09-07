import React from "react"
import Navbar from "./Navbar/Navbar"
import "./Layout.scss"

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="layout">{children}</div>
    </>
  )
}

export default Layout
