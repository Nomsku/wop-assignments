'use strict';
const {cats, getCat} = require('../models/catModel');


const cat_list_get = (req, res) => {
  res.json(cats);
};

const cat_get = (req, res) => {
    const cat = getCat(req.params.id);
    console.log('kisu', cat);
    res.json(cat);
}

const cat_post = (req, res) => {
    console.log('cat_post', req.body, req.file);
    res.send('Cat post sent.');
}

module.exports = {
  cat_list_get,
  cat_get,
  cat_post,
};
