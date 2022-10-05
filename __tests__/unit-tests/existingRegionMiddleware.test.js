const existingRegionMiddleware = require('../../src/middlewares/existingRegionMiddleware');
const falsyValues = require("../../__mocks__/falsyValues");
const path = require('path');

describe('existingRegionMiddleware', () => {
    const mockRes = {};
    const mockNext = jest.fn();

    mockRes.status = jest.fn().mockReturnValue(mockRes);
    mockRes.sendFile =  jest.fn()

    it.each([
        [
            'asia',
            'americas',
            'europe'
        ]
    ])('should pass control to the next middleware when a valid region Id has been sent in the request', (value) => {
        const mockReq = {params: {regionId: value}}
        existingRegionMiddleware(mockReq, mockRes, mockNext);
        expect(mockNext).toHaveBeenCalled()
    });

    it.each([falsyValues])
    ('should send the "not-found.html" file to the client when an invalid region Id has been sent in the request', (value) => {
        const mockReq = {params: {regionId: value}}
        existingRegionMiddleware(mockReq, mockRes, mockNext);
        expect(mockRes.sendFile).toHaveBeenCalledWith(path.resolve('./src/views/not-found.html'))
    });
});
