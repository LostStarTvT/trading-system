var models = require('../db');
var express = require('express');

var fs = require("fs");

var router = express.Router();
var mysql = require('mysql');
var $sql = require('../sqlMap');
var multer  = require('multer');
var upload = multer({ dest: 'upload/' });


// 连接数据库  调用mysql这个文件定义的数据
var conn = mysql.createConnection(models.mysql);

conn.connect();
var jsonWrite = function (res, ret) {
    if (typeof ret === 'undefined') {
        res.json({
            code: '1',
            msg: '操作失败'
        });
    } else {
        res.json(ret);
    }
};



// 查询所有的理财产品信息
router.post('/selectGoodsInfo', (req, res) => {
    var sql = $sql.user.selectGoodsInfo;
    var params = req.body;
    // console.log(params);
    var page = params.page;
    var name = params.name;
    conn.query(sql, [], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            result = result.filter(user => {
                if (name && user.name.indexOf(name) == -1) return false;
                return true;
            });
            var total = result.length;
            result = result.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
            jsonWrite(res, { "total": total, "data": result }); //如果成功的话就返回res 
        }
    })
});

// 根据用户ID查询所有的理财产品信息
router.post('/selectGoodsInfoByID', (req, res) => {
    var sql = $sql.user.selectGoodsInfoByID;
    var params = req.body;
    // console.log(params);
    var page = params.page;
    var name = params.name;
    var userID = params.userID;
    conn.query(sql, [userID], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            result = result.filter(user => {
                if (name && user.name.indexOf(name) == -1) return false;
                return true;
            });
            var total = result.length;
            result = result.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
            jsonWrite(res, { "total": total, "data": result }); //如果成功的话就返回res 
        }
    })
});

// 根据用户ID查询所有的理财产品信息
router.post('/selectGoodSumInfoByID', (req, res) => {
    var sql = $sql.user.selectGoodSumInfoByID;
    var params = req.body;
    // console.log(params);
    var userID = params.userID;
    conn.query(sql, [userID], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res,result); //如果成功的话就返回res 
        }
    })
});

// 查询所有的用户信息
router.post('/selectPersonInfo', (req, res) => {
    var sql = $sql.user.selectPersonInfo;
    var params = req.body;
    // console.log(params);
    var page = params.page;
    var name = params.name;
    conn.query(sql, [], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            result = result.filter(user => {
                if (name && user.name.indexOf(name) == -1) return false;
                return true;
            });
            var total = result.length;
            result = result.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
            jsonWrite(res, { "total": total, "data": result }); //如果成功的话就返回res 
        }
    })
});

// 查询所有的买家信息
router.post('/selectSellerInfo', (req, res) => {
    var sql = $sql.user.selectSellerInfo;
    var params = req.body;
    var page = params.page;
    var seller = 'seller';
    conn.query(sql, [seller], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            var total = result.length;
            result = result.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
            jsonWrite(res, { "total": total, "data": result }); //如果成功的话就返回res 
        }
    })
});

// 查询所有管理员的信息
router.post('/selectRootPersonInfo', (req, res) => {
    var sql = $sql.user.selectRootPersonInfo;
    var params = req.body;
    var page = params.page;
    var root = 'root';
    conn.query(sql, [root], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            var total = result.length;
            result = result.filter((u, index) => index < 20 * page && index >= 20 * (page - 1));
            jsonWrite(res, { "total": total, "data": result }); //如果成功的话就返回res 
        }
    })
});

