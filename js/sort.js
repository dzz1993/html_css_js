//封装一个arrayList类，练习一下算法和es6的类
class arrayList{
    constructor(list){
        this.list = list;
    }
    swap(i,j){
        let mid = this.list[i];
        this.list[i] = this.list[j];
        this.list[j] = mid;
    }
    //封装冒泡排序
    bubbleSort(){
        for(let i=0,len = this.list.length;i<len-1;i++){
            for(let j=0;j<len-i-1;j++){
                if(this.list[j]>this.list[j+1]){
                    this.swap(j,j+1);
                }
            }
        }
        return this.list;
    }
    //封装选择排序
    chooseSort(){
        for(let i=0,len = this.list.length; i<len-1; i++){
            let min = i;
            for(let j=i+1;j<len;j++){
                if(this.list[j]<this.list[min]){
                    min = j
                }
            }
            this.swap(i,min);
        }
        return this.list;
    }
    //封装插入排序
    insertSort(){
        for(let i=1,len = this.list.length;i<len;i++){
            let val = this.list[i];
            let index = i;
            while(index>0 && this.list[index-1] > val){
                this.list[index] = this.list[index-1];
                index--;
            }
            this.list[index] = val;
        }
        return this.list;
    }
    //封装希尔排序
    shellSort(){
        let len = this.list.length;
        let gap = Math.floor(len/2);
        while(gap>=1){
            for(let i=gap;i<len;i++){
                let val = this.list[i];
                let index = i;
                while(index-gap>=0 && this.list[index-gap]>val){
                    this.list[index] = this.list[index-gap];
                    index-=gap;
                }
                this.list[index] = val;
            }
            gap = Math.floor(gap/2);
        }
        return this.list;
    }
    //封装快速排序
    quickSort(list = this.list){
        if(list.length<=1) return list;
        let mid = list.shift();
        let big=[];
        let small = [];
        list.forEach(e=>{
            if(e>mid){
                big.push(e);
            }else{
                small.push(e);
            }
        })
        return this.quickSort(small).concat([mid],this.quickSort(big));
    }
}
export default arrayList;