var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var vignetteSchema = new Schema({
  name: String,
  text: Array,
  characters: Array,
  location: String,
  order: Number
});

// vignetteSchema.methods.concatanceNameAndBlog = function() {
//     // Extend name with value of the blog field.
//     this.name = this.name + this.blog;
//     return this.name;
// };

var Vignette = mongoose.model('Vignette', vignetteSchema);

module.exports = Vignette;
