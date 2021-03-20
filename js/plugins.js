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
  refreshPings();
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
    disable: function (config) {
      config_ctl(config, false, this);
    },
    enable: function (config) {
      config_ctl(config, true, this);
    },
    reload: function () {
      start(this, spinner.dots);
      window.location.reload(!soft_reload);
    },
    load: function (module) {
      if (modules_enabled) {
        start(this, spinner.dots);
        const url = buildModuleURL(module);
        const startProcTime = Date.now();
        if(debug) console.debug(log_level_debug + "Loading module " + module + ", at " + startProcTime + ", from " + url);
        ifUrlExist(url, (resu) => {
          if (resu) loadScript(url, this).then(r => {
            if (module_loading_messages)
              this.echo(log_marker + green("Module unloaded."))
            processing_time += Date.now() - startProcTime;
          });
          else {
            stop(this, spinner.dots);
            this.error("Could not retrieve module: '" + module + "'. (does it exist?)");
          }
        });
      } else this.echo(log_marker + yellow("Modules are disabled, enable them with `enable modules`"));
    }
  }, {
    greetings: acsii_logo,
    name: 'main-term',
    autocompleteMenu: true,
    completion: ['man', 'help', 'github', 'js', 'image', 'info', 'about', 'save', 'load', 'enable', 'disable', 'modules', 'module_loading_messages', 'reload'],
    prompt: term_prompt
  });
});


/**
 * reusable functions
 */

function man(context) {
  context.echo("\nCommands: " +
    "\n 'js <args>' : You can attempt to run JS commands, this will parse content after \"js \" using window.eval();." +
    "\n 'image <url>' : Fetch a image from a URL and display it in the console." +
    "\n 'load <module>' : Download an run a registered module in browser from the modules server." +
    "\n '[enable/disable] [modules | module_loading_messages | soft_reload | debug]' : enable or disable options in the config file. " +
    "\n 'info' : Get session information" +
    "\n 'reload' : Reload the page (depends on soft_reload for type)" +
    "\n 'about' : Get information about wcps.xyz" +
    "\n 'github' : Open the GitHub repo for wcps.xyz " +
    "\n");
}

/**
 * Show session information
 * @param context terminal
 */

function info(context) {
  refreshPings();
  context.echo(
    "\nSession information: " +
    "\n--Remotes:" +
    "\n\t---Host" +
    "\n\twpcs.xyz ping    : " + wpcs_ping +
    "\n\n\t---Module Repository" +
    "\n\tModules repo     : " + module_repo +
    "\n\trepo dir         : " + module_repo_dir +
    "\n\trepo ping        : " + storage_wpcs_ping +
    "\n\n\t---Module Registry" +
    "\n\tModules registry : " + module_registry +
    "\n\tregistry dir     : " + module_registry_dir +
    "\n\tregistry ping    : " + api_wpcs_ping +
    "\n\n--Local: " +
    "\n\t---Module Stats" +
    "\n\tModules lang            : " + module_language +
    "\n\tModules fetched         : " + modules_fetched +
    "\n\tTotal Processing Time   : " + (processing_time / 1000) + "s" +
    "\n\n\t---env vars" +
    "\n\tdebug                   : " + debug +
    "\n\tmodule_loading_messages : " + module_loading_messages +
    "\n\tmodule_verification     : " + module_verification +
    "\n\tmodules_enabled         : " + modules_enabled +
    "\n\tsoft_reload             : " + soft_reload +
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
 * Parse literal JS with window.eval();
 * @param context termnial for output.
 * @param command literal JS to parse.
 */
function parseJS(context, command) {
  if (debug) console.debug(log_level_debug + "parseJS: eval(" + command + ")");
  if (command !== '') {
    try {
      let result = window.eval(command);
      if (debug) console.debug(log_level_debug + "parseJS: result of eval(" + command + ") -> " + new String(result));
      if (result !== undefined) context.echo(new String(result));
    } catch (e) {
      context.error(new String(e));
      if (debug) console.debug(log_level_debug + "parseJS: error on eval(" + command + "), error: " + new String(e));
    }
  } else {
    if (debug) console.debug(log_level_debug + "Ignoring blank command...");
    context.echo('');
  }
}

/**
 * Open github reop for wpcs.xyz in a new tab
 * @param context
 */

function github(context) {
  context.echo("Opening wpcs.xyz repo...");
  window.open(repo_link);
}

/**
 * Change elements in config.js
 * @param element config option
 * @param operation boolean operator
 * @param context terminal context (for term output)
 */

function config_ctl(element, operation, context) {
  switch (element) {
    case "modules":
      modules_enabled = operation;
      context.echo(log_marker + "modules_enabled was set to " + operation);
      if (debug) console.debug(log_level_debug + "modules_enabled was set to " + operation)
      break;
    case "module_loading_messages":
      module_loading_messages = operation;
      context.echo(log_marker + "module_loading_messages was set to " + operation);
      if (debug) console.debug(log_level_debug + "module_loading_messages was set to " + operation);
      break;
    case "module_verification":
      if (debug) {
        module_verification = operation;
        context.echo(log_marker + "module_verification was set to " + operation);
        if (debug) console.debug(log_level_debug + "module_verification was set to " + operation);
      } else context.echo(log_marker + "The module_verification attribute can only be modified in debug mode.")
      break;
    case "debug":
      debug = operation;
      if (operation){
        context.echo(log_marker + yellow("You have enabled the debug element. Verifications checks have been disabled. (you should only do this if you know what you are doing)"));
        console.debug(log_level_debug + "Debugging enabled.");
      } else console.debug(log_marker + "Debugging disabled");

      break;
    case "soft_reload":
      soft_reload = operation;
      context.echo(log_marker + "soft_reload was set to " + operation)
      if (debug) console.debug(log_level_debug + "soft_reload was set to " + operation);
      break;
    default:
      context.error("[error] '" + element + "' is not a config element.");
  }
}

/**
 * Refresh ping information
 */
function refreshPings() {
  const p = new Ping();
  p.ping(module_repo, function (err, data) {
    if (err) {
      console.log("ERR on ping remote: " + module_repo)
      storage_wpcs_ping = data + "ms with " + err;
    } else storage_wpcs_ping = data + "ms";
  });
  p.ping(module_registry, function (err, data) {
    if (err) {
      console.log("ERR on ping remote: " + module_registry)
      api_wpcs_ping = data + "ms with " + err;
    } else api_wpcs_ping = data + "ms";
  });
  p.ping("https://wpcs.xyz", function (err, data) {
    if (err) {
      console.log("ERR on ping remote: https://wpcs.xyz")
      wpcs_ping = data + "ms with " + err;
    } else wpcs_ping = data + "ms";
  });
}
