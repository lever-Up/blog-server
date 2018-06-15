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

function resSuccess(data={}) {
    return JSON.stringify({code: 0, msg: 'success', data: data}, null, 2)
}

function resError(msg='', data='') {
    return JSON.stringify({code: -1, msg: msg, data: data}, null, 2)
}

var interfaceData = [
    {
        rootPath: '/blog',
        desc: '博文相关接口',
        list: [
            {
                path: '/blog',
                method: 'GET',
                desc: '博文列表',
                data: resSuccess([articleTemp])
            }, {
                path: '/blog/[id]',
                method: 'GET',
                desc: '获取博文信息',
                params: [
                    { key:'id', name:'博文id', way:'url', desc:'' }
                ],
                data: resSuccess(articleTemp)
            }, {
                path: '/blog',
                method: 'POST',
                desc: '添加新的博文',
                params: [
                    { key:'title', name:'标题', way:'body', desc:'' },
                    { key:'content', name:'正文内容', way:'body', desc:'' },
                    { key:'categoryId', name:'所属类目id', way:'body', desc:'' },
                ],
                data: resSuccess(articleTemp)
            }, {
                path: '/blog/[id]',
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
                path: '/blog/[id]',
                method: 'DELETE',
                desc: '删除一条博文',
                params: [
                    { key:'id', name:'博文id', way:'url', desc:'比如 id=1' }
                ],
                data: resSuccess([1])
            }, {
                path: '/blog/batch',
                method: 'DELETE',
                desc: '批量删除博文',
                params: [
                    { key:'ids', name:'博文id列表', way:'body', desc:'如：ids=[1,2,3]' }
                ],
                data: resSuccess([1,2,3])
            }
        ]
    }
];