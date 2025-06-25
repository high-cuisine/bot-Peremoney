var axios = require('axios');
var FormData = require('form-data');
var fs = require('fs');
var data = new FormData();
data.append('public_key', 'your_public_key');
data.append('clip_name', 'your_clip_name');
data.append('clip_file', fs.createReadStream('/path/to/file'));
data.append('speaker', 'your_speaker');
data.append('text', 'your_text');

var config = {
  method: 'post',
maxBodyLength: Infinity,
  url: 'https://zvonok.com/manager/cabapi_external/api/v1/audio/upload/',
  headers: { 
    ...data.getHeaders()
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
})
.catch(function (error) {
  console.log(error);
});
