/**
 * @file Mcfunction grammar for tree-sitter
 * @author kodiitulip <kodii.tulip@gmail.com>
 * @license MIT
 */

/// <reference types="tree-sitter-cli/dsl" />
// @ts-check

module.exports = grammar({
  name: "mcfunction",

  rules: {
    source_file: $ => repeat(choice($.command, $.comments)),

    comments: _ => prec.left(-1, token(seq("#", /[\n\r]|[^\n\r]+/))),

    command: $ =>
      seq(
        field("name", $.command_name),
        repeat(field("argument", $.argument)),
        choice(field("run", $.run), token.immediate(choice("\n", "\0"))),
      ),

    run: _ => token("run"),

    // Command keywords (only lowercase letters and underscores)
    command_name: _ => /[a-z_]+/,

    // Bare words = plain identifiers without ':' or special chars
    bare_word: _ => prec(-1, token(/[a-zA-Z_][a-zA-Z0-9_\-\.]*/)),

    // Resource locations: optional namespace, then path
    resource_location: _ =>
      token(seq(optional("#"), /([a-z_]+:)?[a-z_][a-z0-9_\/]*/)),

    argument: $ =>
      choice(
        $.boolean,
        $.resource_location,
        $.bare_word,
        $.operators,
        $.coordinates,
        $.number,
        $.range,
        $.string,
        $.json_array,
        $.selector,
        $.json_object,
      ),

    operators: _ => /[=\-+/*<>]/,

    string: _ => /"(?:\.|(\\\")|[^\""\n])*"/,

    selector: $ =>
      prec.right(
        seq(
          "@",
          /[praesn]/,
          optional(seq("[", sepBy1(",", $.selector_argument), "]")),
        ),
      ),

    selector_argument: $ =>
      seq(
        field("key", $.command_name),
        "=",
        field("value", seq(optional("!"), $.argument)),
      ),

    json_object: $ => seq("{", optional(sepBy1(",", $.json_pair)), "}"),

    json_pair: $ =>
      seq(
        field("key", $.json_key),
        ":",
        field(
          "value",
          choice(
            $.boolean,
            $.number,
            $.string,
            $.resource_location,
            $.json_object,
            $.json_array,
          ),
        ),
      ),

    // JSON-style keys
    json_key: $ => choice($.string, /[a-zA-Z_][a-zA-Z0-9_-]*/),

    json_array: $ =>
      prec(1, seq("[", optional(sepBy1(",", $.json_array_value)), "]")),

    json_array_value: $ =>
      choice(
        $.boolean,
        $.number,
        $.string,
        $.resource_location,
        $.json_object,
        $.json_array,
      ),

    number: _ => prec(1, /[+-]?(?:\d+(?:\.\d+)?|\.\d+)(?:[eE][+-]?\d+)?/),

    boolean: _ => /true|True|false|False|1b|0b/,

    coordinates: $ => prec.right(seq(/[\^\~]/, optional($.number))),

    range: $ =>
      prec.right(2, seq(optional($.number), "..", optional($.number))),
  },
});

// Helper for comma-separated lists
/**
 * Helper for comma-separeted lists
 *
 * @param {RuleOrLiteral} sep - the separator for the rule
 * @param {RuleOrLiteral} rule - the rule to separete
 *
 * @returns { SeqRule }
 */
function sepBy1(sep, rule) {
  return seq(rule, repeat(seq(sep, rule)));
}
