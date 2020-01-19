let calc = function () {
   let origin = 0;
   let setOption = function(sum){
       origin = sum;
       return this;
   }
   let add = function (arg) {
        origin+=arg;
        return this;
   };
   let minus = function (arg) {
       origin-=arg;
       return this;
   };
   let get = function () {
       return origin;
   }
   return{
       setOption:setOption,
       add:add,
       minus:minus,
       get:get
   }
}()