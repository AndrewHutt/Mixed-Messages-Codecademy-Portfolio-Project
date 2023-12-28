// Required Imports
const axios = require('axios');
const fs = require('fs');
const fsp = require('fs').promises;

//Const Variables
const returnCountArray = ["You don't look like you need any additional wisdom.", "You're right on your way, one quote should do for you", "You're just getting started on your journey. 2 quotes should set you on the right path.", "You really are out in the woods my friend. 3 Quotes are required just to get you back on track!"];

//Functions
//generate random number 
const rand = num => { 
    return Math.floor(Math.random() * num);
}

const randQuoteCount = () => {
    const num = rand(4);
    const quoteCountText = returnCountArray[num];
    return { 
        quoteCount: num,
        quoteCountText: quoteCountText
    }
}

// Get random category  
const getCategory = async () => { 
    let category = 'ethics'; //setting default category to ethics because everyone should care about ethics! 
    try { 
        const data = await fsp.readFile('config.json', 'utf-8');
        // console.log(data);
        const dataJSON = JSON.parse(data);
        const categories = dataJSON.categories;
        category = categories[rand(categories.length-1)];
        // console.log(category);
    } 
    catch (err) { 
        console.log(err);
    }
    return category;
}


// get tags list and populate json document. 
const populateCategories = () => { 
    axios.get('https://api.quotable.io/tags').then(function (response) {   
    const categories = response.data.map(element=> element.slug);
    // console.log(categories);
    
    //creating write object
    const output = { 
        categories: categories
    }

    // Convert array to JSON string
    const jsonString = JSON.stringify(output); 

    // Write JSON string to config.json
    fs.writeFile('config.json', jsonString, err => {
    if (err) {
        console.error('Error writing file', err);
    } else {
        console.log('Successfully wrote to config.json');
    }
    });
    
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });
}

//Setup Calls
// Uncomment to call update categories
// populateCategories();


//Exports
module.exports.rand = rand;
module.exports.randQuoteCount = randQuoteCount;
module.exports.getCategory = getCategory;