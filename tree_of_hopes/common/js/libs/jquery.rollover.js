/*  BaseJQ JavaScript framework, version 3
 *--------------------------------------------------------------------------*/ 

overImageClass= "overimage"; //ロールオーパー対象class
overImageClassFoot= "_over"; //ロールオーパーイメージ付加文字列
toggleImageFoot = "_over"; //トグル機能で現在のページを示す画像イメージ付加文字列
toggleTarget="gNavi"; //トグル対象のoverImageClassFootとtoggleImageFootが異なる場合のターゲットクラス

/*ロールオーバー・トグル*/
$(function(){
		  
	var conf = {
		className : "." + overImageClass,
		overNode : overImageClassFoot,
		toggleNode : toggleImageFoot
	};
	//トグルエンジン実行

	if(typeof(PAGEID) != "undefined" ){	
		for(var i = 0; i < PAGEID.length; i++){
		var TGTID = PAGEID[i];
		var NODEID = "#" + TGTID;
		$(NODEID).each(function(){
		this.oriSrc = this.src;
		if(conf.toggleNode !=conf.overNode && $(this).attr("class").indexOf(toggleTarget)>=0){
			this.cngSrc = this.oriSrc.replace(/(\.gif|\.jpg|\.png)/, conf.toggleNode+"$1");
		}else{
			this.cngSrc = this.oriSrc.replace(/(\.gif|\.jpg|\.png)/, conf.overNode+"$1");
		}
	
		this.src = this.cngSrc;
		$(NODEID).removeClass(overImageClass);
		});
		};		
	};

	//ロールオーバーエンジン実行
	$(conf.className).each(function(){
		this.originalSrc = this.src;
		this.rolloverSrc = this.originalSrc.replace(/(\.gif|\.jpg|\.png)/, conf.overNode+"$1");
		
		preloadImage(this.rolloverSrc);

		$(this).bind("mouseover",function(){
			this.src = this.rolloverSrc;
		});
		$(this).bind("mouseout",function(){
			this.src = this.originalSrc;
		});	
		$(this).bind("click",function(){
			this.src = this.originalSrc;
		});
		

		$(this).bind("touchstart",function(){
			this.src = this.rolloverSrc;
		});
		$(this).bind("touchend",function(){
			this.src = this.originalSrc;
		});	
		
	});
	
});


/*イメージプリロードエンジン*/

preloadedImages = [];
function preloadImage(url){
	var p = preloadedImages;
	var l = p.length;
	p[l] = new Image();
	p[l].src = url;
};



