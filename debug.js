const axios = require('axios');
const content = [];

for (i = 0; i < 10; i++) { 
    axios.get('https://api.quotable.io/quotes/random?tags=humorous').then(res => { 
        console.log(res.data)
        if (res.data.length == 0) { 
            console.log('Empty')
        }
        // content.push(res.data.content);
    })
}

/*
if (!content[0]) { 
    console.log('Not Empty');
}
// console.log(content[0]);

*/


//Problem -- some categories dont return any values. this means that there is no conent and causes issues with returns. Should add a check to the initial config builder. 