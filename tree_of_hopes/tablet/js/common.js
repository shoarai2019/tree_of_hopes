
var isScrollLock=false;


$(function () {

    document.addEventListener('touchmove', function(e) {
        if( isScrollLock ) e.preventDefault();
    }, {passive: false});



    let lastTouchEndTime = 0;
    document.addEventListener('touchend', (event) => {
        const now = new Date().getTime();
        if((now - lastTouchEndTime) < 350) {
            event.preventDefault();
        }
        lastTouchEndTime = now;
    });



    $(window).load(function () {

        initialize();
        changeScene(0);
        createjs.Ticker.addEventListener("tick", UPDATE);
    })
})







//同意する///////////////////////////////////////////////////////////////////////////
var isChecked=false;
function checked(){
    if(!isChecked){
        isChecked=true;
        $("#titlearea .agree a").addClass("checked");
    }else{
        isChecked=false;
        $("#titlearea .agree a").removeClass("checked");
    }
}


//スタート///////////////////////////////////////////////////////////////////////////
function startContent(){
    if(isChecked){
        nextScene();
    }else{
//        alert("「同意する」にチェックをいれて、STARTを押してください")
    }
}



//シーンの切り替え///////////////////////////////////////////////////////////////////////////

var scenes = [];
var nowScene = -1;


//リスタート処理

function restart() {

    $("#titlearea").stop(true).animate({opacity: 0}, 400, "linear");
    $("#ending").stop(true).animate({opacity: 0}, 400, "linear");
    $("#contentarea").stop(true).animate({opacity: 0}, 400, "linear", function () {
        location.reload()
    });
}


function changeScene(num) {
    if (nowScene >= 0) scenes[nowScene].close();
    if (num >= scenes.length - 1) num = scenes.length - 1;
    if (num != nowScene) {
        if (num <= 0) num = 0;
        nowScene = num;
        scenes[nowScene].open();
    }
}


function nextScene() {

    var num = nowScene + 1;
    changeScene(num);
}


function prevScene() {

    var num = nowScene - 1;
    changeScene(num);
}


