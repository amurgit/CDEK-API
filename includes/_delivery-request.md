<a name="process"></a>
# 下单流程 Get Waybill

Get Waybill -- DeliveryRequest

![下单流程](images/liucheng.png)

* 获取寄件人城市
* 获取收件人城市
* 获取网点列表 （自提订单需要提交目的地网点代码）
* 查询时效运费以及可以使用的服务([计算运费接口](#-calculator))
* 选择 [具体服务](#-services) 再下单（获取CDEK运单号） 

## 下单接口 DeliveryRequest

### 请求方式 Order-params

* 接口服务器：[接口服务器二](#-api-servers)
* 接口地址： ``/new_orders.php``
  * 具体地址例子：``https://integration.cdek-asia.cn/new_orders.php``
* **ContentType: "application/x-www-form-urlencoded"**
* 请求数据XML需要放到 **POST["xml_request"]** 变量值
* XML内容字符编码：**UTF-8**
* 返回内容格式：**JSON**


### 下单提交的XML标签和属性 Order-XML

<aside class="notice">
以下表格中的**序号**只为了表示XML标签和属性子母关系
CDEK服务支持两种跟踪号可以同样用于查询物流轨迹：

* **CDEK运单号** -- 下单时候被CDEK生成的（10为数字的）
* **网店跟踪号** -- **DeliveryRequest->Order->Number** 网店提供的跟踪号（平时是网店订单号）

为了避免跟CDEK运单号冲突 **DeliveryRequest->Order->Number** 建议不用10位数字的订单号
</aside>

<div class="wide-table-before"></div>
| 序号       | 标签/属性名称         |   格式                      |  必需  |  描述                                                             |
| ------     | -------------         |:----------   | --- | :---------------------------------------------------------------------------------- |
| -        | DeliveryRequest       |              | √ | 下单请求标签                                                                            |
| 1        | DeveloperKey          | varchar(32)  | √ | [ERP开发者识别码](#1--developer-key)                                                    |
| 2        | Number                | varchar(20)  | √ | 请求序号（可随机填）                                                                    |
| 3        | Date                  | Date         | √ | 下单日期                                                                                |
| 4        | Account               | varchar(255) | √ | [对接的账号](#2--integration-account) (按CDEK客户合同号签发的32位的字段)                |
| 5        | Secure                | varchar(255) | √ | [对接密钥](#-account-secure)（计算出来的）                                              |
| 6        | OrderCount            | Number       | √ | 该请求中订单数量                                                                        |
| 7        | Order                 |              | √ | 订单标签                                                                                |
| 7.1      | Number                | string(40)   | √ | 网店提供的跟踪号（网店订单号），不可以重复，可以用它来跟踪订单，                        |
| 7.2      | SendCityCode          | Number       | 备注一 | CDEK数据库中城市ID                                                                 |




1.6.3.  RecCityCode2  目的城市ID (请看 "City_XXX_YYYYMMDD.xls"文件城市接口说明书)  Number  √
1.6.4.  SendCityPostCode2 始发城市邮编  varchar(6)  √
1.6.5.  RecCityPostCode2  目的城市邮编  varchar(6)  √
1.6.6.  RecipientName 收件人全名   varchar(128)  √
1.6.7.  RecipientEmail  收件人电子邮箱地址   varchar(255)  
1.6.8.  Phone 收件人电话号码（仅可以提交手机电话号码，固定电话只能加为备用电话） varchar(50) √
1.6.9.  TariffTypeCode  运率代码 (请看附件表格 1)   Number  √
1.6.10. DeliveryRecipientCost1  到付金额 (RecipientCurrency的币种)   varchar(255)  √
1.6.11. RecipientCurrency6  收件人的货币代码: (请看附件表格 7). 取决于目的国家   varchar(10) 
1.6.12. ItemsCurrency 投保价的货币代码(请看附件表格 7). 取决于合同结算货币（网店的国家）  varchar(10) 
1.6.13. Comment 任何备注  varchar(255)  
1.6.14. SellerName  卖家名称 ，面单上打印的  varchar(255)  √
1.6.15. Address8  （收件人地址有两种提交方法，具体请看表格下）目的地址。投送方式到门时必须填 (Street, House, Flat – 道街、楼房、门号), 投送方式到库时必须填PvzCode参数。
    √
1.6.15.1  Street  街道名 varchar(50) √
1.6.15.2  House 楼房号   varchar(30) √
1.6.15.3  Flat  门号  varchar(10) 
1.6.15.4  PvzCode 网点代号 (请看"网点报文"). 仅投送方式“到库”并且没提交”在目的城市派送”增值服务 (AddService = "17")的话才需要提交的  varchar(10) √
1.6.16. Package 包裹（实际上一般是一个箱子）    √
1.6.16.1   Number 包裹序号1、2、3等等（多箱子的话必须要在每个箱子贴上包裹序号）  varchar(20) √
1.6.16.2  BarCode 条码，必须包裹里唯一的 varchar(20) √
1.6.16.3  Weight  毛重总重量克g（运费就按照这个重量计算的） Number  √
1.6.16.4  SizeA4  包装长度厘米cm  Number  
1.6.16.5  SizeB4  包装宽度厘米cm  Number  
1.6.16.6  SizeC4  包装高度厘米cm  Number  
1.6.16.7  Item  货件信息各货品   √
1.6.16.7.1  WareKey7  网店或销售平台产品的SKU或产品ID  varchar(20) √
1.6.16.7.2  Cost  货件投保价值 (单价ItemsCurrency的货币) Real  √
1.6.16.7.3  Payment 代收货款金额 (RecipientCurrency的货币) Real  √
1.6.16.7.4  Weight  每一件的净重克g  Number  √
1.6.16.7.5  Amount  货件数量  Number  √
1.6.16.7.6  Comment 货品描述用收件人的语言 varchar(255)  
1.6.17. AddService5 增值服务（保险服务是自动加上的不需要提交）   
1.6.17.1  ServiceCode   增值服务号码 (请看附件表格 5) Number  
1.6.18  Schedule3 预定派送时间表   
1.6.18.1  Attempt 派送时间。一天只能尝试一次派送。派送时间段不能少于3个小时   √
1.6.18.1.1  ID  CDEK系统内时间表ID默认可以提交1 string(20)  √
1.6.18.1.2  Date  派送日期收件人方便接货的日期格式YYYY-MM-DD  Date  √
1.6.18.1.3  TimeBeg 派送时间段的开始按收件人时区  Time  √
1.6.18.1.4  TimeEnd 派送时间段的结束按收件人时区  Time  √
1.6.18.1.5  RecipientName 新的收件人姓名需要修改的话 string(128) 
1.6.18.1.6  Phone 新的收件人电话需要修改的话 Phone 
1.6.18.1.7  Address 新的收件人地址需要修改的话运率到门的话需要提交Street、House、Flat。运率到库的话需要提交PvzCode属性。   
1.6.18.1.7.1  Street  街道  string(50)  √
1.6.18.1.7.2  House 楼号  string(30)  √
1.6.18.1.7.3  Flat  门号  string(10)  
1.6.18.1.7.4  PvzCode 网点代号可以用网点报文来获取网点代号  string(10)  √
1.6.18.1.7.5  Comment 备注（怎么找到目的地、详细地址）  string(255) 
1.7.1 CallCourier 叫快递跟叫快递文档相同的作用    
1.7.1.1 Call  叫快递   √
1.7.1.1.1 Date  期待快递来的日期  Date  √
1.7.1.1.2 TimeBeg 开始等待快递的时点 Time  √
1.7.1.1.3 TimeEnd 结束等待快递的时点 Time  √
1.7.1.1.4 LunchBeg  午休时间开始位于TimeBeg跟TimeEnd之间的话才需要提交  Time  
1.7.1.1.5 LunchEnd  午休时间结束位于TimeBeg跟TimeEnd之间的话才需要提交  Time  
1.7.1.1.6 SendCityCode  始发城市ID  Integer √
1.7.1.1.7 SendPhone 寄件人手机号  Phone √
1.7.1.1.8 Comment 给快递的备注  string(255) 
1.7.1.1.9 SenderName  寄件人姓名 string(255) √
1.7.1.1.10  SendAddress 收件人地址   √
1.7.1.1.10.1  Street  街道  string(50)  √
1.7.1.1.10.2  House 楼号  string(30)  √
1.7.1.1.10.3  Flat  门号  string(30)  √


**备注一** -- 有三种指定始发城市的方法：

1. 城市ID -- SendCityCode
2. 国家ID和邮政编码 -- SendCountryCode 和 SendCityPostCode
3. 国家ID和城市名称 -- SendCountryCode 和 SendCityName

