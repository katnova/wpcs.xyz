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
wpcs.xyz is a site build around 'modules'. Allowing for useful tools to be loaded just in time, then discarded. Keeping the site lightweight, and versatile.
<br>
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
