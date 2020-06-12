//サイト固有情報


/////////////////////////////////////////////////////
//
//  BrowserInfo クラス ver 0.2
//
/////////////////////////////////////////////////////

function browserInfo(userAgent) {

    /*****************************************
     * Geckoエンジンバージョンチェッカー
     * (返値 int 合致しない場合は-1)
     *****************************************/
    this.geckoVersionChecker = function(){
        var num = this.ua.match(new RegExp("Gecko/20[0-9]{6}"));
        return ( num == null ) ? -1 : parseInt(String(num).replace("Gecko/",""));
    }

    /*****************************************
     * WebKitバージョンチェッカー
     * (返値 float 合致しない場合は-1)
     *****************************************/
    this.webkitVersionChecker = function(){
        var num = this.ua.match(new RegExp("WebKit/[0-9]{1,4}(\.[0-9]{1,2})?"));
        return ( num == null ) ? -1 : parseFloat(String(num).replace("Firefox/",""));
    }

    /*****************************************
     * IEバージョンチェッカー
     * (返値 float 合致しない場合は-1)
     *****************************************/
    /*
    this.ieVersionChecker = function(){
        var ienum = this.ua.match(new RegExp("MSIE [0-9]{1,2}\.[0-9]{1,3}"));
        return ( ienum == null ) ? -1 : parseFloat(String(ienum).replace("MSIE ",""));
    }
    */


    this.ieVersionChecker = function(){
        var userAgent = this.ua.toLowerCase();
        var ienum = -1;
        if( userAgent.match(/(msie|MSIE)/) || userAgent.match(/(T|t)rident/) ) {
            ienum = userAgent.match(/((msie|MSIE)\s|rv:)([\d\.]+)/)[3];
        }
        return ienum;
    }



    /*****************************************
     * Firefoxバージョンチェッカー
     * (返値 float 合致しない場合は-1)
     *****************************************/
    this.firefoxVersionChecker = function(){
        var num = this.ua.match(new RegExp("Firefox/[0-9]{1,2}\.[0-9]{1,2}"));
        return ( num == null ) ? -1 : parseFloat(String(num).replace("Firefox/",""));
    }

    /*****************************************
     * Operaバージョンチェッカー
     * (返値 float 合致しない場合は-1)
     *****************************************/
    this.operaVersionChecker = function(){
        var num = this.ua.match(new RegExp("Opera[/ ][0-9]{1,2}\.[0-9]{1,2}"));
        return ( num == null ) ? -1 : parseFloat(String(num).substr(6));
    }

    /*****************************************
     * Safariバージョンチェッカー
     * (返値 float 合致しない場合は-1)
     *****************************************/
    /*
    this.safariVersionChecker = function(){
        var num = this.ua.match(new RegExp("Safari/[0-9]{1,4}\.[0-9]{1,2}"));
        return ( num == null ) ? -1 : parseFloat(String(num).replace("Safari/",""));
    }*/

    this.safariVersionChecker = function(){
        var ans=-1;
        var num = this.ua.match(new RegExp("Safari/[0-9]{1,4}\.[0-9]{1,2}"));
        if( num == null ){
            ans=-1;
        }else{
            var num = this.ua.match(new RegExp("Version/[0-9]{1,4}\.[0-9]{1,2}"));
            if( num == null ){
                ans=-1;
            }else{
                ans=parseFloat(String(num).replace("Version/",""));
            }
        }
        return ans;
    }




    /*****************************************
     * Netscapeバージョンチェッカー
     * (返値 float 合致しない場合は-1)
     *****************************************/
    this.netscapeVersionChecker = function(){
        var num = this.ua.match(new RegExp("Netscape[0-9]?/[0-9]{1,2}\.[0-9]{1,3}"));
        return ( num == null ) ? -1 : parseFloat(String(num).replace(new RegExp("Netscape[0-9]?/"),""));
    }

    /*****************************************
     * Mozillaバージョンチェッカー
     * (返値 float 合致しない場合は-1)
     *****************************************/
    this.mozillaVersionChecker = function(){
        var num = this.ua.match(new RegExp("Mozilla/[0-9]{1,2}\.[0-9]{1,2}"));
        return ( num == null ) ? -1 : parseFloat(String(num).replace("Mozilla/",""));
    }

    /*****************************************
     * Chromeバージョンチェッカー
     * (返値 float 合致しない場合は-1)
     *****************************************/
    this.chromeVersionChecker = function(){
        var num = this.ua.match(new RegExp("Chrome/[0-9]{1,2}\.[0-9]{1,2}"));
        return ( num == null ) ? -1 : parseFloat(String(num).replace("Chrome/",""));
    }



    // -- コンストラクタ --

    this.ua = (userAgent) ? userAgent : navigator.userAgent;

    this.geckoVersion = this.geckoVersionChecker();
    this.gecko = (this.geckoVersion > 0 );

    this.webkitVersion = this.webkitVersionChecker();
    this.webkit = (this.webkitVersion > 0 );

    this.ieVersion = this.ieVersionChecker();
    this.ieMVersion = Math.floor(this.ieVersion);
    this.ie = ( this.ieVersion >= 3 );
    this.macie = ( this.ua.match("Mac_PowerPC") != null );


    this.firefoxVersion = this.firefoxVersionChecker();
    this.firefoxMVersion = Math.floor(this.firefoxVersion);
    this.firefox = (this.firefoxVersion > 0 );

    this.safariVersion = this.safariVersionChecker();
    this.safariMVersion = Math.floor(this.safariVersion);

    this.safari = (this.safariVersion > 0 );

    this.operaVersion = this.operaVersionChecker();
    this.operaMVersion = Math.floor(this.operaVersion);
    this.opera = (this.operaVersion > 1 );

    this.netscapeVersion = this.netscapeVersionChecker();
    this.netscapeMVersion = Math.floor(this.netscapeVersion);
    this.netscape = (this.netscapeVersion > 1 );

    this.mozillaVersion = this.mozillaVersionChecker();
    this.mozilla = ( !this.firefox && !this.opera && !this.ie && !this.netscape && this.mozillaVersion > 0 );

    this.chromeVersion = this.chromeVersionChecker();
    this.chrome = (this.chromeVersion> 0 );

    this.mac= (this.ua.indexOf("Mac") >=0);
    this.iphone= (this.ua.indexOf("iPhone") >=0);
    this.ipod= (this.ua.indexOf("iPod") >=0);
    this.ipad= (this.ua.indexOf("iPad") >=0);
    this.android= (this.ua.indexOf("Android") >=0);
    this.mobile= (this.ua.indexOf("Mobile") >=0);


    this.toString = function(){
        return ("[ua:"+this.ua+"  netscapeVersion:"+this.netscapeVersion+"  operaVersion:" + this.operaVersion + "  webkitVersion:"+ this.webkitVersion +"  safariVersion:"+this.safariVersion+"  ieVersion:"+ this.ieVersion +"  macie:" + this.macie  + "  geckoVersion:" +this.geckoVersion + " firefoxVersion:" +this.firefoxVersion +"]" );
    }
}

