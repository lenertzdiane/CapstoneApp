var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var anchorSchema = new Schema({
  name: String,
  notes: String,
  characters: Array,
  location: String
});

// vignetteSchema.methods.concatanceNameAndBlog = function() {
//     // Extend name with value of the blog field.
//     this.name = this.name + this.blog;
//     return this.name;
// };

var Anchor = mongoose.model('Anchor', anchorSchema);

module.exports = Anchor;
