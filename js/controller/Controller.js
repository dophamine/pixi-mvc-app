;(function() {
    "use strict";

    function Controller (game) {
        this.game = game;
        this.view = new View(this, game);
        this.init();
        console.log(game)
    }

    Controller.prototype.init = function() {
        var self = this;
        self.view.initialize();

        self.view.app.stage.on('click', function(e) {
            self.game.instantiateShape(e.data.global);
        });
    }

    Controller.prototype.registerNewShape = function (shape) {
        var self = this;

        if (shape) {
            shape.on('click', function(e) {
                self.game.removeShape(shape);
            });
        }
    }

    window.Controller = Controller;
})();