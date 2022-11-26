import React, { useEffect, useState } from "react"
import { CommentBoard } from "@zuri/ui"
import axios from "axios"

import { useParams } from "react-router-dom"
const BASE_URL = "https://chat.zuri.chat/api/v1"

// const [Messages, setMessages] = useState([])
// const orgId = localStorage.getItem("currentWorkspace")
// const { roomId } = useParams()
// let messageId = window.location.pathname.split("/").at(-1)

// const getThreadMessagesHandler = async (orgId, roomId) => {
//   //    let data = await getRoomMessagesHandler(orgId, roomId)
//   //    let messages = data.filter(message= message._id === )
//   try {
//     if (orgId && roomId) {
//       const getRoomMessagesResponse = await axios.get(
//         `${BASE_URL}/org/${orgId}/rooms/${roomId}/messages/${messageId}/threads`
//       )
//       return getRoomMessagesResponse.data
//     }
//     throw new Error("Invalid arguments")
//   } catch (error) {
//     console.error("error getting room messages", error)
//   }
// }

// useEffect(async () => {
//   try {
//     const data = await getThreadMessagesHandler(orgId, roomId)
//     setMessages(data)
//   } catch (err) {
//     console.error(err)
//   }
// }, [])
function CommentingBoard() {
  return (
    <CommentBoard
      commentBoardConfig={{ displayCommentBoard: true }}
      //   Messages={Messages}
    />
  )
}

export default CommentingBoard
