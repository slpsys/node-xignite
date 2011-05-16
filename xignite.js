var util = require('util');
var http = require('http');
var account = { 'username': 'you@youraccount.com'};

var xQuotesOptions = {
	host: 'www.xignite.com'
	, port: 80
	, path: '/xQuotes.json/GetQuote?Symbol=MSFT'
	, method: 'GET'
}

xQuotesOptions.path += '&header_username=' + account.username;
var server = http.createServer(
	function(req, res) {
		var buf = '';
		var xreq = http.get(xQuotesOptions, function(clientRes) {
			clientRes.on('data', function(chunk) { buf += chunk; });
			clientRes.on('end', function() {
				var jsonResponse = JSON.parse(buf);
				res.writeHead(200);
				// call http://xignite.com/xQuotes.json/GetQuote?Symbol=MSFT&header_username=you@youraccount.com
				// in a browser to view the actual response structure.
				res.write("<html>MSFT: " + jsonResponse.Quote.Last + "</html>");
				res.end();
			});
		});
	});
server.listen(8080);