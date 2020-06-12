var stage;
var leafImages_l = [
    "img/leafs/leaf0.png","img/leafs/leaf1.png",
    "img/leafs/leaf2.png", "img/leafs/leaf3.png"
];
var leafs = [];
var leafLength = 0;
var pageCount = 0;
var pageData;
var positionData = [];
var intervalCount = 0;
var intervalCountMax = 24 * 30;
var intervalMode = true;
var entryLock = false;
var lines;
var leafarea;

//var pagearea;
var currentArray = [];

for (var i = 0; i < sortGuide.length; i++) {
    if (sortGuide[i] == 1) leafLength++;
}
//alert("leafLength::"+leafLength)


var nowPage = 0;
var totalPages = 0;

var entryStock = [];

//ダミーデータ作成
var leafData = [];


//起動
$(function () {
    $(window).load(function () {
        $(window).bind("RESIZE", reposWindow);
        reposWindow();



        var messagesURL=(location.hostname === 'localhost')?
            "/tree_of_hopes/api/messages" :
        "http://160.16.78.32/tree_of_hopes/api/messages" ;


        $.ajax({
            url: messagesURL,
            type: 'GET',
            dataType: 'json'
        })
            .done(function (res) {

            var messages=res.messages;


            if (messages.length > 0) {
                //var message = messages[0];
                //var body = message['body'].canvas;
                //var color = message['body'].color;
                //alert("lengthは"+messages.length)
                //alert("bodyは"+messages[0]['body'].canvas)
                //alert("カラーは"+messages[0]['body'].color)

                messages.reverse();

                for (var i = 0; i < messages.length; i++) {

                    var mes=JSON.parse( messages[i].body );

                    var obj = new Object();
                    obj.dataID = messages[i].created_at;
                    obj.id = i;
                    obj.color = mes.color;

                    obj.svg = mes.canvas;
                    obj.private = messages[i].private;
                    var leaf = createLeaf(obj);
                    console.log(obj)
                    leafData.push(leaf);
                }

            }

            $(window).keydown(function (e) {
                if (!entryLock) {
                    if (e.keyCode == 37) prevPage();
                    if (e.keyCode == 39) nextPage();
                    if (e.keyCode == 13) reloadScreen();
                }

                intervalCount = 0;
            });

            totalPages = Math.ceil(leafData.length / leafLength);
            nowPage = totalPages - 1;
            initialize();

//            updater.start();
            initWebSocket();

        })
            .fail(function () {
            console.log("fail")
            //initialize();
        });


    })
})




//websocket//////////////////////////////////////////////////////


var host=location.host;
var wsPath='ws://'+host+'/tree_of_hopes/ws';
var ws;

function initWebSocket(){
    ws = new WebSocket(wsPath);
    ws.onopen = (e) => {
        console.log(e);
        ws.onmessage = (e) => {

            var message = JSON.parse(e.data);

            console.log(message);

            if (message['type'] == 'update') {
                // idで指定されたメッセージを非表示にする処理をここに追加します。
                for (var i = 0; i < leafData.length; i++) {
                    if (message.created_at == leafData[i].dataID) {
                        if (message.private) {
                            leafData[i].visible = false;
                        } else {
                            leafData[i].visible = true;
                        }
                    }
                }
            } else {
                stockLeaf(message);
                intervalCount = 0;
            }


        };
    };
}



//ページのリサイズ設定
function reposWindow() {
    if (stage) stage.update();
//    reposCurrent();
}


//キャンバスステージ作成
function initialize() {


    stage = new createjs.Stage("mycanvas");
    createjs.Ticker.setFPS(24);
//
//    $("#mycanvas").width(1920);
//    $("#mycanvas").height(1080);
//    $("#mycanvas")[0].width=1920;
//    $("#mycanvas")[0].height=1080;


    leafarea = new createjs.Container();
    stage.addChild(leafarea);


    createjs.Ticker.addEventListener("tick", function () {
        for (var i = 0; i < leafarea.getNumChildren(); i++) {
            //stage.getChildAt(i).rotation+=1;
            leafarea.getChildAt(i).yureCount += 1;
            if (leafarea.getChildAt(i).yureCount >= leafarea.getChildAt(i).yureCountMax) {
                leafarea.getChildAt(i).yureCount = 0;
                leafarea.getChildAt(i).yureMotion();
            }
        }
        stage.update();
    })

    //カレント表示
//    for (var i = 0; i < totalPages; i++) {
//        var html = '<div class="current"><img src="img/current.png"/></div>';
//        $("#currentarea").append(html);
//    }
    reposWindow();



    changePage()


    setInterval(function () {
        if (intervalMode) {
            intervalCount++
            if (intervalCount >= intervalCountMax) {
                intervalCount = 0;
                if (nowPage != totalPages - 1) {
                    nowPage = totalPages - 1;
                    changePage();
                }
            }
        }
    }, 1000 / 24);


}


