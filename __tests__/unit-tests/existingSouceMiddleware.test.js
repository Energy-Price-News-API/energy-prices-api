const existingSourceMiddleware = require('../../src/middlewares/existingSourceMiddleware');
const falsyValues = require('../../__mocks__/falsyValues')
const path = require('path');

describe('existingSourceMiddleware', () => {
    const mockRes = {};
    const mockNext = jest.fn();

    mockRes.status = jest.fn().mockReturnValue(mockRes);
    mockRes.sendFile =  jest.fn()

    it.each([
        [
            "theGuardian",
            "theTimes",
            "theTelegraph",
            "metroUK",
            "newsBytes",
            "bbcNews",
            "skyNews",
            "reuters",
            "cnn",
            "cnbc",
            "abcNews",
            "theNewYorkTimes",
            "abpNews",
            "zeeNews",
            "theEconomicTimes",
            "theGlobeAndMail",
            "euroNews"
        ]
    ])('should pass control to the next middleware when a valid source Id has been sent in the request', (value) => {
        const mockReq = {params: {sourceId: value}}
        existingSourceMiddleware(mockReq, mockRes, mockNext);
        expect(mockNext).toHaveBeenCalled()
    });

    it.each([falsyValues])
    ('should send the "not-found.html" file to the client when an invalid region Id has been sent in the request', (value) => {
        const mockReq = {params: {sourceId: value}}
        existingSourceMiddleware(mockReq, mockRes, mockNext);
        expect(mockRes.sendFile).toHaveBeenCalledWith(path.resolve('./src/views/not-found.html'))
    });
});
