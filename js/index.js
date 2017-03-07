$(document).ready(function(){
  
  var w = 0;
  
  var text = $('.text');
  var f = ['¯\\_(ツ)_/¯', '( ͡° ͜ʖ ͡°)', 'ಠ_ಠ', '(づ｡◕‿‿◕｡)づ', '(ᵔᴥᵔ)', '◉_◉', 'ಥ_ಥ', '(✿´‿`)', '┬─┬ノ( º _ ºノ)', '⊂(◉‿◉)つ', '(☞ﾟ∀ﾟ)☞'];
  
  function rA() {
    f.sort(function(a, b){ return 0.5-Math.random(); })
  }
  
//shadow coordinates + an r for random
  var s = {
    x : {
      c : 0,
      r : 0
    },
    y : {
      c : 0,
      r : 0
    }
  }
  
// rgb = colors, c = color, r = random
  var rgb = {
    r : {
    c : 60,
    r : 0
    },
    g : {
    c : 30,
    r : 0
    },
    b : {
    c : 36,
    r : 0
    }
  }
  
  // stores string that becomes text-shadow
  var str = '';

  //declare the set timeout variabl globally so we can reference it outside of sLoop later
  var ts;
  
  //simplifies getting a random number
  var ran = function(){return Math.random();};
  
//THIS is the function that creates the effect. It is called once on page load and is also called when you click anywhere on the body
  var initiate = function() {
        
  //clears if the last effect hasn't finished  
  clearTimeout(ts);
  
  //clears string for current effect
  str = '';
    
  //resets x and y coordinates  
  s.x.c = 0;
  s.y.c = 0;
    
  //iniates random rgb color  
  rgb.r.c = Math.floor(Math.random() * 255) + 1;
  rgb.g.c = Math.floor(Math.random() * 255) + 1;
  rgb.b.c = Math.floor(Math.random() * 255) + 1;
  
  //randomizes the initial path of the x and y coordinates and colors
  s.x.r = ran();
  s.y.r = ran();
  rgb.r.r = ran();
  rgb.g.r = ran();
  rgb.b.r = ran();
  
  
  var ranTheRan = function(val, min, max){
    let cRan = ran();
    
    if(cRan > min && cRan < max){
      val.r = ran();    
    }
  }
  
  for(var key in s){
    ranTheRan(s[key], .2, 1);
  }
  
  var i = 1;
  
  function sLoop() {
    ts = setTimeout(function () {
      //
          for(var key in s){
            ranTheRan(s[key], .994, 1);
            Math.random() < s[key].r ? s[key].c += .7 : s[key].c -= .7;
          }
          for(var key in rgb){
            ranTheRan(rgb[key], .6, 1);
            Math.random() < rgb[key].r ? rgb[key].c += 1 : rgb[key].c -= 1;
          }
      
          i != 1 ? str += ', ' : str += '';

          str += s.x.c + 'px ' + s.y.c + 'px rgb(' + rgb.r.c + ', ' + rgb.g.c + ', ' + rgb.b.c + '), ';
      
          str = str.slice(0, str.length - 2);
      
        //console.log(str);

    
          text.css('text-shadow' , str);
      //
      i++;
      if (i < 5000) {
        sLoop();
      }
    }, 0)
    
  }
  
  sLoop();
    
    running = false;
  
  };
  
  
  $('body').click(function(){
    initiate();
    if(w < f.length){
      w++;
      text.html(f[w]);
    } else {
      rA();
      w = 0;
      text.html(f[w]);
    }
  });
  
  initiate();
  
  
});