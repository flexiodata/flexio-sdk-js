'use strict';


var https = require('https');
var crypto = require('crypto');
var querystring = require('querystring');
var fs = require('fs');

module.exports = class Flexio
{
    constructor()
    {
        this.files = [];
    }

    setApiKey(value)
    {
        this.apikey = value;
    }

    setHost(value)
    {
        this.host = value;
    }

    setPort(value)
    {
        this.port = value;
    }

    setPipe(value)
    {
        this.pipe = value;
    }

    addFile(value)
    {
        this.files.push(value);
    }

    run()
    {


        this.doCall('POST', '/api/v1/processes', {parent_eid:this.pipe}, (res)=>{
        
            if (!res.hasOwnProperty('eid'))
                throw '/api/v1/processes: missing eid'

            var process_eid = res['eid'];

            console.log('About to send file');
            this.sendOneFile(process_eid, ()=>{

                this.doCall('POST', '/api/v1/processes/'+process_eid+'/run?background=false', {}, (res)=>{});
        

            });

        });


    }


    doCall(method, path, body, callback)
    {

        var options = {
            'host': this.host,
            'port': this.port,
            'path': path,
            'method': method,
            'headers': {
                'Authorization': 'Bearer ' + this.apikey
            }
        };


        var bodytype;
        var boundary;


        if (Buffer.isBuffer(body))
        {
            bodytype = 'buffer';
        }
        else if (typeof body === 'object' && typeof body.pipe === 'function')
        {
            bodytype = 'stream';

            var hash = crypto.createHash('sha256');
            hash.update(Date() + Math.random());
            boundary =  hash.digest('hex');
            options.headers['Content-Type'] = 'multipart/form-data; boundary=' + boundary;

        }
        else
        {
            bodytype = 'formdata';
            body = querystring.stringify(body);
            console.log("length", body.length, body);
            if (body.length > 0)
            {
                options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                options.headers['Content-Length'] = body.length;
            }
        }


        console.log(method + ' ' + this.host + path, 'Authorization: Bearer ' + this.apikey);

        var request = https.request(options, (response) => {

            console.log('statusCode:', response.statusCode);

            var body = '';
            response.on('data', function(d) {
                body += d;
            });
            response.on('end', function() {

                console.log('Body: ' + body);

                try
                {
                    var parsed = JSON.parse(body);
                    callback(parsed);
                }
                catch (e)
                {

                }

            });
        });


        if (bodytype == 'formdata')
        {
            request.write(body);
            request.end();
        }
        else if (bodytype == 'stream')
        {

            request.write('--' + boundary + '\r\nContent-Disposition: form-data; name="file"; filename="file.txt"\r\nContent-Type: application/octet-stream\r\n\r\n');
            body.pipe(request);
            body.on('close', function () {
                request.end('Hello there\r\n--' + boundary + '--\r\n\r\n');
            });
        }
        else if (bodytype == 'buffer')
        {
            request.write(body);
       	    request.end();
        }




    }



    sendOneFile(process_eid, callback)
    {
        if (this.files.length == 0)
            return;
        
        var filename = this.files.shift();

        var stream = fs.createReadStream(filename);

        this.doCall('POST', '/api/v1/processes/'+process_eid+'/input', stream, (res)=>{
        
            this.sendOneFile(process_eid, callback);

            if (this.files.length == 0)
                callback();
        });

    }
}

