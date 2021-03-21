const repo_link = "https://github.com/Abstract-Programming/wpcs.xyz";
const module_repo = "https://storage.wpcs.xyz";
const module_repo_dir = "/modules/";
const module_language = ".js";
const module_registry = "https://api.wpcs.xyz";
const module_registry_dir = "/registry";
const acsii_logo =
  '           (         (        )     )    )  \n' +
  ' (  (      )\\ )  (   )\\ )  ( /(  ( /( ( /(  \n' +
  ' )\\))(   \'(()/(  )\\ (()/(  )\\()) )\\()))\\()) \n' +
  '((_)()\\ )  /(_)|((_) /(_))((_)\\ ((_)\\((_)\\  \n' +
  '_(())\\_)()(_)) )\\___(_))  __((_)_ ((_)_((_) \n' +
  '\\ \\((_)/ /| _ ((/ __/ __| \\ \\/ | \\ / /_  /  \n' +
  ' \\ \\/\\/ / |  _/| (__\\__ \\_ >  < \\ V / / /   \n' +
  '  \\_/\\_/  |_|   \\___|___(_)_/\\_\\ |_| /___|  \n' +
  '                                            \n';
const log_level_debug = "[DEBUG] ";
const log_level_info = "[INFO] ";
const log_level_warn = "[WARN] ";
const uncolored_term_prompt = 'local@wpcs.xyz $ ';
const teal_colored_prompt = teal(uncolored_term_prompt);
const term_prompt = teal_colored_prompt;
let debug = false;
let module_loading_messages = false;
let module_verification = false;
let modules_enabled = true;
let log_marker = "[wpcs] ";
let modules_fetched = 0;
let processing_time = 0.00;
let wpcs_ping, storage_wpcs_ping, api_wpcs_ping;
let soft_reload = false;
const authorized_scripts = [
  "https://www.googletagmanager.com/gtag/js?id=G-VJXM9LTMFX",
  "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js",
  "https://cdn.jsdelivr.net/npm/jquery.terminal/js/jquery.terminal.min.js",
  "https://unpkg.com/jquery.terminal/js/autocomplete_menu.js",
  "https://cdn.jsdelivr.net/gh/alfg/ping.js@0.2.2/dist/ping.min.js",
  "https://wpcs.xyz/js/vendor/modernizr-3.11.2.min.js",
  "https://wpcs.xyz/js/pkg_modules/colors.min.js",
  "https://wpcs.xyz/js/config.js",
  "https://wpcs.xyz/js/plugins.js",
  "https://wpcs.xyz/js/main.js",
  "https://wpcs.xyz/js/pkg_modules/spinner.js",
  "https://uppkg.com/axios/dist/axios.min.js"];
