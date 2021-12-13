
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
         case "page-edit-profile": EditProfilePage(); break;
         case "page-project-add": ProjectAddPage(); break;
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
   .on("click",".js-submitlocationform",function(e){
      e.preventDefault();
      locationAddForm();
   })


   // ANCHOR CLICKS
   .on("click",".js-logout",function(e) {
      e.preventDefault();
      sessionStorage.removeItem("userId");
      checkUserId();
   })
   .on("click",".inspiration-jump",function(e) {
      if(!$(this).data("id")) throw("No ID on element");
      sessionStorage.inspirationId = $(this).data("id");
      $.mobile.navigate("#page-inspiration-profile");
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
