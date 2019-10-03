import * as React from "react"
import CommentMessageBox from "./CommentMessageBox"

interface CommentProp {
  comment_id?: string
}

const Comment: React.SFC<CommentProp> = ({ comment_id }) => {
  const commentURL = `https://artsy-blog-gh-commentify.herokuapp.com/repos/artsy/artsy.github.io/issues/${comment_id}/comments`

  function useFetch(url) {
    const [data, setData] = React.useState([])
    const [loading, setLoading] = React.useState(true)
    async function fetchUrl() {
      const response = await fetch(url)
      const json = await response.json()
      setData(json)
      setLoading(false)
    }
    React.useEffect(() => {
      fetchUrl()
    }, [])
    return [data, loading]
  }

  const [data, loading] = useFetch(commentURL)

  return (
    <>
      {comment_id && data[0] == null ? (
        <h2>
          This post has no comments, yet, you could be the first. Our comments
          are using GitHub Issues on the Artsy Blog repo. You can post by
          replying to{" "}
          <a
            href={`https://github.com/artsy/artsy.github.io/issues/${comment_id}`}
          >
            issues# {comment_id}
          </a>
        </h2>
      ) : comment_id ? (
        <h2>
          Our comments are using GitHub Issues on the Artsy Blog repo. You can
          post by replying to{" "}
          <a
            href={`https://github.com/artsy/artsy.github.io/issues/${comment_id}`}
          >
            issues# {comment_id}
          </a>
        </h2>
      ) : null}

      {comment_id
        ? loading
          ? "loading..."
          : data.map((singleData, index) => {
              return (
                <div key={index}>
                  <CommentMessageBox data={singleData} />
                </div>
              )
            })
        : null}
    </>
  )
}
export default Comment
