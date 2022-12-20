const mongoose = require('mongoose');

const MusicSchema = mongoose.Schema({
    SongTitle: String,
    RecordingYear: String,
    ReleaseDate: String,
    Country: String, 
    ArtistRole: String,
    ArtistName: String,
    SongPricing: Number,
    Theme: String,
    Mood: String,
    MusicImage: Array,
    MusicFile: String,
    VendorId: String,
    ProductID: String,
    Published: Number,
    Email: String,
    Lyrics: String,
    Tag: String
});
const musicModel = mongoose.model('Music', MusicSchema);

module.exports = musicModel;