// 管理员进行登录验证
router.post('/manage_login', (req, res) => {
    var sql = $sql.user.manage_login;
    var params = req.body;
    var username = params.username;
    var passwd = params.password;
    console.log(username);
    var buyer = 'buyer';
    conn.query(sql, [username, buyer], function (err, result) {
        if (err) {
            console.log(err);
        }
        // console.log(result);
        if (result) { //查询到结果
            if (result.length && result[0].user_pwd === passwd) {   //需要先判断 是否为空数组 如果是空就直接跳出           
                // result[0].user_pwd = undefined;  //不把密码在回传回去。
                // console.log(result);
                // var messgae = { "code": 200, "msg": "请求成功", "user": result[0] }
                // jsonWrite(res, messgae);
                if (result[0].user_status == 1) { //=1 表示正常用户
                    var messgae = { "code": 200, "msg": "请求成功", "user": result[0] };
                    jsonWrite(res, messgae);
                }else{
                    var messgae = { "code": 300, "msg": "账号被冻结请联系管理员123456@qq.com", "user": result[0] };
                    jsonWrite(res, messgae);
                }
            } else { //没有结果
                var messgae = { "code": 500, "msg": "账号或者密码错误" }
                jsonWrite(res, messgae);
            }
        }
    })
});

// 进行buyer登录验证验证
router.post('/buyer_login', (req, res) => {
    var sql = $sql.user.buyer_login;
    var params = req.body;
    var username = params.username;
    var passwd = params.password;
    var buyer = 'buyer';
    conn.query(sql, [username, buyer], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) { //查询到结果
            if (result.length && result[0].user_pwd === passwd) {   //需要先判断 是否为空数组 如果是空就直接跳出           
                // result[0].user_pwd = undefined;  //不把密码在回传回去。
                // console.log(result);
                if (result[0].user_status == 1) { //=1 表示正常用户
                    var messgae = { "code": 200, "msg": "请求成功", "user": result[0] };
                    jsonWrite(res, messgae);
                }else{
                    var messgae = { "code": 300, "msg": "账号被冻结请联系管理员123456@qq.com", "user": result[0] };
                    jsonWrite(res, messgae);
                }
            } else { //没有结果
                var messgae = { "code": 500, "msg": "账号或者密码错误" }
                jsonWrite(res, messgae);
            }
        }
    })
});

// 进行增加用户
router.post('/addUser', (req, res) => {
    var sql = $sql.user.add;
    var params = req.body;
    // console.log( params );
    conn.query(sql, [params.username, params.birthday, params.sex, params.id_card, params.native_place,
    params.address, params.phone, params.others], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result); //如果成功的话就返回res 
            // res.json(200,{name:"张三",age:20});
        }
    })
});

// 增加产品
// good_name,userID,good_belonged_bank,good_money_begin,good_inc_money,good_income_rate,good_date_begin,good_date_end,good_date_income,goodSum
router.post('/insertGoods', (req, res) => {
    var sql = $sql.goods.insertGoods;
    var params = req.body;
    console.log( params.para.info);
    var goodINfo = params.para.info;
    conn.query(sql, [goodINfo.good_name, goodINfo.userID, goodINfo.good_belonged_bank, goodINfo.good_money_begin, goodINfo.good_inc_money,
        goodINfo.good_income_rate, goodINfo.good_date_begin, goodINfo.good_date_end, goodINfo.good_date_income,goodINfo.goodSum,goodINfo.good_date_belong,goodINfo.good_others,goodINfo.goodBelongPerInfo], function (err, result) {
        if (err) {
            console.log(err);

        }
        if (result) {
            jsonWrite(res, result); //如果成功的话就返回res 
            // res.json(200,{name:"张三",age:20});
        }
    })
});

// 插入转售表
router.post('/InsertResellInfo', (req, res) => {
    var sql = $sql.goods.InsertResellInfo;
    var params = req.body;
    var goodinfo = params.paraaaa.goodinfo;  //产品信息
    var user = params.paraaaa.user;  //用户信息
    var others = params.paraaaa.others;
    // console.log( goodinfo );
    // console.log( params );
    conn.query(sql, [goodinfo.goodIncID, goodinfo.good_name, goodinfo.userID, goodinfo.user_name, goodinfo.goodCnt, others,
    user.moneybackCountType, user.moneybackCountNo, goodinfo.goodIncomeNum, goodinfo.orderNo, goodinfo.orderID], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result); //如果成功的话就返回res 
            // res.json(200,{name:"张三",age:20});
        }
    })
});

