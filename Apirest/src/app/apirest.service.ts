import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
@Injectable({
  providedIn: 'root'
})
export class ApirestService {
  listado = [];
  datos : any;
  listado2:any;
  exit =false;
  error=false;
  post:any[]=[];
  private apiURL = 'https://jsonplaceholder.typicode.com/';
  constructor(private http : HttpClient,private storage: Storage) {    
    this.init();
  }
  async init()
  {
    // crear el storage de ionic para este proyecto
    await this.storage.create();
  }
  getUser(id:String)
  {
    let url = this.apiURL + 'users/' + id;
    return new Promise((resolve, reject) =>
    {
      this.http.get(url).subscribe((data: any) =>
      {
        this.datos = data;
        console.log(this.datos);
      },
      error => { console.log("error en la solicitud")
      })
    })
}
getUsers()
{
  let url = this.apiURL + 'users';
  

  return new Promise((resolve, reject) =>
  {
    this.http.get(url).subscribe((data: []) =>
    {
      data.forEach(item => { this.listado.push(item); });
      //console.table(this.listado);
    },
    error => { console.log("error en la solicitud")
    })
  })
}


getPost(id:String)
{
  let url = this.apiURL + 'posts/'+ id ;
  return new Promise((resolve, reject) =>
  {
    this.http.get(url).subscribe((data: any) =>
    {
      resolve(data)
      this.datos = data;
      console.log(this.datos);
    },
    error => { console.log("error en la solicitud")
    })
  })
}

getPosts(id:String)
{
  let url = this.apiURL + 'posts?userId='+id;
  this.listado2 =[];
  return new Promise((resolve, reject) =>
  {
    this.http.get(url).subscribe((data: []) =>
    {
      
      data.forEach(item => { this.listado2.push(item); });
      
    },
    error => { console.log("error en la solicitud")
    })
  })
}

async getComments(id:String)
{
  let url = this.apiURL + 'post/'+id +'/comments';
  this.listado2 =[];
  return await new Promise((resolve, reject) =>
  {
    this.http.get(url).subscribe((data: []) =>
    {
      data.forEach(item => { this.listado2.push(item); });

      for (let i = 0; i < this.listado2.length; i++)
      {
        const elemento = i;
        this.storage.set("post"+elemento, this.listado2[elemento]);
      }
    },
    error => { console.log("error en la solicitud")
    for (let i = 0; i < 5; i++)
    {
      const elemento = i;
      this.storage.get("post"+String(elemento)).then(item => {this.listado2.push(item)});
    
    }
      
    
    })
  })
}



}
