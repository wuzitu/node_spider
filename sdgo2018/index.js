

const cheerio = require('cheerio');
const fs = require('fs')
const request = require('superagent');


// 启动log
const log4js = require('log4js');
log4js.configure({
    appenders: { cheese: { type: 'file', filename: './jianbin.log' } },
    categories: { default: { appenders: ['cheese'], level: 'trace' } }
});
const logger = log4js.getLogger('cheese');

request.get(`http://sdgo2018.rf.gd/search_v2?id=10238`)
    .then(res => {
        logger.info(`获取ok`)
        const $ = cheerio.load(res.text)
        let HP = $($('#info').find('tr')[4]).text();
        console.log(HP)

    })