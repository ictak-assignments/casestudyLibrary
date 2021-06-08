//const { campgroundSchema, reviewSchema } = require('./schemas.js');
const ExpressError = require('./utils/ExpressError');
const Author = require('./models/author');
const Book = require('./models/book');

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        req.session.returnTo = req.originalUrl
        req.flash('error', 'You must be signed in first!');
        return res.redirect('/login');
    }
    next();
}

module.exports.isOwnerAuthor = async (req, res, next) => {
    const { id } = req.params;
    const author = await Author.findById(id);
    if (!author.owner.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/authors/${id}`);
    }
    next();
}
module.exports.isOwnerBook = async (req, res, next) => {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book.owner.equals(req.user._id)) {
        req.flash('error', 'You do not have permission to do that!');
        return res.redirect(`/books/${id}`);
    }
    next();
}