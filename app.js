const axios = require('axios');
const { randQuoteCount, getCategory } = require('./utility');

//test quote get request
const getQuote = async (str) => { 
    // get category
    const cateogry = await getCategory();
    // console.log(cateogry);
    try { 
        //build request
        const endpoint = 'https://api.quotable.io/quotes/random?tags=' + cateogry
        //call quote api
        const response = await axios.get(endpoint);
        const responseQuote = response.data[0];
        if (!responseQuote) { 
            return `

No Quote Found. Search Category: ${cateogry}.
            
            `
        } else { 
            // console.log(responseQuote);
            return str + `

The quote subject is ${cateogry}. 
Quote: ${responseQuote.content} 
Author: ${responseQuote.author}
`
        }
    } 
    catch (err) { 
        //error handling
        console.log(err);
    }
}

//return function
const main =async () => { 
    const quoteReturn = randQuoteCount();
    if (quoteReturn.quoteCount !== 0){ 
        const promises = []; 
        for (i = 0; i < quoteReturn.quoteCount; i++) {
            promises.push(getQuote(`Quote number ${i + 1} coming at you:`));
        }

        try {
            const results = await Promise.all(promises);
            console.log(quoteReturn.quoteCountText);
            console.log();
            results.forEach(result => console.log(result))
        } catch (error) {
            console.error('Error:', error);
        }
    } else { 
        console.log(quoteReturn.quoteCountText);    
    }
}
main();




