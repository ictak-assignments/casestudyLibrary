const express = require('express');
const router = express.Router();
const methodOverride = require('method-override');

const Author = require('../models/author');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { isLoggedIn ,isOwnerAuthor } = require('../middleware');

const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const { cloudinary } = require("../cloudinary");


router.get('/' ,  catchAsync(async(req,res) => {
	const authors = await Author.find({});
	return res.render('authors/authors.ejs' , { authors})
}));

router.get('/new', isLoggedIn, (req,res) => {
	return res.render('authors/new')   
});

router.post('/', upload.array('image'), catchAsync( async (req, res, next) => {
    const author = new Author(req.body.author);
    author.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
	author.owner = req.user._id;
    await author.save();
	console.log(author)
	return res.redirect(`/authors/${author._id}`)
})); 
router.get('/:id', catchAsync( async (req,res) => {
	const author = await Author.findById(req.params.id).populate('owner');
	
	if(!author){
		req.flash('error','cannot find the author');
		return res.redirect('/authors')
	}
	return res.render('authors/show', { author } )
}));
router.get('/:id/edit' ,isLoggedIn,isOwnerAuthor, catchAsync( async (req,res)=>{
	const { id } = req.params;
	const author = await Author.findById(req.params.id)
	return res.render('authors/edit', { author });
}));
router.put('/:id',isLoggedIn,isOwnerAuthor,upload.array('image'), catchAsync( async (req, res) => {
    const { id } = req.params;
    const author = await (await Author.findByIdAndUpdate(id, { ...req.body.author }))
	const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    author.images.push(...imgs);
    await author.save();
	if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await author.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
	req.flash('success', 'Successfully updated author!');
	return res.redirect(`/authors/${author._id}`);
}));
router.delete('/:id',isLoggedIn,isOwnerAuthor,  catchAsync(async (req,res) =>{
	const { id } = req.params;
	await Author.findByIdAndDelete(id);
	return res.redirect('/authors')
	//res.send('deleted')
}));
module.exports = router;

















