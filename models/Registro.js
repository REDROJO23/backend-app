const mongoose = require('mongoose');

const registroSchema = new mongoose.Schema({
  identificacion: String,
  nombre: String,
  fechaAsignacion: String,
  fechaDevolucion: String,
  observaciones: String
});

module.exports = mongoose.model('Registro', registroSchema);