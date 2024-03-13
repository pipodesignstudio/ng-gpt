import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessageComponent } from '@components/chat-bubbles/chatMessage/chatMessage.component';
import { MyMessageComponent } from '@components/chat-bubbles/myMessage/myMessage.component';
import { TextMessageBoxFileComponent, TextMessageEvent } from '@components/text-boxes/textMessageBoxFile/textMessageBoxFile.component';
import { TypingLoaderComponent } from '@components/typingLoader/typingLoader.component';
import { AudioToTextResponse } from '@interfaces/audio-text.response';
import { Message } from '@interfaces/message.interface';
import { OpeanAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-audio-to-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxFileComponent,
  ],
  templateUrl: './audioToPage.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AudioToPageComponent {
  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject( OpeanAiService );


  handleMessageWithFile( { prompt, file }: TextMessageEvent ) {

    const text = prompt ?? file.name ?? 'Traduce el audio';
    this.isLoading.set(true);

    this.messages.update( prev => [...prev, { isGpt: false, text: text }] );

    this.openAiService.audioToText( file, text )
      .subscribe( resp => this.handleResponse(resp) );


  }


  handleResponse( resp: AudioToTextResponse | null) {

    this.isLoading.set(false);
    if ( !resp ) return;

    const text = `## Transcripción:
__Duración:__ ${ Math.round( resp.duration ) } segundos.

## El texto es:
${ resp.text }
    `;

    this.messages.update( prev => [...prev, { isGpt: true, text: text }] );

    for (const segment of resp.segments) {
      const segmentMessage = `
__De ${ Math.round(segment.start) } a ${ Math.round( segment.end ) } segundos.__
${ segment.text }
      `;

      this.messages.update( prev => [...prev, { isGpt: true, text: segmentMessage }] );

    }



  }

 }
