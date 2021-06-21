objects = [];
// We define the img and status variable
img = "";
status = "";
// We give the predifined functions of p5.js the function 'preload'
function echo(message, another, error)
{
    if(message)
    {
        console.log(message);
    } else {
        console.log(message, another);
    }
}
// We define the fucntion 'load'

function preload()
{

}

// We give the function setup of the predifined function of p5.js
function setup()
{
    canvas = createCanvas(400, 400);
    canvas.center();

    video = createCapture(VIDEO);
    video.size(400, 400);
    video.hide();

    classifier = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
    echo("Detecting objects!!!");
}
// We give the 'model Loaded' function
function modelLoaded()
{
    echo("Model Loaded!!");
    status = true;
   
}

// We give another function of p5.js 
function draw()
{
    image(video, 0, 0, 400, 400);
    
    if(status != "")
    {
        r = random(255);
        b = random(255);
        g = random(255);
        classifier.detect(video, gotcocossd);
        for(z = 0; z < objects.length; z++)
        {
           document.getElementById("status").innerHTML = "Status : Detected!!";
           // We give the code to display the number of objects
           document.getElementById("number_of_objects").innerHTML = "The Number of objects identified are " + objects.length;
           // We gibe the fill function
           fill(r, g, b);
           percent = floor(objects[z].confidence * 100);
           text(objects[z].label + " " + percent + "%", objects[z].x + 15, objects[z].y + 15);
           // We give the noFill() fucntion
           noFill();
           // We give the stroke function
           stroke(r, g, b);
           // We draw the rectangle
           rect(objects[z].x, objects[z].y, objects[z].width, objects[z].height);

        }
    }

}
// We give the function for the gotcocossd
function gotcocossd(error, results)
{
    if(error)
    {
        echo("Error!!!");
    } else {
        echo(results);
        objects = results;
    }
}