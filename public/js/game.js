console.log("game")

const canvas = document.querySelector("#game_canvas");
const WIDTH = 9;
const HEIGHT = 20;
const SIZE = 40;


draver = canvas.getContext("2d")
let figure = [
    [1,1],
    [1,1],
]
let figurePosition = {
    x : 4,
    y : 0,
}

let newUpdate = 0;
function update ( time = 0 ) {
    Draw()
    DrawBoard();
    DrawFigure();

    let DeltaTime =  time - newUpdate;

    if ( DeltaTime > 2500 ) {
        DownFigure();
        newUpdate = time;
    }

    requestAnimationFrame(update);

}

let board = Array.from({ length: WIDTH }, () => Array(HEIGHT).fill(0));

Draw()
update();

document.addEventListener("keydown" , (event) => {
    switch ( event.code ) {
        case "ArrowRight":
            return (  WIDTH -1  >= (figurePosition.x + figure.length) ) ?  figurePosition.x += 1 : 0 ;
        case "ArrowLeft":
            return  figurePosition.x != 0 ? figurePosition.x -= 1 : 0 ;
        case "ArrowDown":
            return figurePosition.y += 1;
    }
})

function Draw () {
    draver.fillStyle = "black";
    draver.fillRect(0,0,WIDTH*SIZE,HEIGHT*SIZE);
}

function DrawFigure () {
    draver.fillStyle = "yellow";
    figure.forEach( ( values , x  ) => {
        values.forEach( (  value , y) => {
            draver.fillRect((x+figurePosition.x)*SIZE,(y+figurePosition.y)*SIZE,SIZE,SIZE)
        })
    })
    Collision();
}

function Collision() {
    let active = false;

    // console.clear();
    board.forEach( ( values , x ) => {
        values.forEach( ( item , y) => {
            if ( item === 1  )
            {
                figure.forEach( ( values_figure , x_figure  ) => {
                    values_figure.forEach( (  value_figure , y_figure) => {
                        if ( figurePosition.x + x_figure === x && figurePosition.y + y_figure === y ) {
                            active = true
                        }
                    })
                })
            }
        })
    })

    if ( active || ( WIDTH === figurePosition.x || HEIGHT === ( figurePosition.y + 1 ) ) ) {
        DefineCollision ( );
    }
}

function DrawBoard ( ) {
    draver.fillStyle = "blue";
    board.forEach( ( values , x ) => {
        values.forEach( ( item , y) => {
            if ( item === 1 ) {
                draver.fillRect(x*SIZE,y*SIZE,SIZE,SIZE)
            }
        })
    })
}

function DeleteLine() {
    board.forEach( ( values , x ) => {
        console.log(x)
        console.log(values)

    })
}

function DownFigure () {
    figurePosition.y += 1;
}

function DefineCollision () {
    figure.forEach( ( values , x  ) => {
        values.forEach( (  value , y) => {
            board[x+figurePosition.x ][y+figurePosition.y -1 ] = 1;
        })
    })
    DeleteLine();
    figurePosition = {
        x : 2,
        y : 0,
    }
}