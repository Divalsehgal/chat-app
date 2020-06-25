import axios from "axios";
import { GET_CHAT ,AFTER_POST_MESSAGE} from "./types";
import { CHAT_SERVER } from "../components/Config.js";

export function getChats() {
  const request = axios
    .get(`${CHAT_SERVER}/getchat`)
    .then((response) => response.data);

  return {
    type: GET_CHAT,
    payload: request,
  };
}

export function postaftermessage(data){
 
  return {
      type: AFTER_POST_MESSAGE,
      payload: data
  }
}