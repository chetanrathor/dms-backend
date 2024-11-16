import { commentNamespace } from "../namespace/comment.namespace.js";

export class CommentEmitter {
    static broadcastComment(arg) {
        const dataToEmit = JSON.stringify(arg)
        commentNamespace().emit('new-comment', dataToEmit)
    }
}