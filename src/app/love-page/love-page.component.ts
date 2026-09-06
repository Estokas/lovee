import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-love-page',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './love-page.component.html',
  styleUrl: './love-page.component.css'
})
export class LovePageComponent {
  noButtonStyle: Record<string, string> = {
    left: '340px',
    top: '28px',
    transform: 'scale(1)'
  };

  showLoveModal = false;
  loveMessages = [
    'I love you so much 💋',
    'You are my favorite person ❤️',
    'I smile every time I think of you ✨',
    'You are my sweetest dream 🌷',
    'I want to be with you forever 💖',
    'You make my heart feel safe 🫶',
    'Every day with you is special 🌙',
    'My love for you is endless 💘',
    'You are my forever girl 💞',
    'I adore you more than words can say 😘',
    'You are my peace and joy 💗',
    'I will always choose you 💌',
    'Kiss me and love me forever 💋',
    'You are my sunshine and my home 🌞',
    'I love you to the moon and back 🌙',
    'You are my greatest blessing 💝',
    'My heart belongs to you 🫶',
    'You are so beautiful inside and out 💖',
    'I am lucky to have you 💞',
    'You are the love of my life 😍',
    'Forever and always, it is you 💘',
    'You complete me in the sweetest way 💗'
  ];

  private kissAudio: HTMLAudioElement | null = null;

  onYesClick(): void {
    this.showLoveModal = true;
    this.playKissSound();
  }

  private playKissSound(): void {
    if (typeof window === 'undefined') {
      return;
    }

    if (!this.kissAudio) {
      this.kissAudio = new Audio('/Kiss%20Sound%20Effects.mp3');
      this.kissAudio.volume = 1;
    }

    this.kissAudio.currentTime = 0;
    void this.kissAudio.play().catch(() => {
      // Audio is triggered by user interaction.
    });
  }

  moveNoButton(): void {
    const container = document.querySelector('.button-stage') as HTMLElement | null;
    const yesButton = document.querySelector('.yes-button') as HTMLElement | null;

    if (!container || !yesButton) {
      return;
    }

    const stageRect = container.getBoundingClientRect();
    const yesRect = yesButton.getBoundingClientRect();

    const noButtonWidth = 132;
    const noButtonHeight = 58;
    const safePadding = 26;

    const yesLeft = yesRect.left - stageRect.left;
    const yesTop = yesRect.top - stageRect.top;
    const yesWidth = yesRect.width;
    const yesHeight = yesRect.height;

    const maxX = Math.max(container.clientWidth - noButtonWidth, 0);
    const maxY = Math.max(container.clientHeight - noButtonHeight, 0);

    let nextLeft = 0;
    let nextTop = 0;
    let tries = 0;

    do {
      nextLeft = Math.random() * maxX;
      nextTop = Math.random() * maxY;
      tries += 1;
    } while (
      tries < 60 &&
      nextLeft < yesLeft + yesWidth + safePadding &&
      nextLeft + noButtonWidth > yesLeft - safePadding &&
      nextTop < yesTop + yesHeight + safePadding &&
      nextTop + noButtonHeight > yesTop - safePadding
    );

    const shrink = 0.72 + Math.random() * 0.45;

    this.noButtonStyle = {
      left: `${nextLeft}px`,
      top: `${nextTop}px`,
      transform: `scale(${shrink})`
    };
  }
}
