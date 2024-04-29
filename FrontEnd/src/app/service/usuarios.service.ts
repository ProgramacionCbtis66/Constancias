import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';



@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private URL = environment.HTTPS;
  private usr = environment.autorization;



  constructor(private http: HttpClient, private sanitizer:DomSanitizer ) {
    this.usr.headers = this.usr.headers.set('authorization', 'Bearer ' + localStorage.getItem('color'));
   }

   obtenerFoto(dato: any): Observable<any> {
    return this.http.post(`${this.URL}/insize/obtenerFoto`, dato, this.usr);
   }

  datosUser(numcontrol: any): Observable<any> {
    return this.http.post(`${this.URL}/insize/datosUser`, numcontrol, this.usr);
  }
 
  UsuariosNoReg(): Observable<any> {
    return this.http.get(`${this.URL}/insize/listaUserNoReg`);
  }

  NoPago(datos: any): Observable<any> {
    return this.http.post(`${this.URL}/insize/NoPago`, datos, this.usr);
  }
 
  NoPagoDesactivo(noPago: any): Observable<any> {
    return this.http.post(`${this.URL}/insize/NoPagoDesactivo`, noPago, this.usr);
  }

  obtenerDatos(nopago: any): Observable<any> {
    return this.http.post(`${this.URL}/insize/ObtenerDatosPago`, nopago, this.usr);
  }
  subirEmitido(datosRegistro: any): Observable<any> {
    return this.http.post(`${this.URL}/insize/SubirRegistro`, datosRegistro, this.usr);
  }
  verInfo(numControl: any): Observable<any> {
    return this.http.post(`${this.URL}/insize/verInfo`, numControl,this.usr);
  }
  getContra(numControl: any): Observable<any> {
    return this.http.post(`${this.URL}/insize/getContra`, numControl,this.usr);
  }
  modificarPerfil(datos: any): Observable<any> {
    
    return this.http.post(`${this.URL}/insize/modificarPerfil`, datos, this.usr);
  }
  

  pagoConstancias(item: any): Observable<any>{
    return this.http.post(`${this.URL}/pagos/create-order-cosntancias`, item, this.usr);
  }

  extraerBase64 = async (foto: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL(foto);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL(foto);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        reject('Error al leer la imagen');
      };
    } catch (e) {
      reject('Error inesperado al procesar la imagen'); // Devolver un valor de error en caso de excepción
    }
  });

  redimensionarImagen = (foto: any, anchoDeseado: number, altoDeseado: number) => new Promise((resolve, reject) => {
    try {
      const img = new Image();
  
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
        canvas.width = anchoDeseado;
        canvas.height = altoDeseado;
        ctx.drawImage(img, 0, 0, anchoDeseado, altoDeseado);
        const imagenRedimensionadaBase64 = canvas.toDataURL('image/jpeg'); // Cambiar el formato si es necesario
        resolve({ base: imagenRedimensionadaBase64 });
      };
  
      img.onerror = () => {
        console.error('Error al cargar la imagen');
        reject('Error al cargar la imagen');
      };
  
      img.src = foto; // Ya tenemos la imagen en formato base64 aquí, no es necesario crear un objeto URL
    } catch (e) {
      console.error('Error inesperado al procesar la imagen');
      reject('Error inesperado al procesar la imagen');
    }
  });

 async convertBlobToBase64(blob: Blob) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = () => {
        const base64String = reader.result as string;
        resolve(base64String);
      };
  
      reader.onerror = () => {
        reject("Error al convertir el Blob en Base64.");
      };
  
      reader.readAsDataURL(blob);
    });
  }

  obtenerGrado(grado: number, numControl: string){
    var fechaActual = new Date();
    var mes = fechaActual.getMonth() + 1;
    var year = fechaActual.getFullYear();

    var semestral = 0;
    var gd = Number(grado);
    var ingreso = Number("20" + numControl[0] + numControl[1]);

    if((gd % 2) == 0){
      semestral = 1;
    } else {
      semestral = 2;
    }
    
    for(var i = 0; i <= year - ingreso; i++){
      console.log(mes);
      if(semestral == 1){
        if(mes >= 9 && mes <= 12 || (year - i) != ingreso){
          gd++;
        }
      } else if(semestral == 2){
        if(mes >= 1 && mes <= 8 || (year - i) != ingreso){
          gd++;
        }
      }
    }

    if(semestral == 1){
      gd += year - ingreso;
    }

    if(gd > 6){
      gd = 6;
    }

    return gd;
  }

}