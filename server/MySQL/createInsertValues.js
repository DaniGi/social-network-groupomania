const bcrypt = require('bcrypt');
const crypto = require('crypto');

const emails = [ 'admin@admin.fr', 'aldo@email.fr', 'Giogio@email.com', 'annaC@email.fr', 'LuciaFI@email.fr', 'Wilfred@email.com', 'GuyLeeC@email.en', 'WuChang@email.ch', 'Marion.Kevin@email.ch', 'LucyLu@email.us', 'michel_g@email.ch'];
const pseudos = [ 'admin','aldo1', 'Giogio_', 'annaC', 'LuciaFI', 'Wilfred', 'GuyLee', 'WuChang', 'Kevin', 'LucyLu', 'michel_g'];
const passwords = ['adminadmin', 'qwerty67', '12345678', 'poiuytre', 'mlokijnb', 'tre456hn', '123cvb89', 'wecfrt67', '102938ftgnhy', '//bfgeifeo?', 'cfrtgbnhu78de$'];

const postContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const commentContent= 'This is a comment !';

const N_POSTS = 15;
const N_COMMENTS = 30;
const N_LIKES = 15;

function computeLikesEntries(records, usrHashes) {
  let userHash = usrHashes[Math.floor(Math.random() * usrHashes.length)];
  let postId = Math.floor(Math.random() * N_POSTS) + 1;
  if(records.includes([postId, userHash])){
    return computeLikesEntries(records, usrHashes);
  }
  records.push([postId, userHash]);
  return [postId, userHash];
}

let passwordsHashes = async () => { return Promise.all(passwords.map( async (pss, i) => { 
  const passHash = await bcrypt.hash(pss, 10);
  pss === 'adminadmin' && console.log(`admin passHash: ${passHash}`);
  return passHash;
}))};

let userHashes = async () => { return Promise.all(emails.map( async (email, i) => { 
  const userIdHash = await bcrypt.hash(`${email}${pseudos[i]}`, 10);
  return userIdHash;
}))};

passwordsHashes().then( passHashes => {
  userHashes().then( usrHashes => {
    console.log('-----------------USERS');
    
    emails.forEach( (e, i) =>
      console.log(`('${usrHashes[i]}','${crypto.createHash('sha256').update(e).digest('hex')}', '${pseudos[i]}', '${passHashes[i]}', ${pseudos[i] === 'admin' ? 1 : 0})${i+1 === emails.length ? ';' : ','}`));
    
    console.log('-----------------POSTS');
    
    for(let i = 0; i < N_POSTS; i++) {

      let userHash = usrHashes[Math.floor(Math.random() * usrHashes.length)];
      console.log(`('${postContent}','${userHash}')${i+1 === N_POSTS ? ';' : ','}`);

    }
    
    console.log('-----------------COMMENTS');
    
    for(let i = 0; i < N_COMMENTS; i++) {

      let userHash = usrHashes[Math.floor(Math.random() * usrHashes.length)];
      let postId = Math.floor(Math.random() * N_POSTS) + 1;
      console.log(`('${commentContent}','${userHash}', ${postId})${i+1 === N_COMMENTS ? ';' : ','}`);

    }

    console.log('-----------------LIKES');
    let records = [];
    for(let i = 0; i < N_LIKES; i++) {
      let [ postId, userHash ] = computeLikesEntries(records, usrHashes);
      console.log(`(${postId}, '${userHash}')${i+1 === N_LIKES ? ';' : ','}`);
    }
  })
});


