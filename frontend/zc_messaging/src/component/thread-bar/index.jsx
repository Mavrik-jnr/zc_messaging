import React, { useContext } from "react"
import { FiX } from "react-icons/fi"
import { useNavigate, useParams, t } from "react-router"
import { Link } from "react-router-dom"
import { MessageBoard, getSampleMessages } from "@zuri/ui"
import { ThreadBar, ThreadBarHeader, ThreadBarContent } from "./ThreadBar.style"
import { messageContext } from "../../pages/message-board"

const Thread = () => {
  const data = useContext(messageContext)
  const navigate = useNavigate()
  const params = useParams()
  return (
    <ThreadBar>
      <ThreadBarHeader>
        <span>
          <h4>Thread</h4>
          <h5>Announcement</h5>
        </span>
        <span>
          <Link to={`/${params.roomId || ""}`}>
            <FiX stroke="white" size={18} />
          </Link>
        </span>
      </ThreadBarHeader>
      <ThreadBarContent>
        <MessageBoard messages={data} />
      </ThreadBarContent>
    </ThreadBar>
  )
}

export default Thread
