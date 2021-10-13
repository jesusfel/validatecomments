import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'polaridad'
})
export class PolaridadPipe implements PipeTransform {

  transform(value: number): string {
    let resultado = "Neutral";
    if(value < 0){
      resultado = "Negativo";
    }else if(value>0){
      resultado = "Positivo";
    }
    return resultado;
  }

}
