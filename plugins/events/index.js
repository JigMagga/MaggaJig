/**
 * TODO rework that to nicer implementaion because Magga.Mediator could be placed on a other object as well like
 *
 * Magga.publish and Magga.subscribe
 * In this case this fn will not work
 *
 */
var Magga = require("magga").getInstance();
module.exports = {
    beforeInit: function (jig) {
    	var keys,
    		len, i;
       if(jig.defaults.events && Magga.Mediator){
       		keys = Object.keys(jig.defaults.events);
       		for(i = 0, len = keys.length; i < len; i++){
       			if(typeof jig[jig.defaults.events[keys[i]]] === "function"){
					(function(event){
						// todo should use bind to keep scope
		       			Magga.Mediator.subscribe(event, function(){
		       				jig[jig.defaults.events[event]].apply(jig, arguments);
		       			})

					})(keys[i]);
       			}
       		}
       }
    }
};
