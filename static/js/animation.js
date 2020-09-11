console.clear();
var root = document.documentElement;
var body = document.body;
var postContainers = document.querySelectorAll(".post");
var page = document.querySelector(".page");
console.log(postContainers.length)

// the adding of the eventlistners is clunky
for (var i = 0; i < postContainers.length; i++) {  
	console.log("loop setup");
	console.log("postContainers[i]: " + postContainers[i]);
	addListener(postContainers[i]);	
}

function addListener(card) {
	card.addEventListener("click", function() {
		console.log("clicked");

		// disables default redirect
		if(!e) var e = window.event;
		e.cancelBubble = true;
		e.returnValue = false;
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		if (e.preventDefault) {
			e.preventDefault();
		}
//the first child should be post_container //so the click works anywhere on post class and animation only happens for the //background
		animatePostContainer(card.children[0]);	
		animatePost(card);
		animateImage(card.children[1]);
	});
}

// pushes the post z-index up for everything
function animatePost(card) {
	TweenLite.set(card, {zIndex:4});	
}

function animateImage(card) {
	var clone = card.cloneNode(true);
	var from = calculatePosition(card);
	//TODO compute the to variable
}

function animatePostContainer(card) {	
	console.log(card);

	var clone = card.cloneNode(true);
	var from = calculatePosition(card);
	var to = calculatePosition(page);

	//what is the purpose of creating a clone?
	TweenLite.set([from, to], { visibility: "hidden" });
	TweenLite.set(clone, { position: "absolute", margin: 0, zIndex:1, backgroundColor:"#98AFC7"});
	body.appendChild(clone);

	var style = {
		x: to.left - from.left,
		y: to.top - from.top,
		width: to.width,
		height: to.height,
		autoRound: false,
		ease: Power1.easeOut,
		onComplete: goToNextPage,
		onCompleteParams:[card.getElementsByTagName('a')[0].href]
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
	//what the || does is if the left value is not truthy it will move onto the right
	//so in this case the last resort for the value is 0
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

function getMidX( obj ){
  return ( $(obj).parent().width()/2 ) - $(obj).width()/2;
}

function getMidY( obj ){
  return ( $(obj).parent().height()/2 ) - $(obj).height()/2;
}