var BrowserInfo=new browserInfo();





var ArrayControl=new Object();
ArrayControl.shuffle=function(array){
    var oldArray=array;
    var newArray=new Array();
    var leng=oldArray.length;
    for (var i = 0; i<leng; i++) {
        var rnd = Math.floor(Math.random()*oldArray.length);
        var item = oldArray[rnd];
        oldArray.splice(rnd, 1);
        newArray.push(item);
    }
    for (i = 0; i<newArray.length; i++) {
        array[i]=newArray[i];
    }
    return newArray;
}


ArrayControl.sortArray=function(array,prop,sortType){
    var oldArray=array;
    var newArray=new Array();
    var leng=oldArray.length;
    for (var i = 0; i<leng; i++) {
        newArray[i]=oldArray[i];
    }
    if (sortType>0) {
        newArray.sort(function (a,b){return a[prop]-b[prop]});
    } else {
        newArray.sort(function (a,b){return b[prop]-a[prop]});
    }
    return newArray;
}


ArrayControl.checkAllUniques=function(array){
    var bol=true;
    for(var i=0;i<array.length;i++){
        for(var j=i+1;j<array.length;j++){
            if(array[i]==array[j]){
                bol=false;
            }
        }
    }
    return bol;
}
ArrayControl.remove=function(array,element){
    for (var i = 0; i < array.length; i++){
        if (array[i] == element){
            array.splice(i,1);
        }
    }
    return array;
}







/*■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

StringControl
ストリング関連のさまざまな便利関数をまとめました。

□displace
テキスト内の文字列Aを、指定した文字列Bに置き換えます。置き換えた文字列を返します。
var newString=StringControl.displace("テキスト","文字列A","文字列B");

■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/


StringControl=new Object();
StringControl.displace=function(theCode,code1,code2){
    var chgTxtTo="";
    var chkTxtString="";
    for (var i=0; i < theCode.length; i++) {
        if (theCode.charAt(i) == code1.charAt(0)) {
            if (theCode.indexOf(code1,i) - i == 0) {
                chkTxtString=code2;
                i+= code1.length - 1;
            } else {
                chkTxtString=theCode.charAt(i);
            }
        } else {
            chkTxtString=theCode.charAt(i);

        }
        chgTxtTo+= chkTxtString;
    }
    return chgTxtTo;
}


/*■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

jQuery　ディレイ用変数

■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/
var delay;
$(function(){
    delay=jQuery.extend($('<div>')[0], { value: 0 });
});





/*■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■

//ウインドウリサイズ関連

■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■*/

var stageWidth=0;
var stageHeight=0;

//リサイズ
$(function(){
    $(window).load(function(){
        $(window).bind("resize",function(){
            stageWidth=$(window).width();
            stageHeight=$(window).height();
            $(window).trigger("RESIZE");
        });
        stageWidth=$(window).width();
        stageHeight=$(window).height();
        $(window).trigger("RESIZE");
    })
})


//スクロール
$(function(){
    $(window).load(function(){
        $(window).scroll(function(){
            $(window).trigger("SCROLL");
            //$(window).trigger("RESIZE");
        });
        $(window).trigger("SCROLL");
    })
})




