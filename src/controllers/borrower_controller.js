const { default: mongoose } = require('mongoose');
const DB = require('../models');
const ResponseHelper = require('../utils/response');

class BorrowerController  {

  static async getAll(req, res) {
    try {

      const filter = {}

      if(req.query.status) {
        filter.status = req.query.status
      }

      const items = await DB.Borrowing.find(filter).populate('bookId', 'title description').populate('borrowerId', 'membershipId name');
      return ResponseHelper.success(res, items, 'Success');
    } catch (error) {
      return ResponseHelper.error(res, error.message);
    }
  }

  static async getById(req, res) {
    try {
      const items = await DB.Borrowing.findById(req.params.id);
      return ResponseHelper.success(res, items);
    } catch (error) {
      return ResponseHelper.error(res, error.message);
    }
  }

  static async create(req, res) {
    const session = await mongoose.startSession()
    try {

    session.startTransaction()

    const book = await DB.Book.findById(req.body.bookId)
    const borrower = await DB.Borrower.findById(req.body.borrowerId)
    
    if(!book || !borrower) {
      return ResponseHelper.error(res, 'Book or Borrower Not Found', 404);
    } 

      const createdBorrowingData = await DB.Borrowing.create(req.body);

      borrower.borrowHistory.push(createdBorrowingData._id)

      await borrower.save()

      await session.commitTransaction()

      return ResponseHelper.success(res, createdBorrowingData, 201);
    } catch (error) {
      await session.abortTransaction()

      return ResponseHelper.error(res, error.message);
    } finally {
      await session.endSession()
    }
  }

  static async update(req, res) {
    try {

      if(!req.params.id) {
        return ResponseHelper.error(res, 'ID not provided!', 400);
      }

      const items = await DB.Borrowing.findByIdAndUpdate(req.params.id, req.body);
      return ResponseHelper.success(res, items);
    } catch (error) {
      return ResponseHelper.error(res, error.message);
    }
  }

  static async delete(req, res) {
    try {

      if(!req.params.id) {
        return ResponseHelper.error(res, 'ID not provided!', 400);
      }

      const items = await DB.Borrowing.findByIdAndDelete(req.params.id);
      return ResponseHelper.success(res, items);
    } catch (error) {
      return ResponseHelper.error(res, error.message);
    }
  }
}

module.exports = BorrowerController