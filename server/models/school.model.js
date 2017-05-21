import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * School Schema
 */
const SchoolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
SchoolSchema.method({
});

/**
 * Statics
 */
SchoolSchema.statics = {
  /**
   * Get school
   * @param {ObjectId} id - The objectId of school.
   * @returns {Promise<School, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((school) => {
        if (school) {
          return school;
        }
        const err = new APIError('No such school exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List schools in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of schools to be skipped.
   * @param {number} limit - Limit number of schools to be returned.
   * @returns {Promise<School[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef School
 */
export default mongoose.model('School', SchoolSchema);
