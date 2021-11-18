import { Component } from '@angular/core';
import { ApirestService } from '../apirest.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  listado = [];
  existe = false;
  id="";
  usuar="";
  constructor(private api: ApirestService,private router:Router,public toastController : ToastController) {}


async iniciarSesion(usuario:HTMLInputElement,contrasena:HTMLInputElement){
    this.listado = [];
    this.existe = false;
    this.id="";

    this.api.getUsers();
    this.listado = this.api.listado;

    const usua =usuario.value;
    const cont =contrasena.value;
    //Buscador de usuario
    if(usua.trim().length > 0 && cont.trim().length > 0 ){
      for(let usu of this.listado)
      {
        if(usua.toUpperCase() == usu.username.toUpperCase() && cont =="1234")
        {
          this.id=usu.id;
          console.log("existe")    
          localStorage.setItem('id',this.id);
          this.router.navigate(['/inicio'])
          this.usuar= usu.username;
          usuario.value = "";
          contrasena.value = "";

          const toast = await this.toastController.create({
            message: 'Inicio de sesion correctamente',
            duration: 2000,
            color : "success",
            position : "bottom"

          });
          toast.present();
          return;   
        }
    }
    if(usua.toUpperCase() != this.usuar.toUpperCase() || cont !="1234"){
      console.log("no existe")
      const toast = await this.toastController.create({
      message: 'Credenciales incorrectas',
      duration: 2000,
      color : "danger",
      position : "bottom"

    });
    toast.present(); 
    }
    
  }
  
  else{
    console.log("no existe")
    const toast = await this.toastController.create({
      message: 'Ingrese Datos',
      duration: 2000,
      color : "danger",
      position : "bottom"

    });
    toast.present(); 
  
}
  
}
}
