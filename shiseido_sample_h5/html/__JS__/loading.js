var imgSrcArr = [
  { id: "loading", src: imgSrc + "/loading.jpg" },
  { id: "main-box", src: imgSrc + "/video.png" },
];
for(var i = 0; i < 122;i++){
  imgSrcArr.push({id:"canvas_item1_"+i,src:imgSrc+"/canvas/item-1/item_"+i+".jpg"})
}

var queue = new createjs.LoadQueue(true);
queue.installPlugin(createjs.Sound);
queue.on("progress", handleLoadStart);
queue.on("complete", handleComplete);
queue.setMaxConnections(5);
queue.loadManifest(imgSrcArr)
function handleLoadStart(){
  $(".loading p").html(Math.floor(queue.progress * 100) + "%");
   // video_1.volume = 0;
}
function handleComplete() {
  box1Show()
}
