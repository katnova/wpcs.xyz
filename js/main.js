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
    if (debug) console.debug(log_level_debug + "--------START MODULE CONSOLE OUTPUT--------");
    try {
      run(context);
    } catch (e) {
      context.echo("Caught fatal module error: " + e);
    }

  });
}

/**
 * Load an external module
 * @param src URL of external module
 * @returns {Promise<unknown>}
 */

function loadExternalScript(src) {
  if (debug) console.debug(log_level_debug + "Loading temporary external script from: " + src);
  loadedScripts.push(src);
  return new Promise((resolve, reject) => {
    const scriptTag = document.createElement('script');
    scriptTag.type = 'text/javascript';
    scriptTag.src = src;
    scriptTag.id = src;
    scriptTag.onload = () => resolve();
    document.body.appendChild(scriptTag);
    if (debug) console.debug(log_level_debug + "Added script tag to body: " + new String(scriptTag));
  });
}

/**
 * Unload all loaded temp scripts.
 */
function removeTempScripts() {
  for (let i = 0; i < loadedScripts.length; i++)
    try {
      document.getElementById(loadedScripts[i]).remove();
      if (debug) console.debug(log_level_debug + "Removed script with ID: " + loadedScripts[i]);
    } catch (e) {
      if (debug) console.debug(log_level_debug + "Failed to unload script at position " + i);
    }
  loadedScripts = [];
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
 * Check if loaded scripts are authorized to be so.
 * @param context
 * @return res returns false if there is an unauthorized script loaded, (may be a bug, or malicious code)
 */
function checkLoadedScripts(context) {
  let res = true;
  let jsFilePaths = Array.prototype.slice
    .apply(document.querySelectorAll('script'))
    .filter(s => s.src)
    .map(s => s.src);
  if (!debug)
    for (let i = 0; i < jsFilePaths.length; i++)
      if (!authorized_scripts.includes(jsFilePaths[i])) {
        context.echo(log_level_warn + red("Unauthorized loaded script found. src: " + jsFilePaths[i]));
        if (debug) console.debug(log_level_warn + "Unauthorized loaded script found: " + jsFilePaths[i]);
        res = false;
      } else {
        if (debug) console.debug(log_level_debug + "Authorized script found: " + jsFilePaths[i]);
      }
  return res;
}

/**
 * Mathod modules call upon exit to clean up loaded scripts.
 * @param context terminal
 */
function resolve_module(context) {
  if (debug) console.debug(log_level_debug + "---------END MODULE CONSOLE OUTPUT---------");
  if (debug) console.debug(log_level_debug + "Cleaning up post module run...");
  if (module_loading_messages) context.echo(log_marker + "Cleaning up module...");
  removeTempScripts();
  if (module_loading_messages) context.echo(log_marker + "Verifying clean-up....")
  verifyLoadedScripts(context);
}

/**
 * Verify loaded scripts against known scripts.
 * @param context
 */
function verifyLoadedScripts(context) {
  if (module_loading_messages) context.echo(log_marker + "Checking loaded scripts...");
  if (checkLoadedScripts(context)) {
    if (module_loading_messages) {
      context.echo(log_marker + green("All loaded scripts are ok."));
    }
  } else {
    context.echo(log_marker + red("Unknown scripts found after module unload, if you don't recognise them, please reload the page."));
  }
}
