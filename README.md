```
 (  (                     ) (        
 )\))(  `  )   (  (    ( /( )\ ) (          
((_)()\ /(/(   )\ )\   )\()|()/( )\  
_(()((_|(_)_\ ((_|(_) ((_)\ )(_)|(_)  
\ V  V / '_ \) _|(_-<_\ \ /| || |_ / 
 \_/\_/| .__/\__|/__(_)_\_\ \_, /__| 
       |_|                  |__/     
```
[![CodeFactor](https://www.codefactor.io/repository/github/abstract-programming/wpcs.xyz/badge/master)](https://www.codefactor.io/repository/github/abstract-programming/wpcs.xyz/overview/master)
![CodeSize](https://img.shields.io/github/languages/code-size/Abstract-Programming/wpcs.xyz)
![Lines of code](https://img.shields.io/tokei/lines/github/Abstract-Programming/wpcs.xyz)
<br>
wpcs.xyz is a website feturing a jQuery terminal. This website is an online terminal, for whatever, easter eggs or useful tools.
<br>
This site is being built on a modules, runnable bits of JavaScript that are fetched from a remote server.
<br><br>
### Building a module
Example module:
```js
function run(context) { //context is the terminal that will be passed to this module. This module will run until this function resolves
    context.push(function (command) { // Push a new prompt to the terminal
        context.pop().history().enable(); //enable history for this input
        context.echo(command); // .echo(); ouput's something out to the commandline.
    }, {
        prompt: 'input something: ' //Prompt text here.
    });
}
```
