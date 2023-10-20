const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Lista de tareas como objetos
let tareas = [
  { id: 1, descripcion: 'Hacer la compra', completado: false },
  { id: 2, descripcion: 'Estudiar JavaScript', completado: true },
  { id: 3, descripcion: 'Hacer ejercicio', completado: false },
];

// Ruta para listar todas las tareas
app.get('/tareas', (req, res) => {
  res.json(tareas);
});

// Ruta para listar tareas completas
app.get('/tareas/completas', (req, res) => {
  const tareasCompletas = tareas.filter((tarea) => tarea.completado);
  res.json(tareasCompletas);
});

// Ruta para listar tareas incompletas
app.get('/tareas/incompletas', (req, res) => {
  const tareasIncompletas = tareas.filter((tarea) => !tarea.completado);
  res.json(tareasIncompletas);
});

// Ruta para obtener una sola tarea por su ID
app.get('/tareas/:id', (req, res) => {
  const tareaId = parseInt(req.params.id);
  const tarea = tareas.find((t) => t.id === tareaId);

  if (!tarea) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  res.json(tarea);
});

// Ruta para crear una nueva tarea
app.post('/tareas', (req, res) => {
  const nuevaTarea = req.body;
  nuevaTarea.id = Date.now(); // Generar un ID único basado en la marca de tiempo
  tareas.push(nuevaTarea);
  res.status(201).json(nuevaTarea);
});

// Ruta para actualizar una tarea por su ID
app.put('/tareas/:id', (req, res) => {
  const tareaId = parseInt(req.params.id);
  const tareaActualizada = req.body;

  const tareaIndex = tareas.findIndex((t) => t.id === tareaId);

  if (tareaIndex === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  tareas[tareaIndex] = { ...tareas[tareaIndex], ...tareaActualizada };
  res.json(tareas[tareaIndex]);
});

// Ruta para eliminar una tarea por su ID
app.delete('/tareas/:id', (req, res) => {
  const tareaId = parseInt(req.params.id);

  const tareaIndex = tareas.findIndex((t) => t.id === tareaId);

  if (tareaIndex === -1) {
    return res.status(404).json({ error: 'Tarea no encontrada' });
  }

  tareas.splice(tareaIndex, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en el puerto ${PORT}`);
});