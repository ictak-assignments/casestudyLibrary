const express = require('express');
const router = express.Router();
const methodOverride = require('method-override');

const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });
const {cloudinary } = require('../cloudinary');

const Book = require('../models/book');
const catchAsync = require('../utils/catchAsync');
const ExpressError = require('../utils/ExpressError');
const { isLoggedIn,isOwnerBook } = require('../middleware');

router.get('/' , catchAsync( async(req,res) => {
	const books = await Book.find({});
	return res.render('books/books.ejs' , { books})
}));

router.get('/new' ,isLoggedIn, (req,res) => {
	return res.render('books/new')   
});


router.post('/',isLoggedIn, upload.array('image'), catchAsync( async(req, res, next) => {
    const book = new Book(req.body.book);
    book.images = req.files.map(f => ({ url: f.path, filename: f.filename }));
    book.owner = req.user._id;	
	   await book.save();
	console.log(book);
    res.redirect(`/books/${book._id}`)
})); 

router.get('/:id', catchAsync( async (req,res) => {
	const book = await Book.findById(req.params.id).populate('owner');
	if(!book){
		req.flash('error','cannot find the book');
		return res.redirect('/books')
	}
	return res.render('books/show',{ book});
}));

router.get('/:id/edit',isLoggedIn,isOwnerBook, catchAsync( async(req,res)=>{
	const { id } = req.params;
	const book = await Book.findById(id)
	return res.render('books/edit', { book });
}));

router.put('/:id',isLoggedIn,isOwnerBook,upload.array('image'),  catchAsync( async(req, res) => {
    const { id } = req.params;
    const book = await Book.findByIdAndUpdate(id, { ...req.body.book });
	const imgs = req.files.map(f => ({ url: f.path, filename: f.filename }));
    book.images.push(...imgs);
    await book.save();
	if (req.body.deleteImages) {
        for (let filename of req.body.deleteImages) {
            await cloudinary.uploader.destroy(filename);
        }
        await book.updateOne({ $pull: { images: { filename: { $in: req.body.deleteImages } } } })
    }
	req.flash('success', 'Successfully updated bookidh ejs !');
 	return res.redirect(`/books/${book._id}`);
	 //res.send('updated')
}));

router.delete('/:id',isLoggedIn,isOwnerBook, catchAsync( async(req,res) =>{
	const { id } = req.params;
	await Book.findByIdAndDelete(id);
	return res.redirect('/books')
	//res.send('deleted')
}));

module.exports = router;