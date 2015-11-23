function Game(circleCount,duration) {
  this.score = 0 ;
  this.circles= [] ;
  this.duration = (duration || 10) * 1000 ;
  this.circleCount = circleCount || 10;

  this.start = function() {
    for (var i = 0; i < this.circleCount; i++) { 
      this.circles.push(new Circle()); 
      this.circles[i].render(); 
      this.circles[i].move();
    }
    $("#score").text(this.score);

    setTimeout(this.stop, this.duration); 
  }

  this.stop = function() {
    alert("Game Over");
    $(".circle").remove(); 
    var playAgain = prompt(" Would you like to play again ? Yes/No ") 
      if (playAgain == "Yes") {
        var game = new Game();
        game.start();
      } else {
        alert("Thanks for Playing");
      }
   };
}


function Circle() {
  this.a = 5;
  this.x = Math.random() * 450;
  this.y = Math.random() * 450;
  this.diameter = 30 + Math.random() * 50; 
  this.speed = 500 + Math.random() * 1500;

  this.render = function() {
    var _this = this
    console.log(this.x)
    this.$me = $('<div class="circle"></div>')
      .css('left', this.x)
      .css('top', this.y)
      .css('height', this.diameter)
      .css('width', this.diameter)
      .on('click', function() {
        _this.kill();
      });

    $('#game').append(this.$me);
  };
  this.move = function() {
    var _this = this;
    this.$me.animate({
      left: Math.random() * 450,
      top: Math.random() * 450
    }, {
        duration: this.speed,
        complete: function(){
          _this.move();
        }
      }) ;
    }
  this.kill = function () {
    this.$me.css('background-color', 'red')
      .effect({
        effect: 'explode',
        duration: 100,
        complete: function() {
          $(this).remove();
          game.score = game.score + 10; 
          $("#score").text(game.score);
        },
        queue: false
      });
  }
}

$(document).ready(function(){

  window.game = new Game(); 
  window.game.start(10,10);
 
});

 