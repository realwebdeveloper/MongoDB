var insertDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Insert some documents
    collection.insert(
      {a : 2}
      , function(err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
    //   assert.equal(1, result.ops.length);
    //   console.log("Inserted 3 documents into the collection");
      callback(result);
    });
}

var findDocuments = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      assert.equal(err, null);
      console.log("Found the following records");
      console.log(docs);
      callback(docs);
    });
}

var removeDocument = function(db, callback) {
    // Get the documents collection
    var collection = db.collection('documents');
    // Delete document where a is 3
    collection.delete({}, function(err, result) {
      assert.equal(err, null);
      assert.equal(1, result.result.n);
      console.log("Removed the document with the field a equal to 3");
      callback(result);
    });    
}

var MongoClient = require('mongodb').MongoClient
, assert = require('assert');

// Connection URL
var url = 'mongodb://localhost:27017/myproject';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, db) {
assert.equal(null, err);
console.log("Connected successfully to server");

insertDocuments(db, function() {
    findDocuments(db, function() {
        db.close();
    });
});
// removeDocument(db, function() {
//     db.close();
// });
});


const http = require('http');
const path = require('path');

var fs = require('fs');
var router = require('./router.js');

const hostname = 'localhost';
const port = 27017;

const server = http.createServer((request, response) => {
    if (request.method === 'GET') {
        switch (request.url) {
            case '/':
                fs.readFile('./public/index_public.html', 'utf8', function (err, html) {
                    response.end(html);
                });
                break;
        
            default:
                if (request.url.search(/\/api/ig) === -1) {
                    var url = request.url;
                    var linkFile = path.join(__dirname, './public', url)
                    fs.readFile(linkFile, 'utf8', function (err, js) {
                        if (err) {
                            response.statusCode = 404;
                            response.end();
                        } else {
                            response.end(js);
                        }
                    });
                }
                break;
        }
    }
            
                // response.end(router.route(request.method, request.url));
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});