# 查询城市接口 City API 
<div>
  <label for="city" style="float: left; margin:5px;">Город получатель/目的地: </label>
  <div class="ui-widget"  style="float: left">
    <input id="city" /> 
  </div>
  <div style="clear: both;"></div>
  <table class="city-info" style="margin:15px;"> 
    <tr><td>ID города/城市ID</td><td id="city_id"></td></tr>
    <tr><td>Регион/州省</td><td id="city_region"></td></tr>
    <tr><td>Индексы/邮编</td><td id="city_indexes"></td></tr>
  </table>
  <div id="error"></div>
  <table class="tariff-list"> 
  </table>
</div>

