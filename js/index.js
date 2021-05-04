const dark = document.querySelector('#foo')
const footer = document.querySelector('#footer')
const darkButton = document.querySelector('#darkButton')

function darkMode(){
    if(dark.checked){
        document.body.style.background = '#ffff'
        footer.classList.add('darkMode')
        darkButton.classList.add('darkMode')
        darkButton.innerHTML = 'Dark'
    }
    else{
        document.body.style.background = '#222'
        footer.classList.remove('darkMode')
        darkButton.classList.remove('darkMode')
        darkButton.innerHTML = 'White'

    }
}

function CountdownTracker(label, value){
  var el = document.createElement('span');

  el.className = 'flip-clock__piece';
  el.innerHTML = '<b class="flip-clock__card card"><b class="card__top"></b><b class="card__bottom"></b><b class="card__back"><b class="card__bottom"></b></b></b>' + 
    '<span class="flip-clock__slot">' + label + '</span>';

  this.el = el;

  var top = el.querySelector('.card__top'),
      bottom = el.querySelector('.card__bottom'),
      back = el.querySelector('.card__back'),
      backBottom = el.querySelector('.card__back .card__bottom');

  this.update = function(val){
    val = ( '0' + val ).slice(-2);
    if ( val !== this.currentValue ) {
      
      if ( this.currentValue >= 0 ) {
        back.setAttribute('data-value', this.currentValue);
        bottom.setAttribute('data-value', this.currentValue);
      }
      this.currentValue = val;
      top.innerText = this.currentValue;
      backBottom.setAttribute('data-value', this.currentValue);

      this.el.classList.remove('flip');
      void this.el.offsetWidth;
      this.el.classList.add('flip');
    }
  }
  
  this.update(value);
}

// Calculation adapted from https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/

function getTimeRemaining() {
    let date = new Date()
    return {
        'Horas': date.getHours(),
        'Minutos': date.getMinutes(),
        'Segundos': date.getSeconds(),
    };
  }

  function Clock(countdown,callback) {
      
    var updateFn = getTimeRemaining
  
    this.el = document.createElement('div');
    this.el.className = 'flip-clock';
  
    var trackers = {},
        t = updateFn(countdown),
        key, timeinterval;
  
    for ( key in t ){
      if ( key === 'Total' ) { continue; }
      trackers[key] = new CountdownTracker(key, t[key]);
      this.el.appendChild(trackers[key].el);
    }
  
    var i = 0;
    function updateClock() {
      timeinterval = requestAnimationFrame(updateClock);
      
      // throttle so it's not constantly updating the time.
      if ( i++ % 10 ) { return; }
      
      var t = updateFn(countdown);
      if ( t.Total < 0 ) {
        cancelAnimationFrame(timeinterval);
        for ( key in trackers ){
          trackers[key].update( 0 );
        }
        callback();
        return;
      }
      
      for ( key in trackers ){
        trackers[key].update( t[key] );
      }
    }
  
    setTimeout(updateClock,1000);
  }


var clock = new Clock();
document.body.appendChild(clock.el);
