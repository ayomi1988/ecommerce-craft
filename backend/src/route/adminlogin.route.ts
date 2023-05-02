import express from 'express';

const router = express.Router();

import { createAAdmin , deleteAAdmin , getAllAdmin  , getadmById , updateAdmin, loginAdmin } from '../controller/admin.controller';

router.post('/',createAAdmin);
router.get('/',getAllAdmin);
router.get('/:empId',getadmById);
router.put('/:empId',updateAdmin);
router.delete('/:empId',deleteAAdmin);
router.post('/login',loginAdmin);

export default router;