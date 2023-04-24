import express from 'express';

const router = express.Router();

import { createAAdmin , deleteAAdmin , getAllAdmin  , getadmById , updateAdmin,loginAAdmin } from '../controller/admin.controller';

router.post('/',createAAdmin);
router.get('/',getAllAdmin);
router.get('/:empId',getadmById);
router.put('/:empId',updateAdmin);
router.delete('/:empId',deleteAAdmin);
router.post('/login',loginAAdmin);

export default router;