//1.前端团队
var FE = {
    title: '前端团队',
    list: [
        {"name":"陈仕豪","jobNo":"53220"},
        {"name":"马晓林","jobNo":"92295"},
        {"name":"朱航","jobNo":"67516"},
        {"name":"白东英","jobNo":"92282"},
        {"name":"魏强伟","jobNo":"42687"},
        {"name":"李思敏","jobNo":"88405"},
        {"name":"于新辉","jobNo":"6128"},
        {"name":"梁梦媛","jobNo":"93898"},
        {"name":"王晓朦","jobNo":"60557"},
        {"name":"杨盛岚","jobNo":"95578"},
        {"name":"母玉飞","jobNo":"5157"},
        {"name":"班杨杨","jobNo":"91760"},
        {"name":"高崇","jobNo":"92298"},
        {"name":"宋才英","jobNo":"92748"},
        {"name":"何绪佳","jobNo":"94668"},
        {"name":"李春燕","jobNo":"47638"},
        {"name":"张志君","jobNo":"60633"},
        {"name":"丁延强","jobNo":"74085"},
        {"name":"龚虹宇","jobNo":"74091"},
        {"name":"罗星","jobNo":"93895"},
        {"name":"汤海波","jobNo":"73337"},
        {"name":"杨敏","jobNo":"92736"},
        {"name":"于永雨","jobNo":"98502"},
        {"name":"曲雪","jobNo":"93323"},
        {"name":"王阔","jobNo":"94177"},
        {"name":"李贞","jobNo":"4728"},
        {"name":"刘宇航","jobNo":"108455"},
        {"name":"黄忠贞","jobNo":"93897"},
        {"name":"王永平","jobNo":"98520"},
        {"name":"吴志鹏","jobNo":"72427"}
    ]
};
FE.list.map(function (o) {
    return o.department = 'FE';
});

//2.测试团队
var QA = {
    title: '测试团队',
    list: [
        {"name":"高小洲","jobNo":"5415"},
        {"name":"宋慧俏","jobNo":"8012474"},
        {"name":"王津伟","jobNo":"22460"},
        {"name":"王玉杰","jobNo":"8009561"},
        {"name":"谢丽丽","jobNo":"739"},
        {"name":"吴秀锦","jobNo":"79327"},
        {"name":"贺艳萍","jobNo":"96160"},
        {"name":"唐娜","jobNo":"93321"},
        {"name":"赵围","jobNo":"72436"},
        {"name":"吕书茹","jobNo":"8008045"},
        {"name":"熊欣欣","jobNo":"70029"},
        {"name":"魏朦朦","jobNo":"99010"},
        {"name":"武孟雅","jobNo":"54912"},
        {"name":"吴瑞琴","jobNo":"98548"},
        {"name":"李子玄","jobNo":"6883"},
        {"name":"郑雪生","jobNo":"3975"},
        {"name":"王汉桐","jobNo":"50106"},
        {"name":"陈祥科","jobNo":"72444"},
        {"name":"王世飞","jobNo":"4982"},
        {"name":"刘丽秋","jobNo":"8005470"},
        {"name":"朱磊","jobNo":"106327"},
        {"name":"刘金娜","jobNo":"85756"},
        {"name":"刘挺","jobNo":"wb0034"}
    ]
};
QA.list.map(function (o) {
    return o.department = 'QA';
});

//3.客户端团队
var APP = {
    title: '客户端团队',
    list: [
        {"name":"吴品","jobNo":"4927"},
        {"name":"杜光中","jobNo":"5314"},
        {"name":"万兵","jobNo":"4926"},
        {"name":"周洋","jobNo":"8920"},
        {"name":"郝捷","jobNo":"90368"},
        {"name":"党鹏飞","jobNo":"93904"},
        {"name":"宋得中","jobNo":"6480"},
        {"name":"靳明香","jobNo":"86632"},
        {"name":"马瑞隆","jobNo":"91756"},
        {"name":"郭丽娜","jobNo":"64881"},
        {"name":"张冰","jobNo":"8008866"},
        {"name":"高春雷","jobNo":"6481"},
        {"name":"邴天宇","jobNo":"90365"},
        {"name":"史鹏程","jobNo":"4924"},
        {"name":"潘良晓","jobNo":"70079"}
    ]
};
APP.list.map(function (o) {
    return o.department = 'APP';
});

