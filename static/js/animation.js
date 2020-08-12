console.clear()
console.log("hello0");
var root = document.documentElement;
var body = document.body;
var posts = document.querySelectorAll(".post");
var page = document.querySelector(".page");
console.log(posts.length)

// the adding of the eventlistners is clunky
for (var i = 0; i < posts.length; i++) {  
	console.log("loop setup");
	console.log("post[i]: " + posts[i]);
	addListener(posts[i]);	
}

function addListener(card) {
	card.addEventListener("click", function() {
		animateCard(card);
	});
}


function animateCard(card) {	

	if(!e) var e = window.event;
	e.cancelBubble = true;
	e.returnValue = false;
	if (e.stopPropagation) {
		e.stopPropagation();
	}
	if (e.preventDefault) {
		e.preventDefault();
	}

	console.log(window.event);

	var clone = card.cloneNode(true);
	var from = calculatePosition(card);
	var to = calculatePosition(page);

	//what is the purpose of creating a clone?
	TweenLite.set([from, to], { visibility: "hidden" });
	TweenLite.set(clone, { position: "absolute", margin: 0, zIndex:1});
	body.appendChild(clone);

	var style = {
		x: to.left - from.left,
		y: to.top - from.top,
		width: to.width,
		height: to.height,	
		autoRound: false,
		ease: Power1.easeOut,
		onComplete: goToNextPage,
		onCompleteParams:[window.location.href]
	};

	TweenLite.set(clone, from);
	TweenLite.to(clone, 0.3, style);

	function onComplete() {
		TweenLite.set(toHero, { visibility: "visible" });
		body.removeChild(clone);
	}
}

function goToNextPage(href){
    window.location = href;
}

function calculatePosition(element) { 
	var rect = element.getBoundingClientRect(); 
	var scrollTop  = window.pageYOffset || root.scrollTop  || body.scrollTop  || 0;
	var scrollLeft = window.pageXOffset || root.scrollLeft || body.scrollLeft || 0;
	var clientTop  = root.clientTop  || body.clientTop  || 0;
	var clientLeft = root.clientLeft || body.clientLeft || 0;
	return {
		top: Math.round(rect.top + scrollTop - clientTop),
		left: Math.round(rect.left + scrollLeft - clientLeft),
		height: rect.height,
		width: rect.width,
	};
}
