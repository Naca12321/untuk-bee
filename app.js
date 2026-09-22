'use strict';
const photos = [
 ['img_8922','Bee di perahu saat sore','Ada kamu, perjalanannya jadi lebih manis.'],
 ['img_e0027','Foto berdua di dekat jembatan','Bagian favoritnya? Kita.'],
 ['img_5203','Bee tersenyum di luar ruangan','Senyum yang selalu ingin aku lihat.'],
 ['img_9661','Bee tersenyum sambil memegang makanan','Bahagia kecil yang rasanya besar.'],
 ['img_e0696','Bee dengan hijab cokelat di balkon','Kamu, dengan segala manisnya.'],
 ['img_e8558','Bee dengan lampu warna-warni','Lampunya cantik. Senyummu lebih.'],
 ['img_e8173','Bee duduk di teras dengan laptop','Hari biasa pun punya ceritanya.'],
 ['img_e8232','Bee di balkon saat langit senja','Senja dan kamu. Sama-sama indah.'],
 ['img_e8319','Bee di taman dengan pelangi','Semoga banyak warna baik menemuimu.'],
 ['img_e8256','Foto berdua di sebuah acara','Satu lagi cerita yang aku suka.'],
 ['img_e8630','Foto berdua saat bersepeda','Masih banyak jalan untuk kita.'],
 ['img_5242','Siluet Bee dengan langit berawan','Dan aku tetap suka kamu.']
];
const gallery=document.querySelector('#gallery'),dialog=document.querySelector('#photo-dialog');
photos.forEach(([file,alt,caption],i)=>{const b=document.createElement('button');b.className='memory';b.setAttribute('aria-label','Perbesar foto '+(i+1)+': '+alt);b.innerHTML=`<img src="assets/${file}.webp" alt="${alt}" width="900" height="1200" loading="lazy"><span class="caption">${caption}</span><span class="number">${String(i+1).padStart(2,'0')} / 12</span>`;b.addEventListener('click',()=>{document.querySelector('#full-photo').src=`assets/${file}.webp`;document.querySelector('#full-photo').alt=alt;document.querySelector('#full-caption').textContent=caption;dialog.showModal()});gallery.appendChild(b)});
document.querySelector('#close-photo').onclick=()=>dialog.close();dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
let currentPhoto=0;const prev=document.querySelector('#photo-prev'),next=document.querySelector('#photo-next');
function updateGallery(){const children=[...gallery.children];const middle=gallery.scrollLeft+gallery.clientWidth/2;let closest=Infinity;children.forEach((el,i)=>{const dist=Math.abs(el.offsetLeft-gallery.offsetLeft+el.offsetWidth/2-middle);if(dist<closest){closest=dist;currentPhoto=i}});document.querySelector('#photo-counter').textContent=String(currentPhoto+1).padStart(2,'0')+' / 12';prev.disabled=currentPhoto===0;next.disabled=currentPhoto===photos.length-1}
function goPhoto(n){const item=gallery.children[Math.max(0,Math.min(photos.length-1,n))];gallery.scrollTo({left:item.offsetLeft-gallery.offsetLeft-(gallery.clientWidth-item.offsetWidth)/2,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'})}
prev.onclick=()=>goPhoto(currentPhoto-1);next.onclick=()=>goPhoto(currentPhoto+1);gallery.addEventListener('scroll',updateGallery,{passive:true});gallery.addEventListener('keydown',e=>{if(e.key==='ArrowRight'||e.key==='ArrowLeft'){e.preventDefault();goPhoto(currentPhoto+(e.key==='ArrowRight'?1:-1))}});window.addEventListener('resize',updateGallery);updateGallery();
document.querySelectorAll('.flower').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.flower').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));document.querySelector('#flower-message').textContent=button.dataset.message}));
let opened=false,player,ready=false,playing=false,wantsMusic=false;const status=document.querySelector('#music-status'),sound=document.querySelector('#sound-toggle');
function updateSound(isPlaying){playing=isPlaying;sound.setAttribute('aria-pressed',String(isPlaying));sound.setAttribute('aria-label',isPlaying?'Jeda musik':'Putar musik');document.querySelector('#sound-icon').textContent=isPlaying?'Ⅱ':'♫';document.querySelector('#sound-label').textContent=isPlaying?'Jeda lagu':'Lagu kita'}
function startMusic(){wantsMusic=true;if(ready){player.unMute();player.setVolume(45);player.playVideo();status.textContent='Menyiapkan lagu untuk Bee…'}else{status.textContent='Menunggu lagu… kamu bisa lanjut menikmati suratnya.'}}
window.onYouTubeIframeAPIReady=()=>{player=new YT.Player('music-player',{host:'https://www.youtube-nocookie.com',width:'360',height:'202',videoId:'OrNTGMmSpz0',playerVars:{playsinline:1,rel:0,origin:location.origin,loop:1,playlist:'OrNTGMmSpz0'},events:{onReady:()=>{ready=true;player.getIframe().title='Honeybee — Olivia Rodrigo';if(wantsMusic)startMusic()},onStateChange:e=>{updateSound(e.data===YT.PlayerState.PLAYING);if(e.data===YT.PlayerState.PLAYING)status.textContent='Sedang menemani kamu ♡';else if(e.data===YT.PlayerState.PAUSED)status.textContent='Lagunya dijeda.'},onAutoplayBlocked:()=>{updateSound(false);status.textContent='Sentuh “Lagu kita” untuk menyalakan musik.'},onError:()=>{updateSound(false);status.textContent='Lagu belum bisa diputar di sini. Kamu bisa membukanya di YouTube.'}}})};
const script=document.createElement('script');script.src='https://www.youtube.com/iframe_api';script.onerror=()=>{status.textContent='Musik belum tersambung. Dengarkan lewat tautan YouTube di bawah.'};document.head.appendChild(script);
sound.addEventListener('click',()=>{if(ready&&playing){wantsMusic=false;player.pauseVideo()}else startMusic()});
document.querySelector('#open-letter').addEventListener('click',()=>{if(opened)return;opened=true;const welcome=document.querySelector('#welcome');document.querySelector('#site').inert=false;document.body.classList.remove('sealed');window.scrollTo(0,0);startMusic();welcome.classList.add('leaving');setTimeout(()=>{welcome.hidden=true;welcome.style.display='none';document.querySelector('.wordmark').focus({preventScroll:true})},matchMedia('(prefers-reduced-motion: reduce)').matches?0:850)});
