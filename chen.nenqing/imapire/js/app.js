
// DOCUMENT READY
$(()=>{

   checkUserId();

   // Event Delegation
   $(document)


   .on("pagecontainerbeforeshow",function(event, ui){
      // Page Routing
      switch(ui.toPage[0].id) {
         case "page-recent": RecentPage(); break;
         case "page-list": ListPage(); break;
         case "page-place": PlacePage(); break;
         case "page-favorite": FavoritePage(); break;
         case "page-user-profile": UserProfilePage(); break;
         case "page-user-edit": UserEditPage(); break;
         case "page-project-add": ProjectAddPage(); break;
         case "page-inspiration-detail": InspirationDetailPage(); break;
         case "page-inspiration-edit": InspirationEditPage(); break;
         case "page-location-choose-project": LocationChooseProjectPage(); break;
         case "page-location-set-location": LocationSetLocationPage(); break;
      }
   })


   // FORM SUBMITS
   .on("submit","#signin-form",function(e) {
      e.preventDefault();
      checkSigninForm();
   })
   .on("submit","#signup-form",function(e) {
      e.preventDefault();
      checkSignup();
   })
   .on("submit","#list-add-form",function(e) {
      e.preventDefault();
   })
   .on("submit", "#project-add-form",function(e) {
      projectAddForm();
      e.preventDefault(); 
   })
   .on("submit", "#list-search-form", function(e) {
      e.preventDefault();
      let s = $(this).find("input").val();
      checkSearchForm(s);
   })
   .on("submit", "#inspiration-edit-form", function(e) {
      e.preventDefault();
      inspirationEditForm();
   })

   // ON CHANGE   
   .on("change","#location-project-choice-select",function(e){
      $("#location-project-choice").val(this.value)
   })


   // ANCHOR CLICKS
    .on("click",".js-submituseredit",function(e) {
      e.preventDefault();
      userEditForm();
   })
   .on("click",".js-submituserpassword",function(e) {
      e.preventDefault();
      userEditPasswordForm();
   })
   .on("click",".js-submitlocationform",function(e){
      e.preventDefault();
      locationAddForm();
   })
   .on("click",".js-logout",function(e) {
      e.preventDefault();
      sessionStorage.removeItem("userId");
      checkUserId();
   })
   .on("click",".inspiration-jump",function(e) {
      if(!$(this).data("id")) throw("No ID on element");
      sessionStorage.inspirationId = $(this).data("id");
      $.mobile.navigate("#page-inspiration-detail");
   })

   //Add or delete favorite
   .on("click",".js-add-favorite",function(e) {
      if($(this).hasClass("favorite")) {
         removeFavorite();
         $(this).removeClass("favorite");
      } else {
         addFavorite();
         $(this).addClass("favorite");
      }
   })
   .on("click",".js-inspiration-delete",function(e){
      query({
         type:"delete_inspiration",
         params: [sessionStorage.inspirationId]
      }).then(d=>{
         history.go(-2);
      })
   })




   .on("click","[data-activate]",function(e){
      let target = $(this).data("activate");
      $(target).addClass("active");
   })
   .on("click","[data-deactivate]",function(e){
      let target = $(this).data("deactivate");
      $(target).removeClass("active");
   })
   .on("click","[data-toggle]",function(e){
      let target = $(this).data("toggle");
      $(target).toggleClass("active");
   })
   .on("click","[data-activateone]",function(e){
      let target = $(this).data("activateone");
      $(target).addClass("active").siblings().removeClass('active');
   })
   .on("click","[data-filter]",function(e){
      let {filter,value} = $(this).data();
      if(value=="") { ListPage(); PlacePage(); }
      else checkFilter(value);
   })

   .on("change",".user-profile-top .image-picker input",function(e){
      checkUpload(this.files[0])
      .then(d=>{
         let image = "images/"+d.result;
         $(this).parent().prev().attr("src", image);

         query({
            type:"update_user_image",
            params: [image,sessionStorage.userId]
         }).then(d=>{
            if(d.error) throw(d.error);

            history.go(-1);
         });
      })
   })
   .on("change","#page-inspiration-detail .image-picker input",function(e){
      checkUpload(this.files[0])
      .then(d=>{
         let image = "images/"+d.result;
         $(this).parent().parent().parent().css({
            "background-image":`url(images/${d.result})`
         });
         query({
            type:"update_inspiration_image",
            params: [image,sessionStorage.inspirationId]
         }).then(d=>{
            if(d.error) throw(d.error);

            history.go(-1);
         });
      })
   })
   ;



   $("[data-template]").each(function(){
      let target = $(this).data("template");
      $(this).html($(target).html());
   })

   $({
      "#page-recent":".nav-icon-set li:nth-child(1)",
      "#page-list":".nav-icon-set li:nth-child(2)",
      "#page-user-profile":".nav-icon-set li:nth-child(3)",
   }[location.hash]).addClass("active");


});
