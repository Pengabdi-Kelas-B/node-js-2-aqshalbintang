const DB = require('../models');
const ResponseHelper = require('../utils/response');

class BookController  {

  static async getAll(req, res) {
    try {
      const items = await DB.Book.find().populate('categoryId', 'name description').populate('authorId', 'name bio');
      return ResponseHelper.success(res, items);
    } catch (error) {
      return ResponseHelper.error(res, error.message);
    }
  }

  static async getById(req, res) {
    try {

      if(!req.params.id) {
        return ResponseHelper.error(res, 'ID not provided!', 400)
      }
      
      const items = await DB.Book.findById(req.params.id).populate('categoryId', 'name description').populate('authorId', 'name bio');
      return ResponseHelper.success(res, items);
    } catch (error) {
      return ResponseHelper.error(res, error.message);
    }
  }

  static async create(req, res) {
    try {
      const items = await DB.Book.create(req.body);
      return ResponseHelper.success(res, items, 'Success', 201);
    } catch (error) {
      return ResponseHelper.error(res, error.message);
    }
  }

  static async update(req, res) {
    try {

      if(!req.params.id) {
        return ResponseHelper.error(res, 'ID not provided!', 400);
      }

      const items = await DB.Book.findByIdAndUpdate(req.params.id, req.body);
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

      const items = await DB.Book.findByIdAndDelete(req.params.id);
      return ResponseHelper.success(res, items);
    } catch (error) {
      return ResponseHelper.error(res, error.message);
    }
  }

  static async uploadImage(req, res) {
    try {
      
      if(!req.body.id) {
        return ResponseHelper.error(res, 'ID not provided!', 400);
      }

      const items = await DB.Book.findById(req.body.id);

      items.coverUrl = req.body.coverUrl

      await items.save()

      return ResponseHelper.success(res, items);
    } catch (error) {
      return ResponseHelper.error(res, error.message);
    }
  }
}

module.exports = BookController