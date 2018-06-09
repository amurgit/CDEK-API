get_date = function(){
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth()+1; //January is 0!
	var yyyy = today.getFullYear();
	if(dd<10) {dd = '0'+dd} 
	if(mm<10) {mm = '0'+mm} 
	return yyyy+'-'+mm+'-'+dd;
}

var acc = "sda"
var sec_pwd = "asdfas"
var sec = md5(get_date()+'&'+sec_pwd)
var today = get_date()


$(function() {
	$("#city").autocomplete({
		source : function(request, response) {
			$.ajax({
				url : "http://api.cdek.ru/city/getListByTerm/jsonp.php?callback=?",
				dataType : "jsonp",
				data : {
					q : function() {
						return $("#city").val()
					},
					name_startsWith : function() {
						return $("#city").val()
					}
				},
				success : function(data) {
					response($.map(data.geonames, function(item) {
						return {
							label : item.name,
							value : item.name,
							id : item.id,
							regionName : item.regionName,
							postCodeArray: item.postCodeArray
						}
					}));
				}
			});
		},
		minLength : 1,
		select : function(event, ui) {
			$('#receiverCityId').val(ui.item.id);
			$('#city_id').text(ui.item.id);
			$('#city_region').text(ui.item.regionName);
			$('#city_indexes').text(ui.item.postCodeArray.join(', '));

		}
	});
});
