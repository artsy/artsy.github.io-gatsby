import { graphql, Link, StaticQuery } from "gatsby"
import React from "react"
import Header from "./header"

interface NeckProps {
  siteTitle?: string
}

const Neck: React.SFC<NeckProps> = ({ siteTitle }) => (
  <div
    style={{
      margin: "auto",
      maxWidth: "40rem",
      padding: "1.45rem 1.0875rem",
    }}
  >
    <h1 style={{ margin: 0 }}>
      <Link
        to="/"
        style={{
          color: "Black",
          textDecoration: "none",
        }}
      >
        {siteTitle}
      </Link>
    </h1>
  </div>
)

Header.defaultProps = { siteTitle: "" }

export default Neck
