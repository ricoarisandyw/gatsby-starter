import * as React from "react"
import "../css/styles.css"
import "bootstrap/dist/css/bootstrap-grid.min.css"
import "aos/dist/aos.css"
import AOS from "aos"
import Layout from "../components/core/Layout"
import Home from "../components/home/Home"
import Features from "../components/home/Features"
import CTA from "../components/home/CTA"

const IndexPage: React.FC = () => {
  return (
    <Layout>
      <Home />
      <Features />
      <CTA />
    </Layout>
  )
}

export default IndexPage
