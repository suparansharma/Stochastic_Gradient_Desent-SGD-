let arr = [];
let m = 1; //slope
let b = 0; //bias
// y = mx + b;

let lr;

function setup(){

   let cnv = createCanvas(700, 700);
   cnv.parent('sketch-holder');

   slider = createSlider(0,1,0.05,0.01);
}

function draw(){
    background(240);
    axis();

    lr = slider.value();
    window.document.getElementById('lr').innerHTML = 'Learnni rate =' +lr;
    
    for(let i = 0; i<arr.length; i++){
    let x = map(arr[i].x,0,1,0,width);
    let y = map(arr[i].y,0,1,height,0);
    //console.log(x,y);
    fill(arr[i].r,arr[i].g,arr[i].b);
    ellipse(x,y,10,10);
    }
    if(arr.length > 1){

    SGD();
    predictedtedLine();
    calcDist();

    }
    
    
}


function SGD(){
    let lr = 0.01;
    for(let i=0;i<arr.length;i++){
        let x = arr[i].x;
        let y = arr[i].y;

        let g = m * x + b;
        let err = y - g;

        m = m + (err * x) * lr;
        b = b + err *lr;
    }
}

function calcDist(){

    let y; // y = mx+b
    for(let i=0;i<arr.length;i++){
        let intercept = m* arr[i].x + b;
        let x1 = arr[i].x;
        let y1 = arr[i].y;
        let x2 = arr[i].x;
        let y2 = intercept;

        let d = dist(x1,y1,x2,y2);

        x1 = map(x1,0,1,0,width);
        y1 = map(y1,0,1,height,0);
        x2 = map(x2,0,1,0,width);
        y2 = map(y2,0,1,height,0);

        stroke(arr[i].r,arr[i].g,arr[i].b);
        line(x1,y1,x2,y2);

    }
}

function predictedtedLine(){

    let x1 = 0
    let y1 = m * x1 + b;
    let x2 = 1;
    let y2 = m * x2 + b;

     x1 = map(x1,0,1,0,width);
     y1 = map(y1,0,1,height,0);
     x2 = map(x2,0,1,0,width);
     y2 = map(y2,0,1,height,0);


    strokeWeight(3);
    stroke(255,0,0);
    line(x1,y1,x2,y2);

    s = 'Y = ' + m.toFixed(2) + 'X + '+b.toFixed(2);
    textSize(20);
    strokeWeight(1);
    fill(255,0,0);
    text(s, 100 ,50);
 
}

function mousePressed(){

    let x = map(mouseX,0,width,0,1);
    let y = map(mouseY,0,height,1,0);
    let p = new Point(x,y);
    arr.push(p);
    //console.log(arr);
}

function axis(){

    let x1 = 0;
    let y1 = 0;
    let x2 = 1;
    let y2 = 0;


    

    for(let i=0;i<=1;i=i+0.1){

        xm = map(i,0,1,0,width);
        ym = map(0,0,1,height,0);
        fill(0);
        stroke(100);
        strokeWeight(1);
        text(i.toFixed(1),xm,ym);
        stroke(100);
        line(xm,ym,xm,ym - height);

    }



     x1 = 0;
     y1 = 0;
     x2 = 0;
     y2 = 1;


    

    for(let i=0;i<=1;i=i+0.1){

        xm = map(0,0,1,0,width);
        ym = map(i,0,1,height,0);
        fill(0);
        stroke(100);
        strokeWeight(1);
        text(i.toFixed(1),xm,ym);
        stroke(200);
        line(xm,ym,xm + width,ym);

    }
}

