const DB = require('../models');
const ResponseHelper = require('../utils/response');

class AuthorController  {

  static async getAll(req, res) {
    try {
      const items = await DB.Author.find();
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
      
      const items = await DB.Author.findById(req.params.id).populate('books', 'title description');
      return ResponseHelper.success(res, items);
    } catch (error) {
      return ResponseHelper.error(res, error.message);
    }
  }

  static async create(req, res) {
    try {
      const items = await DB.Author.create(req.body);
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

      const items = await DB.Author.findByIdAndUpdate(req.params.id, req.body);
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

      const items = await DB.Author.findByIdAndDelete(req.params.id);
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

      const items = await DB.Author.findById(req.body.id);

      items.photoUrl = req.body.photoUrl

      await items.save()

      return ResponseHelper.success(res, items);
    } catch (error) {
      return ResponseHelper.error(res, error.message);
    }
  }
}

module.exports = AuthorController