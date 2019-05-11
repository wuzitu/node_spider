

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

let newsList = [], count = 0
// get news
request.get(`http://www.jianbinguozi.com/`)
    .then(res => {
        logger.info(`获取ok`)
        const $ = cheerio.load(res.text)
        // fs.writeFileSync('page1.html', res.text)
        let tmpList = $($(".list-bd")[0]).find('li');
        tmpList.length = 15;
        tmpList.each((index, news) => {

            let str = $($(news).find('span')).text().trim() || '';
            let sTime = $($(news).find('time')).text().trim() || ''
            let href = $($(news).find('a')).attr('href').trim() || ''
            newsList.push({
                title: str,
                sTime: sTime,
                href: href
            })
        })

        newsList.forEach(element => {
            request.get(`http://www.jianbinguozi.com${element.href}`)
                .then(res => {
                    console.log('获取情报OK = 》 ' + element.title)
                    var $ = cheerio.load(res.text)
                    let html = $('.new-bd__inner') || '';
                    var RST = ''
                    getContent(html)
                    // let $text = cheerio.load(html.replace(/\<\s{0,5}br\s{0,5}\/{0,1}\s{0,5}\>/, '\n'))
                    // let text = html.replace(/\<\s{0,5}br\s{0,5}\/{0,1}\s{0,5}\>/, '\n')
                    // let text = $text.text()
                    console.log(RST)
                    // get over
                    delete element.href
                    element.content = RST
                    count++
                    if (count >= 15) {
                        fs.writeFileSync(__dirname + '/newsList.json', JSON.stringify(newsList))
                    }

                    // function
                    function getContent(node) {
                        var a = node.contents();
                        if (a.length == 0) {
                            if (node.is('br')) {
                                RST += '\n';
                            } else {
                                RST += node.text().trim();;
                            }
                        } else {
                            node.contents().each(function (i, elem) {
                                getContent($(this));
                            });

                            if (node.is('p') || node.is('tr')) {
                                RST += '\n';
                            }
                        }
                    }
                })
        });

    })



