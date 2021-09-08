import ffmpeg from 'ffmpeg.js/ffmpeg-mp4';

export default function toMp4(webmData) {
  let stderr = '';

  return ffmpeg({
    MEMFS: [{
      name: 'input.webm',
      data: Uint8Array.from(webmData),
    }],
    arguments: ['-i', 'input.webm', '-codec', 'copy', '-strict', '-2', 'output.mp4'],
    print: () => { },
    printErr: (data) => {
      stderr += data;
    },
    onExit: (code) => {
      if (code !== 0) {
        throw new Error(`Conversion error: ${stderr}`);
      }
    },
  }).MEMFS[0].data.buffer;
}
