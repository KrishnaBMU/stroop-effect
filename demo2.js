var availableAgents = ['Clippy']

var talks = [
    'Nice day!',
    'Glad to meet you.',
    'At your service',
    'Hello'
]

const randPos = () => .2 + Math.random() * .6

/*function nextAgent () {
    let agentName = availableAgents.pop()
    if (!agentName) return;

    clippy.load(agentName, agent => {
        window[agentName] = agent

        const move = () => {
            agent.moveTo($(document).width() * randPos(), $(document).height() * randPos())
        }

        move()
        
        agent.moveTo(700, 800);
        agent.show();
        agent.speak('I am ' + agentName + ', ' + talks[~~(Math.random() * talks.length)])
        // Speak on click and start
        const speak = () => {
            
            agent.speak('There is some evidence that the anterior cingulate area is active in people during the Stroop effect.')
            agent.speak('Maybe you should test your abilities by taking the stroop test')
            agent.animate()
        }
        $(agent._el).click(() => speak())
        // speak()
        agent.animate();
    });
}

nextAgent()
*/

clippy.load('Clippy', function(agent) {
    // Do anything with the loaded agent
    agent.show();
    agent.moveTo(900, 300);
    agent.speak('I am Clippy, nice to meet you!');
    agent.animate();
    const speak = () => {
        
        agent.speak('I wish you luck for the game.')
        //agent.speak('Maybe you should test your abilities by taking the stroop test')
        agent.animate()
    }
    $(agent._el).click(() => speak())
});

var supportsES6=(function(){try{new Function('(a=0)=>a');return true}catch(e){console.log('No ES6');return false}}());


var supportsLocalStorage=(function(){try{var m=new Date().valueOf()+"";localStorage.setItem(m,m);localStorage.removeItem(m);return true}catch(e){console.log("localStorage unavailable");return false}}());


