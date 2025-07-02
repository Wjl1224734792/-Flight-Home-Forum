import { get, post, patch, put, del } from '../utils/api.js'

//新建帖子
const createTiezi = (data = {}) => {
    return post('/createTiezi', data);
}

//新建评论
const createComment = (data = {}) => {
    return post('/createComment', data);
}

//新建反馈
const createFeedback = (data = {}) => {
    return post('/createFeedback', data);
}

//删除贴子  
const deleteTiezi = (data = {}) => {
    return del('/deleteTiezi', data);
}

//删除评论
const deleteComment = (data = {}) => {
    return del('/deleteComment', data);
}

//删除反馈
const deleteFeedback = (data = {}) => {
    return del('/deleteFeedback', data);
}

//查询贴子
const postTiezi = (data = {}) => {
    return post('/selectTiezi', data);
}

//查询评论
const postComment = (data = {}) => {
    return post('/selectComment', data);
}
//查询特定id评论
const postCommentId = (data = {}) => {
    return post('/selectCommentId', data);
}
//查询ip
const getIp = (data = {}) => {
    return get('/ip', data);
}

export {
    createTiezi,
    createComment,
    createFeedback,
    deleteTiezi,
    deleteComment,
    deleteFeedback,
    postTiezi,
    postComment,
    getIp,
    postCommentId
}