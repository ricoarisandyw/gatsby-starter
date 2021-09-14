import React from "react"
import Navbar from "./Navbar/Navbar"
import "./Layout.scss"
import Footer from "./Footer/Footer"

const Layout: React.FC = ({ children }) => {
  return (
    <>
      <Navbar />
      <div className="layout">{children}</div>
      <Footer />
    </>
  )
}

export default Layout
