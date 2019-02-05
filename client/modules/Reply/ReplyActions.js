import callApi from '../../util/apiCaller';

// Export Constants
export const ADD_REPLY = 'ADD_REPLY';
export const ADD_REPLIES = 'ADD_REPLIES';
export const DELETE_REPLY = 'DELETE_REPLY';
export const EDIT_REPLY = 'EDIT_REPLY';

// Export Actions
export function addReply({ reply, parentCuid }) {
  return {
    type: ADD_REPLY,
    reply,
    parentCuid,
  };
}

export function addReplyRequest(reply) {
  return (dispatch) => {
    const parentCuid = reply.replyCuid ? reply.replyCuid : reply.postCuid;

    return callApi('replies', 'post', {
      reply,
    }).then(res => dispatch(addReply({ parentCuid, reply: res.reply })));
  };
}

export function addReplies({ replies, parentCuid }) {
  return {
    type: ADD_REPLIES,
    replies,
    parentCuid,
  };
}

export function editReply({ reply, parentCuid }) {
  return {
    type: EDIT_REPLY,
    reply,
    parentCuid,
  };
}

export function fetchRepliesByPost(cuid) {
  return (dispatch) => {
    return callApi(`replies/post/${cuid}`).then(res => {
      dispatch(addReplies({ parentCuid: cuid, replies: res.replies }));
    });
  };
}

export function fetchRepliesByReplyCuid(cuid) {
  return (dispatch) => {
    return callApi(`replies/reply/${cuid}`).then(res => {
      dispatch(addReplies({ parentCuid: cuid, replies: res.replies }));
    });
  };
}

export function fetchReply({ cuid, parentCuid }) {
  return (dispatch) => {
    return callApi(`replies/${cuid}`).then(res => dispatch(addReply({ parentCuid, reply: res.reply })));
  };
}

export function fetchReplyByPostCuid({ cuid, parentCuid }) {
  return (dispatch) => {
    return callApi(`replies/post/${cuid}`).then(res => dispatch(addReply({ parentCuid, reply: res.reply })));
  };
}

export function editReplyRequest(reply) {
  return (dispatch) => {
    const parentCuid = reply.replyCuid ? reply.replyCuid : reply.postCuid;

    return callApi('replies/', 'put', {
      reply,
    }).then(res => dispatch(editReply({ parentCuid, reply: res.reply })));
  };
}

export function deleteReply({ cuid, parentCuid }) {
  return {
    type: DELETE_REPLY,
    cuid,
    parentCuid,
  };
}

export function deleteReplyRequest({ cuid, parentCuid }) {
  return (dispatch) => {
    return callApi(`replies/${cuid}`, 'delete').then(() =>
      dispatch(deleteReply({ cuid, parentCuid })));
  };
}
