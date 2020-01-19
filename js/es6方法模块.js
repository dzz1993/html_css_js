let calc = {
    origin : 0,
    setOption : function(sum){
        origin = sum;
        return this;
    },
    add : function (arg) {
        origin+=arg;
        return this;
    },
    minus : function (arg) {
        origin-=arg;
        return this;
    },
    get : function () {
        return origin;
    }
}

export default calc;