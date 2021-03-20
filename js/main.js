let loadedScripts = [];

/**
 * Download a moduile, then run it.
 * @param url URL of module
 * @param context terminal
 * @param args command arguments
 */
async function loadScript(url, context) {
  await loadExternalScript(url).then(() => {
    const {dots} = spinner;
    stop(context, spinner["dots"]);
    if (module_loading_messages)
      context.echo("[wpcs] " + green("Loaded module, running..."));
    modules_fetched++;
    if(debug) console.debug(log_level_debug + "--------START MODULE CONSOLE OUTPUT--------");
    run(context);
    if(debug) console.debug(log_level_debug + "---------END MODULE CONSOLE OUTPUT---------");
    document.getElementById(url).remove();
  });
}

/**
 * Load an external module
 * @param src URL of external module
 * @returns {Promise<unknown>}
 */

function loadExternalScript(src) {
  if(debug) console.debug(log_level_debug + "Loading external script from: " + src);
  return new Promise((resolve, reject) => {
    const scriptTag = document.createElement('script');
    scriptTag.type = 'text/javascript';
    scriptTag.src = src;
    scriptTag.id = src;
    scriptTag.onload = () => resolve();
    document.body.appendChild(scriptTag);
    if(debug) console.debug(log_level_debug + "Added script tag to body: " + new String(scriptTag));
  });
}

/**
 * Save a file (note, will not download file in IE or FF, rather it will open in a new window.)
 * @param context Terminal
 * @param url URL of file to download
 * @param name name of file to download
 */
function save(context, url, name) {
  context.echo("Saving resource at: " + url);
  let element = document.createElement('a');
  element.setAttribute('href', url);
  element.setAttribute('download', name);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}

/**
 * Check if a URL exists by download some of the data, not all
 * @param url
 * @param callback
 */

function ifUrlExist(url, callback) {
  let request = new XMLHttpRequest;
  request.open('GET', url, true);
  request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  request.setRequestHeader('Accept', '*/*');
  request.onprogress = function (event) {
    let status = event.target.status;
    let statusFirstNumber = (status).toString()[0];
    switch (statusFirstNumber) {
      case '2':
        request.abort();
        return callback(true);
      default:
        request.abort();
        return callback(false);
    }
    ;
  };
  request.send('');
};

/**
 * Build a module resource URL
 * @param module
 * @returns {string}
 */

function buildModuleURL(module) {
  return module_repo + module_repo_dir + module + module_language;
}

/**
 ****************************
 *       Get latency        *
 ****************************
 */


