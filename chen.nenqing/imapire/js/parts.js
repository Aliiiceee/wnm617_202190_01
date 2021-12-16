const makeInspirationList = templater((o) => `
	<div class="item">
      	<a href="#page-inspiration-detail" class="item-bg inspiration-jump" data-id="${o.id}" style="background-image: url(${o.image});">
          	<div class="inspiration-detail">
                <span class="icon-and-name">
                    <img class="mini-icon" src="images/white-date-icon.png"/><label class="date">${o.date}</label>
                </span>
                <span class="icon-and-name">
                    <img class="mini-icon" src="images/white-location-icon.png"/><label class="name">${o.name}</label>
                </span>
                </div>
        </a>
    </div>
`);

const makeUserProfile = (o) => `
<div class="user-profile-top js-submituserupload">
   <img class="avatar" src="${o.image}">
   <label class="image-picker replace">
      <input type="file" data-role="none">
   </label>
</div>
<h3>${o.username}</h3>
<h5 class="grey-text" style="margin-top: -10px">Since ${o.date}</h5>
`;

const makeInspirationDetail = (o) => `
<div class="bg" style="background-image: url(${o.image}); ">
   <div>
      <input type="hidden" id="user-upload-filename">
      <label class="image-picker replace">
         <input type="file" data-role="none">
      </label>
   </div>
   <div class="top-bar">
      <a href="#" data-rel="back">
         <img class="back" src="images/back.png">
      </a>
      <a href="#page-inspiration-edit">
         <img class="edit" src="images/edit.png">
      </a>
   </div>
</div>
<div data-role="main" class="inspiaration-content-wrapper">
   <div class="inspiaration-content">
      <div class="icon-and-name">
         <img class="small-icon" src="images/location-icon.png"/>
         <a href="#" class="blue-text subscript">${o.project}</a>
      </div>
      <div class="icon-and-name">
         <img class="small-icon" src="images/note-icon.png"/>
         <a href="#" class="blue-text subscript">${o.name}</a>
      </div>
      <div class="icon-and-name">
         <img class="small-icon" src="images/date-icon.png"/>
         <a href="#" class="blue-text subscript">${o.date}</a>
      </div>
   </div>
   <p>
      ${o.note}
   </p>
   <div>
      <a href="#" class="js-add-favorite ${o.favorite}">
         <div>
         </div>
      </a>
   </div>
</div>`;

const makeInspirationPopup = o => `
<div class="display-flex inspiration-jump" data-id="${o.id}">
   <div class="flex-none inspiration-popup-image
   ">
      <img src="${o.icon}" alt="">
   </div>
   <div class="flex-stretch inspiration-popup-body padding-md">
      <div class="inspiration-popup-address"><strong>Project</strong> ${o.name}</div>
      <div class="inspiration-popup-date"><strong>Date</strong> ${o.date}</div>
   </div>
</div>
`;

const FormControlInput = ({namespace,name,displayname,type,placeholder,value}) => `
<div class="form-control">
   <label for="${namespace}-${name}" class="form-label">${displayname}</label>
   <input type="${type}" id="${namespace}-${name}" class="form-input" data-role="none" placeholder="${placeholder}" value="${value}">
</div>
`;
const FormControlTextarea = ({namespace,name,displayname,placeholder,value}) => `
<div class="form-control">
   <label for="${namespace}-${name}" class="form-label">${displayname}</label>
   <textarea id="${namespace}-${name}" class="form-input" data-role="none" placeholder="${placeholder}">${value}</textarea>
</div>
`;


const makeUserFormInputs = (o,namespace) => `
${FormControlInput({
   namespace:namespace,
   name:"username",
   displayname:"Username",
   type:"text",
   placeholder:"Type The Username",
   value:o.username
})}
${FormControlInput({
   namespace:namespace,
   name:"email",
   displayname:"Email",
   type:"text",
   placeholder:"Type The Email",
   value:o.email
})}
`;




const makeProjectChoiceSelect = ({projects,name,chosen=0}) => `
<select id="${name}">
   ${templater(o=>`
      <option value="${o.id}" ${o.id===chosen?'selected':''}>${o.name}</option>
   `)(projects)}
</select>
`;


const makeInspirationListSet = (arr,target="#page-list .list") => {
   $("#page-list .filter-bar").html(makeFilterList(arr));
   $(target).html(makeInspirationList(arr));
}

const makeInspirationMapSet = async(arr) => {
   $('#page-place .filter-bar').html(makeFilterList(arr));

   let mapEl = await makeMap("#page-place .map");
   makeMarkers(mapEl,arr);

   console.log(arr);

   let {infoWindow,map,markers} = mapEl.data();
   markers.forEach((o,i)=>{
      o.addListener("click",function(){

         /* Simple Example */
         // sessionStorage.inspirationId = inspirations[i].inspiration_id;
         // $.mobile.navigate("#page-inspiration-profile")

         /* InfoWindow Example */
         infoWindow.open(map,o);
         infoWindow.setContent(makeInspirationPopup(arr[i]))

         /* Activate Example */
         // $("#recent-drawer")
         //    .addClass("active")
         //    .find(".modal-body")
         //    .html(makeInspirationPopup(inspirations[i]))
      })
   });
}

const capitalize = s => s[0].toUpperCase()+s.substr(1);

const filterList = (inspirations,project) => {
   let a = [...(new Set(inspirations.map(o=>o[project])))];
   return templater(o=>o?`<a href="#" data-filter="${project}" data-value="${o}">${capitalize(o)}</a>`:'')(a);
}


const makeFilterList = (inspirations) => {
   console.log(inspirations);
   return `
   <a href="#" data-filter="project" data-value="">All</a>
   <div>|</div>
   ${filterList(inspirations,'project')}`;
}

const makeProjectFormInputs = (o,namespace) => `
${FormControlInput({
   namespace:namespace,
   name:"name",
   displayname:"Name",
   type:"text",
   placeholder:"Type The Project Name",
   value:o.name
})}
${FormControlTextarea({
   namespace:namespace,
   name:"description",
   displayname:"Description",
   placeholder:"Type The Project Description",
   value:o.description
})}
`;

const makeInspirationFormInputs = (o,namespace) => `
${FormControlInput({
   namespace:namespace,
   name:"name",
   displayname:"Name",
   type:"text",
   placeholder:"Type The Inspiration Name",
   value:o.name
})}
${FormControlTextarea({
   namespace:namespace,
   name:"description",
   displayname:"Description",
   placeholder:"Type The Inspiration Description",
   value:o.note
})}
`;