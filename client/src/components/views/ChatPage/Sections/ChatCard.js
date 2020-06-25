import React from "react";
import moment from "moment";
import { Comment, Tooltip, Avatar } from "antd";
import {Link, RichText, Date} from 'prismic-reactjs';
function ChatCard(props) {
//   console.log("props=>>>", props.createdAt);
   console.log("props=>>>", props);



  return (
    <div style={{ width: "100%" }}>
      <Comment
        author={props.sender.name}
        avatar={<Avatar src={props.sender.image} alt={props.sender.name} />}
        content={
          props.message.substring(0, 8) === "uploads/" ? (
            // this will be either video or image

            props.message.substring(
              props.message.length - 3,
              props.message.length
            ) === "mp4" ? (
              <video
                style={{ maxWidth: "200px" }}
                src={`/api/${
                  props.message
                }`}
                alt="video"
                type="video/mp4"
                controls
              />
            ) : (
              <img
                style={{ maxWidth: "200px" }}
                src={`/api/${
                  props.message
                }`}
                alt="img"
              />
            )
          ) : (
            <p>{props.message}</p>
          )
        }
        datetime={
          <Tooltip title={moment(props.createdAt).format("lll")}>
            <span>{moment(props.createdAt).fromNow()}</span>
          </Tooltip>
        }
      />
    </div>
  );
}

export default ChatCard;
