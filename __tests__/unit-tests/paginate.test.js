const paginate = require('../../src/utils/paginate');
const mockarticles = require('../../__mocks__/mockarticles')

describe('paginate the articles given to it ', () => {
    let mockReq = {
        query: {
            page: '1',
            limit:'5'
        },
        protocol:"http",
        hostname:"localhost",
        baseUrl:'http://localhost/example',
        path:'/articles',
        get()
        {
            return this.hostname;
        }

      };
    let mockRes = {

    }
    it('no pagination if page query is empty   ', () => {
        const value = paginate({...mockReq,query:{
            page:''
        }}, mockRes, mockarticles);
        expect(Object.keys(value.results).length).toBe(0);
            
    });

    it('no pagination if page query is 0   ', () => {
        const value = paginate({...mockReq,query:{
            page:0,
        }}, mockRes, mockarticles);
        expect(Object.keys(value.results).length).toBe(0);
        
        
    });
    it('should return an object with the required atributes ', () => {
        const value = paginate({...mockReq, query: {
            page: '2',
            limit:'5'
        }}, mockRes, mockarticles);
        expect(value.next).toBeDefined();
        expect(value.previous).toBeDefined();
        expect(value.total).toBeDefined();
        expect(value.pages).toBeDefined();
        expect(value.limit).toBeDefined();
        expect(value.currentPage).toBeDefined();
        expect(value.results).toBeDefined();
        


    });
    it('should return an object with the given limit of results ', () => {
        const value = paginate(mockReq, mockRes, mockarticles);
        ariclesLength = Object.keys(mockarticles).length;
        if ( ariclesLength< mockReq.query.limit)
        {
        expect(Object.keys(value.results).length).toBe(ariclesLength);
        }
        else  expect(Object.keys(value.results).length).toBe(parseInt(mockReq.query.limit));
        
    });
    it('first page should have no next and no previous if total is less than or equal to limit ', () => {
        const value = paginate(mockReq, mockRes,Object.fromEntries(Object.entries(mockarticles).slice(0, mockReq.query.limit)));
        expect(value.next).toBeUndefined();
        expect(value.previous).toBeUndefined();
        
    });
    it('first page should have next and no previous if total is greater than  limit ', () => {
        const value = paginate(mockReq, mockRes, mockarticles);
        expect(value.next).toBeDefined();
        expect(value.previous).toBeUndefined();
        
    });
    it('last page should have no next  ', () => {
        const value = paginate({...mockReq,query:{limit:5,page:Math.ceil(Object.keys(mockarticles).length/5)}}, mockRes, mockarticles);
        expect(value.previous).toBeDefined();
        expect(value.next).toBeUndefined();
        
    });
    it('for negative limit and page absolute values should be taken  ', () => {
        const value = paginate({...mockReq,query:{page:-2,limit:-5}}, mockRes, mockarticles);
        expect(value.currentPage).toBe(2);
        expect(value.limit).toBe(5);
        
    });
    

})