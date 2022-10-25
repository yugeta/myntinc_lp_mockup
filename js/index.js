window.$$lib = (function(){
  var MAIN = function(){
    this.set();
    this.check_scroll();
  };
  MAIN.prototype.set = function(){
    new LIB().event(document.body , "scroll" , (function(e){this.check_scroll(e)}).bind(this));
  };
  MAIN.prototype.check_scroll = function(e){
    var elms = document.querySelectorAll("[data-anim]");
    var size = {
      w : document.documentElement.offsetWidth,
      h : document.documentElement.offsetHeight
    };
    for(var i=0; i<elms.length; i++){
      var rect = elms[i].getBoundingClientRect();
      var y = size.h*1.0;
      if(rect.bottom > 0 && rect.top < y){
        this.anim_on(elms[i]);
      }
      else{
        this.anim_off(elms[i]);
      }
    }
  };
  MAIN.prototype.anim_on = function(elm){
    if(!elm){return;}
    elm.setAttribute("data-anim","1");
  };
  MAIN.prototype.anim_off = function(elm){
    if(!elm){return;}
    elm.setAttribute("data-anim","0");
  };




  var LIB  = function(){};
  LIB.prototype.event = function(target, mode, func , flg){
    flg = (flg) ? flg : false;
		if (target.addEventListener){target.addEventListener(mode, func, flg)}
		else{target.attachEvent('on' + mode, function(){func.call(target , window.event)})}
  };
  LIB.prototype.urlinfo = function(uri){
    uri = (uri) ? uri : location.href;
    var data={};
		//URLとクエリ分離分解;
    var urls_hash  = uri.split("#");
    var urls_query = urls_hash[0].split("?");
		//基本情報取得;
		var sp   = urls_query[0].split("/");
		var data = {
      uri      : uri
		,	url      : sp.join("/")
    , dir      : sp.slice(0 , sp.length-1).join("/") +"/"
    , file     : sp.pop()
		,	domain   : sp[2]
    , protocol : sp[0].replace(":","")
    , hash     : (urls_hash[1]) ? urls_hash[1] : ""
		,	query    : (urls_query[1])?(function(urls_query){
				var data = {};
				var sp   = urls_query.split("#")[0].split("&");
				for(var i=0;i<sp .length;i++){
					var kv = sp[i].split("=");
					if(!kv[0]){continue}
					data[kv[0]]=kv[1];
				}
				return data;
			})(urls_query[1]):[]
		};
		return data;
  };
  LIB.prototype.upperSelector = function(elm , selectors) {
    selectors = (typeof selectors === "object") ? selectors : [selectors];
    if(!elm || !selectors){return;}
    var flg = null;
    for(var i=0; i<selectors.length; i++){
      for (var cur=elm; cur; cur=cur.parentElement) {
        if (cur.matches(selectors[i])) {
          flg = true;
          break;
        }
      }
      if(flg){
        break;
      }
    }
    return cur;
  }
  LIB.prototype.construct = function(MAIN){
    switch(document.readyState){
      case "complete"    : new MAIN();break;
      case "interactive" : this.event(window , "DOMContentLoaded" , (function(){new MAIN()}).bind(this));break;
      default            : this.event(window , "load"             , (function(){new MAIN()}).bind(this));break;
		}
  };

  LIB.prototype.ymdhis2date = function(ymdhis){
    var y = ymdhis.substr(0,4);
    var m = ymdhis.substr(4,2);
    var d = ymdhis.substr(6,2);
    var h = ymdhis.substr(8,2);
    var i = ymdhis.substr(10,2);
    var s = ymdhis.substr(12,2);
    return y+"/"+m+"/"+d+" "+h+":"+i+":"+s;
  };

  new LIB().construct(MAIN);
})()