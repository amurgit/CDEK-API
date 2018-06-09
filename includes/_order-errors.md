# 下单异常代码 Errors

<aside class="notice">下单时候无法下单系统报错至少要给客户显示异常名称，最好再处理具体异常</aside>

下单时接口返回的异常代码:

<div class="wide-table-before"></div>
 
异常代码                   | 异常名称 -- 异常解释   |      																							      |
----------                 | -------                |  -------   																						  |
ERR_XML_EMPTY              | 没提交XML数据          | 提交XML并且XML的内容放在$_POST[xml_request]变量													  |		
ERR_AUTH                   | 验证失败               | 提交的对接账号和秘钥不匹配            															  |		
ERR_RESULT_SERVICE_EMPTY   | 未找到对应的服务       | 请尝试使用其他服务代码或者申请加上该服务															  |		
ERR_RECCITYPOSTCODE        | 未找到对应邮编		    | 该邮编不在CDEK数据库，请申请加上邮编																  |
ERR_ORDER_DUBL_EXISTS      | 订单号重复			    | 该订单号（DeliveryRequest->Order->Number）已存在，不能重复下单									  |
ERR_WAREKEY_DUBL     	   | 产品条码重复    	    | 一个订单里不可重复产品条码（DeliveryRequest->Order->Package->WareKey）   							  |
ERR_NEED_ATTRIBUTE     	   | 没提交数据	    	    | 提交的XML里缺少标签（比如ADDRESS标签等等）														  |
ERR_RECCITYPOSTCODE_DUBL   | 目的地邮编对应多个城市	| 邮编对应多个城市无法识别具体城市																	  |
ERR_INVALID_WEIGHT         | 重量必须大于0			| 提交的重量要大于0  																				  |
ERR_INVALID_WEIGHT         | 重量必须大于0			| 提交的重量要大于0  																				  |
ERR_GOODS_CODE_MAX         | 产品条码过长			| 产品条码（DeliveryRequest->Order->Package->WareKey）不能超过50字 									  |
ERR_RECCITYCODE            | 目的地代码错误			| 提交了不正确的目的地代码，必须是数字（DeliveryRequest->Order->RecCityCode）						  |
ERR_NOT_FOUND_RECCITY      | 未指定目的地			| 没提交目的地的邮编或者城市代码（RecCityPostCode或RecCityCode）						              |
ERR_WEIGHT_LIMIT           | 超过该服务重量限制		| 提交的重量（DeliveryRequest->Order->Package->Weight）超过了该服务重量限制	   			              |
ERR_API                    | 调用接口失败    		| CDEK服务器异常请联系CDEK技术支持	   		                                        	              |
ERR_SHORT_RECIPIENT_NAME   | 收件人姓名过短    		| 收件人名称必须长于3个字       	   		                                        	              |
ERR_SENDCITYCODE           | 始发地代码错误			| 提交了不正确的始发地代码，必须是数字（DeliveryRequest->Order->SendCityCode）						  |
ERR_GOODS_EMPTY            | 没有输入产品		   	| 没提交产品标签（DeliveryRequest->Order->Package->Item					                        	  |
ERR_CURRENCY_NOTVALID_DECLAREDCOST_CLIENT | 不正确的产品报价币种	  | 产品报价币种（ItemsCurrency）必须跟合同里面的结算币种一致					      |
ERR_DATABASE_INSERTINTOORDERS             | 下单失败            	  | CDEK服务器异常请联系CDEK技术支持	   		      							      |
ERR_PVZ_WITH_TARIFF_MISTAKE               | 网点代码错误         	  | 目的地没有对应的网点代码	   		      							              |
ERR_CASH_ON_DELIV_PAYREC_MISTAKE          | 目的城市不提供代收货款服务| 目的城市不提供代收货款服务	   		      							              |
ERR_INVALID_TARIFF_WITH_WEIGHT_MORE_30    | 重量大于30kg              | 该服务不支持重量大于30kg（DeliveryRequest->Order->Package->Weight）      	      |
ERR_CURRENCY_CASH_ON_DELIV_MISTAKE        | 提交的收件人币种不对      | 需要按照目的国家提交正确的币种代码      	     	 							  |