//リーフ群を作成
function createLieafs() {


    //シートから固定ランダム配置用のポジションデータを作成
    var sheet = sheetData[(nowPage % sheetData.length)];
    delete positionData;
    positionData = [];
    var arr1 = leafData.concat();
    pageData = arr1.splice(nowPage * leafLength, leafLength);
    pageCount = 0;
    for (var i = 0; i < pageData.length; i++) {
        var leaf = pageData[i];
        var count = 0;
        var pos = 0;
        for (var j = 0; j < sortGuide.length; j++) {
            if (sortGuide[j] == 1) {
                if (count == sheet[i]) {
                    pos = j;
                    break
                }
                count++;
            }
        }
        //if(!leaf.private){
        leaf.x0 = 120 * (pos % 16) + 120 / 2 + Math.random() * 40 - 20;
        leaf.y0 = 80 * Math.floor(pos / 16) + 160 + Math.random() * 10 - 5;
        leaf.x = leaf.x0 + 1920;
        leaf.y = leaf.y0 + (leaf.y0 - 540) * 2;
        leafs.push(leaf);
        leafarea.addChild(leaf);
        leaf.open();
        //    }
        pageCount = i;
    }
}

//リーフの作成

function createLeaf(data) {



    var leaf = new createjs.Container();
    //leaf.private=data.private;
    if (data.private) leaf.visible = false;
    leaf.dataID = data.dataID;
    var rnd1 = Math.random() * 60 - 30;
    var rnd2 = rnd1;
//    if (Math.random() < 0.5) rnd1 += 180;


    leaf.dist = 800;
    leaf.distX = 1200;
    leaf.angle = -(360) * Math.PI / 180;
    leaf.update = function () {
        this.x = this.dist * Math.cos(this.angle) + 1920 / 2 + this.distX;
        this.y = this.dist * 0.5 * Math.sin(this.angle) + 1080 / 2;
        this.rotation = (this.angle / Math.PI * 180) * 1.5;
    }


    var loader_l = new createjs.LoadQueue(false);
    var file_l = leafImages_l[data.color];
    loader_l.addEventListener("fileload", function (e) {
    });
    loader_l.loadFile(file_l);
    var bmp_l = new createjs.Bitmap(file_l);
    bmp_l.scaleX = 0.06;
    bmp_l.scaleY =0.06;
    bmp_l.regX = 2600 / 2;
    bmp_l.regY = 1400 / 2;
    bmp_l.rotation = rnd1;
    leaf.addChild(bmp_l);

    leaf.yureCount = 0;
    leaf.yureCountMax = Math.random() * 180 + 120;
    leaf.kaiten = true;

    var strSVG = encodeURIComponent(data.svg);
    strSVG = "data:image/svg+xml," + strSVG;

    var image_svg = new createjs.Bitmap(strSVG);
    image_svg.scaleX = 0.11;
    image_svg.scaleY = 0.11;
    image_svg.regX = 350 - 20;
    image_svg.regY = 210;
    image_svg.rotation = rnd2;
    leaf.addChild(image_svg);

    leaf.open = function () {
        intervalMode = false;
        this.tween = new createjs.Tween(this, {loop: false, override: true});
        this.tween.tgt = this;
        this.tween.wait(this.x0 * 0.5 + Math.random() * 600 + 1000).to({
            x: this.x0,
            y: this.y0
        }, 1000, createjs.Ease.quartOut)
            .call(function () {
            intervalMode = true;
            intervalCount = 0;
        });
    }
    leaf.close = function () {
        intervalMode = false;
        this.tween = new createjs.Tween(this, {loop: false, override: true});
        this.tween.wait((this.x0) * 0.5 + Math.random() * 300).to({
            x: this.x0 - 1920,
            y: this.y0 + (this.y0 - 540) * 2
        }, 1000, createjs.Ease.quartIn)
            .call(function () {
            leafarea.removeChild(this);
            intervalMode = true;
            intervalCount = 0;
        });
    }
    leaf.yureMotion = function () {
        this.tween = createjs.Tween.get(this, {loop: false});
        this.tween.to({rotation: Math.random() * 90 - 45}, 2000, createjs.Ease.elasticOut);
    }
    leaf.entry = function () {
        intervalMode = false;
        entryLock = true;
        this.x = 1920;
        this.y = 1200;
        this.scaleX = 8;
        this.scaleY = 8;
        this.tween = new createjs.Tween(this, {loop: false});
        this.tween.tgt = this;
        this.tween.to({distX: -400, dist: 400, angle: 0, scaleX: 5, scaleY: 5}, 3000, createjs.Ease.quartInOut)
        this.tween.to({scaleX: 8, scaleY: 8}, 1000, createjs.Ease.quartInOut)
            .call(function () {
            this.kaiten = false;
        })
            .to({x: 1920 / 2, y: 1080 / 2}, 0)
            .wait(1000)
            .to({x: this.x0, y: this.y0, rotation: 360, scaleX: 1, scaleY: 1}, 2000, createjs.Ease.quartInOut)
            .to({rotation: 0}, 0)
            .call(function () {
            $("#wrapper").stop(true).animate({opacity: 1}, 10, "linear", function () {
                intervalMode = true;
                intervalCount = 0;
                entryLock = false;
                entryLeaf();
            })

        }).addEventListener("change", function (e) {
            if (e.target.tgt.kaiten) e.target.tgt.update();
            entryLock = true;
        });
    }
    //    }
    return leaf;
}


