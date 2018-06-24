var articleTemp = {
    id: 0,
    title: '2018第一场暴风雨',
    secTitle: '二级标题',
    categoryId: 1,
    createTime: 1529052342000,
    content: '正文内容',
    status: 0,
    uid: 253
};
var userTemp = {
    id: 1,
    name: '123@qq.com',
    nickname: '张三',
    email: '123@qq.com'
};
var categoryTemp = {
    id: 1,
    name: '前端技能',
    remark: '这是备注',
    status: 0,
    pid: 0
};

function resSuccess(data={}, msg='success') {
    return JSON.stringify({code: 0, msg, data: data}, null, 2)
}

function resError(msg='', data='') {
    return JSON.stringify({code: -1, msg: msg, data: data}, null, 2)
}

var interfaceData = [
    {
        rootPath: '/blog/article',
        desc: '博文相关接口',
        list: [
            {
                path: '/blog/article',
                method: 'GET',
                desc: '博文列表',
                data: resSuccess([articleTemp])
            }, {
                path: '/blog/article/[id]',
                method: 'GET',
                desc: '获取博文信息',
                params: [
                    { key:'id', name:'博文id', way:'url', desc:'' }
                ],
                data: resSuccess(articleTemp)
            }, {
                path: '/blog/article',
                method: 'POST',
                desc: '添加新的博文',
                params: [
                    { key:'title', name:'标题', way:'body', desc:'' },
                    { key:'content', name:'正文内容', way:'body', desc:'' },
                    { key:'categoryId', name:'所属类目id', way:'body', desc:'' },
                ],
                data: resSuccess(articleTemp)
            }, {
                path: '/blog/article/[id]',
                method: 'POST',
                desc: '编辑博文信息',
                params: [
                    { key:'id', name:'博文id', way:'url', desc:'' },
                    { key:'title', name:'标题', way:'body', desc:'' },
                    { key:'content', name:'正文内容', way:'body', desc:'' },
                    { key:'categoryId', name:'所属类目id', way:'body', desc:'' },
                ],
                data: resSuccess(articleTemp)
            }, {
                path: '/blog/article/[id]',
                method: 'DELETE',
                desc: '删除一条博文',
                params: [
                    { key:'id', name:'博文id', way:'url', desc:'比如 id=1' }
                ],
                data: resSuccess([1])
            }, {
                path: '/blog/article/batch',
                method: 'DELETE',
                desc: '批量删除博文',
                params: [
                    { key:'ids', name:'博文id列表', way:'body', desc:'如：ids=[1,2,3]' }
                ],
                data: resSuccess([1,2,3])
            }
        ]
    }, {
        rootPath: '/blog/files',
        desc: '文件相关接口',
        list: [
            {
                path: '/blog/files/upload',
                method: 'POST',
                desc: '批量上传，form表单方式',
                data: resSuccess(['//www.example.com/a.jpg', '//www.example.com/b.jpg'])
            }
        ]
    }, {
        rootPath: '/blog/user',
        desc: '用户相关接口',
        list: [
            {
                path: '/blog/user/code',
                method: 'POST',
                desc: '获取邮箱验证码',
                params: [
                    { key:'email', name:'邮箱地址', way:'body', desc:'如：123@qq.com' }
                ],
                data: resSuccess('已发送')
            }, {
                path: '/blog/user/register',
                method: 'POST',
                desc: '注册',
                params: [
                    { key:'name', name:'用户名', way:'body', desc:'' },
                    { key:'password', name:'密码', way:'body', desc:'' },
                    { key:'code', name:'验证码', way:'body', desc:'' },
                    { key:'email', name:'邮箱地址', way:'body', desc:'' },
                ],
                data: resSuccess(userTemp)
            }, {
                path: '/blog/user/login',
                method: 'POST',
                desc: '登录',
                params: [
                    { key:'username', name:'用户名', way:'body', desc:'' },
                    { key:'password', name:'密码', way:'body', desc:'' }
                ],
                data: resSuccess({token:'123e4567-e89b-12d3-a456-426655440000'})
            }, {
                path: '/blog/user/logout',
                method: 'DELETE',
                desc: '退出登录',
                data: resSuccess({}, '已退出登录')
            }, {
                path: '/blog/user/loginUser',
                method: 'GET',
                desc: '获取登录用户的信息',
                data: resSuccess(userTemp)
            }, {
                path: '/blog/user/addUser',
                method: 'POST',
                desc: '后台 - 添加用户',
                params: [
                    { key:'name', name:'用户名', way:'body', desc:'' },
                    { key:'password', name:'密码', way:'body', desc:'' },
                    { key:'email', name:'邮箱地址', way:'body', desc:'' },
                ],
                data: resSuccess(userTemp)
            }, {
                path: '/blog/user/[id]',
                method: 'POST',
                desc: '修改用户信息',
                params: [
                    { key:'id', name:'用户id', way:'url', desc:'' },
                    { key:'rickname', name:'昵称', way:'body', desc:'' },
                    { key:'mobile', name:'手机号', way:'body', desc:'' },
                ],
                data: resSuccess(userTemp)
            }, {
                path: '/blog/user/[id]',
                method: 'DELETE',
                desc: '删除用户',
                params: [
                    { key:'id', name:'用户id', way:'url', desc:'比如 id=102' }
                ],
                data: resSuccess([102])
            }, {
                path: '/blog/user/batch',
                method: 'DELETE',
                desc: '批量删除用户',
                params: [
                    { key:'ids', name:'用户id列表', way:'body', desc:'如：ids=[1,2,3]' }
                ],
                data: resSuccess([1,2,3])
            }
        ]
    }, {
        rootPath: '/blog/category',
        desc: '类目相关接口',
        list: [
            {
                path: '/blog/category',
                method: 'GET',
                desc: '查询类目列表',
                data: resSuccess([categoryTemp])
            }, {
                path: '/blog/category/[id]',
                method: 'GET',
                desc: '获取类目信息',
                params: [
                    { key:'id', name:'类目id', way:'url', desc:'' }
                ],
                data: resSuccess(categoryTemp)
            }, {
                path: '/blog/category',
                method: 'POST',
                desc: '添加类目',
                params: [
                    { key:'name', name:'名称', way:'body', desc:'' },
                    { key:'remark', name:'备注', way:'body', desc:'' },
                    { key:'pid', name:'上级id', way:'body', desc:'' },
                ],
                data: resSuccess(categoryTemp)
            }, {
                path: '/blog/category/[id]',
                method: 'POST',
                desc: '修改类目',
                params: [
                    { key:'id', name:'类目id', way:'url', desc:'' },
                    { key:'name', name:'名称', way:'body', desc:'' },
                    { key:'remark', name:'备注', way:'body', desc:'' },
                    { key:'pid', name:'上级id', way:'body', desc:'' },
                ],
                data: resSuccess(categoryTemp)
            }, {
                path: '/blog/category/[id]',
                method: 'DELETE',
                desc: '删除一个类目',
                params: [
                    { key:'id', name:'类目id', way:'url', desc:'' }
                ],
                data: resSuccess({}, '删除成功')
            }, {
                path: '/blog/category/batch',
                method: 'DELETE',
                desc: '批量删除类目',
                params: [
                    { key:'ids', name:'id列表', way:'body', desc:'如：[1,2]' }
                ],
                data: resSuccess({}, '删除成功')
            }
        ]
    }
];