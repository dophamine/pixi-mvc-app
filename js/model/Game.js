;(function() {
    "use strict";
    window.Game = Game;

    function Game() {
        Observable.call(this);
        this.cfg = {
            RADIUS: 60,
            itemsPerSec: 0,
            shapeSpawnDelay: 1000,
            gravityForce: 9.81
        };
    }

    Game.prototype = Object.create(Observable.prototype);
    Game.prototype.constructor = Game;

    Game.prototype.init = function () {
        this.startShapeSpawning();
    };
    
    Game.prototype.registerWorld = function (world) {
        this.world = world;
        this.init();
    };

    Game.prototype.startShapeSpawning = function () {
        var self = this;
        self.spawnManyShapes();
        self._shapesSpawnTimerId = setInterval(function() {
            self.spawnManyShapes();
        }, self.cfg.shapeSpawnDelay);
    };

    Game.prototype.stopShapeSpawning = function () {
        var self = this;
        clearInterval(self._shapesSpawnTimerId);
        self._shapesSpawnTimerId = null;
    }

    Game.prototype.spawnManyShapes = function () {
        for (var i=0; i < this.cfg.itemsPerSec; i++) {
            this.instantiateShape();
        }
    }

    Game.prototype.calcShapesNumber = function () {
        this.emit('shapesNumberChange', {shapesNumber: this.world.stage.children.length});
        console.log(this.world.stage.children.length);
    };
    
    Game.prototype.calcShapesArea = function () {
        var area = this.world.stage.children.reduce(function(prev, current) {
            return prev + current.area;
        },  0);
        console.log(area);
        this.emit('shapesAreaChange', {area: area});
    };
    
    Game.prototype.instantiateShape = function (position) {
        var self = this;
        var shapeType = getRandomIntInRange(1, 6);
    
        if (!position) {
            position = {
                x: getRandomInRange(self.cfg.RADIUS, self.world.renderer.width - self.cfg.RADIUS),
                y: -(this.cfg.RADIUS + getRandomInRange(0, 200))
            };
        }

        var shape;
        switch(shapeType) {
            case 1:
            case 2:
            case 3:
            case 4:
                shape = createPolygon(position);
                break;
            case 5:
                shape = createCircle(position);
                break;
            case 6:
                shape = createEllipse(position);
                break;
            default:
                shape = createPolygon(position);
                break;
        }

        shape.velocityY = 0;

        self.emit('instantiateShape', shape);
        self.calcShapesArea();
        self.calcShapesNumber();

        function createCircle(pos) {
            var graphics = new PIXI.Graphics();
            // surface area of shape
            graphics.area = Math.PI * self.cfg.RADIUS * self.cfg.RADIUS;
            return graphics
                .beginFill(getRandomColor())
                .drawCircle(pos.x, pos.y, self.cfg.RADIUS)
                .endFill();
        }

        function createEllipse(pos) {
            var graphics = new PIXI.Graphics();
            // surface area of shape
            graphics.area = Math.PI * self.cfg.RADIUS * self.cfg.RADIUS/2;
            return graphics
                .beginFill(getRandomColor())
                .drawEllipse(pos.x, pos.y, self.cfg.RADIUS, self.cfg.RADIUS/2)
                .endFill();
        }

        function createPolygon(pos) {
            var VERTS = getRandomIntInRange(3, 6);

            // generate paths
            var paths = [];
            for (var i=0; i < VERTS; i++) {
                var xi = pos.x + self.cfg.RADIUS * Math.cos(360/2 * VERTS + (2 * Math.PI * i / VERTS ));
                var yi = pos.y + self.cfg.RADIUS * Math.sin(360/2 * VERTS + (2 * Math.PI * i / VERTS ));
                paths.push(xi, yi);
            }

            var graphics = new PIXI.Graphics();
            // length of edge
            var a = Math.sqrt((paths[0] - paths[2])*(paths[0] - paths[2]) + (paths[1] - paths[3])*(paths[1] - paths[3]));
            // surface area of shape
            graphics.area = 1/2 * self.cfg.RADIUS * VERTS * a;
            return graphics
                .beginFill(getRandomColor())
                .drawPolygon(paths)
                .endFill();
        }
    };

    Game.prototype.removeShape = function (shape) {
        var self = this;
        self.calcShapesArea();
        self.calcShapesNumber();
        shape.destroy();
    }

})();