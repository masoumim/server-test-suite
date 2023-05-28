/*
fruits-test.js: This file contains a full suite of tests used to test the 'fruits api'.
The test framework used is 'mocha' along with the 'chai' assertion library and the 'supertest'
module used for testing of API routes.
*/

const { assert } = require('chai');
const request = require('supertest');

const app = require('../../server.js');

describe('/fruits', () => {
    describe('GET', () => {
        it('returns an array of all fruits', async () => {
            const response = await request(app).get('/fruits');
            assert.equal(response.status, 200);
            assert.isArray(response.body);
            assert.isNotEmpty(response.body);
        });
        describe('when a color parameter is provided that matches a fruit(s) color', () => {
            it('returns an array of fruits of specified color', async () => {
                const response = await request(app).get('/fruits?color=red');
                assert.equal(response.status, 200);
                assert.isArray(response.body);
                assert.isNotEmpty(response.body);
            });
        });
        describe('when a color parameter is provided that does not match any fruits color', () => {
            it('returns an empty array', async () => {
                const response = await request(app).get('/fruits?color=foo');
                assert.equal(response.status, 200);
                assert.isArray(response.body);
                assert.isEmpty(response.body);
            });
        });
        describe('when an id paramter is provided that matches the id of a fruit', () => {
            it('returns a single matching fruit', async () => {
                const response = await request(app).get('/fruits/1');
                assert.equal(response.status, 200);
                assert.isObject(response.body);
                assert.hasAllKeys(response.body, ['id', 'name', 'color', 'size', 'plantType']);
            });
        });
        describe('when an id parameter is provided that does not match any fruit id', () => {
            it('returns "That fruit does not exist" and 404 status', async () => {
                const response = await request(app).get('/fruits/foo');
                assert.equal(response.status, 404);
                assert.deepEqual(response.text, "That fruit does not exist");
            });
        });
    });
    describe('POST', () => {
        describe('when a fruit object with a name is provided', () => {
            it('adds fruit object to fruits array and returns the fruit object', async () => {
                const newFruit = { name: "newFruit", color: "pink", size: "small", plantType: "tree" };
                const response = await request(app).post('/fruits').send(newFruit);
                assert.equal(response.status, 201);
                assert.isObject(response.body);
                assert.hasAllKeys(response.body, ['id', 'name', 'color', 'size', 'plantType']);
            });
            describe('when a fruit object without a name is provided', () => {
                it('returns a 409 status and message "Fruit must have a name"', async () => {
                    const newFruit = { color: "pink", size: "small", plantType: "tree" };
                    const response = await request(app).post('/fruits').send(newFruit);
                    assert.equal(response.status, 409);
                    assert.deepEqual(response.text, "Fruit must have a name");
                });
            });
        });
    });
    describe('PUT', () => {
        describe('when the fruit object id matches the id in the URL parameter', () => {
            it('adds updated fruit object to array and returns status 200 along with updated object', async () => {
                const updatedFruit = { id: 1, name: "orange", color: "orange", size: "small", plantType: "tree" };
                const response = await request(app).put('/fruits/1').send(updatedFruit);
                assert.equal(response.status, 200);
                assert.isObject(response.body);
                assert.hasAllKeys(response.body, ['id', 'name', 'color', 'size', 'plantType']);
            });
        });
        describe('when the fruit object id does not match the id in the URL parameter', () => {
            it('does not update object and returns a 409 status', async () => {
                const updatedFruit = { id: 2, name: "orange", color: "orange", size: "small", plantType: "tree" };
                const response = await request(app).put('/fruits/1').send(updatedFruit);
                assert.equal(response.status, 409);
            });
        });
    });
    describe('DELETE', () => {
        describe('when the fruit id matches the id of a fruit in the array', () => {
            it('deletes the fruit object from the array and returns 200 status', async () => {
                const response = await request(app).delete('/fruits/1');
                assert.equal(response.status, 200);
            })
        });
    });
});