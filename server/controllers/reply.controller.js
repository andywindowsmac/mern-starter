import Reply from '../models/reply';
import cuid from 'cuid';
import sanitizeHtml from 'sanitize-html';

/**
 * Get replies by post cuid
 * @param req
 * @param res
 * @returns void
 */
export function getReplyPostById(req, res) {
  const { postCuid } = req.params;
  Reply.find({ postCuid }).sort('-dateAdded').exec((err, replies) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ replies });
  });
}

/**
 * Get replies by cuid
 * @param req
 * @param res
 * @returns void
 */
export function getRepliesByReplyCuid(req, res) {
  const { cuid: replyCuid } = req.params;
  Reply.findOne({ cuid: replyCuid }).populate('replies').exec((err, reply) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ replies: reply.replies });
  });
}

/**
 * Save a reply
 * @param req
 * @param res
 * @returns void
 */
export function addReply(req, res) {
  // should be either postCuid or replyCuid
  if ((!req.body.reply.postCuid && !req.body.reply.replyCuid) ||
  (req.body.reply.postCuid && req.body.reply.replyCuid)) {
    res.status(403).end();
  }
  if (!req.body.reply.content
    || !req.body.reply.nickname) {
    res.status(403).end();
  }

  const newReply = new Reply(req.body.reply);

  // Let's sanitize inputs
  newReply.nickname = sanitizeHtml(newReply.nickname);
  newReply.content = sanitizeHtml(newReply.content);

  newReply.cuid = cuid();

  const handleDidReplyUpdate = (saved) => (err) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ reply: saved });
  };

  newReply.save((err, saved) => {
    if (err) {
      res.status(500).send(err);
    }

    if (req.body.reply.replyCuid) {
      Reply.findOneAndUpdate(
        { cuid: req.body.reply.replyCuid },
        { $push: { replies: newReply._id } },
        handleDidReplyUpdate(saved)
      );
      return;
    }

    res.json({ reply: saved });
  });
}

/**
 * Get a single reply
 * @param req
 * @param res
 * @returns void
 */
export function getReply(req, res) {
  Reply.findOne({ cuid: req.params.cuid }).sort('-dateAdded').exec((err, reply) => {
    if (err) {
      res.status(500).send(err);
    }
    res.json({ reply });
  });
}

/**
 * Edit a reply
 * @param req
 * @param res
 * @returns void
 */
export function editReply(req, res) {
  if (!req.body.reply) {
    res.status(403).end();
  }

  Reply.findOneAndUpdate({ cuid: req.body.reply.cuid }, req.body.reply).exec((err) => {
    if (err) {
      res.status(500).send(err);
    }

    res.json({ reply: req.body.reply });
  });
}

/**
 * Delete a reply
 * @param req
 * @param res
 * @returns void
 */
export function deleteReply(req, res) {
  Reply.findOne({ cuid: req.params.cuid }).exec((err, reply) => {
    if (err) {
      res.status(500).send(err);
    }

    reply.remove(() => {
      res.status(200).end();
    });
  });
}
