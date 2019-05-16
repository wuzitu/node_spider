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
    request.get(`http://sdgo2018.rf.gd/search_v2?id=${ID}`)
        .set('Cookie', '__test=9082aaf3a53d52bd07c44c4588290206; fs=16; l=SC')
        .then(res => {
            try {
                logger.info(`获取ok`)
                let gundam = {}
                const $ = cheerio.load(res.text)
                let HP = $($($('#info').find('tr')[4]).find('td')[1]).text().trim();
                let att2 = $($($('#info').find('tr')[5]).find('td')[2]).text().trim();
                let def2 = $($($('#info').find('tr')[6]).find('td')[2]).text().trim();
                let fly2 = $($($('#info').find('tr')[7]).find('td')[2]).text().trim();
                let ctl2 = $($($('#info').find('tr')[8]).find('td')[2]).text().trim();
                let dect = $($($('#info').find('tr')[10]).find('td')[1]).text().trim();
                let dect2 = $($($('#info').find('tr')[10]).find('td')[2]).text().trim();
                let modelType = '';
                let trindex = 0;
                if ($($($('#info').find('tr')[11])).text().trim().match('特性')) {
                    modelType = $($($('#info').find('tr')[11]).find('td')[1]).text().trim().split('、');
                    trindex++;
                }

                let sdgoID = $($($('#info').find('input'))).val()
                console.log(sdgoID)
                // weapon
                let arm1_1_des = $($($("#armament").find('tr')[1]).find('td')[1]).text().trim() || "";
                let arm1_1_power = $($($("#armament").find('tr')[1]).find('td')[2]).text().trim() || "";
                let arm1_1_ammunitition = $($($("#armament").find('tr')[1]).find('td')[3]).text().trim() || "";
                let arm1_1_reload = $($($("#armament").find('tr')[1]).find('td')[4]).text().trim() || "";
                // let arm1_1_effact = $($($("#armament").find('tr')[1]).find('td')[5]).text().trim() || "";
                let arm1_1_effact = $($($("#armament").find('tr')[1]).find('td')[5]).text() ? cheerio.load($($($("#armament").find('tr')[1]).find('td')[5]).html().replace(/\s/, '').replace('<br>', ',')).text().trim() : '';

                let arm1_2_des = $($($("#armament").find('tr')[2]).find('td')[1]).text().trim() || "";
                let arm1_2_power = $($($("#armament").find('tr')[2]).find('td')[2]).text().trim() || "";
                let arm1_2_ammunitition = $($($("#armament").find('tr')[2]).find('td')[3]).text().trim() || "";
                let arm1_2_reload = $($($("#armament").find('tr')[2]).find('td')[4]).text().trim() || "";
                let arm1_2_effact = $($($("#armament").find('tr')[2]).find('td')[5]).text() ? cheerio.load($($($("#armament").find('tr')[2]).find('td')[5]).html().replace(/\s/, '').replace('<br>', ',')).text().trim() : '';

                let arm1_3_des = $($($("#armament").find('tr')[3]).find('td')[1]).text().trim() || "";
                let arm1_3_power = $($($("#armament").find('tr')[3]).find('td')[2]).text().trim() || "";
                let arm1_3_ammunitition = $($($("#armament").find('tr')[3]).find('td')[3]).text().trim() || "";
                let arm1_3_reload = $($($("#armament").find('tr')[3]).find('td')[4]).text().trim() || "";
                let arm1_3_effact = $($($("#armament").find('tr')[3]).find('td')[5]).text() ? cheerio.load($($($("#armament").find('tr')[3]).find('td')[5]).html().replace(/\s/, '').replace('<br>', ',')).text().trim() : '';

                let shild1_HP = $($($("#armament").find('tr')[4]).find('td')[1]).text().trim() || "";
                let shild1_def = $($($("#armament").find('tr')[4]).find('td')[2]).text().trim() || "";

                let arm2_1_des = $($($("#armament").find('tr')[7]).find('td')[1]).text().trim() || "";
                let arm2_1_power = $($($("#armament").find('tr')[7]).find('td')[2]).text().trim() || "";
                let arm2_1_ammunitition = $($($("#armament").find('tr')[7]).find('td')[3]).text().trim() || "";
                let arm2_1_reload = $($($("#armament").find('tr')[7]).find('td')[4]).text().trim() || "";
                let arm2_1_effact = $($($("#armament").find('tr')[7]).find('td')[5]).text() ? cheerio.load($($($("#armament").find('tr')[7]).find('td')[5]).html().replace(/\s/, '').replace('<br>', ',')).text().trim() : '';

                let arm2_2_des = $($($("#armament").find('tr')[8]).find('td')[1]).text().trim() || "";
                let arm2_2_power = $($($("#armament").find('tr')[8]).find('td')[2]).text().trim() || "";
                let arm2_2_ammunitition = $($($("#armament").find('tr')[8]).find('td')[3]).text().trim() || "";
                let arm2_2_reload = $($($("#armament").find('tr')[8]).find('td')[4]).text().trim() || "";
                let arm2_2_effact = $($($("#armament").find('tr')[8]).find('td')[5]).text() ? cheerio.load($($($("#armament").find('tr')[8]).find('td')[5]).html().replace(/\s/, '').replace('<br>', ',')).text().trim() : '';

                let arm2_3_des = $($($("#armament").find('tr')[9]).find('td')[1]).text().trim() || "";
                let arm2_3_power = $($($("#armament").find('tr')[9]).find('td')[2]).text().trim() || "";
                let arm2_3_ammunitition = $($($("#armament").find('tr')[9]).find('td')[3]).text().trim() || "";
                let arm2_3_reload = $($($("#armament").find('tr')[9]).find('td')[4]).text().trim() || "";
                let arm2_3_effact = $($($("#armament").find('tr')[9]).find('td')[5]).text() ? cheerio.load($($($("#armament").find('tr')[9]).find('td')[5]).html().replace(/\s/, '').replace('<br>', ',')).text().trim() : '';

                let shild2_HP = $($($("#armament").find('tr')[10]).find('td')[1]).text().trim() || "";
                let shild2_def = $($($("#armament").find('tr')[10]).find('td')[2]).text().trim() || "";


                // skill
                let skill1 = $($($('#info').find('tr')[11 + trindex]).find('td a img')).attr('alt') ? $($($('#info').find('tr')[11 + trindex]).find('td a img')).attr('alt').split(/\n/).slice(2) : []
                let skill2 = $($($('#info').find('tr')[12 + trindex]).find('td a img')).attr('alt') ? $($($('#info').find('tr')[12 + trindex]).find('td a img')).attr('alt').split(/\n/).slice(2) : []

                let YUKID = $($($("#id table tr")[0]).find('a')[3]).attr('href') ? $($($("#id table tr")[0]).find('a')[3]).attr('href').trim().slice(-5) : ''

                // texing
                let texing1 = $($($("#armament").find('tr')[5]).find('td')[2]).text().trim()&&$($($("#armament").find('tr')[5]).find('td')[2]).text().trim().slice(5) || "";
                let texing2 = $($($("#armament").find('tr')[11]).find('td')[2]).text().trim()&&$($($("#armament").find('tr')[5]).find('td')[2]).text().trim().slice(5) || "";
                gundam = {
                    ID: sdgoID,
                    HP: HP,
                    att2: att2,
                    def2: def2,
                    fly2: fly2,
                    ctl2: ctl2,
                    dect: dect,
                    dect2: dect2,
                    modelType: modelType,
                    arm1_1_des: arm1_1_des,
                    arm1_1_power: arm1_1_power,
                    arm1_1_ammunitition: arm1_1_ammunitition,
                    arm1_1_reload: arm1_1_reload,
                    arm1_1_effact: arm1_1_effact,
                    arm1_2_des: arm1_2_des,
                    arm1_2_power: arm1_2_power,
                    arm1_2_ammunitition: arm1_2_ammunitition,
                    arm1_2_reload: arm1_2_reload,
                    arm1_2_effact: arm1_2_effact,
                    arm1_3_des: arm1_3_des,
                    arm1_3_power: arm1_3_power,
                    arm1_3_ammunitition: arm1_3_ammunitition,
                    arm1_3_reload: arm1_3_reload,
                    arm1_3_effact: arm1_3_effact,

                    arm2_1_des: arm2_1_des,
                    arm2_1_power: arm2_1_power,
                    arm2_1_ammunitition: arm2_1_ammunitition,
                    arm2_1_reload: arm2_1_reload,
                    arm2_1_effact: arm2_1_effact,
                    arm2_2_des: arm2_2_des,
                    arm2_2_power: arm2_2_power,
                    arm2_2_ammunitition: arm2_2_ammunitition,
                    arm2_2_reload: arm2_2_reload,
                    arm2_2_effact: arm2_2_effact,
                    arm2_3_des: arm2_3_des,
                    arm2_3_power: arm2_3_power,
                    arm2_3_ammunitition: arm2_3_ammunitition,
                    arm2_3_reload: arm2_3_reload,
                    arm2_3_effact: arm2_3_effact,





                    shild1_HP: shild1_HP,
                    shild1_def: shild1_def,
                    shild2_HP: shild2_HP,
                    shild2_def: shild2_def,
                    skill1: skill1,
                    skill2: skill2,
                    YUKID: YUKID,
                    texing1:texing1,
                    texing2:texing2
                }

                console.log(gundamList[count].model + ' is ok')
                resultList.push(gundam)

                if (resultList.length >= 766) {
                    fs.writeFileSync(__dirname + '/result.json', JSON.stringify(resultList))
                }
                // continue
                count++
                start()
            } catch (error) {
                throw error
            }
        })
        .catch(err => {
            logger.error(err, gundamList[ID].ID);
        })
}