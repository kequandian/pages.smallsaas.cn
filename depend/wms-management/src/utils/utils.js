
export const LS = {
  isLocalStorage(){ return !!window.localStorage; },
  set(key, value){
    value = typeof(value) ==="object" ? JSON.stringify(value) : value;
    localStorage.setItem(key,value);
  },
  get(key){
    const value = localStorage.getItem(key) || '';
    if( (value === "") || ( value.indexOf("{") < 0 ) && ( value.indexOf("[" ) < 0) ){
      return value;
    }else{ 
      return JSON.parse(value);
    }
  },
	del(key){
		localStorage.removeItem(key);
  },
  clear(){
    localStorage.clear();
  }
}