import { graphql, Link, StaticQuery } from "gatsby"
import React, { ChangeEvent } from "react"

import ReactDOM from "react-dom"

const search = (query: string): ReadonlyArray<SearchResult> => {
  const { index, store } = window.__LUNR__ && window.__LUNR__.en

  return query ? index.search(query).map(({ ref }) => store[ref]) : []
}

interface LunrSearchProps {
  readonly limit?: number
}

interface LunrSearchState {
  readonly query: string
  readonly results: ReadonlyArray<SearchResult>
  readonly isActive: boolean
}

export class Search extends React.Component<LunrSearchProps, LunrSearchState> {
  public readonly state: LunrSearchState = {
    isActive: false,
    query: "",
    results: [],
  }

  readonly handleSearch = (event: ChangeEvent<{ readonly value: string }>) => {
    const query = event.target.value
    const results = search(query)
    this.setState(() => ({ results, query, isActive: true }))
  }

  readonly handleClickOutside = (ev: Event) => {
    const element = ReactDOM.findDOMNode(this)
    const isActive =
      !!this.state.query && !!element && element.contains(ev.target as Node)
    this.setState(() => ({ isActive }))
  }

  componentDidMount() {
    document.addEventListener("click", this.handleClickOutside, true)
  }

  componentWillUnmount() {
    document.removeEventListener("click", this.handleClickOutside, true)
  }

  render() {
    const { limit } = this.props
    const count = this.state.results.length

    return (
      <div>
        <label>
          <span>Search</span>
          <input
            type="search"
            value={this.state.query}
            onChange={this.handleSearch}
          />
        </label>
        {this.state.isActive ? (
          <ul>
            {this.state.results.slice(0, limit).map((result, index) => (
              <li key={index}>
                <Link to={result.title}>
                  {result.title}
                  <br />
                </Link>
              </li>
            ))}
            <li>
              Showing {limit ? `${Math.min(limit, count)} of` : null} {count}{" "}
              {count === 1 ? "result" : "results"}.
            </li>
          </ul>
        ) : null}
      </div>
    )
  }
}
