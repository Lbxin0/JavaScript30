var eventfn={
    //添加事件函数,调用方法addEvent(btn1,'click',showmsg);
  addEvent:function(ele,event,func){
      //用能力检测进行跨浏览器兼容处理
      //DOM 2 事件处理
      if(ele.addEventListener)
      {
          //false表示冒泡事件模型
          ele.addEventListener(event,func,false);
      }
      else if(ele.attachEvent)
      {
          //若是click事件,IE为onclick
          ele.attachEvent('on'+event,func);
      }
      else
      {
          //DOM 0级事件，兼容老浏览器
          //not ele.'on'+event=func;
          //js中.可以用[]进行代替
          ele['on'+event]=func;
      }
  },
  //获取style样式的css属性,考虑兼容;ie,火狐/谷歌;
  getStyle:function(parm1,parm2) {
    return parm1.currentStyle ? parm1.currentStyle[parm2] : getComputedStyle(parm1)[parm2];  //parm1,要改变的元素代替名;parm2,要改变的属性名
  }

}
   //公共变量区域开始
var container=document.querySelector("#container")  
var ruleitem=document.querySelector(".ruleitem")  //详细游戏规则区
var slidebar=document.querySelector(".slidebar")  //进度条
var start=document.querySelector(".start")   //开始游戏
var restart=document.querySelector(".restart")  //重新开始
var gamerule=document.querySelector(".gamerule")   //游戏规则
var closerule=document.querySelector(".closerule")  //关闭游戏规则按钮
var wolfimg   //创建的狼图片
var wolfType   //创建的狼类型

//公共变量区域结束


//开始游戏函式开始
eventfn.addEvent(start,'click',startgamesfn)
function startgamesfn(){
    startWolfAnimation()    //狼动画开始
    let slidebarwidth=parseInt(eventfn.getStyle(slidebar,'width'))
    start.style.display='none';
    
    

    let progressTime=setInterval(function(){
        // var slidebarwidth=slidebar.style.width;
        // console.log(55+slidebar.style.width + ' ===');
    
        slidebarwidth-=1;
        slidebar.style.width=slidebarwidth+'px';

        if(slidebarwidth<=0){
            clearInterval(progressTime)
            console.log('结束');
            restart.style.display='block';
            removefn()
        }
    },30)
}

// 狼动画定义
function startWolfAnimation(){
    // 1.定义两个数组保存所有灰太狼和小灰灰的图片
    var wolf_1=['./images/h0.png','./images/h1.png','./images/h2.png','./images/h3.png','./images/h4.png','./images/h5.png','./images/h6.png','./images/h7.png','./images/h8.png','./images/h9.png'];
    var wolf_2=['./images/x0.png','./images/x1.png','./images/x2.png','./images/x3.png','./images/x4.png','./images/x5.png','./images/x6.png','./images/x7.png','./images/x8.png','./images/x9.png'];
    // 2.定义一个数组保存所有可能出现的位置
    var arrPos = [
        {left:"100px",top:"115px"},
        {left:"20px",top:"160px"},
        {left:"190px",top:"142px"},
        {left:"105px",top:"193px"},
        {left:"19px",top:"221px"},
        {left:"202px",top:"212px"},
        {left:"120px",top:"275px"},
        {left:"30px",top:"295px"},
        {left:"209px",top:"297px"}
    ];
    // 创建一张图片
    wolfimg=document.createElement('img');
    // 随机获取数组类型，以获取狼头像类型
    wolfType = Math.round(Math.random()) == 0 ? wolf_1 : wolf_2;
    // 随机获取图片的位置
    var posIndex = Math.round(Math.random() * 8);
   
    
    // 控制图片位置与posIndex一一对应
    wolfimg.style.top=arrPos[posIndex].top;
    wolfimg.style.left=arrPos[posIndex].left;
    wolfimg.classList.add('wolfimg');
    container.appendChild(wolfimg)
     //狼图片数组起始下标
     var wolfIndex = 0;
    var wolfTimer=setInterval(function(){
        wolfIndex++;
        wolfimg.src=wolfType[wolfIndex];
         if (wolfIndex>=5) {
            clearInterval(wolfTimer)
            wolfimg.src=""
         };
        
    },260)

    // 游戏规则函式
    eventfn.addEvent(wolfimg,'click',wolfimgfn)
}


// 游戏规则函式定义
function wolfimgfn(e){
let imgclicktag=e.srcElement.currentSrc.indexOf("x");
let score=document.querySelector(".score").innerHTML;
console.log(imgclicktag);

//狼图片数组起始下标
let wolfIndex = 4;
var wolfTimer=setInterval(function(){
    wolfIndex++;
    wolfimg.src=wolfType[wolfIndex];
     if (wolfIndex>=7) {
        clearInterval(wolfTimer)
        // wolfimg.src="";
        removefn()
        startWolfAnimation()
        // wolfIndex=4;
        // wolfimg.src=wolfType[wolfIndex]
        
     };
    
},220)
imgclicktag<=0?document.querySelector(".score").innerHTML=parseInt(score)+10:document.querySelector(".score").innerHTML=parseInt(score)-10
// if(imgclicktag<=0){
//     document.querySelector(".score").innerHTML=parseInt(score)+10;
    
// }else{
//     document.querySelector(".score").innerHTML=parseInt(score)-10
    
// }
console.log(wolfimg.style.top);


}
//开始游戏函式结束


// 移除动画事件函式
function removefn(){
    let wolfimg=document.querySelector(".wolfimg");
    wolfimg.parentNode.removeChild(wolfimg)
}

//重新开始游戏函式开始
eventfn.addEvent(restart,'click',restartgamesfn)
function restartgamesfn(){
    startWolfAnimation()    //狼动画开始
    document.querySelector(".score").innerHTML=0;
// 进度条定时减少函式
let slidebarwidth=parseInt(eventfn.getStyle(slidebar,'width'));
slidebarwidth=180;
restart.style.display='none';
let progressTime=setInterval(function(){
    slidebarwidth-=1;
    slidebar.style.width=slidebarwidth+'px';
    if(slidebarwidth<=0){
        clearInterval(progressTime)
        console.log('结束');
        restart.style.display='block';
        score=0;
        removefn()
    }
},30)

}
//重新开始游戏函式结束

//游戏规则打开函式开始
eventfn.addEvent(gamerule,'click',gamerulefn)
function gamerulefn(){
    let ruleitemop= 0
    let opinter=setInterval(function(){
    ruleitemop+=0.1;
    ruleitem.style.opacity=ruleitemop;
    ruleitem.style.display='block';
    if(ruleitemop>1){
        clearInterval(opinter)
    }
    },20)
}
//游戏规则打开函式结束

// 游戏规则关闭函式开始
eventfn.addEvent(closerule,'click',closerulefn)
function closerulefn(){
    let ruleitemop= 1
    let clopinter=setInterval(function(){
        ruleitemop-=0.1;
    ruleitem.style.opacity=ruleitemop;
    
    if(ruleitemop<=0){
        clearInterval(clopinter)
        ruleitem.style.display='none';
    }
    },20)
}
// 游戏规则关闭函式结束

