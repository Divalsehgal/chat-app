import { GET_CHAT ,AFTER_POST_MESSAGE} from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case GET_CHAT:
      return { ...state, chats: action.payload };
      case AFTER_POST_MESSAGE:
        return {...state, chats: state.chats.concat(action.payload) }
    default:
      return state;
  }
}
