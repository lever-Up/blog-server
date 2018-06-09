const Factory = require('../base/factory');

const ArticleService = {
    queryList: (response) => {

    },
    //获取文章信息
    getArticle: (response, id) => {
        if(id) {
            Factory.get('article', id).then( data => {
                response.send(data)
            });
        }else{
            response.error()
        }
    }
};

module.exports = ArticleService;