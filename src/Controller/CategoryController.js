const slugify = require('slugify');
const shortid = require('shortid');
const Category = require('../Models/Category');

module.exports.AddCategory = (req, res) => {
    console.log(req.body)
    const categoryObj = {
        name: req.body.name,
        slug: slugify(req.body.name),
    }

    if (req.body.parentId) {
        categoryObj.parentId = req.body.parentId;
    }

    const cat = new Category(categoryObj);
    cat.save((error, category) => {
        if (error) return res.status(400).json({ message: error.message });
        else if (category) {
            return res.status(201).json({ category });
        }
    })
}

function createCategories(categories, parentId = null) {
    const categoryList = [];
    let category;
    if (parentId == null) {
        category = categories.filter(cat => cat.parentId == undefined);
    } else {
        category = categories.filter(cat => cat.parentId == parentId);
    }
    for (let cate of category) {
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            children: createCategories(categories, cate._id)
        });
    }
    return categoryList;
};

exports.getCategories = (req, res) => {
    Category.find({ })
        .exec((error, categories) => {
            if (error) return res.status(400).json({ error });
            if (categories) {
                const categoryList = createCategories(categories);
                res.status(200).json({ categoryList })
            }
        })
}

module.exports.CategoryDetail=(req,res)=>{
    Category.findOne({_id:req.body.id})
    .exec((error,data)=>{
        if(error){return res.status(400).json({error})}
        if(data){return res.status(200).json({data})}
    })
 }





