var mongoose = require('mongoose');
var AutoIncrement = require('mongoose-sequence');
var Schema = mongoose.Schema;

var ArtistSchema = new Schema({
	"name": String,
    "shortname": String,
    "reknown": String,
    "bio": String

});

ArtistSchema.plugin(AutoIncrement, {inc_field: 'id'});

var Artist = mongoose.model('Artist', ArtistSchema);

module.exports = Artist;