// Adds a mode toggle button, containing an SVG, to the HTML 
var Dark_Light_Mode_Toggle_Button = (function (window, document, supportsES6, supportsLocalStorage) {

  if (!supportsES6) return;

  const name = 'mode';
  const btnClass = 'actions_btn-' + name;
  const svgClass = 'actions_svg-' + name;
  const clickedClass = '-js-clicked';
  const [light, dark] = ['light', 'dark'];
  const body = document.body;
  const btn = document.createElement('button');

  let mode;

  const _setAttr = (obj, attr, value) => obj.setAttribute(attr, value);
  const _modeText = bool => bool ? light : dark;
  const _animEnd = e => btn.classList.remove(clickedClass);


  const _clicked = _ => {

    // Note: Pressed state is purposefully not linked to the mode setting.
    // Initially the mode may be light or dark, but pressed state is always false.
    _setAttr(btn, 'aria-pressed', btn.getAttribute('aria-pressed') === 'false');

    mode = mode === false;
    body.style.colorScheme = _modeText(mode); // Ignored where unsupported
    _setAttr(body, 'data-lightMode', _modeText(mode));
    _setAttr(btn, 'aria-label', `Change to ${_modeText(!mode)} mode`);
    supportsLocalStorage && localStorage.setItem('mode', _modeText(mode));
    btn.classList.add(clickedClass);
    btn.addEventListener('animationend', _animEnd, {once: true});
  };


// Using symbol defs in the HTML
//   const _getSvg = _ => `<svg class=${svgClass} aria-hidden=true focusable=false>
//   <use class="${name}-${dark}" xlink:href="#icon-${name}-${dark}"></use>
//   <use class="${name}-${light}" xlink:href="#icon-${name}-${light}"></use>
// </svg>`;

  // Using an embedded SVG - So I can include this JS into other CodePen projects
  const _getSvg = _ => `<svg class="${svgClass}" aria-hidden=true focusable=false viewbox="0 0 960 960">
  <g class="${name}-${dark}">
    <circle cx="476" cy="480" r="458" fill-opacity=".25"/>
    <path d="M382 33C82 91-118 488 115 767c186 223 492 255 716 9a515 515 0 01-421-243c-94-157-56-368-28-500z"/>
  </g>
  <g class="${name}-${light}">
    <circle cx="479.5" cy="480.5" r="242"/>
    <path d="M480 800c22 0 40 18 40 40v80a40 40 0 01-80 0v-80c0-22 18-40 40-40zm480-320c0 22-18 40-40 40h-80a40 40 0 010-80h80c22 0 40 18 40 40zM706 763l57 56a40 40 0 1056-56l-56-57a40 40 0 10-57 57zm-509 56l57-56a40 40 0 10-57-57l-56 57a40 40 0 1056 56zm-77-379a40 40 0 010 80H40a40 40 0 010-80h80zm21-243l56 57a40 40 0 1057-57l-57-56a40 40 0 10-56 56zm622 57l56-57a40 40 0 10-56-56l-57 56a40 40 0 1057 57zM440 40v80a40 40 0 0080 0V40a40 40 0 00-80 0z"/>
  </g>
</svg>`;


  const _getMode = _ => {

    // Get the OS mode setting
    mode = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? false : true;

    // Override OS mode with the locally stored value.
    // Caters to state persistence across pages and visits.
    if (supportsLocalStorage && 'mode' in localStorage) {
      mode = localStorage.getItem('mode') === 'light';
    }
  };


  const _init = _ => {

    _getMode();

    // color-scheme cannot be set with CSS variable
    // Ignored where unsupported
    body.style.colorScheme = _modeText(mode);

    _setAttr(body, 'data-lightMode', _modeText(mode));
    _setAttr(btn, 'class', btnClass);
    _setAttr(btn, 'aria-pressed', false);
    _setAttr(btn, 'aria-label', `Change to ${_modeText(!mode)} mode`);

    btn.innerHTML = _getSvg();
    btn.addEventListener('click', _clicked);

    // Note: Button is added at the end of the HTML to avoid preceding an accessibility skip-to-content link.
    // Skip-to-content links should always be the first actionable asset on a web page.
    body.appendChild(btn);
    
  };

  _init();

}(window, document, supportsES6, supportsLocalStorage));

onload = function() {
    if ('speechSynthesis' in window) with(speechSynthesis) {
  
      var playEle = document.querySelector('#play');
      var pauseEle = document.querySelector('#pause');
      var stopEle = document.querySelector('#stop');
      var flag = false;
  
      playEle.addEventListener('click', onClickPlay);
      pauseEle.addEventListener('click', onClickPause);
      stopEle.addEventListener('click', onClickStop);
  
      function onClickPlay() {
        if (!flag) {
          flag = true;
          utterance = new SpeechSynthesisUtterance(document.querySelector('article').textContent);
          utterance.voice = getVoices()[0];
          utterance.onend = function() {
            flag = false;
            playEle.className = pauseEle.className = '';
            stopEle.className = 'stopped';
          };
          playEle.className = 'played';
          stopEle.className = '';
          speak(utterance);
        }
        if (paused) { /* unpause/resume narration */
          playEle.className = 'played';
          pauseEle.className = '';
          resume();
        }
      }
  
      function onClickPause() {
        if (speaking && !paused) { /* pause narration */
          pauseEle.className = 'paused';
          playEle.className = '';
          pause();
        }
      }
  
      function onClickStop() {
        if (speaking) { /* stop narration */
          /* for safari */
          stopEle.className = 'stopped';
          playEle.className = pauseEle.className = '';
          flag = false;
          cancel();
  
        }
      }
  
    }
  
    else { /* speech synthesis not supported */
      msg = document.createElement('h5');
      msg.textContent = "Detected no support for Speech Synthesis";
      msg.style.textAlign = 'center';
      msg.style.backgroundColor = 'red';
      msg.style.color = 'white';
      msg.style.marginTop = msg.style.marginBottom = 0;
      document.body.insertBefore(msg, document.querySelector('div'));
    }
  
  }