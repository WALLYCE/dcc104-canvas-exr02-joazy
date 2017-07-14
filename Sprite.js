function Sprite(){
  this.speed = 118;
  this.x = 0;
  this.y =0;
  this.width = 0;
  this.height = 0;
  this.color = "blue";
  this.mvUp = this.mvDown = this.mvRight = this.mvLeft = false;
  this.bullet= false;
  this.hp = 100;
  this.vidas = 1;
  this.cooldown = 0.3;
  this.Pontos =0;
  this.img = new Image();
  this.img.src = "nave.png";
}

Sprite.prototype.desenha = function (ctx){
   ctx.save();

     if(!this.bullet){
       ctx.drawImage(this.img,0,0, this.img.width, this.img.height, this.x-this.width+5,this.y-this.width,this.width+20,this.height+20);
   }else{
   ctx.fillStyle = this.color;
   ctx.translate(this.x, this.y);
   ctx.beginPath();
   ctx.moveTo(-this.width/2, this.height/2);
   ctx.lineTo(0, -this.height/2);
   ctx.lineTo(+this.width/2, this.height/2);
   ctx.closePath();
   ctx.fill();
   ctx.strokeStyle = "black";
   ctx.stroke();
   ctx.strokeStyle = "grey";
   ctx.strokeRect(-this.width/2, -this.height/2, this.width, this.height);
   ctx.restore();
 }
};

Sprite.prototype.mover = function (dt){
if(this.mvUp){
 this.y -= this.speed*dt;
}
if(this.mvDown){
  this.y += this.speed*dt;
}
if(this.mvRight){
  this.x += this.speed*dt;
}
if(this.mvLeft){
  this.x -=this.speed*dt;
}
};

Sprite.prototype.moverPlayer = function (dt){
if(this.mvUp){
 if(this.y - this.speed*dt > 0){
   this.y -= this.speed*dt;
 }

}
if(this.mvDown){
  if(this.y + this.speed*dt < 600){
    this.y += this.speed*dt;
  }

}
if(this.mvRight){
  if(this.x + this.speed*dt < 800){
    this.x += this.speed*dt;
  }
}
if(this.mvLeft){
  if(this.x -this.speed*dt>0 ){
      this.x -=this.speed*dt;
  }

}
};
Sprite.prototype.colidiuCom = function (alvo) {
  if(this.x+this.width < alvo.x) return false;
  if(this.x > alvo.x+this.width) return false;
  if(this.y+this.height < alvo.y) return false;
  if(this.y > alvo.y+this.height) return false;
  return true;
};
