let debug = false;
const repo_link = "https://github.com/Abstract-Programming/wpcs.xyz";
const module_repo = "https://storage.wpcs.xyz/modules/";
const module_language = ".js";
const module_registry = "https://api.wpcs.xyz/module_resistry/";
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
let module_loading_messages = true;
let module_verification = false;
let modules_enabled = true;
let log_marker = "[wpcs] ";
const log_level_debug = "[DEBUG] ";
const log_level_info = "[INFO] ";
const log_level_warn = "[WARN] ";
const term_prompt = teal('local@wpcs.xyz $ ');
