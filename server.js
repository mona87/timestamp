var http = require('http');
var path = require('path');
var moment = require('moment'); 


var express = require('express');


var app = express();



const formatArray = 
["MMMM DD,YYYY", 
"MM D YYYY",
"MMM,D YYYY",
"ddd, DD MMM YYYY HH:mm:ss ZZ",
"dddd, DD-MMM-YYYY HH:mm:ss ZZ",
"YYYY-MM-DD HH:mm Z",
"YYYY-MM-DD HH:mm", 
"dd, MMM DD YYYYY",
"D, d M y",
"DD, dd-M-y",
"D, d M y",
"D, d M yy",
"D, d M yy",
moment.ISO_8601 ];

 convertToUnix = (req, res, next) =>{
 	let param = req.params.param;
	if (moment(param, formatArray, 'en').isValid()){
		//convert to natural date to timestamp
		console.log('is natural')

		// console.log('m',moment(query.toString()).format("MMMM D, YYYY", 'en'));
		let natural = moment(param,formatArray).format("MMMM D, YYYY", 'en')
		//convert natural date to timestamp
		let timestamp = moment(param,formatArray).toISOString();
		//convert timestamp to unix
		let unix = moment(timestamp).unix();
			console.log(timestamp)
		console.log(unix)

		res.send({unix: unix, natural: natural});

	} 
	else{

		res.send({unix: null, natural: null});
	}

}

convertToDate = (req, res, next) => {
	console.log(req.params)
	let param = req.params.param;

	let time = moment.unix(param).utc().format("MMMM D, YYYY");

	if(time !== 'Invalid date'){
		console.log('isValid')
		//output
		res.send({unix: parseInt(param), natural: time})
	}
	else {
		next();
	}
}

isNull = (req,res,next) => {
	console.log(req.params)
	let param = req.params.param;

	if(param){
		console.log('isnull')
		next()
	}else{
		console.log('null')
	
		// res.sendFile(path.resolve(__dirname + '/client/index.html'));
	}
}

app.use(express.static('client'));

app.get('/:param', convertToDate, convertToUnix);


app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0", function(){
	  console.log("server listening at 3000");
})