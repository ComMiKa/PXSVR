// PX Server Tnnl
var formidable = require('formidable'),
    http = require('http'),
    util = require('util');
var request = require('request');


http.createServer(function(req, res) {
  if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
    // parse a file upload
    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields, files) {
      /*
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: files}));
      console.log(util.inspect( (fields.headers.host.toString()) ));
      */
        var baseRequest = request.defaults({
		//'proxy':REM_PROXY,
		//tunnel : false,
		'strictSSL' : false,
		'json': true });
		
        var opt = {
            url:fields.path,
            headers:fields.headers,
            method: fields.method,
            body: fields.postdata,
        };
        
        baseRequest(opt , function optionalCallback(err, httpResponse, body) {
	// baseRequest.post({url:REM_URL, form:JSONPck} , function optionalCallback(err, httpResponse, body) {
	//baseRequest.post(REM_URL, ires,function optionalCallback(err, httpResponse, body) {
            if (err) {
                return console.error('upload failed:', err);
            }
                console.log('Successful! > ', fields.method + ' ' + fields.path ,'  with:' + "body");
        }).pipe(res);
        
        
    });

    return;
	}

  // show a file upload form
  /*
    res.writeHead(200, {'content-type': 'text/html'});
  res.end(
    '<form action="/upload" enctype="multipart/form-data" method="post">'+
    '<input type="text" name="title"><br>'+
    '<input type="file" name="upload" multiple="multiple"><br>'+
    '<input type="submit" value="Upload">'+
    '</form>'
  );*/
    else{
        console.log(req.method, " ", req.headers);
        
    }
}).listen(9544);