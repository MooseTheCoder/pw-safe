// Get a list of all password element
var PasswordElements = document.querySelectorAll('[type="password"]');

// Create manager arrays
var PWSMSTR = [];
var VLSTR = [];

// Loop the password element
PasswordElements.forEach((element, Index) => {
	// Create an ID
	let MOID = uniqid()+Index;
	// Add it to the element
	element.setAttribute('data-vlstr', MOID);
	// Create an MO observer
	PWSMSTR[MOID] = new MutationObserver(function(mutations){
		// Loop mutations
		mutations.forEach(mutation => {
			// Get the targets Value Store ID
			let vlstrid = mutation.target.getAttribute('data-vlstr');
			// If the el type is not password, hide the password
			if(mutation.attributeName === 'type' && mutation.target.getAttribute('type') != 'password'){
				// Only do it if its not alredy done
				if(VLSTR[vlstrid] === undefined){
					VLSTR[vlstrid] = JSON.parse(JSON.stringify(mutation.target.value));
					mutation.target.value = '';
				}
			}
			// If the el type changes back to password
			if(mutation.attributeName === 'type' && mutation.target.getAttribute('type') === 'password'){
				// Show the password, and clean the array
				mutation.target.value = VLSTR[vlstrid];
				delete VLSTR[vlstrid];
			}
		})
	});
	// Tell the MO what to observe (the input element)
	PWSMSTR[MOID].observe(element, { attributes: true });
});


// PHP uniqid function (from SO)

function uniqid(a = "", b = false) {
    const c = Date.now()/1000;
    let d = c.toString(16).split(".").join("");
    while(d.length < 14) d += "0";
    let e = "";
    if(b){
        e = ".";
        e += Math.round(Math.random()*100000000);
    }
    return a + d + e;
}
