import { Injectable } from '@angular/core';
import {Http,Headers,RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class InsertServiceProvider {
token:any;
  constructor(public http: Http) {
    console.log('Hello InsertServiceProvider Provider');
     this.token = localStorage.getItem('token');
   
  }
postinputs(username,email,password,mobile,games,gender,date,range,textarea,uploadimage,latitude,longitude,voicerecord,scaned,videodata):Observable<any>{   
        let url='http://127.0.0.1:8000/api/insert'  
        let headers = new Headers({ 
            //'Authorization':'Bearer '+this.token
            //'Content-Type': 'multipart/form-data' 
        });
        let options = new RequestOptions({
        headers: headers
    });
        return this.http.post(url,{username:username,email:email,password:password,mobile:mobile,games:games,gender:gender,
            date:date,range:range,textarea:textarea,uploadimage:uploadimage,latitude:latitude,longitude:longitude,voicerecord:voicerecord,scaned:scaned,videodata:videodata},options)
        .map(res => {
            let data=res.json();
            return data.message;        
         }) 
    }
getrecords():Observable<any>{
    let listurl='http://127.0.0.1:8000/api/showlist';
    let headers = new Headers({ 
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        //'Authorization':'Bearer '+this.token 
    });
    let options = new RequestOptions
    ({
        headers: headers
    });
    return this.http.get(listurl,options)
    .map(
        res => {
            let data= res.json()
            return data.result
        }
    )
}
getRecordsbyid(id){
    let url='http://127.0.0.1:8000/api/getrecord/'+ id ; 
     let headers = new Headers({ 
            //'Authorization':'Bearer '+this.token
            //'Content-Type': 'multipart/form-data' 
        });
        let options = new RequestOptions({
        headers: headers
    });
        return this.http.post(url,{id:id},options)
        .map(res => {
            let data=res.json();
            console.log(data)
           return data.result
            //return data.message;        
         }) 
}
updateRecords(id,username,email,mobile):Observable<any>{   
        let url='http://127.0.0.1:8000/api/updaterecord/'+ id ; 
        let headers = new Headers({ 
            //'Authorization':'Bearer '+this.token
            //'Content-Type': 'multipart/form-data' 
        });
        let options = new RequestOptions({
        headers: headers
    });
        return this.http.post(url,{id:id,username:username,mobile:mobile,email:email},options)
        .map(res => {
            let data=res.json();
            return data.message;        
         }) 
    }
deleteRecords(id):Observable<any>{
     let url='http://127.0.0.1:8000/api/deleterecord/'+ id ; 
        let headers = new Headers({ 
            //'Authorization':'Bearer '+this.token
            //'Content-Type': 'multipart/form-data' 
        });
        let options = new RequestOptions({
        headers: headers
    });
        return this.http.post(url,{id:id},options)
        .map(res => {
            let data=res.json();
            return data.message; 
                   
         }) 
}
}
