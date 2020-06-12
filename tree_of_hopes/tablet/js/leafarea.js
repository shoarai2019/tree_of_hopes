//リーフエリアの設定////////////////////////////////////////////////////////////



var selectColor = -1;
var leafImages;
var selectLock = false;
var stage;
var canvasWidth=2732;
var canvasHeight=2048;


function initialize() {
    stage = new createjs.Stage("canvas1");
    createjs.Ticker.setFPS(60);

    $("#canvas1")[0].width=canvasWidth;
    $("#canvas1")[0].height=canvasHeight;
    $("#canvas1").width(canvasWidth/2);
    $("#canvas1").height(canvasHeight/2);

    stage.leafarea=new createjs.Container();
    stage.addChild(stage.leafarea);
    stage.leafarea.x=canvasWidth/2;
    stage.leafarea.y=canvasHeight/2;


    UPDATE();

}

function resetLeafs() {

    stage.leafarea.removeAllChildren();

//
    for (var i = 0; i < leafImages.length; i++) {
        var x,y
        var w=650;
        x = i*w-(w*(leafImages.length-1)/2);
        y =0;
        var leaf=new Leaf(i,x,y);
        stage.leafarea.addChild(leaf);
    }

}



function UPDATE() {
    stage.update();
}

$(function () {

    //リーフエリア設定

    $("#leafarea").each(function () {

        this.init=function(){
            selectColor = -1;
            resetLeafs();
        }
        this.open = function (tgt) {
            selectColor = tgt.id;

            for (var i = 0; i < stage.leafarea.children.length; i++) {
                if (stage.leafarea.children[i] == tgt) {
                    stage.leafarea.children[i].zoomIn();
                } else {
                    stage.leafarea.children[i].zoomOut(0,0);
                }
            }


        }

        this.close = function () {
            selectColor = -1;
            for (var i = 0; i < stage.leafarea.children.length; i++) {
                stage.leafarea.children[i].zoomOut(1,0);
            }

        }

        this.send=function(){

        }

        $(".canvasarea2",this).bind("touchstart",function(){
            for (var i = 0; i < stage.leafarea.children.length; i++) {
                var leaf = stage.leafarea.children[i];
                leaf.closeGuide();
            }
        })


    })
})

