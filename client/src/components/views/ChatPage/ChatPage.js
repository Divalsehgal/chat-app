import React, { Component } from "react";
import { Row, Form, Col, Input, Button, Icon } from "antd";
import io from "socket.io-client";
import { connect } from "react-redux";
import moment from "moment";
import { getChats, postaftermessage } from "./../../../_actions/chatactions";
import ChatCard from "./Sections/ChatCard";
import Dropzone from "react-dropzone";
import Axios from "axios";
class ChatPage extends Component {
  state = {
    chatMessage: "",
  };
  componentDidMount() {
    let server = "https://7142e9316180.ngrok.io";
    this.props.dispatch(getChats());
    this.socket = io(server);

    this.socket.on("Output Chat Message", (messageFromBackEnd) => {
      this.props.dispatch(postaftermessage(messageFromBackEnd));
    });
  }
  componentDidUpdate() {
    this.messageEnd.scrollIntoView({behavior:"smooth"});
  }
  handleSearchchange = (e) => {
    this.setState({
      chatMessage: e.target.value,
    });
  };
  onDrop = (files) => {
    console.log(files);
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };
    formData.append("files", files[0]);
    Axios.post("/api/chat/uploadfiles", formData, config)
  };
  renderCards = () =>
    this.props.chat.chats &&
    this.props.chat.chats.map((chat) => <ChatCard key={chat._id} {...chat} />);
  submitChatMessage = (e) => {
    e.preventDefault();
    let chatMessage = this.state.chatMessage;
    let userId = this.props.user.userData._id;
    let userName = this.props.user.userData.name;
    let userImage = this.props.user.userData.image;
    let nowTime = moment();
    let type = "Text";

    this.socket.emit("Input Chat Message", {
      chatMessage,
      userId,
      userName,
      userImage,
      nowTime,
      type,
    });
    this.setState({ chatMessage: "" });
  };
  render() {
    return (
      <>
        <div>
          <p style={{ fontSize: "2rem", textAlign: "center" }}>
            React chat app
          </p>
        </div>

        <div
          style={{
            margin: "0 auto",
            maxWidth: "800px",
            padding: "1rem",
            overflow: "scrollY",
          }}
        >
          <div className="infinite-container">
            {this.props.chat.chats && <div>{this.renderCards()}</div>}
            <div
              ref={(el) => {
                this.messageEnd = el;
              }}
              style={{ float: "left", clear: "both" }}
            />
          </div>
          <Row>
            <Form layout="inline" onSubmit={this.submitChatMessage}>
              <Col span={18}>
                <Input
                  id="message"
                  placeholder="Let's start texting"
                  type="text"
                  value={this.state.chatMessage}
                  onChange={this.handleSearchchange}
                  prefix={
                    <Icon type="message" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                />
              </Col>
              <Col span={2}>
                <Dropzone onDrop={this.onDrop}>
                  {({ getRootProps, getInputProps }) => (
                    <section>
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <Button>
                          <Icon type="upload" />
                        </Button>
                      </div>
                    </section>
                  )}
                </Dropzone>
              </Col>
              <Col span={4}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: "100%" }}
                >
                  <Icon type="enter" />
                </Button>
              </Col>
            </Form>
          </Row>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    chat: state.chat,
  };
};
export default connect(mapStateToProps, null)(ChatPage);
