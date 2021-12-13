// см. также https://kodaktor.ru/keys_form
const { createReadStream: r, readFileSync: r2 } =require('fs') ;
const { Agent } = require('https');

const a = require('axios');
const FormData = require('form-data');

const form = new FormData();
form.append('key', r('./id_rsa2'));
form.append('secret', r('./secret2'));

const httpsAgent = new Agent({
    rejectUnauthorized: false
});

const path = 'http://localhost:5000';
// const path = 'https://keys2021.kodaktor.ru';
const hh = {accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9'};
a.post(path + '/decypher', form, { headers: { ...form.getHeaders(), ...hh }, httpsAgent })
    .then( ({ data }) => {
        const result_ = data.trim().replace('\n', '').replace('\r', '');
        console.log(`URL:|${path}|`);
        console.log(`Проверялось:|${path}/decypher|`);
        console.log(`РЕЗУЛЬТАТ:|${result_}|`); // matrix
    })
    .catch( e => console.log(e));