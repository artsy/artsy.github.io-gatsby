import * as React from 'react'
import '../../src/globalcss.css'

const Header: React.SFC = ({}) => (
  <div
    style={{
      marginBottom: '1.45rem',
    }}
  >
    <ul
      style={{
        top: '30px',
      }}
    >
      <li>
        <a href="https://developers.artsy.net/">API</a>
      </li>
      <li>
        <a href="https://www.artsy.net/jobs">Career </a>
      </li>
      <li>
        <a href="https://twitter.com/artsyopensource">@ArtsyOpenSoucre </a>
      </li>
      <li>
        <a href="https://www.artsy.net">Artsy.net </a>
      </li>
      <li>open source</li>
    </ul>
  </div>
)

export default Header
