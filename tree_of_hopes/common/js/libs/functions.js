

function browserInfo(userAgent) {


    this.geckoVersionChecker = function(){
        var num = this.ua.match(new RegExp("Gecko/20[0-9]{6}"));
        return ( num == null ) ? -1 : parseInt(String(num).replace("Gecko/",""));
    }


    this.webkitVersionChecker = function(){
        var num = this.ua.match(new RegExp("WebKit/[0-9]{1,4}(\.[0-9]{1,2})?"));
        return ( num == null ) ? -1 : parseFloat(String(num).replace("Firefox/",""));
    }




    this.ieVersionChecker = function(){
        var userAgent = this.ua.toLowerCase();
        var ienum = -1;
        if( userAgent.match(/(msie|MSIE)/) || userAgent.match(/(T|t)rident/) ) {
            ienum = userAgent.match(/((msie|MSIE)\s|rv:)([\d\.]+)/)[3];
        }
        return ienum;
    }



    this.firefoxVersionChecker = function(){
        var num = this.ua.match(new RegExp("Firefox/[0-9]{1,2}\.[0-9]{1,2}"));
        return ( num == null ) ? -1 : parseFloat(String(num).replace("Firefox/",""));
    }


    this.operaVersionChecker = function(){
        var num = this.ua.match(new RegExp("Opera[/ ][0-9]{1,2}\.[0-9]{1,2}"));
        return ( num == null ) ? -1 : parseFloat(String(num).substr(6));
    }



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




    this.netscapeVersionChecker = function(){
        var num = this.ua.match(new RegExp("Netscape[0-9]?/[0-9]{1,2}\.[0-9]{1,3}"));
        return ( num == null ) ? -1 : parseFloat(String(num).replace(new RegExp("Netscape[0-9]?/"),""));
    }

    this.mozillaVersionChecker = function(){
        var num = this.ua.match(new RegExp("Mozilla/[0-9]{1,2}\.[0-9]{1,2}"));
        return ( num == null ) ? -1 : parseFloat(String(num).replace("Mozilla/",""));
    }

    this.chromeVersionChecker = function(){
        var num = this.ua.match(new RegExp("Chrome/[0-9]{1,2}\.[0-9]{1,2}"));
        return ( num == null ) ? -1 : parseFloat(String(num).replace("Chrome/",""));
    }



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



var delay;
$(function(){
delay=jQuery.extend($('<div>')[0], { value: 0 });
});






var stageWidth=0;
var stageHeight=0;



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




$(function(){
    $(window).load(function(){
        $(window).scroll(function(){
            $(window).trigger("SCROLL");
            //$(window).trigger("RESIZE");
        });
        $(window).trigger("SCROLL");
    })
})




$(function(){
   $('a[href^=#]').click(function() {
      var speed = 400;
      var href= $(this).attr("href");
      var target = $(href == "#" || href == "" ? 'html' : href);
      var position = target.offset().top;
      $('body,html').animate({scrollTop:position}, speed, 'easeInOutQuart');
      return false;
   });
});


    $(function(){
        $(".opacityover").each(function(){
            $(this).bind("mouseover",function(){
                $(this).css({opacity:0.65});
            });
            $(this).bind("mouseout",function(){
                $(this).css({opacity:1});
            });
            $(this).bind("click",function(){
                $(this).css({opacity:1});
            });
        });
    })





function getUrlVars(){
    var vars = {};
    var max = 0;
    var hash = "";
    var array = "";
    var url = window.location.search;


    hash  = url.slice(1).split('&');
    if(hash=="") hash=[];
    max = hash.length;
    for (var i = 0; i < max; i++) {
        array = hash[i].split('=');
        vars[array[0]]=array[1];
    }
    return vars;
}

