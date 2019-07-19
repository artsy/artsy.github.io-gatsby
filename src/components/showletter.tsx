import * as React from 'react'

interface ShowletterProps{ 
    letter: string
}


export class Showletter extends React.Component<ShowletterProps,{}>{
    render(){
    const {letter} = this.props
    return(
        <div>
        <h1>{letter.charAt(0)}</h1>
        -----------------------------------------
        </div>
    )
    }
}
export default Showletter