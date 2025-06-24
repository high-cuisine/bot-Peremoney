var formdata = new FormData();
formdata.append("public_key", "8c7f204e5b6eb766c289b821a2a4b11c ");
formdata.append("clip_name", "1674816625");
formdata.append("clip_file", fileInput.files[0], "file");
formdata.append("speaker", "your_speaker");
formdata.append("text", "your_text");

var requestOptions = {
  method: 'POST',
  body: formdata,
  redirect: 'follow'
};

fetch("https://zvonok.com/manager/cabapi_external/api/v1/audio/upload/", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));