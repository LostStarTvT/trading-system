-- --------------------------------------------------------
-- 主机:                           192.168.150.135
-- 服务器版本:                        5.7.22-log - MySQL Community Server (GPL)
-- 服务器操作系统:                      Win64
-- HeidiSQL 版本:                  9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;


-- 导出 109_diaowenjie 的数据库结构
CREATE DATABASE IF NOT EXISTS `109_diaowenjie` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `109_diaowenjie`;

-- 导出  表 109_diaowenjie.buyer_resell_table 结构
CREATE TABLE IF NOT EXISTS `buyer_resell_table` (
  `resell_id` int(11) NOT NULL AUTO_INCREMENT,
  `orderID` int(11) NOT NULL DEFAULT '0',
  `orderNo` varchar(20) NOT NULL DEFAULT '0',
  `goodIncID` int(11) NOT NULL,
  `good_name` varchar(20) NOT NULL,
  `userID` int(11) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `have_bought_number` int(11) NOT NULL,
  `goodIncomeNum` float NOT NULL DEFAULT '0',
  `apply_reason` varchar(20) DEFAULT NULL,
  `moneybackCountType` varchar(20) DEFAULT NULL,
  `moneybackCountNo` varchar(20) DEFAULT NULL,
  `is_ok` int(2) DEFAULT '0',
  `is_sold` int(2) DEFAULT '0',
  `apply_data` datetime DEFAULT CURRENT_TIMESTAMP,
  `is_resell` int(2) DEFAULT '1',
  PRIMARY KEY (`resell_id`),
  KEY `FK_good` (`goodIncID`),
  KEY `FK_user` (`userID`),
  CONSTRAINT `FK_good` FOREIGN KEY (`goodIncID`) REFERENCES `goods_info_table` (`goodIncID`),
  CONSTRAINT `FK_user` FOREIGN KEY (`userID`) REFERENCES `user_info_table` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=100045 DEFAULT CHARSET=utf8;

-- 正在导出表  109_diaowenjie.buyer_resell_table 的数据：~4 rows (大约)
DELETE FROM `buyer_resell_table`;
/*!40000 ALTER TABLE `buyer_resell_table` DISABLE KEYS */;
INSERT INTO `buyer_resell_table` (`resell_id`, `orderID`, `orderNo`, `goodIncID`, `good_name`, `userID`, `user_name`, `have_bought_number`, `goodIncomeNum`, `apply_reason`, `moneybackCountType`, `moneybackCountNo`, `is_ok`, `is_sold`, `apply_data`, `is_resell`) VALUES
	(100041, 1000126, '2018519212535', 100049, '融通宝·禧润二号17C920期', 100031, '王伟', 50000, 136.99, '急需用钱希望转售！', '微信', '15627831263', 1, 1, '2018-05-19 21:27:18', 1),
	(100042, 1000132, '20185192280', 100043, '融通宝·禧润二号17C923期', 100001, '王飞', 55000, 253.15, '申请测试', '支付宝', '4567884', 1, 1, '2018-05-19 22:08:37', 1),
	(100043, 1000133, '201851922821', 100030, '安德宝·禧达二号18R5期', 100001, '王飞', 50000, 378.08, '正是个测试', '支付宝', '4567884', -1, 0, '2018-05-19 22:56:34', 1),
	(100044, 1000135, '2018519231429', 100043, '融通宝·禧润二号17C923期', 100001, '王飞', 40000, 184.11, '测试2', '支付宝', '4567884', 1, 1, '2018-05-19 23:33:42', 1);
/*!40000 ALTER TABLE `buyer_resell_table` ENABLE KEYS */;

-- 导出  表 109_diaowenjie.cart_info_table 结构
CREATE TABLE IF NOT EXISTS `cart_info_table` (
  `cartID` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(11) NOT NULL,
  `goodIncID` int(11) NOT NULL,
  `goodCnt` int(20) NOT NULL,
  `good_belonged_bank` varchar(50) NOT NULL,
  `good_inc_money` int(20) NOT NULL,
  `good_name` varchar(20) NOT NULL,
  `good_date_belong` int(20) NOT NULL,
  `good_income_rate` float NOT NULL,
  `isCheck` int(2) DEFAULT '1',
  `IsChoose` int(2) DEFAULT '1',
  `createdtime` datetime DEFAULT CURRENT_TIMESTAMP,
  `good_date_end` date DEFAULT NULL,
  `good_date_income` date DEFAULT NULL,
  PRIMARY KEY (`cartID`),
  KEY `FK_cart_good` (`goodIncID`),
  KEY `FK_cart_user` (`userID`),
  CONSTRAINT `FK_cart_good` FOREIGN KEY (`goodIncID`) REFERENCES `goods_info_table` (`goodIncID`),
  CONSTRAINT `FK_cart_user` FOREIGN KEY (`userID`) REFERENCES `user_info_table` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 正在导出表  109_diaowenjie.cart_info_table 的数据：~0 rows (大约)
DELETE FROM `cart_info_table`;
/*!40000 ALTER TABLE `cart_info_table` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart_info_table` ENABLE KEYS */;

-- 导出  表 109_diaowenjie.company_info_table 结构
CREATE TABLE IF NOT EXISTS `company_info_table` (
  `companyRegisterId` varchar(30) NOT NULL,
  `companyName` varchar(20) NOT NULL,
  `companyInstitutionalId` varchar(30) NOT NULL,
  `comanyAddress` varchar(40) NOT NULL,
  `companyTellNumber` varchar(20) NOT NULL,
  `CompanyLicenseAddress` varchar(40) NOT NULL,
  `RegisterMoneny` varchar(20) NOT NULL,
  `LegalPersonIDCard` varchar(20) NOT NULL,
  `LegalPersonName` varchar(20) NOT NULL,
  `moneybackCountType` varchar(20) NOT NULL,
  `moneybackCountNo` varchar(20) NOT NULL,
  `createdtime` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`companyRegisterId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 正在导出表  109_diaowenjie.company_info_table 的数据：~2 rows (大约)
DELETE FROM `company_info_table`;
/*!40000 ALTER TABLE `company_info_table` DISABLE KEYS */;
INSERT INTO `company_info_table` (`companyRegisterId`, `companyName`, `companyInstitutionalId`, `comanyAddress`, `companyTellNumber`, `CompanyLicenseAddress`, `RegisterMoneny`, `LegalPersonIDCard`, `LegalPersonName`, `moneybackCountType`, `moneybackCountNo`, `createdtime`) VALUES
	('110108017624383', '亚联九理（天津）商业保理有限责任公司', '91310115MA1K43074B', '河北天津市', '051566884003', '河北省天津市', '300万', '330481198302100836', '吴春燕', '支付宝', '13242112344', '2018-05-18 14:47:43'),
	('112108117624489', '星启点商业保理有限责任公司', '91310117MA1J2UK49U', '河南省周口市', '051566884003', '河南省周口市', '5000万', '520300197806063415', '山欣雨', '支付宝', '1594539867234', '2018-05-19 16:22:25');
/*!40000 ALTER TABLE `company_info_table` ENABLE KEYS */;

-- 导出  事件 109_diaowenjie.event_day 结构
DELIMITER //
CREATE DEFINER=`root`@`localhost` EVENT `event_day` ON SCHEDULE EVERY 1 DAY STARTS '2018-05-02 00:01:00' ON COMPLETION NOT PRESERVE ENABLE DO BEGIN
    call UpdateReachDateGoodMoneyBack();
    call updateReachTimeGoodDown();
END//
DELIMITER ;

-- 导出  表 109_diaowenjie.goods_info_table 结构
CREATE TABLE IF NOT EXISTS `goods_info_table` (
  `goodIncID` int(11) NOT NULL AUTO_INCREMENT,
  `good_name` varchar(20) NOT NULL,
  `userID` int(11) NOT NULL,
  `good_belonged_bank` varchar(30) NOT NULL,
  `good_money_begin` int(20) NOT NULL,
  `good_inc_money` int(20) NOT NULL,
  `good_income_rate` float NOT NULL,
  `good_date_begin` date NOT NULL,
  `good_date_end` date NOT NULL,
  `good_date_income` date NOT NULL,
  `good_date_belong` int(10) NOT NULL,
  `goodStatus` int(2) NOT NULL DEFAULT '0',
  `count_have_sold` int(20) unsigned NOT NULL DEFAULT '0',
  `goodHaveSoldNum` int(20) unsigned NOT NULL DEFAULT '0',
  `good_others` varchar(50) DEFAULT NULL,
  `goodBelongPerInfo` varchar(300) DEFAULT NULL,
  `goodsInDate` datetime DEFAULT CURRENT_TIMESTAMP,
  `goodSum` int(20) DEFAULT NULL,
  PRIMARY KEY (`goodIncID`),
  KEY `FK_sid` (`userID`),
  CONSTRAINT `FK_sid` FOREIGN KEY (`userID`) REFERENCES `user_info_table` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=100056 DEFAULT CHARSET=utf8;

-- 正在导出表  109_diaowenjie.goods_info_table 的数据：~11 rows (大约)
DELETE FROM `goods_info_table`;
/*!40000 ALTER TABLE `goods_info_table` DISABLE KEYS */;
INSERT INTO `goods_info_table` (`goodIncID`, `good_name`, `userID`, `good_belonged_bank`, `good_money_begin`, `good_inc_money`, `good_income_rate`, `good_date_begin`, `good_date_end`, `good_date_income`, `good_date_belong`, `goodStatus`, `count_have_sold`, `goodHaveSoldNum`, `good_others`, `goodBelongPerInfo`, `goodsInDate`, `goodSum`) VALUES
	(100026, '安德宝·禧达二号18R6期', 100017, '亚联九理（天津）商业保理有限责任公司', 20000, 1000, 0.014, '2018-04-27', '2018-05-03', '2018-11-28', 100, -1, 0, 0, '乾元', '亚联九理（天津）商业保理有限责任公司，成立于2017年1月，注册资本金5000万元。公司经营范围包括以受让应收账款的方式提供贸易融资；应收账款的收付结算、管理与催收；销售分户（分类）账管理；客户资信调查与评估；相关咨询服务', '2018-04-27 20:23:52', 300000),
	(100030, '安德宝·禧达二号18R5期', 100017, '亚联九理（天津）商业保理有限责任公司', 50000, 10000, 0.023, '2018-05-12', '2018-06-19', '2018-08-16', 120, 1, 1, 50000, '【安德宝·禧达二号】\n', '亚联九理（天津）商业保理有限责任公司，成立于2017年1月，注册资本金5000万元。公司经营范围包括以受让应收账款的方式提供贸易融资；应收账款的收付结算、管理与催收；销售分户（分类）账管理；客户资信调查与评估；相关咨询服务', '2018-05-12 12:10:59', 150000),
	(100041, '安德宝·禧达二号18R4期', 100017, '亚联九理（天津）商业保理有限责任公司', 60000, 5000, 0.03, '2018-04-01', '2018-05-09', '2018-05-15', 36, -1, 0, 0, '得利宝•稳添利', '亚联九理（天津）商业保理有限责任公司，成立于2017年1月，注册资本金5000万元。公司经营范围包括以受让应收账款的方式提供贸易融资；应收账款的收付结算、管理与催收；销售分户（分类）账管理；客户资信调查与评估；相关咨询服务', '2018-05-15 14:42:48', 400000),
	(100042, '融通宝·禧润二号17C922期', 100032, '星启点商业保理有限责任公司', 30000, 5000, 0.032, '2018-05-18', '2018-05-23', '2018-07-22', 60, -1, 0, 0, '融通宝·禧润二号17C922期', '星启点商业保理有限责任公司，成立于2017年1月，注册资本金5000万元。公司经营范围包括以受让应收账款的方式提供贸易融资；应收账款的收付结算、管理与催收；销售分户（分类）账管理；客户资信调查与评估；相关咨询服务', '2018-05-19 16:26:09', 600000),
	(100043, '融通宝·禧润二号17C923期', 100032, '星启点商业保理有限责任公司', 40000, 5000, 0.028, '2018-05-18', '2018-06-23', '2018-07-22', 60, 1, 2, 95000, '融通宝·禧润二号17C922期', '星启点商业保理有限责任公司，成立于2017年1月，注册资本金5000万元。公司经营范围包括以受让应收账款的方式提供贸易融资；应收账款的收付结算、管理与催收；销售分户（分类）账管理；客户资信调查与评估；相关咨询服务', '2018-05-19 16:26:09', 600000),
	(100044, '融通宝·禧润二号17C924期', 100032, '星启点商业保理有限责任公司', 100000, 10000, 0.057, '2018-05-18', '2018-06-23', '2018-07-22', 60, 1, 4, 600000, '融通宝·禧润二号17C922期', '星启点商业保理有限责任公司，成立于2017年1月，注册资本金5000万元。公司经营范围包括以受让应收账款的方式提供贸易融资；应收账款的收付结算、管理与催收；销售分户（分类）账管理；客户资信调查与评估；相关咨询服务', '2018-05-19 16:26:09', 600000),
	(100045, '融通宝·禧润二号17C925期', 100032, '星启点商业保理有限责任公司', 10000, 2000, 0.021, '2018-05-18', '2018-06-23', '2018-07-22', 60, 1, 0, 0, '融通宝·禧润二号17C922期', '星启点商业保理有限责任公司，成立于2017年1月，注册资本金5000万元。公司经营范围包括以受让应收账款的方式提供贸易融资；应收账款的收付结算、管理与催收；销售分户（分类）账管理；客户资信调查与评估；相关咨询服务', '2018-05-19 16:26:09', 600000),
	(100046, '安德宝·禧达二号18R5期', 100017, '亚联九理（天津）商业保理有限责任公司', 50000, 10000, 0.023, '2018-05-12', '2018-06-19', '2018-08-16', 120, 1, 0, 0, '【安德宝·禧达二号】\n', '亚联九理（天津）商业保理有限责任公司，成立于2017年1月，注册资本金5000万元。公司经营范围包括以受让应收账款的方式提供贸易融资；应收账款的收付结算、管理与催收；销售分户（分类）账管理；客户资信调查与评估；相关咨询服务', '2018-05-12 12:10:59', 150000),
	(100048, '融通宝·禧润二号17C921期', 100032, '星启点商业保理有限责任公司', 6000, 1000, 0.01, '2018-04-04', '2018-04-14', '2018-05-14', 30, -1, 2, 50000, '融通宝·禧润二号17C921期', '星启点商业保理有限责任公司，成立于2017年1月，注册资本金5000万元。公司经营范围包括以受让应收账款的方式提供贸易融资；应收账款的收付结算、管理与催收；销售分户（分类）账管理；客户资信调查与评估；相关咨询服务', '2018-05-19 16:43:25', 50000),
	(100049, '融通宝·禧润二号17C920期', 100032, '星启点商业保理有限责任公司', 30000, 2000, 0.02, '2018-04-24', '2018-05-04', '2018-06-23', 50, -1, 1, 50000, '融通宝·禧润二号17C920期', '星启点商业保理有限责任公司，成立于2017年1月，注册资本金5000万元。公司经营范围包括以受让应收账款的方式提供贸易融资；应收账款的收付结算、管理与催收；销售分户（分类）账管理；客户资信调查与评估；相关咨询服务', '2018-05-19 21:24:49', 100000),
	(100055, '融通宝·禧润一号17C9期', 100032, '星启点商业保理有限责任公司', 20000, 2000, 0.0134, '2018-04-02', '2018-04-07', '2018-05-17', 40, -1, 2, 42000, '融通宝·禧润一号17C9期', '星启点商业保理有限责任公司，成立于2017年1月，注册资本金5000万元。公司经营范围包括以受让应收账款的方式提供贸易融资；应收账款的收付结算、管理与催收；销售分户（分类）账管理；客户资信调查与评估；相关咨询服务', '2018-05-19 22:06:27', 200000);
/*!40000 ALTER TABLE `goods_info_table` ENABLE KEYS */;

-- 导出  表 109_diaowenjie.order_info_table 结构
CREATE TABLE IF NOT EXISTS `order_info_table` (
  `orderID` int(11) NOT NULL AUTO_INCREMENT,
  `orderNo` varchar(20) NOT NULL,
  `userID` int(11) NOT NULL,
  `user_name` varchar(20) NOT NULL,
  `userIDCard` varchar(20) NOT NULL,
  `login_name` varchar(20) NOT NULL,
  `userPhoneNumber` varchar(20) NOT NULL,
  `goodIncID` int(11) NOT NULL,
  `goodBelongedSeller` int(11) NOT NULL,
  `good_name` varchar(20) NOT NULL,
  `good_belonged_bank` varchar(30) NOT NULL,
  `good_date_belong` int(10) NOT NULL,
  `good_income_rate` float NOT NULL,
  `goodCnt` int(20) NOT NULL,
  `goodIncomeNum` float NOT NULL,
  `good_date_end` date NOT NULL,
  `good_date_income` date NOT NULL,
  `orderStatus` int(2) unsigned DEFAULT '1',
  `haveFinshed` int(2) unsigned DEFAULT '0',
  `orderCreateTime` datetime DEFAULT CURRENT_TIMESTAMP,
  `is_resell` int(2) NOT NULL DEFAULT '0',
  `have_resell` int(2) NOT NULL DEFAULT '0',
  PRIMARY KEY (`orderID`),
  KEY `FK_order_good` (`goodIncID`),
  KEY `FK_order_user` (`userID`),
  CONSTRAINT `FK_order_good` FOREIGN KEY (`goodIncID`) REFERENCES `goods_info_table` (`goodIncID`),
  CONSTRAINT `FK_order_user` FOREIGN KEY (`userID`) REFERENCES `user_info_table` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=1000138 DEFAULT CHARSET=utf8;

-- 正在导出表  109_diaowenjie.order_info_table 的数据：~14 rows (大约)
DELETE FROM `order_info_table`;
/*!40000 ALTER TABLE `order_info_table` DISABLE KEYS */;
INSERT INTO `order_info_table` (`orderID`, `orderNo`, `userID`, `user_name`, `userIDCard`, `login_name`, `userPhoneNumber`, `goodIncID`, `goodBelongedSeller`, `good_name`, `good_belonged_bank`, `good_date_belong`, `good_income_rate`, `goodCnt`, `goodIncomeNum`, `good_date_end`, `good_date_income`, `orderStatus`, `haveFinshed`, `orderCreateTime`, `is_resell`, `have_resell`) VALUES
	(1000122, '201851916356', 100031, '王伟', '620724199008228989', 'buyer2', '15627831263', 100044, 100032, '融通宝·禧润二号17C924期', '星启点商业保理有限责任公司', 60, 0.057, 140000, 1311.78, '2018-05-23', '2018-07-22', 1, 0, '2018-05-19 16:35:06', 0, 0),
	(1000125, '201851916469', 100031, '王伟', '620724199008228989', 'buyer2', '15627831263', 100048, 100032, '融通宝·禧润二号17C921期', '星启点商业保理有限责任公司', 30, 0.01, 50000, 41.1, '2018-04-14', '2018-05-14', 1, 1, '2018-05-19 16:46:09', 0, 0),
	(1000126, '2018519212535', 100031, '王伟', '620724199008228989', 'buyer2', '15627831263', 100049, 100032, '融通宝·禧润二号17C920期', '星启点商业保理有限责任公司', 50, 0.02, 50000, 136.99, '2018-05-04', '2018-06-23', 1, 0, '2018-05-19 21:25:35', 0, 2),
	(1000127, '2018519214515', 100031, '王伟', '620724199008228989', 'buyer2', '15627831263', 100044, 100032, '融通宝·禧润二号17C924期', '星启点商业保理有限责任公司', 60, 0.057, 170000, 1592.88, '2018-05-23', '2018-07-22', 1, 0, '2018-05-19 21:45:15', 0, 0),
	(1000128, '2018519214534', 100030, '王欣', '430203198812142757', 'buyer1', '15678928433', 100044, 100032, '融通宝·禧润二号17C924期', '星启点商业保理有限责任公司', 60, 0.057, 140000, 1311.78, '2018-05-23', '2018-07-22', 1, 0, '2018-05-19 21:45:34', 0, 0),
	(1000129, '2018519214628', 100030, '王欣', '430203198812142757', 'buyer1', '15678928433', 100044, 100032, '融通宝·禧润二号17C924期', '星启点商业保理有限责任公司', 60, 0.057, 140000, 1311.78, '2018-05-23', '2018-07-22', 1, 0, '2018-05-19 21:46:28', 0, 0),
	(1000130, '201851922656', 100001, '王飞', '370104198602021433', 'buyer', '131124016662', 100055, 100032, '融通宝·禧润一号17C9期', '星启点商业保理有限责任公司', 40, 0.0134, 22000, 32.31, '2018-04-07', '2018-05-17', 1, 2, '2018-05-19 22:06:56', 0, 0),
	(1000131, '201851922717', 100001, '王飞', '370104198602021433', 'buyer', '131124016662', 100055, 100032, '融通宝·禧润一号17C9期', '星启点商业保理有限责任公司', 40, 0.0134, 20000, 29.37, '2018-04-07', '2018-05-17', 1, 1, '2018-05-19 22:07:17', 0, 0),
	(1000132, '20185192280', 100001, '王飞', '370104198602021433', 'buyer', '131124016662', 100043, 100032, '融通宝·禧润二号17C923期', '星启点商业保理有限责任公司', 60, 0.028, 55000, 253.15, '2018-05-23', '2018-07-22', 1, 0, '2018-05-19 22:08:00', 0, 2),
	(1000133, '201851922821', 100001, '王飞', '370104198602021433', 'buyer', '131124016662', 100030, 100017, '安德宝·禧达二号18R5期', '亚联九理（天津）商业保理有限责任公司', 120, 0.023, 50000, 378.08, '2018-05-19', '2018-08-16', 1, 0, '2018-05-19 22:08:21', 0, 1),
	(1000134, '2018519221256', 100030, '王欣', '430203198812142757', 'buyer1', '15678928433', 100043, 100032, '融通宝·禧润二号17C923期', '星启点商业保理有限责任公司', 60, 0.028, 40000, 184.11, '2018-05-23', '2018-07-22', 1, 0, '2018-05-19 22:12:56', 1, 0),
	(1000135, '2018519231429', 100001, '王飞', '370104198602021433', 'buyer', '131124016662', 100043, 100032, '融通宝·禧润二号17C923期', '星启点商业保理有限责任公司', 60, 0.028, 40000, 184.11, '2018-05-23', '2018-07-22', 1, 0, '2018-05-19 23:14:29', 0, 2),
	(1000136, '2018519233433', 100030, '王欣', '430203198812142757', 'buyer1', '15678928433', 100043, 100032, '融通宝·禧润二号17C923期', '星启点商业保理有限责任公司', 60, 0.028, 40000, 184.11, '2018-05-23', '2018-07-22', 1, 0, '2018-05-19 23:34:33', 1, 0),
	(1000137, '201851923461', 100030, '王欣', '430203198812142757', 'buyer1', '15678928433', 100049, 100032, '融通宝·禧润二号17C920期', '星启点商业保理有限责任公司', 50, 0.02, 50000, 136.99, '2018-05-04', '2018-06-23', 1, 0, '2018-05-19 23:46:01', 1, 0);
/*!40000 ALTER TABLE `order_info_table` ENABLE KEYS */;

-- 导出  表 109_diaowenjie.root_authority_table 结构
CREATE TABLE IF NOT EXISTS `root_authority_table` (
  `userID` int(11) NOT NULL,
  `AuthrityManage` int(2) NOT NULL DEFAULT '0',
  `PersonManage` int(2) NOT NULL DEFAULT '0',
  `GoodsManage` int(2) NOT NULL DEFAULT '0',
  `OrderManage` int(2) NOT NULL DEFAULT '0',
  `ResellManage` int(2) NOT NULL DEFAULT '0',
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- 正在导出表  109_diaowenjie.root_authority_table 的数据：~9 rows (大约)
DELETE FROM `root_authority_table`;
/*!40000 ALTER TABLE `root_authority_table` DISABLE KEYS */;
INSERT INTO `root_authority_table` (`userID`, `AuthrityManage`, `PersonManage`, `GoodsManage`, `OrderManage`, `ResellManage`) VALUES
	(100000, 1, 1, 1, 1, 1),
	(100001, 0, 0, 0, 0, 0),
	(100002, 0, 0, 0, 0, 0),
	(100017, 0, 0, 0, 0, 0),
	(100027, 0, 0, 0, 0, 0),
	(100029, 0, 0, 1, 0, 0),
	(100030, 0, 0, 0, 0, 0),
	(100031, 0, 0, 0, 0, 0),
	(100032, 0, 0, 0, 0, 0);
/*!40000 ALTER TABLE `root_authority_table` ENABLE KEYS */;

-- 导出  过程 109_diaowenjie.UpdateReachDateGoodMoneyBack 结构
DELIMITER //
CREATE DEFINER=`109_diaowenjie`@`%` PROCEDURE `UpdateReachDateGoodMoneyBack`()
    COMMENT '到了清算期自动将订单标记为可清算'
BEGIN
DECLARE date_order date; 
DECLARE order_ID int(11);
DECLARE done INT DEFAULT 0; 
declare cursor_order_date_income CURSOR FOR select good_date_income,orderID from order_info_table where haveFinshed = 0 ;
DECLARE CONTINUE HANDLER FOR NOT FOUND SET done=1;

open cursor_order_date_income;
   order_loop: LOOP  
         FETCH cursor_order_date_income INTO date_order,order_ID;  
         IF done=1 THEN  
             LEAVE order_loop;  
         END IF;
         IF date_order between '2018-01-01'  and CURDATE()  THEN  
            update order_info_table SET haveFinshed = 1 where orderID = order_ID;
            select date_order;
         END IF;
     END LOOP order_loop;
close cursor_order_date_income;
END//
DELIMITER ;

-- 导出  过程 109_diaowenjie.updateReachTimeGoodDown 结构
DELIMITER //
CREATE DEFINER=`109_diaowenjie`@`%` PROCEDURE `updateReachTimeGoodDown`()
    COMMENT '将到期的理财产品下架'
BEGIN
DECLARE date_good date; 
DECLARE goodID int(11);
DECLARE done INT DEFAULT 0; 
declare cursor_goods_date_end CURSOR FOR select good_date_end,goodIncID from goods_info_table where goodStatus != -1 ;
DECLARE CONTINUE HANDLER FOR NOT FOUND SET done=1;

open cursor_goods_date_end;
   goods_loop: LOOP  
         FETCH cursor_goods_date_end INTO date_good,goodID;  
         IF done=1 THEN  
             LEAVE goods_loop;  
         END IF;
         IF date_good between '2018-01-01'  and CURDATE()  THEN  
            update goods_info_table SET goodStatus = -1 where goodIncID = goodID;
         END IF;
     END LOOP goods_loop;
close cursor_goods_date_end;
END//
DELIMITER ;

-- 导出  表 109_diaowenjie.user_info_table 结构
CREATE TABLE IF NOT EXISTS `user_info_table` (
  `userID` int(11) NOT NULL AUTO_INCREMENT,
  `user_name` varchar(20) NOT NULL,
  `userIDCard` varchar(20) NOT NULL,
  `userPhoneNumber` varchar(20) NOT NULL,
  `user_pwd` varchar(64) DEFAULT NULL,
  `user_type` varchar(10) NOT NULL DEFAULT 'buyer',
  `server_bank` varchar(20) DEFAULT NULL,
  `companyRegisterId` varchar(30) DEFAULT NULL,
  `user_property` double DEFAULT '0',
  `moneybackCountNo` varchar(20) NOT NULL DEFAULT '0',
  `moneybackCountType` varchar(20) NOT NULL DEFAULT '0',
  `user_status` int(2) DEFAULT '1',
  `user_register_time` datetime DEFAULT CURRENT_TIMESTAMP,
  `login_name` varchar(20) NOT NULL,
  `others` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=100033 DEFAULT CHARSET=utf8;

-- 正在导出表  109_diaowenjie.user_info_table 的数据：~6 rows (大约)
DELETE FROM `user_info_table`;
/*!40000 ALTER TABLE `user_info_table` DISABLE KEYS */;
INSERT INTO `user_info_table` (`userID`, `user_name`, `userIDCard`, `userPhoneNumber`, `user_pwd`, `user_type`, `server_bank`, `companyRegisterId`, `user_property`, `moneybackCountNo`, `moneybackCountType`, `user_status`, `user_register_time`, `login_name`, `others`) VALUES
	(100000, '管理员', '422828197707014257', '131124016661', 'e10adc3949ba59abbe56e057f20f883e', 'root', NULL, NULL, 300, '123456', '支付宝', 1, '2018-04-27 15:25:35', 'root', NULL),
	(100001, '王飞', '370104198602021433', '131124016662', 'e10adc3949ba59abbe56e057f20f883e', 'buyer', NULL, NULL, 92032.31, '4567884', '支付宝', 0, '2018-04-27 15:26:20', 'buyer', NULL),
	(100017, '李青', '412726199712093467', '13124017773', 'e10adc3949ba59abbe56e057f20f883e', 'seller', '亚联九理（天津）商业保理有限责任公司', '110108017624383', 0, '13124017773', '支付宝', 1, '2018-05-11 18:27:22', 'seller', NULL),
	(100030, '王欣', '430203198812142757', '15678928433', 'e10adc3949ba59abbe56e057f20f883e', 'buyer', '', '', 360000, '15678928433', '支付宝', 0, '2018-05-19 15:52:49', 'buyer1', NULL),
	(100031, '王伟', '620724199008228989', '15627831263', 'e10adc3949ba59abbe56e057f20f883e', 'buyer', '', '', 410000, '15627831263', '微信', 1, '2018-05-19 15:57:25', 'buyer2', NULL),
	(100032, '李琪', '450302198112217343', '13452345675', '96e79218965eb72c92a549dd5a330112', 'seller', '星启点商业保理有限责任公司', '112108117624489', 0, '1594539867234', '支付宝', 1, '2018-05-19 16:22:23', 'seller1', NULL);
/*!40000 ALTER TABLE `user_info_table` ENABLE KEYS */;

-- 导出  视图 109_diaowenjie.v_recommend_view 结构
-- 创建临时表以解决视图依赖性错误
CREATE TABLE `v_recommend_view` (
	`goodIncID` INT(11) NOT NULL,
	`good_name` VARCHAR(20) NOT NULL COLLATE 'utf8_general_ci',
	`good_belonged_bank` VARCHAR(30) NOT NULL COLLATE 'utf8_general_ci',
	`good_money_begin` INT(20) NOT NULL,
	`good_inc_money` INT(20) NOT NULL,
	`count_have_sold` INT(20) UNSIGNED NOT NULL,
	`good_date_belong` INT(10) NOT NULL,
	`good_income_rate` FLOAT NOT NULL,
	`is_resell` INT(2) NULL,
	`good_date_end` DATE NOT NULL,
	`good_date_income` DATE NOT NULL
) ENGINE=MyISAM;

-- 导出  触发器 109_diaowenjie.buyer_resell_table_after_delete 结构
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `buyer_resell_table_after_delete` AFTER DELETE ON `buyer_resell_table` FOR EACH ROW BEGIN
	update order_info_table set have_resell = 0 where orderID = old.orderID ;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- 导出  触发器 109_diaowenjie.buyer_resell_table_after_insert 结构
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `buyer_resell_table_after_insert` AFTER INSERT ON `buyer_resell_table` FOR EACH ROW BEGIN
update order_info_table set have_resell = 1 where orderID = new.orderID ;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- 导出  触发器 109_diaowenjie.buyer_resell_table_after_update 结构
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `buyer_resell_table_after_update` AFTER UPDATE ON `buyer_resell_table` FOR EACH ROW BEGIN
	update order_info_table set have_resell = 2 where orderID =  new.orderID;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- 导出  触发器 109_diaowenjie.insert_into_authority_Table 结构
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `insert_into_authority_Table` AFTER INSERT ON `user_info_table` FOR EACH ROW BEGIN
 insert into root_authority_table(userID) values(new.userID);
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- 导出  触发器 109_diaowenjie.order_info_table_before_insert 结构
SET @OLDTMP_SQL_MODE=@@SQL_MODE, SQL_MODE='STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION';
DELIMITER //
CREATE TRIGGER `order_info_table_before_insert` BEFORE INSERT ON `order_info_table` FOR EACH ROW BEGIN
update goods_info_table set count_have_sold = count_have_sold + 1 , goodHaveSoldNum = goodHaveSoldNum + new.goodCnt where goodIncID = new.goodIncID and new.is_resell = 0;
END//
DELIMITER ;
SET SQL_MODE=@OLDTMP_SQL_MODE;

-- 导出  视图 109_diaowenjie.v_recommend_view 结构
-- 移除临时表并创建最终视图结构
DROP TABLE IF EXISTS `v_recommend_view`;
CREATE ALGORITHM=UNDEFINED DEFINER=`109_diaowenjie`@`%` SQL SECURITY DEFINER VIEW `v_recommend_view` AS select `good`.`goodIncID` AS `goodIncID`,`good`.`good_name` AS `good_name`,`good`.`good_belonged_bank` AS `good_belonged_bank`,`good`.`good_money_begin` AS `good_money_begin`,`good`.`good_inc_money` AS `good_inc_money`,`good`.`count_have_sold` AS `count_have_sold`,`good`.`good_date_belong` AS `good_date_belong`,`good`.`good_income_rate` AS `good_income_rate`,`buyer`.`is_resell` AS `is_resell`,`good`.`good_date_end` AS `good_date_end`,`good`.`good_date_income` AS `good_date_income` from (`goods_info_table` `good` left join `buyer_resell_table` `buyer` on((`good`.`goodIncID` = `buyer`.`goodIncID`))) where ((`good`.`good_date_income` > curdate()) or (`good`.`good_date_end` > curdate())) order by `good`.`count_have_sold` desc;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
