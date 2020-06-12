


var leafImages = [
    "img/leafs/leaf0.png", "img/leafs/leaf1.png", "img/leafs/leaf2.png", "img/leafs/leaf3.png"
];



function Leaf(num,xx,yy){

    var leaf = new createjs.Container();


    leaf.image= new createjs.Bitmap(leafImages[num]);

    leaf.image.regX = 2600/2;
    leaf.image.regY = 1400/2;
    leaf.addChild(leaf.image);

    leaf.guide= new createjs.Container();
    leaf.addChild(leaf.guide);
    leaf.guide.inner= new createjs.Bitmap("img/drawMessage/guide.png");
    leaf.guide.inner.regX = 1165/2;
    leaf.guide.inner.regY = 107/2;
    leaf.guide.inner.alpha=0;
    leaf.guide.addChild(leaf.guide.inner);
    leaf.guide.alpha=0;
    leaf.guideRad=0;
    createjs.Ticker.addEventListener("tick",function(){
        leaf.guideRad+=0.03;
        leaf.guide.inner.alpha=Math.abs( Math.sin(leaf.guideRad) );
    })


    leaf.x = leaf.x0 = xx;
    leaf.y = leaf.y0 =yy;
    leaf.id = num;

    leaf.addEventListener("click", function (e) {
        if (selectColor == -1) {
            $("#leafarea")[0].open(leaf);
        }
    });
    leaf.zoomIn = function () {

        createjs.Tween.get(this,{override:true})
            .to({x: 0,y:0}, 500, createjs.Ease.quartInOut)
            .call(function () {
            nextScene();
        })

        createjs.Tween.get(this.image,{override:true})
            .to({ rotation: 0,scaleX: 1,scaleY: 1}, 500, createjs.Ease.quartInOut)

        createjs.Tween.get(this.guide,{override:true})
            .wait(500)
            .to({alpha:1},500)

    }
    leaf.init = function () {
        this.x=this.x0;
        this.y=this.y0;
        this.alpha=0;
        this.guide.alpha=0;
    }
    leaf.zoomOut = function (alpha,delay) {

        createjs.Tween.get(this,{override:true})
            .wait(delay)
            .to({x: this.x0,y:this.y0,alpha: alpha}, 500, createjs.Ease.quartInOut)
        createjs.Tween.get(this.image,{override:true})
            .wait(delay)
            .to({rotation: 40,scaleX: 0.35,scaleY: 0.35}, 500, createjs.Ease.quartInOut)
        createjs.Tween.get(this.guide,{override:true})
            .to({alpha:0},500)

    }
    leaf.openGuide = function () {
        createjs.Tween.get(this.guide,{override:true})
            .to({alpha:1},500)
    }

    leaf.closeGuide = function () {
        createjs.Tween.get(this.guide,{override:true})
            .to({alpha:0},500)
    }

    leaf.init();

    return leaf;

}