//  插入订单表 也更新转卖表已经卖掉的状态
router.post('/InsertIntoOrderTable', (req, res) => {
    var sql = $sql.goods.insertOrder;
    var sqlUpdateIssold = $sql.goods.sqlUpdateIssold;  //将转售表中的产品下架
    var params = req.body;
    var OrderResults = params.paraaaa.goods;  //存储选中的产品集合
    var orderNo = params.paraaaa.orderNo;  //传递过来的订单号
    var userInfo = params.paraaaa.userInfo; //传递过来的用户信息
    console.log(OrderResults);
    var haveSellFlag = false; //是否有转售标志。
    if (OrderResults[0].is_resell == 1) { //如果是转售的 则进行更新数据
            haveSellFlag = true;
    }else{
        OrderResults[0].orderID = null ;//如果不是转售则加上空。
    }
    var results;
    var element = OrderResults[0];
    conn.query(sql, [orderNo, userInfo.userID, userInfo.user_name, userInfo.userIDCard, userInfo.login_name, userInfo.userPhoneNumber, element.goodIncID, element.good_name,
            element.good_belonged_bank, element.good_date_belong, element.good_income_rate, element.goodCnt, element.sumIncome, element.good_date_end, element.good_date_income, element.is_resell,element.userID,element.orderID], function (err, result) {
                if (err) {
                    console.log(err);
                }
                if (result) {
                    results = this.results;
                }
            })
        if (haveSellFlag) {  //进行转售产品的卖掉的更新。
            conn.query(sqlUpdateIssold, [element.resell_id], function (err, result) { 
                if (err) {
                    console.log(err);
                }
                if (result) {
                    console.log(result);
                }
            })
        }
        jsonWrite(res, results);

});



// 单独删除购车产品
router.post('/deleteCartGoods', (req, res) => {
    var sql = $sql.goods.deleteCartGoods;
    var params = req.body;
    console.log(params.cartID);
    conn.query(sql, [params.cartID], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result); //如果成功的话就返回res 
            // res.json(200,{name:"张三",age:20});
        }
    })
});


// 删除抛售记录
router.post('/deleteResell', (req, res) => {
    var sql = $sql.goods.deleteResell;
    var params = req.body;
    console.log(params.resell_id);
    conn.query(sql, [params.resell_id], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result); //如果成功的话就返回res 
            // res.json(200,{name:"张三",age:20});
        }
    })
});


// 更新购物车计数
router.post('/updateCartNumber', (req, res) => {
    var sql = $sql.goods.updateCartNumber;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.cartNum, params.cartID], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result); //如果成功的话就返回res 
            console.log(result);
            // res.json(200,{name:"张三",age:20});
        }
    })
});


// 更改用户密码
router.post('/updateUserPassword', (req, res) => {
    var sql = $sql.user.updateUserPassword;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.user_pwd, params.userId], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result); //如果成功的话就返回res 
            console.log(result);
            // res.json(200,{name:"张三",age:20});
        }
    })
});


// 更改权限
router.post('/updatePersonAuthority', (req, res) => {
    var sql = $sql.user.updatePersonAuthority;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.PersonManage, params.GoodsManage,params.OrderManage,params.ResellManage,params.userID], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result); //如果成功的话就返回res 
            console.log(result);
            // res.json(200,{name:"张三",age:20});
        }
    })
});
// 更改订单表的完成转台为 1 可进行申请返款
router.post('/updateHaveFinish', (req, res) => {
    var sql = $sql.goods.updateHaveFinish;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.status,params.orderID], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result); //如果成功的话就返回res 
            console.log(result);
            // res.json(200,{name:"张三",age:20});
        }
    })
});


