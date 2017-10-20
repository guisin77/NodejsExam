var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(__dirname+'/public'));

//크로스도메인 이슈 대응 (CORS)
var cors = require('cors')();
app.use(cors);

var mysql = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'test1234',
  database : 'restful'
}); 
connection.connect();

/*
///////////////////////////////////
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/restful';
var dbObj = null;
MongoClient.connect(url, function(err, db) {
  console.log("Connected correctly to server");
  dbObj = db;
});
*/
///////////////////////////////////
  




///////////////////////////////////
// mongo
///////////////////////////////////
/*
app.get('/user/message',function(req,res) {
	console.log(req.query.sender_id);
	var condition = {};
	if (req.query.sender_id != undefined)
		condition = {sender_id:req.query.sender_id};
	var messages = dbObj.collection('messages');
	messages.find(condition)
		.toArray(function(err, results){
		if (err) {
			res.send(JSON.stringify(err));
		} else {
			res.send(JSON.stringify(results));
		}
	});
});
var ObjectID = require('mongodb').ObjectID;
app.get('/user/message/:id',function(req,res) {
	var messages = dbObj.collection('messages');
	messages.findOne(
		{_id:ObjectID.createFromHexString(req.params.id)},
		function(err, result){
			if (err) {
				res.send(JSON.stringify(err));
			} else {
				res.send(JSON.stringify(result));
			}
		});
});
app.post('/user/message',function(req,res) {
	console.log(req.body.sender_id);
	console.log(req.body.reciever_id);
	console.log(req.body.message);
	connection.query(
		'select id,name from user where id=? or id=?',
		[req.body.sender_id,req.body.reciever_id],
		function(err, results, fields) {
			if (err) {
				res.send(JSON.stringify(err));
			} else {
				var sender = {};
				var reciever = {};
				for (var i = 0; i < results.length; i++){
					if (results[i].id == 
						Number(req.body.sender_id)) {
						sender = results[i];
					}
					if (results[i].id ==
						Number(req.body.reciever_id)) {
						reciever = results[i];
					}
				}
				var object = {
					sender_id:req.body.sender_id,
					reciever_id:req.body.reciever_id,
					sender:sender, reciever:reciever,
					message:req.body.message,
					created_at:new Date()
				}
				var messages = dbObj.collection('messages');
				messages.save(object, function(err, result){
					if (err) {
						res.send(JSON.stringify(err));
					} else {
						res.send(JSON.stringify(result));
					}
				});
			}
		});
});
app.delete('/user/message/:id',function(req,res) {
	var messages = dbObj.collection('messages');
	messages.remove(
		{_id:ObjectID.createFromHexString(req.params.id)},
		function(err, result){
			if (err) {
				res.send(JSON.stringify(err));
			} else {
				res.send(JSON.stringify(result));
			}
		});
});
*/




app.get('/sound/list',function(req,res) {
	connection.query('select * from sound_mas', 
		function(err,results,fields) {
			if (err) {
				res.send(JSON.stringify(err));
			} else {
				res.send(JSON.stringify(results));
			}
		});
});

app.get('/sound/:id',function(req,res){
	console.log('get');
	connection.query('select * from sound_mas where id=?',
		[req.params.id], function(err, results, fields) {
			if (err) {
				res.send(JSON.stringify(err));
			} else {
				if (results.length > 0) {
					res.send(JSON.stringify(results[0]));
				} else {
					res.send(JSON.stringify({}));
				}
				
			}
		});
});

/*
app.post('/sound',function(req,res){
	connection.query(
		'insert into sound_mas(  sound_info , sound_file, sound_size, sound_play_sec  ) values(?, ? , ?,?)',
		[ req.body.sound_info, req.body.sound_file , req.body.sound_size,   req.body.sound_play_sec  ], 
		function(err, result) {
			if (err) {
				res.send(JSON.stringify(err));
			} else {
				res.send(JSON.stringify(result));
			}
		})
});
*/
////////////////////
// file upload 
////////////////////
var multer = require('multer');
var Storage = multer.diskStorage({
     destination: function(req, file, callback) {
         callback(null, "./public/upload_sound/");
     },
     filename: function(req, file, callback) {
     		file.uploadedFile = file.fieldname + "_" + 
     			Date.now() + "_" + file.originalname;
     		console.log('file.uploadedFile:'+file.uploadedFile);  
 
         callback(null, file.uploadedFile);
     }
 });
 var upload = multer({
     storage: Storage
 }).single("sound");

///////////////////////////////////////////////
app.post('/sound',function(req, res) {
	upload(req, res, function(err) {
		if (err) {
			res.send(JSON.stringify(err));
		} else {

			connection.query(
			'insert into sound_mas(  sound_info , sound_file, sound_size, sound_play_sec  ) values(?, ? , ?,?)',
			[ req.body.sound_info,  req.file.uploadedFile , 0 ,   0  ], 
		
			function(err, result) {
				if (err) {
					res.send(JSON.stringify(err));
				} else {
					//res.send(JSON.stringify(result));
					res.send(JSON.stringify({url:req.file.uploadedFile,
				description:req.body.description}));
				}
			}) 
 
		}
	});
});
 
app.delete('/sound/:id',function(req,res){
	console.log('delete');

	connection.query('delete from sound_mas where id=?',
		[ req.params.id ], function(err, result) {
			if (err) {
				res.send(JSON.stringify(err));
			} else {
				res.send(JSON.stringify(result));
			}
		});
});

app.listen(52273,function() {
	console.log('Server running');
});
