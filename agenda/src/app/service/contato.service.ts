import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Contato } from '../model/contato.model';


const httpOptions = {
  headers: new HttpHeaders(
    {'Content-Type' : 'application/json;charset=utf-8'}
  )
};

const API_URL = 'http://localhost:3000';
@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  constructor(private http: HttpClient) {}

  insertContato(contato: Contato) {
    return this.http.post(`${API_URL}/contato`, contato, httpOptions);
  }


  getContato(id: number) {
    return this.http.get<Contato>(`${API_URL}/contato/${id}`, httpOptions);
  }


  getContatos() {
    return this.http.get<Contato>(`${API_URL}/contato`, httpOptions);
  }


  updateContato(contato: Contato) {
    return this.http.put(`${API_URL}/contato/${contato.id}`, contato, httpOptions);
  }

  deleteContato(id: number) {
    return this.http.delete(`${API_URL}/contato/${id}`, httpOptions);
  }
}