// 更新用户资产表
router.post('/updateUser_property', (req, res) => {
    var sql = $sql.user.updateUser_property;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.User_property, params.userID], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result); //如果成功的话就返回res 
            console.log(result);
            // res.json(200,{name:"张三",age:20});
        }
    })
});
// 更新用户信息表
router.post('/updateUserInfo', (req, res) => {
    var sql = $sql.user.updateUserInfo;
    var params = req.body;
    console.log(params);
    conn.query(sql, [params.userPhoneNumber, params.payTab, params.userMoneyBackcount, params.userID], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result); //如果成功的话就返回res 
            console.log(result);
            // res.json(200,{name:"张三",age:20});
        }
    })
});


// 更新购物车是否选中
router.post('/updateCartChoose', (req, res) => {
    var sql = $sql.goods.updateCartChoose;
    var params = req.body;
    console.log(params.IsChoose);
    conn.query(sql, [params.IsChoose, params.cartID], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result); //如果成功的话就返回res 
            // console.log(result);
            // res.json(200,{name:"张三",age:20});
        }
    })
});


//更改转售申请状态
router.post('/updateResellOk', (req, res) => {
    var sql = $sql.goods.updateResellOk;
    var params = req.body;
    console.log(params.IsChoose);
    conn.query(sql, [params.is_ok, params.resell_id], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result); //如果成功的话就返回res 
            // console.log(result);
            // res.json(200,{name:"张三",age:20});
        }
    })
});

//更改订单是否被禁止状态
router.post('/updateOrderStatus', (req, res) => {
    var sql = $sql.goods.updateOrderStatus;
    var params = req.body;
    console.log(params.IsChoose);
    conn.query(sql, [params.status, params.orderID], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result); //如果成功的话就返回res 
            // console.log(result);
            // res.json(200,{name:"张三",age:20});
        }
    })
});

//更改上线产品是否被禁止状态
router.post('/updateGoodStatus', (req, res) => {
    var sql = $sql.goods.updateGoodStatus;
    var params = req.body;
    console.log(params.IsChoose);
    conn.query(sql, [params.status, params.goodIncID], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result); //如果成功的话就返回res 
            // console.log(result);
            // res.json(200,{name:"张三",age:20});
        }
    })
});

//更改用户状态
router.post('/updatePersonStatus', (req, res) => {
    var sql = $sql.user.updatePersonStatus;
    var params = req.body;
    console.log(params.IsChoose);
    conn.query(sql, [params.status, params.userID], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result); //如果成功的话就返回res 
            // console.log(result);
            // res.json(200,{name:"张三",age:20});
        }
    })
});

var recommedEngineResult;
function recommedEngine(){ //推荐引擎。
    for (var index = 0; index < recommedEngineResult.length; index++) { //计算剩余天数
        var element = recommedEngineResult[index];
        element.score = calculateHaveSold(element.count_have_sold) * 0.2   +calculateBelongTime(element.good_date_belong) * 0.3 + calculateStartMoney(element.good_money_begin) * 0.2  + calculateRateNumber(element.good_income_rate) * 0.3 ;// 这个是计算销量 20% 的比重
    }
    recommedEngineResult.sort(createComprisonFunction("score"));
    //  console.log(recommedEngineResult);
};

function createComprisonFunction(propertyName){  //降序排序操作，这个是对数组对象进行排序
    return function(object1,object2){  
        var value1 = object1[propertyName];  
        var value2 = object2[propertyName];  
        if(value1 < value2){  
            return 1;  
        }else if(value1 > value2){  
            return -1;  
        }else{  
            return 0;  
        }  
    }  
}


function calculateHaveSold(haveSold){ //计算分数分数
    return parseInt(haveSold) % 100 ;
};

