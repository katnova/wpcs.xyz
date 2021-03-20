/**
 * Download a moduile, then run it.
 * @param url URL of module
 * @param context terminal
 * @param args command arguments
 */
function loadScript(url, context){
  fetch(url)
    .then((response) => response.text())
    .then((text) => eval(text))
    .then(() => {
      run(context);
    });
}

/**
 * Save a file (note, will not download file in IE or FF, rather it will open in a new window.)
 * @param context Terminal
 * @param url URL of file to download
 * @param name name of file to download
 */
function save(context, url, name){
  context.echo("Saving resource at: " + url);
  let element = document.createElement('a');
  element.setAttribute('href', url);
  element.setAttribute('download', name);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
