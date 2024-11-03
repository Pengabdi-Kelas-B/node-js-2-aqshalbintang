const express = require("express")
const BorrowingController = require("../controllers/borrowing_controller")

const borrowingRouter = express.Router()

borrowingRouter.get("/borrowers", BorrowingController.getAll)
borrowingRouter.get("/borrower/:id", BorrowingController.getById)
borrowingRouter.post("/borrower", BorrowingController.create)
borrowingRouter.put("/borrower/:id", BorrowingController.update)
borrowingRouter.delete("/borrower/:id", BorrowingController.delete)

module.exports = borrowingRouter