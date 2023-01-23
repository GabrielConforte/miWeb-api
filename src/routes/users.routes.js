import { Router } from 'express';
import { generateToken, checkAuth } from '../auth/auth.js';
import usersDao from '../DAO/usersDao.js';

const router = Router();

function checkEmailExists(req, res, next) {
    usersDao.findOneByEmail( req.body.email ).then(existingUser => {
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }
        next();
    });
}

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const isValid = await usersDao.findOneAndComparePassword(email, password);
    if (!isValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
    }
    const user = await usersDao.findOneByEmail(email);
    const name = user.name
    const roles = user.roles
    const id = user.id;
    const token = generateToken({email, id, roles}); 
    res.json({ token, name, roles });
});

router.post('/sign',checkEmailExists,async (req, res) => {
const data = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
};
const user = await usersDao.create(data);
res.json(user);
});


router.use(checkAuth);

router.get('/', async (req, res) => {
    if(req.user.roles !== "admin") {
        return res.status(401).json({ message: 'Not authorized' });
    }
    try {
        const users = await usersDao.findAll();
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: 'Error getting users' });
    }
});

router.patch('/:id', async (req, res) => {
const { id } = req.params;
const { email, password } = req.body;
const user = await usersDao.updateUser(id, { email, password }, req.user);
if (!user) {
return res.status(404).json({ message: 'User not found' });
}
res.json(user);
});

router.delete('/:id', async (req, res) => {
const { id } = req.params;
const deleted = await usersDao.deleteUser(id, req.user);
if (!deleted) {
return res.status(404).json({ message: 'User not found' });
}
res.json({ message: 'User deleted' });
});

router.get('/user', async (req, res) => {
  try {
    const user = await usersDao.findOneById(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err });
  }
});
export default router;