'use strict';

var util       = require('util'),
    htmlparser = require('htmlparser'),
    _          = require('underscore')

_.mixin(require('underscore.deep'))

module.exports = (function () {

  function extemporize (parsedObj) {

    return JSON.stringify(parsedObj)

  }

  return {

    deconstruct: function (blob) {
      var errored

      var handler = new htmlparser.DefaultHandler(function (error, dom) {
          if (error) {
            errored = error
          }
      }, { ignoreWhitespace: true })
      var parser = new htmlparser.Parser(handler)

      parser.parseComplete(blob)

      return (errored) ? error : extemporize(handler.dom)
    }

  }

}())
