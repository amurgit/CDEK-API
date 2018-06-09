# 查询运费时效接口 Calculator 

通过该接口可以查到运费和时效，目的地是否有具体CDEK提供的服务


<aside class="notice">
体积重量 – 单位：公斤（kg），计算方式：`宽度*高度*长度/5000`, 厘米*厘米*厘米*/5000

计算运费时候系统使用实际重量和体积重量其中最大的数值。

比如：有一个包裹尺寸：10cm*20cm*15cm 实际重量：0.55 kg那它的体积重量：10*20*15/500 = 0.6  计算运费时候计算重量为0.6 因为这个包裹的体积重量高于实际重量。

</aside>


##接口地址 calc-api

`https://calc.cdek.ru/extended-calc/calculate_price_by_json`

Content-Type: application/json



同样可以用http或者https

## 提交的数据 calc-data


> 计算运费请求实例一 (json):

```json
{ 
	"version":"1.0",
	"dateExecute":"2012-07-27", 
	"authLogin":"098f6bcd4621d373cade4e832627b4f6", 
	"secure":"396fe8e7dfd37c7c9f361bba60db0874", 
	"senderCityId":"270", 
	"receiverCityId":"44", 
	"tariffId":"137", 
	"goods": 
		[ 
			{ 
				"weight":"0.3", 
				"length":"10", 
				"width":"7", 
				"height":"5" 
			}, 
			{ 
				"weight":"0.1", 
				"volume":"0.1" 
			} 
		] 
} 
```


> 计算运费请求实例二 (json):

```json
{ 
	"version":"1.0",
	"dateExecute":"2012-07-27", 
	"authLogin":"098f6bcd4621d373cade4e832627b4f6", 
	"secure":"396fe8e7dfd37c7c9f361bba60db0874", 
	"senderCityId":"44", 
	"receiverCityPostCode": "675000", 
	"tariffAllList": [11,137,233], 
	"goods": 
		[ 
			{ 
				"weight":"0.3", 
				"length":"10", 
				"width":"7", 
				"height":"5" 
			}, 
			{ 
				"weight":"0.1", 
				"volume":"0.1" 
			} 
		] 
} 
```


