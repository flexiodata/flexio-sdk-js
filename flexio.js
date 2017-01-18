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
        this.debug_active = false;
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

    setDebug(value)
    {
        this.debug_active = value;
    }

    debug(str)
    {
        if (this.debug_active)
        {   
            console.log.call(arguments);
        }
    }
    
    run()
    {

        this.doCall('GET', '/api/v1/search', null, {"name":this.pipe}, (res)=>{

            if (!Array.isArray(res) || res.length != 1 || !res[0].hasOwnProperty('eid'))
                throw '/api/v1/search: missing eid';

            var pipe_eid = res[0].eid;

            this.doCall('POST', '/api/v1/processes', null, {parent_eid:pipe_eid}, (res)=>{
            
                if (!res.hasOwnProperty('eid'))
                    throw '/api/v1/processes: missing eid';

                var process_eid = res['eid'];

                if (this.files.length > 0)
                {
                    // send the files, and then run the pipe process
                    this.sendOneFile(process_eid, ()=>{
                        this.doCall('POST', '/api/v1/processes/'+process_eid+'/run?background=false', null, {}, (res)=>{});
                    });
                }
                 else
                {
                    // no files to send, just run the pipe process
                    this.doCall('POST', '/api/v1/processes/'+process_eid+'/run?background=false', null, {}, (res)=>{});
                }

            });

        });



    }


    doCall(method, path, filename, body, callback)
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
            this.debug("length", body.length, body);
            if (body.length > 0)
            {
                options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
                options.headers['Content-Length'] = body.length;
            }
        }


        if (method == 'GET')
        {
            path += '?' + body;
            options.path = path;
        }

        this.debug(method + ' ' + this.host + path, 'Authorization: Bearer ' + this.apikey);




        var request = https.request(options, (response) => {

            this.debug('statusCode:', response.statusCode);

            var body = '';

            response.on('data', function(d) {
                body += d;
            });

            response.on('end', function() {

                //this.debug('Body: ' + body);

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
            var header = '--' + boundary + '\r\nContent-Disposition: form-data; name="file"; filename="' + filename + '"\r\nContent-Type: application/octet-stream\r\n\r\n';
            this.debug(header);

            request.write(header);
            body.pipe(request);
            body.on('close', function () {
                request.end('\r\n--' + boundary + '--\r\n\r\n');
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
        var stream;

        if (filename === null)
        {
            this.debug("Sending stdin");
            filename = "file.txt";
            stream = process.stdin;
        }
         else
        {
            this.debug("Sending " + filename);
            stream = fs.createReadStream(filename);
        }

        this.doCall('POST', '/api/v1/processes/'+process_eid+'/input', filename, stream, (res)=>{
        
            if (this.files.length == 0)
                callback();
                 else
                this.sendOneFile(process_eid, callback);

        });

    }
}

