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
      { "version":"v1.0.1","commitId":"commit e2bb12305fe94cc21dd956fd68942ef61a2369be  (HEAD -> master, tag: v1.0.1, tag: v0.0.11, origin/master, origin/develop, develop, CU11) Andres Felipe Naranjo Quintero andresnaranjo@afnarqui.com"},
      { "version":"v0.0.10","commitId":"commit fbb33214bddbe82f40f317e0a90ba3ff38628385  (HEAD -> develop, tag: v0.0.10, origin/develop, C10) Andres Felipe Naranjo Quintero andresnaranjo@afnarqui.com"},
      { "version":"v0.0.9","commitId":"commit cbf1fedca4a9dca54d92fa49f22b274d98857049 (HEAD -> C10, tag: v0.0.9, origin/develop, develop, CU9) Andres Felipe Naranjo Quintero andresnaranjo@afnarqui.com"},
      { "version":"v0.0.8","commitId":"commit f6fe58aa330aac05697646a1345bb412e0e3e704  (tag: v0.0.8, CU8) Andres Felipe Naranjo Quintero andresnaranjo@afnarqui.com"},
      { "version":"v0.0.7","commitId":"commit 5dfb2dec153b074f7fa79b40307d7d485af13524  (HEAD -> CU8, tag: v0.0.7, origin/develop, develop, CU7) Andres Felipe Naranjo Quintero andresnaranjo@afnarqui.com"},
      { "version":"v0.0.6","commitId":"commit 07003c35bf50b48c0be78e6f075e1bb66c3db051  (HEAD -> CU7, tag: v0.0.6, origin/develop, develop, CU6) Andres Felipe Naranjo Quintero andresnaranjo@afnarqui.com"},
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
      {  "commit":"CU7:implementar proceso que permita tener una api rest para la entidad celdas Date: Sun Nov 4 15:33:19 2018 -0500 5dfb2dec153b074f7fa79b40307d7d485af13524","version":"v0.0.7"},  
      {  "commit":"CU8:implementar proceso que permita tener una api rest para la entidad vehículos Date: Sun Nov 4 16:10:33 2018 -0500 f6fe58aa330aac05697646a1345bb412e0e3e704","version":"v0.0.8"},  
      {  "commit":"CU9:implementar proceso que permita tener una api rest para la entidad vehículosParqueados Date: Sun Nov 4 17:01:26 2018 -0500 cbf1fedca4a9dca54d92fa49f22b274d98857049","version":"v0.0.9"},  
      {  "commit":"CU10 implementar proceso que permita consumir la api rest celdas Date: Sun Nov 4 17:35:43 2018 -0500 c8cf7306486bbf1b4b7244a1013a035237660f21","version":"v0.0.10"},  
      {  "commit":"CU10 refactorizar código Date: Sun Nov 4 17:35:43 2018 -0500 895607d370c6d275aece205ecd5be4699db944c1,737b0db244b0ae64c33f906c8d2b2fe6c5f2b777","version":"v0.0.10"},  
      {  "commit":"CU10-A implementar proceso que permita buscar los vehículos Date: Sun Nov 4 17:54:42 2018 -0500 ","version":"v0.0.10"},  
      {  "commit":"CU10-B implementar proceso que permita generar funcionalidades con el vehículos Date: Sun Nov 4 17:54:42 2018 -0500 fbb33214bddbe82f40f317e0a90ba3ff38628385","version":"v0.0.10"},  
      {  "commit":"CU11 implementar proceso que permita visualizar los informes Date: Sun Nov 4 19:31:50 2018 -0500 e2bb12305fe94cc21dd956fd68942ef61a2369be","version":"v1.0.1"},  
      
    ]
  }

  buscar(){
    return [this.datosCommit,this.datosCommitReal]
  }
}






