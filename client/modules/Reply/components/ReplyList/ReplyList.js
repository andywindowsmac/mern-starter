import React from 'react';
import PropTypes from 'prop-types';

// Import Components
import ReplyListItem from '../ReplyListItem/ReplyListItem';
import ReplyCreateWidget from '../ReplyCreateWidget/ReplyCreateWidget';

import styles from './ReplyList.css';

class ReplyList extends React.PureComponent {
  state = {
    isReplyWidgetVisible: false,
  };

  handleAddReply = (reply) => {
    if (this.state.isReplyWidgetVisible) {
      this.setState({ isReplyWidgetVisible: false });
    }

    this.props.onAddReply(reply);
  };

  handleReplyButtonClick = () =>
    this.setState(prevState => ({ isReplyWidgetVisible: !prevState.isReplyWidgetVisible }))

  renderReplyListItem = reply => {
    const handleDeleteReply = () => this.props.onDeleteReply({
      cuid: reply.cuid,
      parentCuid: reply.replyCuid || reply.postCuid,
    });

    return (
      <ReplyListItem
        key={reply.cuid}
        reply={reply}
        onAddReply={this.handleAddReply}
        onDelete={handleDeleteReply}
        onEditReply={this.props.onEditReply}
      />
    );
  }

  render() {
    const key = `parent-${this.props.replyCuid || this.props.postCuid}`;

    return (
      <div className="listView" key={key}>
        <ReplyCreateWidget
          addReply={this.handleAddReply}
          postCuid={this.props.postCuid}
          replyCuid={this.props.replyCuid}
          showAddReply={this.state.isReplyWidgetVisible}
        />
        {!this.props.replyCuid && <button className={styles['reply-button']} onClick={this.handleReplyButtonClick}>Add reply</button>}
        {this.props.replies.map(this.renderReplyListItem)}
      </div>
    );
  }
}

// Actions required to provide data for this component to render in server side.
ReplyList.propTypes = {
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

ReplyList.defaultProps = {
  replies: [],
};

export default ReplyList;
