import { EventEmitter } from 'events';
import { Broadcast } from '../lib/types';
import { endpointSound } from '../constants';

class AudioPlayer {
  cache: HTMLAudioElement[] = [];
  currentPlayingAudioId: undefined | number = undefined;
  eventEmitter = new EventEmitter();

  emitPlay(broadcast: Broadcast, id: number) {
    this.eventEmitter.emit('play', broadcast, id);
  }

  playNewAudio(audioId: number, fileName: string) {
    this.stop();

    const cache = this.cache[audioId];
    const audio = cache || new Audio(`${endpointSound}/${fileName}.mp3`);

    if (!cache) {
      this.cache[audioId] = audio;
    }

    this.currentPlayingAudioId = audioId;
    audio.play();
  }

  playCurrentAudio() {
    if (!this.currentPlayingAudioId) {
      return;
    }
    const audio = this.cache[this.currentPlayingAudioId];

    audio.play();
  }

  pause() {
    if (!this.currentPlayingAudioId) {
      return;
    }
    const audio = this.cache[this.currentPlayingAudioId];

    audio.pause();
  }

  rewind() {
    if (!this.currentPlayingAudioId) {
      return;
    }
    const audio = this.cache[this.currentPlayingAudioId];

    audio.currentTime = 0;
  }

  stop() {
    this.pause();
    this.rewind();
  }
}

export const audioPlayer = new AudioPlayer();