//新規投稿

function stockLeaf(message) {

    var mes=JSON.parse(message.body);

    var data = new Object();
    data.dataID = message.created_at;
    data.id = leafData.length;
    data.color = mes.color;
    data.svg = mes.canvas;
    entryStock.push(data);
    //console.log(entryLock)
    if (!entryLock) {
        entryLeaf()
    }
}

function stockLeafDummy() {

    var data = new Object();
    data.id = leafData.length;
    data.color = Math.floor(Math.random() * 3);
    data.svg = "sample.svg";
    entryStock.push(data);
    //console.log(entryLock)
    if (!entryLock) {
        entryLeaf()
    }
}


function entryLeaf() {
    if (entryStock.length > 0) {
        var data = entryStock.shift();
        //totalPages=Math.ceil(leafData.length/leafLength);
        //nowPage=totalPages-1;
        //ぴったりだったらはけるだけ
        if (leafData.length % leafLength == 0) {
            //alert("ぴったり")
            removeLeaf();
            totalPages += 1;
            nowPage = totalPages - 1;

            var html = '<div class="current"><img src="img/current.png"/></div>';
            $("#currentarea").append(html);
            reposWindow();

            pageCount = -1;
            //createLieafs();
        } else {
            //alert("ぴったりじゃない")
            //alert(nowPage+":"+totalPages)
            if (nowPage < totalPages - 1) {
                //alert("最後のページじゃない");
                removeLeaf();
                //totalPages+=1;
                nowPage = totalPages - 1

                createLieafs();
            } else {
                //alert("最後のページ");
            }
        }


        //リーフデータに新規投稿を追加
        pageCount++;
        var leaf = createLeaf(data);
        leafData.push(leaf);
        var sheet = sheetData[(nowPage % sheetData.length)];
        var count = 0;
        var pos = 0;
        for (var j = 0; j < sortGuide.length; j++) {
            if (sortGuide[j] == 1) {
                if (count == sheet[pageCount]) {
                    pos = j;
                    break
                }
                count++;
            }
        }
//        leaf.x0 = 120 * (pos % 16) + 120 / 2 + Math.random() * 40 - 20;
//        leaf.y0 = 67.5 * Math.floor(pos / 16) + 67.5 / 2 + Math.random() * 10 - 5;
//
        leaf.x0 = 120 * (pos % 16) + 120 / 2 + Math.random() * 40 - 20;
        leaf.y0 = 80 * Math.floor(pos / 16) + 160 + Math.random() * 10 - 5;


        leafs.push(leaf);
        leafarea.addChild(leaf);
        leaf.entry();
        totalPages = Math.ceil(leafData.length / leafLength);
        $("#currentarea .current").each(function () {
            $("img", this).attr("src", "img/current.png");
        });
        $("#currentarea .current img:eq(" + nowPage + ")").attr("src", "img/current_over.png");
    }
}


//リーフを一斉に消す
function removeLeaf() {
    for (var i = 0; i < leafs.length; i++) {
        leafs[i].close();
    }
    delete leafs;
    leafs = [];
}


//前のページを表示
function nextPage() {
    nowPage++;
    if (nowPage >= totalPages) nowPage = 0;
    changePage();
}

//次のページを表示
function prevPage() {
    nowPage--;
    if (nowPage < 0) nowPage = totalPages - 1;
    changePage();
}

function changePage() {
    //pageText.text=(nowPage+1)+" / "+totalPages;

//    $("#currentarea .current").each(function () {
//        $("img", this).attr("src", "img/current.png");
//    });
//    $("#currentarea .current img:eq(" + nowPage + ")").attr("src", "img/current_over.png");

    removeLeaf();
    createLieafs();
}

//
//function reposCurrent() {
//    var length = $("#currentarea .current").length;
//    var percent = $(window).width() / 1920;
//    $("#currentarea .current").each(function (i) {
//        $(this).css({left: (i % 5) * 55 * percent, top: Math.floor(i / 5) * 50 * percent});
//        $("img", this).width(37 * percent)
//    });
//    var x = $("#contentarea").width() - 400 * percent;
//    var y = $("#contentarea").height() - 120 * percent - (Math.ceil(length / 5) * 50 / 2 * percent);
//    $("#currentarea").css({left: x, top: y});
//
//}



function reloadScreen() {
    $("#wrapper").animate({opacity: 0}, 1500, "linear", function () {
        location.replace("/screen/index.html");
    });

}







