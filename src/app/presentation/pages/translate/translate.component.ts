import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessageComponent } from '@components/chat-bubbles/chatMessage/chatMessage.component';
import { MyMessageComponent } from '@components/chat-bubbles/myMessage/myMessage.component';
import { TextMessageBoxSelectComponent, TextMessageBoxEvent } from '@components/text-boxes/textMessageBoxSelect/textMessageBoxSelect.component';
import { TypingLoaderComponent } from '@components/typingLoader/typingLoader.component';
import { Message } from '@interfaces/message.interface';
import { OpeanAiService } from 'app/presentation/services/openai.service';


@Component( {
  selector: 'app-translate-page',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChatMessageComponent,
    MyMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxSelectComponent,
  ],
  templateUrl: './translate.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
} )
export default class TranslatePageComponent {


  public messages = signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject( OpeanAiService );

  public languages = signal([
    { id: 'alemán', value: 'Alemán' },
    { id: 'árabe', value: 'Árabe' },
    { id: 'bengalí', value: 'Bengalí' },
    { id: 'francés', value: 'Francés' },
    { id: 'hindi', value: 'Hindi' },
    { id: 'inglés', value: 'Inglés' },
    { id: 'japonés', value: 'Japonés' },
    { id: 'mandarín', value: 'Mandarín' },
    { id: 'portugués', value: 'Portugués' },
    { id: 'ruso', value: 'Ruso' },
  ]);



  handleMessageWithSelect( { prompt, selectedOption }: TextMessageBoxEvent ) {

    const message = `Traduce a ${ selectedOption }: ${ prompt }`;

    this.isLoading.set(true);
    this.messages.update( prev => [ ...prev, { text: message, isGpt: false }]);

    this.openAiService.translateText( prompt, selectedOption )
      .subscribe( ({ message }) => {

        this.isLoading.set(false);
        this.messages.update( prev => [...prev, { text: message, isGpt: true }] );

      })


  }


}