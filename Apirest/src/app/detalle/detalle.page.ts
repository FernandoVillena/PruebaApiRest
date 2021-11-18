import { Component, OnInit } from '@angular/core';
import { ApirestService } from '../apirest.service'
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.page.html',
  styleUrls: ['./detalle.page.scss'],
})
export class DetallePage implements OnInit {

  listado = [];
  id= "";

 

  constructor(private activatedRouter : ActivatedRoute,private apirestService:ApirestService,private storage: Storage) { }

 async ngOnInit() {
    

    this.activatedRouter.paramMap.subscribe(async p => {
      this.id = p.get('id');
      this.apirestService.getComments(this.id);
      this.listado = this.apirestService.listado2;
    })
  }

}
