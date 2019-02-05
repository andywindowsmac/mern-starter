import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

// Import Components
import ReplyList from './components/ReplyList/ReplyList';

// Import Actions
import {
  addReplyRequest,
  deleteReplyRequest,
  editReplyRequest,
  fetchRepliesByPost,
  fetchRepliesByReplyCuid,
} from './ReplyActions';
import { getReplies } from './ReplyReducer';

class ReplyListContainer extends React.PureComponent {
  componentDidMount() {
    if (this.props.replyCuid) {
      return this.props.dispatch(fetchRepliesByReplyCuid(this.props.replyCuid));
    }
    return this.props.dispatch(fetchRepliesByPost(this.props.postCuid));
  }

  handleAddReply = (reply) => {
    this.props.dispatch(addReplyRequest(reply));
  };

  handleDeleteReply = ({ cuid, parentCuid }) => {
    this.props.dispatch(deleteReplyRequest({ cuid, parentCuid }));
  };

  handleEditReply = (reply) => {
    this.props.dispatch(editReplyRequest(reply));
  };

  render() {
    return (
      <ReplyList
        onAddReply={this.handleAddReply}
        onDeleteReply={this.handleDeleteReply}
        postCuid={this.props.postCuid}
        replies={this.props.replies}
        replyCuid={this.props.replyCuid}
        onEditReply={this.handleEditReply}
      />
    );
  }
}

// Actions required to provide data for this component to render in server side.
ReplyListContainer.need = [params => {
  if (params.replyCuid) {
    return fetchRepliesByReplyCuid(params.replyCuid);
  }

  return fetchRepliesByPost(params.postCuid);
}];

ReplyListContainer.propTypes = {
  replyCuid: PropTypes.string,
  postCuid: PropTypes.string,
  replies: PropTypes.arrayOf(PropTypes.shape({
    nickname: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
    replyCuid: PropTypes.string,
    postCuid: PropTypes.string,
  })),
};

ReplyListContainer.defaultProps = {
  replies: [],
};

const mapStateToProps = (state, { replyCuid, postCuid }) => ({
  replies: getReplies(state, replyCuid || postCuid),
});

const EnhancedReplyListContainer = connect(mapStateToProps)(ReplyListContainer);

export default EnhancedReplyListContainer;
