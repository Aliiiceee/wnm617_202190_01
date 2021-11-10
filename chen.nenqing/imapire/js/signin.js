const checkSigninForm = async() => {
   let user = $("#signin-username").val();
   let pass = $("#signin-password").val();

   if(user==''||pass=='') {
      // Make a Warning
   }

   let found_user = await query({
      type:'check_signin',
      params:[user,pass]
   });
   console.log(found_user);

   if(found_user.result.length > 0) {
      // logged in
      sessionStorage.userId = found_user.result[0].id;
      $("#signin-form")[0].reset();
   } else {
      // not logged in
      sessionStorage.removeItem('userId');
   }
   checkUserId();
}


const checkUserId = () => {
   let p = ['#page-signin','#page-signup',''];

   if(sessionStorage.userId === undefined) {
      // not logged in
      if(!p.some(o=>window.location.hash===o))
            $.mobile.navigate("#page-signin");
   } else {
      // logged in
      if(p.some(o=>window.location.hash===o))
            $.mobile.navigate("#page-recent");
   }
}