const jsonData = {"phone":"79194567890","timestamp":1725631671,"website":"dmp.one","page":"https:\/\/dmp.one\/","page_with_parameters":"https:\/\/dmp.one\/?yclid=3725717487900465674","yid":"yeUUfxApgXckWntCxYGj","email":["test@test.test"],"utm_source":"yandex_ibr","utm_medium":"cpc","utm_campaign":"utm_\u043a\u0430\u043c\u043f\u0430\u043d\u0438\u044f|22964259","utm_term":"utm_\u0442\u0435\u0440\u043c","utm_content":"k50id|0100000011125291681_|cid|22964259|gid|2957028098|aid|4832745869|adp|no|pos|premium1|src|search_none|dvc|desktop|main","referer":"https:\/\/yandex.ru\/","ip":"127.0.0.1","stock_key":"1a79a4d60de6718e8e5b326e338ae533","visit__id":123123}
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.json(jsonData);
});

app.listen(7001, () => {
    console.log('Server is running on port 7001');
});