;(function() {
    "use strict";

    function Observable() {
        this.observers = {};
    }

    // add function-observer events
    Observable.prototype.addObserver = function (label, callback) {
        if (!this.observers[label]) {
            this.observers[label] = [];
        }
        this.observers[label].push(callback);
    }

    // notify observers by event label
    Observable.prototype.emit = function (label, event) {
        var observers = this.observers[label];
        if (observers && observers.length) {
            observers.forEach(function (callback) {
                callback(event);
            });
        }
    }

    window.Observable = Observable;
})();