Snake.CreateBoard(400, 400, 30)

Snake.SetCell(new Vec2(3, 4), "Body");

Snake.ClearGrid();

Snake.OnFrame = function() {
    
    Snake.SetCell(Snake.Head.Position.X, 0, "Head");
    
    Snake.ClearBoard();
    Snake.DrawBackground();
    Snake.DrawGrid();
    Snake.DrawDeadSpace();
    Snake.DrawGridOutline();
}

Snake.Start();
