var db = require('../utils/db');

module.exports = {
    getProductForIndex: () => {
        return db.load(`select * from product inner join product_image 
                        on product.ID = product_image.PRODUCTID
                        order by SALE DESC
                        limit 8`);
    },
    getCategoryLv1ForIndex: () => {
        return db.load('select * from category');
    },
    add: (entity) => {
        return db.add('product', entity);
    }
};