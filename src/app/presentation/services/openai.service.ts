import { Injectable } from '@angular/core';
import { ProsConsResponse } from '@interfaces/pros-cons-response';
import { orthographyUseCase } from '@use-cases/orthography/orthography.use-case';
import { prsoConsStreamUseCase } from 'app/core';
import { Observable, from } from 'rxjs';

@Injectable({providedIn: 'root'})
export class OpeanAiService {
    
    checkOrthography(prompt:string) {
        return from(orthographyUseCase(prompt));
    }

    prosConsDiscusser(prompt:string):Observable<ProsConsResponse> { 
        return from (this.prosConsDiscusser(prompt));
    }
    
    prosConsDiscusserStream(prompt:string) { 
        return prsoConsStreamUseCase(prompt)
    }
    
}