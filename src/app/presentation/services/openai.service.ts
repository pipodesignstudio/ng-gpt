import { Injectable } from '@angular/core';
import { ProsConsResponse } from '@interfaces/pros-cons-response';
import { orthographyUseCase } from '@use-cases/orthography/orthography.use-case';
import { prosConsUseCase } from '@use-cases/pros-cons/pros-cons.use-case';
import { prsoConsStreamUseCase } from 'app/core';
import { Observable, from } from 'rxjs';

@Injectable({providedIn: 'root'})
export class OpeanAiService {
    
    checkOrthography(prompt:string) {
        return from(orthographyUseCase(prompt));
    }

    prosConsDiscusser( prompt: string ) {
        return from( prosConsUseCase(prompt) );
      }
    
    prosConsDiscusserStream(prompt:string, abortSignal:AbortSignal) { 
        return prsoConsStreamUseCase(prompt, abortSignal)
    }
    
}