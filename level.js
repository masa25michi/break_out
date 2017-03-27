var bricks = [];
var brickColumn = 8;
var brickLayer = 4;
var brickWidth = 100;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 50;
var brickOffsetLeft = 50;

function getBricks(level){
    switch (level){
        case 1: level1BricksPattern();break;
        case 2: level2BricksPattern();break;
        case 3: level3BricksPattern();break;
        case 4: level4BricksPattern();break;
        case 5: level5BricksPattern();break;
        case 6: level6BricksPattern();break;
        default: defaultBricksPattern();
    }
    return bricks;
}
function getBrickColumn(){
    return brickColumn;
}
function getBrickLayer(){
    return brickLayer;
}
function getBrickWidth(){
    return brickWidth;
}
function getBrickHeight(){
    return brickHeight;
}
function getBrickPadding(){
    return brickPadding;
}
function getbrickTop(){
    return brickOffsetTop;
}
function getbrickLeft(){
    return brickOffsetLeft;
}


function defaultBricksPattern(){
    brickColumn = 8;
    brickLayer = 4;
    brickWidth = 100;
    brickHeight = 20;
    brickPadding = 10;
    brickOffsetTop = 50;
    brickOffsetLeft = 50;

    for(var r=0; r<brickLayer; r++) {
        bricks[r] = [];
        for(var c=0;c<brickColumn; c++) {
            bricks[r][c] = { 
                x: 0, 
                y: 0, 
                isHit:0 //0: not be hit 1: be hit
            };
        }
    }
}
function level1BricksPattern(){
    brickColumn = 8;
    brickLayer = 4;
    brickWidth = 100;
    brickHeight = 20;
    brickPadding = 10;
    brickOffsetTop = 50;
    brickOffsetLeft = 50;
    for(var r=0; r<brickLayer; r++) {
        bricks[r] = [];
        for(var c=0;c<brickColumn; c++) {
            bricks[r][c] = { 
                x: 0, 
                y: 0, 
                isHit:0 //0: not be hit 1: be hit
            };
        }
    }
}
function level2BricksPattern(){
    brickColumn = 10;
    brickLayer = 4;
    brickWidth = 80;
    brickHeight = 20;
    brickPadding = 10;
    brickOffsetTop = 50;
    brickOffsetLeft = 50;
    for(var r=0; r<brickLayer; r++) {
        bricks[r] = [];
        for(var c=0;c<brickColumn; c++) {
            if((r==1||r==2)&&(c==4||c==5)){
                bricks[r][c] = { 
                    x: 0, 
                    y: 0, 
                    isHit:1 //0: not be hit 1: be hit
                };
            }else{
                bricks[r][c] = { 
                    x: 0, 
                    y: 0, 
                    isHit:0 //0: not be hit 1: be hit
                };
            }
        }
    }
}
function level3BricksPattern(){
    brickColumn = 12;
    brickLayer = 5;
    brickWidth = 65;
    brickHeight = 20;
    brickPadding = 10;
    brickOffsetTop = 50;
    brickOffsetLeft = 50;
    for(var r=0; r<brickLayer; r++) {
        bricks[r] = [];
        for(var c=0;c<brickColumn; c++) {
            if((r==1||r==3)&&(c==0||c==11)){
                bricks[r][c] = { 
                    x: 0, 
                    y: 0, 
                    isHit:1 //0: not be hit 1: be hit
                };
            }else if(r==2 &&(c==0||c==11||c==1||c==10)){
                bricks[r][c] = { 
                    x: 0, 
                    y: 0, 
                    isHit:1 //0: not be hit 1: be hit
                };
            }else if((r==0||r==4)&&(c==5||c==7||c==4||c==8)){
                bricks[r][c] = { 
                    x: 0, 
                    y: 0, 
                    isHit:1 //0: not be hit 1: be hit
                };
            }
            else{
                bricks[r][c] = { 
                    x: 0, 
                    y: 0, 
                    isHit:0 //0: not be hit 1: be hit
                };
            }
            
        }
    }
}
function level4BricksPattern(){
    brickColumn = 14;
    brickLayer = 5;
    brickWidth = 55;
    brickHeight = 20;
    brickPadding = 10;
    brickOffsetTop = 50;
    brickOffsetLeft = 50;
    for(var r=0; r<brickLayer; r++) {
        bricks[r] = [];
        for(var c=0;c<brickColumn; c++) {
            if(r==1 && (c==0||c==13)){
                bricks[r][c] = { 
                    x: 0, 
                    y: 0, 
                    isHit:1 //0: not be hit 1: be hit
                };
            }else if(r==2 && (c==0||c==13||c==1||c==12)){
                bricks[r][c] = { 
                    x: 0, 
                    y: 0, 
                    isHit:1 //0: not be hit 1: be hit
                };
            }else if(r==3 && (c==0||c==13||c==1||c==12||c==2||c==11)){
                bricks[r][c] = { 
                    x: 0, 
                    y: 0, 
                    isHit:1 //0: not be hit 1: be hit
                };
            }else if(r==4 && (c==1||c==12||c==2||c==11
                ||c==3||c==10)){
                bricks[r][c] = { 
                    x: 0, 
                    y: 0, 
                    isHit:1 //0: not be hit 1: be hit
                };
            }else{
                bricks[r][c] = { 
                    x: 0, 
                    y: 0, 
                    isHit:0 //0: not be hit 1: be hit
                };
            }
        }
    }
}
function level5BricksPattern(){
    brickColumn = 15;
    brickLayer = 10;
    brickWidth = 50;
    brickHeight = 10;
    brickPadding = 10;
    brickOffsetTop = 50;
    brickOffsetLeft = 50;
    var spaceIndex=1;

    for(var r=0; r<brickLayer; r++) {
        bricks[r] = [];
        if(r>=4){
            spaceIndex++;
        }
        for(var c=0 ;c<brickColumn; c++) {
            if(r==0){
                if(c<=1 || (c>=6&&c<=8) ||(c>=13)){
                    bricks[r][c] = { 
                        x: 0, 
                        y: 0, 
                        isHit:1 //0: not be hit 1: be hit
                    };
                }else{
                    bricks[r][c] = { 
                        x: 0, 
                        y: 0, 
                        isHit:0 //0: not be hit 1: be hit
                    };
                }
            }
            else if(r==1){
                if(c==0 || (c==7) ||(c==14)){
                    bricks[r][c] = { 
                        x: 0, 
                        y: 0, 
                        isHit:1 //0: not be hit 1: be hit
                    };
                }else{
                    bricks[r][c] = { 
                        x: 0, 
                        y: 0, 
                        isHit:0 //0: not be hit 1: be hit
                    };
                }
            }
            else if(r>=3){
                if((c<=spaceIndex)||(c>=(brickColumn-spaceIndex))){
                    bricks[r][c] = { 
                        x: 0, 
                        y: 0, 
                        isHit:1 //0: not be hit 1: be hit
                    };
                    
                }else{
                    bricks[r][c] = { 
                        x: 0, 
                        y: 0, 
                        isHit:0 //0: not be hit 1: be hit
                    };
                }
            }
            else{
                bricks[r][c] = { 
                    x: 0, 
                    y: 0, 
                    isHit:0 //0: not be hit 1: be hit
                };
            }
        }
    }

    
}
function level6BricksPattern(){
    brickColumn = 13;
    brickLayer = 8;
    brickWidth = 55;
    brickHeight = 20;
    brickPadding = 10;
    brickOffsetTop = 50;
    brickOffsetLeft = 50;
    for(var r=0; r<brickLayer; r++) {
        bricks[r] = [];
        for(var c=0;c<brickColumn; c++) {
            if(r==1 &&(c==1||c==2||c==3||c==6||c==10||c==13)){
                bricks[r][c] = { 
                    x: 0, 
                    y: 0, 
                    isHit:0 //0: not be hit 1: be hit
                };
            }else if(r==2 &&(c==2|c==6|c==10||c==11||c==13)){
                bricks[r][c] = { 
                    x: 0, 
                    y: 0, 
                    isHit:0 //0: not be hit 1: be hit
                };
            }else if(r==3 &&(c==2||c==5||c==7||c==10||c==11||c==13)){
                bricks[r][c] = { 
                    x: 0, 
                    y: 0, 
                    isHit:0 //0: not be hit 1: be hit
                };
            }
            else if(r==4 &&(c==2||c==4||c==5||c==7||c==8||c==11||c==12||c==13)){
                bricks[r][c] = { 
                    x: 0, 
                    y: 0, 
                    isHit:0 //0: not be hit 1: be hit
                };
            }else if(r==5 &&(c==1||c==2||c==4||c==6||c==8||c==10||c==12||c==13)){
                bricks[r][c] = { 
                    x: 0, 
                    y: 0, 
                    isHit:0 //0: not be hit 1: be hit
                };
            }else if(r==6 || r==7 &&(c==1||c==2||c==4||c==8||c==10||c==13)){
                bricks[r][c] = { 
                    x: 0, 
                    y: 0, 
                    isHit:0 //0: not be hit 1: be hit
                };
            }else{
                bricks[r][c] = { 
                    x: 0, 
                    y: 0, 
                    isHit:1 //0: not be hit 1: be hit
                };
            }
        }
    }
}