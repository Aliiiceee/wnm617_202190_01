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

	.on("click","[data-deactivate]",function(e){
		e.preventDefault();
		let target = $(this).data("deactivate");
		$(target).addClass("active")
	})

	.on("click","[data-toggle]",function(e){
		e.preventDefault();
		let target = $(this).data("toggle");
		$(target).addClass("active")
	})


});