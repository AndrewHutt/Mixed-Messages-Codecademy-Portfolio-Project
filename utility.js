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
const populateCategories = async () => { 
    const tags = await axios.get('https://api.quotable.io/tags')  
    const categories = tags.data.map(element=> element.slug);
    // console.log("Categories Liength: " + categories.length);

    //checking all categories to make sure they return a response
    const promiseList = [];
    categories.forEach(category => { 
        // console.log(`Checking ${category}`)
        const endpoint = `https://api.quotable.io/quotes/random?tags=${category}`
        promiseList.push(axios.get(endpoint));
    })
    const categoryCheck = await Promise.all(promiseList);
    // console.log(categoryCheck);
    let removelist = categoryCheck.filter(element => !element.data[0]);
    removelist = removelist.map(element => { 
        const url = element.config.url;
        return url.split("=")[1];
    })
    
    //removing non-matching categories
    removelist.forEach(element => {  
        const location = categories.indexOf(element);
        console.log(location)
        console.log(categories.splice(location, 1)); 
    })

    // console.log("Categories length: " + categories.length);
    
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
}
//Setup Calls
// Uncomment to call update categories
// populateCategories();


//Exports
module.exports.rand = rand;
module.exports.randQuoteCount = randQuoteCount;
module.exports.getCategory = getCategory;