import { ADD_REPLY, ADD_REPLIES, DELETE_REPLY, EDIT_REPLY } from './ReplyActions';

// Initial State
const initialState = { data: [] };

const ReplyReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_REPLY :
      return {
        ...state,
        [action.parentCuid]: [...(state[action.parentCuid] || []), action.reply],
      };

    case ADD_REPLIES :
      return {
        ...state,
        [action.parentCuid]: [...(state[action.parentCuid] || []), ...action.replies],
      };
    /* eslint-disable no-case-declarations */
    case DELETE_REPLY:
    /* eslint-enable no-case-declarations */
      const newState = { ...state };
      delete newState[action.cuid];
      return {
        ...newState,
        [action.parentCuid]: state[action.parentCuid].filter(reply => reply.cuid !== action.cuid),
      };
    case EDIT_REPLY:
      return {
        ...state,
        [action.parentCuid]: state[action.parentCuid].map(reply => {
          if (`${reply.cuid}`.localeCompare(`${action.reply.cuid}`) === 0) {
            return { ...reply, ...action.reply };
          }
          return reply;
        }),
      };

    default:
      return state;
  }
};

/* Selectors */
// Get all replies
export const getReplies = (state, parentCuid) => state.replies[parentCuid];

// Get reply by cuid
export const getReply = (state, cuid, parentCuid) => state.replies[parentCuid].filter(reply => reply.cuid === cuid)[0];

// Export Reducer
export default ReplyReducer;