* **version**  -- string, 接口版本 API,比如 “1.0”.
* **authLogin**  -- string, 账号名 (Account) [详细](#2--integration-key)
* **secure**  -- string. 计算方式: md5($dateExecute."&".$secure_password) [详细](#-auth)
* **dateExecute**  -- string, 预计发货日期
* **senderCityId**  或 **senderCityPostCode** 
  * **senderCityId** -- integer, 始发地城市ID
  * **senderCityPostCode** –- integer, 始发地城市邮编.

<aside class="notice">
需要提交 senderCityId 或者 senderCityPostCode。两个都提交的话senderCityId 为主。
</aside>

* **receiverCityId** 或 **receiverCityPostCode**
  * **receiverCityId** -- integer, 目的地城市ID
  * **receiverCityPostCode** -- integer, 目的地城市邮编

<aside class="notice">
需要提交 receiverCityId 或者 receiverCityPostCode。两个都提交的话receiverCityId 为主。
</aside>

* **tariffId** -- integer, 服务代码。需要选从CDEK服务列表
* **tariffList** -- Array, 联想的数据，包含：
  * **priority** -- integer, 服务排序号
  * **id** -- integer, 服务代码
* **tariffAllList** -- Array of  integer’s, 服务代码列表,服务器会对于每个服务计算出运费，返回的数据中会有运费和时效或者错我

<aside class="notice">
    可以提交**tariffId**或**tariffList**或**tariffAllList**。

    **tariffId** -- 只计算出一个服务的运费

    **tariffList** -- 只计算第一个可以用的服务运费

    **tariffAllList** --  对于每个服务计算出运费
</aside>

	
* **modeId** -- integer, [派送模式代码](#delivery-mode)
* **goods** -- Array, 联想的数据，包含：
  * **weight** -- float, 货品实际重量，公斤kg;
  * **length** -- integer, 长度, 厘米cm;
  * **width** -- integer, 宽度, 厘米cm;
  * **height** -- integer, 高度，厘米cm.
* 或者可以提交:
  * **weight** -- float, 货品实际重量，公斤kg;
  * **volume** -- float, 体积，立方米m3.
* **services** -- Array, 联想的数据，包含：
  * **id** -- integer, 增值服务代码
  * **param** -- integer, 增值服务的参数值

 

### 提交请求时候要注意:

* 验证不是必须的。authLogin, authPassword 可以不提交. 验证仅需要为了识别出来具体客户和他的优惠折扣。
* 预计发货日期不是必须的 dateExecute 但是使用验证时候就必须提交它.
* 提交服务代码时候可以提交一个服务代码tariffId 或几个tariffList、tariffAllList 。都提交的话tariffId 为主。
* modeId 不是必须的，仅提交tariffList 时候需要提交它。
* 提交goods  时候可以混起来体积和尺寸提交方式（weight，length ，height或volume），运费按照实际重量和体积重量其中最大的数值计算的.

## 计算运费时效返回 calc-responce

> 计算接口返回数据 (json):

```json
{
 "error" : [ {
   "code" : 3,
   "text" : "Невозможно осуществить доставку по этому направлению при заданных условиях.",
   "tariffId" : 137
 }, {
   "code" : 3,
   "text" : "Невозможно осуществить доставку по этому направлению при заданных условиях.",
   "tariffId" : 233
 } ],
 "results" : [ {
   "price" : "5220.0",
   "deliveryPeriodMin" : 3,
   "deliveryPeriodMax" : 4,
   "deliveryDateMin" : "2012-08-01",
   "deliveryDateMax" : "2012-08-02",
   "tariffId" : 11,
   "priceByCurrency" : 5220.0,
   "currency" : "RUB"
 } ]
}
```

* **result** -- Array 成功计算出来的数据

  * **price** -- double, 运输费用金额（卢布）;
  * **deliveryPeriodMin** -- integer, 预计最短运输时间;
  * **deliveryPeriodMax** -- integer, 预计最长运输时间;
  * **deliveryDateMin** -- string, 预计最快签收日期,  格式： 'YYYY-MM-DD', 比如 “2017-07-29”;
  * **deliveryDateMax** -- string, 预计最慢签收日期,  格式： 'YYYY-MM-DD', 比如 “2017-07-30”;
  * **tariffId** -- integer, 计算运费时候所使用的运费率代码;
  * **cashOnDelivery** -- float, 目的地最大到付金额（仅目的城市有这个限制时候会返回的）;
  * **priceByCurrency** -- 	float, 运输费用金额（按照合同结算货币，提交authLogin跟secure时候才会出现的） 
  * **currency** -- 	string, 结算货币代码

* **error** -- Array 计算失败:
  * **code** -- integer, [错误代码](#-calc-error-code)
  * **text** -- string, 错误描述
  * **tariffId** -- integer, 服务代码



## 运费计算接口错误代码 calc-error-code

| 异常代码  |                  描述                                     |
| --------  | -------------------------------------------------------   |
| 0  | 系统内错误，请联系CDEK技术支持									|
| 1  | 您提交的接口版本已经不支持的。 									|
| 2  | 验证失败															|
| 3  | 未找到符合条件的服务                 							|
| 4  | 提交的包裹的信息不符规则（goods的内容）							|
| 5  | 没提交包裹（goods的内容）										|
| 6  | 没提交运费率代码													|
| 7  | 没提交始发城市 													|
| 8  | 没提交目的城市													|
| 9  | 没提交预计发货日期（可提交了验证信息）							|
| 10 | 派送模式不对														|
| 11 | 格式不对															|
| 12 | 译码失败，预料收<json 或 jsop> 									|
| 13 | 提交的始发邮编未找到在CDEK数据库 								|
| 14 | 提交的寄件人的邮编属于两个或更多城市，寄件人的城市不明确 		|
| 15 | 提交的目的邮编未找到在CDEK数据库 								|
| 16 | 提交的收件人的邮编属于两个或更多城市，收件人的城市不明确 		|


## 货币表格 currency

<aside class="notice">

* 下单请求中的收件人币种（RecipientCurrency）必须跟对应的目的地国家的币种相同 
* 报价币种（ItemsCurrency）必须跟合同结算币种一致 

</aside>
		

| 货币代码  | 对应的国家的币种  |
| --------- | ----------------- |
| RUB	| 俄罗斯卢布 			| 
| USD	| 美元					| 
| EUR	| 欧元					| 
| KZT	| 坚戈（哈萨克斯坦）	| 
| GBP	| 镑（英国）			| 
| CNY	| 人民币（中国）		| 
| BYR	| 白俄罗斯卢布			| 
| UAH	| 格里夫纳（乌克兰）	| 
| AMD	| 德拉姆（亚美尼亚）	| 
| KGS	| 索姆（吉尔吉斯坦）	| 


