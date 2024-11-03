const express = require("express");
const BorrowerController = require("../controllers/borrower_controller");

const borrowingRouter = express.Router();

borrowingRouter.post("/borrow/book", BorrowerController.add);
borrowingRouter.get("/borrow/book/list", BorrowerController.list);
borrowingRouter.post("/borrow/book/return", BorrowerController.return);

module.exports = borrowingRouter;