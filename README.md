# pw-safe

I used to use lastpass in my previous employment, an oversight back then was that changing the element type to `text` would show me the password. Never a good thing. 

This script watches the DOM using a MutationObserver, it looks for all password inputs on the page, if the type is changed from password to anything else, it will remove the elements value, and keep is in an array until the type is changed back to password.

This is not a fullproof slution, `document.getElementById('?').value` can still be used to get the value, but this script is only supposed to stop very low level attempts.
