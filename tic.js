let head=document.querySelector('.heading'), sqs=document.querySelectorAll('.sq'), p1arr=[],p2arr=[],
comparr=[], turn =-1;
let p1=document.querySelector('.p1'), p2=document.querySelector('.p2');
let win=[[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];
let nextWin=[[[1,2],[1,3],[2,3]], [[4,5],[5,6],[4,6]], [[7,8],[8,9],[7,9]], [[1,4],[1,7],[4,7]],
[[2,5],[5,8],[2,8]], [[3,6],[6,9],[3,9]], [[1,5],[1,9],[5,9]], [[3,5],[3,7],[5,7]]];

const sum=(arr=[])=>{
  let x=arr.reduce((red,el)=>red+el);
  return x;
}

function checkWin(){
  let resultp1=true, resultp2=true;
  for(cond of win){
    resultp1=true;
    for(x of cond){
      if(!sqs[x-1].classList.contains('cross')){
        resultp1=false;
      }
    }
    if(resultp1){
      break;
    }
  }
  if(resultp1){
    head.innerHTML='Player 1 wins!<br>Press any key to play again';
    turn=0;
    for(sq of sqs){
      sq.onclick=function (){};
    }
    return true;
  }
  for(cond of win){
    resultp2=true;
    for(x of cond){
      if(!sqs[x-1].firstChild.classList.contains('circle')){
        resultp2=false;
      }
    }
    if(resultp2){
      break;
    }
  }
  if(resultp2==true){
    if(c==0) head.innerHTML='Player 2 wins!<br>Press any key to play again';
    else if(c==1) head.innerHTML='Computer wins!<br>Press any key to play again';
    turn=0;
    for(sq of sqs){
      sq.onclick=function (){};
    }
    return true;
  }
  let draw=true;
  for(sq of sqs){
    if(!sq.classList.contains('cross') && !sq.firstChild.classList.contains('circle')) draw=false;
  }
  if(draw){
    head.innerHTML='Game is a draw!<br>Press any key to play again';
    turn=0;
    for(sq of sqs){
      sq.onclick=function (){};
    }
    return true;
  }
  else{
    if(c==0) head.innerHTML=`Player ${turn}'s turn`;
    else if(c==1){
      head.innerHTML="Play!";
    }
    return false;
  }
}

function p1turn(){
  for(sq of sqs){
    if(!(p1arr.includes(sq)) && !(p2arr.includes(sq)) && !(comparr.includes(sq))){
      sq.onclick=function (){
        p1arr.push(this);
        turn=2;
        this.classList.add('cross');
        if(!checkWin()){
          if(c==0) p2turn();
          else if(c==1) compturn();
        }
      }
    }
    else{
      sq.onclick=function (){};
    }
  }
}

function p2turn(){
  for(sq of sqs){
    if(!(p1arr.includes(sq)) && !(p2arr.includes(sq))){
      sq.onclick=function (){
        p2arr.push(this);
        turn=1;
        this.firstChild.classList.add('circle');
        if(!checkWin()) p1turn();
      }
    }
    else{
      sq.onclick=function (){};
    }
  }
}

function compturn(){
  let possibleWin=true;
  for(let i=0;i<8;i++){
    let j;
    for(j=0;j<nextWin[i].length;j++){
      possibleWin=true;
      for(x of nextWin[i][j]){
        if(p1arr.includes(sqs[x-1]) || !(comparr.includes(sqs[x-1]))){
          possibleWin=false;
        }
      }
      if(possibleWin && !sqs[sum(win[i])-sum(nextWin[i][j])-1].classList.contains('cross')){
        console.log("possible win case break: ",i,j, possibleWin && !sqs[sum(win[i])-sum(nextWin[i][j])-1].classList.contains('cross'));
        break;
      }
    }
    if(j<8){
      try {
        if(possibleWin && !sqs[sum(win[i])-sum(nextWin[i][j])-1].classList.contains('cross')){
          sqs[sum(win[i])-sum(nextWin[i][j])-1].firstChild.classList.add('circle');
          comparr.push(sqs[sum(win[i])-sum(nextWin[i][j])-1]);
          turn=1;
          checkWin();
          return true;
        }
      } catch (error) {
        console.log(nextWin[i][j], i , j);
      }
    }
  }
  
  let opponentWin=true;
  for(let i=0;i<8;i++){
    let j;
    for(j=0;j<nextWin[i].length;j++){
      opponentWin=true;
      for(let x of nextWin[i][j]){
        if(!sqs[x-1].classList.contains('cross') ){
          opponentWin=false;
        }
      }
      if(opponentWin && !sqs[sum(win[i])-sum(nextWin[i][j])-1].firstChild.classList.contains('circle')){
        console.log("opponent win case break: ",i,j,opponentWin && !sqs[sum(win[i])-sum(nextWin[i][j])-1].firstChild.classList.contains('circle'));
        break;
      }
    }
    if(j<8){
      try {
        if(opponentWin && !sqs[sum(win[i])-sum(nextWin[i][j])-1].firstChild.classList.contains('circle')){
          sqs[sum(win[i])-sum(nextWin[i][j])-1].firstChild.classList.add('circle');
          comparr.push(sqs[sum(win[i])-sum(nextWin[i][j])-1]);
          turn=1;
          if(!checkWin()) p1turn();
          return true;
        }
        
      } catch (error) {
        console.log(nextWin[i][j],i,j);
      }
    }
  }
  
  let arr=[];
  for(sq of sqs){
    if(!(p1arr.includes(sq)) && !(comparr.includes(sq))) arr.push(sq);
  }
  if(arr.length>0){
    let x=Math.floor(Math.random()*arr.length);
    console.log(x, arr)
    arr[x].firstChild.classList.add('circle');
    comparr.push(arr[x]);
  }
  turn=1;
  if(!checkWin()) p1turn();
  return false;
}
function reset(){
  p1arr=[];
  p2arr=[];
  comparr=[];
  for(sq of sqs){
    sq.classList.remove('cross');
    sq.firstChild.classList.remove('circle');
  }
}

let c=-1;

p2.onclick=()=>{
  if(c!=0 && (turn==0 || turn ==-1)){
    c=0;
    setTimeout(()=>{p1.lastChild.innerHTML=''}, 200);
    p1.classList.add('p1click');
    setTimeout(()=>{p2.lastChild.innerHTML=''}, 200);
    p2.classList.add('p2click');
    reset();
    turn=1;
    head.innerHTML=`Player ${turn}'s turn`;
    p1turn();
  }
}

p1.onclick=()=>{
  if(c!=1 && (turn==0 || turn ==-1)){
    c=1;
    setTimeout(()=>{p1.lastChild.innerHTML=''}, 200);
    p1.classList.add('p1click');
    setTimeout(()=>{p2.lastChild.innerHTML=''}, 200);
    p2.classList.add('p2click');
    reset();
    turn=1;
    head.innerHTML=`Play!`;
    p1turn();
  }
}

window.onkeydown=()=>{
  if(turn==0){
    reset();
    turn=1
    head.innerHTML=`Player ${turn}'s turn`;
    p1turn();
  }
}


let dark=document.querySelector('.darkmain'), main=document.querySelector('.main'), input=document.querySelector('#check'),
button=document.querySelector('label'), line=document.querySelectorAll('.line');
button.addEventListener('click',()=>{
  if(input.checked){
    dark.classList.add('check');
    main.classList.add('check');
    document.body.classList.add('bcheck');
    for(let l of line){
      l.classList.add('lcheck');
    }
    button.classList.add('buttoncheck');
  }
  else{
    dark.classList.remove('check');
    main.classList.remove('check');
    document.body.classList.remove('bcheck');
    for(let l of line){
      l.classList.remove('lcheck');
    }
    button.classList.remove('buttoncheck');
  }
})