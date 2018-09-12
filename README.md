# setsail_api

This is a simple api server that stores and manages todo lists for the user that uses [Firebase](https://firebase.google.com) as the database

## Deliverables/ Assumptions
- Run on local Node.JS / Python server for the following APIs. 
- NO frontend development is required. 
- Please include all dependencies and instruction on how to run your code in README.
- You can choose what methods to use for each API and their respective request and response formats.
- All TODO Items are stored in Google Firebase or Firestore (it’s free to use).
- NO Authentication is required.

Optional: 
- Share your API collection using Postman Collection URL
- Unit testing



## Dependencies

Libraries used in this project include:

- Body-parser
- Express
- Axios

## Run Instructions

1. Install [Node.JS](https://nodejs.org/) (recommended version > 8.x).

2. Clone this repository and navigate to it.
```
git clone git@github.com:skhchiang/setsail_api.git
cd setsail_api
```

3. Install dependencies.
```
npm install
```

4. Start the server in your command prompt/terminal within the root folder.
```
node index.js
```

5. Start [Postman](https://www.getpostman.com/).

6. Make API calls with Postman. Enter the URL into the URL bar, enter body content into the body section (where necessary).

### GET

URL: https://localhost:3000/api/{todo_id:string} 

Expected Response:
```
{   "todo_created": {string},
    "todo_deadline": {string},
    "todo_name": {string},
    "user_id": {number}    }
```
    
### POST

URL: http://localhost:3000/api/

Body Content:
```
{	"userId": {number},
	"tdName": {string},
	"tdDl": {string}  }
```

Expected Response:
```
{  "name": {string} }
```
###PATCH (Update)

URL: https://localhost:3000/api/{todo_id:string}

Body Content:
```
{	"userId": {number},
	"tdName": {string},
	"tdDl": {string}  }
```  
Expected Response:
```
{   "todo_created": {string},
    "todo_deadline": {string},
    "todo_name": {string},
    "user_id": {number}    }
```    
### DELETE

URL: https://localhost:3000/api/{todo_id:string}

Expected Response:
```
Success/Fail
```
### GET (all items by user's id)

URL: https://localhost:3000/api/all{user's_id:number}

Expected Response:
```
[  {   "todo_created": {string},
       "todo_deadline": {string},
       "todo_name": {string},
       "user_id": {number}    },
   {   "todo_created": {string},
       "todo_deadline": {string},
       "todo_name": {string},
       "user_id": {number}    }   ]
```

### Tests

To run tests, first download and install [Jasmine](https://jasmine.github.io/)
```
npm jasmine
```
Then from the root folder, enter the command
```
jasmine
```
to run all tests




