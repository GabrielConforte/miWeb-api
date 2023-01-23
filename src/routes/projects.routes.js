import { Router } from "express";
import  projectsDao from "../DAO/projectsDao.js";
import { checkAuth } from "../auth/auth.js";


const router = Router()

//todo traer todos los projects
router.get('/projects', (req, res, next) => {//funciona ok
  projectsDao
    .findAll()
    .then(projects => res.json(projects))
    .catch(next);
});

//trae un project
router.get('/projects/:id', (req, res) => {//funcion ok
  const id = req.params.id;
  projectsDao
    .getOne(id)
    .then(project => {
      if (project) {
        res.json(project);
      } else {
        res.status(404).json({ error: "project does not exist" });
      }
    })
    .catch(error => res.status(500).json({ error: error.message }));
});

//desde aqui son endpoints con comprobacion de token
router.use(checkAuth);

//añadir project
router.post('/projects', async (req, res) => {
if (req.user.roles !== 'admin') { // Verificar si el usuario es un administrador
  return res.status(401).json({ message: 'Not authorized' });
}
try {
  const project = await projectsDao.create(req.body); // Crear nuevo proyecto con los datos enviados en el cuerpo de la solicitud
  res.json(project);
} catch (err) {
  res.status(500).json({ message: err });
}
});

router.patch('/projects/:id', (req, res) => {
  const id = req.params.id;
  if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid project id" });
  }
  const data = req.body;
  projectsDao
      .updateOne(id, data)
      .then(project => {
          if (project) {
              res.json(project);
          } else {
              res.status(404).json({ error: "project does not exist" });
          }
      })
      .catch(error => res.status(500).json({ error: error.message }));
});

router.delete('/projects/:id', (req, res) => {
  const id = req.params.id;
  projectsDao
    .deleteOne(id)
    .then(() => res.json({ deleted: true }))
    .catch(error => res.status(500).json({ error: error.message }));
});


export default router;