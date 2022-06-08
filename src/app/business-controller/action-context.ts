import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
 import { ActionStrategy } from './action-strategy';

import { SpeechSynthesizerService } from './speech-synthesizer.service';

@Injectable({
  providedIn: 'root',
})
export class ActionContext {
   private currentStrategy?: ActionStrategy;

  constructor(

    private titleService: Title,
    private speechSynthesizer: SpeechSynthesizerService
  ) {
 
  }

  processMessage(message: string, language: string): void {
    const msg = message.toLowerCase();
    const hasChangedStrategy = this.hasChangedStrategy(msg, language);

    let isFinishSignal = false;
    if (!hasChangedStrategy) {
      isFinishSignal = this.isFinishSignal(msg, language);
    }

    if (!hasChangedStrategy && !isFinishSignal) {
      this.runAction(message, language);
    }
  }

  runAction(input: string, language: string): void {
    if (this.currentStrategy) {
      this.currentStrategy.runAction(input, language);
    }
  }

  setStrategy(strategy: ActionStrategy | undefined): void {
    this.currentStrategy = strategy;
  }

  private hasChangedStrategy(message: string, language: string): boolean {
    let strategy: ActionStrategy | undefined;

    if (strategy) {
      this.setStrategy(strategy);
      this.speechSynthesizer.speak(
        strategy.getInitialResponse(language),
        language
      );
      return true;
    }

    return false;
  }

  private isFinishSignal(message: string, language: string): boolean {

      if (this.currentStrategy) {
        this.speechSynthesizer.speak(
          this.currentStrategy.getFinishResponse(language),
          language
        );
      }
      this.setStrategy(undefined);
      return true;
    

    return false;
  }
}