function calculateBelongTime(belongTime){//计算持有时间分数
   belongTime = parseInt(belongTime);
    if(belongTime < 90){ //90天以内的 70分
        return 70;
    }else if(belongTime < 180){ //90-180 为80分
        return 80;
    }else{   //大于180的60分
        return 60;
    }
};
function calculateStartMoney(StartMoney){//计算起购价分数
    StartMoney = parseInt(StartMoney);
     if(StartMoney < 10000){ //10000以内的 70分
        return 70;
    }else if(StartMoney <= 50000 && StartMoney >= 10000){ //1万 - 5万 为80分
        return 80;
    }else if(StartMoney <= 100000 && StartMoney > 50000){   //5 -10 的60分
        return 60;
    }else {
        return 50;
    }
};
function calculateRateNumber(RateNumber){//计算收益率分数
     RateNumber = parseFloat(RateNumber);
     if(RateNumber < 0.02 ){ //10000以内的 70分
        return 50;
    }else if(RateNumber <= 0.03 && RateNumber >= 0.02){ 
        return 70;
    }else if(RateNumber <= 0.04 && RateNumber > 0.02){   
        return 80;
    }else if(RateNumber <= 0.05 && RateNumber > 0.04){
        return 90;
    }else{
        return 100;
    }
};


// 进行选择输出商品，排行榜是选择全部产品 其他的是按照名称记性筛选，
router.post('/selectGoods', (req, res) => {

    var params = req.body;
    sql = $sql.goods.select_rank;
    // console.log(params.tabName);
    var name = params.tabName;
    var page = params.page;
    conn.query(sql, [], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {

            if (name != '综合排名') {
                result = result.filter(user => {
                    if (name && user.good_belonged_bank.indexOf(name) == -1) return false; //按照名字进行筛选数据.
                    return true;
                });
            }

            recommedEngineResult = result;
            recommedEngine(); //调用推荐引擎进行计算得分。
            var total = result.length;
            // console.log(result);
            result = result.filter((u, index) => index < 10 * page && index >= 10 * (page - 1));
            jsonWrite(res, { "total": total, "data": result }); //如果成功的话就返回res 
        }
    })
});

// 进行选择输出商品，查询抛售表
router.post('/selectResellGoods', (req, res) => {

    var params = req.body;
    sql = $sql.goods.selectResellGoods;
    // console.log(params.tabName);
    var page = params.page;
    conn.query(sql, [], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            var total = result.length;
            // console.log(result);
            result = result.filter((u, index) => index < 5 * page && index >= 5 * (page - 1));
            jsonWrite(res, { "total": total, "data": result }); //如果成功的话就返回res 
        }
    })
});



// 查询订单详细信息
router.post('/selectOrderList', (req, res) => {
    var params = req.body;
    sql = $sql.goods.selectOrderList;
    var userID = params.userID;
    conn.query(sql, [userID], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

//根据归属卖家账号查询订单表
router.post('/selectOrderByUserId', (req, res) => {
    var params = req.body;
    sql = $sql.user.selectOrderByUserId;
    var userID = params.userID;
    console.log(userID);
    conn.query(sql, [userID], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            console.log(result);            
            jsonWrite(res, result);
        }
    })
});

// 查询转售表
router.post('/selectResellResult', (req, res) => {
    var params = req.body;
    sql = $sql.goods.selectResellResult;
    var userID = params.userId;
    conn.query(sql, [userID], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});

// 查询一个人有的订单号
router.post('/selectOrderNo', (req, res) => {
    var params = req.body;
    sql = $sql.goods.selectOrderNo;
    var userID = params.userID;
    conn.query(sql, [userID], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result);
        }
    })
});


//进行注册
router.post('/register', (req, res) => {
    var sql = $sql.user.register;
    var sqlSelectUser = $sql.user.sqlSelectUser;
    let params = req.body;
    var user = params.userInfo.user;
    var login_name = user.login_name;
    user.companyRegisterId = '';
    conn.query(sqlSelectUser, [user.login_name], function (err, result) { //首先判断用户名有没有被注册
        if (err) {
            console.log(err);
        }
        if (result) {
            if (result.length) { //查询到结果  
                var messgae = { "code": 200, "msg": "用户名已被注册" }
                jsonWrite(res, messgae);
            } else { //没有结果
                conn.query(sql, [user.user_name, user.userIDCard, user.userPhoneNumber, user.user_pwd, user.server_bank,user.moneybackCountNo, user.moneybackCountType, user.login_name,user.user_type,user.user_status,user.companyRegisterId], function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    if (result) { //查询到结果    
                        var messgae = { "code": 500, "msg": "注册成功" }
                        jsonWrite(res, messgae);
                    }
                })
            }
        }
    })
});

