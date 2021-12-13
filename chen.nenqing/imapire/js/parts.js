const makeInspirationList = templater((o) => `
	<div class="item">
      	<a href="#page-detail" class="item-bg" style="background-image: url(${o.image});">
          	<div class="inspiration-detail">
                <span>
                    <label class="date">${o.date}</label>
                </span>
                <span>
                    <label class="project">${o.name}</label>
                </span>
                </div>
        </a>
    </div>
`);

const makeUserProfile = (o) => `
<div>
   <img class="avatar" src="${o.img}">
</div>
<h3>${o.username}</h3>
<h5 class="grey-text" style="margin-top: -10px">Since ${o.date}</h5>
`;

const makeEditProfile = (o) => `
<div>
   <img class="avatar" src="${o.img}">
</div>
<h3><input id="new-user-name" value="${o.username}" onchange="editUsername();"></input></h3>
<h5 class="grey-text" style="margin-top: -10px">Since ${o.date}</h5>
`;



const makeInspirationPopup = o => `
<div class="display-flex inspiration-jump" data-id="${o.inspiration_id}">
   <div class="flex-none inspiration-popup-
   ">
      <img src="${o.icon}" alt="">
   </div>
   <div class="flex-stretch inspiration-popup-body padding-md">
      <div class="inspiration-popup-address"><strong>Place</strong> ${o.address}</div>
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
   name:"name",
   displayname:"Name",
   type:"text",
   placeholder:"Type The User Name",
   value:o.name
})}
${FormControlInput({
   namespace:namespace,
   name:"username",
   displayname:"Username",
   type:"text",
   placeholder:"Type The User Handle",
   value:o.username
})}
${FormControlInput({
   namespace:namespace,
   name:"email",
   displayname:"Email",
   type:"email",
   placeholder:"Type The Email Address",
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


const makeInspirationListSet = (arr,target="#page-list .inspirationlist") => {
   $(".filter-bar").html(makeFilterList(arr));
   $(target).html(makeInspirationList(arr));
}

const capitalize = s => s[0].toUpperCase()+s.substr(1);

const filterList = (inspirations,type) => {
   let a = [...(new Set(inspirations.map(o=>o[type])))];
   return templater(o=>o?`<a href="#" data-filter="${type}" data-value="${o}">${capitalize(o)}</a>`:'')(a);
}


const makeFilterList = (inspirations) => {
   return `
   <a href="#" data-filter="type" data-value="">All</a>
   <div>|</div>
   ${filterList(inspirations,'type')}
   <div>|</div>
   ${filterList(inspirations,'breed')}
   `;
}

const makeInspirationFormInputs = (o,namespace) => `
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