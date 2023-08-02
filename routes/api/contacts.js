const express = require("express");

const router = express.Router();
const ctrl = require("../../controller/contacts");
const { validateBody, isValidId } = require("../../middlewares");
const {schemas} = require("../../models/contact");

router.get("/", ctrl.listContacts);
router.get("/:id",isValidId, ctrl.getContactById);
router.post("/", validateBody(schemas.addSchemaPost), ctrl.addContact);
router.put("/:id", isValidId, validateBody(schemas.addSchemaPut), ctrl.updateById);
router.patch("/:id/favorite", isValidId, validateBody(schemas.updateFavoriteSchema), ctrl.updateFavorite);
router.delete("/:id", isValidId, ctrl.removeContact);

module.exports = router;
