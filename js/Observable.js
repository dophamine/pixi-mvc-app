;(function() {
    "use strict";

    function Observable() {
        this.observers = {};
    }

    Observable.prototype.addObserver = function (label, callback) {
        if (!this.observers[label]) {
            this.observers[label] = [];
        }
        this.observers[label].push(callback);
    }

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