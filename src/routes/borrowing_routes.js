const express = require("express");
const BorrowingController = require("../controllers/borrowing_controller");

const borrowingRouter = express.Router();

borrowingRouter.post("/borrow/book", BorrowingController.add);
borrowingRouter.get("/borrow/book/list", BorrowingController.list);
borrowingRouter.post("/borrow/book/return", BorrowingController.return);

module.exports = borrowingRouter;