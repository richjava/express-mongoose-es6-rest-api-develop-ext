import mongoose from 'mongoose';
import request from 'supertest-as-promised';
import httpStatus from 'http-status';
import chai, { expect } from 'chai';
import app from '../../index';

chai.config.includeStack = true;

/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## School APIs', () => {
  let school = {
    name: 'My School',
    description: 'This is my school'
  };

  describe('# POST /api/schools', () => {
    it('should create a new school', (done) => {
      request(app)
        .post('/api/schools')
        .send(school)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(school.name);
          expect(res.body.description).to.equal(school.description);
          school = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/schools/:schoolId', () => {
    it('should get school details', (done) => {
      request(app)
        .get(`/api/schools/${school._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal(school.name);
          expect(res.body.description).to.equal(school.description);
          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when school does not exists', (done) => {
      request(app)
        .get('/api/descriptions/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });

  describe('# PUT /api/schools/:schoolId', () => {
    it('should update school details', (done) => {
      school.name = 'KK';
      request(app)
        .put(`/api/schools/${school._id}`)
        .send(school)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal('KK');
          expect(res.body.description).to.equal(school.description);
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/schools/', () => {
    it('should get all schools', (done) => {
      request(app)
        .get('/api/schools')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });

    it('should get all schools (with limit and skip)', (done) => {
      request(app)
        .get('/api/schools')
        .query({ limit: 10, skip: 1 })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/schools/', () => {
    it('should delete school', (done) => {
      request(app)
        .delete(`/api/schools/${school._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.name).to.equal('KK');
          expect(res.body.description).to.equal(school.description);
          done();
        })
        .catch(done);
    });
  });
});
