const mongoose = require("mongoose");
const BebidasSchema = mongoose.Schema({
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  imagen: {
    type: String,
    required: true,
    trim: true,
  },
  precio: {
    type: String,
    required: true,
    trim: true,
  },

});
 
module.exports = mongoose.model('Bebida', BebidasSchema);