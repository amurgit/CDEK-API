---
title: CDEK API接口说明 - CDEK API Reference

search: true

toc_footers:
  - <a href='http://cdek-express.cn'>CDEK中文官网</a>
  - <a href='http://cdek.ru'>CDEK俄文官网</a>
  - <a href='http://lknew.cdek.ru'>CDEK个人中心</a>
  - <a href='http://warehouse.cdek-express.cn/'>CDEK仓库（阿里云部署的）</a>
  - <a href='http://ek.cdek-asia.cn/cdek/'>CDEK内部EK4.5系统</a>
  - <a href='http://ek5.cdek.ru'>CDEK-EK5系统</a>

includes:
  - delivery-request
  - order-errors
  - calculator
  - services
  - city-api
  - remeasure-api

---

# CDEK接口说明 CDEK API Reference

## 文档内容 Doc-content

该文档集中了大部分CDEK公开的接口技术描述

编辑者：冬星 -- [a.kolupaev@cdek.ru](mailto:a.kolupaev@cdek.ru)

该文档里发现错误请联系冬星,
感谢您的反馈

## 版本历史 Doc-history

* **2018-06-06** -- 创建文档，加上以内容：
  * 注册的ERP列表
  * 验证方式
  * 计算运费时效接口
  * 更新重量尺寸接口
  * 下单异常描述
  * CDEK服务列表
  * CDEK增值服务列表


# 已注册的ERP 

以下物流商ERP是已经注册的并且已经开发好对接CDEK接口的ERP列表。

| 推荐指数 | ERP             |   官网                      |  价格 + 维护费(人民币) *  |
| ------   | -------------   |:----------------------------| -------------------------:|
|	3	   | 华磊科技        | <http://www.sz56t.com>      | 19 800 + 3 800/年         |
|	2	   | K5  易宇通科技  | <http://kingtrans.cn>       | 2800-15800 + 10%/年       |
|	2	   | 钮门快递系统    | <http://www.56track.com>    | 20 000                    |
|	1	   | 速递管家        | <http://www.cowear.cn>      | 38 000 + 10 000/年        |
|	0	   | 全球交易助手    | <http://www.cnfth.com>      |                           |

\* 是参考价格具体价格取决于不同的配置请联系ERP销售咨询

推荐指数越高意味着该ERP卡发的功能越多
<aside class="warning">
目前只有华磊系统开发好了[更新重量的接口](#remeasure-api)-支持重复称重后修改客户提交的重量
</aside>

<aside class="warning">
加盟商请注意：目前CDEK没有仓库操作的接口所以所有仓库操作（入库出库等等）需要使用CDEK内部软件-EK5
</aside>

## 已注册的ERP设置CDEK接口
由于CDEK不是以上ERP的开发者所以设置CDEK接口方式有可能不同，具体设置接口方法请联系ERP售后咨询。
CDEK只提供对接账号 - [获取对接账号](#2--integration-key)

<aside class="notice">
因为CDEK不是以上ERP系统的客户请您购买ERP之后联系售后要求您所需要的功能
目前可以开发的[功能](#-methods)：
</aside>

 
# 接入API说明书 

<a name="integration"></a>
## 开发对接流程 Integration  

1. 获取开发者密钥
2. 获取客户合同号
3. 获取对接账号
4. 开始开发并测试
5. 测试完成开始正式使用接口

<a name="get-dev-key"></a>
## 1) 获取开发者密钥 Developer Key

申请资料： 开发者名称（公司或者个人姓名）、联系方式、ERP或者CMS或者其他软件名称

申请邮箱：[it-support-china@cdek.ru](mailto:it-support-china@cdek.ru)

<a name="get-integration-account"></a>
## 2) 获取对接账号 Integration Account

申请资料： CDEK客户合同号 （以获得合同号请联系CDEK客户经理）、将使用的ERP系统名称
对接账号包括两个字段：

`Account:` 对接账号

`Secure_password:` 对接密码

每个客户合同号只有一个对应的对接账号

没有合同号的话可以申请对接测试账号，申请测试账号时候需要提供公司名或者个人姓名和联系方式、所在城市

申请邮箱：[it-support-china@cdek.ru](mailto:it-support-china@cdek.ru) 

<a name="api-servers"></a>
## 接口服务器地址 API Servers

### 接口服务器一 Server-1

`http://api.cdek.ru` 

### 接口服务器二 Server-2

其他**对接接口**（下单，获取网点列表等等）

`https://integration.cdek.ru`  - 俄罗斯安全连接

`http://integration.cdek.ru`  - 俄罗斯一般链接

`https://integration.cdek-asia.cn`  - 中国安全连接

`http://integration.cdek-asia.cn`  - 中国一般链接




<a name="auth"></a>
# 用户验证 Auth

部分接口请求需要通过用户验证，有两种验证：

1. 按照用账号（Account）和秘钥（Secure）
2. 按照令牌（token) 


<a name="auth-account"></a>
## 第一种验证方式 Account-Secure

> 用Python计算验证密钥:


```python
import hashlib
m = hashlib.md5()

Account  ='3335f13492502568373e88adaf1aad89' #对接账号
Secure_password =  'ba9fe430acdcfd1b0266a4d6115454f2' #对接密码
Date = '2018-04-01' #当天日期

m.update(Date+'&'+Secure_password) #计算MD5散列函数
secure = m.hexdigest() #转为十六进制数字
print secure #打印出结果
# 613ed76d69d6989406244dc955f5fa94

```

第一种验证 -- 提交对接账号和对接秘钥，[获取对接账号](#get-integration-account)之后可以计算出来用于验证的**对接密钥**

按照今天日期 `Date` 和账号密码 `Secure_password` 可以计算出来对接密钥 -- `secure`  MD5散列函数的结果

`secure = md5(Date+"&"+Secure_password)`
比如：

当天日期 `Date = 2018-04-01` 

对接账号 `Account  = 3335f13492502568373e88adaf1aad89`

对接密码 `Secure_password =  ba9fe430acdcfd1b0266a4d6115454f2`

对接秘钥 `secure = md5("2018-04-01&ba9fe430acdcfd1b0266a4d6115454f2")`

<a name="auth-token"></a> 
## 第二种验证方式 Token 

> 用Python获取验证令牌（token）

```python
import requests
import hashlib

username = 'apiuser_xxx'  		#账号
password = '5461s3ffa002' 	    #密码

tocken = ""
auth_url = 'http://auth.api.cdek.ru/api/tokenauth/authorize'

m = hashlib.md5()
m.update(password)
hashedPass = m.hexdigest()
headers = {'content-type' : 'application/json'}
get_token_data = {  "user": username,  "hashedPass": hashedPass}
result = requests.post(auth_url, json=get_token_data, headers=headers)

#返回成功：
{"token":"16c8ead608de41299636aa28a38aae87"}

#提交失败的话）：

{
 "alerts":
  [{
      "type":"danger",
      "msg":"Неверное имя пользователя или пароль.",
      "errorCode":"auth_failed"
  }]
}

```

第二种 Token -- 按照用户名和密码获取令牌（token）

获取token请求地址： ``http://auth.api.cdek.ru/api/tokenauth/authorize``

提交的数据：

* **user** -- 用户名
* **hashedPass** -- MD5(用户密码)

返回数据中 ``token`` 就是所需要的令牌

### 获取token失败

获取令牌失败返回数据：

* **alerts** -- Array
  * **errorCode** -- 验证错误代码


**auth_failed** -- 验证失败 - 用户名或密码不对 



