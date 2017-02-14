const {Router} =require('express');
const CategoryController =require('../../controller/CategoryController');

const router = Router();
const categoryCtl = new CategoryController();

router.get('/', categoryCtl.getAll);
router.get('/:categoryId',categoryCtl.getOne);
router.post('/',categoryCtl.create);
router.delete('/:categoryId',categoryCtl.delete);
router.put('/:categoryId',categoryCtl.update);

module.exports = router;