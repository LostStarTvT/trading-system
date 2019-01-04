// sql语句
var sqlMap = {
    // 用户
    user: {
        selectGoodsInfo:   'select * from  goods_info_table as g ,user_info_table as u where g.userID = u.userID',
        selectGoodsInfoByID:   'select * from  goods_info_table as g ,user_info_table as u where g.userID = u.userID and g.userID = ? order by goodsInDate desc',
        selectGoodSumInfoByID:   'select * from  goods_info_table where userID = ?',
        selectPersonInfo:   'select * from  user_info_table where userID != 100000',
        selectSellerInfo:   'select * from  user_info_table where user_type = ? ', 
        selectRootPersonInfo:   'select * from  user_info_table as u ,root_authority_table as r where u.userID = r.userID and user_type = ? and u.userID != 100000 ',
        selectCompanyInfo:   'select * from  user_info_table where companyRegisterId = ? ',
   
        sqlSelectUser:   'select * from  user_info_table where login_name =  ? ',
        selectOrderByUserId:   'select * from order_info_table as o ,user_info_table as u where u.userID = o.userID  and  goodBelongedSeller = ?',
        updateUser_property:   'update user_info_table  set  user_property = ? where userID = ?  ',
        updatePersonAuthority:   'update root_authority_table  set  PersonManage = ?,  GoodsManage = ?,  OrderManage = ?,  ResellManage = ?  where userID = ?  ',
        updateUserInfo:     'update user_info_table  set  userPhoneNumber = ? ,moneybackCountType = ?, moneybackCountNo = ?  where userID = ?  ',
        manage_login: 	'select *  from  user_info_table as  u, root_authority_table as r where login_name = ? and user_type != ? and u.userID = r.userID ',
        buyer_login: 'select *  from  user_info_table where login_name = ? and user_type = ? ',
        register: 'insert into user_info_table(user_name,userIDCard,userPhoneNumber,user_pwd,server_bank,moneybackCountNo,moneybackCountType,login_name,user_type,user_status,companyRegisterId) values(?,?,?,?,?,?,?,?,?,?,?)',
        updatePersonStatus :'update user_info_table set user_status = ?  where userID = ?', 
        updateUserPassword :'update user_info_table set user_pwd = ?  where userID = ?', 
    },
     goods: {
        insertOrder: 'insert into order_info_table(orderNo,userID,user_name,userIDCard,login_name,userPhoneNumber,goodIncID,good_name,good_belonged_bank,good_date_belong,good_income_rate,goodCnt,goodIncomeNum,good_date_end,good_date_income,is_resell,goodBelongedSeller,resellOrderID ) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        insertGoods: 'insert into goods_info_table(good_name,userID,good_belonged_bank,good_money_begin,good_inc_money,good_income_rate,good_date_begin,good_date_end,good_date_income,goodSum,good_date_belong,good_others,goodBelongPerInfo) values (?,?,?,?,?,?,?,?,?,?,?,?,?)',
        InsertResellInfo: 'insert into buyer_resell_table(goodIncID,good_name,userID,user_name,have_bought_number,apply_reason,moneybackCountType,moneybackCountNo,goodIncomeNum,orderNo,orderID) values (?,?,?,?,?,?,?,?,?,?,?)',
        insertCompany_info_table: 	'insert into company_info_table(companyRegisterId,companyName ,companyInstitutionalId,comanyAddress,companyTellNumber,CompanyLicenseAddress,RegisterMoneny,LegalPersonIDCard,LegalPersonName,moneybackCountType,moneybackCountNo) values (?,?,?,?,?,?,?,?,?,?,?)',
        select_rank:    'select * from goods_info_table where goodStatus = 1 order by count_have_sold desc ',
        selectResellResult:    'select * from buyer_resell_table where userID = ?  order by apply_data desc ',
        selectResellGoods:    'select * from buyer_resell_table as a ,goods_info_table as b where a.goodIncID = b.goodIncID and a.is_ok = 1 and a.is_sold = 0',
        selectOrderList: 'select * from order_info_table where userID = ? order by orderCreateTime desc ',  
        selectOrderInfo:'select * from order_info_table as o ,user_info_table as u where u.userID = o.userID  order by orderCreateTime desc ', //查询所有订单信息
        selectResellInfo:'select * from buyer_resell_table as b,goods_info_table as g where b.goodIncID = g.goodIncID  order by apply_data desc ', //查询所有抛售信息
        selectOrderNo: 'select orderNo,sum(goodCnt) as sumCnt,orderCreateTime  from order_info_table  where userID = ?  group by  orderNo  order by orderCreateTime desc',        
        select_by_bankName: 'select * from v_recommend_view where good_belonged_bank = ? ',
        updateCartNumber :'update cart_info_table set goodCnt = ?  where cartID =  ? ',
        updateCartIscheck :'update cart_info_table set ischeck = 0  where cartID =  ? ',
        updateCartChoose :'update cart_info_table set IsChoose = ?  where cartID = ?',
        updateResellOk :'update buyer_resell_table set is_ok = ?  where resell_id = ?',
        updateOrderStatus :'update order_info_table set orderStatus = ?  where orderID = ?',
        updateGoodStatus :'update goods_info_table set goodStatus = ?  where goodIncID = ?',
        sqlUpdateIssold :'update buyer_resell_table set is_sold = 1  where resell_id = ?',
        updateHaveFinish :'update order_info_table set haveFinshed = ?  where orderID = ?',
        delete: 'delete from goods_managemenet where goods_id = ? ',
        deleteResell: 'delete from buyer_resell_table where resell_id = ? ',
        deleteCartGoods: 'delete from cart_info_table where cartID = ? ',
        selectCompanyInfo : 'select * from company_info_table where companyRegisterId = ? '
    }
}

module.exports = sqlMap;  




