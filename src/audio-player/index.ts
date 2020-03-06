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

  emitPlay(id: number) {
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
        this.currentPlayingAudioId = undefined;
      }
    };

    audio.addEventListener('ended', onEnded);
    audio.play();
  }

  private playRandom() {
    const audioId = Math.floor(Math.random() * this.audioNameList.length);

    this.emitPlay(audioId);
  }

  private rewind() {
    if (!this.currentPlayingAudioId) {
      return;
    }
    const audio = this.cache[this.currentPlayingAudioId];

    audio.currentTime = 0;
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
    if (this.random) {
      this.currentPlayingAudioId = undefined;
    }
  }
}

export const audioPlayer = new AudioPlayer();
