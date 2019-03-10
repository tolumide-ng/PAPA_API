import express from 'express';
import userControllers from '../v1/userControllers';
import usersHelpers from './../helpers/userHelpers';

const router = express.Router();
const { validateBody, schemas, login } = usersHelpers;


router.post('/signup', validateBody(schemas.authSchema), userControllers.createUser);
router.post('/login', validateBody(login.authSchema), userControllers.loginUser);


export default router;

