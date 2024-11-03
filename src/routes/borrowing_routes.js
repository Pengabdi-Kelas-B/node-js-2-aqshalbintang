const express = require("express")
const BorrowingController = require("../controllers/borrowing_controller")

const borrowingRouter = express.Router()

borrowingRouter.get("/borrowings", BorrowingController.getAll)
borrowingRouter.get("/borrowing/:id", BorrowingController.getById)
borrowingRouter.post("/borrowing", BorrowingController.create)
borrowingRouter.put("/borrowing/:id", BorrowingController.update)
borrowingRouter.delete("/borrowing/:id", BorrowingController.delete)

module.exports = borrowingRouter