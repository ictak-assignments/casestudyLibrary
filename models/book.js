const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});

const BookSchema = new Schema({
    name: String,
    images: [ImageSchema],
    description: String,
    author:String,
    owner:{
        type:Schema.Types.ObjectId,
        ref:'User'

    }

});
const Book = mongoose.model('Book',BookSchema);

module.exports = Book;