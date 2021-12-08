
const animalAddForm = async () => {
   let name = $("#animal-add-name").val();
   let type = $("#animal-add-type").val();
   let breed = $("#animal-add-breed").val();
   let description = $("#animal-add-description").val();

   let r = await query({
      type:'insert_animal',
      params:[sessionStorage.userId,name,type,breed,description]
   });

   if(r.error) throw(r.error);

   sessionStorage.animalId = r.id;
   history.go(-1);
}

const animalEditForm = async () => {
   let name = $("#animal-edit-name").val();
   let type = $("#animal-edit-type").val();
   let breed = $("#animal-edit-breed").val();
   let description = $("#animal-edit-description").val();

   let r = await query({
      type:'update_animal',
      params:[name,type,breed,description,sessionStorage.animalId]
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
   let animal = $("#location-animal-choice").val();
   let lat = $("#location-lat").val();
   let lng = $("#location-lng").val();
   let description = $("#location-description").val();

   let r = await query({
      type:'insert_location',
      params:[animal,lat,lng,description]
   });

   if(r.error) throw(r.error);

   history.go($("#location-navigateback").val());
}



const checkSearchForm = async (s) => {
   let animals = await query({
      type:'search_animals',
      params:[s,sessionStorage.userId]
   });

   if(animals.error) throw(animals.error);

   makeAnimalListSet(animals.result);
}
const checkFilter = async (f,v) => {
   let animals = await query({
      type:'filter_animals',
      params:[f,v,sessionStorage.userId]
   });

   if(animals.error) throw(animals.error);

   makeAnimalListSet(animals.result);
}