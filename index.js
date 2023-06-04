// @ts-check
require('dotenv').config()
const axios = require('axios');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());

app.get('/telegram', async (req, res) => {
  const token = process.env.TELEGRAM_TOKEN;
  const text = req.query.text;
  const chatId = req.query.chat_id;

  if (!token || !text || !chatId) {
    return res.status(400).send({ status: 'Informe os parametros meu filho' });
  }

  const newLocal = `https://api.telegram.org/${token}/sendMessage?chat_id=${chatId}&text=${text}`;

  let config = {
    method: 'get',
    maxBodyLength: Infinity,
    url: newLocal,
    headers: {}
  };

  try {
    const { data } = await axios.request(config);
    console.log(JSON.stringify(data));
    return res.send(data);
  } catch (error) {
    return res.status(500).send({ status: 'deu erro meu filho' });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log('api rodando gatona');
})


