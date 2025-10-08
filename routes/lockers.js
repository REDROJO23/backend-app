const express = require('express');
const router = express.Router();
const Registro = require('../models/Registro');

// Registrar nuevo locker con ID autogenerado tipo ID-L01
router.post('/registrar', async (req, res) => {
  try {
    const count = await Registro.countDocuments();
    const nuevoId = `ID-L${String(count + 1).padStart(2, '2')}`;
    const nuevo = new Registro({ ...req.body, identificacion: nuevoId });
    await nuevo.save();
    res.status(201).json({ mensaje: 'Registrado correctamente' });
  } catch (error) {
    console.error('Error al registrar:', error);
    res.status(500).json({ error: 'Error al registrar' });
  }
});

// Consultar locker por ID
router.get('/consultar/:id', async (req, res) => {
  try {
    const resultado = await Registro.findOne({ identificacion: req.params.id });
    if (resultado) {
      res.json(resultado);
    } else {
      res.status(404).json({ error: 'Locker no encontrado' });
    }
  } catch (error) {
    console.error('Error en la consulta:', error);
    res.status(500).json({ error: 'Error en la consulta' });
  }
});

// Actualizar locker por _id
router.put('/actualizar/:id', async (req, res) => {
  try {
    const actualizado = await Registro.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!actualizado) {
      return res.status(404).json({ error: 'Locker no encontrado para actualizar' });
    }

    res.status(200).json({ mensaje: 'Locker actualizado correctamente', actualizado });
  } catch (error) {
    console.error('Error al actualizar:', error);
    res.status(500).json({ error: 'Error al actualizar el locker' });
  }
});

module.exports = router;