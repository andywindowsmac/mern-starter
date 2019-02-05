import { Router } from 'express';
import * as ReplyController from '../controllers/reply.controller';
const router = new Router();

// Get replies by post cuid
router.route('/replies/post/:postCuid').get(ReplyController.getReplyPostById);

// Get one reply by cuid
router.route('/replies/:cuid').get(ReplyController.getReply);

// Get replies by reply cuid
router.route('/replies/reply/:cuid').get(ReplyController.getRepliesByReplyCuid);

// Add a new Reply
router.route('/replies').post(ReplyController.addReply);

// Edit a Reply
router.route('/replies').put(ReplyController.editReply);

// Delete a reply by cuid
router.route('/replies/:cuid').delete(ReplyController.deleteReply);

export default router;
