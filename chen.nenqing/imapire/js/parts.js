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

const makeUserProfile = (o) => `
<div class="user-profile-image">
   <img src="${o.img}" alt="">
</div>
<div>
   <h2>${o.name}</h2>
   <h3>&commat;${o.username}</h3>
   <div><a href="#page-user-settings">Settings</a></div>
</div>
`;



const makeInspirationPopup = o => `
<div class="display-flex inspiration-jump" data-id="${o.inspiration_id}">
   <div class="flex-none inspiration-popup-image">
      <img src="${o.icon}" alt="">
   </div>
   <div class="flex-stretch inspiration-popup-body padding-md">
      <div class="inspiration-popup-address"><strong>Place</strong> ${o.address}</div>
      <div class="inspiration-popup-date"><strong>Date</strong> ${o.date}</div>
   </div>
</div>
`;