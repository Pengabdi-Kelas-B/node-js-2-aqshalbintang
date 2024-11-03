const mongoose = require('mongoose');
const DB = require('../models');
const ResponseHelper = require('../utils/response');

class BorrowingController  {

  static async add(req, res) {
    const session = await mongoose.startSession();
    try {

    session.startTransaction();

    const book = await DB.Book.findById(req.body.bookId);
    const borrower = await DB.Borrower.findById(req.body.borrowerId);

    if (!book || !borrower) {
      await session.abortTransaction();
      return ResponseHelper.error(res, 'Book or Borrower not found', 404);
    }

      const createdBorrowingData = await DB.Borrowing.create(req.body);
    
      borrower.borrowHistory.push(createdBorrowingData._id);
    
      await borrower.save();

      await session.commitTransaction();
    
      return ResponseHelper.success(res, createdBorrowingData, 201);
    } catch (error) {
      await session.abortTransaction();
    
      return ResponseHelper.error(res, error.message);
    } finally {
      await session.endSession();
    }
  }

  static async list(req, res) {
    try {
      const items = await DB.Borrowing.find({ status: 'ACTIVE' }).populate('bookId', 'title description').populate('borrowerId', 'membershipId name');
      return ResponseHelper.success(res, items, 'Success');
    } catch (error) {
      return ResponseHelper.error(res, error.message);
    }
  }

  static async return(req, res) {
    try {
      
      if(!req.body.id) {
        return ResponseHelper.error(res, 'ID not provided!', 400);
      }

      const item = await DB.Borrowing.findById(req.body.id);

      item.status = 'RETURNED'
      item.returnDate = new Date()

      await item.save()

      return ResponseHelper.success(res, item);
    } catch (error) {
      return ResponseHelper.error(res, error.message);
    }
  }
}

module.exports = BorrowingController;