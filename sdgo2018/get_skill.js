const cheerio = require('cheerio');
const fs = require('fs')
const request = require('superagent');


// 启动log
const log4js = require('log4js');
log4js.configure({
    appenders: {
        cheese: {
            type: 'file',
            filename: './sdgo2018.log'
        }
    },
    categories: {
        default: {
            appenders: ['cheese'],
            level: 'trace'
        }
    }
});
const logger = log4js.getLogger('cheese');

// var schedule = require('node-schedule');

let count = 0;
// var j = schedule.scheduleJob('*/2 * * * * *', function () {
//     count++
//     start()
// });

const gundamList = require('./sd_db').sd_arr
let resultList = [];
start()

function start() {
    let ID = gundamList[count].ID

    if (ID == "24740") {
        return false;
    }
    // request.get(`http://sdgo2018.rf.gd/search_v2?id=10238`)
    console.log(count, ' ID:' + ID)
    // request.get(`http://sdgo.unaux.com/?id=14006&l=SC&fs=16`)
    request.get(`http://sdgo2018.rf.gd/search_v2?id=${ID}`)
        .set('Cookie', 'fs=16; __test=6db42d3a9062383bec8e2d490caf0cad; l=SC')
        .then(res => {
            try {
                logger.info(`获取${gundamList[count] && gundamList[count].model}ok,ID:${gundamList[count] && gundamList[count].ID}`)
                let gundam = {}
                const $ = cheerio.load(res.text)

                let sdgoID = $($($('#info').find('input'))).val()
                console.log(sdgoID)
                // skill
                // let skill1 = $($($('#info').find('tr')[11 + trindex]).find('td a img')).attr('alt') ? $($($('#info').find('tr')[11 + trindex]).find('td a img')).attr('alt').split(/\n/).slice(2) : []
                // let skill2 = $($($('#info').find('tr')[12 + trindex]).find('td a img')).attr('alt') ? $($($('#info').find('tr')[12 + trindex]).find('td a img')).attr('alt').split(/\n/).slice(2) : []
                let skill1 = ""
                let skill2 = ""

                for (var i = 9; i < 20; i++) {
                    let ele = $($('#info').find('tr')[i])
                    if ($(ele).find("td").length && $($(ele).find("td")[0]).text().match("技能一")) {
                        skill1 = $($(ele).find('td a svg')).length &&$($(ele).find('td a svg')).attr('tit') ? $($(ele).find('td a svg')).attr('tit').split("<n>").slice(2) : []
                    }
                    if ($(ele).find("td").length && $($(ele).find("td")[0]).text().match("技能二")) {
                        skill2 = $($(ele).find('td a svg')).length && $($(ele).find('td a svg')).attr('tit') ? $($(ele).find('td a svg')).attr('tit').split("<n>").slice(2) : []
                    }
                }

                let YUKID = $($($("#id table tr")[0]).find('a')[3]) && $($($("#id table tr")[0]).find('a')[3]).attr('href') ? $($($("#id table tr")[0]).find('a')[3]).attr('href').trim().slice(-5) : ''

                gundam = {
                    ID: sdgoID,
                    skill1: skill1,
                    skill2: skill2,
                    YUKID: YUKID,
                }

                console.log(gundamList[count].model + ' is ok')
                resultList.push(gundam)

                if (resultList.length >= 766) {
                    fs.writeFileSync(__dirname + '/result0520.json', JSON.stringify(resultList))
                }
                // continue
                count++
                start()
            } catch (error) {
                logger.error(error, gundamList[count].ID);
                count++
                start()
            }
        })
        .catch(err => {
            logger.error(err, gundamList[count].ID);
        })
}