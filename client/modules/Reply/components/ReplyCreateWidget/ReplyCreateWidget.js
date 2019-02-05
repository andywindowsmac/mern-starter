import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape, FormattedMessage } from 'react-intl';

// Import Style
import styles from './ReplyCreateWidget.css';

export class ReplyCreateWidget extends PureComponent {
  addReply = () => {
    const nicknameRef = this.refs.nickname;
    const contentRef = this.refs.content;
    if (nicknameRef.value && contentRef.value) {
      const parent = this.props.replyCuid
        ? { replyCuid: this.props.replyCuid }
        : { postCuid: this.props.postCuid };
      this.props.addReply({
        nickname: nicknameRef.value,
        content: contentRef.value,
        ...parent,
      });
      nicknameRef.value = contentRef.value = '';
    }
  };

  editReply = () => {
    const nicknameRef = this.refs.nickname;
    const contentRef = this.refs.content;
    if (nicknameRef.value && contentRef.value && this.props.reply) {
      this.props.editReply({
        ...this.props.reply,
        nickname: nicknameRef.value,
        content: contentRef.value,
      });
    }

    nicknameRef.value = contentRef.value = '';
  };

  render() {
    const cls = `${styles.form} ${((this.props.showAddReply || this.props.showEditReply) ? styles.appear : '')}`;

    const defaultNickname = (this.props.reply && this.props.showEditReply) ? this.props.reply.nickname : '';
    const defaultContent = (this.props.reply && this.props.showEditReply) ? this.props.reply.content : '';
    const handler = this.props.showEditReply
      ? this.editReply : this.addReply;

    const title = this.props.showEditReply ? 'editReply' : 'createNewReply';
    return (
      <div className={cls}>
        <div className={styles['form-content']}>
          <h2 className={styles['form-title']}><FormattedMessage id={title} /></h2>
          <input
            defaultValue={defaultNickname}
            placeholder={this.props.intl.messages.authorName}
            className={styles['form-field']} ref="nickname"
          />
          <input
            defaultValue={defaultContent}
            placeholder={this.props.intl.messages.replyContent}
            className={styles['form-field']}
            ref="content"
          />
          <a className={styles['post-submit-button']} href="#" onClick={handler}><FormattedMessage id="submit" /></a>
        </div>
      </div>
    );
  }
}

ReplyCreateWidget.propTypes = {
  addReply: PropTypes.func,
  editReply: PropTypes.func,
  showAddReply: PropTypes.bool,
  showEditReply: PropTypes.bool,
  replyCuid: PropTypes.string,
  postCuid: PropTypes.string,
  intl: intlShape.isRequired,
  reply: PropTypes.shape({
    nickname: PropTypes.string.isRequired,
    cuid: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }),
};

export default injectIntl(ReplyCreateWidget);
