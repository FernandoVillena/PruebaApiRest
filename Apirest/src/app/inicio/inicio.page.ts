import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApirestService } from '../apirest.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
  export class InicioPage implements OnInit {
    listado = [];
    idUser= "";

    
  constructor(private activatedRouter : ActivatedRoute,private apirestService:ApirestService,private router:Router,public alertController: AlertController) { }

  ngOnInit() {
    this.idUser=localStorage.getItem('id');
    this.apirestService.getPosts(this.idUser);
    this.listado = this.apirestService.listado2;
   
  }



async cerrarSesion(){
  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: '¿Seguro que desea cerrar sesión?',
    buttons: [
      {
        text: 'No',
        
        role: 'cancel'          
      }, {
        text: 'Si',
        
      
        handler: () => {
          this.listado = [];
          this.router.navigate(['/home'])
          localStorage.clear();
        }
      }
    ]
  });
  await alert.present();    
}



}
