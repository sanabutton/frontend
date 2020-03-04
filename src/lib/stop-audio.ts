export function stopAudio(audio: HTMLAudioElement) {
  audio.pause();
  audio.currentTime = 0;
}
