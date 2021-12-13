
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
   let type = $("#inspiration-edit-type").val();
   let breed = $("#inspiration-edit-breed").val();
   let description = $("#inspiration-edit-description").val();

   let r = await query({
      type:'update_inspiration',
      params:[name,type,breed,description,sessionStorage.inspirationId]
   });

   if(r.error) throw(r.error);

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
   let name = $("#user-edit-name").val();
   let email = $("#user-edit-email").val();

   let r = await query({
      type:'update_user',
      params:[username,name,email,sessionStorage.userId]
   });

   if(r.error) throw(r.error);

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

   if(r.error) throw(r.error);

   history.go(-1);
}

const locationAddForm = async () => {
   let project = $("#location-project-choice").val();
   let lat = $("#location-lat").val();
   let lng = $("#location-lng").val();
   let description = $("#location-description").val();
   alert(sessionStorage.userId);
   alert(project);

   let r = await query({
      type:'insert_location',
      params:[sessionStorage.userId, project,lat,lng,description]
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
const checkFilter = async (f,v) => {
   let inspirations = await query({
      type:'filter_inspirations',
      params:[f,v,sessionStorage.userId]
   });

   if(inspirations.error) throw(inspirations.error);

   makeInspirationListSet(inspirations.result);
}