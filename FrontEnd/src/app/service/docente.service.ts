import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DocenteService {
  private URL = environment.HTTPS;
  private usr = environment.autorization;

  constructor(private http: HttpClient) {
    this.usr.headers = this.usr.headers.set('authorization', 'Bearer ' + localStorage.getItem('color'));
   }

  datosDocente(numControl: any): Observable<any> {
    return this.http.post(`${this.URL}/docente/datosDocente`, numControl, this.usr);
  }

  registroDocente(datosDocente: any): Observable<any> {
    return this.http.post(`${this.URL}/docente/registroDocente`,datosDocente);
  }
  
  datosMateria(numControl:any): Observable<any> {
    return this.http.post(`${this.URL}/docente/datosMateria`, numControl,this.usr);
  }

  datosPeriodoEscolar(numControl:any): Observable<any> {
    return this.http.post(`${this.URL}/docente/datosPeriodoEscolar`,numControl, this.usr);
  }
}
