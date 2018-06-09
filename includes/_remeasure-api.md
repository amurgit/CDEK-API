<a name="remeasure-api"></a>
# 更新重量以及尺寸接口

> 用Python提交更新重量请求:

```python

import requests
import hashlib

url = "http://rmsr.api.cdek.ru/remeasure/create"
headers = {'content-type' : 'application/json'}  

data  = {
	"date": '2018-12-10',
	"token": "94c8ead608de45299636aa28a37aae80",  #验证token
	# "account": "abcdef31742309effff223", #验证账号 
	# "secure": "387f300be382982402ac389", #验证秘钥
	# 账号和秘钥不提交用因为选了token验证方式
	"orderCount": "1", 
	"orders": [{
		"dispatchNumber": "1087319386", #CDEK运单号 
		"items": [{
			"barcode": "ITEM1341", #包裹条码
			"weight": "1200", #重量（单位：克）  
			#"sizeA": sizeA,
			#"sizeB": sizeB,
			#"sizeC": sizeC
			# 尺寸不是必填项
			}]
		}]
	}

result = requests.post(url, json=data, headers=headers)
```

经常下单时候提交请求系统中还没有货件实际重量和尺寸所以收到货物之后需要重复称重并提交货件重量尺寸请求

**请求地址**：``http://rmsr.api.cdek.ru/remeasure/create``

HTTP请求中Content-Type（内容类型属性）:  **"Content-Type"**: ``"application/json"``


|	    | 参数	    |  描述	  						|数据格式	|  是否必需 |
| -----	| --------------  |  ---------------------	| ---------	|  -------- |
| 1		| date	 		  | 日期（今天）			| Date			|   是  |
| 2		| account	      | 账号					| varchar(255)	|	是（备注一）|
| 3		| secure		  |	密钥					| varchar(255)	|	是（备注一）|
| 4		| token			  | 令牌					| varchar(255)	|	是（备注一）|
| 5		| orderCount	  |	运单数量				| number		|   是  |
| 6		| orders		  |	需要修改运单列表		| Array         |   是  |
| 7.1	| dispatchNumber  |	CDEK运单号	 			| number  		|	是  |
| 7.2	| items	 		  | 包裹的内容		 		| Array 		|   是  |
| 7.2.1	| barcode		  | 包裹代码 				| varchar(20)	|   是  |
| 7.2.2	| weight		  | 重量（克） 				| number	 	|  是（备注二）|
| 7.2.3	| sizeA 		  | 尺寸（长度，厘米）		| number		|  是（备注二）|
| 7.2.4	| sizeB 		  | 尺寸（宽度，厘米）		| number		|  是（备注二）|
| 7.2.5	| sizeC 	      | 尺寸（高度，厘米）		| number		|  是（备注二）|


* **备注一** -- 可以选择提交 [account跟secure](#auth-account) 或提交 [token](#-token)
* **备注二** -- 需要提交尺寸或重量或尺寸和重量
* **barcode** -- 包裹条码的内容是下单时候提交的 Package->BarCode
* **长宽高度单位** -- 厘米 cm


> 更新重置返回数据（更新失败）:

```json

{"order":
	[ 
		{
			"number":"KYTCD7052201121YQ",
			"dispatchNumber":"1047042944",
			"success":false,
			"errorCode":"ERR_WRONG_STATUS",
			"msg":"Заказ должен быть в статусе 1 или 3. Статус заказа: 4"
		}
	],
	"errors":[]
}

``` 

> 更新重置返回数据（更新成功）:

```javascript
{
"orders": [
    {
        "number": "ORDER12294108",  //网店的运单跟踪号
        "dispatchNumber": "1086518471", //CDEK运单号
        "success": "true"
    },
    {
        "number": "网店的运单跟踪号",
        "dispatchNumber" :" CDEK运单号",
        "success": "false",
        "errorCode": "错误代码",
        "msg": "错误解释"
    },
    {
        "msg": "总结：修改好了一个运单"
    }]
}
```

返回数据中 orders列表中凡是包含number是更新具体运单请求结果

###	更新重量接口错误代码

|  错误代码     		| 描述               		| 
| --------------------  | ------------------------- | 
| ERR_AUTH 				| 验证失					| 
| ERR_JSON_VALIDATION 	| JSON格式不正确 			| 
| ERR_INNER_ERROR		| 连接不上API的端口			| 
| ERR_ORDER_NOT_FOUND	| 无法找出该运单			| 
| ERR_WRONG_STATUS		| 运单物流动态不是“已办理”	| 
| ERR_NO_PACKAGE_FOUND  | 没找出该包裹代码相对的条码| 
| EMPTY_×××  			| 没提交×××属性				| 