//卖家进行注册 包含公司信息。
router.post('/SellerRegister', (req, res) => {
    var sql = $sql.user.register;
    var sqlSelectUser = $sql.user.sqlSelectUser; 
    var inserCompanyInfo = $sql.goods.insertCompany_info_table;
    let params = req.body;
    var user = params.userInfo.user;
    var login_name = user.login_name;
    console.log(user);
    
    conn.query(sqlSelectUser, [user.login_name], function (err, result) { //首先判断用户名有没有被注册
        if (err) {
            console.log(err);
        }
        if (result) {
            if (result.length) { //查询到结果  
                var messgae = { "code": 200, "msg": "用户名已被注册" }
                jsonWrite(res, messgae);
            } else { //没有结果
                var flag = false;
                // 插入用户表
                conn.query(sql, [user.user_name, user.userIDCard, user.userPhoneNumber, user.user_pwd, user.server_bank,user.moneybackCountNo, user.moneybackCountType, user.login_name,user.user_type,user.user_status,user.companyRegisterId], function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    if (result) { //查询到结果    
                        flag = true;
                        // var messgae = { "code": 500, "msg": "注册成功" }
                        // jsonWrite(res, messgae);
                    }
                })  
                // 掺入公司表
                conn.query(inserCompanyInfo, [user.companyRegisterId, user.companyName, user.companyInstitutionalId, user.comanyAddress, user.companyTellNumber,user.CompanyLicenseAddress, user.RegisterMoneny, user.LegalPersonIDCard,user.LegalPersonName,user.moneybackCountType,user.moneybackCountNo], function (err, result) {
                    if (err) {
                        console.log(err);
                    }
                    if (result) { //查询到结果    
                        if(flag){
                             var messgae = { "code": 500, "msg": "注册成功" }
                            jsonWrite(res, messgae);
                        }
                       
                    }
                })
            }
        }
    })
});




//查询公司信息
router.post('/selectCompanyInfo', (req, res) => {
    var sql = $sql.goods.selectCompanyInfo;
    var params = req.body;
    conn.query(sql, [params.companyRegisterId], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result); //如果成功的话就返回res 
        }
    })
});

// 查看所有订单 
router.post('/selectOrderInfo', (req, res) => {
    var sql = $sql.goods.selectOrderInfo;
    var params = req.body;
    // console.log(params.u_name);
    conn.query(sql, [], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result); //如果成功的话就返回res 

        }
    })
});

//根据用户ID查询卖家订单
router.post('/selectOrderInfoByUserID', (req, res) => {
    var sql = $sql.goods.selectOrderInfoByUserID;
    var params = req.body;
    // console.log(params.u_name);
    conn.query(sql, [], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result); //如果成功的话就返回res 

        }
    })
});


// 查看所有抛售订单
router.post('/selectResellInfo', (req, res) => {
    var sql = $sql.goods.selectResellInfo;
    var params = req.body;
    // console.log(params.u_name);
    conn.query(sql, [], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result); //如果成功的话就返回res 
            console.log(result);
        }
    })
});


// 查看公司信息
router.post('/selectCompanyInfo', (req, res) => {
    var sql = $sql.user.selectCompanyInfo;
    var params = req.body;
    // console.log(params.u_name);
    conn.query(sql, [], function (err, result) {
        if (err) {
            console.log(err);
        }
        if (result) {
            jsonWrite(res, result); //如果成功的话就返回res 
            // console.log(result);
        }
    })
});

module.exports = router;