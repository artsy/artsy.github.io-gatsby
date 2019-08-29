import { graphql, Link, StaticQuery } from "gatsby"
import * as React from "react"
import Header from "./header"
import Neck from "./neck"
import { Search } from "./search"

const Layout: React.SFC = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
      <>
        <Neck siteTitle={data.site.siteMetadata.title} />
        <Header />
        <Search />

        <div
          style={{
            margin: "0 auto",
            maxWidth: "55rem",
            padding: "0px 1.0875rem 1.45rem",
            paddingTop: 0,
          }}
        >
          <h2>
            <Link to="/Categories">categories page! </Link>
            <br />
            <Link to="/Archives">archives page!</Link>
          </h2>
          {children}
        </div>
      </>
    )}
  />
)

export default Layout
