import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import ReplyCreateWidget from '../ReplyCreateWidget/ReplyCreateWidget';

import ReplyListContainer from '../../ReplyListContainer';

// Import Style
import styles from './ReplyListItem.css';

class ReplyListItem extends React.PureComponent {
  state = {
    isReplyWidgetVisible: false,
    isEditReplyWidgetVisible: false,
  };

  handleReplyButtonClick = () =>
    this.setState(prevState => ({ isReplyWidgetVisible: !prevState.isReplyWidgetVisible }))

  handleEditReplyButtonClick = () => {
    this.setState(prevState => ({ isEditReplyWidgetVisible: !prevState.isEditReplyWidgetVisible }));
  };

  handleReplyAdd = (reply) => {
    this.setState({ isReplyWidgetVisible: false });
    this.props.onAddReply(reply);
  };

  handleReplyEdit = (reply) => {
    this.setState({ isEditReplyWidgetVisible: false });
    this.props.onEditReply(reply);
  }

  render() {
    return (
      <div className={styles['single-reply']}>
        <p className={styles['author-nickname']}>{this.props.reply.nickname}</p>
        <p className={styles['reply-content']}>{this.props.reply.content}</p>
        <ReplyCreateWidget
          key={`create-widget-${this.props.reply.cuid}`}
          addReply={this.handleReplyAdd}
          replyCuid={this.props.reply.cuid}
          showAddReply={this.state.isReplyWidgetVisible}
        />
        <ReplyCreateWidget
          key={`edit-widget-${this.props.reply.cuid}`}
          editReply={this.handleReplyEdit}
          reply={this.props.reply}
          showEditReply={this.state.isEditReplyWidgetVisible}
        />
        <div className={styles['actions-wrapper']}>
          <button className={styles['reply-button']} onClick={this.handleReplyButtonClick}>Reply to author</button>
          <button className={styles['reply-button']} onClick={this.handleEditReplyButtonClick}>Edit reply</button>
          <p className={styles['reply-delete']}><a href="#" onClick={this.props.onDelete}><FormattedMessage id="deleteReply" /></a></p>
        </div>
        <ReplyListContainer replyCuid={this.props.reply.cuid} />
      </div>
    );
  }
}

ReplyListItem.propTypes = {
  reply: PropTypes.shape({
    nickname: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
  }).isRequired,
  parentCuid: PropTypes.string,
  onDelete: PropTypes.func.isRequired,
  onAddReply: PropTypes.func.isRequired,
};

export default ReplyListItem;
