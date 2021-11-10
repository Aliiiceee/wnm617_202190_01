const showInspirationList = async() => {
	let inspirations = await query({
      type:'inspirations_all',
      params:[sessionStorage.userId]
   });

	var output = '';
   	for(var i = 0; i < inspirations.result.length; i++) {
		item = inspirations.result[i];
		var str = '<div class="item">' + 
              '<a href="#page-detail" class="item-bg" style="background-image: url(./images/' + item.image + ');">' +
                  '<div class="inspiration-detail">' +
                     '<span>' +
                        '<label class="time">' + item.time + '</label>' + 
                        '<label class="date">' + item.date + '</label>' +
                     '</span>' +
                     '<span>' +
                        '<label class="address">' + item.address + '</label>' +
                     '</span>' +
                  '</div>' +
               '</a>' +
            '</div>';
        output += str;
    }

	$('#page-list .list').html(output);
}