$(function () {
    $("body").css("overflow", "hidden");
    $("#wrapper").css("overflow", "hidden");

    $("body").bind("touchmove", function () {
        event.preventDefault();
    })

    $("#titlearea").hide();
    $("#contentarea").hide();
    $("#inputInitial").hide();
    $("#selectLeaf").hide();
    $("#drawMessage").hide();
    $("#checkMessage").hide();
    $("#sendMessage").hide();
    $("#ending").hide();

    $("#leafarea").hide();
    $("#leafarea").css({opacity: 0});

    $("#drawarea").hide();


    //titlearea///////////////////////////////////////////////////////////////////////////

    var scene = new Object();
    scene.open = function () {

        $("#titlearea").show();
        $("#titlearea").stop(true).animate({opacity: 0}, 0);
        $("#titlearea").delay(400).animate({opacity: 1}, 400, "linear");
        $("#contentarea").stop(true).animate({opacity: 0}, 400, "linear", function () {
            $(this).hide();
        });
    }
    scene.close = function () {

        $("#titlearea").stop(true).animate({opacity: 0}, 400, "linear", function () {
            $(this).hide();
        });
        $("#contentarea").show();
        $("#contentarea").stop(true).animate({opacity: 0}, 0);
        $("#contentarea").delay(400).animate({opacity: 1}, 400, "linear");
    }
    scenes.push(scene);



    //howto///////////////////////////////////////////////////////////////////////////

    var scene = new Object();
    scene.open = function () {
        selectLock = false;
        $("#howto").show();
        $("#howto").stop(true).animate({opacity: 0}, 0);
        $("#howto").delay(400).animate({opacity: 1}, 400, "linear");

        $("#howto .hand").each(function () {
            this.move = function () {
                $(this).stop(true).animate({top: 360, opacity: 0}, 0);
                $(this).animate({opacity: 1}, 500, "linear", function () {
                    $(this).delay(300).animate({top: 360-100}, 1000, "easeInOutQuart", function () {
                        $(this).delay(300).animate({opacity: 0}, 500, "linear", function () {
                            this.move();
                        });
                    })
                })

            }
            this.move();
        })

    }

    scene.close = function () {

        $("#leafarea")[0].init();

        $("#howto").stop(true).animate({opacity: 0}, 400, "linear", function () {
            $(this).hide();
        });
    }

    scenes.push(scene);





    //scene3///////////////////////////////////////////////////////////////////////////
    var scene = new Object();
    scene.open = function () {
        selectLock = false;
        $("#selectLeaf").show();
        $("#selectLeaf").stop(true).animate({opacity: 0}, 0);
        $("#selectLeaf").delay(400).animate({opacity: 1}, 400, "linear");

        $("#leafarea").show();
        $("#leafarea").delay(400).animate({opacity: 1}, 400, "linear");
        $("#leafarea")[0].close();

        $(".canvasarea2").hide();
        resetDraw();


    }

    scene.close = function () {
        $("#selectLeaf").stop(true).animate({opacity: 0}, 400, "linear", function () {
            $(this).hide();
        });
        $("#leafarea").stop(true).animate({opacity: 0}, 400, "linear", function () {
            $(this).hide();
        });
    }


    scenes.push(scene);


    //scene4///////////////////////////////////////////////////////////////////////////

    var scene = new Object();
    scene.open = function () {

        isScrollLock=true;

        selectLock = true;
        $("#drawMessage").show();
        $("#drawMessage").stop(true).animate({opacity: 0}, 0);
        $("#drawMessage").delay(400).animate({opacity: 1}, 400, "linear");

        $("#leafarea").show();
        $("#leafarea").stop(true).animate({opacity: 1}, 400, "linear");
        $("#leafarea .leaf").each(function (i) {
            $(this).stop(true);
        });

        $(".canvasarea2").show();
        canvas2.isDrawingMode = true;

    };
    scene.close = function () {
        isScrollLock=false;
        $("#drawMessage").stop(true).animate({opacity: 0}, 400, "linear", function () {
            $(this).hide();
        });
        canvas2.isDrawingMode = false;
    };

    scenes.push(scene);


    //scene5///////////////////////////////////////////////////////////////////////////

    var scene = new Object();
    scene.open = function () {
        selectLock = true;
        $("#checkMessage").show();
        $("#checkMessage").stop(true).animate({opacity: 0}, 0);
        $("#checkMessage").delay(400).animate({opacity: 1}, 400, "linear");
    };
    scene.close = function () {
        $("#checkMessage").stop(true).animate({opacity: 0}, 400, "linear", function () {
            $(this).hide();
        });
    };

    scenes.push(scene);


    //scene6///////////////////////////////////////////////////////////////////////////

    var scene = new Object();
    scene.open = function () {
        isScrollLock=true;
        selectLock = true;
        $("#sendMessage").show();
        $("#sendMessage").stop(true).animate({opacity: 0}, 0);
        $("#sendMessage").delay(400).animate({opacity: 1}, 400, "linear");

//        $("#contentarea #leafarea").animate({top: 20}, 1000, "easeInOutQuart");

        $("#sendMessage .hand").each(function () {
            this.move = function () {
                $(this).stop(true).animate({top: 330, opacity: 0}, 0);
                $(this).animate({opacity: 1}, 500, "linear", function () {
                    $(this).delay(300).animate({top: 330 - 260}, 1000, "easeInOutQuart", function () {
                        $(this).delay(300).animate({opacity: 0}, 500, "linear", function () {
                            this.move();
                        });
                    })
                })

            }
            this.move();
        })


    };
    scene.close = function () {
        isScrollLock=false;
        $("#sendMessage").stop(true).animate({opacity: 0}, 400, "linear", function () {
            $(this).hide();
        });
        $("#sendMessage .hand").stop(true);
    };
    scenes.push(scene);


    //scene7///////////////////////////////////////////////////////////////////////////

    var scene = new Object();
    scene.open = function () {

        $("#wrapper").animate({opacity: 1}, 8000, "linear", function () {
            $("#ending").animate({opacity: 0}, 500, "linear");
            restart();
        })

        $("#ending").show();
        $("#ending").stop(true).animate({opacity: 0}, 0);
        $("#ending").delay(400).animate({opacity: 1}, 400, "linear");


    };
    scene.close = function () {
    };


    scenes.push(scene);
})




//canvas2（ドロー部分）

fabric.Object.prototype.selectable = false;

var canvas2;
$(function () {
    canvas2 = new fabric.Canvas('canvas2');
    canvas2.selection = false;
    canvas2.isDrawingMode = true;
    canvas2.freeDrawingBrush.width = 6;
    canvas2.freeDrawingBrush.color = "#FFFFFF";

})

function resetDraw() {
    canvas2.clear().renderAll();
}




//スワイプ

var isSubmit = false;
$(function () {
    $("#sendMessage").swipe({
        swipeUp: function (event, direction, distance, duration, fingerCount) {
            if (!isSubmit) {
                isSubmit = true;
                submitMessage();
            }
        },
    });
});


//サーバーに送信

