//Document Ready

$(()=>{

	//Event Delegation
	$(document)

	// FORM SUBMITS
	.on("submit","#signin-form",function(e) {
		e.preventDefault();
		checkSigninForm();
	
	})

	//ANCHOR CLICKS
	.on("click",".js-logout",function(e){
		e.preventDefault ();
		sessionStorage.removeItem("userId");
		checkUserId();
	})

	.on("click","[data-activate]",function(e){
		e.preventDefault();
		let target = $(this).data("activate");
		$(target).addClass("active")
	})

});