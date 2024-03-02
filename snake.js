/*

https://stackoverflow.com/questions/3062746/special-simple-random-number-generator
https://stackoverflow.com/questions/8205828/html5-canvas-performance-and-optimization-tips-tricks-and-coding-best-practicesjsbench.github.io
https://stackoverflow.com/questions/37695890/how-to-profile-javascript-now-that-jsperf-is-down
jsbench.github.io
https://stackoverflow.com/questions/42593670/add-custom-language-to-a-github-repository

*/

class FastMath {
    
}

function typeofAccurate(Value) {
    if (Array.isArray()) {
        return "array";
    }

    if (typeof(Value) != "object") {
        return typeof(Value);
    }

    // else
    return Value.__proto__.type || "object";
}

class Random {
    static LastSeed = 1;

    static A = 1.6;
    static C = 3.9;

    static Rand(Min, Max) {
        let Number = ((this.A * this.LastSeed + this.C) % (Max - Min)) + Min;
        this.LastSeed = 1 + Number;
        return Number;
    }

    static DoubleRand(Min, Max) {
        let Number = ((Math.sin(this.Rand(1, Math.sin(this.LastSeed))) * this.LastSeed + this.Rand(1, 3)) % (Max - Min)) + Min
        
        return Number;
    }
}

class Vec2 {
    static Zero = new this(0, 0);
    
    constructor(X, Y) {
        this.X = X;
        this.Y = Y;
    }
}

class Snake {
    static Width = 0;
    static Height = 0;
    static CellSize = 0;

    static DeadSpace = Vec2.Zero;
    static Grid = [[]];
    
    static Canvas;
    static Context;
    static FramesPerSecond = 10;

    static SnakeArray = [];

    static CellTypes = {
        "Empty": 0,
        "Head": 1,
        "Body": 2,
        "Food": 3,
    }

    static OnFrameCallback = function() {}

    static set OnFrame(Function) {
        this.OnFrameCallback = function() {
            setTimeout(Function, 0);
            requestAnimationFrame(Snake.OnFrameCallback);
        }
    }

    static Start() {
        requestAnimationFrame(this.OnFrameCallback);
    }
    
    static CreateBoard(Width, Height, CellSize) {
        this.Width = Width;
        this.Height = Height;
        this.CellSize = CellSize;

        this.Canvas = document.createElement("canvas");
        document.body.appendChild(this.Canvas);

        this.Canvas.width = this.Width;
        this.Canvas.height = this.Height;

        this.DeadSpace.X = (this.Width % this.CellSize)
        this.DeadSpace.Y = (this.Height % this.CellSize)
        
        this.Canvas.style.width = this.Width;
        this.Canvas.style.height = this.Height;

        this.Context = this.Canvas.getContext("2d", { alpha: false });

        for (let Y = 0; Y < Math.floor(this.Height / this.CellSize); Y++) {
            for (let X = 0; X < Math.floor(this.Width / this.CellSize); X++) {
                this.Grid[Y] = this.Grid[Y] || [];
                this.Grid[Y][X] = 0;
            }
        }
    }

    static DrawBackground(Color = "yellow") {
        this.Context.fillStyle = Color;
        this.Context.fillRect(0, 0, this.Width, this.Height);
    }

    static DrawGrid(HeadColor = "blue", BodyColor = "green", FoodColor = "red") {
        for (let Y = this.DeadSpace.Y / 2; Y < this.Height - this.DeadSpace.Y; Y += this.CellSize) {
            for (let X = this.DeadSpace.X / 2; X < this.Width - this.DeadSpace.X; X += this.CellSize) {
                let GridValue = this.Grid[Math.floor(Y / this.CellSize)][Math.floor(X / this.CellSize)];

                if (!GridValue) { continue; }

                this.Context.fillStyle = this.CellTypes[GridValue];
                this.Context.fillRect(X, Y, this.CellSize, this.CellSize);
            }
        }
    }

    ClearGrid() {
        for (let Y = 0; Y < this.Height / this.CellSize; Y++) {
            for (let X = 0; X < this.Width / this.CellSize; X++) {
                this.Grid[Y][X] = 0;
            }
        }
    }

    static ClearBoard() {
        this.Canvas.width = this.Width;
    }

    static DrawDeadSpace(Color = "black") {
        this.Context.fillStyle = Color;

        this.Context.fillRect(0, 0, this.Width, this.DeadSpace.Y / 2);
        this.Context.fillRect(0, Math.floor(this.Height / this.CellSize) * this.CellSize + this.DeadSpace.X / 2, this.Width, this.DeadSpace.Y / 2);

        this.Context.fillRect(0, 0, this.DeadSpace.X / 2, this.Height);
        this.Context.fillRect(Math.floor(this.Width / this.CellSize) * this.CellSize + this.DeadSpace.X / 2, 0, this.DeadSpace.X / 2, this.Height);
    }

    static DrawGridOutline(Color = "grey") {
        this.Context.strokeStyle = Color;
        
        for (let Y = this.DeadSpace.Y / 2; Y < this.Height - this.DeadSpace.Y; Y += this.CellSize) {
            for (let X = this.DeadSpace.X / 2; X < this.Width - this.DeadSpace.X; X += this.CellSize) {
                this.Context.strokeRect(X, Y, this.CellSize, this.CellSize);
            }
        }
    }

    static SetCell(X, Y, Type) {
        if (typeof X == "number") {
            this.Grid[Y][X] = this.CellTypes[Type];
            return;
        }

        this.Grid[X.Y][X.X] = this.CellTypes[Y];
    }
}
