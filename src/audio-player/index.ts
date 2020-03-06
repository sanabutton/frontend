import { EventEmitter } from 'events';
import { endpointSound } from '../constants';

class AudioPlayer {
  cache: HTMLAudioElement[] = [];
  currentPlayingAudioId: undefined | number = undefined;
  eventEmitter = new EventEmitter();
  randomRepeat = false;
  audioNameList: string[] = [];

  setRandomRepeat(bool: boolean) {
    this.randomRepeat = bool;
  }

  setAudioNameList(list: string[]) {
    this.audioNameList = list;
  }

  emitPlay(id: number) {
    this.eventEmitter.emit('play', id);
  }

  play(audio: HTMLAudioElement) {
    const clear = () => {
      audio.removeEventListener('ended', clear);
      if (this.randomRepeat) {
        this.playRandom();
      } else {
        this.currentPlayingAudioId = undefined;
      }
    };

    audio.addEventListener('ended', clear);
    audio.play();
  }

  playNextAudio(audioId: number) {
    this.stop();

    const cache = this.cache[audioId];
    const audio = cache || new Audio(`${endpointSound}/${this.audioNameList[audioId]}.mp3`);

    if (!cache) {
      this.cache[audioId] = audio;
    }

    this.currentPlayingAudioId = audioId;

    this.play(audio);
  }

  playCurrentAudio() {
    if (!this.currentPlayingAudioId) {
      if (!this.audioNameList.length) {
        return;
      }

      this.playRandom();

      return;
    }
    const audio = this.cache[this.currentPlayingAudioId];

    this.play(audio);
  }

  playRandom() {
    const audioId = Math.floor(Math.random() * this.audioNameList.length);

    this.emitPlay(audioId);
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
    this.currentPlayingAudioId = undefined;
  }
}

export const audioPlayer = new AudioPlayer();
