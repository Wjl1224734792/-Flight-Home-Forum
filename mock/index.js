//引入Mock

import Mock from 'mockjs'

//卡片数据
const note = Mock.mock({
    "data|32": [{
        //创建时间
        "moment": new Date(),
        //id
        "id|+1": 1,
        //userId
        "userId|+1": 10,
        //content
        "content|24-96": "@cword",
        //label
        "label|0-4": 0,
        //name
        "name": "@cname",
        //like
        "like|0-120": 0,
        //comment
        "comment|0-120": 0,
        //背景色
        "imgUrl|0-4": 0,
        //是否撤销
        "revoke|0-20": 0,
        //是否举报
        "report|0-20": 0,
        //类型
        "type|": 0
    }]
})
//评论
const comment = Mock.mock({
    "data|32": [{
        //创建时间
        "moment": new Date(),
        //id
        "id|+1": 1,
        //userId
        "userId|+1": 10,
        //content
        "content|24-96": "@cword",
        //name
        "name": "@cname",
        //背景色
        "imgUrl|0-13": 0,
    }]
})

export { note, comment }