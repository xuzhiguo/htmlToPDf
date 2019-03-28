var fs = require('fs');
var moment = require('moment'); // moment.js
var html = fs.readFileSync('./temp/test.html', 'utf8'); // 引入html模板


var create = require('./create.js'); // 引入写好的函数
var options = {
    "format": 'A4',
    "header": {
    "height": "10mm",
    "contents": ''
}}; // 一些配置

var start = moment('2019-03-29 08:00');
var end = moment('2019-04-05T18:00');
var total = parseInt(end.diff(start, 's') / (24*60*60));




var keyword =[
    {
        key: 'reason',
        value: '感冒发烧流鼻涕痛不欲生'
    }, {
        key: 'start',
        value: start.format('YYYY/MM/DD HH:mm')
    }, {
        key: 'end',
        value: end.format('YYYY/MM/DD HH:mm')
    }, {
        key: 'total',
        value: total
    }, {
        key: 'apply',
        value: '桃白白'
    }
];

var regList = [];

keyword.forEach(function(item) {
    var reg = new RegExp('\\${' + item.key + '}', 'g');
    regList.push({
        relus: reg,
        match: item.value
    });
});



// 匹配规则
// var regList = [
//   {
//     relus: /\$\{reason\}/g,
//     match: reason
//   },
//   {
//     relus: /__date__/g,
//     match: moment().format('YYYY年MM月DD日')
//   }
// ];


create.createPDFProtocolFile(html, options, regList, './dist/' + Date.now() + '.pdf'); // 传入参数 生成pdf