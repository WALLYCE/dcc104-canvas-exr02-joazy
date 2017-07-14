function Level (){
  this.sprites = [];
  this.shots = [];
  this.inimigos = 3;
  this.cooldown = 1;
}
Level.prototype.desenharVida = function(ctx, jogador){
   ctx.save();
   ctx.fillStyle = "green";
   ctx.beginPath();
   ctx.fillRect(10, 10, jogador.hp, 20);
   ctx.closePath();
   ctx.beginPath();
   ctx.fillStyle = "green";
   ctx.fillText("Pontos: "+ jogador.Pontos, 10, 40);
   ctx.closePath();
   ctx.restore();


};

Level.prototype.desenhar = function (ctx) {
    for (var i = 0; i < this.sprites.length; i++) {
      this.sprites[i].desenha(ctx);
    }
    for (var i = 0; i < this.shots.length; i++) {
      this.shots[i].desenha(ctx);
    }
};

Level.prototype.randomicEnemy = function (dt) {
  this.cooldown -= dt;
  if(this.cooldown<0){
  var inimigo = new Sprite();
  inimigo.x= Math.floor((Math.random() * 800) + 1);
  inimigo.posY = 0;
  inimigo.width = 30;
  inimigo.height =30;
  inimigo.mvDown = true;
  inimigo.color = "green";
  inimigo.img.src = "asteroid.png";
  inimigo.enemy = true;
  this.sprites.push(inimigo);
  this.cooldown = 1;
}
  };

Level.prototype.fire = function (alvo){
  if(alvo.cooldown<0){
  var tiro = new Sprite();
  tiro.x = alvo.x;
  tiro.y = alvo.y;
  tiro.width = 10;
  tiro.height = 10;
  tiro.mvUp = true;
  tiro.bullet = true;
  this.shots.push(tiro);
  alvo.cooldown = 1;
}
}

Level.prototype.mover = function (dt) {
    for (var i = 0; i < this.sprites.length; i++) {
      this.sprites[i].mover(dt);
      if(
        this.sprites[i].x >  3000 ||
        this.sprites[i].x < -3000 ||
        this.sprites[i].y >  3000 ||
        this.sprites[i].y < -3000
      ){
        this.sprites.splice(i, 1);
      }
    }
    for (var i = this.shots.length-1;i>=0; i--) {
      this.shots[i].mover(dt);
      if(
        this.shots[i].x >  3000 ||
        this.shots[i].x < -3000 ||
        this.shots[i].y >  3000 ||
        this.shots[i].y < -3000
      ){
        this.shots.splice(i, 1);
      }
    }
};

Level.prototype.colidiuCom = function (alvo, resolveColisao) {
    for (var i = 0; i < this.sprites.length; i++) {
      if(this.sprites[i].colidiuCom(alvo)){
        resolveColisao(this.sprites[i], alvo);
      }
    }
};

Level.prototype.colidiuComTiros = function(player){
  for(var i = this.shots.length-1; i>=0; i--){

    this.colidiuCom(this.shots[i],
      (
        function(that)
        {
           return function(alvo){
            alvo.color = "green";
            that.shots.splice(i,1);
            x = that.sprites.indexOf(alvo);
            that.sprites.splice(x, 1);
            player.Pontos+=10;
          }
        }
      )(this));
  }
}

Level.prototype.colidiuComPlayer = function(alvo2){
  this.colidiuCom(alvo2,
    (
      function(that)
      {
         return function(alvo){
          alvo2.hp -=20;
          x = that.sprites.indexOf(alvo);
          that.sprites.splice(x, 1);
          if(alvo2.hp <=0)
          {
            alvo2.vidas --;

          }

        }
      }
    )(this));
}
