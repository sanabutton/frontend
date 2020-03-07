import { EventEmitter } from 'events';
import { endpointSound } from '../constants';

class AudioPlayer {
  cache: HTMLAudioElement[] = [];
  currentPlayingAudioId: undefined | number = undefined;
  eventEmitter = new EventEmitter();
  random = false;
  repeat = false;
  audioNameList: string[] = [];

  setRandom(bool: boolean) {
    this.random = bool;
  }

  setRepeat(bool: boolean) {
    this.repeat = bool;
  }

  setAudioNameList(list: string[]) {
    this.audioNameList = list;
  }

  emitAudioId(id: number) {
    this.eventEmitter.emit('play', id);
  }

  private play(audio: HTMLAudioElement) {
    const onEnded = () => {
      audio.removeEventListener('ended', onEnded);
      if (this.repeat && this.random) {
        this.playRandom();
      } else if (this.repeat) {
        this.play(audio);
      } else if (this.random) {
        this.emitStopped();
        this.clear();
      } else {
        this.emitStopped();
      }
    };

    audio.addEventListener('ended', onEnded);
    this.emitStarted();
    audio.play();
  }

  private playRandom() {
    const audioId = Math.floor(Math.random() * this.audioNameList.length);

    this.emitAudioId(audioId);
  }

  private rewind() {
    if (!this.currentPlayingAudioId) {
      return;
    }
    const audio = this.cache[this.currentPlayingAudioId];

    audio.currentTime = 0;
  }

  private clear() {
    this.currentPlayingAudioId = undefined;
  }

  private emitStopped() {
    this.eventEmitter.emit('stopped');
  }

  private emitStarted() {
    this.eventEmitter.emit('started');
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

    if (this.random) {
      this.playRandom();

      return;
    }

    this.stop();

    const audio = this.cache[this.currentPlayingAudioId];

    this.play(audio);
  }

  pause() {
    if (!this.currentPlayingAudioId) {
      return;
    }
    const audio = this.cache[this.currentPlayingAudioId];

    audio.pause();
  }

  stop() {
    this.pause();
    this.rewind();
    this.emitStopped();
    if (this.random) {
      this.clear();
    }
  }
}

export const audioPlayer = new AudioPlayer();