function submitMessage() {
    $("#sendMessage").stop(true).animate({opacity: 0}, 500, "linear");
    /*$("#contentarea .logo").stop(true).animate({opacity:0},500,"linear",function(){
$(this).remove();
});
*/
    $("#contentarea #leafarea").stop(true).delay(500).animate({
        top: -600,
        opacity: 0
    }, 1000, "easeInQuart", function () {
        $("#wrapper").animate({opacity: 1}, 1000, "linear", function () {


            var url=(location.hostname === 'localhost')?
                "/tree_of_hopes/api/messages" :
            "http://160.16.78.32/tree_of_hopes/api/messages" ;


            var mySVG = canvas2.toSVG();
           // var cvs =  $('#canvas2')[0].toDataURL("image/png");
          //  var blob = Base64toBlob(cvs);
//            var u = (window.URL || window.webkitURL);
//            var dataUrl = u.createObjectURL(blob);

         //   console.log(blob)

            var data = JSON.stringify(
                {color: selectColor, canvas:mySVG}
            );

            $.ajax({
                url: url,
                type: 'POST',
                dataType: 'json',
                contentType: 'application/json',
                data: data
            })
                .done(function (json) {
                submitComplete();
            })
                .fail(function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR.statusText);
                alert("エントリー数が上限に達したため送信できませんでした");
            });





//            html2canvas( document.querySelector("#wrapper") ).then(function(canvas) {
//                var base64= canvas.toDataURL("image/png") ;
//
//
//                var blob = Base64toBlob(base64);
//                var url = (window.URL || window.webkitURL);
//                var dataUrl = url.createObjectURL(blob);
//
//
//                var data = JSON.stringify(
//                    {color: selectColor, canvas:dataUrl}
//                );
//
//                var url = 'http://localhost/tree_of_hopes/api/messages';
//
//                $.ajax({
//                    url: url,
//                    type: 'POST',
//                    dataType: 'json',
//                    contentType: 'application/json',
//                    data: data
//                })
//                    .done(function (json) {
//                    submitComplete();
//                })
//                    .fail(function (jqXHR, textStatus, errorThrown) {
//                    console.log(jqXHR.statusText);
//                    alert("エントリー数が上限に達したため送信できませんでした");
//                });
//
//
//
//            });




//
//            var data = JSON.stringify(
//                {color: selectColor, canvas:cvs}
//            );
//
//
//
//
//
//            $.ajax({
//                url: url,
//                type: 'POST',
//                dataType: 'json',
//                contentType: 'application/json',
//                data: data
//            })
//                .done(function (json) {
//                submitComplete();
//            })
//                .fail(function (jqXHR, textStatus, errorThrown) {
//                console.log(jqXHR.statusText);
//                alert("エントリー数が上限に達したため送信できませんでした");
//            });


//            axios.post(url, data)
//                .then(res => {
//                console.log(res);
//            })
//                .catch(err => {
//                console.log(err);
//            })



//            $.ajax({
//                url: messagesURL,
//                type: 'POST',
//                dataType: 'json',
//                contentType: 'application/json',
//                data: json
//            })
//                .done(function (json) {
//                submitComplete();
//            })
//                .fail(function (jqXHR, textStatus, errorThrown) {
//                console.log(jqXHR.statusText);
//                alert("エントリー数が上限に達したため送信できませんでした");
//
//
//                submitComplete();
//
//
//            });

        });
    });
}


function submitComplete() {
    nextScene();
}


//
////websocket//////////////////////////////////////////////////////
//
//
//var host=location.host;
//var wsPath='ws://'+host+'/tree_of_hopes/ws';
//var ws=new WebSocket(wsPath);
//ws.onopen = (e) => {
//
////    setInterval(function(){
////        console.log("send")
////        ws.send( JSON.stringify({test:"hoge"}) );
////    },1000)
//
//};
//
//
//const url = 'http://localhost/tree_of_hopes/api/messages';
//axios.get(url)
//    .then(res => {
//    const messages = res.data.messages;
//
//    messages.forEach(message => {
//        const body = JSON.parse(message.body);
//    })
//})
//    .catch(err => {
//    console.log(err);
//})
//



function Base64toBlob(base64){
    var tmp = base64.split(',');
    var data = atob(tmp[1]);
    var mime = tmp[0].split(':')[1].split(';')[0];
    var buf = new Uint8Array(data.length);
    for (var i = 0; i < data.length; i++) {
        buf[i] = data.charCodeAt(i);
    }
    var blob = new Blob([buf], { type: mime });
//    return blob;
    return tmp[1];
}
