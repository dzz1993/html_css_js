/*������λ��*/
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
/*��ȡ����*/
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
/*��ȡ��ǰԪ�ص����Ͻ�����*/
function getTempPos(tempDiv){
    return{
        x:tempDiv.clientX,
        y:tempDiv.clientY
    }
}