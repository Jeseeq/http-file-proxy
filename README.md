# http-file-proxy

To run this example:

* clone repository  
```git clone https://github.com/Jeseeq/http-file-proxy```
* run server  
```npm run start```
* curl post request  
```echo 'some random string' | curl -d @- localhost:3000```  
or  
```cat ../some-file | curl -d @- localhost:3000```  
* check response  

To run tests  
```npm install```  
```npm run test``` 

Resources:

* [fs](https://nodejs.org/dist/latest-v4.x/docs/api/fs.html) node documentation
* [http](https://nodejs.org/dist/latest-v4.x/docs/api/http.html) node documentation
* [stream](https://nodejs.org/dist/latest-v4.x/docs/api/stream.html) node documentation
* [chai](http://chaijs.com/) assertion library
* [mocha](https://mochajs.org/) test runner
