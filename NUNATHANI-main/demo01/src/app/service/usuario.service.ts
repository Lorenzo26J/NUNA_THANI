import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../model/usuario';

const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private url=`${base_url}/usuarios`
  private listaCambio=new Subject<Usuario[]>();
  private confirmaEliminacion = new Subject<Boolean>()

  constructor(private http:HttpClient) { }
  
  list(){
    return this.http.get<Usuario[]>(this.url);
  }
  insert(usuario:Usuario){
    return this.http.post(this.url, usuario);
  }

  setList(listaNueva:Usuario[]){
    this.listaCambio.next(listaNueva);
  }
  getList(){
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.http.get<Usuario>(`${this.url}/${id}`);
  }
  update(U: Usuario) {
    return this.http.put(this.url + '/' + U.id, U);
  }
  eliminar(id: number) {

    return this.http.delete(`${this.url}/${id}`);
  }
  getConfirmaEliminacion() {
    return this.confirmaEliminacion.asObservable();
  }
  setConfirmaEliminacion(estado: Boolean) {
    this.confirmaEliminacion.next(estado);
  }
}
