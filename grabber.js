last_storage = null
$(document).ready(function(){
	setTimeout(function(){
		//grab the page text and remove unneccesary whitespace. 
		page_text = clean_page_text()

		key = key_text()
		log = {}
		log[key] =  page_text

		browser.storage.local.set(log) 
		last_storage = key

		if(loc.includes("twitter") || loc.includes("tumblr") || loc.includes("facebook")){
			//if we're on a page where things dynamically update, then check every five minutes for changes. 
			setTimeout(grabber_loop, 5*60*1000)
		}

	}, 1000)
})

clean_page_text = function(){
	page_text = $("body").text()
	blank_regex = / {3,}|\n|\t|(\\n)|(\\t)/g
	clean_text = page_text.replaceAll(blank_regex, " ").replaceAll(blank_regex, " ")
	return clean_text
}

key_text = function(){
	currentDate = new Date();
	epoch = currentDate.valueOf()
	loc = document.location
	key = `${loc}:::${epoch}`
	return key
}

grabber_loop = function(){
	console.log("Repeating grab loop")
	last_snap = browser.storage.local.get(last_storage)
	new_snap = clean_page_text()
	if(last_snap != new_snap){
		//get time+place for labeling
		key = key_text()
		log = {}
		log[key] =  clean_text
		browser.storage.local.set(log) 
		last_storage = key
	}

	setTimeout(grabber_loop, 5*60*1000)
}


///HOKAY SO
// how should this work-
//on every page load, I guess? we should wait until the document is finished loading and grab the content.
//that content should go into...where? we can use localstorage maybe but idk how to access that
//	maybe send to an s3 bucket? is that absurd? Certainly only gonna bother with this if I can squash down the size of the content a little. 
//ALSO how to deal with scrolling and dynamic content?
