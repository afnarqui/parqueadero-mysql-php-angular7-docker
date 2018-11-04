import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommitsService {
  datosCommit:any[] = []
  datosCommitReal:any[] = []
  constructor() { 
    this.buscarValores()
  }
  buscarValores(){

    this.datosCommit = []
    this.datosCommit = [
      { "version":"v0.0.5","commitId":"commit 07003c35bf50b48c0be78e6f075e1bb66c3db051  (HEAD -> CU7, tag: v0.0.6, origin/develop, develop, CU6) Andres Felipe Naranjo Quintero andresnaranjo@afnarqui.com"},
      { "version":"v0.0.5","commitId":"commit 4e6654d06dfcc5a470987e3e443c9b66a3eff5c7 (tag: v0.0.5, CU5) Andres Felipe Naranjo Quintero andresnaranjo@afnarqui.com"},
      { "version":"v0.0.4","commitId":"commit d12c9c7adb7e0eec6570ba00a5c8907a705eb4b7 (HEAD -> CU5, tag: v0.0.4, origin/develop, develop, CU4) Andres Felipe Naranjo Quintero andresnaranjo@afnarqui.com"},
      { "version":"v0.0.3","commitId":"commit 5036201538965b6d0b20cefbfbd7a3f3cdf0ae19  (CU3) Andres Felipe Naranjo Quintero andresnaranjo@afnarqui.com"},
      { "version":"v0.0.2","commitId":"commit 71b6e3e8a9e7a85f47e127eb949d4417010b4b53  (origin/master, master,CU2) Andres Felipe Naranjo Quintero andresnaranjo@afnarqui.com"},
      { "version":"v0.0.1","commitId":"commit 505255ec0ed132639a2663a8dd1efbc66ab3162a  (origin/master, master,CU1) Andres Felipe Naranjo Quintero andresnaranjo@afnarqui.com"},
      
     
    ]
  
    this.datosCommitReal = [
      {  "commit":"CU1: Crear proyecto en Bitbucket Date:   Sun Nov 4 12:57:15 2018 505255ec0ed132639a2663a8dd1efbc66ab3162a","version":"v0.0.1"},  
      {  "commit":"CU2:Implementar contenedor docker para ambiente de trabajo front angular 6 Date:   Sun Nov 4 13:02:00 2018 -0500 71b6e3e8a9e7a85f47e127eb949d4417010b4b53","version":"v0.0.2"},  
      {  "commit":"CU2:Implementar contenedor docker para ambiente de trabajo front angular 6 Date:   Sun Nov 4 13:02:00 2018 -0500 71b6e3e8a9e7a85f47e127eb949d4417010b4b53","version":"v0.0.2"},  
      {  "commit":"CU3:Implementar ambiente back laravel Date: Sun Nov 4 13:34:36 2018 -0500 5036201538965b6d0b20cefbfbd7a3f3cdf0ae19","version":"v0.0.3"},  
      {  "commit":"CU4:implementar bootstrap en el front Date: Sun Nov 4 13:50:14 2018 -0500 d12c9c7adb7e0eec6570ba00a5c8907a705eb4b7","version":"v0.0.4"},  
      {  "commit":"CU5:implementar proceso que permita visualizar las versiones Date: Sun Nov 4 14:53:52 2018 -0500 4e6654d06dfcc5a470987e3e443c9b66a3eff5c7","version":"v0.0.5"},  
      {  "commit":"CU6:implementar proceso que permita crear la base de datos alegra en mysql Date: Sun Nov 4 15:00:37 2018 -0500 07003c35bf50b48c0be78e6f075e1bb66c3db051","version":"v0.0.6"},  
      
    ]
  }

  buscar(){
    return [this.datosCommit,this.datosCommitReal]
  }
}




