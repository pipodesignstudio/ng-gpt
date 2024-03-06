import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ChatMessageComponent } from '@components/chat-bubbles/chatMessage/chatMessage.component';
import { MyMessageComponent } from '@components/chat-bubbles/myMessage/myMessage.component';
import { TextMessageBoxComponent } from '@components/text-boxes/textMessageBox/textMessageBox.component';
import { TextMessageBoxFileComponent } from '@components/text-boxes/textMessageBoxFile/textMessageBoxFile.component';
import { TextMessageBoxSelectComponent } from '@components/text-boxes/textMessageBoxSelect/textMessageBoxSelect.component';
import { TypingLoaderComponent } from '@components/typingLoader/typingLoader.component';
import { Message } from '@interfaces/message.interface';
import { OpeanAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-pros-cons-streams',
  standalone: true,
  imports: [
    CommonModule,
    MyMessageComponent,
    ChatMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    TextMessageBoxFileComponent,
    TextMessageBoxSelectComponent
  ],
  templateUrl: './prosConsStreams.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProsConsStreamsComponent { 

  public messages =  signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpeanAiService);

  public abortSignal = new AbortController();

  async handleMessage(prompt: string) {
    this.abortSignal.abort();
    this.abortSignal = new AbortController();
    this.messages.update(prev => [
      ...prev,
      {
        isGpt: false,
        text: prompt
      },
      {
        isGpt: true,
        text: '...'
      }
    ]

    )

    this.isLoading.set(true);

    const stream =  this.openAiService.prosConsDiscusserStream(prompt, this.abortSignal.signal);
    this.isLoading.set(false);


    for await (const text of  stream) {
      this.handleStreamResponse(text);
    }
  }

  handleStreamResponse(message:string) {
    this.messages().pop();
    const messages = this.messages();
    this.messages.set([...messages, {isGpt: true, text: message}])
  }

}
