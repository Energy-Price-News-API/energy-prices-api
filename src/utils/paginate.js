const pagination = (req,res,model)=>{
    const page = Math.abs(parseInt(req.query.page));
    let limit = 5;
    if (parseInt(req.query.limit))
    { limit = Math.abs(parseInt(req.query.limit));}
    
    const startIndex = (page-1)*limit;
    const lastIndex = page*limit;
    const totalItems =Object.keys(model).length;
    const totalPages = Math.ceil(totalItems/limit);
    const results = {}
    const hosturl = `${req.protocol}://${req.get('host')}`; // url of host
    const apipath = req.baseUrl+req.path; //url of apipath
    if (startIndex>0) {
    let previousLink =hosturl+apipath+`?page=${page-1}`
    if (parseInt(req.query.limit))
    {
      previousLink=previousLink+`&limit=${limit}`
      
    }
    results.previous = previousLink
    }
    if (lastIndex<totalItems) {
      let nextLink =hosturl+apipath+`?page=${page+1}`
      if (req.query.limit)
      {
        nextLink=nextLink+`&limit=${limit}`
        
      }
      results.next = nextLink
      }
      results.total = totalItems;
      results.pages = totalPages
      results.limit = limit;
      results.currentPage = page;
      console.log(results)
      results.results = Object.fromEntries(Object.entries(model).slice(startIndex,lastIndex));
      return results;
  }

  module.exports = pagination