//4.后端-租房团队
var RD_1 = {
    title: '后端-租房团队',
    list: [
        {"name":"吴祥波","jobNo":"8937"},
        {"name":"李跃红","jobNo":"33272"},
        {"name":"梁毓杰","jobNo":"56443"},
        {"name":"李超","jobNo":"70858"},
        {"name":"李建国","jobNo":"76210"},
        {"name":"李洁轩","jobNo":"3722"},
        {"name":"陈艺天","jobNo":"74089"},
        {"name":"果海涛","jobNo":"19467"},
        {"name":"胡坤","jobNo":"92758"},
        {"name":"吴勤哲","jobNo":"13355"},
        {"name":"董志恒","jobNo":"98497"},
        {"name":"王琛","jobNo":"56445"},
        {"name":"张金钟","jobNo":"29298"},
        {"name":"高昂","jobNo":"92261"},
        {"name":"卢嘉骅","jobNo":"99653"},
        {"name":"苏辉","jobNo":"100121"},
        {"name":"吕定归","jobNo":"87303"},
        {"name":"罗港","jobNo":"91767"},
        {"name":"尉鑫伟","jobNo":"88403"},
        {"name":"孙旭","jobNo":"11392"},
        {"name":"李文杰","jobNo":"92281"},
        {"name":"张志飞","jobNo":"26750"},
        {"name":"白梦柯","jobNo":"88404"},
        {"name":"孔明","jobNo":"98989"},
        {"name":"肖向徐","jobNo":"101665"},
        {"name":"郭明华","jobNo":"93317"},
        {"name":"杨威","jobNo":"88655"},
        {"name":"贾庆","jobNo":"6127"},
        {"name":"刘建宇","jobNo":"106158"}
    ]
};
RD_1.list.map(function (o) {
    return o.department = 'RD';
});

//5.后端-商业地产团队
var RD_2 = {
    title: '后端-商业地产团队',
    list: [
        {"name":"李全信","jobNo":"72424"},
        {"name":"那国梁","jobNo":"70016"},
        {"name":"郑国强","jobNo":"70897"},
        {"name":"安宏亮","jobNo":"101579"},
        {"name":"杨杰","jobNo":"98040"},
        {"name":"韩莹莹","jobNo":"103256"},
        {"name":"张春杰","jobNo":"94666"},
        {"name":"闫赫","jobNo":"67515"},
        {"name":"冯丹丹","jobNo":"69148"},
        {"name":"冯永萌","jobNo":"5539"},
        {"name":"刘鹏","jobNo":"93907"},
        {"name":"李志强","jobNo":"95587"},
        {"name":"杨金政","jobNo":"108840"},
        {"name":"张笑潮","jobNo":"98995"},
        {"name":"张建腾","jobNo":"80080"},
        {"name":"满正才","jobNo":"6533"},
        {"name":"吕翔","jobNo":"92267"},
        {"name":"尹旭阳","jobNo":"96617"},
        {"name":"徐朋涛","jobNo":"98043"},
        {"name":"卢尚鹏","jobNo":"90395"},
        {"name":"程祖权","jobNo":"91019"},
        {"name":"宋会廷","jobNo":"86754"}
    ]
};
RD_2.list.map(function (o) {
    return o.department = 'RD';
});


//6.后端-基础服务团队
var RD_3 = {
    title: '后端-基础服务团队',
    list: [
        {"name":"刘红军","jobNo":"96150"},
        {"name":"邢晓强","jobNo":"7122"},
        {"name":"李元军","jobNo":"95568"},
        {"name":"廖兴杰","jobNo":"72414"},
        {"name":"龚启晟","jobNo":"91768"},
        {"name":"周军","jobNo":"6532"},
        {"name":"沈洁","jobNo":"3682"},
        {"name":"刘欣萌","jobNo":"7306"},
        {"name":"周宏福","jobNo":"89"},
        {"name":"许祥美","jobNo":"91772"},
        {"name":"马遥","jobNo":"91775"},
        {"name":"李春雷","jobNo":"46672"},
        {"name":"成龙","jobNo":"96156"},
        {"name":"杨川","jobNo":"90398"},
        {"name":"王晓阳","jobNo":"4470"},
        {"name":"姚雪山","jobNo":"7142"},
        {"name":"徐光耀","jobNo":"5315"},
        {"name":"张迪","jobNo":"94665"},
        {"name":"李少平","jobNo":"87631"},
        {"name":"陈华龙","jobNo":"107654"},
        {"name":"马大犁","jobNo":"95156"},
        {"name":"陈栋","jobNo":"73340"},
        {"name":"马震","jobNo":"4925"},
        {"name":"朱宏宇","jobNo":"103253"}
    ]
};
RD_3.list.map(function (o) {
    return o.department = 'RD';
});

//7.后端-赶集团队
var RD_4 = {
    title: '后端-赶集团队',
    list: [
        {"name":"王钧","jobNo":"8006445"},
        {"name":"刘海鹏","jobNo":"8013322"},
        {"name":"刘志锋","jobNo":"7120"},
        {"name":"刘同意","jobNo":"17119"},
        {"name":"舒祥振","jobNo":"99251"},
        {"name":"陈艳","jobNo":"97551"},
        {"name":"赵安然","jobNo":"92753"},
        {"name":"吴洪文","jobNo":"8013135"}
    ]
};
RD_4.list.map(function (o) {
    return o.department = 'RD';
});

