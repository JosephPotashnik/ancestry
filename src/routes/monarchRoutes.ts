import { Router } from 'express';
export {}; // <--- add this temporarily to make sure TypeScript treats it as a module

import { getMonarchs, getMonarchByID, createMonarch } from '../controllers/MonarchController';

const router = Router();

router.get('/', getMonarchs);
router.get('/:id', getMonarchByID);
router.post('/', createMonarch);

export const monarchRouter =  router;