
function retrieveFilesURLS(url){
	
	var xhr = new XMLHttpRequest();
	xhr.open("GET", url, false);
	xhr.send();
	var doc;
	if(xhr.responseText !== null){
		var parser = new DOMParser();
		doc = parser.parseFromString(xhr.responseText, "text/xml");
	} else if(xhr.responseXML !== null){
		doc = xhr.responseXML;
	}
	console.log(doc);
	var links = doc.getElementsByTagName("a");
	var files = new Array();
	var j = 0;
	for(var i=0;i<links.length;i++){
	//Implement the .pdf as an array of the file extension that can be read.
		if(links[i].href.search(".pdf")===links[i].href.length-4){
			files[j]=links[i];
			j++;
		}
	}
	return files;
}



function printURLs(){
//	document.write("hello world");
	var files = retrieveFilesURLS('http://www.dcs.bbk.ac.uk/courses/msccs/');
	downloadFiles(files);
}

function downloadFiles(files){
	for(var i=0;i<files.length;i++){
		chrome.downloads.download({url: files[i]},
			function(id){}
		);
	}
}
	

document.addEventListener('DOMContentLoaded', function () {
	printURLs();
});

