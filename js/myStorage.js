//���ش洢��localStorage��û�д洢�ռ�����ƣ���cookieStorage�д洢��С����
//�ڲ�֧��localStorage������»��Զ��л�ΪcookieStorage
window.myStorage = (new (function(){

    var storage;    //����һ������������ȷ��ʹ���ĸ����ش洢����

    if(window.localStorage){
        storage = localStorage;     //��localStorage���ڣ�ʹ��H5��ʽ
    }
    else{
        storage = cookieStorage;    //��localStorage�����ڣ�ʹ�ü��ݷ�ʽ
    }

    this.setItem = function(key, value){
        storage.setItem(key, value);
    };

    this.getItem = function(name){
        return storage.getItem(name);
    };

    this.removeItem = function(key){
        storage.removeItem(key);
    };

    this.clear = function(){
        storage.clear();
    };
})());
