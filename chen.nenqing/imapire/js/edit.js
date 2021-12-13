const editUsername = async () => {
	let username = $("#new-user-name").val();

	let r = await query({
	  type:'update_username',
	  params:[username, sessionStorage.userId]
	});

	history.go(-1);

	$.mobile.navigate("#page-user-profile");
}