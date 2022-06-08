import {ChangeDetectionStrategy, Component, Input, OnInit,EventEmitter, Output} from '@angular/core';
import { merge, Observable, of, Subject } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { defaultLanguage, languages } from '../../../models/languages';
import { SpeechError } from '../../../models/speech-error';
import { SpeechEvent } from '../../../models/speech-event';
import { SpeechRecognizerService } from '../../../business-controller/speech-recognizer.service';
import { ActionContext } from '../../../business-controller/action-context';
import { SpeechNotification } from '../../../models/speech-notification';

@Component({
  selector: 'ngx-web-speach',
  templateUrl: './web-speach.component.html',
  styleUrls: ['./web-speach.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,

})
export class WebSpeachComponent implements OnInit {
  
  @Input() routes = null;
  @Input() messageError = null;
  @Input() entity=null;
  @Input() subtitle = null;
  @Input() routeBack = null;
  @Input() actionSave = null;
  @Input() showActionsHeaders = true;
  @Input() textButtonSave = 'Guardar';
  @Output() messageEvent = new EventEmitter<any>();
  @Output() messageEvent2 = new EventEmitter<any>();
  public loading = false;
  languages: string[] = languages;
  currentLanguage: string = defaultLanguage;
  public totalTranscript;

  transcript$?: Observable<string>;
  listening$?: Observable<boolean>;
  errorMessage$?: Observable<string>;
  defaultError$ = new Subject<string | undefined>();

  constructor(    private speechRecognizer: SpeechRecognizerService,
    private actionContext: ActionContext) {

  }

  ngOnInit(): void {
    this.currentLanguage = 'es-ES';
    const webSpeechReady = this.speechRecognizer.initialize(this.currentLanguage);
    if (webSpeechReady) {
      this.initRecognition();
    } else {
      this.errorMessage$ = of('Your Browser is not supported. Please try Google Chrome.');
    }
  }

  start(): void {
    if (this.speechRecognizer.isListening) {
      this.stop();
      return;
    }

    this.defaultError$.next(undefined);
    this.speechRecognizer.start();
  }

  stop(): void {
    this.speechRecognizer.stop();
  }

  selectLanguage(language: string): void {
    if (this.speechRecognizer.isListening) {
      this.stop();
    }
    this.currentLanguage = 'es-ES';
    this.speechRecognizer.setLanguage(this.currentLanguage);
  }

  private initRecognition(): void {
    this.transcript$ = this.speechRecognizer.onResult().pipe(
      tap((notification) => {
        this.processNotification(notification);
      }),
      map((notification) => notification.content || '')
    );

    this.listening$ = merge(
      this.speechRecognizer.onStart(),
      this.speechRecognizer.onEnd()
    ).pipe(map((notification) => notification.event === SpeechEvent.Start));

    this.errorMessage$ = merge(
      this.speechRecognizer.onError(),
      this.defaultError$
    ).pipe(
      map((data) => {
        if (data === undefined) {
          return '';
        }
        if (typeof data === 'string') {
          return data;
        }
        let message;
        switch (data.error) {
          case SpeechError.NotAllowed:
            message = `Cannot run the demo.
            Your browser is not authorized to access your microphone.
            Verify that your browser has access to your microphone and try again.`;
            break;
          case SpeechError.NoSpeech:
            message = `No speech has been detected. Please try again.`;
            break;
          case SpeechError.AudioCapture:
            message = `Microphone is not available. Plese verify the connection of your microphone and try again.`;
            break;
          default:
            message = '';
            break;
        }
        return message;
      })
    );
  }

  private processNotification(notification: SpeechNotification<string>): void {
    this.totalTranscript = [];
    if (notification.event === SpeechEvent.FinalContent) {
      const message = notification.content?.trim() || '';
      this.actionContext.processMessage(message, this.currentLanguage);
      // this.actionContext.runAction(message, this.currentLanguage);
      this.totalTranscript = {
        text: notification.content,
        entity:this.entity,
      };    
        this.messageEvent.emit(this.totalTranscript);


      console.log(this.totalTranscript);
    }
  }

}
