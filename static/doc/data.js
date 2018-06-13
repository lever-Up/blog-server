var interfaceData = [
    {
        rootPath: '/blog',
        desc: '博文相关接口',
        list: [
            {
                path: '/blog',
                desc: '博文列表',
                data: JSON.stringify([
                    {
                        id: 0,
                        title: '2018第一场暴风雨'
                    }
                ], null, 2)
            }, {
                path: '/blog/[id]',
                desc: '获取博文信息',
                params: [
                    { key:'id', name:'文章id', way:'url', desc:'' }
                ],
                data: JSON.stringify({
                    id: 0,
                    title: '2018第一场暴风雨'
                }, null, 2)
            }
        ]
    }
];