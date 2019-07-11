import { graphql, Link } from 'gatsby'
import * as React from 'react'
import Layout from '../components/layout'



interface CategoriesPageProps {
  readonly data : {
    readonly allMarkdownRemark :{
      readonly group : [{
        readonly fieldValue : string
        readonly totalCount : number
      }]
    }
  }
}
  
  class CategoriesPage extends React.Component<CategoriesPageProps, {}> {
    render() {
        const {data} = this.props
        const amd = data.allMarkdownRemark
       
        
      return (
        <div>
        
        <Layout>
        <h3>Categorie we have :</h3>
        <ul>
          {amd.group.map(cateSingle => (
            <li key={cateSingle.fieldValue}>
            {cateSingle.fieldValue} :  {cateSingle.totalCount} 
            <br/>
            </li>
          )
            )}
        
        </ul>
        </Layout>
        </div>
      )
    }
  }
  
  export default CategoriesPage
  
  export const pageQuery = graphql`
    query {
     allMarkdownRemark{
       group(field: frontmatter___categories){
         fieldValue
         totalCount
       }
     }
    }
  `