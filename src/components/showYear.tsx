import * as React from "react"

interface showYearProps {
  year: string
}

export class showYear extends React.Component<showYearProps, {}> {
  render() {
    const { year } = this.props
    return (
      <div>
        <h1>{year}</h1>
        {/* pretend there is a beautiful line */}
        -----------------------------------------
      </div>
    )
  }
}
export default showYear
