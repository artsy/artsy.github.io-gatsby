import * as React from "react"
import styled from "styled-components"

interface CommentMessageBoxProps {
  data: any
}

export const CommentMessageBox: React.SFC<CommentMessageBoxProps> = ({
  data,
}) => {
  const timeSince = time => {
    const seconds = Math.floor((new Date() - time) / 1000)
    let interval = Math.floor(seconds / 31536000)
    if (interval > 1) {
      return interval + " years"
    }
    interval = Math.floor(seconds / 2592000)
    if (interval > 1) {
      return interval + " months"
    }
    interval = Math.floor(seconds / 86400)
    if (interval > 1) {
      return interval + " days"
    }
    interval = Math.floor(seconds / 3600)
    if (interval > 1) {
      return interval + " hours"
    }
    interval = Math.floor(seconds / 60)
    if (interval > 1) {
      return interval + " minutes"
    }
    return Math.floor(seconds) + " seconds"
  }

  const time = new Date(data.created_at)

  const {
    user: { login: name, avatar_url: userAvatar, html_url: userLink },
  } = data

  const { body_html: content, reactions: reaction } = data

  const converter = content => {
    return { __html: content }
  }

  const addReactions = reactions => {
    let returnString = ""
    const emojiCode = {
      "+1":
        "<g-emoji alias='+1' fallback-src='https://assets-cdn.github.com/images/icons/emoji/unicode/1f44d.png' class='emoji'>👍</g-emoji>",
      "-1":
        "<g-emoji alias='-1' fallback-src='https://assets-cdn.github.com/images/icons/emoji/unicode/1f44e.png' class='emoji'>👎</g-emoji>",
      laugh:
        "<g-emoji alias='smile' fallback-src='https://assets-cdn.github.com/images/icons/emoji/unicode/1f604.png' class='emoji'>😄</g-emoji>",
      hooray:
        "<g-emoji alias='tada' fallback-src='https://assets-cdn.github.com/images/icons/emoji/unicode/1f389.png' class='emoji'>🎉</g-emoji>",
      confused:
        "<g-emoji alias='thinking_face' fallback-src='https://assets-cdn.github.com/images/icons/emoji/unicode/1f615.png' class='emoji'>😕</g-emoji>",
      heart:
        "<g-emoji alias='framed_picture' fallback-src='https://assets-cdn.github.com/images/icons/emoji/unicode/1f5bc.png' class='emoji'>🖼</g-emoji>",
    }
    if (reactions.total_count > 0) {
      returnString += "<div class='comment-reactions'>"
      for (var key in reactions) {
        if (reactions.hasOwnProperty(key)) {
          if (reactions[key] > 0 && key !== "total_count") {
            returnString += emojiCode[key] + reactions[key]
          }
        }
      }
      returnString += "</div>"
      return returnString
    } else {
      return "<div></div>"
    }
  }

  return (
    <>
      <Box id={"CommentBox"}>
        <Text>
          <a href={userLink}>
            <Avatar src={userAvatar} />
          </a>
          {name}: Commented {timeSince(time)} ago,
          <br />
          <p dangerouslySetInnerHTML={converter(content)} />
          <p dangerouslySetInnerHTML={converter(addReactions(reaction))} />
        </Text>
      </Box>
    </>
  )
}

const Text = styled.h2`
  font-size: 15px;
  text-align: left;
`

const Box = styled.div`
  margin-bottom: 50px;
`

const Avatar = styled.img`
  width: 8%;
  float: left;
  margin-right: 10px;
`

export default CommentMessageBox
