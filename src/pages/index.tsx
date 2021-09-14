import * as React from "react"
import "../css/styles.css"
import "../css/slick.scss"
import "bootstrap/dist/css/bootstrap-grid.min.css"
import "aos/dist/aos.css"
import AOS from "aos"
import Layout from "../components/core/Layout"
import Home from "../components/home/Home"
import Features from "../components/home/Features"
import Info from "../components/home/Info"
import Portofolio from "../components/home/Portofolio"
import Team from "../components/home/Team"
import Listening from "../components/home/Listening"

const IndexPage: React.FC = () => {
  React.useEffect(() => {
    AOS.init()
  }, [])

  return (
    <Layout>
      <Home />
      <Features />
      <Info />
      <Portofolio />
      <Team />
      <Listening />
    </Layout>
  )
}

export default IndexPage
