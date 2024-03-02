Snake.CreateBoard(400, 400, 30)

Snake.SetCell(1, 2, "Head");
Snake.SetCell(new Vec2(3, 4), "Body");

Snake.OnFrame = function() {
    console.log("Frame");
}

Snake.Start();
