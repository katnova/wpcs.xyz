// Avoid `console` errors in browsers that lack a console.
(function() {
  var method;
  var noop = function () {};
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
  console.log("Hello internet!");
}());

// Place any jQuery/helper plugins in here.
jQuery(function($, undefined) {
  $('body').terminal({
    //local compiler commands
    js: function(command) {
      console.log("Parse JS: " + command);
      if (command !== '') {
        try {
          var result = window.eval(command);
          if (result !== undefined) {
            this.echo(new String(result));
          }
        } catch (e) {
          this.error(new String(e));
        }
      } else {
        this.echo('');
      }
    },
    //Help commands
    man: function () {
      man(this);
    },
    help: function () {
      man(this);
    },
    image: function (url) {
      return fetch_image(url);
    }
   }, {
    greetings: '           (         (        )     )    )  \n' +
      ' (  (      )\\ )  (   )\\ )  ( /(  ( /( ( /(  \n' +
      ' )\\))(   \'(()/(  )\\ (()/(  )\\()) )\\()))\\()) \n' +
      '((_)()\\ )  /(_)|((_) /(_))((_)\\ ((_)\\((_)\\  \n' +
      '_(())\\_)()(_)) )\\___(_))  __((_)_ ((_)_((_) \n' +
      '\\ \\((_)/ /| _ ((/ __/ __| \\ \\/ | \\ / /_  /  \n' +
      ' \\ \\/\\/ / |  _/| (__\\__ \\_ >  < \\ V / / /   \n' +
      '  \\_/\\_/  |_|   \\___|___(_)_/\\_\\ |_| /___|  \n' +
      '                                            \n' +
      '\n',
    name: 'main-term',
    prompt: 'local@wpcs.xyz $ '
  });
});


/**
 * reusable functions
 */

function man(context){
  context.echo("\nCommands: " +
    "\n 'js <args>'   : You can attempt to run JS commands, this will parse content after \"js \" using window.eval();." +
    "\n 'image <url>' : Fetch a image from a URL and display it in the console."  +
    "\n");
}

function fetch_image(url) {
  return new Promise(function(resolve, reject) {
    const img = $('<img src="' + url + '"/>');
    img.on('load', () => resolve(img));
    img.on('error', reject);
  });
}
