const axios = require('axios');
const { rand, randQuoteCount, getCategory } = require('./utility');

/*
//test quote get request.
axios.get('https://api.quotable.io/quotes/random?tags=Work') 
  .then(function (response) {
    // handle success
    console.log(response.data);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });

*/
console.log(randQuoteCount());
(async () => { 
    const cateogry = await getCategory();
    console.log(cateogry);
})();


