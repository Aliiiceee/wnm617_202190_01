const makeInspirationList = templater((o) => `
	<div class="item">
      	<a href="#page-detail" class="item-bg" style="background-image: url(./images/${o.image});">
          	<div class="inspiration-detail">
                <span>
                    <label class="time">${o.time}</label>
                    <label class="date">${o.date}</label>
                </span>
                <span>
                    <label class="address">${o.address}</label>
                </span>
                </div>
        </a>
    </div>
`);