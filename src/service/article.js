const Factory = require('../base/factory');

const ArticleService = {
    getArticle: (response, id) => {
        Factory.get('article', id).then( data => {
            response.send(data)
        });
    }
};

module.exports = ArticleService;