import { Link } from 'gatsby'
import * as React from 'react'
import '../../src/globalcss.css'


interface HeaderProps {
  siteTitle?: string
}


const Header: React.SFC<HeaderProps> = ({ siteTitle }) => (
  
<div
    style={{
      marginBottom: '1.45rem',
    }}
  >
      <ul
      style={{
        top : '30px'
      }}>
      
      <li><a href="https://developers.artsy.net/">API</a>
      </li>
      <li><a href="https://www.artsy.net/jobs">
      Career  </a>
      </li>
      <li><a href="https://twitter.com/artsyopensource">
      @ArtsyOpenSoucre  </a>
      </li>
      <li><a href="https://www.artsy.net">
      Artsy.net  </a>
      </li>
      <li>
      open source  
      </li>
      </ul>

      <div
      style={{
        margin: '0 auto',
        maxWidth: '40rem',
        padding: '1.45rem 1.0875rem',
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: 'Black',
            textDecoration: 'none',
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      
      </div>
  </div>
)

Header.defaultProps = {
  siteTitle: '',
}



export default Header
