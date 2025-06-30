var axios = require('axios');
var FormData = require('form-data');
var data = new FormData();
data.append('public_key', '8c7f204e5b6eb766c289b821a2a4b11c');
data.append('phone', '+79658879405');
data.append('campaign_id', '1674816625');
data.append('text', '<audio id="319475872"/>');

var config = {
  method: 'post',
maxBodyLength: Infinity,
  url: 'https://zvonok.com/manager/cabapi_external/api/v1/phones/call/',
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
