import React, { useEffect, useState } from "react"
import { CommentBoard } from "@zuri/ui"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { useGetRoomsAvailableToUserQuery } from "../../redux/services/rooms"
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
  const authUser = useSelector(state => state.authUser)
  const reactHandler = (event, emojiObject, messageId) => {
    const currentUserId = authUser?.user_id
    const newMessages = [...roomMessages]
    const currentWorkspaceId = localStorage.getItem("currentWorkspace")
    const { roomId } = useParams()
    const [pageTitle, setPageTitle] = useState("")
    const [roomName, setRoomName] = useState("unknown-thread")

    const { data: roomsAvailable, isLoading: IsLoadingRoomsAvailable } =
      useGetRoomsAvailableToUserQuery(
        {
          orgId: currentWorkspaceId,
          userId: authUser.user_id
        },
        {
          skip: Boolean(!authUser.user_id),
          refetchOnMountOrArgChange: true
        }
      )

    useEffect(() => {
      if (roomsAvailable) {
        const room = roomsAvailable[roomId]
        setRoomName(room?.room_name)
        setPageTitle(generatePageTitle(room?.room_name))
      }
    }, [roomId, roomsAvailable])

    console.log("This is room ", roomName, page)
    // if message_id is not undefined then it's coming from already rendered emoji in message container

    const emoji = emojiObject.character
    const newEmojiName = emojiObject.unicodeName || emojiObject.name
    const messageIndex = newMessages.findIndex(
      message => message._id === messageId
    )

    if (messageIndex < 0) {
      return
    }

    const message = newMessages[messageIndex]
    const emojiIndex = message.emojis.findIndex(
      emoji => emoji.name.toLowerCase() === newEmojiName.toLowerCase()
    )

    if (emojiIndex >= 0) {
      //the emoji exists in the message
      const reactedUsersId = message.emojis[emojiIndex].reactedUsersId
      const reactedUserIdIndex = reactedUsersId.findIndex(
        id => id === currentUserId
      )
      if (reactedUserIdIndex >= 0) {
        // the current user has reacted with this emoji before
        // now, if the user is the only person that has reacted, then the emoji
        // should be removed entirely.
        if (message.emojis[emojiIndex].count <= 1) {
          let emojisArray = message.emojis.filter(
            emoji => emoji.name.toLowerCase() !== newEmojiName.toLowerCase()
          )
          let updatedMessage = {
            ...message,
            emojis: emojisArray,
            edited: true,
            message_id: messageId
          }
          updateMessage({
            orgId: currentWorkspaceId,
            roomId,
            sender: {
              sender_id: authUser?.user_id,
              sender_name: authUser?.user_name,
              sender_image_url: authUser?.user_image_url
            },
            messageData: { ...updatedMessage },
            messageId: updatedMessage._id
          })
          // message.emojis.splice(emojiIndex, 1)
        } else {
          message.emojis[emojiIndex].reactedUsersId.splice(reactedUserIdIndex)
          message.emojis[emojiIndex].count =
            message.emojis[emojiIndex].count - 1
        }
      } else {
        // the user has not reacted and will now be added to the list and count incremented

        message.emojis[emojiIndex].reactedUsersId = [
          ...message.emojis[emojiIndex].reactedUsersId,
          currentUserId
        ]
        // message.emojis[emojiIndex].count = message.emojis[emojiIndex].count + 1
      }
    } else {
      // the emoji does not exist
      // create the emoji object and push

      const newEmojiObject = {
        name: newEmojiName,
        count: 1,
        emoji: emoji,
        reactedUsersId: [currentUserId]
      }
      let emojisArray = [...message.emojis, newEmojiObject]
      let updatedMessage = {
        ...message,
        emojis: emojisArray,
        edited: true,
        message_id: messageId
      }

      updateMessage({
        orgId: currentWorkspaceId,
        roomId,
        sender: {
          sender_id: authUser?.user_id,
          sender_name: authUser?.user_name,
          sender_image_url: authUser?.user_image_url
        },
        messageData: { ...updatedMessage },
        messageId: updatedMessage._id
      })
    }

    return false
  }

  const SendAttachedFileHandler = file => {
    // do something with the file
  }

  return (
    <CommentBoard
      commentBoardConfig={{
        displayCommentBoard: true,
        onReact: { reactHandler },
        onSendAttachedFile: { SendAttachedFileHandler },
        currentUserId: authUser?.user_id,
        commentBoardHeader: "general"
      }}
      //   Messages={Messages}
    />
  )
}

export default CommentingBoard
