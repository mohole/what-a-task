'use strict';

class WAT_Backend{
    constructor(){
        this.url = 'http://www.moholepeople.it/whatatask/wp-json/wp/v2',
        this.headers={
              'Accept': 'application/json',
              'Content-Type': 'application/json'
        }
    }
    _parseRaw(response){
        return response.json();
    }
    checkAuth(){
        return fetch(`${this.url}/settings`,{
          headers: this.headers
        }).then(this._parseRaw)
    }
    setCredentials(user,pswd){
        const encoded = btoa(user + ':' + pswd);
        const auth ={Authorization:`Basic ${encoded}`};
        this.headers = Object.assign({},this.headers,auth);
    }
    
    
}
export const Backend = new WAT_Backend;