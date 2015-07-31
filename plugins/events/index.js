/**
 * The event plugin will bind your events to a pub/sub object like the MaggaMediator.
 * Your events should be descibe in your defaults
 *
 * defaults {
 *
 *      "eventname": "handler"
 *
 * }
 *
 * @param Mediator
 * @return {{beforeInit: Function}}
 */
module.exports = function (Mediator) {
    return {
        beforeInit: function (jig) {
            var keys,
                len, i;
            if (jig.defaults.events && Mediator) {
                keys = Object.keys(jig.defaults.events);
                for (i = 0, len = keys.length; i < len; i++) {
                    if (typeof jig[jig.defaults.events[keys[i]]] === "function") {
                        (function (event) {
                            // todo should use bind to keep scope
                            Mediator.subscribe(event, function () {
                                jig[jig.defaults.events[event]].apply(jig, arguments);
                            });
                        })(keys[i]);
                    }
                }
            }
        }
    };
};
