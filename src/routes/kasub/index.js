const router = require("express").Router();
const kasubController = require("../../controller/kasub");

router.get("/", kasubController.getAll);

router.get("/:id", kasubController.findOneById);

router.post("/", kasubController.create);

router.put("/:id", kasubController.findByIdAndEdit);

router.delete("/:id", kasubController.deleteOneById);

module.exports = router;
