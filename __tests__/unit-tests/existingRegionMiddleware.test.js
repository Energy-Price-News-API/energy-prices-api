const existingRegionMiddleware = require('../../src/middlewares/existingRegionMiddleware');
const path = require('path');

describe('existingRegionMiddleware', () => {
    const res = {};
    const next = jest.fn();

    res.status = jest.fn().mockReturnValue(res);
    res.sendFile =  jest.fn()

    it.each([
        [{params: {regionId: "asia"}}],
        [{params: {regionId: "americas"}}],
        [{params: {regionId: "europe"}}],
    ])('should pass control to the next middleware when a valid region Id has been sent in the request', (req) => {
        existingRegionMiddleware(req, res, next);
        expect(next).toHaveBeenCalled()
    });

    it.each([
        [{params: {regionId: "africa"}}],
        [{params: {regionId: "australia & oceania"}}],
        [{params: {regionId: ""}}],
        [{params: {regionId: null}}],
        [{params: {regionId: undefined}}],
        [{params: {regionId: false}}],
        [{params: {regionId: true}}],
        [{params: {regionId: 1}}],
        [{params: {regionId: 0}}],
        [{params: {regionId: {}}}],
    ])('should send the "not-found.html" file to the client when an invalid region Id has been sent in the request', (req) => {
        existingRegionMiddleware(req, res, next);
        expect(res.sendFile).toHaveBeenCalledWith(path.resolve('./src/views/not-found.html'))
    });
});
