
module.exports = {
    beforeInit: function (jig) {
    	var keys,
    		len, i;
       if(jig.defaults.events){
       		keys = Object.keys(jig.defaults.events);
       		for(i = 0, len = keys.length; i < len; i++){
       			if(typeof jig[jig.defaults.events[keys[i]]] === "function"){
					(function(event){
						// todo should use bind to keep scope
		       			jig.defaults.Magga.Mediator.subscribe(event, function(){
		       				jig[jig.defaults.events[event]].apply(jig, arguments);
		       			}) 

					})(keys[i]);
       			}
       		}
       }
    }
};
