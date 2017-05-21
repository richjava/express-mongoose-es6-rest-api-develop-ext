import School from '../models/school.model';

/**
 * Load school and append to req.
 */
function load(req, res, next, id) {
  School.get(id)
    .then((school) => {
      req.school = school; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get school
 * @returns {School}
 */
function get(req, res) {
  return res.json(req.school);
}

/**
 * Create new school
 * @property {string} req.body.name - The name of school.
 * @property {string} req.body.description - The description of school.
 * @returns {School}
 */
function create(req, res, next) {
  const school = new School({
    name: req.body.name,
    description: req.body.description
  });

  school.save()
    .then(savedSchool => res.json(savedSchool))
    .catch(e => next(e));
}

/**
 * Update existing school
 * @property {string} req.body.name - The username of school.
 * @property {string} req.body.description - The description of school.
 * @returns {School}
 */
function update(req, res, next) {
  const school = req.school;
  school.name = req.body.name;
  school.description = req.body.description;

  school.save()
    .then(savedSchool => res.json(savedSchool))
    .catch(e => next(e));
}

/**
 * Get school list.
 * @property {number} req.query.skip - Number of schools to be skipped.
 * @property {number} req.query.limit - Limit number of schools to be returned.
 * @returns {School[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  let query = null;
  const q = req.query.q;
  if (q) {
    query = { name: new RegExp(q, 'i') };
  } else {
    query = req.query;
  }
  School.find(query)
    .sort({ createdAt: -1 })
    .skip(+skip)
    .limit(+limit)
    .exec()
    .then(users => res.json(users))
    .catch(e => next(e));
}

/**
 * Delete school.
 * @returns {School}
 */
function remove(req, res, next) {
  const school = req.school;
  school.remove()
    .then(deletedSchool => res.json(deletedSchool))
    .catch(e => next(e));
}

export default { load, get, create, update, list, remove };
