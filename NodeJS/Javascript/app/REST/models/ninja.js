const moongoose = require('mongoose');
const Schema = moongoose.Schema;


// create geolocation schema
const GeoSchema = new Schema({
  type:{
    type:String,
    default: "Point"
  },
  coordinates: {
    type: [Number],
    index: "2dsphere"
  }
});


// create ninja schema and model
const NinjaSchema = new Schema({
    name: {type: String,required: [true, 'Name field is required']},
    rank:{type: String},
    available:{type: Boolean,default: false},
    geometry: GeoSchema
});

const Ninja = moongoose.model('ninja', NinjaSchema); // creating table or model

module.exports = Ninja;
