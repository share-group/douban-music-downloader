const path = require('path');
const mkdirp = require('mkdirp');
const http = require('./http');
const config = require('./config');
const {playlist} = require('./playlist.json');

// 把 playlist.json.example 复制一份，命名 playlist.json
// 复制 https://music.douban.com/artists/player/ 页面的变量 __bootstrap_data 的内容到playlist.json，即可下载

async function main() {
  mkdirp.sync(config.targetDir);
  for (let i = 0; i < playlist.length; i++) {
    const music = playlist[i];
    const musicFile = `${music.artist_name.trim()}-${music.title.trim()}`;
    const filePath = path.resolve(config.targetDir, `${musicFile}.mp3`);
    await http.download(music.url, filePath);
    console.log(`正在下载：${musicFile}`);
    console.log(`========== 当前进度：${i + 1} / ${playlist.length} ==========`);
  }
  console.log('下载完成！');
}

main();