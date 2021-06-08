const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});


const AuthorSchema = new Schema({
    name: String,
    images: [ImageSchema],
    nationality: String,
    description:String,
    owner:{
        type:Schema.Types.ObjectId,
        ref:'User'

    }
})

const Author = mongoose.model('Author', AuthorSchema)
module.exports = Author