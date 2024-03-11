import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ChatMessageComponent } from '@components/chat-bubbles/chatMessage/chatMessage.component';
import { MyMessageComponent } from '@components/chat-bubbles/myMessage/myMessage.component';
import { TextMessageBoxComponent } from '@components/text-boxes/textMessageBox/textMessageBox.component';
import { TextMessageBoxFileComponent } from '@components/text-boxes/textMessageBoxFile/textMessageBoxFile.component';
import { TextMessageBoxSelectComponent, TextMessageBoxEvent } from '@components/text-boxes/textMessageBoxSelect/textMessageBoxSelect.component';
import { TypingLoaderComponent } from '@components/typingLoader/typingLoader.component';
import { Message } from '@interfaces/message.interface';
import { OpeanAiService } from 'app/presentation/services/openai.service';

@Component({
  selector: 'app-text-to-audio',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MyMessageComponent,
    ChatMessageComponent,
    TypingLoaderComponent,
    TextMessageBoxComponent,
    TextMessageBoxFileComponent,
    TextMessageBoxSelectComponent
  ],
  templateUrl: './textToAudio.component.html',
  styles: `
    :host {
      display: block;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class TextToAudioComponent {
  public messages =  signal<Message[]>([]);
  public isLoading = signal(false);
  public openAiService = inject(OpeanAiService);

  public voices = signal([
    { id: "nova", value: "Nova" },
    { id: "alloy", value: "Alloy" },
    { id: "echo", value: "Echo" },
    { id: "fable", value: "Fable" },
    { id: "onyx", value: "Onyx" },
    { id: "shimmer", value: "Shimmer" },
  ]);

  handleMessageWithSelect({prompt, selectedOption}:TextMessageBoxEvent) {
    const message = `${prompt}`;
    this.messages.update(prev => [...prev, {text: message, isGpt: false}])
    this.isLoading.set(true);
    this.openAiService.textToAudio(prompt, selectedOption).subscribe(({message, audioUrl}) => {
      this.isLoading.set(false);
      this.messages.update(prev => [...prev, {text: message, isGpt: true, audioUrl}])
    })
  }
 }