//8.产品-租房团队
var PM_1 = {
    title: '产品-租房团队',
    list: [
        {"name":"何丽萍","jobNo":"94175"},
        {"name":"刘博文","jobNo":"91751"},
        {"name":"朱丹舟","jobNo":"44733"},
        {"name":"王晨阳","jobNo":"98992"},
        {"name":"曲思桐","jobNo":"24055"},
        {"name":"吴桐","jobNo":"47647"},
        {"name":"路胜男","jobNo":"23746"},
        {"name":"许春旸","jobNo":"102752"},
        {"name":"左炜","jobNo":"98556"},
        {"name":"王焕焕","jobNo":"108845"},
        {"name":"陈铎","jobNo":"93312"},
        {"name":"隗小叶","jobNo":"8007337"},
        {"name":"孙艳茹","jobNo":"5173"},
        {"name":"车晶","jobNo":"93314"},
        {"name":"于成龙","jobNo":"4349"},
        {"name":"程露","jobNo":"55072"},
        {"name":"孙丽","jobNo":"90399"},
        {"name":"马国荣","jobNo":"96164"},
        {"name":"高海涛","jobNo":"59946"},
        {"name":"高杰","jobNo":"97552"},
        {"name":"刘阳","jobNo":"5613"},
        {"name":"叶子厚","jobNo":"95671"},
        {"name":"田治帮","jobNo":"88400"},
        {"name":"李坤","jobNo":"87769"},
        {"name":"张赫","jobNo":"108041"},
        {"name":"杨永东","jobNo":"72380"},
        {"name":"姚毅娜","jobNo":"102010"},
        // {"name":"曲永松","jobNo":"74692"},
        {"name":"赵燮","jobNo":"91614"},
        {"name":"郭昶杉","jobNo":"97268"},
        {"name":"高扬","jobNo":"95616"},
        {"name":"胡宇凡","jobNo":"93502"}
    ]
};
PM_1.list.map(function (o) {
    return o.department = 'PM';
})

//9.产品-二手房团队
var PM_2 = {
    title: '产品-二手房团队',
    list: [
        {"name":"高铭远","jobNo":"53216"},
        {"name":"范博","jobNo":"104029"},
        {"name":"于淼","jobNo":"105861"},
        {"name":"刘新丹","jobNo":"103510"},
        {"name":"袁静娜","jobNo":"96613"},
        {"name":"王薇","jobNo":"90996"},
        {"name":"索萌萌","jobNo":"7913"},
        {"name":"贺赓强","jobNo":"6907"},
        {"name":"田慧彬","jobNo":"102456"},
        {"name":"韦方明","jobNo":"60553"},
        {"name":"赵雅楠","jobNo":"65604"},
        {"name":"刘璐","jobNo":"51055"},
        {"name":"廖晶琰","jobNo":"88402"},
        {"name":"孙佳伟","jobNo":"93911"},
        // {"name":"余海军","jobNo":"6558"},
    ]
};
PM_2.list.map(function (o) {
    return o.department = 'PM';
});

//10.产品-商业产品团队
var PM_3 = {
    title: '产品-商业产品团队',
    list: [
        {"name":"张学芳","jobNo":"1586"},
        {"name":"钟磊","jobNo":"3202"},
        {"name":"李婷","jobNo":"92398"},
        {"name":"秦静","jobNo":"5722"},
        {"name":"刘睆璐","jobNo":"97549"},
        {"name":"张微","jobNo":"47635"},
        {"name":"唐欣楠","jobNo":"85753"},
        {"name":"杨春蕊","jobNo":"82997"},
        {"name":"马力","jobNo":"94116"},
        {"name":"宫枫沛","jobNo":"63506"},
        {"name":"郭佳鑫","jobNo":"77532"},
        {"name":"陈思达","jobNo":"5540"},
        {"name":"马群","jobNo":"92681"},
        {"name":"杨思宇","jobNo":"95132"},
        {"name":"高欢","jobNo":"104165"},
        {"name":"韦文瑞","jobNo":"91501"},
        {"name":"岳颖","jobNo":"92483"}
    ]
};
PM_3.list.map(function (o) {
    return o.department = 'PM';
});

//11.boss
var Leader = {
    title: 'boss',
    list: [
        {"name":"关涛","jobNo":""},
        {"name":"曲永松","jobNo":"74692"},
        {"name":"余海军","jobNo":"6558"},
    ]
};

let teams = [FE, QA, APP, RD_1, RD_2, RD_3, RD_4, PM_1, PM_2, PM_3, Leader];

let members = [];
teams.forEach((v, i) =>{
    // console.log(++i, v.title,  v.list.length);
    members = members.concat(v.list)
});
console.log('最终名单', members);

//查重
let repetition = members.filter(function(o,i,arr){
    return arr.findIndex(function (v) {
        return o.jobNo == v.jobNo
    }) != i;
});

console.log('重复的', repetition);

module.exports = members || [];