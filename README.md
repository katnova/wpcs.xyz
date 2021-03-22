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
function run(context) {
    context.echo("Echo Module (CTRL+D or type 'exit' to exit): ");
    function loop() {
        context.push(function (command) {
            context.pop().history().enable();
            if (command !== '') {
                if (command === "exit") {
                    resolve_module(context);
                } else {
                    try {
                        context.echo(command); //echo whatever someone inputs 
                    } catch (e) {
                        context.error(e);
                    }
                }
            } else {
                context.error("Input cannot be blank.");
            }
            loop();
        }, {
            prompt: '> ',
            keydown: function (e, context) {
                if (e.which == 68 && e.ctrlKey) {
                    resolve_module(context);
                }
            }
        });
    }
    loop();
}
```
