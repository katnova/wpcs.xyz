// Avoid `console` errors in browsers that lack a console.

const repo_link = "https://github.com/Abstract-Programming/wpcs.xyz";
const acsii_logo = '           (         (        )     )    )  \n' +
  ' (  (      )\\ )  (   )\\ )  ( /(  ( /( ( /(  \n' +
  ' )\\))(   \'(()/(  )\\ (()/(  )\\()) )\\()))\\()) \n' +
  '((_)()\\ )  /(_)|((_) /(_))((_)\\ ((_)\\((_)\\  \n' +
  '_(())\\_)()(_)) )\\___(_))  __((_)_ ((_)_((_) \n' +
  '\\ \\((_)/ /| _ ((/ __/ __| \\ \\/ | \\ / /_  /  \n' +
  ' \\ \\/\\/ / |  _/| (__\\__ \\_ >  < \\ V / / /   \n' +
  '  \\_/\\_/  |_|   \\___|___(_)_/\\_\\ |_| /___|  \n' +
  '                                            \n';
(function () {
  let method;
  let noop = function () {
  };
  let methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeline', 'timelineEnd', 'timeStamp', 'trace', 'warn'
  ];
  let length = methods.length;
  let console = (window.console = window.console || {});

  while (length--) {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }
  console.log(acsii_logo + 'Someones poking around in the code, maybe go check out the GitHub repo?\n' + repo_link);
}());

// Place any jQuery/helper plugins in here.
jQuery(function ($) {
  $('body').terminal({
    //local compiler commands
    js: function (command) {
      parseJS(this, command);
    },
    //Help commands
    man: function () {
      man(this);
    },
    help: function () {
      man(this);
    },
    //image commands
    image: function (url) {
      return fetch_image(url);
    },
    save: function (url, name) {
      save(this, url, name)
    },
    github: function () {
      github(this);
    },
    info: function () {
      info(this);
    },
    about: function () {
      info(this);
    },
    load: function (module) {
      start(this, spinner.dots);
      const url = "https://storage.wpcs.xyz/modules/" + module + ".js";
      ifUrlExist(url, (resu) => {
        if (resu) {
          loadScript(url, this).then(r => {
          });
        }else{
          stop(this, spinner.dots);
          this.error("Could not retrieve module: '" + module + "'. (does it exist?)");
        }
      });
    }
  }, {
    //Config
    greetings: acsii_logo,
    name: 'main-term',
    autocompleteMenu: true,
    completion: ['man', 'help', 'github', 'js', 'image', 'info', 'about', 'save'],
    prompt: 'local@wpcs.xyz $ '
  });
});


/**
 * reusable functions
 */

function man(context) {
  context.echo("\nCommands: " +
    "\n 'js <args>'     : You can attempt to run JS commands, this will parse content after \"js \" using window.eval();." +
    "\n 'image <url>'   : Fetch a image from a URL and display it in the console." +
    "\n 'load <module>' : Download an run a registered module in browser from the modules server." +
    "\n 'about'         : Get information about wcps.xyz" +
    "\n 'github'        : Open the GitHub repo for wcps.xyz " +
    "\n");
}

function info(context) {
  context.echo("\nAbout wpcs.xyz" +
    "\nWho knows, its to early to tell what this will turn into." +
    "\n");
}

/**
 * Fetch a image from a remote URL async
 * @param url Url to fetch
 * @returns {Promise<unknown>}
 */

function fetch_image(url) {
  return new Promise(function (resolve, reject) {
    const img = $('<img src="' + url + '"/>');
    img.on('load', () => resolve(img));
    img.on('error', reject);
  });
}


/**
 * functions
 */

function parseJS(context, command) {
  console.log("Parse JS: " + command);
  if (command !== '') {
    try {
      var result = window.eval(command);
      if (result !== undefined) {
        context.echo(new String(result));
      }
    } catch (e) {
      context.error(new String(e));
    }
  } else {
    context.echo('');
  }
}

function github(context) {
  context.echo("Opening wpcs.xyz repo...");
  window.open(repo_link);
}
