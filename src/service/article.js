const Factory = require('../base/factory');

const ArticleService = {
    queryList: () => {

    },
    //获取文章信息
    getArticle: (response, id) => {
        Factory.get('article', id).then( data => {
            response.send(data)
        });
    }
};

module.exports = ArticleService;