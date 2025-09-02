(comments) @comment

((comments) @comment.bold
  (#lua-match? @comment.bold "^##.*"))

(coordinates) @number

(number) @number

(range) @number

(string) @string

(json_key) @string

(resource_location) @string.special.path

(selector) @type

(command
  name: (command_name) @keyword.function)

(command
  argument: (argument
    (bare_word) @function.arg))

(command
  name: ((command_name) @keyword.function
    (#eq? @keyword.function "say"))
  argument: (argument
    (bare_word) @string))

(command
  run: (run) @keyword.function)

((bare_word) @keyword.condicional
  (#any-of? @keyword.condicional "if" "unless" "matches"))

((bare_word) @keyword.special
  (#any-of? @keyword.special
    "as" "at" "in" "on" "align" "anchored" "facing" "positioned" "rotated" "store" "summon" "with"))

((bare_word) @operator
  (#any-of? @operator "=" ">=" "<=" "+=" "-=" "*=" "/=" "%="))

((command_name) @keyword.special
  (#any-of? @keyword.special "return" "execute"))

(command
  argument: (argument
    (bare_word) @function.arg
    (#any-of? @function.arg "add" "remove" "set" "reset"))
  argument: (argument
    (resource_location) @type))

(command
  argument: (argument
    (bare_word) @keyword.special
    (#any-of? @keyword.special "with" "modify" "get"))
  argument: (argument
    (bare_word) @argument
    (#eq? @argument "entity"))
  argument: (argument
    (selector) @type)
  argument: (argument
    (bare_word) @string))

(ERROR) @error
