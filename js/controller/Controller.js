;(function() {
    "use strict";

    function Controller (game) {
        this.game = game;
        this.view = new View(this, game);
        this.init();
    }

    Controller.prototype.init = function() {
        var self = this;
        self.view.initialize();

        self.view.app.stage.on('click', function(e) {
            self.game.instantiateShape(e.data.global);
        });

        this.addButtonListeners();
    }

    Controller.prototype.addButtonListeners = function () {
        var self = this;

        // Gravity controls
        var butttonGravityInc = document.querySelector('.gravity-value-controls button.inc');
        var butttonGravityDec = document.querySelector('.gravity-value-controls button.dec');

        butttonGravityInc.addEventListener('click', function(e) {
            e.preventDefault();
            self.game.incGravity();
        });
        butttonGravityDec.addEventListener('click', function(e) {
            e.preventDefault();
            self.game.decGravity();
        });
        
        // Shape spawning speed controls
        var butttonShapeSpawnSpeedInc = document.querySelector('.shape-spawn-speed-controls button.inc');
        var butttonShapeSpawnSpeedDec = document.querySelector('.shape-spawn-speed-controls button.dec');

        butttonShapeSpawnSpeedInc.addEventListener('click', function(e) {
            e.preventDefault();
            self.game.incShapesSpawningSpeed();
        });
        butttonShapeSpawnSpeedDec.addEventListener('click', function(e) {
            e.preventDefault();
            self.game.decShapesSpawningSpeed();
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