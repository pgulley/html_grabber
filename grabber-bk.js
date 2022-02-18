browser.alarms.create("cleanup", {periodInMinutes:60});


download_storage = function(){
	console.log("Downloading")
	getting_storage = browser.storage.local.get()
	getting_storage.then(function(items){

		if(Object.keys(items).length > 0){
			console.log(`Found ${Object.keys(items).length} records`)
			//Wrangle the data into a single byte object and get a url for it
			const str = JSON.stringify(items);
			const bytes = new TextEncoder().encode(str);

			bl = new Blob([bytes],
				{type: "application/json;charset=utf-8"})
			
			objectURL = URL.createObjectURL(bl)

			//get the current time for the filename
			currentDate = new Date();
			epoch = currentDate.valueOf()

			//download the log
			downloading = browser.downloads.download({
			  url : objectURL,
			  filename : `grabber-${epoch}.json`,
			  conflictAction : 'uniquify'
			});

			//refresh the existing data
			keys = Object.keys(items)
			removing = browser.storage.local.remove(keys)
		}
		else{
			console.log("Found no items to Download")
		}

	}, function(error){
		console.log("An Error getting storage items")
	})
}

download_storage()

browser.alarms.onAlarm.addListener(function(alarm){
	download_storage()
})
