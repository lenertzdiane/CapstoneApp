var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var standaloneSchema = new Schema({
  name: String,
  text: Array,
  characters: Array,
  location: String
});

// vignetteSchema.methods.concatanceNameAndBlog = function() {
//     // Extend name with value of the blog field.
//     this.name = this.name + this.blog;
//     return this.name;
// };

var Standalone = mongoose.model('Standalone', standaloneSchema);

module.exports = Standalone;
