const fs = require('fs');
const FormData = require('form-data');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

// Отправка CSV файла с номерами
async function sendPhonesFromCSV() {
    try {
        // Читаем файл используя fs
        const fileContent = fs.readFileSync('test.csv');
        
        // Создаем FormData для отправки файла
        const formdata = new FormData();
        formdata.append("public_key", "b569649e60e61f9cd7677f271a426136");
        formdata.append("phones_file", fileContent, {
            filename: 'test.csv',
            contentType: 'text/csv'
        });
        formdata.append("campaign_id", "1115153125");
        formdata.append('text_from_column', '2');

        const result = await fetch("https://zvonok.com/manager/cabapi_external/api/v1/phones/append/calls/", {
            method: 'POST',
            body: formdata
        });
        
        const responseText = await result.text();
        console.log(responseText);
    } catch (error) {
        console.log('error', error);
    }
}

sendPhonesFromCSV();