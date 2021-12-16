
const projectAddForm = async () => {
   let name = $("#project-add-name").val();
   let description = $("#project-add-description").val();

   let r = await query({
      type:'insert_project',
      params:[sessionStorage.userId,name,description]
   });

   sessionStorage.projectId = r.id;
   history.go(-1);
}

const inspirationEditForm = async () => {
   let name = $("#inspiration-edit-name").val();
   let description = $("#inspiration-edit-description").val();

   let r = await query({
      type:'update_inspiration',
      params:[name,description,sessionStorage.inspirationId]
   });

   history.go(-1);
}

const checkSignup = async () => {
   let email = $("#signup-email").val();
   let username = $("#signup-username").val();
   let password = $("#signup-password").val();
   let confirm = $("#signup-password2").val();

   if(password!=confirm)
      throw("Passwords don't match: You should handle this in some way.");

   let r = await query({
      type:'insert_user',
      params:[username,email,password]
   });

   if(r.error) throw(r.error);

   sessionStorage.userId = r.id;

   $.mobile.navigate("#page-recent");
}

const checkSignup2 = async () => {
   let name = $("#signup-name").val();
   let image = $("#signup-image-name").val();

   let r = await query({
      type:'update_user_onboard',
      params:[name,image,sessionStorage.userId]
   });

   if(r.error) throw(r.error);

   $.mobile.navigate("#page-list");
}

const userEditForm = async () => {
   let username = $("#user-edit-username").val();
   let email = $("#user-edit-email").val();

   let r = await query({
      type:'update_user',
      params:[username,email,sessionStorage.userId]
   });

   history.go(-1);
}

const userEditPasswordForm = async () => {
   let password = $("#user-password-initial").val();
   let confirm = $("#user-password-confirm").val();

   if(password!==confirm) throw ("Passwords don't match")

   let r = await query({
      type:'update_user_password',
      params:[password,sessionStorage.userId]
   });

   history.go(-1);
}

const locationAddForm = async () => {
   let project = $("#location-project-choice").val();
   console.log(project);
   let lat = $("#location-lat").val();
   let lng = $("#location-lng").val();
   let name = $("#inspiration-name").val();
   let description = $("#location-description").val();

   let r = await query({
      type:'insert_location',
      params:[sessionStorage.userId, project,name,lat,lng,description]
   });

   if(r.error) throw(r.error);

   history.go($("#location-navigateback").val());
}



const checkSearchForm = async (s) => {
   let inspirations = await query({
      type:'search_inspirations',
      params:[s,sessionStorage.userId]
   });

   if(inspirations.error) throw(inspirations.error);

   makeInspirationListSet(inspirations.result);
}
const checkFilter = async (v) => {
   console.log(v);

   let inspirations = await query({
      type:'filter_inspirations',
      params:[v,sessionStorage.userId]
   });

   if(inspirations.error) throw(inspirations.error);

   makeInspirationListSet(inspirations.result);

   let arr = inspirations.result.reduce((r,o)=>{
      o.icon = o.image;
      if(o.lat && o.lng) r.push(o);
      return r;
   },[]);

   makeInspirationMapSet(arr);
}

const addFavorite = async () => {
   let result = await query({
      type:'add_favorite',
      params:[sessionStorage.inspirationId]
   });
}

const removeFavorite = async () => {
   let result = await query({
      type:'remove_favorite',
      params:[sessionStorage.inspirationId]
   });
}