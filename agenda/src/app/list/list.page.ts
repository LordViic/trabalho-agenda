import { Component, OnInit } from '@angular/core';
import { Contato } from '../model/contato.model';
import { ContatoService } from '../service/contato.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
  export class ListPage {
  
    private contato: Contato;
    
    constructor(private contatoService: ContatoService, private router: Router) {}
  
    ionViewWillEnter(): void {
      this.listaContatos();
    }
  
    listaContatos() {
      this.contatoService.getContatos().subscribe(
        contatoDB => this.contato = contatoDB,
        errorDB => console.log(errorDB)
      );
    }
  
    editPerfil(id: number) {
      this.router.navigate(['editar', id]);
    }
  
    delPerfil(id: number) {
      this.contatoService.deleteContato(id).subscribe(
        () => {
          this.router.navigateByUrl('/list');
          this.listaContatos();
        },
        errorDelete => console.log(errorDelete)
      );
    }
  }