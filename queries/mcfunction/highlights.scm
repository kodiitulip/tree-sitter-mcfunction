(comments) @comment
(coordinates) @number
(number) @number
(range) @number
(string) @string
(resource_location) @string.special.path
(selector) @type

(command
  name: (command_name) @keyword.function)

(command
  argument: (argument
    (bare_word) @function.arg))

(command
  run: (run) @keyword.function)
