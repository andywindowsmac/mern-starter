import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const replySchema = new Schema({
  nickname: { type: 'String', required: true },
  content: { type: 'String', required: true },
  cuid: { type: 'String', required: true },
  postCuid: { type: 'String', required: false, default: null },
  replyCuid: { type: 'String', required: false, default: null },
  replies: [{
    type: Schema.Types.ObjectId, ref: 'Reply',
  }],
});

const removeRecursively = async ({ ReplyModel, repliesIds }) => {
  const replies = await ReplyModel.find({
    _id: { $in: repliesIds },
  });

  const removeAllReplies = Promise.all(replies.map(async (reply) => {
    await removeRecursively({ ReplyModel, repliesIds: reply.replies });
    return await reply.remove();
  }));

  return removeAllReplies;
};

replySchema.pre('remove', function removeMiddlewre(next) {
  removeRecursively({
    ReplyModel: this.model('Reply'),
    repliesIds: this.replies,
  }).then(next).catch(err => {
    throw err;
  });
});

export default mongoose.model('Reply', replySchema);
