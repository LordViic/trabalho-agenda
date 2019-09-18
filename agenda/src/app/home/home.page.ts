import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Contato } from '../model/contato.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ContatoService } from '../service/contato.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  contatoForm: FormGroup;
  contato: Contato;
  contatoID: number;
  editable: boolean = false;
  
  constructor(private formBuilder: FormBuilder, 
              private route: ActivatedRoute, 
              private router: Router,
              private contatoService: ContatoService) {}

  ngOnInit() {
    this.contatoForm = this.formBuilder.group({

     nome: [
       '',
       [
         Validators.required, 
         Validators.minLength(4),
         Validators.maxLength(100), 
       ]
     ], 
     numero: [
       '',
       [
         Validators.required, 
         Validators.minLength(4), 
         Validators.maxLength(100), 
       ]
     ]
    });

    this.route.paramMap.subscribe(params => {
      this.contatoID =+ params.get('id');
      if(this.contatoID) {
        this.getContato(this.contatoID);
        this.editable = true;
      }
    })
  }

  addContato() {
    const novoContato = this.contatoForm.getRawValue() as Contato;

    this.contatoService
      .insertContato(novoContato)
      .subscribe(
        () => { 
         this.router.navigateByUrl('/list'); 
         this.contatoForm.reset();
        },
        error => {
          console.log(error);
          this.contatoForm.reset();
        }
      );
  }

  getContato(id: number) {
    this.contatoService.getContato(id).subscribe(
      (contatoDB: Contato) => this.loadForm(contatoDB),
      errorDB => console.log(errorDB)
    );
  }

  loadForm(contato: Contato) {
    this.contatoForm.patchValue({
      nome: contato.nome,
      numero: contato.numero,
    });
  }
  editContato() {
    const contatoEditado = this.contatoForm.getRawValue() as Contato;
    contatoEditado.id = this.contatoID;

    this.contatoService.updateContato(contatoEditado).subscribe(
      () => {
        this.router.navigateByUrl('/list');
        this.contatoForm.reset();
      },
      error => {
        console.log(error);
        this.contatoForm.reset();
      }
    );
  }
}