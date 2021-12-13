const resultQuery = async (options) => {
   // destructure
   let {result,error} = await query(options);
   if(error) {
      throw(error);
      return;
   }
   return result;
}

const ListPage = async() => {
   // destructure
   let {result,error} = await query({type:'inspirations_by_user_id',params:[sessionStorage.userId]});

   if(error) {
      console.log(error);
      return;
   }

   console.log(result,error);

   $("#page-list .list").html(makeInspirationList(result));
}

const PlacePage = async() => {
   let result = await resultQuery({
      type:'recent_inspiration_locations',
      params:[sessionStorage.userId]
   });

   let inspirations = result.reduce((r,o)=>{
      o.icon = o.image;
      if(o.lat && o.lng) r.push(o);
      return r;
   },[]);

   console.log(inspirations);

   let mapEl = await makeMap("#page-place .map");
   makeMarkers(mapEl,inspirations);

   let {infoWindow,map,markers} = mapEl.data();
   markers.forEach((o,i)=>{
      o.addListener("click",function(){

         /* Simple Example */
         // sessionStorage.inspirationId = inspirations[i].inspiration_id;
         // $.mobile.navigate("#page-inspiration-profile")

         /* InfoWindow Example */
         infoWindow.open(map,o);
         infoWindow.setContent(makeInspirationPopup(inspirations[i]))

         /* Activate Example */
         // $("#recent-drawer")
         //    .addClass("active")
         //    .find(".modal-body")
         //    .html(makeInspirationPopup(inspirations[i]))
      })
   });
}

const FavoritePage = async() => {
   // destructure
   let {result,error} = await query({type:'inspirations_by_user_id',params:[sessionStorage.userId]});

   if(error) {
      console.log(error);
      return;
   }

   $("#page-favorite .list").html(makeInspirationList(result));
}

const RecentPage = async() => {
   let result = await resultQuery({
      type:'recent_inspiration_locations',
      params:[sessionStorage.userId]
   });

   let inspirations = result.reduce((r,o)=>{
      o.icon = o.image;
      if(o.lat && o.lng) r.push(o);
      return r;
   },[]);

   let mapEl = await makeMap("#page-recent .map");
   makeMarkers(mapEl,inspirations);

   let {infoWindow,map,markers} = mapEl.data();
   markers.forEach((o,i)=>{
      o.addListener("click",function(){

         /* Simple Example */
         // sessionStorage.inspirationId = inspirations[i].inspiration_id;
         // $.mobile.navigate("#page-inspiration-profile")

         /* InfoWindow Example */
         infoWindow.open(map,o);
         infoWindow.setContent(makeInspirationPopup(inspirations[i]))

         /* Activate Example */
         // $("#recent-drawer")
         //    .addClass("active")
         //    .find(".modal-body")
         //    .html(makeInspirationPopup(inspirations[i]))
      })
   });
}



const UserProfilePage = async() => {
   let {result,error} = await query({type:'user_by_id',params:[sessionStorage.userId]});
   if(error) {
      console.log(error);
      return;
   }
   let [user] = result;
   $("#page-user-profile [data-role='main'] .user-profile").html(makeUserProfile(user));
}


const EditProfilePage = async() => {
   let {result,error} = await query({type:'user_by_id',params:[sessionStorage.userId]});
   if(error) {
      console.log(error);
      return;
   }
   let [user] = result;
   $("#page-edit-profile [data-role='main'] .user-profile").html(makeEditProfile(user));
}


const InspirationProfilePage = async() => {
   let inspiration_result = await resultQuery({
      type:'inspiration_by_id',
      params:[sessionStorage.inspirationId]
   });

   let [inspiration] = inspiration_result;
   $(".inspiration-profile-top>img").attr("src",inspiration.img);
   $(".inspiration-profile-bottom .description").html(makeInspirationProfile(inspiration));

   let locations_result = await resultQuery({
      type:'locations_by_inspiration_id',
      params:[sessionStorage.inspirationId]
   });
   let mapEl = await makeMap("#page-inspiration-profile .map");
   makeMarkers(mapEl,locations_result);
}
const InspirationEditPage = async() => {
   let inspiration_result = await resultQuery({
      type:'inspiration_by_id',
      params:[sessionStorage.inspirationId]
   });

   let [inspiration] = inspiration_result;
   
   $("#inspiration-edit-form .fill-parent").html(
      makeInspirationFormInputs(inspiration,"inspiration-edit")
   );
}
const ProjectAddPage = async() => {
   $("#project-add-form .fill-parent").html(
      makeProjectFormInputs({
         name:'',
         description:''
      },"project-add")
   );
}



const LocationSetLocationPage = async() => {
   let mapEl = await makeMap("#page-location-set-location .map");
   makeMarkers(mapEl,[]);

   mapEl.data("map").addListener("click",function(e){
      $("#location-lat").val(e.latLng.lat())
      $("#location-lng").val(e.latLng.lng())
      makeMarkers(mapEl,[e.latLng]);
   })
}

const LocationChooseProjectPage = async() => {
   let result = await resultQuery({
      type:'projects_by_user_id',
      params:[sessionStorage.userId]
   });

   console.log(result)

   $(".location-project-choice-select").html(
      makeProjectChoiceSelect({
         projects:result,
         name:'location-project-choice-select'
      })
   );

   $("#location-project-choice").val(result[0].id);
}