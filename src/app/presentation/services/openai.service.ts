import { Injectable } from '@angular/core';
import { ProsConsResponse } from '@interfaces/pros-cons-response';
import { imageVariationUseCase } from '@use-cases/image-generation/image-variation.use-case';
import { orthographyUseCase } from '@use-cases/orthography/orthography.use-case';
import { prosConsUseCase } from '@use-cases/pros-cons/pros-cons.use-case';
import { translateTextUseCase } from '@use-cases/translate/translate-text.use-case';
import { audioToTextUseCase, imageGeneration, prsoConsStreamUseCase, textToAudioUseCase } from 'app/core';
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
    translateText(prompt: string, lang: string) {
        return from(translateTextUseCase(prompt, lang));
      }

      textToAudio(prompt: string, voice: string) {
        return from(textToAudioUseCase(prompt, voice));
      } 
      audioToText( file: File, prompt?: string) {
        return from(audioToTextUseCase(file, prompt));
      }

      imageGeneration(prompt:string, originalImage?:string,
        maskImage?:string) {
        return from (imageGeneration(prompt, originalImage, maskImage));
      }
      createImageVariation(originalImage:string) {
        return from (imageVariationUseCase(originalImage));
      }
}