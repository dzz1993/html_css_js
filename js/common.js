/*获得鼠标位置*/
function getMousePos(evt){
    var xPos,yPos;
    evt=evt || window.event;
    if(evt.pageX){
        xPos=evt.pageX;
        yPos=evt.pageY;
    } else {
        xPos=evt.clientX+document.body.scrollLeft-document.body.clientLeft;
        yPos=evt.clientY+document.body.scrollTop-document.body.clientTop;
    }
    return {
        x:xPos,
        y:yPos
    };
}
/*获取窗口*/
/*function getTempPos(tempDiv){
    var scrollX=document.body.scrollLeft || document.documentElement.scrollLeft;
    var scrollY=document.body.scrollTop || document.documentElement.scrollTop;
    var clientX=tempDiv.getBoundingClientRect().left;
    var clientY=tempDiv.getBoundingClientRect().top;
    var tempX=scrollX+clientX;
    var tempY=scrollY+clientY;
    return {
        x:tempX,
        y:tempY
    };
}*/
/*获取当前元素的左上角坐标*/
function getTempPos(tempDiv){
    return{
        x:tempDiv.clientX,
        y:tempDiv.clientY
    }
}