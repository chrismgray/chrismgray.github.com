var COMPILED = false;
var goog = goog || {};
goog.global = this;
goog.DEBUG = true;
goog.LOCALE = "en";
goog.evalWorksForGlobals_ = null;
goog.provide = function(name) {
  if(!COMPILED) {
    if(goog.getObjectByName(name) && !goog.implicitNamespaces_[name]) {
      throw Error('Namespace "' + name + '" already declared.');
    }
    var namespace = name;
    while(namespace = namespace.substring(0, namespace.lastIndexOf("."))) {
      goog.implicitNamespaces_[namespace] = true
    }
  }
  goog.exportPath_(name)
};
goog.setTestOnly = function(opt_message) {
  if(COMPILED && !goog.DEBUG) {
    opt_message = opt_message || "";
    throw Error("Importing test-only code into non-debug environment" + opt_message ? ": " + opt_message : ".");
  }
};
if(!COMPILED) {
  goog.implicitNamespaces_ = {}
}
goog.exportPath_ = function(name, opt_object, opt_objectToExportTo) {
  var parts = name.split(".");
  var cur = opt_objectToExportTo || goog.global;
  if(!(parts[0] in cur) && cur.execScript) {
    cur.execScript("var " + parts[0])
  }
  for(var part;parts.length && (part = parts.shift());) {
    if(!parts.length && goog.isDef(opt_object)) {
      cur[part] = opt_object
    }else {
      if(cur[part]) {
        cur = cur[part]
      }else {
        cur = cur[part] = {}
      }
    }
  }
};
goog.getObjectByName = function(name, opt_obj) {
  var parts = name.split(".");
  var cur = opt_obj || goog.global;
  for(var part;part = parts.shift();) {
    if(goog.isDefAndNotNull(cur[part])) {
      cur = cur[part]
    }else {
      return null
    }
  }
  return cur
};
goog.globalize = function(obj, opt_global) {
  var global = opt_global || goog.global;
  for(var x in obj) {
    global[x] = obj[x]
  }
};
goog.addDependency = function(relPath, provides, requires) {
  if(!COMPILED) {
    var provide, require;
    var path = relPath.replace(/\\/g, "/");
    var deps = goog.dependencies_;
    for(var i = 0;provide = provides[i];i++) {
      deps.nameToPath[provide] = path;
      if(!(path in deps.pathToNames)) {
        deps.pathToNames[path] = {}
      }
      deps.pathToNames[path][provide] = true
    }
    for(var j = 0;require = requires[j];j++) {
      if(!(path in deps.requires)) {
        deps.requires[path] = {}
      }
      deps.requires[path][require] = true
    }
  }
};
goog.require = function(rule) {
  if(!COMPILED) {
    if(goog.getObjectByName(rule)) {
      return
    }
    var path = goog.getPathFromDeps_(rule);
    if(path) {
      goog.included_[path] = true;
      goog.writeScripts_()
    }else {
      var errorMessage = "goog.require could not find: " + rule;
      if(goog.global.console) {
        goog.global.console["error"](errorMessage)
      }
      throw Error(errorMessage);
    }
  }
};
goog.basePath = "";
goog.global.CLOSURE_BASE_PATH;
goog.global.CLOSURE_NO_DEPS;
goog.global.CLOSURE_IMPORT_SCRIPT;
goog.nullFunction = function() {
};
goog.identityFunction = function(var_args) {
  return arguments[0]
};
goog.abstractMethod = function() {
  throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(ctor) {
  ctor.getInstance = function() {
    return ctor.instance_ || (ctor.instance_ = new ctor)
  }
};
if(!COMPILED) {
  goog.included_ = {};
  goog.dependencies_ = {pathToNames:{}, nameToPath:{}, requires:{}, visited:{}, written:{}};
  goog.inHtmlDocument_ = function() {
    var doc = goog.global.document;
    return typeof doc != "undefined" && "write" in doc
  };
  goog.findBasePath_ = function() {
    if(goog.global.CLOSURE_BASE_PATH) {
      goog.basePath = goog.global.CLOSURE_BASE_PATH;
      return
    }else {
      if(!goog.inHtmlDocument_()) {
        return
      }
    }
    var doc = goog.global.document;
    var scripts = doc.getElementsByTagName("script");
    for(var i = scripts.length - 1;i >= 0;--i) {
      var src = scripts[i].src;
      var qmark = src.lastIndexOf("?");
      var l = qmark == -1 ? src.length : qmark;
      if(src.substr(l - 7, 7) == "base.js") {
        goog.basePath = src.substr(0, l - 7);
        return
      }
    }
  };
  goog.importScript_ = function(src) {
    var importScript = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;
    if(!goog.dependencies_.written[src] && importScript(src)) {
      goog.dependencies_.written[src] = true
    }
  };
  goog.writeScriptTag_ = function(src) {
    if(goog.inHtmlDocument_()) {
      var doc = goog.global.document;
      doc.write('<script type="text/javascript" src="' + src + '"></' + "script>");
      return true
    }else {
      return false
    }
  };
  goog.writeScripts_ = function() {
    var scripts = [];
    var seenScript = {};
    var deps = goog.dependencies_;
    function visitNode(path) {
      if(path in deps.written) {
        return
      }
      if(path in deps.visited) {
        if(!(path in seenScript)) {
          seenScript[path] = true;
          scripts.push(path)
        }
        return
      }
      deps.visited[path] = true;
      if(path in deps.requires) {
        for(var requireName in deps.requires[path]) {
          if(requireName in deps.nameToPath) {
            visitNode(deps.nameToPath[requireName])
          }else {
            if(!goog.getObjectByName(requireName)) {
              throw Error("Undefined nameToPath for " + requireName);
            }
          }
        }
      }
      if(!(path in seenScript)) {
        seenScript[path] = true;
        scripts.push(path)
      }
    }
    for(var path in goog.included_) {
      if(!deps.written[path]) {
        visitNode(path)
      }
    }
    for(var i = 0;i < scripts.length;i++) {
      if(scripts[i]) {
        goog.importScript_(goog.basePath + scripts[i])
      }else {
        throw Error("Undefined script input");
      }
    }
  };
  goog.getPathFromDeps_ = function(rule) {
    if(rule in goog.dependencies_.nameToPath) {
      return goog.dependencies_.nameToPath[rule]
    }else {
      return null
    }
  };
  goog.findBasePath_();
  if(!goog.global.CLOSURE_NO_DEPS) {
    goog.importScript_(goog.basePath + "deps.js")
  }
}
goog.typeOf = function(value) {
  var s = typeof value;
  if(s == "object") {
    if(value) {
      if(value instanceof Array) {
        return"array"
      }else {
        if(value instanceof Object) {
          return s
        }
      }
      var className = Object.prototype.toString.call(value);
      if(className == "[object Window]") {
        return"object"
      }
      if(className == "[object Array]" || typeof value.length == "number" && typeof value.splice != "undefined" && typeof value.propertyIsEnumerable != "undefined" && !value.propertyIsEnumerable("splice")) {
        return"array"
      }
      if(className == "[object Function]" || typeof value.call != "undefined" && typeof value.propertyIsEnumerable != "undefined" && !value.propertyIsEnumerable("call")) {
        return"function"
      }
    }else {
      return"null"
    }
  }else {
    if(s == "function" && typeof value.call == "undefined") {
      return"object"
    }
  }
  return s
};
goog.propertyIsEnumerableCustom_ = function(object, propName) {
  if(propName in object) {
    for(var key in object) {
      if(key == propName && Object.prototype.hasOwnProperty.call(object, propName)) {
        return true
      }
    }
  }
  return false
};
goog.propertyIsEnumerable_ = function(object, propName) {
  if(object instanceof Object) {
    return Object.prototype.propertyIsEnumerable.call(object, propName)
  }else {
    return goog.propertyIsEnumerableCustom_(object, propName)
  }
};
goog.isDef = function(val) {
  return val !== undefined
};
goog.isNull = function(val) {
  return val === null
};
goog.isDefAndNotNull = function(val) {
  return val != null
};
goog.isArray = function(val) {
  return goog.typeOf(val) == "array"
};
goog.isArrayLike = function(val) {
  var type = goog.typeOf(val);
  return type == "array" || type == "object" && typeof val.length == "number"
};
goog.isDateLike = function(val) {
  return goog.isObject(val) && typeof val.getFullYear == "function"
};
goog.isString = function(val) {
  return typeof val == "string"
};
goog.isBoolean = function(val) {
  return typeof val == "boolean"
};
goog.isNumber = function(val) {
  return typeof val == "number"
};
goog.isFunction = function(val) {
  return goog.typeOf(val) == "function"
};
goog.isObject = function(val) {
  var type = goog.typeOf(val);
  return type == "object" || type == "array" || type == "function"
};
goog.getUid = function(obj) {
  return obj[goog.UID_PROPERTY_] || (obj[goog.UID_PROPERTY_] = ++goog.uidCounter_)
};
goog.removeUid = function(obj) {
  if("removeAttribute" in obj) {
    obj.removeAttribute(goog.UID_PROPERTY_)
  }
  try {
    delete obj[goog.UID_PROPERTY_]
  }catch(ex) {
  }
};
goog.UID_PROPERTY_ = "closure_uid_" + Math.floor(Math.random() * 2147483648).toString(36);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function(obj) {
  var type = goog.typeOf(obj);
  if(type == "object" || type == "array") {
    if(obj.clone) {
      return obj.clone()
    }
    var clone = type == "array" ? [] : {};
    for(var key in obj) {
      clone[key] = goog.cloneObject(obj[key])
    }
    return clone
  }
  return obj
};
Object.prototype.clone;
goog.bindNative_ = function(fn, selfObj, var_args) {
  return fn.call.apply(fn.bind, arguments)
};
goog.bindJs_ = function(fn, selfObj, var_args) {
  var context = selfObj || goog.global;
  if(arguments.length > 2) {
    var boundArgs = Array.prototype.slice.call(arguments, 2);
    return function() {
      var newArgs = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(newArgs, boundArgs);
      return fn.apply(context, newArgs)
    }
  }else {
    return function() {
      return fn.apply(context, arguments)
    }
  }
};
goog.bind = function(fn, selfObj, var_args) {
  if(Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1) {
    goog.bind = goog.bindNative_
  }else {
    goog.bind = goog.bindJs_
  }
  return goog.bind.apply(null, arguments)
};
goog.partial = function(fn, var_args) {
  var args = Array.prototype.slice.call(arguments, 1);
  return function() {
    var newArgs = Array.prototype.slice.call(arguments);
    newArgs.unshift.apply(newArgs, args);
    return fn.apply(this, newArgs)
  }
};
goog.mixin = function(target, source) {
  for(var x in source) {
    target[x] = source[x]
  }
};
goog.now = Date.now || function() {
  return+new Date
};
goog.globalEval = function(script) {
  if(goog.global.execScript) {
    goog.global.execScript(script, "JavaScript")
  }else {
    if(goog.global.eval) {
      if(goog.evalWorksForGlobals_ == null) {
        goog.global.eval("var _et_ = 1;");
        if(typeof goog.global["_et_"] != "undefined") {
          delete goog.global["_et_"];
          goog.evalWorksForGlobals_ = true
        }else {
          goog.evalWorksForGlobals_ = false
        }
      }
      if(goog.evalWorksForGlobals_) {
        goog.global.eval(script)
      }else {
        var doc = goog.global.document;
        var scriptElt = doc.createElement("script");
        scriptElt.type = "text/javascript";
        scriptElt.defer = false;
        scriptElt.appendChild(doc.createTextNode(script));
        doc.body.appendChild(scriptElt);
        doc.body.removeChild(scriptElt)
      }
    }else {
      throw Error("goog.globalEval not available");
    }
  }
};
goog.cssNameMapping_;
goog.cssNameMappingStyle_;
goog.getCssName = function(className, opt_modifier) {
  var getMapping = function(cssName) {
    return goog.cssNameMapping_[cssName] || cssName
  };
  var renameByParts = function(cssName) {
    var parts = cssName.split("-");
    var mapped = [];
    for(var i = 0;i < parts.length;i++) {
      mapped.push(getMapping(parts[i]))
    }
    return mapped.join("-")
  };
  var rename;
  if(goog.cssNameMapping_) {
    rename = goog.cssNameMappingStyle_ == "BY_WHOLE" ? getMapping : renameByParts
  }else {
    rename = function(a) {
      return a
    }
  }
  if(opt_modifier) {
    return className + "-" + rename(opt_modifier)
  }else {
    return rename(className)
  }
};
goog.setCssNameMapping = function(mapping, style) {
  goog.cssNameMapping_ = mapping;
  goog.cssNameMappingStyle_ = style
};
goog.getMsg = function(str, opt_values) {
  var values = opt_values || {};
  for(var key in values) {
    var value = ("" + values[key]).replace(/\$/g, "$$$$");
    str = str.replace(new RegExp("\\{\\$" + key + "\\}", "gi"), value)
  }
  return str
};
goog.exportSymbol = function(publicPath, object, opt_objectToExportTo) {
  goog.exportPath_(publicPath, object, opt_objectToExportTo)
};
goog.exportProperty = function(object, publicName, symbol) {
  object[publicName] = symbol
};
goog.inherits = function(childCtor, parentCtor) {
  function tempCtor() {
  }
  tempCtor.prototype = parentCtor.prototype;
  childCtor.superClass_ = parentCtor.prototype;
  childCtor.prototype = new tempCtor;
  childCtor.prototype.constructor = childCtor
};
goog.base = function(me, opt_methodName, var_args) {
  var caller = arguments.callee.caller;
  if(caller.superClass_) {
    return caller.superClass_.constructor.apply(me, Array.prototype.slice.call(arguments, 1))
  }
  var args = Array.prototype.slice.call(arguments, 2);
  var foundCaller = false;
  for(var ctor = me.constructor;ctor;ctor = ctor.superClass_ && ctor.superClass_.constructor) {
    if(ctor.prototype[opt_methodName] === caller) {
      foundCaller = true
    }else {
      if(foundCaller) {
        return ctor.prototype[opt_methodName].apply(me, args)
      }
    }
  }
  if(me[opt_methodName] === caller) {
    return me.constructor.prototype[opt_methodName].apply(me, args)
  }else {
    throw Error("goog.base called from a method of one name " + "to a method of a different name");
  }
};
goog.scope = function(fn) {
  fn.call(goog.global)
};
goog.provide("goog.string");
goog.provide("goog.string.Unicode");
goog.string.Unicode = {NBSP:"\u00a0"};
goog.string.startsWith = function(str, prefix) {
  return str.lastIndexOf(prefix, 0) == 0
};
goog.string.endsWith = function(str, suffix) {
  var l = str.length - suffix.length;
  return l >= 0 && str.indexOf(suffix, l) == l
};
goog.string.caseInsensitiveStartsWith = function(str, prefix) {
  return goog.string.caseInsensitiveCompare(prefix, str.substr(0, prefix.length)) == 0
};
goog.string.caseInsensitiveEndsWith = function(str, suffix) {
  return goog.string.caseInsensitiveCompare(suffix, str.substr(str.length - suffix.length, suffix.length)) == 0
};
goog.string.subs = function(str, var_args) {
  for(var i = 1;i < arguments.length;i++) {
    var replacement = String(arguments[i]).replace(/\$/g, "$$$$");
    str = str.replace(/\%s/, replacement)
  }
  return str
};
goog.string.collapseWhitespace = function(str) {
  return str.replace(/[\s\xa0]+/g, " ").replace(/^\s+|\s+$/g, "")
};
goog.string.isEmpty = function(str) {
  return/^[\s\xa0]*$/.test(str)
};
goog.string.isEmptySafe = function(str) {
  return goog.string.isEmpty(goog.string.makeSafe(str))
};
goog.string.isBreakingWhitespace = function(str) {
  return!/[^\t\n\r ]/.test(str)
};
goog.string.isAlpha = function(str) {
  return!/[^a-zA-Z]/.test(str)
};
goog.string.isNumeric = function(str) {
  return!/[^0-9]/.test(str)
};
goog.string.isAlphaNumeric = function(str) {
  return!/[^a-zA-Z0-9]/.test(str)
};
goog.string.isSpace = function(ch) {
  return ch == " "
};
goog.string.isUnicodeChar = function(ch) {
  return ch.length == 1 && ch >= " " && ch <= "~" || ch >= "\u0080" && ch <= "\ufffd"
};
goog.string.stripNewlines = function(str) {
  return str.replace(/(\r\n|\r|\n)+/g, " ")
};
goog.string.canonicalizeNewlines = function(str) {
  return str.replace(/(\r\n|\r|\n)/g, "\n")
};
goog.string.normalizeWhitespace = function(str) {
  return str.replace(/\xa0|\s/g, " ")
};
goog.string.normalizeSpaces = function(str) {
  return str.replace(/\xa0|[ \t]+/g, " ")
};
goog.string.trim = function(str) {
  return str.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
};
goog.string.trimLeft = function(str) {
  return str.replace(/^[\s\xa0]+/, "")
};
goog.string.trimRight = function(str) {
  return str.replace(/[\s\xa0]+$/, "")
};
goog.string.caseInsensitiveCompare = function(str1, str2) {
  var test1 = String(str1).toLowerCase();
  var test2 = String(str2).toLowerCase();
  if(test1 < test2) {
    return-1
  }else {
    if(test1 == test2) {
      return 0
    }else {
      return 1
    }
  }
};
goog.string.numerateCompareRegExp_ = /(\.\d+)|(\d+)|(\D+)/g;
goog.string.numerateCompare = function(str1, str2) {
  if(str1 == str2) {
    return 0
  }
  if(!str1) {
    return-1
  }
  if(!str2) {
    return 1
  }
  var tokens1 = str1.toLowerCase().match(goog.string.numerateCompareRegExp_);
  var tokens2 = str2.toLowerCase().match(goog.string.numerateCompareRegExp_);
  var count = Math.min(tokens1.length, tokens2.length);
  for(var i = 0;i < count;i++) {
    var a = tokens1[i];
    var b = tokens2[i];
    if(a != b) {
      var num1 = parseInt(a, 10);
      if(!isNaN(num1)) {
        var num2 = parseInt(b, 10);
        if(!isNaN(num2) && num1 - num2) {
          return num1 - num2
        }
      }
      return a < b ? -1 : 1
    }
  }
  if(tokens1.length != tokens2.length) {
    return tokens1.length - tokens2.length
  }
  return str1 < str2 ? -1 : 1
};
goog.string.encodeUriRegExp_ = /^[a-zA-Z0-9\-_.!~*'()]*$/;
goog.string.urlEncode = function(str) {
  str = String(str);
  if(!goog.string.encodeUriRegExp_.test(str)) {
    return encodeURIComponent(str)
  }
  return str
};
goog.string.urlDecode = function(str) {
  return decodeURIComponent(str.replace(/\+/g, " "))
};
goog.string.newLineToBr = function(str, opt_xml) {
  return str.replace(/(\r\n|\r|\n)/g, opt_xml ? "<br />" : "<br>")
};
goog.string.htmlEscape = function(str, opt_isLikelyToContainHtmlChars) {
  if(opt_isLikelyToContainHtmlChars) {
    return str.replace(goog.string.amperRe_, "&amp;").replace(goog.string.ltRe_, "&lt;").replace(goog.string.gtRe_, "&gt;").replace(goog.string.quotRe_, "&quot;")
  }else {
    if(!goog.string.allRe_.test(str)) {
      return str
    }
    if(str.indexOf("&") != -1) {
      str = str.replace(goog.string.amperRe_, "&amp;")
    }
    if(str.indexOf("<") != -1) {
      str = str.replace(goog.string.ltRe_, "&lt;")
    }
    if(str.indexOf(">") != -1) {
      str = str.replace(goog.string.gtRe_, "&gt;")
    }
    if(str.indexOf('"') != -1) {
      str = str.replace(goog.string.quotRe_, "&quot;")
    }
    return str
  }
};
goog.string.amperRe_ = /&/g;
goog.string.ltRe_ = /</g;
goog.string.gtRe_ = />/g;
goog.string.quotRe_ = /\"/g;
goog.string.allRe_ = /[&<>\"]/;
goog.string.unescapeEntities = function(str) {
  if(goog.string.contains(str, "&")) {
    if("document" in goog.global && !goog.string.contains(str, "<")) {
      return goog.string.unescapeEntitiesUsingDom_(str)
    }else {
      return goog.string.unescapePureXmlEntities_(str)
    }
  }
  return str
};
goog.string.unescapeEntitiesUsingDom_ = function(str) {
  var el = goog.global["document"]["createElement"]("div");
  el["innerHTML"] = "<pre>x" + str + "</pre>";
  if(el["firstChild"][goog.string.NORMALIZE_FN_]) {
    el["firstChild"][goog.string.NORMALIZE_FN_]()
  }
  str = el["firstChild"]["firstChild"]["nodeValue"].slice(1);
  el["innerHTML"] = "";
  return goog.string.canonicalizeNewlines(str)
};
goog.string.unescapePureXmlEntities_ = function(str) {
  return str.replace(/&([^;]+);/g, function(s, entity) {
    switch(entity) {
      case "amp":
        return"&";
      case "lt":
        return"<";
      case "gt":
        return">";
      case "quot":
        return'"';
      default:
        if(entity.charAt(0) == "#") {
          var n = Number("0" + entity.substr(1));
          if(!isNaN(n)) {
            return String.fromCharCode(n)
          }
        }
        return s
    }
  })
};
goog.string.NORMALIZE_FN_ = "normalize";
goog.string.whitespaceEscape = function(str, opt_xml) {
  return goog.string.newLineToBr(str.replace(/  /g, " &#160;"), opt_xml)
};
goog.string.stripQuotes = function(str, quoteChars) {
  var length = quoteChars.length;
  for(var i = 0;i < length;i++) {
    var quoteChar = length == 1 ? quoteChars : quoteChars.charAt(i);
    if(str.charAt(0) == quoteChar && str.charAt(str.length - 1) == quoteChar) {
      return str.substring(1, str.length - 1)
    }
  }
  return str
};
goog.string.truncate = function(str, chars, opt_protectEscapedCharacters) {
  if(opt_protectEscapedCharacters) {
    str = goog.string.unescapeEntities(str)
  }
  if(str.length > chars) {
    str = str.substring(0, chars - 3) + "..."
  }
  if(opt_protectEscapedCharacters) {
    str = goog.string.htmlEscape(str)
  }
  return str
};
goog.string.truncateMiddle = function(str, chars, opt_protectEscapedCharacters, opt_trailingChars) {
  if(opt_protectEscapedCharacters) {
    str = goog.string.unescapeEntities(str)
  }
  if(opt_trailingChars) {
    if(opt_trailingChars > chars) {
      opt_trailingChars = chars
    }
    var endPoint = str.length - opt_trailingChars;
    var startPoint = chars - opt_trailingChars;
    str = str.substring(0, startPoint) + "..." + str.substring(endPoint)
  }else {
    if(str.length > chars) {
      var half = Math.floor(chars / 2);
      var endPos = str.length - half;
      half += chars % 2;
      str = str.substring(0, half) + "..." + str.substring(endPos)
    }
  }
  if(opt_protectEscapedCharacters) {
    str = goog.string.htmlEscape(str)
  }
  return str
};
goog.string.specialEscapeChars_ = {"\x00":"\\0", "\u0008":"\\b", "\u000c":"\\f", "\n":"\\n", "\r":"\\r", "\t":"\\t", "\u000b":"\\x0B", '"':'\\"', "\\":"\\\\"};
goog.string.jsEscapeCache_ = {"'":"\\'"};
goog.string.quote = function(s) {
  s = String(s);
  if(s.quote) {
    return s.quote()
  }else {
    var sb = ['"'];
    for(var i = 0;i < s.length;i++) {
      var ch = s.charAt(i);
      var cc = ch.charCodeAt(0);
      sb[i + 1] = goog.string.specialEscapeChars_[ch] || (cc > 31 && cc < 127 ? ch : goog.string.escapeChar(ch))
    }
    sb.push('"');
    return sb.join("")
  }
};
goog.string.escapeString = function(str) {
  var sb = [];
  for(var i = 0;i < str.length;i++) {
    sb[i] = goog.string.escapeChar(str.charAt(i))
  }
  return sb.join("")
};
goog.string.escapeChar = function(c) {
  if(c in goog.string.jsEscapeCache_) {
    return goog.string.jsEscapeCache_[c]
  }
  if(c in goog.string.specialEscapeChars_) {
    return goog.string.jsEscapeCache_[c] = goog.string.specialEscapeChars_[c]
  }
  var rv = c;
  var cc = c.charCodeAt(0);
  if(cc > 31 && cc < 127) {
    rv = c
  }else {
    if(cc < 256) {
      rv = "\\x";
      if(cc < 16 || cc > 256) {
        rv += "0"
      }
    }else {
      rv = "\\u";
      if(cc < 4096) {
        rv += "0"
      }
    }
    rv += cc.toString(16).toUpperCase()
  }
  return goog.string.jsEscapeCache_[c] = rv
};
goog.string.toMap = function(s) {
  var rv = {};
  for(var i = 0;i < s.length;i++) {
    rv[s.charAt(i)] = true
  }
  return rv
};
goog.string.contains = function(s, ss) {
  return s.indexOf(ss) != -1
};
goog.string.removeAt = function(s, index, stringLength) {
  var resultStr = s;
  if(index >= 0 && index < s.length && stringLength > 0) {
    resultStr = s.substr(0, index) + s.substr(index + stringLength, s.length - index - stringLength)
  }
  return resultStr
};
goog.string.remove = function(s, ss) {
  var re = new RegExp(goog.string.regExpEscape(ss), "");
  return s.replace(re, "")
};
goog.string.removeAll = function(s, ss) {
  var re = new RegExp(goog.string.regExpEscape(ss), "g");
  return s.replace(re, "")
};
goog.string.regExpEscape = function(s) {
  return String(s).replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, "\\$1").replace(/\x08/g, "\\x08")
};
goog.string.repeat = function(string, length) {
  return(new Array(length + 1)).join(string)
};
goog.string.padNumber = function(num, length, opt_precision) {
  var s = goog.isDef(opt_precision) ? num.toFixed(opt_precision) : String(num);
  var index = s.indexOf(".");
  if(index == -1) {
    index = s.length
  }
  return goog.string.repeat("0", Math.max(0, length - index)) + s
};
goog.string.makeSafe = function(obj) {
  return obj == null ? "" : String(obj)
};
goog.string.buildString = function(var_args) {
  return Array.prototype.join.call(arguments, "")
};
goog.string.getRandomString = function() {
  var x = 2147483648;
  return Math.floor(Math.random() * x).toString(36) + Math.abs(Math.floor(Math.random() * x) ^ goog.now()).toString(36)
};
goog.string.compareVersions = function(version1, version2) {
  var order = 0;
  var v1Subs = goog.string.trim(String(version1)).split(".");
  var v2Subs = goog.string.trim(String(version2)).split(".");
  var subCount = Math.max(v1Subs.length, v2Subs.length);
  for(var subIdx = 0;order == 0 && subIdx < subCount;subIdx++) {
    var v1Sub = v1Subs[subIdx] || "";
    var v2Sub = v2Subs[subIdx] || "";
    var v1CompParser = new RegExp("(\\d*)(\\D*)", "g");
    var v2CompParser = new RegExp("(\\d*)(\\D*)", "g");
    do {
      var v1Comp = v1CompParser.exec(v1Sub) || ["", "", ""];
      var v2Comp = v2CompParser.exec(v2Sub) || ["", "", ""];
      if(v1Comp[0].length == 0 && v2Comp[0].length == 0) {
        break
      }
      var v1CompNum = v1Comp[1].length == 0 ? 0 : parseInt(v1Comp[1], 10);
      var v2CompNum = v2Comp[1].length == 0 ? 0 : parseInt(v2Comp[1], 10);
      order = goog.string.compareElements_(v1CompNum, v2CompNum) || goog.string.compareElements_(v1Comp[2].length == 0, v2Comp[2].length == 0) || goog.string.compareElements_(v1Comp[2], v2Comp[2])
    }while(order == 0)
  }
  return order
};
goog.string.compareElements_ = function(left, right) {
  if(left < right) {
    return-1
  }else {
    if(left > right) {
      return 1
    }
  }
  return 0
};
goog.string.HASHCODE_MAX_ = 4294967296;
goog.string.hashCode = function(str) {
  var result = 0;
  for(var i = 0;i < str.length;++i) {
    result = 31 * result + str.charCodeAt(i);
    result %= goog.string.HASHCODE_MAX_
  }
  return result
};
goog.string.uniqueStringCounter_ = Math.random() * 2147483648 | 0;
goog.string.createUniqueString = function() {
  return"goog_" + goog.string.uniqueStringCounter_++
};
goog.string.toNumber = function(str) {
  var num = Number(str);
  if(num == 0 && goog.string.isEmpty(str)) {
    return NaN
  }
  return num
};
goog.string.toCamelCaseCache_ = {};
goog.string.toCamelCase = function(str) {
  return goog.string.toCamelCaseCache_[str] || (goog.string.toCamelCaseCache_[str] = String(str).replace(/\-([a-z])/g, function(all, match) {
    return match.toUpperCase()
  }))
};
goog.string.toSelectorCaseCache_ = {};
goog.string.toSelectorCase = function(str) {
  return goog.string.toSelectorCaseCache_[str] || (goog.string.toSelectorCaseCache_[str] = String(str).replace(/([A-Z])/g, "-$1").toLowerCase())
};
goog.provide("goog.userAgent.jscript");
goog.require("goog.string");
goog.userAgent.jscript.ASSUME_NO_JSCRIPT = false;
goog.userAgent.jscript.init_ = function() {
  var hasScriptEngine = "ScriptEngine" in goog.global;
  goog.userAgent.jscript.DETECTED_HAS_JSCRIPT_ = hasScriptEngine && goog.global["ScriptEngine"]() == "JScript";
  goog.userAgent.jscript.DETECTED_VERSION_ = goog.userAgent.jscript.DETECTED_HAS_JSCRIPT_ ? goog.global["ScriptEngineMajorVersion"]() + "." + goog.global["ScriptEngineMinorVersion"]() + "." + goog.global["ScriptEngineBuildVersion"]() : "0"
};
if(!goog.userAgent.jscript.ASSUME_NO_JSCRIPT) {
  goog.userAgent.jscript.init_()
}
goog.userAgent.jscript.HAS_JSCRIPT = goog.userAgent.jscript.ASSUME_NO_JSCRIPT ? false : goog.userAgent.jscript.DETECTED_HAS_JSCRIPT_;
goog.userAgent.jscript.VERSION = goog.userAgent.jscript.ASSUME_NO_JSCRIPT ? "0" : goog.userAgent.jscript.DETECTED_VERSION_;
goog.userAgent.jscript.isVersion = function(version) {
  return goog.string.compareVersions(goog.userAgent.jscript.VERSION, version) >= 0
};
goog.provide("goog.string.StringBuffer");
goog.require("goog.userAgent.jscript");
goog.string.StringBuffer = function(opt_a1, var_args) {
  this.buffer_ = goog.userAgent.jscript.HAS_JSCRIPT ? [] : "";
  if(opt_a1 != null) {
    this.append.apply(this, arguments)
  }
};
goog.string.StringBuffer.prototype.set = function(s) {
  this.clear();
  this.append(s)
};
if(goog.userAgent.jscript.HAS_JSCRIPT) {
  goog.string.StringBuffer.prototype.bufferLength_ = 0;
  goog.string.StringBuffer.prototype.append = function(a1, opt_a2, var_args) {
    if(opt_a2 == null) {
      this.buffer_[this.bufferLength_++] = a1
    }else {
      this.buffer_.push.apply(this.buffer_, arguments);
      this.bufferLength_ = this.buffer_.length
    }
    return this
  }
}else {
  goog.string.StringBuffer.prototype.append = function(a1, opt_a2, var_args) {
    this.buffer_ += a1;
    if(opt_a2 != null) {
      for(var i = 1;i < arguments.length;i++) {
        this.buffer_ += arguments[i]
      }
    }
    return this
  }
}
goog.string.StringBuffer.prototype.clear = function() {
  if(goog.userAgent.jscript.HAS_JSCRIPT) {
    this.buffer_.length = 0;
    this.bufferLength_ = 0
  }else {
    this.buffer_ = ""
  }
};
goog.string.StringBuffer.prototype.getLength = function() {
  return this.toString().length
};
goog.string.StringBuffer.prototype.toString = function() {
  if(goog.userAgent.jscript.HAS_JSCRIPT) {
    var str = this.buffer_.join("");
    this.clear();
    if(str) {
      this.append(str)
    }
    return str
  }else {
    return this.buffer_
  }
};
goog.provide("goog.debug.Error");
goog.debug.Error = function(opt_msg) {
  this.stack = (new Error).stack || "";
  if(opt_msg) {
    this.message = String(opt_msg)
  }
};
goog.inherits(goog.debug.Error, Error);
goog.debug.Error.prototype.name = "CustomError";
goog.provide("goog.asserts");
goog.provide("goog.asserts.AssertionError");
goog.require("goog.debug.Error");
goog.require("goog.string");
goog.asserts.ENABLE_ASSERTS = goog.DEBUG;
goog.asserts.AssertionError = function(messagePattern, messageArgs) {
  messageArgs.unshift(messagePattern);
  goog.debug.Error.call(this, goog.string.subs.apply(null, messageArgs));
  messageArgs.shift();
  this.messagePattern = messagePattern
};
goog.inherits(goog.asserts.AssertionError, goog.debug.Error);
goog.asserts.AssertionError.prototype.name = "AssertionError";
goog.asserts.doAssertFailure_ = function(defaultMessage, defaultArgs, givenMessage, givenArgs) {
  var message = "Assertion failed";
  if(givenMessage) {
    message += ": " + givenMessage;
    var args = givenArgs
  }else {
    if(defaultMessage) {
      message += ": " + defaultMessage;
      args = defaultArgs
    }
  }
  throw new goog.asserts.AssertionError("" + message, args || []);
};
goog.asserts.assert = function(condition, opt_message, var_args) {
  if(goog.asserts.ENABLE_ASSERTS && !condition) {
    goog.asserts.doAssertFailure_("", null, opt_message, Array.prototype.slice.call(arguments, 2))
  }
  return condition
};
goog.asserts.fail = function(opt_message, var_args) {
  if(goog.asserts.ENABLE_ASSERTS) {
    throw new goog.asserts.AssertionError("Failure" + (opt_message ? ": " + opt_message : ""), Array.prototype.slice.call(arguments, 1));
  }
};
goog.asserts.assertNumber = function(value, opt_message, var_args) {
  if(goog.asserts.ENABLE_ASSERTS && !goog.isNumber(value)) {
    goog.asserts.doAssertFailure_("Expected number but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2))
  }
  return value
};
goog.asserts.assertString = function(value, opt_message, var_args) {
  if(goog.asserts.ENABLE_ASSERTS && !goog.isString(value)) {
    goog.asserts.doAssertFailure_("Expected string but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2))
  }
  return value
};
goog.asserts.assertFunction = function(value, opt_message, var_args) {
  if(goog.asserts.ENABLE_ASSERTS && !goog.isFunction(value)) {
    goog.asserts.doAssertFailure_("Expected function but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2))
  }
  return value
};
goog.asserts.assertObject = function(value, opt_message, var_args) {
  if(goog.asserts.ENABLE_ASSERTS && !goog.isObject(value)) {
    goog.asserts.doAssertFailure_("Expected object but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2))
  }
  return value
};
goog.asserts.assertArray = function(value, opt_message, var_args) {
  if(goog.asserts.ENABLE_ASSERTS && !goog.isArray(value)) {
    goog.asserts.doAssertFailure_("Expected array but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2))
  }
  return value
};
goog.asserts.assertBoolean = function(value, opt_message, var_args) {
  if(goog.asserts.ENABLE_ASSERTS && !goog.isBoolean(value)) {
    goog.asserts.doAssertFailure_("Expected boolean but got %s: %s.", [goog.typeOf(value), value], opt_message, Array.prototype.slice.call(arguments, 2))
  }
  return value
};
goog.asserts.assertInstanceof = function(value, type, opt_message, var_args) {
  if(goog.asserts.ENABLE_ASSERTS && !(value instanceof type)) {
    goog.asserts.doAssertFailure_("instanceof check failed.", null, opt_message, Array.prototype.slice.call(arguments, 3))
  }
};
goog.provide("goog.array");
goog.provide("goog.array.ArrayLike");
goog.require("goog.asserts");
goog.NATIVE_ARRAY_PROTOTYPES = true;
goog.array.ArrayLike;
goog.array.peek = function(array) {
  return array[array.length - 1]
};
goog.array.ARRAY_PROTOTYPE_ = Array.prototype;
goog.array.indexOf = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.indexOf ? function(arr, obj, opt_fromIndex) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.indexOf.call(arr, obj, opt_fromIndex)
} : function(arr, obj, opt_fromIndex) {
  var fromIndex = opt_fromIndex == null ? 0 : opt_fromIndex < 0 ? Math.max(0, arr.length + opt_fromIndex) : opt_fromIndex;
  if(goog.isString(arr)) {
    if(!goog.isString(obj) || obj.length != 1) {
      return-1
    }
    return arr.indexOf(obj, fromIndex)
  }
  for(var i = fromIndex;i < arr.length;i++) {
    if(i in arr && arr[i] === obj) {
      return i
    }
  }
  return-1
};
goog.array.lastIndexOf = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.lastIndexOf ? function(arr, obj, opt_fromIndex) {
  goog.asserts.assert(arr.length != null);
  var fromIndex = opt_fromIndex == null ? arr.length - 1 : opt_fromIndex;
  return goog.array.ARRAY_PROTOTYPE_.lastIndexOf.call(arr, obj, fromIndex)
} : function(arr, obj, opt_fromIndex) {
  var fromIndex = opt_fromIndex == null ? arr.length - 1 : opt_fromIndex;
  if(fromIndex < 0) {
    fromIndex = Math.max(0, arr.length + fromIndex)
  }
  if(goog.isString(arr)) {
    if(!goog.isString(obj) || obj.length != 1) {
      return-1
    }
    return arr.lastIndexOf(obj, fromIndex)
  }
  for(var i = fromIndex;i >= 0;i--) {
    if(i in arr && arr[i] === obj) {
      return i
    }
  }
  return-1
};
goog.array.forEach = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.forEach ? function(arr, f, opt_obj) {
  goog.asserts.assert(arr.length != null);
  goog.array.ARRAY_PROTOTYPE_.forEach.call(arr, f, opt_obj)
} : function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for(var i = 0;i < l;i++) {
    if(i in arr2) {
      f.call(opt_obj, arr2[i], i, arr)
    }
  }
};
goog.array.forEachRight = function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for(var i = l - 1;i >= 0;--i) {
    if(i in arr2) {
      f.call(opt_obj, arr2[i], i, arr)
    }
  }
};
goog.array.filter = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.filter ? function(arr, f, opt_obj) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.filter.call(arr, f, opt_obj)
} : function(arr, f, opt_obj) {
  var l = arr.length;
  var res = [];
  var resLength = 0;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for(var i = 0;i < l;i++) {
    if(i in arr2) {
      var val = arr2[i];
      if(f.call(opt_obj, val, i, arr)) {
        res[resLength++] = val
      }
    }
  }
  return res
};
goog.array.map = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.map ? function(arr, f, opt_obj) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.map.call(arr, f, opt_obj)
} : function(arr, f, opt_obj) {
  var l = arr.length;
  var res = new Array(l);
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for(var i = 0;i < l;i++) {
    if(i in arr2) {
      res[i] = f.call(opt_obj, arr2[i], i, arr)
    }
  }
  return res
};
goog.array.reduce = function(arr, f, val, opt_obj) {
  if(arr.reduce) {
    if(opt_obj) {
      return arr.reduce(goog.bind(f, opt_obj), val)
    }else {
      return arr.reduce(f, val)
    }
  }
  var rval = val;
  goog.array.forEach(arr, function(val, index) {
    rval = f.call(opt_obj, rval, val, index, arr)
  });
  return rval
};
goog.array.reduceRight = function(arr, f, val, opt_obj) {
  if(arr.reduceRight) {
    if(opt_obj) {
      return arr.reduceRight(goog.bind(f, opt_obj), val)
    }else {
      return arr.reduceRight(f, val)
    }
  }
  var rval = val;
  goog.array.forEachRight(arr, function(val, index) {
    rval = f.call(opt_obj, rval, val, index, arr)
  });
  return rval
};
goog.array.some = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.some ? function(arr, f, opt_obj) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.some.call(arr, f, opt_obj)
} : function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for(var i = 0;i < l;i++) {
    if(i in arr2 && f.call(opt_obj, arr2[i], i, arr)) {
      return true
    }
  }
  return false
};
goog.array.every = goog.NATIVE_ARRAY_PROTOTYPES && goog.array.ARRAY_PROTOTYPE_.every ? function(arr, f, opt_obj) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.every.call(arr, f, opt_obj)
} : function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for(var i = 0;i < l;i++) {
    if(i in arr2 && !f.call(opt_obj, arr2[i], i, arr)) {
      return false
    }
  }
  return true
};
goog.array.find = function(arr, f, opt_obj) {
  var i = goog.array.findIndex(arr, f, opt_obj);
  return i < 0 ? null : goog.isString(arr) ? arr.charAt(i) : arr[i]
};
goog.array.findIndex = function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for(var i = 0;i < l;i++) {
    if(i in arr2 && f.call(opt_obj, arr2[i], i, arr)) {
      return i
    }
  }
  return-1
};
goog.array.findRight = function(arr, f, opt_obj) {
  var i = goog.array.findIndexRight(arr, f, opt_obj);
  return i < 0 ? null : goog.isString(arr) ? arr.charAt(i) : arr[i]
};
goog.array.findIndexRight = function(arr, f, opt_obj) {
  var l = arr.length;
  var arr2 = goog.isString(arr) ? arr.split("") : arr;
  for(var i = l - 1;i >= 0;i--) {
    if(i in arr2 && f.call(opt_obj, arr2[i], i, arr)) {
      return i
    }
  }
  return-1
};
goog.array.contains = function(arr, obj) {
  return goog.array.indexOf(arr, obj) >= 0
};
goog.array.isEmpty = function(arr) {
  return arr.length == 0
};
goog.array.clear = function(arr) {
  if(!goog.isArray(arr)) {
    for(var i = arr.length - 1;i >= 0;i--) {
      delete arr[i]
    }
  }
  arr.length = 0
};
goog.array.insert = function(arr, obj) {
  if(!goog.array.contains(arr, obj)) {
    arr.push(obj)
  }
};
goog.array.insertAt = function(arr, obj, opt_i) {
  goog.array.splice(arr, opt_i, 0, obj)
};
goog.array.insertArrayAt = function(arr, elementsToAdd, opt_i) {
  goog.partial(goog.array.splice, arr, opt_i, 0).apply(null, elementsToAdd)
};
goog.array.insertBefore = function(arr, obj, opt_obj2) {
  var i;
  if(arguments.length == 2 || (i = goog.array.indexOf(arr, opt_obj2)) < 0) {
    arr.push(obj)
  }else {
    goog.array.insertAt(arr, obj, i)
  }
};
goog.array.remove = function(arr, obj) {
  var i = goog.array.indexOf(arr, obj);
  var rv;
  if(rv = i >= 0) {
    goog.array.removeAt(arr, i)
  }
  return rv
};
goog.array.removeAt = function(arr, i) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.splice.call(arr, i, 1).length == 1
};
goog.array.removeIf = function(arr, f, opt_obj) {
  var i = goog.array.findIndex(arr, f, opt_obj);
  if(i >= 0) {
    goog.array.removeAt(arr, i);
    return true
  }
  return false
};
goog.array.concat = function(var_args) {
  return goog.array.ARRAY_PROTOTYPE_.concat.apply(goog.array.ARRAY_PROTOTYPE_, arguments)
};
goog.array.clone = function(arr) {
  if(goog.isArray(arr)) {
    return goog.array.concat(arr)
  }else {
    var rv = [];
    for(var i = 0, len = arr.length;i < len;i++) {
      rv[i] = arr[i]
    }
    return rv
  }
};
goog.array.toArray = function(object) {
  if(goog.isArray(object)) {
    return goog.array.concat(object)
  }
  return goog.array.clone(object)
};
goog.array.extend = function(arr1, var_args) {
  for(var i = 1;i < arguments.length;i++) {
    var arr2 = arguments[i];
    var isArrayLike;
    if(goog.isArray(arr2) || (isArrayLike = goog.isArrayLike(arr2)) && arr2.hasOwnProperty("callee")) {
      arr1.push.apply(arr1, arr2)
    }else {
      if(isArrayLike) {
        var len1 = arr1.length;
        var len2 = arr2.length;
        for(var j = 0;j < len2;j++) {
          arr1[len1 + j] = arr2[j]
        }
      }else {
        arr1.push(arr2)
      }
    }
  }
};
goog.array.splice = function(arr, index, howMany, var_args) {
  goog.asserts.assert(arr.length != null);
  return goog.array.ARRAY_PROTOTYPE_.splice.apply(arr, goog.array.slice(arguments, 1))
};
goog.array.slice = function(arr, start, opt_end) {
  goog.asserts.assert(arr.length != null);
  if(arguments.length <= 2) {
    return goog.array.ARRAY_PROTOTYPE_.slice.call(arr, start)
  }else {
    return goog.array.ARRAY_PROTOTYPE_.slice.call(arr, start, opt_end)
  }
};
goog.array.removeDuplicates = function(arr, opt_rv) {
  var returnArray = opt_rv || arr;
  var seen = {}, cursorInsert = 0, cursorRead = 0;
  while(cursorRead < arr.length) {
    var current = arr[cursorRead++];
    var key = goog.isObject(current) ? "o" + goog.getUid(current) : (typeof current).charAt(0) + current;
    if(!Object.prototype.hasOwnProperty.call(seen, key)) {
      seen[key] = true;
      returnArray[cursorInsert++] = current
    }
  }
  returnArray.length = cursorInsert
};
goog.array.binarySearch = function(arr, target, opt_compareFn) {
  return goog.array.binarySearch_(arr, opt_compareFn || goog.array.defaultCompare, false, target)
};
goog.array.binarySelect = function(arr, evaluator, opt_obj) {
  return goog.array.binarySearch_(arr, evaluator, true, undefined, opt_obj)
};
goog.array.binarySearch_ = function(arr, compareFn, isEvaluator, opt_target, opt_selfObj) {
  var left = 0;
  var right = arr.length;
  var found;
  while(left < right) {
    var middle = left + right >> 1;
    var compareResult;
    if(isEvaluator) {
      compareResult = compareFn.call(opt_selfObj, arr[middle], middle, arr)
    }else {
      compareResult = compareFn(opt_target, arr[middle])
    }
    if(compareResult > 0) {
      left = middle + 1
    }else {
      right = middle;
      found = !compareResult
    }
  }
  return found ? left : ~left
};
goog.array.sort = function(arr, opt_compareFn) {
  goog.asserts.assert(arr.length != null);
  goog.array.ARRAY_PROTOTYPE_.sort.call(arr, opt_compareFn || goog.array.defaultCompare)
};
goog.array.stableSort = function(arr, opt_compareFn) {
  for(var i = 0;i < arr.length;i++) {
    arr[i] = {index:i, value:arr[i]}
  }
  var valueCompareFn = opt_compareFn || goog.array.defaultCompare;
  function stableCompareFn(obj1, obj2) {
    return valueCompareFn(obj1.value, obj2.value) || obj1.index - obj2.index
  }
  goog.array.sort(arr, stableCompareFn);
  for(var i = 0;i < arr.length;i++) {
    arr[i] = arr[i].value
  }
};
goog.array.sortObjectsByKey = function(arr, key, opt_compareFn) {
  var compare = opt_compareFn || goog.array.defaultCompare;
  goog.array.sort(arr, function(a, b) {
    return compare(a[key], b[key])
  })
};
goog.array.isSorted = function(arr, opt_compareFn, opt_strict) {
  var compare = opt_compareFn || goog.array.defaultCompare;
  for(var i = 1;i < arr.length;i++) {
    var compareResult = compare(arr[i - 1], arr[i]);
    if(compareResult > 0 || compareResult == 0 && opt_strict) {
      return false
    }
  }
  return true
};
goog.array.equals = function(arr1, arr2, opt_equalsFn) {
  if(!goog.isArrayLike(arr1) || !goog.isArrayLike(arr2) || arr1.length != arr2.length) {
    return false
  }
  var l = arr1.length;
  var equalsFn = opt_equalsFn || goog.array.defaultCompareEquality;
  for(var i = 0;i < l;i++) {
    if(!equalsFn(arr1[i], arr2[i])) {
      return false
    }
  }
  return true
};
goog.array.compare = function(arr1, arr2, opt_equalsFn) {
  return goog.array.equals(arr1, arr2, opt_equalsFn)
};
goog.array.defaultCompare = function(a, b) {
  return a > b ? 1 : a < b ? -1 : 0
};
goog.array.defaultCompareEquality = function(a, b) {
  return a === b
};
goog.array.binaryInsert = function(array, value, opt_compareFn) {
  var index = goog.array.binarySearch(array, value, opt_compareFn);
  if(index < 0) {
    goog.array.insertAt(array, value, -(index + 1));
    return true
  }
  return false
};
goog.array.binaryRemove = function(array, value, opt_compareFn) {
  var index = goog.array.binarySearch(array, value, opt_compareFn);
  return index >= 0 ? goog.array.removeAt(array, index) : false
};
goog.array.bucket = function(array, sorter) {
  var buckets = {};
  for(var i = 0;i < array.length;i++) {
    var value = array[i];
    var key = sorter(value, i, array);
    if(goog.isDef(key)) {
      var bucket = buckets[key] || (buckets[key] = []);
      bucket.push(value)
    }
  }
  return buckets
};
goog.array.repeat = function(value, n) {
  var array = [];
  for(var i = 0;i < n;i++) {
    array[i] = value
  }
  return array
};
goog.array.flatten = function(var_args) {
  var result = [];
  for(var i = 0;i < arguments.length;i++) {
    var element = arguments[i];
    if(goog.isArray(element)) {
      result.push.apply(result, goog.array.flatten.apply(null, element))
    }else {
      result.push(element)
    }
  }
  return result
};
goog.array.rotate = function(array, n) {
  goog.asserts.assert(array.length != null);
  if(array.length) {
    n %= array.length;
    if(n > 0) {
      goog.array.ARRAY_PROTOTYPE_.unshift.apply(array, array.splice(-n, n))
    }else {
      if(n < 0) {
        goog.array.ARRAY_PROTOTYPE_.push.apply(array, array.splice(0, -n))
      }
    }
  }
  return array
};
goog.array.zip = function(var_args) {
  if(!arguments.length) {
    return[]
  }
  var result = [];
  for(var i = 0;true;i++) {
    var value = [];
    for(var j = 0;j < arguments.length;j++) {
      var arr = arguments[j];
      if(i >= arr.length) {
        return result
      }
      value.push(arr[i])
    }
    result.push(value)
  }
};
goog.array.shuffle = function(arr, opt_randFn) {
  var randFn = opt_randFn || Math.random;
  for(var i = arr.length - 1;i > 0;i--) {
    var j = Math.floor(randFn() * (i + 1));
    var tmp = arr[i];
    arr[i] = arr[j];
    arr[j] = tmp
  }
};
goog.provide("goog.object");
goog.object.forEach = function(obj, f, opt_obj) {
  for(var key in obj) {
    f.call(opt_obj, obj[key], key, obj)
  }
};
goog.object.filter = function(obj, f, opt_obj) {
  var res = {};
  for(var key in obj) {
    if(f.call(opt_obj, obj[key], key, obj)) {
      res[key] = obj[key]
    }
  }
  return res
};
goog.object.map = function(obj, f, opt_obj) {
  var res = {};
  for(var key in obj) {
    res[key] = f.call(opt_obj, obj[key], key, obj)
  }
  return res
};
goog.object.some = function(obj, f, opt_obj) {
  for(var key in obj) {
    if(f.call(opt_obj, obj[key], key, obj)) {
      return true
    }
  }
  return false
};
goog.object.every = function(obj, f, opt_obj) {
  for(var key in obj) {
    if(!f.call(opt_obj, obj[key], key, obj)) {
      return false
    }
  }
  return true
};
goog.object.getCount = function(obj) {
  var rv = 0;
  for(var key in obj) {
    rv++
  }
  return rv
};
goog.object.getAnyKey = function(obj) {
  for(var key in obj) {
    return key
  }
};
goog.object.getAnyValue = function(obj) {
  for(var key in obj) {
    return obj[key]
  }
};
goog.object.contains = function(obj, val) {
  return goog.object.containsValue(obj, val)
};
goog.object.getValues = function(obj) {
  var res = [];
  var i = 0;
  for(var key in obj) {
    res[i++] = obj[key]
  }
  return res
};
goog.object.getKeys = function(obj) {
  var res = [];
  var i = 0;
  for(var key in obj) {
    res[i++] = key
  }
  return res
};
goog.object.getValueByKeys = function(obj, var_args) {
  var isArrayLike = goog.isArrayLike(var_args);
  var keys = isArrayLike ? var_args : arguments;
  for(var i = isArrayLike ? 0 : 1;i < keys.length;i++) {
    obj = obj[keys[i]];
    if(!goog.isDef(obj)) {
      break
    }
  }
  return obj
};
goog.object.containsKey = function(obj, key) {
  return key in obj
};
goog.object.containsValue = function(obj, val) {
  for(var key in obj) {
    if(obj[key] == val) {
      return true
    }
  }
  return false
};
goog.object.findKey = function(obj, f, opt_this) {
  for(var key in obj) {
    if(f.call(opt_this, obj[key], key, obj)) {
      return key
    }
  }
  return undefined
};
goog.object.findValue = function(obj, f, opt_this) {
  var key = goog.object.findKey(obj, f, opt_this);
  return key && obj[key]
};
goog.object.isEmpty = function(obj) {
  for(var key in obj) {
    return false
  }
  return true
};
goog.object.clear = function(obj) {
  for(var i in obj) {
    delete obj[i]
  }
};
goog.object.remove = function(obj, key) {
  var rv;
  if(rv = key in obj) {
    delete obj[key]
  }
  return rv
};
goog.object.add = function(obj, key, val) {
  if(key in obj) {
    throw Error('The object already contains the key "' + key + '"');
  }
  goog.object.set(obj, key, val)
};
goog.object.get = function(obj, key, opt_val) {
  if(key in obj) {
    return obj[key]
  }
  return opt_val
};
goog.object.set = function(obj, key, value) {
  obj[key] = value
};
goog.object.setIfUndefined = function(obj, key, value) {
  return key in obj ? obj[key] : obj[key] = value
};
goog.object.clone = function(obj) {
  var res = {};
  for(var key in obj) {
    res[key] = obj[key]
  }
  return res
};
goog.object.unsafeClone = function(obj) {
  var type = goog.typeOf(obj);
  if(type == "object" || type == "array") {
    if(obj.clone) {
      return obj.clone()
    }
    var clone = type == "array" ? [] : {};
    for(var key in obj) {
      clone[key] = goog.object.unsafeClone(obj[key])
    }
    return clone
  }
  return obj
};
goog.object.transpose = function(obj) {
  var transposed = {};
  for(var key in obj) {
    transposed[obj[key]] = key
  }
  return transposed
};
goog.object.PROTOTYPE_FIELDS_ = ["constructor", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "toLocaleString", "toString", "valueOf"];
goog.object.extend = function(target, var_args) {
  var key, source;
  for(var i = 1;i < arguments.length;i++) {
    source = arguments[i];
    for(key in source) {
      target[key] = source[key]
    }
    for(var j = 0;j < goog.object.PROTOTYPE_FIELDS_.length;j++) {
      key = goog.object.PROTOTYPE_FIELDS_[j];
      if(Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key]
      }
    }
  }
};
goog.object.create = function(var_args) {
  var argLength = arguments.length;
  if(argLength == 1 && goog.isArray(arguments[0])) {
    return goog.object.create.apply(null, arguments[0])
  }
  if(argLength % 2) {
    throw Error("Uneven number of arguments");
  }
  var rv = {};
  for(var i = 0;i < argLength;i += 2) {
    rv[arguments[i]] = arguments[i + 1]
  }
  return rv
};
goog.object.createSet = function(var_args) {
  var argLength = arguments.length;
  if(argLength == 1 && goog.isArray(arguments[0])) {
    return goog.object.createSet.apply(null, arguments[0])
  }
  var rv = {};
  for(var i = 0;i < argLength;i++) {
    rv[arguments[i]] = true
  }
  return rv
};
goog.provide("cljs.core");
goog.require("goog.string");
goog.require("goog.string.StringBuffer");
goog.require("goog.object");
goog.require("goog.array");
cljs.core._STAR_print_fn_STAR_ = function _STAR_print_fn_STAR_(_) {
  throw new Error("No *print-fn* fn set for evaluation environment");
};
cljs.core.truth_ = function truth_(x) {
  return x != null && x !== false
};
cljs.core.type_satisfies_ = function type_satisfies_(p, x) {
  var or__3548__auto____3016 = p[goog.typeOf.call(null, x)];
  if(cljs.core.truth_(or__3548__auto____3016)) {
    return or__3548__auto____3016
  }else {
    var or__3548__auto____3017 = p["_"];
    if(cljs.core.truth_(or__3548__auto____3017)) {
      return or__3548__auto____3017
    }else {
      return false
    }
  }
};
cljs.core.is_proto_ = function is_proto_(x) {
  return x.constructor.prototype === x
};
cljs.core._STAR_main_cli_fn_STAR_ = null;
cljs.core.missing_protocol = function missing_protocol(proto, obj) {
  return Error.call(null, "No protocol method " + proto + " defined for type " + goog.typeOf.call(null, obj) + ": " + obj)
};
cljs.core.aclone = function aclone(array_like) {
  return Array.prototype.slice.call(array_like)
};
cljs.core.array = function array(var_args) {
  return Array.prototype.slice.call(arguments)
};
cljs.core.aget = function aget(array, i) {
  return array[i]
};
cljs.core.aset = function aset(array, i, val) {
  return array[i] = val
};
cljs.core.alength = function alength(array) {
  return array.length
};
cljs.core.IFn = {};
cljs.core._invoke = function() {
  var _invoke = null;
  var _invoke__3081 = function(this$) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____3018 = this$;
      if(cljs.core.truth_(and__3546__auto____3018)) {
        return this$.cljs$core$IFn$_invoke
      }else {
        return and__3546__auto____3018
      }
    }())) {
      return this$.cljs$core$IFn$_invoke(this$)
    }else {
      return function() {
        var or__3548__auto____3019 = cljs.core._invoke[goog.typeOf.call(null, this$)];
        if(cljs.core.truth_(or__3548__auto____3019)) {
          return or__3548__auto____3019
        }else {
          var or__3548__auto____3020 = cljs.core._invoke["_"];
          if(cljs.core.truth_(or__3548__auto____3020)) {
            return or__3548__auto____3020
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$)
    }
  };
  var _invoke__3082 = function(this$, a) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____3021 = this$;
      if(cljs.core.truth_(and__3546__auto____3021)) {
        return this$.cljs$core$IFn$_invoke
      }else {
        return and__3546__auto____3021
      }
    }())) {
      return this$.cljs$core$IFn$_invoke(this$, a)
    }else {
      return function() {
        var or__3548__auto____3022 = cljs.core._invoke[goog.typeOf.call(null, this$)];
        if(cljs.core.truth_(or__3548__auto____3022)) {
          return or__3548__auto____3022
        }else {
          var or__3548__auto____3023 = cljs.core._invoke["_"];
          if(cljs.core.truth_(or__3548__auto____3023)) {
            return or__3548__auto____3023
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a)
    }
  };
  var _invoke__3083 = function(this$, a, b) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____3024 = this$;
      if(cljs.core.truth_(and__3546__auto____3024)) {
        return this$.cljs$core$IFn$_invoke
      }else {
        return and__3546__auto____3024
      }
    }())) {
      return this$.cljs$core$IFn$_invoke(this$, a, b)
    }else {
      return function() {
        var or__3548__auto____3025 = cljs.core._invoke[goog.typeOf.call(null, this$)];
        if(cljs.core.truth_(or__3548__auto____3025)) {
          return or__3548__auto____3025
        }else {
          var or__3548__auto____3026 = cljs.core._invoke["_"];
          if(cljs.core.truth_(or__3548__auto____3026)) {
            return or__3548__auto____3026
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b)
    }
  };
  var _invoke__3084 = function(this$, a, b, c) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____3027 = this$;
      if(cljs.core.truth_(and__3546__auto____3027)) {
        return this$.cljs$core$IFn$_invoke
      }else {
        return and__3546__auto____3027
      }
    }())) {
      return this$.cljs$core$IFn$_invoke(this$, a, b, c)
    }else {
      return function() {
        var or__3548__auto____3028 = cljs.core._invoke[goog.typeOf.call(null, this$)];
        if(cljs.core.truth_(or__3548__auto____3028)) {
          return or__3548__auto____3028
        }else {
          var or__3548__auto____3029 = cljs.core._invoke["_"];
          if(cljs.core.truth_(or__3548__auto____3029)) {
            return or__3548__auto____3029
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c)
    }
  };
  var _invoke__3085 = function(this$, a, b, c, d) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____3030 = this$;
      if(cljs.core.truth_(and__3546__auto____3030)) {
        return this$.cljs$core$IFn$_invoke
      }else {
        return and__3546__auto____3030
      }
    }())) {
      return this$.cljs$core$IFn$_invoke(this$, a, b, c, d)
    }else {
      return function() {
        var or__3548__auto____3031 = cljs.core._invoke[goog.typeOf.call(null, this$)];
        if(cljs.core.truth_(or__3548__auto____3031)) {
          return or__3548__auto____3031
        }else {
          var or__3548__auto____3032 = cljs.core._invoke["_"];
          if(cljs.core.truth_(or__3548__auto____3032)) {
            return or__3548__auto____3032
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d)
    }
  };
  var _invoke__3086 = function(this$, a, b, c, d, e) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____3033 = this$;
      if(cljs.core.truth_(and__3546__auto____3033)) {
        return this$.cljs$core$IFn$_invoke
      }else {
        return and__3546__auto____3033
      }
    }())) {
      return this$.cljs$core$IFn$_invoke(this$, a, b, c, d, e)
    }else {
      return function() {
        var or__3548__auto____3034 = cljs.core._invoke[goog.typeOf.call(null, this$)];
        if(cljs.core.truth_(or__3548__auto____3034)) {
          return or__3548__auto____3034
        }else {
          var or__3548__auto____3035 = cljs.core._invoke["_"];
          if(cljs.core.truth_(or__3548__auto____3035)) {
            return or__3548__auto____3035
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e)
    }
  };
  var _invoke__3087 = function(this$, a, b, c, d, e, f) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____3036 = this$;
      if(cljs.core.truth_(and__3546__auto____3036)) {
        return this$.cljs$core$IFn$_invoke
      }else {
        return and__3546__auto____3036
      }
    }())) {
      return this$.cljs$core$IFn$_invoke(this$, a, b, c, d, e, f)
    }else {
      return function() {
        var or__3548__auto____3037 = cljs.core._invoke[goog.typeOf.call(null, this$)];
        if(cljs.core.truth_(or__3548__auto____3037)) {
          return or__3548__auto____3037
        }else {
          var or__3548__auto____3038 = cljs.core._invoke["_"];
          if(cljs.core.truth_(or__3548__auto____3038)) {
            return or__3548__auto____3038
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f)
    }
  };
  var _invoke__3088 = function(this$, a, b, c, d, e, f, g) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____3039 = this$;
      if(cljs.core.truth_(and__3546__auto____3039)) {
        return this$.cljs$core$IFn$_invoke
      }else {
        return and__3546__auto____3039
      }
    }())) {
      return this$.cljs$core$IFn$_invoke(this$, a, b, c, d, e, f, g)
    }else {
      return function() {
        var or__3548__auto____3040 = cljs.core._invoke[goog.typeOf.call(null, this$)];
        if(cljs.core.truth_(or__3548__auto____3040)) {
          return or__3548__auto____3040
        }else {
          var or__3548__auto____3041 = cljs.core._invoke["_"];
          if(cljs.core.truth_(or__3548__auto____3041)) {
            return or__3548__auto____3041
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g)
    }
  };
  var _invoke__3089 = function(this$, a, b, c, d, e, f, g, h) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____3042 = this$;
      if(cljs.core.truth_(and__3546__auto____3042)) {
        return this$.cljs$core$IFn$_invoke
      }else {
        return and__3546__auto____3042
      }
    }())) {
      return this$.cljs$core$IFn$_invoke(this$, a, b, c, d, e, f, g, h)
    }else {
      return function() {
        var or__3548__auto____3043 = cljs.core._invoke[goog.typeOf.call(null, this$)];
        if(cljs.core.truth_(or__3548__auto____3043)) {
          return or__3548__auto____3043
        }else {
          var or__3548__auto____3044 = cljs.core._invoke["_"];
          if(cljs.core.truth_(or__3548__auto____3044)) {
            return or__3548__auto____3044
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h)
    }
  };
  var _invoke__3090 = function(this$, a, b, c, d, e, f, g, h, i) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____3045 = this$;
      if(cljs.core.truth_(and__3546__auto____3045)) {
        return this$.cljs$core$IFn$_invoke
      }else {
        return and__3546__auto____3045
      }
    }())) {
      return this$.cljs$core$IFn$_invoke(this$, a, b, c, d, e, f, g, h, i)
    }else {
      return function() {
        var or__3548__auto____3046 = cljs.core._invoke[goog.typeOf.call(null, this$)];
        if(cljs.core.truth_(or__3548__auto____3046)) {
          return or__3548__auto____3046
        }else {
          var or__3548__auto____3047 = cljs.core._invoke["_"];
          if(cljs.core.truth_(or__3548__auto____3047)) {
            return or__3548__auto____3047
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i)
    }
  };
  var _invoke__3091 = function(this$, a, b, c, d, e, f, g, h, i, j) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____3048 = this$;
      if(cljs.core.truth_(and__3546__auto____3048)) {
        return this$.cljs$core$IFn$_invoke
      }else {
        return and__3546__auto____3048
      }
    }())) {
      return this$.cljs$core$IFn$_invoke(this$, a, b, c, d, e, f, g, h, i, j)
    }else {
      return function() {
        var or__3548__auto____3049 = cljs.core._invoke[goog.typeOf.call(null, this$)];
        if(cljs.core.truth_(or__3548__auto____3049)) {
          return or__3548__auto____3049
        }else {
          var or__3548__auto____3050 = cljs.core._invoke["_"];
          if(cljs.core.truth_(or__3548__auto____3050)) {
            return or__3548__auto____3050
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j)
    }
  };
  var _invoke__3092 = function(this$, a, b, c, d, e, f, g, h, i, j, k) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____3051 = this$;
      if(cljs.core.truth_(and__3546__auto____3051)) {
        return this$.cljs$core$IFn$_invoke
      }else {
        return and__3546__auto____3051
      }
    }())) {
      return this$.cljs$core$IFn$_invoke(this$, a, b, c, d, e, f, g, h, i, j, k)
    }else {
      return function() {
        var or__3548__auto____3052 = cljs.core._invoke[goog.typeOf.call(null, this$)];
        if(cljs.core.truth_(or__3548__auto____3052)) {
          return or__3548__auto____3052
        }else {
          var or__3548__auto____3053 = cljs.core._invoke["_"];
          if(cljs.core.truth_(or__3548__auto____3053)) {
            return or__3548__auto____3053
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k)
    }
  };
  var _invoke__3093 = function(this$, a, b, c, d, e, f, g, h, i, j, k, l) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____3054 = this$;
      if(cljs.core.truth_(and__3546__auto____3054)) {
        return this$.cljs$core$IFn$_invoke
      }else {
        return and__3546__auto____3054
      }
    }())) {
      return this$.cljs$core$IFn$_invoke(this$, a, b, c, d, e, f, g, h, i, j, k, l)
    }else {
      return function() {
        var or__3548__auto____3055 = cljs.core._invoke[goog.typeOf.call(null, this$)];
        if(cljs.core.truth_(or__3548__auto____3055)) {
          return or__3548__auto____3055
        }else {
          var or__3548__auto____3056 = cljs.core._invoke["_"];
          if(cljs.core.truth_(or__3548__auto____3056)) {
            return or__3548__auto____3056
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k, l)
    }
  };
  var _invoke__3094 = function(this$, a, b, c, d, e, f, g, h, i, j, k, l, m) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____3057 = this$;
      if(cljs.core.truth_(and__3546__auto____3057)) {
        return this$.cljs$core$IFn$_invoke
      }else {
        return and__3546__auto____3057
      }
    }())) {
      return this$.cljs$core$IFn$_invoke(this$, a, b, c, d, e, f, g, h, i, j, k, l, m)
    }else {
      return function() {
        var or__3548__auto____3058 = cljs.core._invoke[goog.typeOf.call(null, this$)];
        if(cljs.core.truth_(or__3548__auto____3058)) {
          return or__3548__auto____3058
        }else {
          var or__3548__auto____3059 = cljs.core._invoke["_"];
          if(cljs.core.truth_(or__3548__auto____3059)) {
            return or__3548__auto____3059
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k, l, m)
    }
  };
  var _invoke__3095 = function(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____3060 = this$;
      if(cljs.core.truth_(and__3546__auto____3060)) {
        return this$.cljs$core$IFn$_invoke
      }else {
        return and__3546__auto____3060
      }
    }())) {
      return this$.cljs$core$IFn$_invoke(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n)
    }else {
      return function() {
        var or__3548__auto____3061 = cljs.core._invoke[goog.typeOf.call(null, this$)];
        if(cljs.core.truth_(or__3548__auto____3061)) {
          return or__3548__auto____3061
        }else {
          var or__3548__auto____3062 = cljs.core._invoke["_"];
          if(cljs.core.truth_(or__3548__auto____3062)) {
            return or__3548__auto____3062
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n)
    }
  };
  var _invoke__3096 = function(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____3063 = this$;
      if(cljs.core.truth_(and__3546__auto____3063)) {
        return this$.cljs$core$IFn$_invoke
      }else {
        return and__3546__auto____3063
      }
    }())) {
      return this$.cljs$core$IFn$_invoke(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o)
    }else {
      return function() {
        var or__3548__auto____3064 = cljs.core._invoke[goog.typeOf.call(null, this$)];
        if(cljs.core.truth_(or__3548__auto____3064)) {
          return or__3548__auto____3064
        }else {
          var or__3548__auto____3065 = cljs.core._invoke["_"];
          if(cljs.core.truth_(or__3548__auto____3065)) {
            return or__3548__auto____3065
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o)
    }
  };
  var _invoke__3097 = function(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____3066 = this$;
      if(cljs.core.truth_(and__3546__auto____3066)) {
        return this$.cljs$core$IFn$_invoke
      }else {
        return and__3546__auto____3066
      }
    }())) {
      return this$.cljs$core$IFn$_invoke(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p)
    }else {
      return function() {
        var or__3548__auto____3067 = cljs.core._invoke[goog.typeOf.call(null, this$)];
        if(cljs.core.truth_(or__3548__auto____3067)) {
          return or__3548__auto____3067
        }else {
          var or__3548__auto____3068 = cljs.core._invoke["_"];
          if(cljs.core.truth_(or__3548__auto____3068)) {
            return or__3548__auto____3068
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p)
    }
  };
  var _invoke__3098 = function(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____3069 = this$;
      if(cljs.core.truth_(and__3546__auto____3069)) {
        return this$.cljs$core$IFn$_invoke
      }else {
        return and__3546__auto____3069
      }
    }())) {
      return this$.cljs$core$IFn$_invoke(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q)
    }else {
      return function() {
        var or__3548__auto____3070 = cljs.core._invoke[goog.typeOf.call(null, this$)];
        if(cljs.core.truth_(or__3548__auto____3070)) {
          return or__3548__auto____3070
        }else {
          var or__3548__auto____3071 = cljs.core._invoke["_"];
          if(cljs.core.truth_(or__3548__auto____3071)) {
            return or__3548__auto____3071
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q)
    }
  };
  var _invoke__3099 = function(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____3072 = this$;
      if(cljs.core.truth_(and__3546__auto____3072)) {
        return this$.cljs$core$IFn$_invoke
      }else {
        return and__3546__auto____3072
      }
    }())) {
      return this$.cljs$core$IFn$_invoke(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s)
    }else {
      return function() {
        var or__3548__auto____3073 = cljs.core._invoke[goog.typeOf.call(null, this$)];
        if(cljs.core.truth_(or__3548__auto____3073)) {
          return or__3548__auto____3073
        }else {
          var or__3548__auto____3074 = cljs.core._invoke["_"];
          if(cljs.core.truth_(or__3548__auto____3074)) {
            return or__3548__auto____3074
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s)
    }
  };
  var _invoke__3100 = function(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s, t) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____3075 = this$;
      if(cljs.core.truth_(and__3546__auto____3075)) {
        return this$.cljs$core$IFn$_invoke
      }else {
        return and__3546__auto____3075
      }
    }())) {
      return this$.cljs$core$IFn$_invoke(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s, t)
    }else {
      return function() {
        var or__3548__auto____3076 = cljs.core._invoke[goog.typeOf.call(null, this$)];
        if(cljs.core.truth_(or__3548__auto____3076)) {
          return or__3548__auto____3076
        }else {
          var or__3548__auto____3077 = cljs.core._invoke["_"];
          if(cljs.core.truth_(or__3548__auto____3077)) {
            return or__3548__auto____3077
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s, t)
    }
  };
  var _invoke__3101 = function(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s, t, rest) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____3078 = this$;
      if(cljs.core.truth_(and__3546__auto____3078)) {
        return this$.cljs$core$IFn$_invoke
      }else {
        return and__3546__auto____3078
      }
    }())) {
      return this$.cljs$core$IFn$_invoke(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s, t, rest)
    }else {
      return function() {
        var or__3548__auto____3079 = cljs.core._invoke[goog.typeOf.call(null, this$)];
        if(cljs.core.truth_(or__3548__auto____3079)) {
          return or__3548__auto____3079
        }else {
          var or__3548__auto____3080 = cljs.core._invoke["_"];
          if(cljs.core.truth_(or__3548__auto____3080)) {
            return or__3548__auto____3080
          }else {
            throw cljs.core.missing_protocol.call(null, "IFn.-invoke", this$);
          }
        }
      }().call(null, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s, t, rest)
    }
  };
  _invoke = function(this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s, t, rest) {
    switch(arguments.length) {
      case 1:
        return _invoke__3081.call(this, this$);
      case 2:
        return _invoke__3082.call(this, this$, a);
      case 3:
        return _invoke__3083.call(this, this$, a, b);
      case 4:
        return _invoke__3084.call(this, this$, a, b, c);
      case 5:
        return _invoke__3085.call(this, this$, a, b, c, d);
      case 6:
        return _invoke__3086.call(this, this$, a, b, c, d, e);
      case 7:
        return _invoke__3087.call(this, this$, a, b, c, d, e, f);
      case 8:
        return _invoke__3088.call(this, this$, a, b, c, d, e, f, g);
      case 9:
        return _invoke__3089.call(this, this$, a, b, c, d, e, f, g, h);
      case 10:
        return _invoke__3090.call(this, this$, a, b, c, d, e, f, g, h, i);
      case 11:
        return _invoke__3091.call(this, this$, a, b, c, d, e, f, g, h, i, j);
      case 12:
        return _invoke__3092.call(this, this$, a, b, c, d, e, f, g, h, i, j, k);
      case 13:
        return _invoke__3093.call(this, this$, a, b, c, d, e, f, g, h, i, j, k, l);
      case 14:
        return _invoke__3094.call(this, this$, a, b, c, d, e, f, g, h, i, j, k, l, m);
      case 15:
        return _invoke__3095.call(this, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n);
      case 16:
        return _invoke__3096.call(this, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o);
      case 17:
        return _invoke__3097.call(this, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p);
      case 18:
        return _invoke__3098.call(this, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q);
      case 19:
        return _invoke__3099.call(this, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s);
      case 20:
        return _invoke__3100.call(this, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s, t);
      case 21:
        return _invoke__3101.call(this, this$, a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, s, t, rest)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return _invoke
}();
cljs.core.ICounted = {};
cljs.core._count = function _count(coll) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____3103 = coll;
    if(cljs.core.truth_(and__3546__auto____3103)) {
      return coll.cljs$core$ICounted$_count
    }else {
      return and__3546__auto____3103
    }
  }())) {
    return coll.cljs$core$ICounted$_count(coll)
  }else {
    return function() {
      var or__3548__auto____3104 = cljs.core._count[goog.typeOf.call(null, coll)];
      if(cljs.core.truth_(or__3548__auto____3104)) {
        return or__3548__auto____3104
      }else {
        var or__3548__auto____3105 = cljs.core._count["_"];
        if(cljs.core.truth_(or__3548__auto____3105)) {
          return or__3548__auto____3105
        }else {
          throw cljs.core.missing_protocol.call(null, "ICounted.-count", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core.IEmptyableCollection = {};
cljs.core._empty = function _empty(coll) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____3106 = coll;
    if(cljs.core.truth_(and__3546__auto____3106)) {
      return coll.cljs$core$IEmptyableCollection$_empty
    }else {
      return and__3546__auto____3106
    }
  }())) {
    return coll.cljs$core$IEmptyableCollection$_empty(coll)
  }else {
    return function() {
      var or__3548__auto____3107 = cljs.core._empty[goog.typeOf.call(null, coll)];
      if(cljs.core.truth_(or__3548__auto____3107)) {
        return or__3548__auto____3107
      }else {
        var or__3548__auto____3108 = cljs.core._empty["_"];
        if(cljs.core.truth_(or__3548__auto____3108)) {
          return or__3548__auto____3108
        }else {
          throw cljs.core.missing_protocol.call(null, "IEmptyableCollection.-empty", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core.ICollection = {};
cljs.core._conj = function _conj(coll, o) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____3109 = coll;
    if(cljs.core.truth_(and__3546__auto____3109)) {
      return coll.cljs$core$ICollection$_conj
    }else {
      return and__3546__auto____3109
    }
  }())) {
    return coll.cljs$core$ICollection$_conj(coll, o)
  }else {
    return function() {
      var or__3548__auto____3110 = cljs.core._conj[goog.typeOf.call(null, coll)];
      if(cljs.core.truth_(or__3548__auto____3110)) {
        return or__3548__auto____3110
      }else {
        var or__3548__auto____3111 = cljs.core._conj["_"];
        if(cljs.core.truth_(or__3548__auto____3111)) {
          return or__3548__auto____3111
        }else {
          throw cljs.core.missing_protocol.call(null, "ICollection.-conj", coll);
        }
      }
    }().call(null, coll, o)
  }
};
cljs.core.IIndexed = {};
cljs.core._nth = function() {
  var _nth = null;
  var _nth__3118 = function(coll, n) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____3112 = coll;
      if(cljs.core.truth_(and__3546__auto____3112)) {
        return coll.cljs$core$IIndexed$_nth
      }else {
        return and__3546__auto____3112
      }
    }())) {
      return coll.cljs$core$IIndexed$_nth(coll, n)
    }else {
      return function() {
        var or__3548__auto____3113 = cljs.core._nth[goog.typeOf.call(null, coll)];
        if(cljs.core.truth_(or__3548__auto____3113)) {
          return or__3548__auto____3113
        }else {
          var or__3548__auto____3114 = cljs.core._nth["_"];
          if(cljs.core.truth_(or__3548__auto____3114)) {
            return or__3548__auto____3114
          }else {
            throw cljs.core.missing_protocol.call(null, "IIndexed.-nth", coll);
          }
        }
      }().call(null, coll, n)
    }
  };
  var _nth__3119 = function(coll, n, not_found) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____3115 = coll;
      if(cljs.core.truth_(and__3546__auto____3115)) {
        return coll.cljs$core$IIndexed$_nth
      }else {
        return and__3546__auto____3115
      }
    }())) {
      return coll.cljs$core$IIndexed$_nth(coll, n, not_found)
    }else {
      return function() {
        var or__3548__auto____3116 = cljs.core._nth[goog.typeOf.call(null, coll)];
        if(cljs.core.truth_(or__3548__auto____3116)) {
          return or__3548__auto____3116
        }else {
          var or__3548__auto____3117 = cljs.core._nth["_"];
          if(cljs.core.truth_(or__3548__auto____3117)) {
            return or__3548__auto____3117
          }else {
            throw cljs.core.missing_protocol.call(null, "IIndexed.-nth", coll);
          }
        }
      }().call(null, coll, n, not_found)
    }
  };
  _nth = function(coll, n, not_found) {
    switch(arguments.length) {
      case 2:
        return _nth__3118.call(this, coll, n);
      case 3:
        return _nth__3119.call(this, coll, n, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return _nth
}();
cljs.core.ISeq = {};
cljs.core._first = function _first(coll) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____3121 = coll;
    if(cljs.core.truth_(and__3546__auto____3121)) {
      return coll.cljs$core$ISeq$_first
    }else {
      return and__3546__auto____3121
    }
  }())) {
    return coll.cljs$core$ISeq$_first(coll)
  }else {
    return function() {
      var or__3548__auto____3122 = cljs.core._first[goog.typeOf.call(null, coll)];
      if(cljs.core.truth_(or__3548__auto____3122)) {
        return or__3548__auto____3122
      }else {
        var or__3548__auto____3123 = cljs.core._first["_"];
        if(cljs.core.truth_(or__3548__auto____3123)) {
          return or__3548__auto____3123
        }else {
          throw cljs.core.missing_protocol.call(null, "ISeq.-first", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core._rest = function _rest(coll) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____3124 = coll;
    if(cljs.core.truth_(and__3546__auto____3124)) {
      return coll.cljs$core$ISeq$_rest
    }else {
      return and__3546__auto____3124
    }
  }())) {
    return coll.cljs$core$ISeq$_rest(coll)
  }else {
    return function() {
      var or__3548__auto____3125 = cljs.core._rest[goog.typeOf.call(null, coll)];
      if(cljs.core.truth_(or__3548__auto____3125)) {
        return or__3548__auto____3125
      }else {
        var or__3548__auto____3126 = cljs.core._rest["_"];
        if(cljs.core.truth_(or__3548__auto____3126)) {
          return or__3548__auto____3126
        }else {
          throw cljs.core.missing_protocol.call(null, "ISeq.-rest", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core.ILookup = {};
cljs.core._lookup = function() {
  var _lookup = null;
  var _lookup__3133 = function(o, k) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____3127 = o;
      if(cljs.core.truth_(and__3546__auto____3127)) {
        return o.cljs$core$ILookup$_lookup
      }else {
        return and__3546__auto____3127
      }
    }())) {
      return o.cljs$core$ILookup$_lookup(o, k)
    }else {
      return function() {
        var or__3548__auto____3128 = cljs.core._lookup[goog.typeOf.call(null, o)];
        if(cljs.core.truth_(or__3548__auto____3128)) {
          return or__3548__auto____3128
        }else {
          var or__3548__auto____3129 = cljs.core._lookup["_"];
          if(cljs.core.truth_(or__3548__auto____3129)) {
            return or__3548__auto____3129
          }else {
            throw cljs.core.missing_protocol.call(null, "ILookup.-lookup", o);
          }
        }
      }().call(null, o, k)
    }
  };
  var _lookup__3134 = function(o, k, not_found) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____3130 = o;
      if(cljs.core.truth_(and__3546__auto____3130)) {
        return o.cljs$core$ILookup$_lookup
      }else {
        return and__3546__auto____3130
      }
    }())) {
      return o.cljs$core$ILookup$_lookup(o, k, not_found)
    }else {
      return function() {
        var or__3548__auto____3131 = cljs.core._lookup[goog.typeOf.call(null, o)];
        if(cljs.core.truth_(or__3548__auto____3131)) {
          return or__3548__auto____3131
        }else {
          var or__3548__auto____3132 = cljs.core._lookup["_"];
          if(cljs.core.truth_(or__3548__auto____3132)) {
            return or__3548__auto____3132
          }else {
            throw cljs.core.missing_protocol.call(null, "ILookup.-lookup", o);
          }
        }
      }().call(null, o, k, not_found)
    }
  };
  _lookup = function(o, k, not_found) {
    switch(arguments.length) {
      case 2:
        return _lookup__3133.call(this, o, k);
      case 3:
        return _lookup__3134.call(this, o, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return _lookup
}();
cljs.core.IAssociative = {};
cljs.core._contains_key_QMARK_ = function _contains_key_QMARK_(coll, k) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____3136 = coll;
    if(cljs.core.truth_(and__3546__auto____3136)) {
      return coll.cljs$core$IAssociative$_contains_key_QMARK_
    }else {
      return and__3546__auto____3136
    }
  }())) {
    return coll.cljs$core$IAssociative$_contains_key_QMARK_(coll, k)
  }else {
    return function() {
      var or__3548__auto____3137 = cljs.core._contains_key_QMARK_[goog.typeOf.call(null, coll)];
      if(cljs.core.truth_(or__3548__auto____3137)) {
        return or__3548__auto____3137
      }else {
        var or__3548__auto____3138 = cljs.core._contains_key_QMARK_["_"];
        if(cljs.core.truth_(or__3548__auto____3138)) {
          return or__3548__auto____3138
        }else {
          throw cljs.core.missing_protocol.call(null, "IAssociative.-contains-key?", coll);
        }
      }
    }().call(null, coll, k)
  }
};
cljs.core._assoc = function _assoc(coll, k, v) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____3139 = coll;
    if(cljs.core.truth_(and__3546__auto____3139)) {
      return coll.cljs$core$IAssociative$_assoc
    }else {
      return and__3546__auto____3139
    }
  }())) {
    return coll.cljs$core$IAssociative$_assoc(coll, k, v)
  }else {
    return function() {
      var or__3548__auto____3140 = cljs.core._assoc[goog.typeOf.call(null, coll)];
      if(cljs.core.truth_(or__3548__auto____3140)) {
        return or__3548__auto____3140
      }else {
        var or__3548__auto____3141 = cljs.core._assoc["_"];
        if(cljs.core.truth_(or__3548__auto____3141)) {
          return or__3548__auto____3141
        }else {
          throw cljs.core.missing_protocol.call(null, "IAssociative.-assoc", coll);
        }
      }
    }().call(null, coll, k, v)
  }
};
cljs.core.IMap = {};
cljs.core._dissoc = function _dissoc(coll, k) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____3142 = coll;
    if(cljs.core.truth_(and__3546__auto____3142)) {
      return coll.cljs$core$IMap$_dissoc
    }else {
      return and__3546__auto____3142
    }
  }())) {
    return coll.cljs$core$IMap$_dissoc(coll, k)
  }else {
    return function() {
      var or__3548__auto____3143 = cljs.core._dissoc[goog.typeOf.call(null, coll)];
      if(cljs.core.truth_(or__3548__auto____3143)) {
        return or__3548__auto____3143
      }else {
        var or__3548__auto____3144 = cljs.core._dissoc["_"];
        if(cljs.core.truth_(or__3548__auto____3144)) {
          return or__3548__auto____3144
        }else {
          throw cljs.core.missing_protocol.call(null, "IMap.-dissoc", coll);
        }
      }
    }().call(null, coll, k)
  }
};
cljs.core.ISet = {};
cljs.core._disjoin = function _disjoin(coll, v) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____3145 = coll;
    if(cljs.core.truth_(and__3546__auto____3145)) {
      return coll.cljs$core$ISet$_disjoin
    }else {
      return and__3546__auto____3145
    }
  }())) {
    return coll.cljs$core$ISet$_disjoin(coll, v)
  }else {
    return function() {
      var or__3548__auto____3146 = cljs.core._disjoin[goog.typeOf.call(null, coll)];
      if(cljs.core.truth_(or__3548__auto____3146)) {
        return or__3548__auto____3146
      }else {
        var or__3548__auto____3147 = cljs.core._disjoin["_"];
        if(cljs.core.truth_(or__3548__auto____3147)) {
          return or__3548__auto____3147
        }else {
          throw cljs.core.missing_protocol.call(null, "ISet.-disjoin", coll);
        }
      }
    }().call(null, coll, v)
  }
};
cljs.core.IStack = {};
cljs.core._peek = function _peek(coll) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____3148 = coll;
    if(cljs.core.truth_(and__3546__auto____3148)) {
      return coll.cljs$core$IStack$_peek
    }else {
      return and__3546__auto____3148
    }
  }())) {
    return coll.cljs$core$IStack$_peek(coll)
  }else {
    return function() {
      var or__3548__auto____3149 = cljs.core._peek[goog.typeOf.call(null, coll)];
      if(cljs.core.truth_(or__3548__auto____3149)) {
        return or__3548__auto____3149
      }else {
        var or__3548__auto____3150 = cljs.core._peek["_"];
        if(cljs.core.truth_(or__3548__auto____3150)) {
          return or__3548__auto____3150
        }else {
          throw cljs.core.missing_protocol.call(null, "IStack.-peek", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core._pop = function _pop(coll) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____3151 = coll;
    if(cljs.core.truth_(and__3546__auto____3151)) {
      return coll.cljs$core$IStack$_pop
    }else {
      return and__3546__auto____3151
    }
  }())) {
    return coll.cljs$core$IStack$_pop(coll)
  }else {
    return function() {
      var or__3548__auto____3152 = cljs.core._pop[goog.typeOf.call(null, coll)];
      if(cljs.core.truth_(or__3548__auto____3152)) {
        return or__3548__auto____3152
      }else {
        var or__3548__auto____3153 = cljs.core._pop["_"];
        if(cljs.core.truth_(or__3548__auto____3153)) {
          return or__3548__auto____3153
        }else {
          throw cljs.core.missing_protocol.call(null, "IStack.-pop", coll);
        }
      }
    }().call(null, coll)
  }
};
cljs.core.IVector = {};
cljs.core._assoc_n = function _assoc_n(coll, n, val) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____3154 = coll;
    if(cljs.core.truth_(and__3546__auto____3154)) {
      return coll.cljs$core$IVector$_assoc_n
    }else {
      return and__3546__auto____3154
    }
  }())) {
    return coll.cljs$core$IVector$_assoc_n(coll, n, val)
  }else {
    return function() {
      var or__3548__auto____3155 = cljs.core._assoc_n[goog.typeOf.call(null, coll)];
      if(cljs.core.truth_(or__3548__auto____3155)) {
        return or__3548__auto____3155
      }else {
        var or__3548__auto____3156 = cljs.core._assoc_n["_"];
        if(cljs.core.truth_(or__3548__auto____3156)) {
          return or__3548__auto____3156
        }else {
          throw cljs.core.missing_protocol.call(null, "IVector.-assoc-n", coll);
        }
      }
    }().call(null, coll, n, val)
  }
};
cljs.core.IDeref = {};
cljs.core._deref = function _deref(o) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____3157 = o;
    if(cljs.core.truth_(and__3546__auto____3157)) {
      return o.cljs$core$IDeref$_deref
    }else {
      return and__3546__auto____3157
    }
  }())) {
    return o.cljs$core$IDeref$_deref(o)
  }else {
    return function() {
      var or__3548__auto____3158 = cljs.core._deref[goog.typeOf.call(null, o)];
      if(cljs.core.truth_(or__3548__auto____3158)) {
        return or__3548__auto____3158
      }else {
        var or__3548__auto____3159 = cljs.core._deref["_"];
        if(cljs.core.truth_(or__3548__auto____3159)) {
          return or__3548__auto____3159
        }else {
          throw cljs.core.missing_protocol.call(null, "IDeref.-deref", o);
        }
      }
    }().call(null, o)
  }
};
cljs.core.IDerefWithTimeout = {};
cljs.core._deref_with_timeout = function _deref_with_timeout(o, msec, timeout_val) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____3160 = o;
    if(cljs.core.truth_(and__3546__auto____3160)) {
      return o.cljs$core$IDerefWithTimeout$_deref_with_timeout
    }else {
      return and__3546__auto____3160
    }
  }())) {
    return o.cljs$core$IDerefWithTimeout$_deref_with_timeout(o, msec, timeout_val)
  }else {
    return function() {
      var or__3548__auto____3161 = cljs.core._deref_with_timeout[goog.typeOf.call(null, o)];
      if(cljs.core.truth_(or__3548__auto____3161)) {
        return or__3548__auto____3161
      }else {
        var or__3548__auto____3162 = cljs.core._deref_with_timeout["_"];
        if(cljs.core.truth_(or__3548__auto____3162)) {
          return or__3548__auto____3162
        }else {
          throw cljs.core.missing_protocol.call(null, "IDerefWithTimeout.-deref-with-timeout", o);
        }
      }
    }().call(null, o, msec, timeout_val)
  }
};
cljs.core.IMeta = {};
cljs.core._meta = function _meta(o) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____3163 = o;
    if(cljs.core.truth_(and__3546__auto____3163)) {
      return o.cljs$core$IMeta$_meta
    }else {
      return and__3546__auto____3163
    }
  }())) {
    return o.cljs$core$IMeta$_meta(o)
  }else {
    return function() {
      var or__3548__auto____3164 = cljs.core._meta[goog.typeOf.call(null, o)];
      if(cljs.core.truth_(or__3548__auto____3164)) {
        return or__3548__auto____3164
      }else {
        var or__3548__auto____3165 = cljs.core._meta["_"];
        if(cljs.core.truth_(or__3548__auto____3165)) {
          return or__3548__auto____3165
        }else {
          throw cljs.core.missing_protocol.call(null, "IMeta.-meta", o);
        }
      }
    }().call(null, o)
  }
};
cljs.core.IWithMeta = {};
cljs.core._with_meta = function _with_meta(o, meta) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____3166 = o;
    if(cljs.core.truth_(and__3546__auto____3166)) {
      return o.cljs$core$IWithMeta$_with_meta
    }else {
      return and__3546__auto____3166
    }
  }())) {
    return o.cljs$core$IWithMeta$_with_meta(o, meta)
  }else {
    return function() {
      var or__3548__auto____3167 = cljs.core._with_meta[goog.typeOf.call(null, o)];
      if(cljs.core.truth_(or__3548__auto____3167)) {
        return or__3548__auto____3167
      }else {
        var or__3548__auto____3168 = cljs.core._with_meta["_"];
        if(cljs.core.truth_(or__3548__auto____3168)) {
          return or__3548__auto____3168
        }else {
          throw cljs.core.missing_protocol.call(null, "IWithMeta.-with-meta", o);
        }
      }
    }().call(null, o, meta)
  }
};
cljs.core.IReduce = {};
cljs.core._reduce = function() {
  var _reduce = null;
  var _reduce__3175 = function(coll, f) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____3169 = coll;
      if(cljs.core.truth_(and__3546__auto____3169)) {
        return coll.cljs$core$IReduce$_reduce
      }else {
        return and__3546__auto____3169
      }
    }())) {
      return coll.cljs$core$IReduce$_reduce(coll, f)
    }else {
      return function() {
        var or__3548__auto____3170 = cljs.core._reduce[goog.typeOf.call(null, coll)];
        if(cljs.core.truth_(or__3548__auto____3170)) {
          return or__3548__auto____3170
        }else {
          var or__3548__auto____3171 = cljs.core._reduce["_"];
          if(cljs.core.truth_(or__3548__auto____3171)) {
            return or__3548__auto____3171
          }else {
            throw cljs.core.missing_protocol.call(null, "IReduce.-reduce", coll);
          }
        }
      }().call(null, coll, f)
    }
  };
  var _reduce__3176 = function(coll, f, start) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____3172 = coll;
      if(cljs.core.truth_(and__3546__auto____3172)) {
        return coll.cljs$core$IReduce$_reduce
      }else {
        return and__3546__auto____3172
      }
    }())) {
      return coll.cljs$core$IReduce$_reduce(coll, f, start)
    }else {
      return function() {
        var or__3548__auto____3173 = cljs.core._reduce[goog.typeOf.call(null, coll)];
        if(cljs.core.truth_(or__3548__auto____3173)) {
          return or__3548__auto____3173
        }else {
          var or__3548__auto____3174 = cljs.core._reduce["_"];
          if(cljs.core.truth_(or__3548__auto____3174)) {
            return or__3548__auto____3174
          }else {
            throw cljs.core.missing_protocol.call(null, "IReduce.-reduce", coll);
          }
        }
      }().call(null, coll, f, start)
    }
  };
  _reduce = function(coll, f, start) {
    switch(arguments.length) {
      case 2:
        return _reduce__3175.call(this, coll, f);
      case 3:
        return _reduce__3176.call(this, coll, f, start)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return _reduce
}();
cljs.core.IEquiv = {};
cljs.core._equiv = function _equiv(o, other) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____3178 = o;
    if(cljs.core.truth_(and__3546__auto____3178)) {
      return o.cljs$core$IEquiv$_equiv
    }else {
      return and__3546__auto____3178
    }
  }())) {
    return o.cljs$core$IEquiv$_equiv(o, other)
  }else {
    return function() {
      var or__3548__auto____3179 = cljs.core._equiv[goog.typeOf.call(null, o)];
      if(cljs.core.truth_(or__3548__auto____3179)) {
        return or__3548__auto____3179
      }else {
        var or__3548__auto____3180 = cljs.core._equiv["_"];
        if(cljs.core.truth_(or__3548__auto____3180)) {
          return or__3548__auto____3180
        }else {
          throw cljs.core.missing_protocol.call(null, "IEquiv.-equiv", o);
        }
      }
    }().call(null, o, other)
  }
};
cljs.core.IHash = {};
cljs.core._hash = function _hash(o) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____3181 = o;
    if(cljs.core.truth_(and__3546__auto____3181)) {
      return o.cljs$core$IHash$_hash
    }else {
      return and__3546__auto____3181
    }
  }())) {
    return o.cljs$core$IHash$_hash(o)
  }else {
    return function() {
      var or__3548__auto____3182 = cljs.core._hash[goog.typeOf.call(null, o)];
      if(cljs.core.truth_(or__3548__auto____3182)) {
        return or__3548__auto____3182
      }else {
        var or__3548__auto____3183 = cljs.core._hash["_"];
        if(cljs.core.truth_(or__3548__auto____3183)) {
          return or__3548__auto____3183
        }else {
          throw cljs.core.missing_protocol.call(null, "IHash.-hash", o);
        }
      }
    }().call(null, o)
  }
};
cljs.core.ISeqable = {};
cljs.core._seq = function _seq(o) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____3184 = o;
    if(cljs.core.truth_(and__3546__auto____3184)) {
      return o.cljs$core$ISeqable$_seq
    }else {
      return and__3546__auto____3184
    }
  }())) {
    return o.cljs$core$ISeqable$_seq(o)
  }else {
    return function() {
      var or__3548__auto____3185 = cljs.core._seq[goog.typeOf.call(null, o)];
      if(cljs.core.truth_(or__3548__auto____3185)) {
        return or__3548__auto____3185
      }else {
        var or__3548__auto____3186 = cljs.core._seq["_"];
        if(cljs.core.truth_(or__3548__auto____3186)) {
          return or__3548__auto____3186
        }else {
          throw cljs.core.missing_protocol.call(null, "ISeqable.-seq", o);
        }
      }
    }().call(null, o)
  }
};
cljs.core.ISequential = {};
cljs.core.IRecord = {};
cljs.core.IPrintable = {};
cljs.core._pr_seq = function _pr_seq(o, opts) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____3187 = o;
    if(cljs.core.truth_(and__3546__auto____3187)) {
      return o.cljs$core$IPrintable$_pr_seq
    }else {
      return and__3546__auto____3187
    }
  }())) {
    return o.cljs$core$IPrintable$_pr_seq(o, opts)
  }else {
    return function() {
      var or__3548__auto____3188 = cljs.core._pr_seq[goog.typeOf.call(null, o)];
      if(cljs.core.truth_(or__3548__auto____3188)) {
        return or__3548__auto____3188
      }else {
        var or__3548__auto____3189 = cljs.core._pr_seq["_"];
        if(cljs.core.truth_(or__3548__auto____3189)) {
          return or__3548__auto____3189
        }else {
          throw cljs.core.missing_protocol.call(null, "IPrintable.-pr-seq", o);
        }
      }
    }().call(null, o, opts)
  }
};
cljs.core.IPending = {};
cljs.core._realized_QMARK_ = function _realized_QMARK_(d) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____3190 = d;
    if(cljs.core.truth_(and__3546__auto____3190)) {
      return d.cljs$core$IPending$_realized_QMARK_
    }else {
      return and__3546__auto____3190
    }
  }())) {
    return d.cljs$core$IPending$_realized_QMARK_(d)
  }else {
    return function() {
      var or__3548__auto____3191 = cljs.core._realized_QMARK_[goog.typeOf.call(null, d)];
      if(cljs.core.truth_(or__3548__auto____3191)) {
        return or__3548__auto____3191
      }else {
        var or__3548__auto____3192 = cljs.core._realized_QMARK_["_"];
        if(cljs.core.truth_(or__3548__auto____3192)) {
          return or__3548__auto____3192
        }else {
          throw cljs.core.missing_protocol.call(null, "IPending.-realized?", d);
        }
      }
    }().call(null, d)
  }
};
cljs.core.IWatchable = {};
cljs.core._notify_watches = function _notify_watches(this$, oldval, newval) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____3193 = this$;
    if(cljs.core.truth_(and__3546__auto____3193)) {
      return this$.cljs$core$IWatchable$_notify_watches
    }else {
      return and__3546__auto____3193
    }
  }())) {
    return this$.cljs$core$IWatchable$_notify_watches(this$, oldval, newval)
  }else {
    return function() {
      var or__3548__auto____3194 = cljs.core._notify_watches[goog.typeOf.call(null, this$)];
      if(cljs.core.truth_(or__3548__auto____3194)) {
        return or__3548__auto____3194
      }else {
        var or__3548__auto____3195 = cljs.core._notify_watches["_"];
        if(cljs.core.truth_(or__3548__auto____3195)) {
          return or__3548__auto____3195
        }else {
          throw cljs.core.missing_protocol.call(null, "IWatchable.-notify-watches", this$);
        }
      }
    }().call(null, this$, oldval, newval)
  }
};
cljs.core._add_watch = function _add_watch(this$, key, f) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____3196 = this$;
    if(cljs.core.truth_(and__3546__auto____3196)) {
      return this$.cljs$core$IWatchable$_add_watch
    }else {
      return and__3546__auto____3196
    }
  }())) {
    return this$.cljs$core$IWatchable$_add_watch(this$, key, f)
  }else {
    return function() {
      var or__3548__auto____3197 = cljs.core._add_watch[goog.typeOf.call(null, this$)];
      if(cljs.core.truth_(or__3548__auto____3197)) {
        return or__3548__auto____3197
      }else {
        var or__3548__auto____3198 = cljs.core._add_watch["_"];
        if(cljs.core.truth_(or__3548__auto____3198)) {
          return or__3548__auto____3198
        }else {
          throw cljs.core.missing_protocol.call(null, "IWatchable.-add-watch", this$);
        }
      }
    }().call(null, this$, key, f)
  }
};
cljs.core._remove_watch = function _remove_watch(this$, key) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____3199 = this$;
    if(cljs.core.truth_(and__3546__auto____3199)) {
      return this$.cljs$core$IWatchable$_remove_watch
    }else {
      return and__3546__auto____3199
    }
  }())) {
    return this$.cljs$core$IWatchable$_remove_watch(this$, key)
  }else {
    return function() {
      var or__3548__auto____3200 = cljs.core._remove_watch[goog.typeOf.call(null, this$)];
      if(cljs.core.truth_(or__3548__auto____3200)) {
        return or__3548__auto____3200
      }else {
        var or__3548__auto____3201 = cljs.core._remove_watch["_"];
        if(cljs.core.truth_(or__3548__auto____3201)) {
          return or__3548__auto____3201
        }else {
          throw cljs.core.missing_protocol.call(null, "IWatchable.-remove-watch", this$);
        }
      }
    }().call(null, this$, key)
  }
};
cljs.core.identical_QMARK_ = function identical_QMARK_(x, y) {
  return x === y
};
cljs.core._EQ_ = function _EQ_(x, y) {
  return cljs.core._equiv.call(null, x, y)
};
cljs.core.nil_QMARK_ = function nil_QMARK_(x) {
  return x === null
};
cljs.core.type = function type(x) {
  return x.constructor
};
Function.prototype.cljs$core$IPrintable$ = true;
Function.prototype.cljs$core$IPrintable$_pr_seq = function(this$) {
  return cljs.core.list.call(null, "#<", cljs.core.str.call(null, this$), ">")
};
cljs.core.IHash["null"] = true;
cljs.core._hash["null"] = function(o) {
  return 0
};
cljs.core.ILookup["null"] = true;
cljs.core._lookup["null"] = function() {
  var G__3202 = null;
  var G__3202__3203 = function(o, k) {
    return null
  };
  var G__3202__3204 = function(o, k, not_found) {
    return not_found
  };
  G__3202 = function(o, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__3202__3203.call(this, o, k);
      case 3:
        return G__3202__3204.call(this, o, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__3202
}();
cljs.core.IAssociative["null"] = true;
cljs.core._assoc["null"] = function(_, k, v) {
  return cljs.core.hash_map.call(null, k, v)
};
cljs.core.ICollection["null"] = true;
cljs.core._conj["null"] = function(_, o) {
  return cljs.core.list.call(null, o)
};
cljs.core.IReduce["null"] = true;
cljs.core._reduce["null"] = function() {
  var G__3206 = null;
  var G__3206__3207 = function(_, f) {
    return f.call(null)
  };
  var G__3206__3208 = function(_, f, start) {
    return start
  };
  G__3206 = function(_, f, start) {
    switch(arguments.length) {
      case 2:
        return G__3206__3207.call(this, _, f);
      case 3:
        return G__3206__3208.call(this, _, f, start)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__3206
}();
cljs.core.IPrintable["null"] = true;
cljs.core._pr_seq["null"] = function(o) {
  return cljs.core.list.call(null, "nil")
};
cljs.core.ISet["null"] = true;
cljs.core._disjoin["null"] = function(_, v) {
  return null
};
cljs.core.ICounted["null"] = true;
cljs.core._count["null"] = function(_) {
  return 0
};
cljs.core.IStack["null"] = true;
cljs.core._peek["null"] = function(_) {
  return null
};
cljs.core._pop["null"] = function(_) {
  return null
};
cljs.core.ISeq["null"] = true;
cljs.core._first["null"] = function(_) {
  return null
};
cljs.core._rest["null"] = function(_) {
  return cljs.core.list.call(null)
};
cljs.core.IEquiv["null"] = true;
cljs.core._equiv["null"] = function(_, o) {
  return cljs.core.nil_QMARK_.call(null, o)
};
cljs.core.IWithMeta["null"] = true;
cljs.core._with_meta["null"] = function(_, meta) {
  return null
};
cljs.core.IMeta["null"] = true;
cljs.core._meta["null"] = function(_) {
  return null
};
cljs.core.IIndexed["null"] = true;
cljs.core._nth["null"] = function() {
  var G__3210 = null;
  var G__3210__3211 = function(_, n) {
    return null
  };
  var G__3210__3212 = function(_, n, not_found) {
    return not_found
  };
  G__3210 = function(_, n, not_found) {
    switch(arguments.length) {
      case 2:
        return G__3210__3211.call(this, _, n);
      case 3:
        return G__3210__3212.call(this, _, n, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__3210
}();
cljs.core.IEmptyableCollection["null"] = true;
cljs.core._empty["null"] = function(_) {
  return null
};
cljs.core.IMap["null"] = true;
cljs.core._dissoc["null"] = function(_, k) {
  return null
};
Date.prototype.cljs$core$IEquiv$ = true;
Date.prototype.cljs$core$IEquiv$_equiv = function(o, other) {
  return o.toString() === other.toString()
};
cljs.core.IHash["number"] = true;
cljs.core._hash["number"] = function(o) {
  return o
};
cljs.core.IEquiv["number"] = true;
cljs.core._equiv["number"] = function(x, o) {
  return x === o
};
cljs.core.IHash["boolean"] = true;
cljs.core._hash["boolean"] = function(o) {
  return o === true ? 1 : 0
};
cljs.core.IHash["function"] = true;
cljs.core._hash["function"] = function(o) {
  return goog.getUid.call(null, o)
};
cljs.core.inc = function inc(x) {
  return x + 1
};
cljs.core.ci_reduce = function() {
  var ci_reduce = null;
  var ci_reduce__3220 = function(cicoll, f) {
    if(cljs.core.truth_(cljs.core._EQ_.call(null, 0, cljs.core._count.call(null, cicoll)))) {
      return f.call(null)
    }else {
      var val__3214 = cljs.core._nth.call(null, cicoll, 0);
      var n__3215 = 1;
      while(true) {
        if(cljs.core.truth_(n__3215 < cljs.core._count.call(null, cicoll))) {
          var G__3224 = f.call(null, val__3214, cljs.core._nth.call(null, cicoll, n__3215));
          var G__3225 = n__3215 + 1;
          val__3214 = G__3224;
          n__3215 = G__3225;
          continue
        }else {
          return val__3214
        }
        break
      }
    }
  };
  var ci_reduce__3221 = function(cicoll, f, val) {
    var val__3216 = val;
    var n__3217 = 0;
    while(true) {
      if(cljs.core.truth_(n__3217 < cljs.core._count.call(null, cicoll))) {
        var G__3226 = f.call(null, val__3216, cljs.core._nth.call(null, cicoll, n__3217));
        var G__3227 = n__3217 + 1;
        val__3216 = G__3226;
        n__3217 = G__3227;
        continue
      }else {
        return val__3216
      }
      break
    }
  };
  var ci_reduce__3222 = function(cicoll, f, val, idx) {
    var val__3218 = val;
    var n__3219 = idx;
    while(true) {
      if(cljs.core.truth_(n__3219 < cljs.core._count.call(null, cicoll))) {
        var G__3228 = f.call(null, val__3218, cljs.core._nth.call(null, cicoll, n__3219));
        var G__3229 = n__3219 + 1;
        val__3218 = G__3228;
        n__3219 = G__3229;
        continue
      }else {
        return val__3218
      }
      break
    }
  };
  ci_reduce = function(cicoll, f, val, idx) {
    switch(arguments.length) {
      case 2:
        return ci_reduce__3220.call(this, cicoll, f);
      case 3:
        return ci_reduce__3221.call(this, cicoll, f, val);
      case 4:
        return ci_reduce__3222.call(this, cicoll, f, val, idx)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return ci_reduce
}();
cljs.core.IndexedSeq = function(a, i) {
  this.a = a;
  this.i = i
};
cljs.core.IndexedSeq.cljs$core$IPrintable$_pr_seq = function(this__360__auto__) {
  return cljs.core.list.call(null, "cljs.core.IndexedSeq")
};
cljs.core.IndexedSeq.prototype.cljs$core$IHash$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IHash$_hash = function(coll) {
  var this__3230 = this;
  return cljs.core.hash_coll.call(null, coll)
};
cljs.core.IndexedSeq.prototype.cljs$core$IReduce$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IReduce$_reduce = function() {
  var G__3243 = null;
  var G__3243__3244 = function(_, f) {
    var this__3231 = this;
    return cljs.core.ci_reduce.call(null, this__3231.a, f, this__3231.a[this__3231.i], this__3231.i + 1)
  };
  var G__3243__3245 = function(_, f, start) {
    var this__3232 = this;
    return cljs.core.ci_reduce.call(null, this__3232.a, f, start, this__3232.i)
  };
  G__3243 = function(_, f, start) {
    switch(arguments.length) {
      case 2:
        return G__3243__3244.call(this, _, f);
      case 3:
        return G__3243__3245.call(this, _, f, start)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__3243
}();
cljs.core.IndexedSeq.prototype.cljs$core$ICollection$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$ICollection$_conj = function(coll, o) {
  var this__3233 = this;
  return cljs.core.cons.call(null, o, coll)
};
cljs.core.IndexedSeq.prototype.cljs$core$IEquiv$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IEquiv$_equiv = function(coll, other) {
  var this__3234 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.IndexedSeq.prototype.cljs$core$ISequential$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IIndexed$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IIndexed$_nth = function() {
  var G__3247 = null;
  var G__3247__3248 = function(coll, n) {
    var this__3235 = this;
    var i__3236 = n + this__3235.i;
    if(cljs.core.truth_(i__3236 < this__3235.a.length)) {
      return this__3235.a[i__3236]
    }else {
      return null
    }
  };
  var G__3247__3249 = function(coll, n, not_found) {
    var this__3237 = this;
    var i__3238 = n + this__3237.i;
    if(cljs.core.truth_(i__3238 < this__3237.a.length)) {
      return this__3237.a[i__3238]
    }else {
      return not_found
    }
  };
  G__3247 = function(coll, n, not_found) {
    switch(arguments.length) {
      case 2:
        return G__3247__3248.call(this, coll, n);
      case 3:
        return G__3247__3249.call(this, coll, n, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__3247
}();
cljs.core.IndexedSeq.prototype.cljs$core$ICounted$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$ICounted$_count = function(_) {
  var this__3239 = this;
  return this__3239.a.length - this__3239.i
};
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$_first = function(_) {
  var this__3240 = this;
  return this__3240.a[this__3240.i]
};
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$_rest = function(_) {
  var this__3241 = this;
  if(cljs.core.truth_(this__3241.i + 1 < this__3241.a.length)) {
    return new cljs.core.IndexedSeq(this__3241.a, this__3241.i + 1)
  }else {
    return cljs.core.list.call(null)
  }
};
cljs.core.IndexedSeq.prototype.cljs$core$ISeqable$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$ISeqable$_seq = function(this$) {
  var this__3242 = this;
  return this$
};
cljs.core.IndexedSeq;
cljs.core.prim_seq = function prim_seq(prim, i) {
  if(cljs.core.truth_(cljs.core._EQ_.call(null, 0, prim.length))) {
    return null
  }else {
    return new cljs.core.IndexedSeq(prim, i)
  }
};
cljs.core.array_seq = function array_seq(array, i) {
  return cljs.core.prim_seq.call(null, array, i)
};
cljs.core.IReduce["array"] = true;
cljs.core._reduce["array"] = function() {
  var G__3251 = null;
  var G__3251__3252 = function(array, f) {
    return cljs.core.ci_reduce.call(null, array, f)
  };
  var G__3251__3253 = function(array, f, start) {
    return cljs.core.ci_reduce.call(null, array, f, start)
  };
  G__3251 = function(array, f, start) {
    switch(arguments.length) {
      case 2:
        return G__3251__3252.call(this, array, f);
      case 3:
        return G__3251__3253.call(this, array, f, start)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__3251
}();
cljs.core.ILookup["array"] = true;
cljs.core._lookup["array"] = function() {
  var G__3255 = null;
  var G__3255__3256 = function(array, k) {
    return array[k]
  };
  var G__3255__3257 = function(array, k, not_found) {
    return cljs.core._nth.call(null, array, k, not_found)
  };
  G__3255 = function(array, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__3255__3256.call(this, array, k);
      case 3:
        return G__3255__3257.call(this, array, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__3255
}();
cljs.core.IIndexed["array"] = true;
cljs.core._nth["array"] = function() {
  var G__3259 = null;
  var G__3259__3260 = function(array, n) {
    if(cljs.core.truth_(n < array.length)) {
      return array[n]
    }else {
      return null
    }
  };
  var G__3259__3261 = function(array, n, not_found) {
    if(cljs.core.truth_(n < array.length)) {
      return array[n]
    }else {
      return not_found
    }
  };
  G__3259 = function(array, n, not_found) {
    switch(arguments.length) {
      case 2:
        return G__3259__3260.call(this, array, n);
      case 3:
        return G__3259__3261.call(this, array, n, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__3259
}();
cljs.core.ICounted["array"] = true;
cljs.core._count["array"] = function(a) {
  return a.length
};
cljs.core.ISeqable["array"] = true;
cljs.core._seq["array"] = function(array) {
  return cljs.core.array_seq.call(null, array, 0)
};
cljs.core.seq = function seq(coll) {
  if(cljs.core.truth_(coll)) {
    return cljs.core._seq.call(null, coll)
  }else {
    return null
  }
};
cljs.core.first = function first(coll) {
  var temp__3698__auto____3263 = cljs.core.seq.call(null, coll);
  if(cljs.core.truth_(temp__3698__auto____3263)) {
    var s__3264 = temp__3698__auto____3263;
    return cljs.core._first.call(null, s__3264)
  }else {
    return null
  }
};
cljs.core.rest = function rest(coll) {
  return cljs.core._rest.call(null, cljs.core.seq.call(null, coll))
};
cljs.core.next = function next(coll) {
  if(cljs.core.truth_(coll)) {
    return cljs.core.seq.call(null, cljs.core.rest.call(null, coll))
  }else {
    return null
  }
};
cljs.core.second = function second(coll) {
  return cljs.core.first.call(null, cljs.core.next.call(null, coll))
};
cljs.core.ffirst = function ffirst(coll) {
  return cljs.core.first.call(null, cljs.core.first.call(null, coll))
};
cljs.core.nfirst = function nfirst(coll) {
  return cljs.core.next.call(null, cljs.core.first.call(null, coll))
};
cljs.core.fnext = function fnext(coll) {
  return cljs.core.first.call(null, cljs.core.next.call(null, coll))
};
cljs.core.nnext = function nnext(coll) {
  return cljs.core.next.call(null, cljs.core.next.call(null, coll))
};
cljs.core.last = function last(s) {
  while(true) {
    if(cljs.core.truth_(cljs.core.next.call(null, s))) {
      var G__3265 = cljs.core.next.call(null, s);
      s = G__3265;
      continue
    }else {
      return cljs.core.first.call(null, s)
    }
    break
  }
};
cljs.core.ICounted["_"] = true;
cljs.core._count["_"] = function(x) {
  var s__3266 = cljs.core.seq.call(null, x);
  var n__3267 = 0;
  while(true) {
    if(cljs.core.truth_(s__3266)) {
      var G__3268 = cljs.core.next.call(null, s__3266);
      var G__3269 = n__3267 + 1;
      s__3266 = G__3268;
      n__3267 = G__3269;
      continue
    }else {
      return n__3267
    }
    break
  }
};
cljs.core.IEquiv["_"] = true;
cljs.core._equiv["_"] = function(x, o) {
  return x === o
};
cljs.core.not = function not(x) {
  if(cljs.core.truth_(x)) {
    return false
  }else {
    return true
  }
};
cljs.core.conj = function() {
  var conj = null;
  var conj__3270 = function(coll, x) {
    return cljs.core._conj.call(null, coll, x)
  };
  var conj__3271 = function() {
    var G__3273__delegate = function(coll, x, xs) {
      while(true) {
        if(cljs.core.truth_(xs)) {
          var G__3274 = conj.call(null, coll, x);
          var G__3275 = cljs.core.first.call(null, xs);
          var G__3276 = cljs.core.next.call(null, xs);
          coll = G__3274;
          x = G__3275;
          xs = G__3276;
          continue
        }else {
          return conj.call(null, coll, x)
        }
        break
      }
    };
    var G__3273 = function(coll, x, var_args) {
      var xs = null;
      if(goog.isDef(var_args)) {
        xs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__3273__delegate.call(this, coll, x, xs)
    };
    G__3273.cljs$lang$maxFixedArity = 2;
    G__3273.cljs$lang$applyTo = function(arglist__3277) {
      var coll = cljs.core.first(arglist__3277);
      var x = cljs.core.first(cljs.core.next(arglist__3277));
      var xs = cljs.core.rest(cljs.core.next(arglist__3277));
      return G__3273__delegate.call(this, coll, x, xs)
    };
    return G__3273
  }();
  conj = function(coll, x, var_args) {
    var xs = var_args;
    switch(arguments.length) {
      case 2:
        return conj__3270.call(this, coll, x);
      default:
        return conj__3271.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  conj.cljs$lang$maxFixedArity = 2;
  conj.cljs$lang$applyTo = conj__3271.cljs$lang$applyTo;
  return conj
}();
cljs.core.empty = function empty(coll) {
  return cljs.core._empty.call(null, coll)
};
cljs.core.count = function count(coll) {
  return cljs.core._count.call(null, coll)
};
cljs.core.nth = function() {
  var nth = null;
  var nth__3278 = function(coll, n) {
    return cljs.core._nth.call(null, coll, Math.floor(n))
  };
  var nth__3279 = function(coll, n, not_found) {
    return cljs.core._nth.call(null, coll, Math.floor(n), not_found)
  };
  nth = function(coll, n, not_found) {
    switch(arguments.length) {
      case 2:
        return nth__3278.call(this, coll, n);
      case 3:
        return nth__3279.call(this, coll, n, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return nth
}();
cljs.core.get = function() {
  var get = null;
  var get__3281 = function(o, k) {
    return cljs.core._lookup.call(null, o, k)
  };
  var get__3282 = function(o, k, not_found) {
    return cljs.core._lookup.call(null, o, k, not_found)
  };
  get = function(o, k, not_found) {
    switch(arguments.length) {
      case 2:
        return get__3281.call(this, o, k);
      case 3:
        return get__3282.call(this, o, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return get
}();
cljs.core.assoc = function() {
  var assoc = null;
  var assoc__3285 = function(coll, k, v) {
    return cljs.core._assoc.call(null, coll, k, v)
  };
  var assoc__3286 = function() {
    var G__3288__delegate = function(coll, k, v, kvs) {
      while(true) {
        var ret__3284 = assoc.call(null, coll, k, v);
        if(cljs.core.truth_(kvs)) {
          var G__3289 = ret__3284;
          var G__3290 = cljs.core.first.call(null, kvs);
          var G__3291 = cljs.core.second.call(null, kvs);
          var G__3292 = cljs.core.nnext.call(null, kvs);
          coll = G__3289;
          k = G__3290;
          v = G__3291;
          kvs = G__3292;
          continue
        }else {
          return ret__3284
        }
        break
      }
    };
    var G__3288 = function(coll, k, v, var_args) {
      var kvs = null;
      if(goog.isDef(var_args)) {
        kvs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__3288__delegate.call(this, coll, k, v, kvs)
    };
    G__3288.cljs$lang$maxFixedArity = 3;
    G__3288.cljs$lang$applyTo = function(arglist__3293) {
      var coll = cljs.core.first(arglist__3293);
      var k = cljs.core.first(cljs.core.next(arglist__3293));
      var v = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3293)));
      var kvs = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3293)));
      return G__3288__delegate.call(this, coll, k, v, kvs)
    };
    return G__3288
  }();
  assoc = function(coll, k, v, var_args) {
    var kvs = var_args;
    switch(arguments.length) {
      case 3:
        return assoc__3285.call(this, coll, k, v);
      default:
        return assoc__3286.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  assoc.cljs$lang$maxFixedArity = 3;
  assoc.cljs$lang$applyTo = assoc__3286.cljs$lang$applyTo;
  return assoc
}();
cljs.core.dissoc = function() {
  var dissoc = null;
  var dissoc__3295 = function(coll) {
    return coll
  };
  var dissoc__3296 = function(coll, k) {
    return cljs.core._dissoc.call(null, coll, k)
  };
  var dissoc__3297 = function() {
    var G__3299__delegate = function(coll, k, ks) {
      while(true) {
        var ret__3294 = dissoc.call(null, coll, k);
        if(cljs.core.truth_(ks)) {
          var G__3300 = ret__3294;
          var G__3301 = cljs.core.first.call(null, ks);
          var G__3302 = cljs.core.next.call(null, ks);
          coll = G__3300;
          k = G__3301;
          ks = G__3302;
          continue
        }else {
          return ret__3294
        }
        break
      }
    };
    var G__3299 = function(coll, k, var_args) {
      var ks = null;
      if(goog.isDef(var_args)) {
        ks = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__3299__delegate.call(this, coll, k, ks)
    };
    G__3299.cljs$lang$maxFixedArity = 2;
    G__3299.cljs$lang$applyTo = function(arglist__3303) {
      var coll = cljs.core.first(arglist__3303);
      var k = cljs.core.first(cljs.core.next(arglist__3303));
      var ks = cljs.core.rest(cljs.core.next(arglist__3303));
      return G__3299__delegate.call(this, coll, k, ks)
    };
    return G__3299
  }();
  dissoc = function(coll, k, var_args) {
    var ks = var_args;
    switch(arguments.length) {
      case 1:
        return dissoc__3295.call(this, coll);
      case 2:
        return dissoc__3296.call(this, coll, k);
      default:
        return dissoc__3297.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  dissoc.cljs$lang$maxFixedArity = 2;
  dissoc.cljs$lang$applyTo = dissoc__3297.cljs$lang$applyTo;
  return dissoc
}();
cljs.core.with_meta = function with_meta(o, meta) {
  return cljs.core._with_meta.call(null, o, meta)
};
cljs.core.meta = function meta(o) {
  if(cljs.core.truth_(function() {
    var x__445__auto____3304 = o;
    if(cljs.core.truth_(function() {
      var and__3546__auto____3305 = x__445__auto____3304;
      if(cljs.core.truth_(and__3546__auto____3305)) {
        var and__3546__auto____3306 = x__445__auto____3304.cljs$core$IMeta$;
        if(cljs.core.truth_(and__3546__auto____3306)) {
          return cljs.core.not.call(null, x__445__auto____3304.hasOwnProperty("cljs$core$IMeta$"))
        }else {
          return and__3546__auto____3306
        }
      }else {
        return and__3546__auto____3305
      }
    }())) {
      return true
    }else {
      return cljs.core.type_satisfies_.call(null, cljs.core.IMeta, x__445__auto____3304)
    }
  }())) {
    return cljs.core._meta.call(null, o)
  }else {
    return null
  }
};
cljs.core.peek = function peek(coll) {
  return cljs.core._peek.call(null, coll)
};
cljs.core.pop = function pop(coll) {
  return cljs.core._pop.call(null, coll)
};
cljs.core.disj = function() {
  var disj = null;
  var disj__3308 = function(coll) {
    return coll
  };
  var disj__3309 = function(coll, k) {
    return cljs.core._disjoin.call(null, coll, k)
  };
  var disj__3310 = function() {
    var G__3312__delegate = function(coll, k, ks) {
      while(true) {
        var ret__3307 = disj.call(null, coll, k);
        if(cljs.core.truth_(ks)) {
          var G__3313 = ret__3307;
          var G__3314 = cljs.core.first.call(null, ks);
          var G__3315 = cljs.core.next.call(null, ks);
          coll = G__3313;
          k = G__3314;
          ks = G__3315;
          continue
        }else {
          return ret__3307
        }
        break
      }
    };
    var G__3312 = function(coll, k, var_args) {
      var ks = null;
      if(goog.isDef(var_args)) {
        ks = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__3312__delegate.call(this, coll, k, ks)
    };
    G__3312.cljs$lang$maxFixedArity = 2;
    G__3312.cljs$lang$applyTo = function(arglist__3316) {
      var coll = cljs.core.first(arglist__3316);
      var k = cljs.core.first(cljs.core.next(arglist__3316));
      var ks = cljs.core.rest(cljs.core.next(arglist__3316));
      return G__3312__delegate.call(this, coll, k, ks)
    };
    return G__3312
  }();
  disj = function(coll, k, var_args) {
    var ks = var_args;
    switch(arguments.length) {
      case 1:
        return disj__3308.call(this, coll);
      case 2:
        return disj__3309.call(this, coll, k);
      default:
        return disj__3310.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  disj.cljs$lang$maxFixedArity = 2;
  disj.cljs$lang$applyTo = disj__3310.cljs$lang$applyTo;
  return disj
}();
cljs.core.hash = function hash(o) {
  return cljs.core._hash.call(null, o)
};
cljs.core.empty_QMARK_ = function empty_QMARK_(coll) {
  return cljs.core.not.call(null, cljs.core.seq.call(null, coll))
};
cljs.core.coll_QMARK_ = function coll_QMARK_(x) {
  if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, x))) {
    return false
  }else {
    var x__445__auto____3317 = x;
    if(cljs.core.truth_(function() {
      var and__3546__auto____3318 = x__445__auto____3317;
      if(cljs.core.truth_(and__3546__auto____3318)) {
        var and__3546__auto____3319 = x__445__auto____3317.cljs$core$ICollection$;
        if(cljs.core.truth_(and__3546__auto____3319)) {
          return cljs.core.not.call(null, x__445__auto____3317.hasOwnProperty("cljs$core$ICollection$"))
        }else {
          return and__3546__auto____3319
        }
      }else {
        return and__3546__auto____3318
      }
    }())) {
      return true
    }else {
      return cljs.core.type_satisfies_.call(null, cljs.core.ICollection, x__445__auto____3317)
    }
  }
};
cljs.core.set_QMARK_ = function set_QMARK_(x) {
  if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, x))) {
    return false
  }else {
    var x__445__auto____3320 = x;
    if(cljs.core.truth_(function() {
      var and__3546__auto____3321 = x__445__auto____3320;
      if(cljs.core.truth_(and__3546__auto____3321)) {
        var and__3546__auto____3322 = x__445__auto____3320.cljs$core$ISet$;
        if(cljs.core.truth_(and__3546__auto____3322)) {
          return cljs.core.not.call(null, x__445__auto____3320.hasOwnProperty("cljs$core$ISet$"))
        }else {
          return and__3546__auto____3322
        }
      }else {
        return and__3546__auto____3321
      }
    }())) {
      return true
    }else {
      return cljs.core.type_satisfies_.call(null, cljs.core.ISet, x__445__auto____3320)
    }
  }
};
cljs.core.associative_QMARK_ = function associative_QMARK_(x) {
  var x__445__auto____3323 = x;
  if(cljs.core.truth_(function() {
    var and__3546__auto____3324 = x__445__auto____3323;
    if(cljs.core.truth_(and__3546__auto____3324)) {
      var and__3546__auto____3325 = x__445__auto____3323.cljs$core$IAssociative$;
      if(cljs.core.truth_(and__3546__auto____3325)) {
        return cljs.core.not.call(null, x__445__auto____3323.hasOwnProperty("cljs$core$IAssociative$"))
      }else {
        return and__3546__auto____3325
      }
    }else {
      return and__3546__auto____3324
    }
  }())) {
    return true
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.IAssociative, x__445__auto____3323)
  }
};
cljs.core.sequential_QMARK_ = function sequential_QMARK_(x) {
  var x__445__auto____3326 = x;
  if(cljs.core.truth_(function() {
    var and__3546__auto____3327 = x__445__auto____3326;
    if(cljs.core.truth_(and__3546__auto____3327)) {
      var and__3546__auto____3328 = x__445__auto____3326.cljs$core$ISequential$;
      if(cljs.core.truth_(and__3546__auto____3328)) {
        return cljs.core.not.call(null, x__445__auto____3326.hasOwnProperty("cljs$core$ISequential$"))
      }else {
        return and__3546__auto____3328
      }
    }else {
      return and__3546__auto____3327
    }
  }())) {
    return true
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.ISequential, x__445__auto____3326)
  }
};
cljs.core.counted_QMARK_ = function counted_QMARK_(x) {
  var x__445__auto____3329 = x;
  if(cljs.core.truth_(function() {
    var and__3546__auto____3330 = x__445__auto____3329;
    if(cljs.core.truth_(and__3546__auto____3330)) {
      var and__3546__auto____3331 = x__445__auto____3329.cljs$core$ICounted$;
      if(cljs.core.truth_(and__3546__auto____3331)) {
        return cljs.core.not.call(null, x__445__auto____3329.hasOwnProperty("cljs$core$ICounted$"))
      }else {
        return and__3546__auto____3331
      }
    }else {
      return and__3546__auto____3330
    }
  }())) {
    return true
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.ICounted, x__445__auto____3329)
  }
};
cljs.core.map_QMARK_ = function map_QMARK_(x) {
  if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, x))) {
    return false
  }else {
    var x__445__auto____3332 = x;
    if(cljs.core.truth_(function() {
      var and__3546__auto____3333 = x__445__auto____3332;
      if(cljs.core.truth_(and__3546__auto____3333)) {
        var and__3546__auto____3334 = x__445__auto____3332.cljs$core$IMap$;
        if(cljs.core.truth_(and__3546__auto____3334)) {
          return cljs.core.not.call(null, x__445__auto____3332.hasOwnProperty("cljs$core$IMap$"))
        }else {
          return and__3546__auto____3334
        }
      }else {
        return and__3546__auto____3333
      }
    }())) {
      return true
    }else {
      return cljs.core.type_satisfies_.call(null, cljs.core.IMap, x__445__auto____3332)
    }
  }
};
cljs.core.vector_QMARK_ = function vector_QMARK_(x) {
  var x__445__auto____3335 = x;
  if(cljs.core.truth_(function() {
    var and__3546__auto____3336 = x__445__auto____3335;
    if(cljs.core.truth_(and__3546__auto____3336)) {
      var and__3546__auto____3337 = x__445__auto____3335.cljs$core$IVector$;
      if(cljs.core.truth_(and__3546__auto____3337)) {
        return cljs.core.not.call(null, x__445__auto____3335.hasOwnProperty("cljs$core$IVector$"))
      }else {
        return and__3546__auto____3337
      }
    }else {
      return and__3546__auto____3336
    }
  }())) {
    return true
  }else {
    return cljs.core.type_satisfies_.call(null, cljs.core.IVector, x__445__auto____3335)
  }
};
cljs.core.js_obj = function js_obj() {
  return{}
};
cljs.core.js_keys = function js_keys(obj) {
  var keys__3338 = cljs.core.array.call(null);
  goog.object.forEach.call(null, obj, function(val, key, obj) {
    return keys__3338.push(key)
  });
  return keys__3338
};
cljs.core.js_delete = function js_delete(obj, key) {
  return delete obj[key]
};
cljs.core.lookup_sentinel = cljs.core.js_obj.call(null);
cljs.core.false_QMARK_ = function false_QMARK_(x) {
  return x === false
};
cljs.core.true_QMARK_ = function true_QMARK_(x) {
  return x === true
};
cljs.core.undefined_QMARK_ = function undefined_QMARK_(x) {
  return void 0 === x
};
cljs.core.instance_QMARK_ = function instance_QMARK_(t, o) {
  return o != null && (o instanceof t || o.constructor === t || t === Object)
};
cljs.core.seq_QMARK_ = function seq_QMARK_(s) {
  if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, s))) {
    return false
  }else {
    var x__445__auto____3339 = s;
    if(cljs.core.truth_(function() {
      var and__3546__auto____3340 = x__445__auto____3339;
      if(cljs.core.truth_(and__3546__auto____3340)) {
        var and__3546__auto____3341 = x__445__auto____3339.cljs$core$ISeq$;
        if(cljs.core.truth_(and__3546__auto____3341)) {
          return cljs.core.not.call(null, x__445__auto____3339.hasOwnProperty("cljs$core$ISeq$"))
        }else {
          return and__3546__auto____3341
        }
      }else {
        return and__3546__auto____3340
      }
    }())) {
      return true
    }else {
      return cljs.core.type_satisfies_.call(null, cljs.core.ISeq, x__445__auto____3339)
    }
  }
};
cljs.core.boolean$ = function boolean$(x) {
  if(cljs.core.truth_(x)) {
    return true
  }else {
    return false
  }
};
cljs.core.string_QMARK_ = function string_QMARK_(x) {
  var and__3546__auto____3342 = goog.isString.call(null, x);
  if(cljs.core.truth_(and__3546__auto____3342)) {
    return cljs.core.not.call(null, function() {
      var or__3548__auto____3343 = cljs.core._EQ_.call(null, x.charAt(0), "\ufdd0");
      if(cljs.core.truth_(or__3548__auto____3343)) {
        return or__3548__auto____3343
      }else {
        return cljs.core._EQ_.call(null, x.charAt(0), "\ufdd1")
      }
    }())
  }else {
    return and__3546__auto____3342
  }
};
cljs.core.keyword_QMARK_ = function keyword_QMARK_(x) {
  var and__3546__auto____3344 = goog.isString.call(null, x);
  if(cljs.core.truth_(and__3546__auto____3344)) {
    return cljs.core._EQ_.call(null, x.charAt(0), "\ufdd0")
  }else {
    return and__3546__auto____3344
  }
};
cljs.core.symbol_QMARK_ = function symbol_QMARK_(x) {
  var and__3546__auto____3345 = goog.isString.call(null, x);
  if(cljs.core.truth_(and__3546__auto____3345)) {
    return cljs.core._EQ_.call(null, x.charAt(0), "\ufdd1")
  }else {
    return and__3546__auto____3345
  }
};
cljs.core.number_QMARK_ = function number_QMARK_(n) {
  return goog.isNumber.call(null, n)
};
cljs.core.fn_QMARK_ = function fn_QMARK_(f) {
  return goog.isFunction.call(null, f)
};
cljs.core.integer_QMARK_ = function integer_QMARK_(n) {
  var and__3546__auto____3346 = cljs.core.number_QMARK_.call(null, n);
  if(cljs.core.truth_(and__3546__auto____3346)) {
    return n == n.toFixed()
  }else {
    return and__3546__auto____3346
  }
};
cljs.core.contains_QMARK_ = function contains_QMARK_(coll, v) {
  if(cljs.core.truth_(cljs.core._lookup.call(null, coll, v, cljs.core.lookup_sentinel) === cljs.core.lookup_sentinel)) {
    return false
  }else {
    return true
  }
};
cljs.core.find = function find(coll, k) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____3347 = coll;
    if(cljs.core.truth_(and__3546__auto____3347)) {
      var and__3546__auto____3348 = cljs.core.associative_QMARK_.call(null, coll);
      if(cljs.core.truth_(and__3546__auto____3348)) {
        return cljs.core.contains_QMARK_.call(null, coll, k)
      }else {
        return and__3546__auto____3348
      }
    }else {
      return and__3546__auto____3347
    }
  }())) {
    return cljs.core.Vector.fromArray([k, cljs.core._lookup.call(null, coll, k)])
  }else {
    return null
  }
};
cljs.core.distinct_QMARK_ = function() {
  var distinct_QMARK_ = null;
  var distinct_QMARK___3353 = function(x) {
    return true
  };
  var distinct_QMARK___3354 = function(x, y) {
    return cljs.core.not.call(null, cljs.core._EQ_.call(null, x, y))
  };
  var distinct_QMARK___3355 = function() {
    var G__3357__delegate = function(x, y, more) {
      if(cljs.core.truth_(cljs.core.not.call(null, cljs.core._EQ_.call(null, x, y)))) {
        var s__3349 = cljs.core.set([y, x]);
        var xs__3350 = more;
        while(true) {
          var x__3351 = cljs.core.first.call(null, xs__3350);
          var etc__3352 = cljs.core.next.call(null, xs__3350);
          if(cljs.core.truth_(xs__3350)) {
            if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null, s__3349, x__3351))) {
              return false
            }else {
              var G__3358 = cljs.core.conj.call(null, s__3349, x__3351);
              var G__3359 = etc__3352;
              s__3349 = G__3358;
              xs__3350 = G__3359;
              continue
            }
          }else {
            return true
          }
          break
        }
      }else {
        return false
      }
    };
    var G__3357 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__3357__delegate.call(this, x, y, more)
    };
    G__3357.cljs$lang$maxFixedArity = 2;
    G__3357.cljs$lang$applyTo = function(arglist__3360) {
      var x = cljs.core.first(arglist__3360);
      var y = cljs.core.first(cljs.core.next(arglist__3360));
      var more = cljs.core.rest(cljs.core.next(arglist__3360));
      return G__3357__delegate.call(this, x, y, more)
    };
    return G__3357
  }();
  distinct_QMARK_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return distinct_QMARK___3353.call(this, x);
      case 2:
        return distinct_QMARK___3354.call(this, x, y);
      default:
        return distinct_QMARK___3355.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  distinct_QMARK_.cljs$lang$maxFixedArity = 2;
  distinct_QMARK_.cljs$lang$applyTo = distinct_QMARK___3355.cljs$lang$applyTo;
  return distinct_QMARK_
}();
cljs.core.compare = function compare(x, y) {
  return goog.array.defaultCompare.call(null, x, y)
};
cljs.core.fn__GT_comparator = function fn__GT_comparator(f) {
  if(cljs.core.truth_(cljs.core._EQ_.call(null, f, cljs.core.compare))) {
    return cljs.core.compare
  }else {
    return function(x, y) {
      var r__3361 = f.call(null, x, y);
      if(cljs.core.truth_(cljs.core.number_QMARK_.call(null, r__3361))) {
        return r__3361
      }else {
        if(cljs.core.truth_(r__3361)) {
          return-1
        }else {
          if(cljs.core.truth_(f.call(null, y, x))) {
            return 1
          }else {
            return 0
          }
        }
      }
    }
  }
};
cljs.core.sort = function() {
  var sort = null;
  var sort__3363 = function(coll) {
    return sort.call(null, cljs.core.compare, coll)
  };
  var sort__3364 = function(comp, coll) {
    if(cljs.core.truth_(cljs.core.seq.call(null, coll))) {
      var a__3362 = cljs.core.to_array.call(null, coll);
      goog.array.stableSort.call(null, a__3362, cljs.core.fn__GT_comparator.call(null, comp));
      return cljs.core.seq.call(null, a__3362)
    }else {
      return cljs.core.List.EMPTY
    }
  };
  sort = function(comp, coll) {
    switch(arguments.length) {
      case 1:
        return sort__3363.call(this, comp);
      case 2:
        return sort__3364.call(this, comp, coll)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return sort
}();
cljs.core.sort_by = function() {
  var sort_by = null;
  var sort_by__3366 = function(keyfn, coll) {
    return sort_by.call(null, keyfn, cljs.core.compare, coll)
  };
  var sort_by__3367 = function(keyfn, comp, coll) {
    return cljs.core.sort.call(null, function(x, y) {
      return cljs.core.fn__GT_comparator.call(null, comp).call(null, keyfn.call(null, x), keyfn.call(null, y))
    }, coll)
  };
  sort_by = function(keyfn, comp, coll) {
    switch(arguments.length) {
      case 2:
        return sort_by__3366.call(this, keyfn, comp);
      case 3:
        return sort_by__3367.call(this, keyfn, comp, coll)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return sort_by
}();
cljs.core.reduce = function() {
  var reduce = null;
  var reduce__3369 = function(f, coll) {
    return cljs.core._reduce.call(null, coll, f)
  };
  var reduce__3370 = function(f, val, coll) {
    return cljs.core._reduce.call(null, coll, f, val)
  };
  reduce = function(f, val, coll) {
    switch(arguments.length) {
      case 2:
        return reduce__3369.call(this, f, val);
      case 3:
        return reduce__3370.call(this, f, val, coll)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return reduce
}();
cljs.core.seq_reduce = function() {
  var seq_reduce = null;
  var seq_reduce__3376 = function(f, coll) {
    var temp__3695__auto____3372 = cljs.core.seq.call(null, coll);
    if(cljs.core.truth_(temp__3695__auto____3372)) {
      var s__3373 = temp__3695__auto____3372;
      return cljs.core.reduce.call(null, f, cljs.core.first.call(null, s__3373), cljs.core.next.call(null, s__3373))
    }else {
      return f.call(null)
    }
  };
  var seq_reduce__3377 = function(f, val, coll) {
    var val__3374 = val;
    var coll__3375 = cljs.core.seq.call(null, coll);
    while(true) {
      if(cljs.core.truth_(coll__3375)) {
        var G__3379 = f.call(null, val__3374, cljs.core.first.call(null, coll__3375));
        var G__3380 = cljs.core.next.call(null, coll__3375);
        val__3374 = G__3379;
        coll__3375 = G__3380;
        continue
      }else {
        return val__3374
      }
      break
    }
  };
  seq_reduce = function(f, val, coll) {
    switch(arguments.length) {
      case 2:
        return seq_reduce__3376.call(this, f, val);
      case 3:
        return seq_reduce__3377.call(this, f, val, coll)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return seq_reduce
}();
cljs.core.IReduce["_"] = true;
cljs.core._reduce["_"] = function() {
  var G__3381 = null;
  var G__3381__3382 = function(coll, f) {
    return cljs.core.seq_reduce.call(null, f, coll)
  };
  var G__3381__3383 = function(coll, f, start) {
    return cljs.core.seq_reduce.call(null, f, start, coll)
  };
  G__3381 = function(coll, f, start) {
    switch(arguments.length) {
      case 2:
        return G__3381__3382.call(this, coll, f);
      case 3:
        return G__3381__3383.call(this, coll, f, start)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__3381
}();
cljs.core._PLUS_ = function() {
  var _PLUS_ = null;
  var _PLUS___3385 = function() {
    return 0
  };
  var _PLUS___3386 = function(x) {
    return x
  };
  var _PLUS___3387 = function(x, y) {
    return x + y
  };
  var _PLUS___3388 = function() {
    var G__3390__delegate = function(x, y, more) {
      return cljs.core.reduce.call(null, _PLUS_, x + y, more)
    };
    var G__3390 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__3390__delegate.call(this, x, y, more)
    };
    G__3390.cljs$lang$maxFixedArity = 2;
    G__3390.cljs$lang$applyTo = function(arglist__3391) {
      var x = cljs.core.first(arglist__3391);
      var y = cljs.core.first(cljs.core.next(arglist__3391));
      var more = cljs.core.rest(cljs.core.next(arglist__3391));
      return G__3390__delegate.call(this, x, y, more)
    };
    return G__3390
  }();
  _PLUS_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 0:
        return _PLUS___3385.call(this);
      case 1:
        return _PLUS___3386.call(this, x);
      case 2:
        return _PLUS___3387.call(this, x, y);
      default:
        return _PLUS___3388.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  _PLUS_.cljs$lang$maxFixedArity = 2;
  _PLUS_.cljs$lang$applyTo = _PLUS___3388.cljs$lang$applyTo;
  return _PLUS_
}();
cljs.core._ = function() {
  var _ = null;
  var ___3392 = function(x) {
    return-x
  };
  var ___3393 = function(x, y) {
    return x - y
  };
  var ___3394 = function() {
    var G__3396__delegate = function(x, y, more) {
      return cljs.core.reduce.call(null, _, x - y, more)
    };
    var G__3396 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__3396__delegate.call(this, x, y, more)
    };
    G__3396.cljs$lang$maxFixedArity = 2;
    G__3396.cljs$lang$applyTo = function(arglist__3397) {
      var x = cljs.core.first(arglist__3397);
      var y = cljs.core.first(cljs.core.next(arglist__3397));
      var more = cljs.core.rest(cljs.core.next(arglist__3397));
      return G__3396__delegate.call(this, x, y, more)
    };
    return G__3396
  }();
  _ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return ___3392.call(this, x);
      case 2:
        return ___3393.call(this, x, y);
      default:
        return ___3394.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  _.cljs$lang$maxFixedArity = 2;
  _.cljs$lang$applyTo = ___3394.cljs$lang$applyTo;
  return _
}();
cljs.core._STAR_ = function() {
  var _STAR_ = null;
  var _STAR___3398 = function() {
    return 1
  };
  var _STAR___3399 = function(x) {
    return x
  };
  var _STAR___3400 = function(x, y) {
    return x * y
  };
  var _STAR___3401 = function() {
    var G__3403__delegate = function(x, y, more) {
      return cljs.core.reduce.call(null, _STAR_, x * y, more)
    };
    var G__3403 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__3403__delegate.call(this, x, y, more)
    };
    G__3403.cljs$lang$maxFixedArity = 2;
    G__3403.cljs$lang$applyTo = function(arglist__3404) {
      var x = cljs.core.first(arglist__3404);
      var y = cljs.core.first(cljs.core.next(arglist__3404));
      var more = cljs.core.rest(cljs.core.next(arglist__3404));
      return G__3403__delegate.call(this, x, y, more)
    };
    return G__3403
  }();
  _STAR_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 0:
        return _STAR___3398.call(this);
      case 1:
        return _STAR___3399.call(this, x);
      case 2:
        return _STAR___3400.call(this, x, y);
      default:
        return _STAR___3401.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  _STAR_.cljs$lang$maxFixedArity = 2;
  _STAR_.cljs$lang$applyTo = _STAR___3401.cljs$lang$applyTo;
  return _STAR_
}();
cljs.core._SLASH_ = function() {
  var _SLASH_ = null;
  var _SLASH___3405 = function(x) {
    return _SLASH_.call(null, 1, x)
  };
  var _SLASH___3406 = function(x, y) {
    return _SLASH_.call(null, x, y)
  };
  var _SLASH___3407 = function() {
    var G__3409__delegate = function(x, y, more) {
      return cljs.core.reduce.call(null, _SLASH_, _SLASH_.call(null, x, y), more)
    };
    var G__3409 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__3409__delegate.call(this, x, y, more)
    };
    G__3409.cljs$lang$maxFixedArity = 2;
    G__3409.cljs$lang$applyTo = function(arglist__3410) {
      var x = cljs.core.first(arglist__3410);
      var y = cljs.core.first(cljs.core.next(arglist__3410));
      var more = cljs.core.rest(cljs.core.next(arglist__3410));
      return G__3409__delegate.call(this, x, y, more)
    };
    return G__3409
  }();
  _SLASH_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return _SLASH___3405.call(this, x);
      case 2:
        return _SLASH___3406.call(this, x, y);
      default:
        return _SLASH___3407.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  _SLASH_.cljs$lang$maxFixedArity = 2;
  _SLASH_.cljs$lang$applyTo = _SLASH___3407.cljs$lang$applyTo;
  return _SLASH_
}();
cljs.core._LT_ = function() {
  var _LT_ = null;
  var _LT___3411 = function(x) {
    return true
  };
  var _LT___3412 = function(x, y) {
    return x < y
  };
  var _LT___3413 = function() {
    var G__3415__delegate = function(x, y, more) {
      while(true) {
        if(cljs.core.truth_(x < y)) {
          if(cljs.core.truth_(cljs.core.next.call(null, more))) {
            var G__3416 = y;
            var G__3417 = cljs.core.first.call(null, more);
            var G__3418 = cljs.core.next.call(null, more);
            x = G__3416;
            y = G__3417;
            more = G__3418;
            continue
          }else {
            return y < cljs.core.first.call(null, more)
          }
        }else {
          return false
        }
        break
      }
    };
    var G__3415 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__3415__delegate.call(this, x, y, more)
    };
    G__3415.cljs$lang$maxFixedArity = 2;
    G__3415.cljs$lang$applyTo = function(arglist__3419) {
      var x = cljs.core.first(arglist__3419);
      var y = cljs.core.first(cljs.core.next(arglist__3419));
      var more = cljs.core.rest(cljs.core.next(arglist__3419));
      return G__3415__delegate.call(this, x, y, more)
    };
    return G__3415
  }();
  _LT_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return _LT___3411.call(this, x);
      case 2:
        return _LT___3412.call(this, x, y);
      default:
        return _LT___3413.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  _LT_.cljs$lang$maxFixedArity = 2;
  _LT_.cljs$lang$applyTo = _LT___3413.cljs$lang$applyTo;
  return _LT_
}();
cljs.core._LT__EQ_ = function() {
  var _LT__EQ_ = null;
  var _LT__EQ___3420 = function(x) {
    return true
  };
  var _LT__EQ___3421 = function(x, y) {
    return x <= y
  };
  var _LT__EQ___3422 = function() {
    var G__3424__delegate = function(x, y, more) {
      while(true) {
        if(cljs.core.truth_(x <= y)) {
          if(cljs.core.truth_(cljs.core.next.call(null, more))) {
            var G__3425 = y;
            var G__3426 = cljs.core.first.call(null, more);
            var G__3427 = cljs.core.next.call(null, more);
            x = G__3425;
            y = G__3426;
            more = G__3427;
            continue
          }else {
            return y <= cljs.core.first.call(null, more)
          }
        }else {
          return false
        }
        break
      }
    };
    var G__3424 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__3424__delegate.call(this, x, y, more)
    };
    G__3424.cljs$lang$maxFixedArity = 2;
    G__3424.cljs$lang$applyTo = function(arglist__3428) {
      var x = cljs.core.first(arglist__3428);
      var y = cljs.core.first(cljs.core.next(arglist__3428));
      var more = cljs.core.rest(cljs.core.next(arglist__3428));
      return G__3424__delegate.call(this, x, y, more)
    };
    return G__3424
  }();
  _LT__EQ_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return _LT__EQ___3420.call(this, x);
      case 2:
        return _LT__EQ___3421.call(this, x, y);
      default:
        return _LT__EQ___3422.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  _LT__EQ_.cljs$lang$maxFixedArity = 2;
  _LT__EQ_.cljs$lang$applyTo = _LT__EQ___3422.cljs$lang$applyTo;
  return _LT__EQ_
}();
cljs.core._GT_ = function() {
  var _GT_ = null;
  var _GT___3429 = function(x) {
    return true
  };
  var _GT___3430 = function(x, y) {
    return x > y
  };
  var _GT___3431 = function() {
    var G__3433__delegate = function(x, y, more) {
      while(true) {
        if(cljs.core.truth_(x > y)) {
          if(cljs.core.truth_(cljs.core.next.call(null, more))) {
            var G__3434 = y;
            var G__3435 = cljs.core.first.call(null, more);
            var G__3436 = cljs.core.next.call(null, more);
            x = G__3434;
            y = G__3435;
            more = G__3436;
            continue
          }else {
            return y > cljs.core.first.call(null, more)
          }
        }else {
          return false
        }
        break
      }
    };
    var G__3433 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__3433__delegate.call(this, x, y, more)
    };
    G__3433.cljs$lang$maxFixedArity = 2;
    G__3433.cljs$lang$applyTo = function(arglist__3437) {
      var x = cljs.core.first(arglist__3437);
      var y = cljs.core.first(cljs.core.next(arglist__3437));
      var more = cljs.core.rest(cljs.core.next(arglist__3437));
      return G__3433__delegate.call(this, x, y, more)
    };
    return G__3433
  }();
  _GT_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return _GT___3429.call(this, x);
      case 2:
        return _GT___3430.call(this, x, y);
      default:
        return _GT___3431.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  _GT_.cljs$lang$maxFixedArity = 2;
  _GT_.cljs$lang$applyTo = _GT___3431.cljs$lang$applyTo;
  return _GT_
}();
cljs.core._GT__EQ_ = function() {
  var _GT__EQ_ = null;
  var _GT__EQ___3438 = function(x) {
    return true
  };
  var _GT__EQ___3439 = function(x, y) {
    return x >= y
  };
  var _GT__EQ___3440 = function() {
    var G__3442__delegate = function(x, y, more) {
      while(true) {
        if(cljs.core.truth_(x >= y)) {
          if(cljs.core.truth_(cljs.core.next.call(null, more))) {
            var G__3443 = y;
            var G__3444 = cljs.core.first.call(null, more);
            var G__3445 = cljs.core.next.call(null, more);
            x = G__3443;
            y = G__3444;
            more = G__3445;
            continue
          }else {
            return y >= cljs.core.first.call(null, more)
          }
        }else {
          return false
        }
        break
      }
    };
    var G__3442 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__3442__delegate.call(this, x, y, more)
    };
    G__3442.cljs$lang$maxFixedArity = 2;
    G__3442.cljs$lang$applyTo = function(arglist__3446) {
      var x = cljs.core.first(arglist__3446);
      var y = cljs.core.first(cljs.core.next(arglist__3446));
      var more = cljs.core.rest(cljs.core.next(arglist__3446));
      return G__3442__delegate.call(this, x, y, more)
    };
    return G__3442
  }();
  _GT__EQ_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return _GT__EQ___3438.call(this, x);
      case 2:
        return _GT__EQ___3439.call(this, x, y);
      default:
        return _GT__EQ___3440.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  _GT__EQ_.cljs$lang$maxFixedArity = 2;
  _GT__EQ_.cljs$lang$applyTo = _GT__EQ___3440.cljs$lang$applyTo;
  return _GT__EQ_
}();
cljs.core.dec = function dec(x) {
  return x - 1
};
cljs.core.max = function() {
  var max = null;
  var max__3447 = function(x) {
    return x
  };
  var max__3448 = function(x, y) {
    return x > y ? x : y
  };
  var max__3449 = function() {
    var G__3451__delegate = function(x, y, more) {
      return cljs.core.reduce.call(null, max, x > y ? x : y, more)
    };
    var G__3451 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__3451__delegate.call(this, x, y, more)
    };
    G__3451.cljs$lang$maxFixedArity = 2;
    G__3451.cljs$lang$applyTo = function(arglist__3452) {
      var x = cljs.core.first(arglist__3452);
      var y = cljs.core.first(cljs.core.next(arglist__3452));
      var more = cljs.core.rest(cljs.core.next(arglist__3452));
      return G__3451__delegate.call(this, x, y, more)
    };
    return G__3451
  }();
  max = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return max__3447.call(this, x);
      case 2:
        return max__3448.call(this, x, y);
      default:
        return max__3449.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  max.cljs$lang$maxFixedArity = 2;
  max.cljs$lang$applyTo = max__3449.cljs$lang$applyTo;
  return max
}();
cljs.core.min = function() {
  var min = null;
  var min__3453 = function(x) {
    return x
  };
  var min__3454 = function(x, y) {
    return x < y ? x : y
  };
  var min__3455 = function() {
    var G__3457__delegate = function(x, y, more) {
      return cljs.core.reduce.call(null, min, x < y ? x : y, more)
    };
    var G__3457 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__3457__delegate.call(this, x, y, more)
    };
    G__3457.cljs$lang$maxFixedArity = 2;
    G__3457.cljs$lang$applyTo = function(arglist__3458) {
      var x = cljs.core.first(arglist__3458);
      var y = cljs.core.first(cljs.core.next(arglist__3458));
      var more = cljs.core.rest(cljs.core.next(arglist__3458));
      return G__3457__delegate.call(this, x, y, more)
    };
    return G__3457
  }();
  min = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return min__3453.call(this, x);
      case 2:
        return min__3454.call(this, x, y);
      default:
        return min__3455.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  min.cljs$lang$maxFixedArity = 2;
  min.cljs$lang$applyTo = min__3455.cljs$lang$applyTo;
  return min
}();
cljs.core.fix = function fix(q) {
  if(cljs.core.truth_(q >= 0)) {
    return Math.floor.call(null, q)
  }else {
    return Math.ceil.call(null, q)
  }
};
cljs.core.mod = function mod(n, d) {
  return n % d
};
cljs.core.quot = function quot(n, d) {
  var rem__3459 = n % d;
  return cljs.core.fix.call(null, (n - rem__3459) / d)
};
cljs.core.rem = function rem(n, d) {
  var q__3460 = cljs.core.quot.call(null, n, d);
  return n - d * q__3460
};
cljs.core.rand = function() {
  var rand = null;
  var rand__3461 = function() {
    return Math.random.call(null)
  };
  var rand__3462 = function(n) {
    return n * rand.call(null)
  };
  rand = function(n) {
    switch(arguments.length) {
      case 0:
        return rand__3461.call(this);
      case 1:
        return rand__3462.call(this, n)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return rand
}();
cljs.core.rand_int = function rand_int(n) {
  return cljs.core.fix.call(null, cljs.core.rand.call(null, n))
};
cljs.core.bit_xor = function bit_xor(x, y) {
  return x ^ y
};
cljs.core.bit_and = function bit_and(x, y) {
  return x & y
};
cljs.core.bit_or = function bit_or(x, y) {
  return x | y
};
cljs.core.bit_and_not = function bit_and_not(x, y) {
  return x & ~y
};
cljs.core.bit_clear = function bit_clear(x, n) {
  return x & ~(1 << n)
};
cljs.core.bit_flip = function bit_flip(x, n) {
  return x ^ 1 << n
};
cljs.core.bit_not = function bit_not(x) {
  return~x
};
cljs.core.bit_set = function bit_set(x, n) {
  return x | 1 << n
};
cljs.core.bit_test = function bit_test(x, n) {
  return(x & 1 << n) != 0
};
cljs.core.bit_shift_left = function bit_shift_left(x, n) {
  return x << n
};
cljs.core.bit_shift_right = function bit_shift_right(x, n) {
  return x >> n
};
cljs.core._EQ__EQ_ = function() {
  var _EQ__EQ_ = null;
  var _EQ__EQ___3464 = function(x) {
    return true
  };
  var _EQ__EQ___3465 = function(x, y) {
    return cljs.core._equiv.call(null, x, y)
  };
  var _EQ__EQ___3466 = function() {
    var G__3468__delegate = function(x, y, more) {
      while(true) {
        if(cljs.core.truth_(_EQ__EQ_.call(null, x, y))) {
          if(cljs.core.truth_(cljs.core.next.call(null, more))) {
            var G__3469 = y;
            var G__3470 = cljs.core.first.call(null, more);
            var G__3471 = cljs.core.next.call(null, more);
            x = G__3469;
            y = G__3470;
            more = G__3471;
            continue
          }else {
            return _EQ__EQ_.call(null, y, cljs.core.first.call(null, more))
          }
        }else {
          return false
        }
        break
      }
    };
    var G__3468 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__3468__delegate.call(this, x, y, more)
    };
    G__3468.cljs$lang$maxFixedArity = 2;
    G__3468.cljs$lang$applyTo = function(arglist__3472) {
      var x = cljs.core.first(arglist__3472);
      var y = cljs.core.first(cljs.core.next(arglist__3472));
      var more = cljs.core.rest(cljs.core.next(arglist__3472));
      return G__3468__delegate.call(this, x, y, more)
    };
    return G__3468
  }();
  _EQ__EQ_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return _EQ__EQ___3464.call(this, x);
      case 2:
        return _EQ__EQ___3465.call(this, x, y);
      default:
        return _EQ__EQ___3466.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  _EQ__EQ_.cljs$lang$maxFixedArity = 2;
  _EQ__EQ_.cljs$lang$applyTo = _EQ__EQ___3466.cljs$lang$applyTo;
  return _EQ__EQ_
}();
cljs.core.pos_QMARK_ = function pos_QMARK_(n) {
  return n > 0
};
cljs.core.zero_QMARK_ = function zero_QMARK_(n) {
  return n === 0
};
cljs.core.neg_QMARK_ = function neg_QMARK_(x) {
  return x < 0
};
cljs.core.nthnext = function nthnext(coll, n) {
  var n__3473 = n;
  var xs__3474 = cljs.core.seq.call(null, coll);
  while(true) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____3475 = xs__3474;
      if(cljs.core.truth_(and__3546__auto____3475)) {
        return n__3473 > 0
      }else {
        return and__3546__auto____3475
      }
    }())) {
      var G__3476 = n__3473 - 1;
      var G__3477 = cljs.core.next.call(null, xs__3474);
      n__3473 = G__3476;
      xs__3474 = G__3477;
      continue
    }else {
      return xs__3474
    }
    break
  }
};
cljs.core.IIndexed["_"] = true;
cljs.core._nth["_"] = function() {
  var G__3482 = null;
  var G__3482__3483 = function(coll, n) {
    var temp__3695__auto____3478 = cljs.core.nthnext.call(null, coll, n);
    if(cljs.core.truth_(temp__3695__auto____3478)) {
      var xs__3479 = temp__3695__auto____3478;
      return cljs.core.first.call(null, xs__3479)
    }else {
      throw new Error("Index out of bounds");
    }
  };
  var G__3482__3484 = function(coll, n, not_found) {
    var temp__3695__auto____3480 = cljs.core.nthnext.call(null, coll, n);
    if(cljs.core.truth_(temp__3695__auto____3480)) {
      var xs__3481 = temp__3695__auto____3480;
      return cljs.core.first.call(null, xs__3481)
    }else {
      return not_found
    }
  };
  G__3482 = function(coll, n, not_found) {
    switch(arguments.length) {
      case 2:
        return G__3482__3483.call(this, coll, n);
      case 3:
        return G__3482__3484.call(this, coll, n, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__3482
}();
cljs.core.str_STAR_ = function() {
  var str_STAR_ = null;
  var str_STAR___3486 = function() {
    return""
  };
  var str_STAR___3487 = function(x) {
    if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, x))) {
      return""
    }else {
      if(cljs.core.truth_("\ufdd0'else")) {
        return x.toString()
      }else {
        return null
      }
    }
  };
  var str_STAR___3488 = function() {
    var G__3490__delegate = function(x, ys) {
      return function(sb, more) {
        while(true) {
          if(cljs.core.truth_(more)) {
            var G__3491 = sb.append(str_STAR_.call(null, cljs.core.first.call(null, more)));
            var G__3492 = cljs.core.next.call(null, more);
            sb = G__3491;
            more = G__3492;
            continue
          }else {
            return str_STAR_.call(null, sb)
          }
          break
        }
      }.call(null, new goog.string.StringBuffer(str_STAR_.call(null, x)), ys)
    };
    var G__3490 = function(x, var_args) {
      var ys = null;
      if(goog.isDef(var_args)) {
        ys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
      }
      return G__3490__delegate.call(this, x, ys)
    };
    G__3490.cljs$lang$maxFixedArity = 1;
    G__3490.cljs$lang$applyTo = function(arglist__3493) {
      var x = cljs.core.first(arglist__3493);
      var ys = cljs.core.rest(arglist__3493);
      return G__3490__delegate.call(this, x, ys)
    };
    return G__3490
  }();
  str_STAR_ = function(x, var_args) {
    var ys = var_args;
    switch(arguments.length) {
      case 0:
        return str_STAR___3486.call(this);
      case 1:
        return str_STAR___3487.call(this, x);
      default:
        return str_STAR___3488.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  str_STAR_.cljs$lang$maxFixedArity = 1;
  str_STAR_.cljs$lang$applyTo = str_STAR___3488.cljs$lang$applyTo;
  return str_STAR_
}();
cljs.core.str = function() {
  var str = null;
  var str__3494 = function() {
    return""
  };
  var str__3495 = function(x) {
    if(cljs.core.truth_(cljs.core.symbol_QMARK_.call(null, x))) {
      return x.substring(2, x.length)
    }else {
      if(cljs.core.truth_(cljs.core.keyword_QMARK_.call(null, x))) {
        return cljs.core.str_STAR_.call(null, ":", x.substring(2, x.length))
      }else {
        if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, x))) {
          return""
        }else {
          if(cljs.core.truth_("\ufdd0'else")) {
            return x.toString()
          }else {
            return null
          }
        }
      }
    }
  };
  var str__3496 = function() {
    var G__3498__delegate = function(x, ys) {
      return cljs.core.apply.call(null, cljs.core.str_STAR_, x, ys)
    };
    var G__3498 = function(x, var_args) {
      var ys = null;
      if(goog.isDef(var_args)) {
        ys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
      }
      return G__3498__delegate.call(this, x, ys)
    };
    G__3498.cljs$lang$maxFixedArity = 1;
    G__3498.cljs$lang$applyTo = function(arglist__3499) {
      var x = cljs.core.first(arglist__3499);
      var ys = cljs.core.rest(arglist__3499);
      return G__3498__delegate.call(this, x, ys)
    };
    return G__3498
  }();
  str = function(x, var_args) {
    var ys = var_args;
    switch(arguments.length) {
      case 0:
        return str__3494.call(this);
      case 1:
        return str__3495.call(this, x);
      default:
        return str__3496.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  str.cljs$lang$maxFixedArity = 1;
  str.cljs$lang$applyTo = str__3496.cljs$lang$applyTo;
  return str
}();
cljs.core.subs = function() {
  var subs = null;
  var subs__3500 = function(s, start) {
    return s.substring(start)
  };
  var subs__3501 = function(s, start, end) {
    return s.substring(start, end)
  };
  subs = function(s, start, end) {
    switch(arguments.length) {
      case 2:
        return subs__3500.call(this, s, start);
      case 3:
        return subs__3501.call(this, s, start, end)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return subs
}();
cljs.core.symbol = function() {
  var symbol = null;
  var symbol__3503 = function(name) {
    if(cljs.core.truth_(cljs.core.symbol_QMARK_.call(null, name))) {
      name
    }else {
      if(cljs.core.truth_(cljs.core.keyword_QMARK_.call(null, name))) {
        cljs.core.str_STAR_.call(null, "\ufdd1", "'", cljs.core.subs.call(null, name, 2))
      }else {
      }
    }
    return cljs.core.str_STAR_.call(null, "\ufdd1", "'", name)
  };
  var symbol__3504 = function(ns, name) {
    return symbol.call(null, cljs.core.str_STAR_.call(null, ns, "/", name))
  };
  symbol = function(ns, name) {
    switch(arguments.length) {
      case 1:
        return symbol__3503.call(this, ns);
      case 2:
        return symbol__3504.call(this, ns, name)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return symbol
}();
cljs.core.keyword = function() {
  var keyword = null;
  var keyword__3506 = function(name) {
    if(cljs.core.truth_(cljs.core.keyword_QMARK_.call(null, name))) {
      return name
    }else {
      if(cljs.core.truth_(cljs.core.symbol_QMARK_.call(null, name))) {
        return cljs.core.str_STAR_.call(null, "\ufdd0", "'", cljs.core.subs.call(null, name, 2))
      }else {
        if(cljs.core.truth_("\ufdd0'else")) {
          return cljs.core.str_STAR_.call(null, "\ufdd0", "'", name)
        }else {
          return null
        }
      }
    }
  };
  var keyword__3507 = function(ns, name) {
    return keyword.call(null, cljs.core.str_STAR_.call(null, ns, "/", name))
  };
  keyword = function(ns, name) {
    switch(arguments.length) {
      case 1:
        return keyword__3506.call(this, ns);
      case 2:
        return keyword__3507.call(this, ns, name)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return keyword
}();
cljs.core.equiv_sequential = function equiv_sequential(x, y) {
  return cljs.core.boolean$.call(null, cljs.core.truth_(cljs.core.sequential_QMARK_.call(null, y)) ? function() {
    var xs__3509 = cljs.core.seq.call(null, x);
    var ys__3510 = cljs.core.seq.call(null, y);
    while(true) {
      if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, xs__3509))) {
        return cljs.core.nil_QMARK_.call(null, ys__3510)
      }else {
        if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, ys__3510))) {
          return false
        }else {
          if(cljs.core.truth_(cljs.core._EQ_.call(null, cljs.core.first.call(null, xs__3509), cljs.core.first.call(null, ys__3510)))) {
            var G__3511 = cljs.core.next.call(null, xs__3509);
            var G__3512 = cljs.core.next.call(null, ys__3510);
            xs__3509 = G__3511;
            ys__3510 = G__3512;
            continue
          }else {
            if(cljs.core.truth_("\ufdd0'else")) {
              return false
            }else {
              return null
            }
          }
        }
      }
      break
    }
  }() : null)
};
cljs.core.hash_combine = function hash_combine(seed, hash) {
  return seed ^ hash + 2654435769 + (seed << 6) + (seed >> 2)
};
cljs.core.hash_coll = function hash_coll(coll) {
  return cljs.core.reduce.call(null, function(p1__3513_SHARP_, p2__3514_SHARP_) {
    return cljs.core.hash_combine.call(null, p1__3513_SHARP_, cljs.core.hash.call(null, p2__3514_SHARP_))
  }, cljs.core.hash.call(null, cljs.core.first.call(null, coll)), cljs.core.next.call(null, coll))
};
cljs.core.extend_object_BANG_ = function extend_object_BANG_(obj, fn_map) {
  var G__3515__3516 = cljs.core.seq.call(null, fn_map);
  if(cljs.core.truth_(G__3515__3516)) {
    var G__3518__3520 = cljs.core.first.call(null, G__3515__3516);
    var vec__3519__3521 = G__3518__3520;
    var key_name__3522 = cljs.core.nth.call(null, vec__3519__3521, 0, null);
    var f__3523 = cljs.core.nth.call(null, vec__3519__3521, 1, null);
    var G__3515__3524 = G__3515__3516;
    var G__3518__3525 = G__3518__3520;
    var G__3515__3526 = G__3515__3524;
    while(true) {
      var vec__3527__3528 = G__3518__3525;
      var key_name__3529 = cljs.core.nth.call(null, vec__3527__3528, 0, null);
      var f__3530 = cljs.core.nth.call(null, vec__3527__3528, 1, null);
      var G__3515__3531 = G__3515__3526;
      var str_name__3532 = cljs.core.name.call(null, key_name__3529);
      obj[str_name__3532] = f__3530;
      var temp__3698__auto____3533 = cljs.core.next.call(null, G__3515__3531);
      if(cljs.core.truth_(temp__3698__auto____3533)) {
        var G__3515__3534 = temp__3698__auto____3533;
        var G__3535 = cljs.core.first.call(null, G__3515__3534);
        var G__3536 = G__3515__3534;
        G__3518__3525 = G__3535;
        G__3515__3526 = G__3536;
        continue
      }else {
      }
      break
    }
  }else {
  }
  return obj
};
cljs.core.List = function(meta, first, rest, count) {
  this.meta = meta;
  this.first = first;
  this.rest = rest;
  this.count = count
};
cljs.core.List.cljs$core$IPrintable$_pr_seq = function(this__360__auto__) {
  return cljs.core.list.call(null, "cljs.core.List")
};
cljs.core.List.prototype.cljs$core$IHash$ = true;
cljs.core.List.prototype.cljs$core$IHash$_hash = function(coll) {
  var this__3537 = this;
  return cljs.core.hash_coll.call(null, coll)
};
cljs.core.List.prototype.cljs$core$ISequential$ = true;
cljs.core.List.prototype.cljs$core$ICollection$ = true;
cljs.core.List.prototype.cljs$core$ICollection$_conj = function(coll, o) {
  var this__3538 = this;
  return new cljs.core.List(this__3538.meta, o, coll, this__3538.count + 1)
};
cljs.core.List.prototype.cljs$core$ISeqable$ = true;
cljs.core.List.prototype.cljs$core$ISeqable$_seq = function(coll) {
  var this__3539 = this;
  return coll
};
cljs.core.List.prototype.cljs$core$ICounted$ = true;
cljs.core.List.prototype.cljs$core$ICounted$_count = function(coll) {
  var this__3540 = this;
  return this__3540.count
};
cljs.core.List.prototype.cljs$core$IStack$ = true;
cljs.core.List.prototype.cljs$core$IStack$_peek = function(coll) {
  var this__3541 = this;
  return this__3541.first
};
cljs.core.List.prototype.cljs$core$IStack$_pop = function(coll) {
  var this__3542 = this;
  return cljs.core._rest.call(null, coll)
};
cljs.core.List.prototype.cljs$core$ISeq$ = true;
cljs.core.List.prototype.cljs$core$ISeq$_first = function(coll) {
  var this__3543 = this;
  return this__3543.first
};
cljs.core.List.prototype.cljs$core$ISeq$_rest = function(coll) {
  var this__3544 = this;
  return this__3544.rest
};
cljs.core.List.prototype.cljs$core$IEquiv$ = true;
cljs.core.List.prototype.cljs$core$IEquiv$_equiv = function(coll, other) {
  var this__3545 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.List.prototype.cljs$core$IWithMeta$ = true;
cljs.core.List.prototype.cljs$core$IWithMeta$_with_meta = function(coll, meta) {
  var this__3546 = this;
  return new cljs.core.List(meta, this__3546.first, this__3546.rest, this__3546.count)
};
cljs.core.List.prototype.cljs$core$IMeta$ = true;
cljs.core.List.prototype.cljs$core$IMeta$_meta = function(coll) {
  var this__3547 = this;
  return this__3547.meta
};
cljs.core.List.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.List.prototype.cljs$core$IEmptyableCollection$_empty = function(coll) {
  var this__3548 = this;
  return cljs.core.List.EMPTY
};
cljs.core.List;
cljs.core.EmptyList = function(meta) {
  this.meta = meta
};
cljs.core.EmptyList.cljs$core$IPrintable$_pr_seq = function(this__360__auto__) {
  return cljs.core.list.call(null, "cljs.core.EmptyList")
};
cljs.core.EmptyList.prototype.cljs$core$IHash$ = true;
cljs.core.EmptyList.prototype.cljs$core$IHash$_hash = function(coll) {
  var this__3549 = this;
  return cljs.core.hash_coll.call(null, coll)
};
cljs.core.EmptyList.prototype.cljs$core$ISequential$ = true;
cljs.core.EmptyList.prototype.cljs$core$ICollection$ = true;
cljs.core.EmptyList.prototype.cljs$core$ICollection$_conj = function(coll, o) {
  var this__3550 = this;
  return new cljs.core.List(this__3550.meta, o, null, 1)
};
cljs.core.EmptyList.prototype.cljs$core$ISeqable$ = true;
cljs.core.EmptyList.prototype.cljs$core$ISeqable$_seq = function(coll) {
  var this__3551 = this;
  return null
};
cljs.core.EmptyList.prototype.cljs$core$ICounted$ = true;
cljs.core.EmptyList.prototype.cljs$core$ICounted$_count = function(coll) {
  var this__3552 = this;
  return 0
};
cljs.core.EmptyList.prototype.cljs$core$IStack$ = true;
cljs.core.EmptyList.prototype.cljs$core$IStack$_peek = function(coll) {
  var this__3553 = this;
  return null
};
cljs.core.EmptyList.prototype.cljs$core$IStack$_pop = function(coll) {
  var this__3554 = this;
  return null
};
cljs.core.EmptyList.prototype.cljs$core$ISeq$ = true;
cljs.core.EmptyList.prototype.cljs$core$ISeq$_first = function(coll) {
  var this__3555 = this;
  return null
};
cljs.core.EmptyList.prototype.cljs$core$ISeq$_rest = function(coll) {
  var this__3556 = this;
  return null
};
cljs.core.EmptyList.prototype.cljs$core$IEquiv$ = true;
cljs.core.EmptyList.prototype.cljs$core$IEquiv$_equiv = function(coll, other) {
  var this__3557 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.EmptyList.prototype.cljs$core$IWithMeta$ = true;
cljs.core.EmptyList.prototype.cljs$core$IWithMeta$_with_meta = function(coll, meta) {
  var this__3558 = this;
  return new cljs.core.EmptyList(meta)
};
cljs.core.EmptyList.prototype.cljs$core$IMeta$ = true;
cljs.core.EmptyList.prototype.cljs$core$IMeta$_meta = function(coll) {
  var this__3559 = this;
  return this__3559.meta
};
cljs.core.EmptyList.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.EmptyList.prototype.cljs$core$IEmptyableCollection$_empty = function(coll) {
  var this__3560 = this;
  return coll
};
cljs.core.EmptyList;
cljs.core.List.EMPTY = new cljs.core.EmptyList(null);
cljs.core.reverse = function reverse(coll) {
  return cljs.core.reduce.call(null, cljs.core.conj, cljs.core.List.EMPTY, coll)
};
cljs.core.list = function() {
  var list__delegate = function(items) {
    return cljs.core.reduce.call(null, cljs.core.conj, cljs.core.List.EMPTY, cljs.core.reverse.call(null, items))
  };
  var list = function(var_args) {
    var items = null;
    if(goog.isDef(var_args)) {
      items = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return list__delegate.call(this, items)
  };
  list.cljs$lang$maxFixedArity = 0;
  list.cljs$lang$applyTo = function(arglist__3561) {
    var items = cljs.core.seq(arglist__3561);
    return list__delegate.call(this, items)
  };
  return list
}();
cljs.core.Cons = function(meta, first, rest) {
  this.meta = meta;
  this.first = first;
  this.rest = rest
};
cljs.core.Cons.cljs$core$IPrintable$_pr_seq = function(this__360__auto__) {
  return cljs.core.list.call(null, "cljs.core.Cons")
};
cljs.core.Cons.prototype.cljs$core$ISeqable$ = true;
cljs.core.Cons.prototype.cljs$core$ISeqable$_seq = function(coll) {
  var this__3562 = this;
  return coll
};
cljs.core.Cons.prototype.cljs$core$IHash$ = true;
cljs.core.Cons.prototype.cljs$core$IHash$_hash = function(coll) {
  var this__3563 = this;
  return cljs.core.hash_coll.call(null, coll)
};
cljs.core.Cons.prototype.cljs$core$IEquiv$ = true;
cljs.core.Cons.prototype.cljs$core$IEquiv$_equiv = function(coll, other) {
  var this__3564 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.Cons.prototype.cljs$core$ISequential$ = true;
cljs.core.Cons.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.Cons.prototype.cljs$core$IEmptyableCollection$_empty = function(coll) {
  var this__3565 = this;
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this__3565.meta)
};
cljs.core.Cons.prototype.cljs$core$ICollection$ = true;
cljs.core.Cons.prototype.cljs$core$ICollection$_conj = function(coll, o) {
  var this__3566 = this;
  return new cljs.core.Cons(null, o, coll)
};
cljs.core.Cons.prototype.cljs$core$ISeq$ = true;
cljs.core.Cons.prototype.cljs$core$ISeq$_first = function(coll) {
  var this__3567 = this;
  return this__3567.first
};
cljs.core.Cons.prototype.cljs$core$ISeq$_rest = function(coll) {
  var this__3568 = this;
  if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, this__3568.rest))) {
    return cljs.core.List.EMPTY
  }else {
    return this__3568.rest
  }
};
cljs.core.Cons.prototype.cljs$core$IMeta$ = true;
cljs.core.Cons.prototype.cljs$core$IMeta$_meta = function(coll) {
  var this__3569 = this;
  return this__3569.meta
};
cljs.core.Cons.prototype.cljs$core$IWithMeta$ = true;
cljs.core.Cons.prototype.cljs$core$IWithMeta$_with_meta = function(coll, meta) {
  var this__3570 = this;
  return new cljs.core.Cons(meta, this__3570.first, this__3570.rest)
};
cljs.core.Cons;
cljs.core.cons = function cons(x, seq) {
  return new cljs.core.Cons(null, x, seq)
};
cljs.core.IReduce["string"] = true;
cljs.core._reduce["string"] = function() {
  var G__3571 = null;
  var G__3571__3572 = function(string, f) {
    return cljs.core.ci_reduce.call(null, string, f)
  };
  var G__3571__3573 = function(string, f, start) {
    return cljs.core.ci_reduce.call(null, string, f, start)
  };
  G__3571 = function(string, f, start) {
    switch(arguments.length) {
      case 2:
        return G__3571__3572.call(this, string, f);
      case 3:
        return G__3571__3573.call(this, string, f, start)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__3571
}();
cljs.core.ILookup["string"] = true;
cljs.core._lookup["string"] = function() {
  var G__3575 = null;
  var G__3575__3576 = function(string, k) {
    return cljs.core._nth.call(null, string, k)
  };
  var G__3575__3577 = function(string, k, not_found) {
    return cljs.core._nth.call(null, string, k, not_found)
  };
  G__3575 = function(string, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__3575__3576.call(this, string, k);
      case 3:
        return G__3575__3577.call(this, string, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__3575
}();
cljs.core.IIndexed["string"] = true;
cljs.core._nth["string"] = function() {
  var G__3579 = null;
  var G__3579__3580 = function(string, n) {
    if(cljs.core.truth_(n < cljs.core._count.call(null, string))) {
      return string.charAt(n)
    }else {
      return null
    }
  };
  var G__3579__3581 = function(string, n, not_found) {
    if(cljs.core.truth_(n < cljs.core._count.call(null, string))) {
      return string.charAt(n)
    }else {
      return not_found
    }
  };
  G__3579 = function(string, n, not_found) {
    switch(arguments.length) {
      case 2:
        return G__3579__3580.call(this, string, n);
      case 3:
        return G__3579__3581.call(this, string, n, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__3579
}();
cljs.core.ICounted["string"] = true;
cljs.core._count["string"] = function(s) {
  return s.length
};
cljs.core.ISeqable["string"] = true;
cljs.core._seq["string"] = function(string) {
  return cljs.core.prim_seq.call(null, string, 0)
};
cljs.core.IHash["string"] = true;
cljs.core._hash["string"] = function(o) {
  return goog.string.hashCode.call(null, o)
};
String.prototype.cljs$core$IFn$ = true;
String.prototype.call = function() {
  var G__3583 = null;
  var G__3583__3584 = function(this$, coll) {
    this$ = this;
    return cljs.core.get.call(null, coll, this$.toString())
  };
  var G__3583__3585 = function(this$, coll, not_found) {
    this$ = this;
    return cljs.core.get.call(null, coll, this$.toString(), not_found)
  };
  G__3583 = function(this$, coll, not_found) {
    switch(arguments.length) {
      case 2:
        return G__3583__3584.call(this, this$, coll);
      case 3:
        return G__3583__3585.call(this, this$, coll, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__3583
}();
String["prototype"]["apply"] = function(s, args) {
  if(cljs.core.truth_(cljs.core.count.call(null, args) < 2)) {
    return cljs.core.get.call(null, args[0], s)
  }else {
    return cljs.core.get.call(null, args[0], s, args[1])
  }
};
cljs.core.lazy_seq_value = function lazy_seq_value(lazy_seq) {
  var x__3587 = lazy_seq.x;
  if(cljs.core.truth_(lazy_seq.realized)) {
    return x__3587
  }else {
    lazy_seq.x = x__3587.call(null);
    lazy_seq.realized = true;
    return lazy_seq.x
  }
};
cljs.core.LazySeq = function(meta, realized, x) {
  this.meta = meta;
  this.realized = realized;
  this.x = x
};
cljs.core.LazySeq.cljs$core$IPrintable$_pr_seq = function(this__360__auto__) {
  return cljs.core.list.call(null, "cljs.core.LazySeq")
};
cljs.core.LazySeq.prototype.cljs$core$ISeqable$ = true;
cljs.core.LazySeq.prototype.cljs$core$ISeqable$_seq = function(coll) {
  var this__3588 = this;
  return cljs.core.seq.call(null, cljs.core.lazy_seq_value.call(null, coll))
};
cljs.core.LazySeq.prototype.cljs$core$IHash$ = true;
cljs.core.LazySeq.prototype.cljs$core$IHash$_hash = function(coll) {
  var this__3589 = this;
  return cljs.core.hash_coll.call(null, coll)
};
cljs.core.LazySeq.prototype.cljs$core$IEquiv$ = true;
cljs.core.LazySeq.prototype.cljs$core$IEquiv$_equiv = function(coll, other) {
  var this__3590 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.LazySeq.prototype.cljs$core$ISequential$ = true;
cljs.core.LazySeq.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.LazySeq.prototype.cljs$core$IEmptyableCollection$_empty = function(coll) {
  var this__3591 = this;
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this__3591.meta)
};
cljs.core.LazySeq.prototype.cljs$core$ICollection$ = true;
cljs.core.LazySeq.prototype.cljs$core$ICollection$_conj = function(coll, o) {
  var this__3592 = this;
  return cljs.core.cons.call(null, o, coll)
};
cljs.core.LazySeq.prototype.cljs$core$ISeq$ = true;
cljs.core.LazySeq.prototype.cljs$core$ISeq$_first = function(coll) {
  var this__3593 = this;
  return cljs.core.first.call(null, cljs.core.lazy_seq_value.call(null, coll))
};
cljs.core.LazySeq.prototype.cljs$core$ISeq$_rest = function(coll) {
  var this__3594 = this;
  return cljs.core.rest.call(null, cljs.core.lazy_seq_value.call(null, coll))
};
cljs.core.LazySeq.prototype.cljs$core$IMeta$ = true;
cljs.core.LazySeq.prototype.cljs$core$IMeta$_meta = function(coll) {
  var this__3595 = this;
  return this__3595.meta
};
cljs.core.LazySeq.prototype.cljs$core$IWithMeta$ = true;
cljs.core.LazySeq.prototype.cljs$core$IWithMeta$_with_meta = function(coll, meta) {
  var this__3596 = this;
  return new cljs.core.LazySeq(meta, this__3596.realized, this__3596.x)
};
cljs.core.LazySeq;
cljs.core.to_array = function to_array(s) {
  var ary__3597 = cljs.core.array.call(null);
  var s__3598 = s;
  while(true) {
    if(cljs.core.truth_(cljs.core.seq.call(null, s__3598))) {
      ary__3597.push(cljs.core.first.call(null, s__3598));
      var G__3599 = cljs.core.next.call(null, s__3598);
      s__3598 = G__3599;
      continue
    }else {
      return ary__3597
    }
    break
  }
};
cljs.core.bounded_count = function bounded_count(s, n) {
  var s__3600 = s;
  var i__3601 = n;
  var sum__3602 = 0;
  while(true) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____3603 = i__3601 > 0;
      if(cljs.core.truth_(and__3546__auto____3603)) {
        return cljs.core.seq.call(null, s__3600)
      }else {
        return and__3546__auto____3603
      }
    }())) {
      var G__3604 = cljs.core.next.call(null, s__3600);
      var G__3605 = i__3601 - 1;
      var G__3606 = sum__3602 + 1;
      s__3600 = G__3604;
      i__3601 = G__3605;
      sum__3602 = G__3606;
      continue
    }else {
      return sum__3602
    }
    break
  }
};
cljs.core.spread = function spread(arglist) {
  if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, arglist))) {
    return null
  }else {
    if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, cljs.core.next.call(null, arglist)))) {
      return cljs.core.seq.call(null, cljs.core.first.call(null, arglist))
    }else {
      if(cljs.core.truth_("\ufdd0'else")) {
        return cljs.core.cons.call(null, cljs.core.first.call(null, arglist), spread.call(null, cljs.core.next.call(null, arglist)))
      }else {
        return null
      }
    }
  }
};
cljs.core.concat = function() {
  var concat = null;
  var concat__3610 = function() {
    return new cljs.core.LazySeq(null, false, function() {
      return null
    })
  };
  var concat__3611 = function(x) {
    return new cljs.core.LazySeq(null, false, function() {
      return x
    })
  };
  var concat__3612 = function(x, y) {
    return new cljs.core.LazySeq(null, false, function() {
      var s__3607 = cljs.core.seq.call(null, x);
      if(cljs.core.truth_(s__3607)) {
        return cljs.core.cons.call(null, cljs.core.first.call(null, s__3607), concat.call(null, cljs.core.rest.call(null, s__3607), y))
      }else {
        return y
      }
    })
  };
  var concat__3613 = function() {
    var G__3615__delegate = function(x, y, zs) {
      var cat__3609 = function cat(xys, zs) {
        return new cljs.core.LazySeq(null, false, function() {
          var xys__3608 = cljs.core.seq.call(null, xys);
          if(cljs.core.truth_(xys__3608)) {
            return cljs.core.cons.call(null, cljs.core.first.call(null, xys__3608), cat.call(null, cljs.core.rest.call(null, xys__3608), zs))
          }else {
            if(cljs.core.truth_(zs)) {
              return cat.call(null, cljs.core.first.call(null, zs), cljs.core.next.call(null, zs))
            }else {
              return null
            }
          }
        })
      };
      return cat__3609.call(null, concat.call(null, x, y), zs)
    };
    var G__3615 = function(x, y, var_args) {
      var zs = null;
      if(goog.isDef(var_args)) {
        zs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__3615__delegate.call(this, x, y, zs)
    };
    G__3615.cljs$lang$maxFixedArity = 2;
    G__3615.cljs$lang$applyTo = function(arglist__3616) {
      var x = cljs.core.first(arglist__3616);
      var y = cljs.core.first(cljs.core.next(arglist__3616));
      var zs = cljs.core.rest(cljs.core.next(arglist__3616));
      return G__3615__delegate.call(this, x, y, zs)
    };
    return G__3615
  }();
  concat = function(x, y, var_args) {
    var zs = var_args;
    switch(arguments.length) {
      case 0:
        return concat__3610.call(this);
      case 1:
        return concat__3611.call(this, x);
      case 2:
        return concat__3612.call(this, x, y);
      default:
        return concat__3613.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  concat.cljs$lang$maxFixedArity = 2;
  concat.cljs$lang$applyTo = concat__3613.cljs$lang$applyTo;
  return concat
}();
cljs.core.list_STAR_ = function() {
  var list_STAR_ = null;
  var list_STAR___3617 = function(args) {
    return cljs.core.seq.call(null, args)
  };
  var list_STAR___3618 = function(a, args) {
    return cljs.core.cons.call(null, a, args)
  };
  var list_STAR___3619 = function(a, b, args) {
    return cljs.core.cons.call(null, a, cljs.core.cons.call(null, b, args))
  };
  var list_STAR___3620 = function(a, b, c, args) {
    return cljs.core.cons.call(null, a, cljs.core.cons.call(null, b, cljs.core.cons.call(null, c, args)))
  };
  var list_STAR___3621 = function() {
    var G__3623__delegate = function(a, b, c, d, more) {
      return cljs.core.cons.call(null, a, cljs.core.cons.call(null, b, cljs.core.cons.call(null, c, cljs.core.cons.call(null, d, cljs.core.spread.call(null, more)))))
    };
    var G__3623 = function(a, b, c, d, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0)
      }
      return G__3623__delegate.call(this, a, b, c, d, more)
    };
    G__3623.cljs$lang$maxFixedArity = 4;
    G__3623.cljs$lang$applyTo = function(arglist__3624) {
      var a = cljs.core.first(arglist__3624);
      var b = cljs.core.first(cljs.core.next(arglist__3624));
      var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3624)));
      var d = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3624))));
      var more = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3624))));
      return G__3623__delegate.call(this, a, b, c, d, more)
    };
    return G__3623
  }();
  list_STAR_ = function(a, b, c, d, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return list_STAR___3617.call(this, a);
      case 2:
        return list_STAR___3618.call(this, a, b);
      case 3:
        return list_STAR___3619.call(this, a, b, c);
      case 4:
        return list_STAR___3620.call(this, a, b, c, d);
      default:
        return list_STAR___3621.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  list_STAR_.cljs$lang$maxFixedArity = 4;
  list_STAR_.cljs$lang$applyTo = list_STAR___3621.cljs$lang$applyTo;
  return list_STAR_
}();
cljs.core.apply = function() {
  var apply = null;
  var apply__3634 = function(f, args) {
    var fixed_arity__3625 = f.cljs$lang$maxFixedArity;
    if(cljs.core.truth_(f.cljs$lang$applyTo)) {
      if(cljs.core.truth_(cljs.core.bounded_count.call(null, args, fixed_arity__3625 + 1) <= fixed_arity__3625)) {
        return f.apply(f, cljs.core.to_array.call(null, args))
      }else {
        return f.cljs$lang$applyTo(args)
      }
    }else {
      return f.apply(f, cljs.core.to_array.call(null, args))
    }
  };
  var apply__3635 = function(f, x, args) {
    var arglist__3626 = cljs.core.list_STAR_.call(null, x, args);
    var fixed_arity__3627 = f.cljs$lang$maxFixedArity;
    if(cljs.core.truth_(f.cljs$lang$applyTo)) {
      if(cljs.core.truth_(cljs.core.bounded_count.call(null, arglist__3626, fixed_arity__3627) <= fixed_arity__3627)) {
        return f.apply(f, cljs.core.to_array.call(null, arglist__3626))
      }else {
        return f.cljs$lang$applyTo(arglist__3626)
      }
    }else {
      return f.apply(f, cljs.core.to_array.call(null, arglist__3626))
    }
  };
  var apply__3636 = function(f, x, y, args) {
    var arglist__3628 = cljs.core.list_STAR_.call(null, x, y, args);
    var fixed_arity__3629 = f.cljs$lang$maxFixedArity;
    if(cljs.core.truth_(f.cljs$lang$applyTo)) {
      if(cljs.core.truth_(cljs.core.bounded_count.call(null, arglist__3628, fixed_arity__3629) <= fixed_arity__3629)) {
        return f.apply(f, cljs.core.to_array.call(null, arglist__3628))
      }else {
        return f.cljs$lang$applyTo(arglist__3628)
      }
    }else {
      return f.apply(f, cljs.core.to_array.call(null, arglist__3628))
    }
  };
  var apply__3637 = function(f, x, y, z, args) {
    var arglist__3630 = cljs.core.list_STAR_.call(null, x, y, z, args);
    var fixed_arity__3631 = f.cljs$lang$maxFixedArity;
    if(cljs.core.truth_(f.cljs$lang$applyTo)) {
      if(cljs.core.truth_(cljs.core.bounded_count.call(null, arglist__3630, fixed_arity__3631) <= fixed_arity__3631)) {
        return f.apply(f, cljs.core.to_array.call(null, arglist__3630))
      }else {
        return f.cljs$lang$applyTo(arglist__3630)
      }
    }else {
      return f.apply(f, cljs.core.to_array.call(null, arglist__3630))
    }
  };
  var apply__3638 = function() {
    var G__3640__delegate = function(f, a, b, c, d, args) {
      var arglist__3632 = cljs.core.cons.call(null, a, cljs.core.cons.call(null, b, cljs.core.cons.call(null, c, cljs.core.cons.call(null, d, cljs.core.spread.call(null, args)))));
      var fixed_arity__3633 = f.cljs$lang$maxFixedArity;
      if(cljs.core.truth_(f.cljs$lang$applyTo)) {
        if(cljs.core.truth_(cljs.core.bounded_count.call(null, arglist__3632, fixed_arity__3633) <= fixed_arity__3633)) {
          return f.apply(f, cljs.core.to_array.call(null, arglist__3632))
        }else {
          return f.cljs$lang$applyTo(arglist__3632)
        }
      }else {
        return f.apply(f, cljs.core.to_array.call(null, arglist__3632))
      }
    };
    var G__3640 = function(f, a, b, c, d, var_args) {
      var args = null;
      if(goog.isDef(var_args)) {
        args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 5), 0)
      }
      return G__3640__delegate.call(this, f, a, b, c, d, args)
    };
    G__3640.cljs$lang$maxFixedArity = 5;
    G__3640.cljs$lang$applyTo = function(arglist__3641) {
      var f = cljs.core.first(arglist__3641);
      var a = cljs.core.first(cljs.core.next(arglist__3641));
      var b = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3641)));
      var c = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3641))));
      var d = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3641)))));
      var args = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3641)))));
      return G__3640__delegate.call(this, f, a, b, c, d, args)
    };
    return G__3640
  }();
  apply = function(f, a, b, c, d, var_args) {
    var args = var_args;
    switch(arguments.length) {
      case 2:
        return apply__3634.call(this, f, a);
      case 3:
        return apply__3635.call(this, f, a, b);
      case 4:
        return apply__3636.call(this, f, a, b, c);
      case 5:
        return apply__3637.call(this, f, a, b, c, d);
      default:
        return apply__3638.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  apply.cljs$lang$maxFixedArity = 5;
  apply.cljs$lang$applyTo = apply__3638.cljs$lang$applyTo;
  return apply
}();
cljs.core.vary_meta = function() {
  var vary_meta__delegate = function(obj, f, args) {
    return cljs.core.with_meta.call(null, obj, cljs.core.apply.call(null, f, cljs.core.meta.call(null, obj), args))
  };
  var vary_meta = function(obj, f, var_args) {
    var args = null;
    if(goog.isDef(var_args)) {
      args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
    }
    return vary_meta__delegate.call(this, obj, f, args)
  };
  vary_meta.cljs$lang$maxFixedArity = 2;
  vary_meta.cljs$lang$applyTo = function(arglist__3642) {
    var obj = cljs.core.first(arglist__3642);
    var f = cljs.core.first(cljs.core.next(arglist__3642));
    var args = cljs.core.rest(cljs.core.next(arglist__3642));
    return vary_meta__delegate.call(this, obj, f, args)
  };
  return vary_meta
}();
cljs.core.not_EQ_ = function() {
  var not_EQ_ = null;
  var not_EQ___3643 = function(x) {
    return false
  };
  var not_EQ___3644 = function(x, y) {
    return cljs.core.not.call(null, cljs.core._EQ_.call(null, x, y))
  };
  var not_EQ___3645 = function() {
    var G__3647__delegate = function(x, y, more) {
      return cljs.core.not.call(null, cljs.core.apply.call(null, cljs.core._EQ_, x, y, more))
    };
    var G__3647 = function(x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__3647__delegate.call(this, x, y, more)
    };
    G__3647.cljs$lang$maxFixedArity = 2;
    G__3647.cljs$lang$applyTo = function(arglist__3648) {
      var x = cljs.core.first(arglist__3648);
      var y = cljs.core.first(cljs.core.next(arglist__3648));
      var more = cljs.core.rest(cljs.core.next(arglist__3648));
      return G__3647__delegate.call(this, x, y, more)
    };
    return G__3647
  }();
  not_EQ_ = function(x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 1:
        return not_EQ___3643.call(this, x);
      case 2:
        return not_EQ___3644.call(this, x, y);
      default:
        return not_EQ___3645.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  not_EQ_.cljs$lang$maxFixedArity = 2;
  not_EQ_.cljs$lang$applyTo = not_EQ___3645.cljs$lang$applyTo;
  return not_EQ_
}();
cljs.core.not_empty = function not_empty(coll) {
  if(cljs.core.truth_(cljs.core.seq.call(null, coll))) {
    return coll
  }else {
    return null
  }
};
cljs.core.every_QMARK_ = function every_QMARK_(pred, coll) {
  while(true) {
    if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, cljs.core.seq.call(null, coll)))) {
      return true
    }else {
      if(cljs.core.truth_(pred.call(null, cljs.core.first.call(null, coll)))) {
        var G__3649 = pred;
        var G__3650 = cljs.core.next.call(null, coll);
        pred = G__3649;
        coll = G__3650;
        continue
      }else {
        if(cljs.core.truth_("\ufdd0'else")) {
          return false
        }else {
          return null
        }
      }
    }
    break
  }
};
cljs.core.not_every_QMARK_ = function not_every_QMARK_(pred, coll) {
  return cljs.core.not.call(null, cljs.core.every_QMARK_.call(null, pred, coll))
};
cljs.core.some = function some(pred, coll) {
  while(true) {
    if(cljs.core.truth_(cljs.core.seq.call(null, coll))) {
      var or__3548__auto____3651 = pred.call(null, cljs.core.first.call(null, coll));
      if(cljs.core.truth_(or__3548__auto____3651)) {
        return or__3548__auto____3651
      }else {
        var G__3652 = pred;
        var G__3653 = cljs.core.next.call(null, coll);
        pred = G__3652;
        coll = G__3653;
        continue
      }
    }else {
      return null
    }
    break
  }
};
cljs.core.not_any_QMARK_ = function not_any_QMARK_(pred, coll) {
  return cljs.core.not.call(null, cljs.core.some.call(null, pred, coll))
};
cljs.core.even_QMARK_ = function even_QMARK_(n) {
  if(cljs.core.truth_(cljs.core.integer_QMARK_.call(null, n))) {
    return(n & 1) === 0
  }else {
    throw new Error(cljs.core.str.call(null, "Argument must be an integer: ", n));
  }
};
cljs.core.odd_QMARK_ = function odd_QMARK_(n) {
  return cljs.core.not.call(null, cljs.core.even_QMARK_.call(null, n))
};
cljs.core.identity = function identity(x) {
  return x
};
cljs.core.complement = function complement(f) {
  return function() {
    var G__3654 = null;
    var G__3654__3655 = function() {
      return cljs.core.not.call(null, f.call(null))
    };
    var G__3654__3656 = function(x) {
      return cljs.core.not.call(null, f.call(null, x))
    };
    var G__3654__3657 = function(x, y) {
      return cljs.core.not.call(null, f.call(null, x, y))
    };
    var G__3654__3658 = function() {
      var G__3660__delegate = function(x, y, zs) {
        return cljs.core.not.call(null, cljs.core.apply.call(null, f, x, y, zs))
      };
      var G__3660 = function(x, y, var_args) {
        var zs = null;
        if(goog.isDef(var_args)) {
          zs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
        }
        return G__3660__delegate.call(this, x, y, zs)
      };
      G__3660.cljs$lang$maxFixedArity = 2;
      G__3660.cljs$lang$applyTo = function(arglist__3661) {
        var x = cljs.core.first(arglist__3661);
        var y = cljs.core.first(cljs.core.next(arglist__3661));
        var zs = cljs.core.rest(cljs.core.next(arglist__3661));
        return G__3660__delegate.call(this, x, y, zs)
      };
      return G__3660
    }();
    G__3654 = function(x, y, var_args) {
      var zs = var_args;
      switch(arguments.length) {
        case 0:
          return G__3654__3655.call(this);
        case 1:
          return G__3654__3656.call(this, x);
        case 2:
          return G__3654__3657.call(this, x, y);
        default:
          return G__3654__3658.apply(this, arguments)
      }
      throw"Invalid arity: " + arguments.length;
    };
    G__3654.cljs$lang$maxFixedArity = 2;
    G__3654.cljs$lang$applyTo = G__3654__3658.cljs$lang$applyTo;
    return G__3654
  }()
};
cljs.core.constantly = function constantly(x) {
  return function() {
    var G__3662__delegate = function(args) {
      return x
    };
    var G__3662 = function(var_args) {
      var args = null;
      if(goog.isDef(var_args)) {
        args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
      }
      return G__3662__delegate.call(this, args)
    };
    G__3662.cljs$lang$maxFixedArity = 0;
    G__3662.cljs$lang$applyTo = function(arglist__3663) {
      var args = cljs.core.seq(arglist__3663);
      return G__3662__delegate.call(this, args)
    };
    return G__3662
  }()
};
cljs.core.comp = function() {
  var comp = null;
  var comp__3667 = function() {
    return cljs.core.identity
  };
  var comp__3668 = function(f) {
    return f
  };
  var comp__3669 = function(f, g) {
    return function() {
      var G__3673 = null;
      var G__3673__3674 = function() {
        return f.call(null, g.call(null))
      };
      var G__3673__3675 = function(x) {
        return f.call(null, g.call(null, x))
      };
      var G__3673__3676 = function(x, y) {
        return f.call(null, g.call(null, x, y))
      };
      var G__3673__3677 = function(x, y, z) {
        return f.call(null, g.call(null, x, y, z))
      };
      var G__3673__3678 = function() {
        var G__3680__delegate = function(x, y, z, args) {
          return f.call(null, cljs.core.apply.call(null, g, x, y, z, args))
        };
        var G__3680 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__3680__delegate.call(this, x, y, z, args)
        };
        G__3680.cljs$lang$maxFixedArity = 3;
        G__3680.cljs$lang$applyTo = function(arglist__3681) {
          var x = cljs.core.first(arglist__3681);
          var y = cljs.core.first(cljs.core.next(arglist__3681));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3681)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3681)));
          return G__3680__delegate.call(this, x, y, z, args)
        };
        return G__3680
      }();
      G__3673 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return G__3673__3674.call(this);
          case 1:
            return G__3673__3675.call(this, x);
          case 2:
            return G__3673__3676.call(this, x, y);
          case 3:
            return G__3673__3677.call(this, x, y, z);
          default:
            return G__3673__3678.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__3673.cljs$lang$maxFixedArity = 3;
      G__3673.cljs$lang$applyTo = G__3673__3678.cljs$lang$applyTo;
      return G__3673
    }()
  };
  var comp__3670 = function(f, g, h) {
    return function() {
      var G__3682 = null;
      var G__3682__3683 = function() {
        return f.call(null, g.call(null, h.call(null)))
      };
      var G__3682__3684 = function(x) {
        return f.call(null, g.call(null, h.call(null, x)))
      };
      var G__3682__3685 = function(x, y) {
        return f.call(null, g.call(null, h.call(null, x, y)))
      };
      var G__3682__3686 = function(x, y, z) {
        return f.call(null, g.call(null, h.call(null, x, y, z)))
      };
      var G__3682__3687 = function() {
        var G__3689__delegate = function(x, y, z, args) {
          return f.call(null, g.call(null, cljs.core.apply.call(null, h, x, y, z, args)))
        };
        var G__3689 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__3689__delegate.call(this, x, y, z, args)
        };
        G__3689.cljs$lang$maxFixedArity = 3;
        G__3689.cljs$lang$applyTo = function(arglist__3690) {
          var x = cljs.core.first(arglist__3690);
          var y = cljs.core.first(cljs.core.next(arglist__3690));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3690)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3690)));
          return G__3689__delegate.call(this, x, y, z, args)
        };
        return G__3689
      }();
      G__3682 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return G__3682__3683.call(this);
          case 1:
            return G__3682__3684.call(this, x);
          case 2:
            return G__3682__3685.call(this, x, y);
          case 3:
            return G__3682__3686.call(this, x, y, z);
          default:
            return G__3682__3687.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__3682.cljs$lang$maxFixedArity = 3;
      G__3682.cljs$lang$applyTo = G__3682__3687.cljs$lang$applyTo;
      return G__3682
    }()
  };
  var comp__3671 = function() {
    var G__3691__delegate = function(f1, f2, f3, fs) {
      var fs__3664 = cljs.core.reverse.call(null, cljs.core.list_STAR_.call(null, f1, f2, f3, fs));
      return function() {
        var G__3692__delegate = function(args) {
          var ret__3665 = cljs.core.apply.call(null, cljs.core.first.call(null, fs__3664), args);
          var fs__3666 = cljs.core.next.call(null, fs__3664);
          while(true) {
            if(cljs.core.truth_(fs__3666)) {
              var G__3693 = cljs.core.first.call(null, fs__3666).call(null, ret__3665);
              var G__3694 = cljs.core.next.call(null, fs__3666);
              ret__3665 = G__3693;
              fs__3666 = G__3694;
              continue
            }else {
              return ret__3665
            }
            break
          }
        };
        var G__3692 = function(var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
          }
          return G__3692__delegate.call(this, args)
        };
        G__3692.cljs$lang$maxFixedArity = 0;
        G__3692.cljs$lang$applyTo = function(arglist__3695) {
          var args = cljs.core.seq(arglist__3695);
          return G__3692__delegate.call(this, args)
        };
        return G__3692
      }()
    };
    var G__3691 = function(f1, f2, f3, var_args) {
      var fs = null;
      if(goog.isDef(var_args)) {
        fs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__3691__delegate.call(this, f1, f2, f3, fs)
    };
    G__3691.cljs$lang$maxFixedArity = 3;
    G__3691.cljs$lang$applyTo = function(arglist__3696) {
      var f1 = cljs.core.first(arglist__3696);
      var f2 = cljs.core.first(cljs.core.next(arglist__3696));
      var f3 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3696)));
      var fs = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3696)));
      return G__3691__delegate.call(this, f1, f2, f3, fs)
    };
    return G__3691
  }();
  comp = function(f1, f2, f3, var_args) {
    var fs = var_args;
    switch(arguments.length) {
      case 0:
        return comp__3667.call(this);
      case 1:
        return comp__3668.call(this, f1);
      case 2:
        return comp__3669.call(this, f1, f2);
      case 3:
        return comp__3670.call(this, f1, f2, f3);
      default:
        return comp__3671.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  comp.cljs$lang$maxFixedArity = 3;
  comp.cljs$lang$applyTo = comp__3671.cljs$lang$applyTo;
  return comp
}();
cljs.core.partial = function() {
  var partial = null;
  var partial__3697 = function(f, arg1) {
    return function() {
      var G__3702__delegate = function(args) {
        return cljs.core.apply.call(null, f, arg1, args)
      };
      var G__3702 = function(var_args) {
        var args = null;
        if(goog.isDef(var_args)) {
          args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
        }
        return G__3702__delegate.call(this, args)
      };
      G__3702.cljs$lang$maxFixedArity = 0;
      G__3702.cljs$lang$applyTo = function(arglist__3703) {
        var args = cljs.core.seq(arglist__3703);
        return G__3702__delegate.call(this, args)
      };
      return G__3702
    }()
  };
  var partial__3698 = function(f, arg1, arg2) {
    return function() {
      var G__3704__delegate = function(args) {
        return cljs.core.apply.call(null, f, arg1, arg2, args)
      };
      var G__3704 = function(var_args) {
        var args = null;
        if(goog.isDef(var_args)) {
          args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
        }
        return G__3704__delegate.call(this, args)
      };
      G__3704.cljs$lang$maxFixedArity = 0;
      G__3704.cljs$lang$applyTo = function(arglist__3705) {
        var args = cljs.core.seq(arglist__3705);
        return G__3704__delegate.call(this, args)
      };
      return G__3704
    }()
  };
  var partial__3699 = function(f, arg1, arg2, arg3) {
    return function() {
      var G__3706__delegate = function(args) {
        return cljs.core.apply.call(null, f, arg1, arg2, arg3, args)
      };
      var G__3706 = function(var_args) {
        var args = null;
        if(goog.isDef(var_args)) {
          args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
        }
        return G__3706__delegate.call(this, args)
      };
      G__3706.cljs$lang$maxFixedArity = 0;
      G__3706.cljs$lang$applyTo = function(arglist__3707) {
        var args = cljs.core.seq(arglist__3707);
        return G__3706__delegate.call(this, args)
      };
      return G__3706
    }()
  };
  var partial__3700 = function() {
    var G__3708__delegate = function(f, arg1, arg2, arg3, more) {
      return function() {
        var G__3709__delegate = function(args) {
          return cljs.core.apply.call(null, f, arg1, arg2, arg3, cljs.core.concat.call(null, more, args))
        };
        var G__3709 = function(var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
          }
          return G__3709__delegate.call(this, args)
        };
        G__3709.cljs$lang$maxFixedArity = 0;
        G__3709.cljs$lang$applyTo = function(arglist__3710) {
          var args = cljs.core.seq(arglist__3710);
          return G__3709__delegate.call(this, args)
        };
        return G__3709
      }()
    };
    var G__3708 = function(f, arg1, arg2, arg3, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0)
      }
      return G__3708__delegate.call(this, f, arg1, arg2, arg3, more)
    };
    G__3708.cljs$lang$maxFixedArity = 4;
    G__3708.cljs$lang$applyTo = function(arglist__3711) {
      var f = cljs.core.first(arglist__3711);
      var arg1 = cljs.core.first(cljs.core.next(arglist__3711));
      var arg2 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3711)));
      var arg3 = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3711))));
      var more = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3711))));
      return G__3708__delegate.call(this, f, arg1, arg2, arg3, more)
    };
    return G__3708
  }();
  partial = function(f, arg1, arg2, arg3, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 2:
        return partial__3697.call(this, f, arg1);
      case 3:
        return partial__3698.call(this, f, arg1, arg2);
      case 4:
        return partial__3699.call(this, f, arg1, arg2, arg3);
      default:
        return partial__3700.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  partial.cljs$lang$maxFixedArity = 4;
  partial.cljs$lang$applyTo = partial__3700.cljs$lang$applyTo;
  return partial
}();
cljs.core.fnil = function() {
  var fnil = null;
  var fnil__3712 = function(f, x) {
    return function() {
      var G__3716 = null;
      var G__3716__3717 = function(a) {
        return f.call(null, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, a)) ? x : a)
      };
      var G__3716__3718 = function(a, b) {
        return f.call(null, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, a)) ? x : a, b)
      };
      var G__3716__3719 = function(a, b, c) {
        return f.call(null, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, a)) ? x : a, b, c)
      };
      var G__3716__3720 = function() {
        var G__3722__delegate = function(a, b, c, ds) {
          return cljs.core.apply.call(null, f, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, a)) ? x : a, b, c, ds)
        };
        var G__3722 = function(a, b, c, var_args) {
          var ds = null;
          if(goog.isDef(var_args)) {
            ds = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__3722__delegate.call(this, a, b, c, ds)
        };
        G__3722.cljs$lang$maxFixedArity = 3;
        G__3722.cljs$lang$applyTo = function(arglist__3723) {
          var a = cljs.core.first(arglist__3723);
          var b = cljs.core.first(cljs.core.next(arglist__3723));
          var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3723)));
          var ds = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3723)));
          return G__3722__delegate.call(this, a, b, c, ds)
        };
        return G__3722
      }();
      G__3716 = function(a, b, c, var_args) {
        var ds = var_args;
        switch(arguments.length) {
          case 1:
            return G__3716__3717.call(this, a);
          case 2:
            return G__3716__3718.call(this, a, b);
          case 3:
            return G__3716__3719.call(this, a, b, c);
          default:
            return G__3716__3720.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__3716.cljs$lang$maxFixedArity = 3;
      G__3716.cljs$lang$applyTo = G__3716__3720.cljs$lang$applyTo;
      return G__3716
    }()
  };
  var fnil__3713 = function(f, x, y) {
    return function() {
      var G__3724 = null;
      var G__3724__3725 = function(a, b) {
        return f.call(null, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, a)) ? x : a, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, b)) ? y : b)
      };
      var G__3724__3726 = function(a, b, c) {
        return f.call(null, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, a)) ? x : a, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, b)) ? y : b, c)
      };
      var G__3724__3727 = function() {
        var G__3729__delegate = function(a, b, c, ds) {
          return cljs.core.apply.call(null, f, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, a)) ? x : a, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, b)) ? y : b, c, ds)
        };
        var G__3729 = function(a, b, c, var_args) {
          var ds = null;
          if(goog.isDef(var_args)) {
            ds = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__3729__delegate.call(this, a, b, c, ds)
        };
        G__3729.cljs$lang$maxFixedArity = 3;
        G__3729.cljs$lang$applyTo = function(arglist__3730) {
          var a = cljs.core.first(arglist__3730);
          var b = cljs.core.first(cljs.core.next(arglist__3730));
          var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3730)));
          var ds = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3730)));
          return G__3729__delegate.call(this, a, b, c, ds)
        };
        return G__3729
      }();
      G__3724 = function(a, b, c, var_args) {
        var ds = var_args;
        switch(arguments.length) {
          case 2:
            return G__3724__3725.call(this, a, b);
          case 3:
            return G__3724__3726.call(this, a, b, c);
          default:
            return G__3724__3727.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__3724.cljs$lang$maxFixedArity = 3;
      G__3724.cljs$lang$applyTo = G__3724__3727.cljs$lang$applyTo;
      return G__3724
    }()
  };
  var fnil__3714 = function(f, x, y, z) {
    return function() {
      var G__3731 = null;
      var G__3731__3732 = function(a, b) {
        return f.call(null, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, a)) ? x : a, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, b)) ? y : b)
      };
      var G__3731__3733 = function(a, b, c) {
        return f.call(null, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, a)) ? x : a, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, b)) ? y : b, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, c)) ? z : c)
      };
      var G__3731__3734 = function() {
        var G__3736__delegate = function(a, b, c, ds) {
          return cljs.core.apply.call(null, f, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, a)) ? x : a, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, b)) ? y : b, cljs.core.truth_(cljs.core.nil_QMARK_.call(null, c)) ? z : c, ds)
        };
        var G__3736 = function(a, b, c, var_args) {
          var ds = null;
          if(goog.isDef(var_args)) {
            ds = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__3736__delegate.call(this, a, b, c, ds)
        };
        G__3736.cljs$lang$maxFixedArity = 3;
        G__3736.cljs$lang$applyTo = function(arglist__3737) {
          var a = cljs.core.first(arglist__3737);
          var b = cljs.core.first(cljs.core.next(arglist__3737));
          var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3737)));
          var ds = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3737)));
          return G__3736__delegate.call(this, a, b, c, ds)
        };
        return G__3736
      }();
      G__3731 = function(a, b, c, var_args) {
        var ds = var_args;
        switch(arguments.length) {
          case 2:
            return G__3731__3732.call(this, a, b);
          case 3:
            return G__3731__3733.call(this, a, b, c);
          default:
            return G__3731__3734.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__3731.cljs$lang$maxFixedArity = 3;
      G__3731.cljs$lang$applyTo = G__3731__3734.cljs$lang$applyTo;
      return G__3731
    }()
  };
  fnil = function(f, x, y, z) {
    switch(arguments.length) {
      case 2:
        return fnil__3712.call(this, f, x);
      case 3:
        return fnil__3713.call(this, f, x, y);
      case 4:
        return fnil__3714.call(this, f, x, y, z)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return fnil
}();
cljs.core.map_indexed = function map_indexed(f, coll) {
  var mapi__3740 = function mpi(idx, coll) {
    return new cljs.core.LazySeq(null, false, function() {
      var temp__3698__auto____3738 = cljs.core.seq.call(null, coll);
      if(cljs.core.truth_(temp__3698__auto____3738)) {
        var s__3739 = temp__3698__auto____3738;
        return cljs.core.cons.call(null, f.call(null, idx, cljs.core.first.call(null, s__3739)), mpi.call(null, idx + 1, cljs.core.rest.call(null, s__3739)))
      }else {
        return null
      }
    })
  };
  return mapi__3740.call(null, 0, coll)
};
cljs.core.keep = function keep(f, coll) {
  return new cljs.core.LazySeq(null, false, function() {
    var temp__3698__auto____3741 = cljs.core.seq.call(null, coll);
    if(cljs.core.truth_(temp__3698__auto____3741)) {
      var s__3742 = temp__3698__auto____3741;
      var x__3743 = f.call(null, cljs.core.first.call(null, s__3742));
      if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, x__3743))) {
        return keep.call(null, f, cljs.core.rest.call(null, s__3742))
      }else {
        return cljs.core.cons.call(null, x__3743, keep.call(null, f, cljs.core.rest.call(null, s__3742)))
      }
    }else {
      return null
    }
  })
};
cljs.core.keep_indexed = function keep_indexed(f, coll) {
  var keepi__3753 = function kpi(idx, coll) {
    return new cljs.core.LazySeq(null, false, function() {
      var temp__3698__auto____3750 = cljs.core.seq.call(null, coll);
      if(cljs.core.truth_(temp__3698__auto____3750)) {
        var s__3751 = temp__3698__auto____3750;
        var x__3752 = f.call(null, idx, cljs.core.first.call(null, s__3751));
        if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, x__3752))) {
          return kpi.call(null, idx + 1, cljs.core.rest.call(null, s__3751))
        }else {
          return cljs.core.cons.call(null, x__3752, kpi.call(null, idx + 1, cljs.core.rest.call(null, s__3751)))
        }
      }else {
        return null
      }
    })
  };
  return keepi__3753.call(null, 0, coll)
};
cljs.core.every_pred = function() {
  var every_pred = null;
  var every_pred__3798 = function(p) {
    return function() {
      var ep1 = null;
      var ep1__3803 = function() {
        return true
      };
      var ep1__3804 = function(x) {
        return cljs.core.boolean$.call(null, p.call(null, x))
      };
      var ep1__3805 = function(x, y) {
        return cljs.core.boolean$.call(null, function() {
          var and__3546__auto____3760 = p.call(null, x);
          if(cljs.core.truth_(and__3546__auto____3760)) {
            return p.call(null, y)
          }else {
            return and__3546__auto____3760
          }
        }())
      };
      var ep1__3806 = function(x, y, z) {
        return cljs.core.boolean$.call(null, function() {
          var and__3546__auto____3761 = p.call(null, x);
          if(cljs.core.truth_(and__3546__auto____3761)) {
            var and__3546__auto____3762 = p.call(null, y);
            if(cljs.core.truth_(and__3546__auto____3762)) {
              return p.call(null, z)
            }else {
              return and__3546__auto____3762
            }
          }else {
            return and__3546__auto____3761
          }
        }())
      };
      var ep1__3807 = function() {
        var G__3809__delegate = function(x, y, z, args) {
          return cljs.core.boolean$.call(null, function() {
            var and__3546__auto____3763 = ep1.call(null, x, y, z);
            if(cljs.core.truth_(and__3546__auto____3763)) {
              return cljs.core.every_QMARK_.call(null, p, args)
            }else {
              return and__3546__auto____3763
            }
          }())
        };
        var G__3809 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__3809__delegate.call(this, x, y, z, args)
        };
        G__3809.cljs$lang$maxFixedArity = 3;
        G__3809.cljs$lang$applyTo = function(arglist__3810) {
          var x = cljs.core.first(arglist__3810);
          var y = cljs.core.first(cljs.core.next(arglist__3810));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3810)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3810)));
          return G__3809__delegate.call(this, x, y, z, args)
        };
        return G__3809
      }();
      ep1 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return ep1__3803.call(this);
          case 1:
            return ep1__3804.call(this, x);
          case 2:
            return ep1__3805.call(this, x, y);
          case 3:
            return ep1__3806.call(this, x, y, z);
          default:
            return ep1__3807.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      ep1.cljs$lang$maxFixedArity = 3;
      ep1.cljs$lang$applyTo = ep1__3807.cljs$lang$applyTo;
      return ep1
    }()
  };
  var every_pred__3799 = function(p1, p2) {
    return function() {
      var ep2 = null;
      var ep2__3811 = function() {
        return true
      };
      var ep2__3812 = function(x) {
        return cljs.core.boolean$.call(null, function() {
          var and__3546__auto____3764 = p1.call(null, x);
          if(cljs.core.truth_(and__3546__auto____3764)) {
            return p2.call(null, x)
          }else {
            return and__3546__auto____3764
          }
        }())
      };
      var ep2__3813 = function(x, y) {
        return cljs.core.boolean$.call(null, function() {
          var and__3546__auto____3765 = p1.call(null, x);
          if(cljs.core.truth_(and__3546__auto____3765)) {
            var and__3546__auto____3766 = p1.call(null, y);
            if(cljs.core.truth_(and__3546__auto____3766)) {
              var and__3546__auto____3767 = p2.call(null, x);
              if(cljs.core.truth_(and__3546__auto____3767)) {
                return p2.call(null, y)
              }else {
                return and__3546__auto____3767
              }
            }else {
              return and__3546__auto____3766
            }
          }else {
            return and__3546__auto____3765
          }
        }())
      };
      var ep2__3814 = function(x, y, z) {
        return cljs.core.boolean$.call(null, function() {
          var and__3546__auto____3768 = p1.call(null, x);
          if(cljs.core.truth_(and__3546__auto____3768)) {
            var and__3546__auto____3769 = p1.call(null, y);
            if(cljs.core.truth_(and__3546__auto____3769)) {
              var and__3546__auto____3770 = p1.call(null, z);
              if(cljs.core.truth_(and__3546__auto____3770)) {
                var and__3546__auto____3771 = p2.call(null, x);
                if(cljs.core.truth_(and__3546__auto____3771)) {
                  var and__3546__auto____3772 = p2.call(null, y);
                  if(cljs.core.truth_(and__3546__auto____3772)) {
                    return p2.call(null, z)
                  }else {
                    return and__3546__auto____3772
                  }
                }else {
                  return and__3546__auto____3771
                }
              }else {
                return and__3546__auto____3770
              }
            }else {
              return and__3546__auto____3769
            }
          }else {
            return and__3546__auto____3768
          }
        }())
      };
      var ep2__3815 = function() {
        var G__3817__delegate = function(x, y, z, args) {
          return cljs.core.boolean$.call(null, function() {
            var and__3546__auto____3773 = ep2.call(null, x, y, z);
            if(cljs.core.truth_(and__3546__auto____3773)) {
              return cljs.core.every_QMARK_.call(null, function(p1__3744_SHARP_) {
                var and__3546__auto____3774 = p1.call(null, p1__3744_SHARP_);
                if(cljs.core.truth_(and__3546__auto____3774)) {
                  return p2.call(null, p1__3744_SHARP_)
                }else {
                  return and__3546__auto____3774
                }
              }, args)
            }else {
              return and__3546__auto____3773
            }
          }())
        };
        var G__3817 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__3817__delegate.call(this, x, y, z, args)
        };
        G__3817.cljs$lang$maxFixedArity = 3;
        G__3817.cljs$lang$applyTo = function(arglist__3818) {
          var x = cljs.core.first(arglist__3818);
          var y = cljs.core.first(cljs.core.next(arglist__3818));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3818)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3818)));
          return G__3817__delegate.call(this, x, y, z, args)
        };
        return G__3817
      }();
      ep2 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return ep2__3811.call(this);
          case 1:
            return ep2__3812.call(this, x);
          case 2:
            return ep2__3813.call(this, x, y);
          case 3:
            return ep2__3814.call(this, x, y, z);
          default:
            return ep2__3815.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      ep2.cljs$lang$maxFixedArity = 3;
      ep2.cljs$lang$applyTo = ep2__3815.cljs$lang$applyTo;
      return ep2
    }()
  };
  var every_pred__3800 = function(p1, p2, p3) {
    return function() {
      var ep3 = null;
      var ep3__3819 = function() {
        return true
      };
      var ep3__3820 = function(x) {
        return cljs.core.boolean$.call(null, function() {
          var and__3546__auto____3775 = p1.call(null, x);
          if(cljs.core.truth_(and__3546__auto____3775)) {
            var and__3546__auto____3776 = p2.call(null, x);
            if(cljs.core.truth_(and__3546__auto____3776)) {
              return p3.call(null, x)
            }else {
              return and__3546__auto____3776
            }
          }else {
            return and__3546__auto____3775
          }
        }())
      };
      var ep3__3821 = function(x, y) {
        return cljs.core.boolean$.call(null, function() {
          var and__3546__auto____3777 = p1.call(null, x);
          if(cljs.core.truth_(and__3546__auto____3777)) {
            var and__3546__auto____3778 = p2.call(null, x);
            if(cljs.core.truth_(and__3546__auto____3778)) {
              var and__3546__auto____3779 = p3.call(null, x);
              if(cljs.core.truth_(and__3546__auto____3779)) {
                var and__3546__auto____3780 = p1.call(null, y);
                if(cljs.core.truth_(and__3546__auto____3780)) {
                  var and__3546__auto____3781 = p2.call(null, y);
                  if(cljs.core.truth_(and__3546__auto____3781)) {
                    return p3.call(null, y)
                  }else {
                    return and__3546__auto____3781
                  }
                }else {
                  return and__3546__auto____3780
                }
              }else {
                return and__3546__auto____3779
              }
            }else {
              return and__3546__auto____3778
            }
          }else {
            return and__3546__auto____3777
          }
        }())
      };
      var ep3__3822 = function(x, y, z) {
        return cljs.core.boolean$.call(null, function() {
          var and__3546__auto____3782 = p1.call(null, x);
          if(cljs.core.truth_(and__3546__auto____3782)) {
            var and__3546__auto____3783 = p2.call(null, x);
            if(cljs.core.truth_(and__3546__auto____3783)) {
              var and__3546__auto____3784 = p3.call(null, x);
              if(cljs.core.truth_(and__3546__auto____3784)) {
                var and__3546__auto____3785 = p1.call(null, y);
                if(cljs.core.truth_(and__3546__auto____3785)) {
                  var and__3546__auto____3786 = p2.call(null, y);
                  if(cljs.core.truth_(and__3546__auto____3786)) {
                    var and__3546__auto____3787 = p3.call(null, y);
                    if(cljs.core.truth_(and__3546__auto____3787)) {
                      var and__3546__auto____3788 = p1.call(null, z);
                      if(cljs.core.truth_(and__3546__auto____3788)) {
                        var and__3546__auto____3789 = p2.call(null, z);
                        if(cljs.core.truth_(and__3546__auto____3789)) {
                          return p3.call(null, z)
                        }else {
                          return and__3546__auto____3789
                        }
                      }else {
                        return and__3546__auto____3788
                      }
                    }else {
                      return and__3546__auto____3787
                    }
                  }else {
                    return and__3546__auto____3786
                  }
                }else {
                  return and__3546__auto____3785
                }
              }else {
                return and__3546__auto____3784
              }
            }else {
              return and__3546__auto____3783
            }
          }else {
            return and__3546__auto____3782
          }
        }())
      };
      var ep3__3823 = function() {
        var G__3825__delegate = function(x, y, z, args) {
          return cljs.core.boolean$.call(null, function() {
            var and__3546__auto____3790 = ep3.call(null, x, y, z);
            if(cljs.core.truth_(and__3546__auto____3790)) {
              return cljs.core.every_QMARK_.call(null, function(p1__3745_SHARP_) {
                var and__3546__auto____3791 = p1.call(null, p1__3745_SHARP_);
                if(cljs.core.truth_(and__3546__auto____3791)) {
                  var and__3546__auto____3792 = p2.call(null, p1__3745_SHARP_);
                  if(cljs.core.truth_(and__3546__auto____3792)) {
                    return p3.call(null, p1__3745_SHARP_)
                  }else {
                    return and__3546__auto____3792
                  }
                }else {
                  return and__3546__auto____3791
                }
              }, args)
            }else {
              return and__3546__auto____3790
            }
          }())
        };
        var G__3825 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__3825__delegate.call(this, x, y, z, args)
        };
        G__3825.cljs$lang$maxFixedArity = 3;
        G__3825.cljs$lang$applyTo = function(arglist__3826) {
          var x = cljs.core.first(arglist__3826);
          var y = cljs.core.first(cljs.core.next(arglist__3826));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3826)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3826)));
          return G__3825__delegate.call(this, x, y, z, args)
        };
        return G__3825
      }();
      ep3 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return ep3__3819.call(this);
          case 1:
            return ep3__3820.call(this, x);
          case 2:
            return ep3__3821.call(this, x, y);
          case 3:
            return ep3__3822.call(this, x, y, z);
          default:
            return ep3__3823.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      ep3.cljs$lang$maxFixedArity = 3;
      ep3.cljs$lang$applyTo = ep3__3823.cljs$lang$applyTo;
      return ep3
    }()
  };
  var every_pred__3801 = function() {
    var G__3827__delegate = function(p1, p2, p3, ps) {
      var ps__3793 = cljs.core.list_STAR_.call(null, p1, p2, p3, ps);
      return function() {
        var epn = null;
        var epn__3828 = function() {
          return true
        };
        var epn__3829 = function(x) {
          return cljs.core.every_QMARK_.call(null, function(p1__3746_SHARP_) {
            return p1__3746_SHARP_.call(null, x)
          }, ps__3793)
        };
        var epn__3830 = function(x, y) {
          return cljs.core.every_QMARK_.call(null, function(p1__3747_SHARP_) {
            var and__3546__auto____3794 = p1__3747_SHARP_.call(null, x);
            if(cljs.core.truth_(and__3546__auto____3794)) {
              return p1__3747_SHARP_.call(null, y)
            }else {
              return and__3546__auto____3794
            }
          }, ps__3793)
        };
        var epn__3831 = function(x, y, z) {
          return cljs.core.every_QMARK_.call(null, function(p1__3748_SHARP_) {
            var and__3546__auto____3795 = p1__3748_SHARP_.call(null, x);
            if(cljs.core.truth_(and__3546__auto____3795)) {
              var and__3546__auto____3796 = p1__3748_SHARP_.call(null, y);
              if(cljs.core.truth_(and__3546__auto____3796)) {
                return p1__3748_SHARP_.call(null, z)
              }else {
                return and__3546__auto____3796
              }
            }else {
              return and__3546__auto____3795
            }
          }, ps__3793)
        };
        var epn__3832 = function() {
          var G__3834__delegate = function(x, y, z, args) {
            return cljs.core.boolean$.call(null, function() {
              var and__3546__auto____3797 = epn.call(null, x, y, z);
              if(cljs.core.truth_(and__3546__auto____3797)) {
                return cljs.core.every_QMARK_.call(null, function(p1__3749_SHARP_) {
                  return cljs.core.every_QMARK_.call(null, p1__3749_SHARP_, args)
                }, ps__3793)
              }else {
                return and__3546__auto____3797
              }
            }())
          };
          var G__3834 = function(x, y, z, var_args) {
            var args = null;
            if(goog.isDef(var_args)) {
              args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
            }
            return G__3834__delegate.call(this, x, y, z, args)
          };
          G__3834.cljs$lang$maxFixedArity = 3;
          G__3834.cljs$lang$applyTo = function(arglist__3835) {
            var x = cljs.core.first(arglist__3835);
            var y = cljs.core.first(cljs.core.next(arglist__3835));
            var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3835)));
            var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3835)));
            return G__3834__delegate.call(this, x, y, z, args)
          };
          return G__3834
        }();
        epn = function(x, y, z, var_args) {
          var args = var_args;
          switch(arguments.length) {
            case 0:
              return epn__3828.call(this);
            case 1:
              return epn__3829.call(this, x);
            case 2:
              return epn__3830.call(this, x, y);
            case 3:
              return epn__3831.call(this, x, y, z);
            default:
              return epn__3832.apply(this, arguments)
          }
          throw"Invalid arity: " + arguments.length;
        };
        epn.cljs$lang$maxFixedArity = 3;
        epn.cljs$lang$applyTo = epn__3832.cljs$lang$applyTo;
        return epn
      }()
    };
    var G__3827 = function(p1, p2, p3, var_args) {
      var ps = null;
      if(goog.isDef(var_args)) {
        ps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__3827__delegate.call(this, p1, p2, p3, ps)
    };
    G__3827.cljs$lang$maxFixedArity = 3;
    G__3827.cljs$lang$applyTo = function(arglist__3836) {
      var p1 = cljs.core.first(arglist__3836);
      var p2 = cljs.core.first(cljs.core.next(arglist__3836));
      var p3 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3836)));
      var ps = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3836)));
      return G__3827__delegate.call(this, p1, p2, p3, ps)
    };
    return G__3827
  }();
  every_pred = function(p1, p2, p3, var_args) {
    var ps = var_args;
    switch(arguments.length) {
      case 1:
        return every_pred__3798.call(this, p1);
      case 2:
        return every_pred__3799.call(this, p1, p2);
      case 3:
        return every_pred__3800.call(this, p1, p2, p3);
      default:
        return every_pred__3801.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  every_pred.cljs$lang$maxFixedArity = 3;
  every_pred.cljs$lang$applyTo = every_pred__3801.cljs$lang$applyTo;
  return every_pred
}();
cljs.core.some_fn = function() {
  var some_fn = null;
  var some_fn__3876 = function(p) {
    return function() {
      var sp1 = null;
      var sp1__3881 = function() {
        return null
      };
      var sp1__3882 = function(x) {
        return p.call(null, x)
      };
      var sp1__3883 = function(x, y) {
        var or__3548__auto____3838 = p.call(null, x);
        if(cljs.core.truth_(or__3548__auto____3838)) {
          return or__3548__auto____3838
        }else {
          return p.call(null, y)
        }
      };
      var sp1__3884 = function(x, y, z) {
        var or__3548__auto____3839 = p.call(null, x);
        if(cljs.core.truth_(or__3548__auto____3839)) {
          return or__3548__auto____3839
        }else {
          var or__3548__auto____3840 = p.call(null, y);
          if(cljs.core.truth_(or__3548__auto____3840)) {
            return or__3548__auto____3840
          }else {
            return p.call(null, z)
          }
        }
      };
      var sp1__3885 = function() {
        var G__3887__delegate = function(x, y, z, args) {
          var or__3548__auto____3841 = sp1.call(null, x, y, z);
          if(cljs.core.truth_(or__3548__auto____3841)) {
            return or__3548__auto____3841
          }else {
            return cljs.core.some.call(null, p, args)
          }
        };
        var G__3887 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__3887__delegate.call(this, x, y, z, args)
        };
        G__3887.cljs$lang$maxFixedArity = 3;
        G__3887.cljs$lang$applyTo = function(arglist__3888) {
          var x = cljs.core.first(arglist__3888);
          var y = cljs.core.first(cljs.core.next(arglist__3888));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3888)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3888)));
          return G__3887__delegate.call(this, x, y, z, args)
        };
        return G__3887
      }();
      sp1 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return sp1__3881.call(this);
          case 1:
            return sp1__3882.call(this, x);
          case 2:
            return sp1__3883.call(this, x, y);
          case 3:
            return sp1__3884.call(this, x, y, z);
          default:
            return sp1__3885.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      sp1.cljs$lang$maxFixedArity = 3;
      sp1.cljs$lang$applyTo = sp1__3885.cljs$lang$applyTo;
      return sp1
    }()
  };
  var some_fn__3877 = function(p1, p2) {
    return function() {
      var sp2 = null;
      var sp2__3889 = function() {
        return null
      };
      var sp2__3890 = function(x) {
        var or__3548__auto____3842 = p1.call(null, x);
        if(cljs.core.truth_(or__3548__auto____3842)) {
          return or__3548__auto____3842
        }else {
          return p2.call(null, x)
        }
      };
      var sp2__3891 = function(x, y) {
        var or__3548__auto____3843 = p1.call(null, x);
        if(cljs.core.truth_(or__3548__auto____3843)) {
          return or__3548__auto____3843
        }else {
          var or__3548__auto____3844 = p1.call(null, y);
          if(cljs.core.truth_(or__3548__auto____3844)) {
            return or__3548__auto____3844
          }else {
            var or__3548__auto____3845 = p2.call(null, x);
            if(cljs.core.truth_(or__3548__auto____3845)) {
              return or__3548__auto____3845
            }else {
              return p2.call(null, y)
            }
          }
        }
      };
      var sp2__3892 = function(x, y, z) {
        var or__3548__auto____3846 = p1.call(null, x);
        if(cljs.core.truth_(or__3548__auto____3846)) {
          return or__3548__auto____3846
        }else {
          var or__3548__auto____3847 = p1.call(null, y);
          if(cljs.core.truth_(or__3548__auto____3847)) {
            return or__3548__auto____3847
          }else {
            var or__3548__auto____3848 = p1.call(null, z);
            if(cljs.core.truth_(or__3548__auto____3848)) {
              return or__3548__auto____3848
            }else {
              var or__3548__auto____3849 = p2.call(null, x);
              if(cljs.core.truth_(or__3548__auto____3849)) {
                return or__3548__auto____3849
              }else {
                var or__3548__auto____3850 = p2.call(null, y);
                if(cljs.core.truth_(or__3548__auto____3850)) {
                  return or__3548__auto____3850
                }else {
                  return p2.call(null, z)
                }
              }
            }
          }
        }
      };
      var sp2__3893 = function() {
        var G__3895__delegate = function(x, y, z, args) {
          var or__3548__auto____3851 = sp2.call(null, x, y, z);
          if(cljs.core.truth_(or__3548__auto____3851)) {
            return or__3548__auto____3851
          }else {
            return cljs.core.some.call(null, function(p1__3754_SHARP_) {
              var or__3548__auto____3852 = p1.call(null, p1__3754_SHARP_);
              if(cljs.core.truth_(or__3548__auto____3852)) {
                return or__3548__auto____3852
              }else {
                return p2.call(null, p1__3754_SHARP_)
              }
            }, args)
          }
        };
        var G__3895 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__3895__delegate.call(this, x, y, z, args)
        };
        G__3895.cljs$lang$maxFixedArity = 3;
        G__3895.cljs$lang$applyTo = function(arglist__3896) {
          var x = cljs.core.first(arglist__3896);
          var y = cljs.core.first(cljs.core.next(arglist__3896));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3896)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3896)));
          return G__3895__delegate.call(this, x, y, z, args)
        };
        return G__3895
      }();
      sp2 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return sp2__3889.call(this);
          case 1:
            return sp2__3890.call(this, x);
          case 2:
            return sp2__3891.call(this, x, y);
          case 3:
            return sp2__3892.call(this, x, y, z);
          default:
            return sp2__3893.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      sp2.cljs$lang$maxFixedArity = 3;
      sp2.cljs$lang$applyTo = sp2__3893.cljs$lang$applyTo;
      return sp2
    }()
  };
  var some_fn__3878 = function(p1, p2, p3) {
    return function() {
      var sp3 = null;
      var sp3__3897 = function() {
        return null
      };
      var sp3__3898 = function(x) {
        var or__3548__auto____3853 = p1.call(null, x);
        if(cljs.core.truth_(or__3548__auto____3853)) {
          return or__3548__auto____3853
        }else {
          var or__3548__auto____3854 = p2.call(null, x);
          if(cljs.core.truth_(or__3548__auto____3854)) {
            return or__3548__auto____3854
          }else {
            return p3.call(null, x)
          }
        }
      };
      var sp3__3899 = function(x, y) {
        var or__3548__auto____3855 = p1.call(null, x);
        if(cljs.core.truth_(or__3548__auto____3855)) {
          return or__3548__auto____3855
        }else {
          var or__3548__auto____3856 = p2.call(null, x);
          if(cljs.core.truth_(or__3548__auto____3856)) {
            return or__3548__auto____3856
          }else {
            var or__3548__auto____3857 = p3.call(null, x);
            if(cljs.core.truth_(or__3548__auto____3857)) {
              return or__3548__auto____3857
            }else {
              var or__3548__auto____3858 = p1.call(null, y);
              if(cljs.core.truth_(or__3548__auto____3858)) {
                return or__3548__auto____3858
              }else {
                var or__3548__auto____3859 = p2.call(null, y);
                if(cljs.core.truth_(or__3548__auto____3859)) {
                  return or__3548__auto____3859
                }else {
                  return p3.call(null, y)
                }
              }
            }
          }
        }
      };
      var sp3__3900 = function(x, y, z) {
        var or__3548__auto____3860 = p1.call(null, x);
        if(cljs.core.truth_(or__3548__auto____3860)) {
          return or__3548__auto____3860
        }else {
          var or__3548__auto____3861 = p2.call(null, x);
          if(cljs.core.truth_(or__3548__auto____3861)) {
            return or__3548__auto____3861
          }else {
            var or__3548__auto____3862 = p3.call(null, x);
            if(cljs.core.truth_(or__3548__auto____3862)) {
              return or__3548__auto____3862
            }else {
              var or__3548__auto____3863 = p1.call(null, y);
              if(cljs.core.truth_(or__3548__auto____3863)) {
                return or__3548__auto____3863
              }else {
                var or__3548__auto____3864 = p2.call(null, y);
                if(cljs.core.truth_(or__3548__auto____3864)) {
                  return or__3548__auto____3864
                }else {
                  var or__3548__auto____3865 = p3.call(null, y);
                  if(cljs.core.truth_(or__3548__auto____3865)) {
                    return or__3548__auto____3865
                  }else {
                    var or__3548__auto____3866 = p1.call(null, z);
                    if(cljs.core.truth_(or__3548__auto____3866)) {
                      return or__3548__auto____3866
                    }else {
                      var or__3548__auto____3867 = p2.call(null, z);
                      if(cljs.core.truth_(or__3548__auto____3867)) {
                        return or__3548__auto____3867
                      }else {
                        return p3.call(null, z)
                      }
                    }
                  }
                }
              }
            }
          }
        }
      };
      var sp3__3901 = function() {
        var G__3903__delegate = function(x, y, z, args) {
          var or__3548__auto____3868 = sp3.call(null, x, y, z);
          if(cljs.core.truth_(or__3548__auto____3868)) {
            return or__3548__auto____3868
          }else {
            return cljs.core.some.call(null, function(p1__3755_SHARP_) {
              var or__3548__auto____3869 = p1.call(null, p1__3755_SHARP_);
              if(cljs.core.truth_(or__3548__auto____3869)) {
                return or__3548__auto____3869
              }else {
                var or__3548__auto____3870 = p2.call(null, p1__3755_SHARP_);
                if(cljs.core.truth_(or__3548__auto____3870)) {
                  return or__3548__auto____3870
                }else {
                  return p3.call(null, p1__3755_SHARP_)
                }
              }
            }, args)
          }
        };
        var G__3903 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__3903__delegate.call(this, x, y, z, args)
        };
        G__3903.cljs$lang$maxFixedArity = 3;
        G__3903.cljs$lang$applyTo = function(arglist__3904) {
          var x = cljs.core.first(arglist__3904);
          var y = cljs.core.first(cljs.core.next(arglist__3904));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3904)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3904)));
          return G__3903__delegate.call(this, x, y, z, args)
        };
        return G__3903
      }();
      sp3 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return sp3__3897.call(this);
          case 1:
            return sp3__3898.call(this, x);
          case 2:
            return sp3__3899.call(this, x, y);
          case 3:
            return sp3__3900.call(this, x, y, z);
          default:
            return sp3__3901.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      sp3.cljs$lang$maxFixedArity = 3;
      sp3.cljs$lang$applyTo = sp3__3901.cljs$lang$applyTo;
      return sp3
    }()
  };
  var some_fn__3879 = function() {
    var G__3905__delegate = function(p1, p2, p3, ps) {
      var ps__3871 = cljs.core.list_STAR_.call(null, p1, p2, p3, ps);
      return function() {
        var spn = null;
        var spn__3906 = function() {
          return null
        };
        var spn__3907 = function(x) {
          return cljs.core.some.call(null, function(p1__3756_SHARP_) {
            return p1__3756_SHARP_.call(null, x)
          }, ps__3871)
        };
        var spn__3908 = function(x, y) {
          return cljs.core.some.call(null, function(p1__3757_SHARP_) {
            var or__3548__auto____3872 = p1__3757_SHARP_.call(null, x);
            if(cljs.core.truth_(or__3548__auto____3872)) {
              return or__3548__auto____3872
            }else {
              return p1__3757_SHARP_.call(null, y)
            }
          }, ps__3871)
        };
        var spn__3909 = function(x, y, z) {
          return cljs.core.some.call(null, function(p1__3758_SHARP_) {
            var or__3548__auto____3873 = p1__3758_SHARP_.call(null, x);
            if(cljs.core.truth_(or__3548__auto____3873)) {
              return or__3548__auto____3873
            }else {
              var or__3548__auto____3874 = p1__3758_SHARP_.call(null, y);
              if(cljs.core.truth_(or__3548__auto____3874)) {
                return or__3548__auto____3874
              }else {
                return p1__3758_SHARP_.call(null, z)
              }
            }
          }, ps__3871)
        };
        var spn__3910 = function() {
          var G__3912__delegate = function(x, y, z, args) {
            var or__3548__auto____3875 = spn.call(null, x, y, z);
            if(cljs.core.truth_(or__3548__auto____3875)) {
              return or__3548__auto____3875
            }else {
              return cljs.core.some.call(null, function(p1__3759_SHARP_) {
                return cljs.core.some.call(null, p1__3759_SHARP_, args)
              }, ps__3871)
            }
          };
          var G__3912 = function(x, y, z, var_args) {
            var args = null;
            if(goog.isDef(var_args)) {
              args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
            }
            return G__3912__delegate.call(this, x, y, z, args)
          };
          G__3912.cljs$lang$maxFixedArity = 3;
          G__3912.cljs$lang$applyTo = function(arglist__3913) {
            var x = cljs.core.first(arglist__3913);
            var y = cljs.core.first(cljs.core.next(arglist__3913));
            var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3913)));
            var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3913)));
            return G__3912__delegate.call(this, x, y, z, args)
          };
          return G__3912
        }();
        spn = function(x, y, z, var_args) {
          var args = var_args;
          switch(arguments.length) {
            case 0:
              return spn__3906.call(this);
            case 1:
              return spn__3907.call(this, x);
            case 2:
              return spn__3908.call(this, x, y);
            case 3:
              return spn__3909.call(this, x, y, z);
            default:
              return spn__3910.apply(this, arguments)
          }
          throw"Invalid arity: " + arguments.length;
        };
        spn.cljs$lang$maxFixedArity = 3;
        spn.cljs$lang$applyTo = spn__3910.cljs$lang$applyTo;
        return spn
      }()
    };
    var G__3905 = function(p1, p2, p3, var_args) {
      var ps = null;
      if(goog.isDef(var_args)) {
        ps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__3905__delegate.call(this, p1, p2, p3, ps)
    };
    G__3905.cljs$lang$maxFixedArity = 3;
    G__3905.cljs$lang$applyTo = function(arglist__3914) {
      var p1 = cljs.core.first(arglist__3914);
      var p2 = cljs.core.first(cljs.core.next(arglist__3914));
      var p3 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3914)));
      var ps = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3914)));
      return G__3905__delegate.call(this, p1, p2, p3, ps)
    };
    return G__3905
  }();
  some_fn = function(p1, p2, p3, var_args) {
    var ps = var_args;
    switch(arguments.length) {
      case 1:
        return some_fn__3876.call(this, p1);
      case 2:
        return some_fn__3877.call(this, p1, p2);
      case 3:
        return some_fn__3878.call(this, p1, p2, p3);
      default:
        return some_fn__3879.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  some_fn.cljs$lang$maxFixedArity = 3;
  some_fn.cljs$lang$applyTo = some_fn__3879.cljs$lang$applyTo;
  return some_fn
}();
cljs.core.map = function() {
  var map = null;
  var map__3927 = function(f, coll) {
    return new cljs.core.LazySeq(null, false, function() {
      var temp__3698__auto____3915 = cljs.core.seq.call(null, coll);
      if(cljs.core.truth_(temp__3698__auto____3915)) {
        var s__3916 = temp__3698__auto____3915;
        return cljs.core.cons.call(null, f.call(null, cljs.core.first.call(null, s__3916)), map.call(null, f, cljs.core.rest.call(null, s__3916)))
      }else {
        return null
      }
    })
  };
  var map__3928 = function(f, c1, c2) {
    return new cljs.core.LazySeq(null, false, function() {
      var s1__3917 = cljs.core.seq.call(null, c1);
      var s2__3918 = cljs.core.seq.call(null, c2);
      if(cljs.core.truth_(function() {
        var and__3546__auto____3919 = s1__3917;
        if(cljs.core.truth_(and__3546__auto____3919)) {
          return s2__3918
        }else {
          return and__3546__auto____3919
        }
      }())) {
        return cljs.core.cons.call(null, f.call(null, cljs.core.first.call(null, s1__3917), cljs.core.first.call(null, s2__3918)), map.call(null, f, cljs.core.rest.call(null, s1__3917), cljs.core.rest.call(null, s2__3918)))
      }else {
        return null
      }
    })
  };
  var map__3929 = function(f, c1, c2, c3) {
    return new cljs.core.LazySeq(null, false, function() {
      var s1__3920 = cljs.core.seq.call(null, c1);
      var s2__3921 = cljs.core.seq.call(null, c2);
      var s3__3922 = cljs.core.seq.call(null, c3);
      if(cljs.core.truth_(function() {
        var and__3546__auto____3923 = s1__3920;
        if(cljs.core.truth_(and__3546__auto____3923)) {
          var and__3546__auto____3924 = s2__3921;
          if(cljs.core.truth_(and__3546__auto____3924)) {
            return s3__3922
          }else {
            return and__3546__auto____3924
          }
        }else {
          return and__3546__auto____3923
        }
      }())) {
        return cljs.core.cons.call(null, f.call(null, cljs.core.first.call(null, s1__3920), cljs.core.first.call(null, s2__3921), cljs.core.first.call(null, s3__3922)), map.call(null, f, cljs.core.rest.call(null, s1__3920), cljs.core.rest.call(null, s2__3921), cljs.core.rest.call(null, s3__3922)))
      }else {
        return null
      }
    })
  };
  var map__3930 = function() {
    var G__3932__delegate = function(f, c1, c2, c3, colls) {
      var step__3926 = function step(cs) {
        return new cljs.core.LazySeq(null, false, function() {
          var ss__3925 = map.call(null, cljs.core.seq, cs);
          if(cljs.core.truth_(cljs.core.every_QMARK_.call(null, cljs.core.identity, ss__3925))) {
            return cljs.core.cons.call(null, map.call(null, cljs.core.first, ss__3925), step.call(null, map.call(null, cljs.core.rest, ss__3925)))
          }else {
            return null
          }
        })
      };
      return map.call(null, function(p1__3837_SHARP_) {
        return cljs.core.apply.call(null, f, p1__3837_SHARP_)
      }, step__3926.call(null, cljs.core.conj.call(null, colls, c3, c2, c1)))
    };
    var G__3932 = function(f, c1, c2, c3, var_args) {
      var colls = null;
      if(goog.isDef(var_args)) {
        colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4), 0)
      }
      return G__3932__delegate.call(this, f, c1, c2, c3, colls)
    };
    G__3932.cljs$lang$maxFixedArity = 4;
    G__3932.cljs$lang$applyTo = function(arglist__3933) {
      var f = cljs.core.first(arglist__3933);
      var c1 = cljs.core.first(cljs.core.next(arglist__3933));
      var c2 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3933)));
      var c3 = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3933))));
      var colls = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3933))));
      return G__3932__delegate.call(this, f, c1, c2, c3, colls)
    };
    return G__3932
  }();
  map = function(f, c1, c2, c3, var_args) {
    var colls = var_args;
    switch(arguments.length) {
      case 2:
        return map__3927.call(this, f, c1);
      case 3:
        return map__3928.call(this, f, c1, c2);
      case 4:
        return map__3929.call(this, f, c1, c2, c3);
      default:
        return map__3930.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  map.cljs$lang$maxFixedArity = 4;
  map.cljs$lang$applyTo = map__3930.cljs$lang$applyTo;
  return map
}();
cljs.core.take = function take(n, coll) {
  return new cljs.core.LazySeq(null, false, function() {
    if(cljs.core.truth_(n > 0)) {
      var temp__3698__auto____3934 = cljs.core.seq.call(null, coll);
      if(cljs.core.truth_(temp__3698__auto____3934)) {
        var s__3935 = temp__3698__auto____3934;
        return cljs.core.cons.call(null, cljs.core.first.call(null, s__3935), take.call(null, n - 1, cljs.core.rest.call(null, s__3935)))
      }else {
        return null
      }
    }else {
      return null
    }
  })
};
cljs.core.drop = function drop(n, coll) {
  var step__3938 = function(n, coll) {
    while(true) {
      var s__3936 = cljs.core.seq.call(null, coll);
      if(cljs.core.truth_(function() {
        var and__3546__auto____3937 = n > 0;
        if(cljs.core.truth_(and__3546__auto____3937)) {
          return s__3936
        }else {
          return and__3546__auto____3937
        }
      }())) {
        var G__3939 = n - 1;
        var G__3940 = cljs.core.rest.call(null, s__3936);
        n = G__3939;
        coll = G__3940;
        continue
      }else {
        return s__3936
      }
      break
    }
  };
  return new cljs.core.LazySeq(null, false, function() {
    return step__3938.call(null, n, coll)
  })
};
cljs.core.drop_last = function() {
  var drop_last = null;
  var drop_last__3941 = function(s) {
    return drop_last.call(null, 1, s)
  };
  var drop_last__3942 = function(n, s) {
    return cljs.core.map.call(null, function(x, _) {
      return x
    }, s, cljs.core.drop.call(null, n, s))
  };
  drop_last = function(n, s) {
    switch(arguments.length) {
      case 1:
        return drop_last__3941.call(this, n);
      case 2:
        return drop_last__3942.call(this, n, s)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return drop_last
}();
cljs.core.take_last = function take_last(n, coll) {
  var s__3944 = cljs.core.seq.call(null, coll);
  var lead__3945 = cljs.core.seq.call(null, cljs.core.drop.call(null, n, coll));
  while(true) {
    if(cljs.core.truth_(lead__3945)) {
      var G__3946 = cljs.core.next.call(null, s__3944);
      var G__3947 = cljs.core.next.call(null, lead__3945);
      s__3944 = G__3946;
      lead__3945 = G__3947;
      continue
    }else {
      return s__3944
    }
    break
  }
};
cljs.core.drop_while = function drop_while(pred, coll) {
  var step__3950 = function(pred, coll) {
    while(true) {
      var s__3948 = cljs.core.seq.call(null, coll);
      if(cljs.core.truth_(function() {
        var and__3546__auto____3949 = s__3948;
        if(cljs.core.truth_(and__3546__auto____3949)) {
          return pred.call(null, cljs.core.first.call(null, s__3948))
        }else {
          return and__3546__auto____3949
        }
      }())) {
        var G__3951 = pred;
        var G__3952 = cljs.core.rest.call(null, s__3948);
        pred = G__3951;
        coll = G__3952;
        continue
      }else {
        return s__3948
      }
      break
    }
  };
  return new cljs.core.LazySeq(null, false, function() {
    return step__3950.call(null, pred, coll)
  })
};
cljs.core.cycle = function cycle(coll) {
  return new cljs.core.LazySeq(null, false, function() {
    var temp__3698__auto____3953 = cljs.core.seq.call(null, coll);
    if(cljs.core.truth_(temp__3698__auto____3953)) {
      var s__3954 = temp__3698__auto____3953;
      return cljs.core.concat.call(null, s__3954, cycle.call(null, s__3954))
    }else {
      return null
    }
  })
};
cljs.core.split_at = function split_at(n, coll) {
  return cljs.core.Vector.fromArray([cljs.core.take.call(null, n, coll), cljs.core.drop.call(null, n, coll)])
};
cljs.core.repeat = function() {
  var repeat = null;
  var repeat__3955 = function(x) {
    return new cljs.core.LazySeq(null, false, function() {
      return cljs.core.cons.call(null, x, repeat.call(null, x))
    })
  };
  var repeat__3956 = function(n, x) {
    return cljs.core.take.call(null, n, repeat.call(null, x))
  };
  repeat = function(n, x) {
    switch(arguments.length) {
      case 1:
        return repeat__3955.call(this, n);
      case 2:
        return repeat__3956.call(this, n, x)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return repeat
}();
cljs.core.replicate = function replicate(n, x) {
  return cljs.core.take.call(null, n, cljs.core.repeat.call(null, x))
};
cljs.core.repeatedly = function() {
  var repeatedly = null;
  var repeatedly__3958 = function(f) {
    return new cljs.core.LazySeq(null, false, function() {
      return cljs.core.cons.call(null, f.call(null), repeatedly.call(null, f))
    })
  };
  var repeatedly__3959 = function(n, f) {
    return cljs.core.take.call(null, n, repeatedly.call(null, f))
  };
  repeatedly = function(n, f) {
    switch(arguments.length) {
      case 1:
        return repeatedly__3958.call(this, n);
      case 2:
        return repeatedly__3959.call(this, n, f)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return repeatedly
}();
cljs.core.iterate = function iterate(f, x) {
  return cljs.core.cons.call(null, x, new cljs.core.LazySeq(null, false, function() {
    return iterate.call(null, f, f.call(null, x))
  }))
};
cljs.core.interleave = function() {
  var interleave = null;
  var interleave__3965 = function(c1, c2) {
    return new cljs.core.LazySeq(null, false, function() {
      var s1__3961 = cljs.core.seq.call(null, c1);
      var s2__3962 = cljs.core.seq.call(null, c2);
      if(cljs.core.truth_(function() {
        var and__3546__auto____3963 = s1__3961;
        if(cljs.core.truth_(and__3546__auto____3963)) {
          return s2__3962
        }else {
          return and__3546__auto____3963
        }
      }())) {
        return cljs.core.cons.call(null, cljs.core.first.call(null, s1__3961), cljs.core.cons.call(null, cljs.core.first.call(null, s2__3962), interleave.call(null, cljs.core.rest.call(null, s1__3961), cljs.core.rest.call(null, s2__3962))))
      }else {
        return null
      }
    })
  };
  var interleave__3966 = function() {
    var G__3968__delegate = function(c1, c2, colls) {
      return new cljs.core.LazySeq(null, false, function() {
        var ss__3964 = cljs.core.map.call(null, cljs.core.seq, cljs.core.conj.call(null, colls, c2, c1));
        if(cljs.core.truth_(cljs.core.every_QMARK_.call(null, cljs.core.identity, ss__3964))) {
          return cljs.core.concat.call(null, cljs.core.map.call(null, cljs.core.first, ss__3964), cljs.core.apply.call(null, interleave, cljs.core.map.call(null, cljs.core.rest, ss__3964)))
        }else {
          return null
        }
      })
    };
    var G__3968 = function(c1, c2, var_args) {
      var colls = null;
      if(goog.isDef(var_args)) {
        colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__3968__delegate.call(this, c1, c2, colls)
    };
    G__3968.cljs$lang$maxFixedArity = 2;
    G__3968.cljs$lang$applyTo = function(arglist__3969) {
      var c1 = cljs.core.first(arglist__3969);
      var c2 = cljs.core.first(cljs.core.next(arglist__3969));
      var colls = cljs.core.rest(cljs.core.next(arglist__3969));
      return G__3968__delegate.call(this, c1, c2, colls)
    };
    return G__3968
  }();
  interleave = function(c1, c2, var_args) {
    var colls = var_args;
    switch(arguments.length) {
      case 2:
        return interleave__3965.call(this, c1, c2);
      default:
        return interleave__3966.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  interleave.cljs$lang$maxFixedArity = 2;
  interleave.cljs$lang$applyTo = interleave__3966.cljs$lang$applyTo;
  return interleave
}();
cljs.core.interpose = function interpose(sep, coll) {
  return cljs.core.drop.call(null, 1, cljs.core.interleave.call(null, cljs.core.repeat.call(null, sep), coll))
};
cljs.core.flatten1 = function flatten1(colls) {
  var cat__3972 = function cat(coll, colls) {
    return new cljs.core.LazySeq(null, false, function() {
      var temp__3695__auto____3970 = cljs.core.seq.call(null, coll);
      if(cljs.core.truth_(temp__3695__auto____3970)) {
        var coll__3971 = temp__3695__auto____3970;
        return cljs.core.cons.call(null, cljs.core.first.call(null, coll__3971), cat.call(null, cljs.core.rest.call(null, coll__3971), colls))
      }else {
        if(cljs.core.truth_(cljs.core.seq.call(null, colls))) {
          return cat.call(null, cljs.core.first.call(null, colls), cljs.core.rest.call(null, colls))
        }else {
          return null
        }
      }
    })
  };
  return cat__3972.call(null, null, colls)
};
cljs.core.mapcat = function() {
  var mapcat = null;
  var mapcat__3973 = function(f, coll) {
    return cljs.core.flatten1.call(null, cljs.core.map.call(null, f, coll))
  };
  var mapcat__3974 = function() {
    var G__3976__delegate = function(f, coll, colls) {
      return cljs.core.flatten1.call(null, cljs.core.apply.call(null, cljs.core.map, f, coll, colls))
    };
    var G__3976 = function(f, coll, var_args) {
      var colls = null;
      if(goog.isDef(var_args)) {
        colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
      }
      return G__3976__delegate.call(this, f, coll, colls)
    };
    G__3976.cljs$lang$maxFixedArity = 2;
    G__3976.cljs$lang$applyTo = function(arglist__3977) {
      var f = cljs.core.first(arglist__3977);
      var coll = cljs.core.first(cljs.core.next(arglist__3977));
      var colls = cljs.core.rest(cljs.core.next(arglist__3977));
      return G__3976__delegate.call(this, f, coll, colls)
    };
    return G__3976
  }();
  mapcat = function(f, coll, var_args) {
    var colls = var_args;
    switch(arguments.length) {
      case 2:
        return mapcat__3973.call(this, f, coll);
      default:
        return mapcat__3974.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  mapcat.cljs$lang$maxFixedArity = 2;
  mapcat.cljs$lang$applyTo = mapcat__3974.cljs$lang$applyTo;
  return mapcat
}();
cljs.core.filter = function filter(pred, coll) {
  return new cljs.core.LazySeq(null, false, function() {
    var temp__3698__auto____3978 = cljs.core.seq.call(null, coll);
    if(cljs.core.truth_(temp__3698__auto____3978)) {
      var s__3979 = temp__3698__auto____3978;
      var f__3980 = cljs.core.first.call(null, s__3979);
      var r__3981 = cljs.core.rest.call(null, s__3979);
      if(cljs.core.truth_(pred.call(null, f__3980))) {
        return cljs.core.cons.call(null, f__3980, filter.call(null, pred, r__3981))
      }else {
        return filter.call(null, pred, r__3981)
      }
    }else {
      return null
    }
  })
};
cljs.core.remove = function remove(pred, coll) {
  return cljs.core.filter.call(null, cljs.core.complement.call(null, pred), coll)
};
cljs.core.tree_seq = function tree_seq(branch_QMARK_, children, root) {
  var walk__3983 = function walk(node) {
    return new cljs.core.LazySeq(null, false, function() {
      return cljs.core.cons.call(null, node, cljs.core.truth_(branch_QMARK_.call(null, node)) ? cljs.core.mapcat.call(null, walk, children.call(null, node)) : null)
    })
  };
  return walk__3983.call(null, root)
};
cljs.core.flatten = function flatten(x) {
  return cljs.core.filter.call(null, function(p1__3982_SHARP_) {
    return cljs.core.not.call(null, cljs.core.sequential_QMARK_.call(null, p1__3982_SHARP_))
  }, cljs.core.rest.call(null, cljs.core.tree_seq.call(null, cljs.core.sequential_QMARK_, cljs.core.seq, x)))
};
cljs.core.into = function into(to, from) {
  return cljs.core.reduce.call(null, cljs.core._conj, to, from)
};
cljs.core.partition = function() {
  var partition = null;
  var partition__3990 = function(n, coll) {
    return partition.call(null, n, n, coll)
  };
  var partition__3991 = function(n, step, coll) {
    return new cljs.core.LazySeq(null, false, function() {
      var temp__3698__auto____3984 = cljs.core.seq.call(null, coll);
      if(cljs.core.truth_(temp__3698__auto____3984)) {
        var s__3985 = temp__3698__auto____3984;
        var p__3986 = cljs.core.take.call(null, n, s__3985);
        if(cljs.core.truth_(cljs.core._EQ_.call(null, n, cljs.core.count.call(null, p__3986)))) {
          return cljs.core.cons.call(null, p__3986, partition.call(null, n, step, cljs.core.drop.call(null, step, s__3985)))
        }else {
          return null
        }
      }else {
        return null
      }
    })
  };
  var partition__3992 = function(n, step, pad, coll) {
    return new cljs.core.LazySeq(null, false, function() {
      var temp__3698__auto____3987 = cljs.core.seq.call(null, coll);
      if(cljs.core.truth_(temp__3698__auto____3987)) {
        var s__3988 = temp__3698__auto____3987;
        var p__3989 = cljs.core.take.call(null, n, s__3988);
        if(cljs.core.truth_(cljs.core._EQ_.call(null, n, cljs.core.count.call(null, p__3989)))) {
          return cljs.core.cons.call(null, p__3989, partition.call(null, n, step, pad, cljs.core.drop.call(null, step, s__3988)))
        }else {
          return cljs.core.list.call(null, cljs.core.take.call(null, n, cljs.core.concat.call(null, p__3989, pad)))
        }
      }else {
        return null
      }
    })
  };
  partition = function(n, step, pad, coll) {
    switch(arguments.length) {
      case 2:
        return partition__3990.call(this, n, step);
      case 3:
        return partition__3991.call(this, n, step, pad);
      case 4:
        return partition__3992.call(this, n, step, pad, coll)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return partition
}();
cljs.core.get_in = function() {
  var get_in = null;
  var get_in__3998 = function(m, ks) {
    return cljs.core.reduce.call(null, cljs.core.get, m, ks)
  };
  var get_in__3999 = function(m, ks, not_found) {
    var sentinel__3994 = cljs.core.lookup_sentinel;
    var m__3995 = m;
    var ks__3996 = cljs.core.seq.call(null, ks);
    while(true) {
      if(cljs.core.truth_(ks__3996)) {
        var m__3997 = cljs.core.get.call(null, m__3995, cljs.core.first.call(null, ks__3996), sentinel__3994);
        if(cljs.core.truth_(sentinel__3994 === m__3997)) {
          return not_found
        }else {
          var G__4001 = sentinel__3994;
          var G__4002 = m__3997;
          var G__4003 = cljs.core.next.call(null, ks__3996);
          sentinel__3994 = G__4001;
          m__3995 = G__4002;
          ks__3996 = G__4003;
          continue
        }
      }else {
        return m__3995
      }
      break
    }
  };
  get_in = function(m, ks, not_found) {
    switch(arguments.length) {
      case 2:
        return get_in__3998.call(this, m, ks);
      case 3:
        return get_in__3999.call(this, m, ks, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return get_in
}();
cljs.core.assoc_in = function assoc_in(m, p__4004, v) {
  var vec__4005__4006 = p__4004;
  var k__4007 = cljs.core.nth.call(null, vec__4005__4006, 0, null);
  var ks__4008 = cljs.core.nthnext.call(null, vec__4005__4006, 1);
  if(cljs.core.truth_(ks__4008)) {
    return cljs.core.assoc.call(null, m, k__4007, assoc_in.call(null, cljs.core.get.call(null, m, k__4007), ks__4008, v))
  }else {
    return cljs.core.assoc.call(null, m, k__4007, v)
  }
};
cljs.core.update_in = function() {
  var update_in__delegate = function(m, p__4009, f, args) {
    var vec__4010__4011 = p__4009;
    var k__4012 = cljs.core.nth.call(null, vec__4010__4011, 0, null);
    var ks__4013 = cljs.core.nthnext.call(null, vec__4010__4011, 1);
    if(cljs.core.truth_(ks__4013)) {
      return cljs.core.assoc.call(null, m, k__4012, cljs.core.apply.call(null, update_in, cljs.core.get.call(null, m, k__4012), ks__4013, f, args))
    }else {
      return cljs.core.assoc.call(null, m, k__4012, cljs.core.apply.call(null, f, cljs.core.get.call(null, m, k__4012), args))
    }
  };
  var update_in = function(m, p__4009, f, var_args) {
    var args = null;
    if(goog.isDef(var_args)) {
      args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
    }
    return update_in__delegate.call(this, m, p__4009, f, args)
  };
  update_in.cljs$lang$maxFixedArity = 3;
  update_in.cljs$lang$applyTo = function(arglist__4014) {
    var m = cljs.core.first(arglist__4014);
    var p__4009 = cljs.core.first(cljs.core.next(arglist__4014));
    var f = cljs.core.first(cljs.core.next(cljs.core.next(arglist__4014)));
    var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__4014)));
    return update_in__delegate.call(this, m, p__4009, f, args)
  };
  return update_in
}();
cljs.core.Vector = function(meta, array) {
  this.meta = meta;
  this.array = array
};
cljs.core.Vector.cljs$core$IPrintable$_pr_seq = function(this__360__auto__) {
  return cljs.core.list.call(null, "cljs.core.Vector")
};
cljs.core.Vector.prototype.cljs$core$IHash$ = true;
cljs.core.Vector.prototype.cljs$core$IHash$_hash = function(coll) {
  var this__4015 = this;
  return cljs.core.hash_coll.call(null, coll)
};
cljs.core.Vector.prototype.cljs$core$ILookup$ = true;
cljs.core.Vector.prototype.cljs$core$ILookup$_lookup = function() {
  var G__4042 = null;
  var G__4042__4043 = function(coll, k) {
    var this__4016 = this;
    return cljs.core._nth.call(null, coll, k, null)
  };
  var G__4042__4044 = function(coll, k, not_found) {
    var this__4017 = this;
    return cljs.core._nth.call(null, coll, k, not_found)
  };
  G__4042 = function(coll, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__4042__4043.call(this, coll, k);
      case 3:
        return G__4042__4044.call(this, coll, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__4042
}();
cljs.core.Vector.prototype.cljs$core$IAssociative$ = true;
cljs.core.Vector.prototype.cljs$core$IAssociative$_assoc = function(coll, k, v) {
  var this__4018 = this;
  var new_array__4019 = cljs.core.aclone.call(null, this__4018.array);
  new_array__4019[k] = v;
  return new cljs.core.Vector(this__4018.meta, new_array__4019)
};
cljs.core.Vector.prototype.cljs$core$IFn$ = true;
cljs.core.Vector.prototype.call = function() {
  var G__4046 = null;
  var G__4046__4047 = function(coll, k) {
    var this__4020 = this;
    coll = this;
    return cljs.core._lookup.call(null, coll, k)
  };
  var G__4046__4048 = function(coll, k, not_found) {
    var this__4021 = this;
    coll = this;
    return cljs.core._lookup.call(null, coll, k, not_found)
  };
  G__4046 = function(coll, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__4046__4047.call(this, coll, k);
      case 3:
        return G__4046__4048.call(this, coll, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__4046
}();
cljs.core.Vector.prototype.cljs$core$ISequential$ = true;
cljs.core.Vector.prototype.cljs$core$ICollection$ = true;
cljs.core.Vector.prototype.cljs$core$ICollection$_conj = function(coll, o) {
  var this__4022 = this;
  var new_array__4023 = cljs.core.aclone.call(null, this__4022.array);
  new_array__4023.push(o);
  return new cljs.core.Vector(this__4022.meta, new_array__4023)
};
cljs.core.Vector.prototype.cljs$core$IReduce$ = true;
cljs.core.Vector.prototype.cljs$core$IReduce$_reduce = function() {
  var G__4050 = null;
  var G__4050__4051 = function(v, f) {
    var this__4024 = this;
    return cljs.core.ci_reduce.call(null, this__4024.array, f)
  };
  var G__4050__4052 = function(v, f, start) {
    var this__4025 = this;
    return cljs.core.ci_reduce.call(null, this__4025.array, f, start)
  };
  G__4050 = function(v, f, start) {
    switch(arguments.length) {
      case 2:
        return G__4050__4051.call(this, v, f);
      case 3:
        return G__4050__4052.call(this, v, f, start)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__4050
}();
cljs.core.Vector.prototype.cljs$core$ISeqable$ = true;
cljs.core.Vector.prototype.cljs$core$ISeqable$_seq = function(coll) {
  var this__4026 = this;
  if(cljs.core.truth_(this__4026.array.length > 0)) {
    var vector_seq__4027 = function vector_seq(i) {
      return new cljs.core.LazySeq(null, false, function() {
        if(cljs.core.truth_(i < this__4026.array.length)) {
          return cljs.core.cons.call(null, this__4026.array[i], vector_seq.call(null, i + 1))
        }else {
          return null
        }
      })
    };
    return vector_seq__4027.call(null, 0)
  }else {
    return null
  }
};
cljs.core.Vector.prototype.cljs$core$ICounted$ = true;
cljs.core.Vector.prototype.cljs$core$ICounted$_count = function(coll) {
  var this__4028 = this;
  return this__4028.array.length
};
cljs.core.Vector.prototype.cljs$core$IStack$ = true;
cljs.core.Vector.prototype.cljs$core$IStack$_peek = function(coll) {
  var this__4029 = this;
  var count__4030 = this__4029.array.length;
  if(cljs.core.truth_(count__4030 > 0)) {
    return this__4029.array[count__4030 - 1]
  }else {
    return null
  }
};
cljs.core.Vector.prototype.cljs$core$IStack$_pop = function(coll) {
  var this__4031 = this;
  if(cljs.core.truth_(this__4031.array.length > 0)) {
    var new_array__4032 = cljs.core.aclone.call(null, this__4031.array);
    new_array__4032.pop();
    return new cljs.core.Vector(this__4031.meta, new_array__4032)
  }else {
    throw new Error("Can't pop empty vector");
  }
};
cljs.core.Vector.prototype.cljs$core$IVector$ = true;
cljs.core.Vector.prototype.cljs$core$IVector$_assoc_n = function(coll, n, val) {
  var this__4033 = this;
  return cljs.core._assoc.call(null, coll, n, val)
};
cljs.core.Vector.prototype.cljs$core$IEquiv$ = true;
cljs.core.Vector.prototype.cljs$core$IEquiv$_equiv = function(coll, other) {
  var this__4034 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.Vector.prototype.cljs$core$IWithMeta$ = true;
cljs.core.Vector.prototype.cljs$core$IWithMeta$_with_meta = function(coll, meta) {
  var this__4035 = this;
  return new cljs.core.Vector(meta, this__4035.array)
};
cljs.core.Vector.prototype.cljs$core$IMeta$ = true;
cljs.core.Vector.prototype.cljs$core$IMeta$_meta = function(coll) {
  var this__4036 = this;
  return this__4036.meta
};
cljs.core.Vector.prototype.cljs$core$IIndexed$ = true;
cljs.core.Vector.prototype.cljs$core$IIndexed$_nth = function() {
  var G__4054 = null;
  var G__4054__4055 = function(coll, n) {
    var this__4037 = this;
    if(cljs.core.truth_(function() {
      var and__3546__auto____4038 = 0 <= n;
      if(cljs.core.truth_(and__3546__auto____4038)) {
        return n < this__4037.array.length
      }else {
        return and__3546__auto____4038
      }
    }())) {
      return this__4037.array[n]
    }else {
      return null
    }
  };
  var G__4054__4056 = function(coll, n, not_found) {
    var this__4039 = this;
    if(cljs.core.truth_(function() {
      var and__3546__auto____4040 = 0 <= n;
      if(cljs.core.truth_(and__3546__auto____4040)) {
        return n < this__4039.array.length
      }else {
        return and__3546__auto____4040
      }
    }())) {
      return this__4039.array[n]
    }else {
      return not_found
    }
  };
  G__4054 = function(coll, n, not_found) {
    switch(arguments.length) {
      case 2:
        return G__4054__4055.call(this, coll, n);
      case 3:
        return G__4054__4056.call(this, coll, n, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__4054
}();
cljs.core.Vector.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.Vector.prototype.cljs$core$IEmptyableCollection$_empty = function(coll) {
  var this__4041 = this;
  return cljs.core.with_meta.call(null, cljs.core.Vector.EMPTY, this__4041.meta)
};
cljs.core.Vector;
cljs.core.Vector.EMPTY = new cljs.core.Vector(null, cljs.core.array.call(null));
cljs.core.Vector.fromArray = function(xs) {
  return new cljs.core.Vector(null, xs)
};
cljs.core.vec = function vec(coll) {
  return cljs.core.reduce.call(null, cljs.core.conj, cljs.core.Vector.EMPTY, coll)
};
cljs.core.vector = function() {
  var vector__delegate = function(args) {
    return cljs.core.vec.call(null, args)
  };
  var vector = function(var_args) {
    var args = null;
    if(goog.isDef(var_args)) {
      args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return vector__delegate.call(this, args)
  };
  vector.cljs$lang$maxFixedArity = 0;
  vector.cljs$lang$applyTo = function(arglist__4058) {
    var args = cljs.core.seq(arglist__4058);
    return vector__delegate.call(this, args)
  };
  return vector
}();
cljs.core.Subvec = function(meta, v, start, end) {
  this.meta = meta;
  this.v = v;
  this.start = start;
  this.end = end
};
cljs.core.Subvec.cljs$core$IPrintable$_pr_seq = function(this__360__auto__) {
  return cljs.core.list.call(null, "cljs.core.Subvec")
};
cljs.core.Subvec.prototype.cljs$core$IHash$ = true;
cljs.core.Subvec.prototype.cljs$core$IHash$_hash = function(coll) {
  var this__4059 = this;
  return cljs.core.hash_coll.call(null, coll)
};
cljs.core.Subvec.prototype.cljs$core$ILookup$ = true;
cljs.core.Subvec.prototype.cljs$core$ILookup$_lookup = function() {
  var G__4081 = null;
  var G__4081__4082 = function(coll, k) {
    var this__4060 = this;
    return cljs.core._nth.call(null, coll, k, null)
  };
  var G__4081__4083 = function(coll, k, not_found) {
    var this__4061 = this;
    return cljs.core._nth.call(null, coll, k, not_found)
  };
  G__4081 = function(coll, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__4081__4082.call(this, coll, k);
      case 3:
        return G__4081__4083.call(this, coll, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__4081
}();
cljs.core.Subvec.prototype.cljs$core$IAssociative$ = true;
cljs.core.Subvec.prototype.cljs$core$IAssociative$_assoc = function(coll, key, val) {
  var this__4062 = this;
  var v_pos__4063 = this__4062.start + key;
  return new cljs.core.Subvec(this__4062.meta, cljs.core._assoc.call(null, this__4062.v, v_pos__4063, val), this__4062.start, this__4062.end > v_pos__4063 + 1 ? this__4062.end : v_pos__4063 + 1)
};
cljs.core.Subvec.prototype.cljs$core$IFn$ = true;
cljs.core.Subvec.prototype.call = function() {
  var G__4085 = null;
  var G__4085__4086 = function(coll, k) {
    var this__4064 = this;
    coll = this;
    return cljs.core._lookup.call(null, coll, k)
  };
  var G__4085__4087 = function(coll, k, not_found) {
    var this__4065 = this;
    coll = this;
    return cljs.core._lookup.call(null, coll, k, not_found)
  };
  G__4085 = function(coll, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__4085__4086.call(this, coll, k);
      case 3:
        return G__4085__4087.call(this, coll, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__4085
}();
cljs.core.Subvec.prototype.cljs$core$ISequential$ = true;
cljs.core.Subvec.prototype.cljs$core$ICollection$ = true;
cljs.core.Subvec.prototype.cljs$core$ICollection$_conj = function(coll, o) {
  var this__4066 = this;
  return new cljs.core.Subvec(this__4066.meta, cljs.core._assoc_n.call(null, this__4066.v, this__4066.end, o), this__4066.start, this__4066.end + 1)
};
cljs.core.Subvec.prototype.cljs$core$IReduce$ = true;
cljs.core.Subvec.prototype.cljs$core$IReduce$_reduce = function() {
  var G__4089 = null;
  var G__4089__4090 = function(coll, f) {
    var this__4067 = this;
    return cljs.core.ci_reduce.call(null, coll, f)
  };
  var G__4089__4091 = function(coll, f, start) {
    var this__4068 = this;
    return cljs.core.ci_reduce.call(null, coll, f, start)
  };
  G__4089 = function(coll, f, start) {
    switch(arguments.length) {
      case 2:
        return G__4089__4090.call(this, coll, f);
      case 3:
        return G__4089__4091.call(this, coll, f, start)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__4089
}();
cljs.core.Subvec.prototype.cljs$core$ISeqable$ = true;
cljs.core.Subvec.prototype.cljs$core$ISeqable$_seq = function(coll) {
  var this__4069 = this;
  var subvec_seq__4070 = function subvec_seq(i) {
    if(cljs.core.truth_(cljs.core._EQ_.call(null, i, this__4069.end))) {
      return null
    }else {
      return cljs.core.cons.call(null, cljs.core._nth.call(null, this__4069.v, i), new cljs.core.LazySeq(null, false, function() {
        return subvec_seq.call(null, i + 1)
      }))
    }
  };
  return subvec_seq__4070.call(null, this__4069.start)
};
cljs.core.Subvec.prototype.cljs$core$ICounted$ = true;
cljs.core.Subvec.prototype.cljs$core$ICounted$_count = function(coll) {
  var this__4071 = this;
  return this__4071.end - this__4071.start
};
cljs.core.Subvec.prototype.cljs$core$IStack$ = true;
cljs.core.Subvec.prototype.cljs$core$IStack$_peek = function(coll) {
  var this__4072 = this;
  return cljs.core._nth.call(null, this__4072.v, this__4072.end - 1)
};
cljs.core.Subvec.prototype.cljs$core$IStack$_pop = function(coll) {
  var this__4073 = this;
  if(cljs.core.truth_(cljs.core._EQ_.call(null, this__4073.start, this__4073.end))) {
    throw new Error("Can't pop empty vector");
  }else {
    return new cljs.core.Subvec(this__4073.meta, this__4073.v, this__4073.start, this__4073.end - 1)
  }
};
cljs.core.Subvec.prototype.cljs$core$IVector$ = true;
cljs.core.Subvec.prototype.cljs$core$IVector$_assoc_n = function(coll, n, val) {
  var this__4074 = this;
  return cljs.core._assoc.call(null, coll, n, val)
};
cljs.core.Subvec.prototype.cljs$core$IEquiv$ = true;
cljs.core.Subvec.prototype.cljs$core$IEquiv$_equiv = function(coll, other) {
  var this__4075 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.Subvec.prototype.cljs$core$IWithMeta$ = true;
cljs.core.Subvec.prototype.cljs$core$IWithMeta$_with_meta = function(coll, meta) {
  var this__4076 = this;
  return new cljs.core.Subvec(meta, this__4076.v, this__4076.start, this__4076.end)
};
cljs.core.Subvec.prototype.cljs$core$IMeta$ = true;
cljs.core.Subvec.prototype.cljs$core$IMeta$_meta = function(coll) {
  var this__4077 = this;
  return this__4077.meta
};
cljs.core.Subvec.prototype.cljs$core$IIndexed$ = true;
cljs.core.Subvec.prototype.cljs$core$IIndexed$_nth = function() {
  var G__4093 = null;
  var G__4093__4094 = function(coll, n) {
    var this__4078 = this;
    return cljs.core._nth.call(null, this__4078.v, this__4078.start + n)
  };
  var G__4093__4095 = function(coll, n, not_found) {
    var this__4079 = this;
    return cljs.core._nth.call(null, this__4079.v, this__4079.start + n, not_found)
  };
  G__4093 = function(coll, n, not_found) {
    switch(arguments.length) {
      case 2:
        return G__4093__4094.call(this, coll, n);
      case 3:
        return G__4093__4095.call(this, coll, n, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__4093
}();
cljs.core.Subvec.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.Subvec.prototype.cljs$core$IEmptyableCollection$_empty = function(coll) {
  var this__4080 = this;
  return cljs.core.with_meta.call(null, cljs.core.Vector.EMPTY, this__4080.meta)
};
cljs.core.Subvec;
cljs.core.subvec = function() {
  var subvec = null;
  var subvec__4097 = function(v, start) {
    return subvec.call(null, v, start, cljs.core.count.call(null, v))
  };
  var subvec__4098 = function(v, start, end) {
    return new cljs.core.Subvec(null, v, start, end)
  };
  subvec = function(v, start, end) {
    switch(arguments.length) {
      case 2:
        return subvec__4097.call(this, v, start);
      case 3:
        return subvec__4098.call(this, v, start, end)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return subvec
}();
cljs.core.PersistentQueueSeq = function(meta, front, rear) {
  this.meta = meta;
  this.front = front;
  this.rear = rear
};
cljs.core.PersistentQueueSeq.cljs$core$IPrintable$_pr_seq = function(this__360__auto__) {
  return cljs.core.list.call(null, "cljs.core.PersistentQueueSeq")
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeqable$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeqable$_seq = function(coll) {
  var this__4100 = this;
  return coll
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IHash$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IHash$_hash = function(coll) {
  var this__4101 = this;
  return cljs.core.hash_coll.call(null, coll)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEquiv$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEquiv$_equiv = function(coll, other) {
  var this__4102 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISequential$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IEmptyableCollection$_empty = function(coll) {
  var this__4103 = this;
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this__4103.meta)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ICollection$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$ICollection$_conj = function(coll, o) {
  var this__4104 = this;
  return cljs.core.cons.call(null, o, coll)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeq$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeq$_first = function(coll) {
  var this__4105 = this;
  return cljs.core._first.call(null, this__4105.front)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$ISeq$_rest = function(coll) {
  var this__4106 = this;
  var temp__3695__auto____4107 = cljs.core.next.call(null, this__4106.front);
  if(cljs.core.truth_(temp__3695__auto____4107)) {
    var f1__4108 = temp__3695__auto____4107;
    return new cljs.core.PersistentQueueSeq(this__4106.meta, f1__4108, this__4106.rear)
  }else {
    if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, this__4106.rear))) {
      return cljs.core._empty.call(null, coll)
    }else {
      return new cljs.core.PersistentQueueSeq(this__4106.meta, this__4106.rear, null)
    }
  }
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IMeta$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IMeta$_meta = function(coll) {
  var this__4109 = this;
  return this__4109.meta
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IWithMeta$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IWithMeta$_with_meta = function(coll, meta) {
  var this__4110 = this;
  return new cljs.core.PersistentQueueSeq(meta, this__4110.front, this__4110.rear)
};
cljs.core.PersistentQueueSeq;
cljs.core.PersistentQueue = function(meta, count, front, rear) {
  this.meta = meta;
  this.count = count;
  this.front = front;
  this.rear = rear
};
cljs.core.PersistentQueue.cljs$core$IPrintable$_pr_seq = function(this__360__auto__) {
  return cljs.core.list.call(null, "cljs.core.PersistentQueue")
};
cljs.core.PersistentQueue.prototype.cljs$core$IHash$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$IHash$_hash = function(coll) {
  var this__4111 = this;
  return cljs.core.hash_coll.call(null, coll)
};
cljs.core.PersistentQueue.prototype.cljs$core$ISequential$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$ICollection$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$ICollection$_conj = function(coll, o) {
  var this__4112 = this;
  if(cljs.core.truth_(this__4112.front)) {
    return new cljs.core.PersistentQueue(this__4112.meta, this__4112.count + 1, this__4112.front, cljs.core.conj.call(null, function() {
      var or__3548__auto____4113 = this__4112.rear;
      if(cljs.core.truth_(or__3548__auto____4113)) {
        return or__3548__auto____4113
      }else {
        return cljs.core.Vector.fromArray([])
      }
    }(), o))
  }else {
    return new cljs.core.PersistentQueue(this__4112.meta, this__4112.count + 1, cljs.core.conj.call(null, this__4112.front, o), cljs.core.Vector.fromArray([]))
  }
};
cljs.core.PersistentQueue.prototype.cljs$core$ISeqable$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$ISeqable$_seq = function(coll) {
  var this__4114 = this;
  var rear__4115 = cljs.core.seq.call(null, this__4114.rear);
  if(cljs.core.truth_(function() {
    var or__3548__auto____4116 = this__4114.front;
    if(cljs.core.truth_(or__3548__auto____4116)) {
      return or__3548__auto____4116
    }else {
      return rear__4115
    }
  }())) {
    return new cljs.core.PersistentQueueSeq(null, this__4114.front, cljs.core.seq.call(null, rear__4115))
  }else {
    return cljs.core.List.EMPTY
  }
};
cljs.core.PersistentQueue.prototype.cljs$core$ICounted$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$ICounted$_count = function(coll) {
  var this__4117 = this;
  return this__4117.count
};
cljs.core.PersistentQueue.prototype.cljs$core$IStack$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$IStack$_peek = function(coll) {
  var this__4118 = this;
  return cljs.core._first.call(null, this__4118.front)
};
cljs.core.PersistentQueue.prototype.cljs$core$IStack$_pop = function(coll) {
  var this__4119 = this;
  if(cljs.core.truth_(this__4119.front)) {
    var temp__3695__auto____4120 = cljs.core.next.call(null, this__4119.front);
    if(cljs.core.truth_(temp__3695__auto____4120)) {
      var f1__4121 = temp__3695__auto____4120;
      return new cljs.core.PersistentQueue(this__4119.meta, this__4119.count - 1, f1__4121, this__4119.rear)
    }else {
      return new cljs.core.PersistentQueue(this__4119.meta, this__4119.count - 1, cljs.core.seq.call(null, this__4119.rear), cljs.core.Vector.fromArray([]))
    }
  }else {
    return coll
  }
};
cljs.core.PersistentQueue.prototype.cljs$core$ISeq$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$ISeq$_first = function(coll) {
  var this__4122 = this;
  return cljs.core.first.call(null, this__4122.front)
};
cljs.core.PersistentQueue.prototype.cljs$core$ISeq$_rest = function(coll) {
  var this__4123 = this;
  return cljs.core.rest.call(null, cljs.core.seq.call(null, coll))
};
cljs.core.PersistentQueue.prototype.cljs$core$IEquiv$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$IEquiv$_equiv = function(coll, other) {
  var this__4124 = this;
  return cljs.core.equiv_sequential.call(null, coll, other)
};
cljs.core.PersistentQueue.prototype.cljs$core$IWithMeta$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$IWithMeta$_with_meta = function(coll, meta) {
  var this__4125 = this;
  return new cljs.core.PersistentQueue(meta, this__4125.count, this__4125.front, this__4125.rear)
};
cljs.core.PersistentQueue.prototype.cljs$core$IMeta$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$IMeta$_meta = function(coll) {
  var this__4126 = this;
  return this__4126.meta
};
cljs.core.PersistentQueue.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.PersistentQueue.prototype.cljs$core$IEmptyableCollection$_empty = function(coll) {
  var this__4127 = this;
  return cljs.core.PersistentQueue.EMPTY
};
cljs.core.PersistentQueue;
cljs.core.PersistentQueue.EMPTY = new cljs.core.PersistentQueue(null, 0, null, cljs.core.Vector.fromArray([]));
cljs.core.NeverEquiv = function() {
};
cljs.core.NeverEquiv.cljs$core$IPrintable$_pr_seq = function(this__360__auto__) {
  return cljs.core.list.call(null, "cljs.core.NeverEquiv")
};
cljs.core.NeverEquiv.prototype.cljs$core$IEquiv$ = true;
cljs.core.NeverEquiv.prototype.cljs$core$IEquiv$_equiv = function(o, other) {
  var this__4128 = this;
  return false
};
cljs.core.NeverEquiv;
cljs.core.never_equiv = new cljs.core.NeverEquiv;
cljs.core.equiv_map = function equiv_map(x, y) {
  return cljs.core.boolean$.call(null, cljs.core.truth_(cljs.core.map_QMARK_.call(null, y)) ? cljs.core.truth_(cljs.core._EQ_.call(null, cljs.core.count.call(null, x), cljs.core.count.call(null, y))) ? cljs.core.every_QMARK_.call(null, cljs.core.identity, cljs.core.map.call(null, function(xkv) {
    return cljs.core._EQ_.call(null, cljs.core.get.call(null, y, cljs.core.first.call(null, xkv), cljs.core.never_equiv), cljs.core.second.call(null, xkv))
  }, x)) : null : null)
};
cljs.core.scan_array = function scan_array(incr, k, array) {
  var len__4129 = array.length;
  var i__4130 = 0;
  while(true) {
    if(cljs.core.truth_(i__4130 < len__4129)) {
      if(cljs.core.truth_(cljs.core._EQ_.call(null, k, array[i__4130]))) {
        return i__4130
      }else {
        var G__4131 = i__4130 + incr;
        i__4130 = G__4131;
        continue
      }
    }else {
      return null
    }
    break
  }
};
cljs.core.obj_map_contains_key_QMARK_ = function() {
  var obj_map_contains_key_QMARK_ = null;
  var obj_map_contains_key_QMARK___4133 = function(k, strobj) {
    return obj_map_contains_key_QMARK_.call(null, k, strobj, true, false)
  };
  var obj_map_contains_key_QMARK___4134 = function(k, strobj, true_val, false_val) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____4132 = goog.isString.call(null, k);
      if(cljs.core.truth_(and__3546__auto____4132)) {
        return strobj.hasOwnProperty(k)
      }else {
        return and__3546__auto____4132
      }
    }())) {
      return true_val
    }else {
      return false_val
    }
  };
  obj_map_contains_key_QMARK_ = function(k, strobj, true_val, false_val) {
    switch(arguments.length) {
      case 2:
        return obj_map_contains_key_QMARK___4133.call(this, k, strobj);
      case 4:
        return obj_map_contains_key_QMARK___4134.call(this, k, strobj, true_val, false_val)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return obj_map_contains_key_QMARK_
}();
cljs.core.ObjMap = function(meta, keys, strobj) {
  this.meta = meta;
  this.keys = keys;
  this.strobj = strobj
};
cljs.core.ObjMap.cljs$core$IPrintable$_pr_seq = function(this__360__auto__) {
  return cljs.core.list.call(null, "cljs.core.ObjMap")
};
cljs.core.ObjMap.prototype.cljs$core$IHash$ = true;
cljs.core.ObjMap.prototype.cljs$core$IHash$_hash = function(coll) {
  var this__4137 = this;
  return cljs.core.hash_coll.call(null, coll)
};
cljs.core.ObjMap.prototype.cljs$core$ILookup$ = true;
cljs.core.ObjMap.prototype.cljs$core$ILookup$_lookup = function() {
  var G__4158 = null;
  var G__4158__4159 = function(coll, k) {
    var this__4138 = this;
    return cljs.core._lookup.call(null, coll, k, null)
  };
  var G__4158__4160 = function(coll, k, not_found) {
    var this__4139 = this;
    return cljs.core.obj_map_contains_key_QMARK_.call(null, k, this__4139.strobj, this__4139.strobj[k], not_found)
  };
  G__4158 = function(coll, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__4158__4159.call(this, coll, k);
      case 3:
        return G__4158__4160.call(this, coll, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__4158
}();
cljs.core.ObjMap.prototype.cljs$core$IAssociative$ = true;
cljs.core.ObjMap.prototype.cljs$core$IAssociative$_assoc = function(coll, k, v) {
  var this__4140 = this;
  if(cljs.core.truth_(goog.isString.call(null, k))) {
    var new_strobj__4141 = goog.object.clone.call(null, this__4140.strobj);
    var overwrite_QMARK___4142 = new_strobj__4141.hasOwnProperty(k);
    new_strobj__4141[k] = v;
    if(cljs.core.truth_(overwrite_QMARK___4142)) {
      return new cljs.core.ObjMap(this__4140.meta, this__4140.keys, new_strobj__4141)
    }else {
      var new_keys__4143 = cljs.core.aclone.call(null, this__4140.keys);
      new_keys__4143.push(k);
      return new cljs.core.ObjMap(this__4140.meta, new_keys__4143, new_strobj__4141)
    }
  }else {
    return cljs.core.with_meta.call(null, cljs.core.into.call(null, cljs.core.hash_map.call(null, k, v), cljs.core.seq.call(null, coll)), this__4140.meta)
  }
};
cljs.core.ObjMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_ = function(coll, k) {
  var this__4144 = this;
  return cljs.core.obj_map_contains_key_QMARK_.call(null, k, this__4144.strobj)
};
cljs.core.ObjMap.prototype.cljs$core$IFn$ = true;
cljs.core.ObjMap.prototype.call = function() {
  var G__4162 = null;
  var G__4162__4163 = function(coll, k) {
    var this__4145 = this;
    coll = this;
    return cljs.core._lookup.call(null, coll, k)
  };
  var G__4162__4164 = function(coll, k, not_found) {
    var this__4146 = this;
    coll = this;
    return cljs.core._lookup.call(null, coll, k, not_found)
  };
  G__4162 = function(coll, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__4162__4163.call(this, coll, k);
      case 3:
        return G__4162__4164.call(this, coll, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__4162
}();
cljs.core.ObjMap.prototype.cljs$core$ICollection$ = true;
cljs.core.ObjMap.prototype.cljs$core$ICollection$_conj = function(coll, entry) {
  var this__4147 = this;
  if(cljs.core.truth_(cljs.core.vector_QMARK_.call(null, entry))) {
    return cljs.core._assoc.call(null, coll, cljs.core._nth.call(null, entry, 0), cljs.core._nth.call(null, entry, 1))
  }else {
    return cljs.core.reduce.call(null, cljs.core._conj, coll, entry)
  }
};
cljs.core.ObjMap.prototype.cljs$core$ISeqable$ = true;
cljs.core.ObjMap.prototype.cljs$core$ISeqable$_seq = function(coll) {
  var this__4148 = this;
  if(cljs.core.truth_(this__4148.keys.length > 0)) {
    return cljs.core.map.call(null, function(p1__4136_SHARP_) {
      return cljs.core.vector.call(null, p1__4136_SHARP_, this__4148.strobj[p1__4136_SHARP_])
    }, this__4148.keys)
  }else {
    return null
  }
};
cljs.core.ObjMap.prototype.cljs$core$ICounted$ = true;
cljs.core.ObjMap.prototype.cljs$core$ICounted$_count = function(coll) {
  var this__4149 = this;
  return this__4149.keys.length
};
cljs.core.ObjMap.prototype.cljs$core$IEquiv$ = true;
cljs.core.ObjMap.prototype.cljs$core$IEquiv$_equiv = function(coll, other) {
  var this__4150 = this;
  return cljs.core.equiv_map.call(null, coll, other)
};
cljs.core.ObjMap.prototype.cljs$core$IWithMeta$ = true;
cljs.core.ObjMap.prototype.cljs$core$IWithMeta$_with_meta = function(coll, meta) {
  var this__4151 = this;
  return new cljs.core.ObjMap(meta, this__4151.keys, this__4151.strobj)
};
cljs.core.ObjMap.prototype.cljs$core$IMeta$ = true;
cljs.core.ObjMap.prototype.cljs$core$IMeta$_meta = function(coll) {
  var this__4152 = this;
  return this__4152.meta
};
cljs.core.ObjMap.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.ObjMap.prototype.cljs$core$IEmptyableCollection$_empty = function(coll) {
  var this__4153 = this;
  return cljs.core.with_meta.call(null, cljs.core.ObjMap.EMPTY, this__4153.meta)
};
cljs.core.ObjMap.prototype.cljs$core$IMap$ = true;
cljs.core.ObjMap.prototype.cljs$core$IMap$_dissoc = function(coll, k) {
  var this__4154 = this;
  if(cljs.core.truth_(function() {
    var and__3546__auto____4155 = goog.isString.call(null, k);
    if(cljs.core.truth_(and__3546__auto____4155)) {
      return this__4154.strobj.hasOwnProperty(k)
    }else {
      return and__3546__auto____4155
    }
  }())) {
    var new_keys__4156 = cljs.core.aclone.call(null, this__4154.keys);
    var new_strobj__4157 = goog.object.clone.call(null, this__4154.strobj);
    new_keys__4156.splice(cljs.core.scan_array.call(null, 1, k, new_keys__4156), 1);
    cljs.core.js_delete.call(null, new_strobj__4157, k);
    return new cljs.core.ObjMap(this__4154.meta, new_keys__4156, new_strobj__4157)
  }else {
    return coll
  }
};
cljs.core.ObjMap;
cljs.core.ObjMap.EMPTY = new cljs.core.ObjMap(null, cljs.core.array.call(null), cljs.core.js_obj.call(null));
cljs.core.ObjMap.fromObject = function(ks, obj) {
  return new cljs.core.ObjMap(null, ks, obj)
};
cljs.core.HashMap = function(meta, count, hashobj) {
  this.meta = meta;
  this.count = count;
  this.hashobj = hashobj
};
cljs.core.HashMap.cljs$core$IPrintable$_pr_seq = function(this__360__auto__) {
  return cljs.core.list.call(null, "cljs.core.HashMap")
};
cljs.core.HashMap.prototype.cljs$core$IHash$ = true;
cljs.core.HashMap.prototype.cljs$core$IHash$_hash = function(coll) {
  var this__4167 = this;
  return cljs.core.hash_coll.call(null, coll)
};
cljs.core.HashMap.prototype.cljs$core$ILookup$ = true;
cljs.core.HashMap.prototype.cljs$core$ILookup$_lookup = function() {
  var G__4199 = null;
  var G__4199__4200 = function(coll, k) {
    var this__4168 = this;
    return cljs.core._lookup.call(null, coll, k, null)
  };
  var G__4199__4201 = function(coll, k, not_found) {
    var this__4169 = this;
    var bucket__4170 = this__4169.hashobj[cljs.core.hash.call(null, k)];
    var i__4171 = cljs.core.truth_(bucket__4170) ? cljs.core.scan_array.call(null, 2, k, bucket__4170) : null;
    if(cljs.core.truth_(i__4171)) {
      return bucket__4170[i__4171 + 1]
    }else {
      return not_found
    }
  };
  G__4199 = function(coll, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__4199__4200.call(this, coll, k);
      case 3:
        return G__4199__4201.call(this, coll, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__4199
}();
cljs.core.HashMap.prototype.cljs$core$IAssociative$ = true;
cljs.core.HashMap.prototype.cljs$core$IAssociative$_assoc = function(coll, k, v) {
  var this__4172 = this;
  var h__4173 = cljs.core.hash.call(null, k);
  var bucket__4174 = this__4172.hashobj[h__4173];
  if(cljs.core.truth_(bucket__4174)) {
    var new_bucket__4175 = cljs.core.aclone.call(null, bucket__4174);
    var new_hashobj__4176 = goog.object.clone.call(null, this__4172.hashobj);
    new_hashobj__4176[h__4173] = new_bucket__4175;
    var temp__3695__auto____4177 = cljs.core.scan_array.call(null, 2, k, new_bucket__4175);
    if(cljs.core.truth_(temp__3695__auto____4177)) {
      var i__4178 = temp__3695__auto____4177;
      new_bucket__4175[i__4178 + 1] = v;
      return new cljs.core.HashMap(this__4172.meta, this__4172.count, new_hashobj__4176)
    }else {
      new_bucket__4175.push(k, v);
      return new cljs.core.HashMap(this__4172.meta, this__4172.count + 1, new_hashobj__4176)
    }
  }else {
    var new_hashobj__4179 = goog.object.clone.call(null, this__4172.hashobj);
    new_hashobj__4179[h__4173] = cljs.core.array.call(null, k, v);
    return new cljs.core.HashMap(this__4172.meta, this__4172.count + 1, new_hashobj__4179)
  }
};
cljs.core.HashMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_ = function(coll, k) {
  var this__4180 = this;
  var bucket__4181 = this__4180.hashobj[cljs.core.hash.call(null, k)];
  var i__4182 = cljs.core.truth_(bucket__4181) ? cljs.core.scan_array.call(null, 2, k, bucket__4181) : null;
  if(cljs.core.truth_(i__4182)) {
    return true
  }else {
    return false
  }
};
cljs.core.HashMap.prototype.cljs$core$IFn$ = true;
cljs.core.HashMap.prototype.call = function() {
  var G__4203 = null;
  var G__4203__4204 = function(coll, k) {
    var this__4183 = this;
    coll = this;
    return cljs.core._lookup.call(null, coll, k)
  };
  var G__4203__4205 = function(coll, k, not_found) {
    var this__4184 = this;
    coll = this;
    return cljs.core._lookup.call(null, coll, k, not_found)
  };
  G__4203 = function(coll, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__4203__4204.call(this, coll, k);
      case 3:
        return G__4203__4205.call(this, coll, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__4203
}();
cljs.core.HashMap.prototype.cljs$core$ICollection$ = true;
cljs.core.HashMap.prototype.cljs$core$ICollection$_conj = function(coll, entry) {
  var this__4185 = this;
  if(cljs.core.truth_(cljs.core.vector_QMARK_.call(null, entry))) {
    return cljs.core._assoc.call(null, coll, cljs.core._nth.call(null, entry, 0), cljs.core._nth.call(null, entry, 1))
  }else {
    return cljs.core.reduce.call(null, cljs.core._conj, coll, entry)
  }
};
cljs.core.HashMap.prototype.cljs$core$ISeqable$ = true;
cljs.core.HashMap.prototype.cljs$core$ISeqable$_seq = function(coll) {
  var this__4186 = this;
  if(cljs.core.truth_(this__4186.count > 0)) {
    var hashes__4187 = cljs.core.js_keys.call(null, this__4186.hashobj).sort();
    return cljs.core.mapcat.call(null, function(p1__4166_SHARP_) {
      return cljs.core.map.call(null, cljs.core.vec, cljs.core.partition.call(null, 2, this__4186.hashobj[p1__4166_SHARP_]))
    }, hashes__4187)
  }else {
    return null
  }
};
cljs.core.HashMap.prototype.cljs$core$ICounted$ = true;
cljs.core.HashMap.prototype.cljs$core$ICounted$_count = function(coll) {
  var this__4188 = this;
  return this__4188.count
};
cljs.core.HashMap.prototype.cljs$core$IEquiv$ = true;
cljs.core.HashMap.prototype.cljs$core$IEquiv$_equiv = function(coll, other) {
  var this__4189 = this;
  return cljs.core.equiv_map.call(null, coll, other)
};
cljs.core.HashMap.prototype.cljs$core$IWithMeta$ = true;
cljs.core.HashMap.prototype.cljs$core$IWithMeta$_with_meta = function(coll, meta) {
  var this__4190 = this;
  return new cljs.core.HashMap(meta, this__4190.count, this__4190.hashobj)
};
cljs.core.HashMap.prototype.cljs$core$IMeta$ = true;
cljs.core.HashMap.prototype.cljs$core$IMeta$_meta = function(coll) {
  var this__4191 = this;
  return this__4191.meta
};
cljs.core.HashMap.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.HashMap.prototype.cljs$core$IEmptyableCollection$_empty = function(coll) {
  var this__4192 = this;
  return cljs.core.with_meta.call(null, cljs.core.HashMap.EMPTY, this__4192.meta)
};
cljs.core.HashMap.prototype.cljs$core$IMap$ = true;
cljs.core.HashMap.prototype.cljs$core$IMap$_dissoc = function(coll, k) {
  var this__4193 = this;
  var h__4194 = cljs.core.hash.call(null, k);
  var bucket__4195 = this__4193.hashobj[h__4194];
  var i__4196 = cljs.core.truth_(bucket__4195) ? cljs.core.scan_array.call(null, 2, k, bucket__4195) : null;
  if(cljs.core.truth_(cljs.core.not.call(null, i__4196))) {
    return coll
  }else {
    var new_hashobj__4197 = goog.object.clone.call(null, this__4193.hashobj);
    if(cljs.core.truth_(3 > bucket__4195.length)) {
      cljs.core.js_delete.call(null, new_hashobj__4197, h__4194)
    }else {
      var new_bucket__4198 = cljs.core.aclone.call(null, bucket__4195);
      new_bucket__4198.splice(i__4196, 2);
      new_hashobj__4197[h__4194] = new_bucket__4198
    }
    return new cljs.core.HashMap(this__4193.meta, this__4193.count - 1, new_hashobj__4197)
  }
};
cljs.core.HashMap;
cljs.core.HashMap.EMPTY = new cljs.core.HashMap(null, 0, cljs.core.js_obj.call(null));
cljs.core.HashMap.fromArrays = function(ks, vs) {
  var len__4207 = ks.length;
  var i__4208 = 0;
  var out__4209 = cljs.core.HashMap.EMPTY;
  while(true) {
    if(cljs.core.truth_(i__4208 < len__4207)) {
      var G__4210 = i__4208 + 1;
      var G__4211 = cljs.core.assoc.call(null, out__4209, ks[i__4208], vs[i__4208]);
      i__4208 = G__4210;
      out__4209 = G__4211;
      continue
    }else {
      return out__4209
    }
    break
  }
};
cljs.core.hash_map = function() {
  var hash_map__delegate = function(keyvals) {
    var in$__4212 = cljs.core.seq.call(null, keyvals);
    var out__4213 = cljs.core.HashMap.EMPTY;
    while(true) {
      if(cljs.core.truth_(in$__4212)) {
        var G__4214 = cljs.core.nnext.call(null, in$__4212);
        var G__4215 = cljs.core.assoc.call(null, out__4213, cljs.core.first.call(null, in$__4212), cljs.core.second.call(null, in$__4212));
        in$__4212 = G__4214;
        out__4213 = G__4215;
        continue
      }else {
        return out__4213
      }
      break
    }
  };
  var hash_map = function(var_args) {
    var keyvals = null;
    if(goog.isDef(var_args)) {
      keyvals = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return hash_map__delegate.call(this, keyvals)
  };
  hash_map.cljs$lang$maxFixedArity = 0;
  hash_map.cljs$lang$applyTo = function(arglist__4216) {
    var keyvals = cljs.core.seq(arglist__4216);
    return hash_map__delegate.call(this, keyvals)
  };
  return hash_map
}();
cljs.core.keys = function keys(hash_map) {
  return cljs.core.seq.call(null, cljs.core.map.call(null, cljs.core.first, hash_map))
};
cljs.core.vals = function vals(hash_map) {
  return cljs.core.seq.call(null, cljs.core.map.call(null, cljs.core.second, hash_map))
};
cljs.core.merge = function() {
  var merge__delegate = function(maps) {
    if(cljs.core.truth_(cljs.core.some.call(null, cljs.core.identity, maps))) {
      return cljs.core.reduce.call(null, function(p1__4217_SHARP_, p2__4218_SHARP_) {
        return cljs.core.conj.call(null, function() {
          var or__3548__auto____4219 = p1__4217_SHARP_;
          if(cljs.core.truth_(or__3548__auto____4219)) {
            return or__3548__auto____4219
          }else {
            return cljs.core.ObjMap.fromObject([], {})
          }
        }(), p2__4218_SHARP_)
      }, maps)
    }else {
      return null
    }
  };
  var merge = function(var_args) {
    var maps = null;
    if(goog.isDef(var_args)) {
      maps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return merge__delegate.call(this, maps)
  };
  merge.cljs$lang$maxFixedArity = 0;
  merge.cljs$lang$applyTo = function(arglist__4220) {
    var maps = cljs.core.seq(arglist__4220);
    return merge__delegate.call(this, maps)
  };
  return merge
}();
cljs.core.merge_with = function() {
  var merge_with__delegate = function(f, maps) {
    if(cljs.core.truth_(cljs.core.some.call(null, cljs.core.identity, maps))) {
      var merge_entry__4223 = function(m, e) {
        var k__4221 = cljs.core.first.call(null, e);
        var v__4222 = cljs.core.second.call(null, e);
        if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null, m, k__4221))) {
          return cljs.core.assoc.call(null, m, k__4221, f.call(null, cljs.core.get.call(null, m, k__4221), v__4222))
        }else {
          return cljs.core.assoc.call(null, m, k__4221, v__4222)
        }
      };
      var merge2__4225 = function(m1, m2) {
        return cljs.core.reduce.call(null, merge_entry__4223, function() {
          var or__3548__auto____4224 = m1;
          if(cljs.core.truth_(or__3548__auto____4224)) {
            return or__3548__auto____4224
          }else {
            return cljs.core.ObjMap.fromObject([], {})
          }
        }(), cljs.core.seq.call(null, m2))
      };
      return cljs.core.reduce.call(null, merge2__4225, maps)
    }else {
      return null
    }
  };
  var merge_with = function(f, var_args) {
    var maps = null;
    if(goog.isDef(var_args)) {
      maps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
    }
    return merge_with__delegate.call(this, f, maps)
  };
  merge_with.cljs$lang$maxFixedArity = 1;
  merge_with.cljs$lang$applyTo = function(arglist__4226) {
    var f = cljs.core.first(arglist__4226);
    var maps = cljs.core.rest(arglist__4226);
    return merge_with__delegate.call(this, f, maps)
  };
  return merge_with
}();
cljs.core.select_keys = function select_keys(map, keyseq) {
  var ret__4228 = cljs.core.ObjMap.fromObject([], {});
  var keys__4229 = cljs.core.seq.call(null, keyseq);
  while(true) {
    if(cljs.core.truth_(keys__4229)) {
      var key__4230 = cljs.core.first.call(null, keys__4229);
      var entry__4231 = cljs.core.get.call(null, map, key__4230, "\ufdd0'user/not-found");
      var G__4232 = cljs.core.truth_(cljs.core.not_EQ_.call(null, entry__4231, "\ufdd0'user/not-found")) ? cljs.core.assoc.call(null, ret__4228, key__4230, entry__4231) : ret__4228;
      var G__4233 = cljs.core.next.call(null, keys__4229);
      ret__4228 = G__4232;
      keys__4229 = G__4233;
      continue
    }else {
      return ret__4228
    }
    break
  }
};
cljs.core.Set = function(meta, hash_map) {
  this.meta = meta;
  this.hash_map = hash_map
};
cljs.core.Set.cljs$core$IPrintable$_pr_seq = function(this__360__auto__) {
  return cljs.core.list.call(null, "cljs.core.Set")
};
cljs.core.Set.prototype.cljs$core$IHash$ = true;
cljs.core.Set.prototype.cljs$core$IHash$_hash = function(coll) {
  var this__4234 = this;
  return cljs.core.hash_coll.call(null, coll)
};
cljs.core.Set.prototype.cljs$core$ILookup$ = true;
cljs.core.Set.prototype.cljs$core$ILookup$_lookup = function() {
  var G__4249 = null;
  var G__4249__4250 = function(coll, v) {
    var this__4235 = this;
    return cljs.core._lookup.call(null, coll, v, null)
  };
  var G__4249__4251 = function(coll, v, not_found) {
    var this__4236 = this;
    if(cljs.core.truth_(cljs.core._contains_key_QMARK_.call(null, this__4236.hash_map, v))) {
      return v
    }else {
      return not_found
    }
  };
  G__4249 = function(coll, v, not_found) {
    switch(arguments.length) {
      case 2:
        return G__4249__4250.call(this, coll, v);
      case 3:
        return G__4249__4251.call(this, coll, v, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__4249
}();
cljs.core.Set.prototype.cljs$core$IFn$ = true;
cljs.core.Set.prototype.call = function() {
  var G__4253 = null;
  var G__4253__4254 = function(coll, k) {
    var this__4237 = this;
    coll = this;
    return cljs.core._lookup.call(null, coll, k)
  };
  var G__4253__4255 = function(coll, k, not_found) {
    var this__4238 = this;
    coll = this;
    return cljs.core._lookup.call(null, coll, k, not_found)
  };
  G__4253 = function(coll, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__4253__4254.call(this, coll, k);
      case 3:
        return G__4253__4255.call(this, coll, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__4253
}();
cljs.core.Set.prototype.cljs$core$ICollection$ = true;
cljs.core.Set.prototype.cljs$core$ICollection$_conj = function(coll, o) {
  var this__4239 = this;
  return new cljs.core.Set(this__4239.meta, cljs.core.assoc.call(null, this__4239.hash_map, o, null))
};
cljs.core.Set.prototype.cljs$core$ISeqable$ = true;
cljs.core.Set.prototype.cljs$core$ISeqable$_seq = function(coll) {
  var this__4240 = this;
  return cljs.core.keys.call(null, this__4240.hash_map)
};
cljs.core.Set.prototype.cljs$core$ISet$ = true;
cljs.core.Set.prototype.cljs$core$ISet$_disjoin = function(coll, v) {
  var this__4241 = this;
  return new cljs.core.Set(this__4241.meta, cljs.core.dissoc.call(null, this__4241.hash_map, v))
};
cljs.core.Set.prototype.cljs$core$ICounted$ = true;
cljs.core.Set.prototype.cljs$core$ICounted$_count = function(coll) {
  var this__4242 = this;
  return cljs.core.count.call(null, cljs.core.seq.call(null, coll))
};
cljs.core.Set.prototype.cljs$core$IEquiv$ = true;
cljs.core.Set.prototype.cljs$core$IEquiv$_equiv = function(coll, other) {
  var this__4243 = this;
  var and__3546__auto____4244 = cljs.core.set_QMARK_.call(null, other);
  if(cljs.core.truth_(and__3546__auto____4244)) {
    var and__3546__auto____4245 = cljs.core._EQ_.call(null, cljs.core.count.call(null, coll), cljs.core.count.call(null, other));
    if(cljs.core.truth_(and__3546__auto____4245)) {
      return cljs.core.every_QMARK_.call(null, function(p1__4227_SHARP_) {
        return cljs.core.contains_QMARK_.call(null, coll, p1__4227_SHARP_)
      }, other)
    }else {
      return and__3546__auto____4245
    }
  }else {
    return and__3546__auto____4244
  }
};
cljs.core.Set.prototype.cljs$core$IWithMeta$ = true;
cljs.core.Set.prototype.cljs$core$IWithMeta$_with_meta = function(coll, meta) {
  var this__4246 = this;
  return new cljs.core.Set(meta, this__4246.hash_map)
};
cljs.core.Set.prototype.cljs$core$IMeta$ = true;
cljs.core.Set.prototype.cljs$core$IMeta$_meta = function(coll) {
  var this__4247 = this;
  return this__4247.meta
};
cljs.core.Set.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.Set.prototype.cljs$core$IEmptyableCollection$_empty = function(coll) {
  var this__4248 = this;
  return cljs.core.with_meta.call(null, cljs.core.Set.EMPTY, this__4248.meta)
};
cljs.core.Set;
cljs.core.Set.EMPTY = new cljs.core.Set(null, cljs.core.hash_map.call(null));
cljs.core.set = function set(coll) {
  var in$__4258 = cljs.core.seq.call(null, coll);
  var out__4259 = cljs.core.Set.EMPTY;
  while(true) {
    if(cljs.core.truth_(cljs.core.not.call(null, cljs.core.empty_QMARK_.call(null, in$__4258)))) {
      var G__4260 = cljs.core.rest.call(null, in$__4258);
      var G__4261 = cljs.core.conj.call(null, out__4259, cljs.core.first.call(null, in$__4258));
      in$__4258 = G__4260;
      out__4259 = G__4261;
      continue
    }else {
      return out__4259
    }
    break
  }
};
cljs.core.replace = function replace(smap, coll) {
  if(cljs.core.truth_(cljs.core.vector_QMARK_.call(null, coll))) {
    var n__4262 = cljs.core.count.call(null, coll);
    return cljs.core.reduce.call(null, function(v, i) {
      var temp__3695__auto____4263 = cljs.core.find.call(null, smap, cljs.core.nth.call(null, v, i));
      if(cljs.core.truth_(temp__3695__auto____4263)) {
        var e__4264 = temp__3695__auto____4263;
        return cljs.core.assoc.call(null, v, i, cljs.core.second.call(null, e__4264))
      }else {
        return v
      }
    }, coll, cljs.core.take.call(null, n__4262, cljs.core.iterate.call(null, cljs.core.inc, 0)))
  }else {
    return cljs.core.map.call(null, function(p1__4257_SHARP_) {
      var temp__3695__auto____4265 = cljs.core.find.call(null, smap, p1__4257_SHARP_);
      if(cljs.core.truth_(temp__3695__auto____4265)) {
        var e__4266 = temp__3695__auto____4265;
        return cljs.core.second.call(null, e__4266)
      }else {
        return p1__4257_SHARP_
      }
    }, coll)
  }
};
cljs.core.distinct = function distinct(coll) {
  var step__4274 = function step(xs, seen) {
    return new cljs.core.LazySeq(null, false, function() {
      return function(p__4267, seen) {
        while(true) {
          var vec__4268__4269 = p__4267;
          var f__4270 = cljs.core.nth.call(null, vec__4268__4269, 0, null);
          var xs__4271 = vec__4268__4269;
          var temp__3698__auto____4272 = cljs.core.seq.call(null, xs__4271);
          if(cljs.core.truth_(temp__3698__auto____4272)) {
            var s__4273 = temp__3698__auto____4272;
            if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null, seen, f__4270))) {
              var G__4275 = cljs.core.rest.call(null, s__4273);
              var G__4276 = seen;
              p__4267 = G__4275;
              seen = G__4276;
              continue
            }else {
              return cljs.core.cons.call(null, f__4270, step.call(null, cljs.core.rest.call(null, s__4273), cljs.core.conj.call(null, seen, f__4270)))
            }
          }else {
            return null
          }
          break
        }
      }.call(null, xs, seen)
    })
  };
  return step__4274.call(null, coll, cljs.core.set([]))
};
cljs.core.butlast = function butlast(s) {
  var ret__4277 = cljs.core.Vector.fromArray([]);
  var s__4278 = s;
  while(true) {
    if(cljs.core.truth_(cljs.core.next.call(null, s__4278))) {
      var G__4279 = cljs.core.conj.call(null, ret__4277, cljs.core.first.call(null, s__4278));
      var G__4280 = cljs.core.next.call(null, s__4278);
      ret__4277 = G__4279;
      s__4278 = G__4280;
      continue
    }else {
      return cljs.core.seq.call(null, ret__4277)
    }
    break
  }
};
cljs.core.name = function name(x) {
  if(cljs.core.truth_(cljs.core.string_QMARK_.call(null, x))) {
    return x
  }else {
    if(cljs.core.truth_(function() {
      var or__3548__auto____4281 = cljs.core.keyword_QMARK_.call(null, x);
      if(cljs.core.truth_(or__3548__auto____4281)) {
        return or__3548__auto____4281
      }else {
        return cljs.core.symbol_QMARK_.call(null, x)
      }
    }())) {
      var i__4282 = x.lastIndexOf("/");
      if(cljs.core.truth_(i__4282 < 0)) {
        return cljs.core.subs.call(null, x, 2)
      }else {
        return cljs.core.subs.call(null, x, i__4282 + 1)
      }
    }else {
      if(cljs.core.truth_("\ufdd0'else")) {
        throw new Error(cljs.core.str.call(null, "Doesn't support name: ", x));
      }else {
        return null
      }
    }
  }
};
cljs.core.namespace = function namespace(x) {
  if(cljs.core.truth_(function() {
    var or__3548__auto____4283 = cljs.core.keyword_QMARK_.call(null, x);
    if(cljs.core.truth_(or__3548__auto____4283)) {
      return or__3548__auto____4283
    }else {
      return cljs.core.symbol_QMARK_.call(null, x)
    }
  }())) {
    var i__4284 = x.lastIndexOf("/");
    if(cljs.core.truth_(i__4284 > -1)) {
      return cljs.core.subs.call(null, x, 2, i__4284)
    }else {
      return null
    }
  }else {
    throw new Error(cljs.core.str.call(null, "Doesn't support namespace: ", x));
  }
};
cljs.core.zipmap = function zipmap(keys, vals) {
  var map__4287 = cljs.core.ObjMap.fromObject([], {});
  var ks__4288 = cljs.core.seq.call(null, keys);
  var vs__4289 = cljs.core.seq.call(null, vals);
  while(true) {
    if(cljs.core.truth_(function() {
      var and__3546__auto____4290 = ks__4288;
      if(cljs.core.truth_(and__3546__auto____4290)) {
        return vs__4289
      }else {
        return and__3546__auto____4290
      }
    }())) {
      var G__4291 = cljs.core.assoc.call(null, map__4287, cljs.core.first.call(null, ks__4288), cljs.core.first.call(null, vs__4289));
      var G__4292 = cljs.core.next.call(null, ks__4288);
      var G__4293 = cljs.core.next.call(null, vs__4289);
      map__4287 = G__4291;
      ks__4288 = G__4292;
      vs__4289 = G__4293;
      continue
    }else {
      return map__4287
    }
    break
  }
};
cljs.core.max_key = function() {
  var max_key = null;
  var max_key__4296 = function(k, x) {
    return x
  };
  var max_key__4297 = function(k, x, y) {
    if(cljs.core.truth_(k.call(null, x) > k.call(null, y))) {
      return x
    }else {
      return y
    }
  };
  var max_key__4298 = function() {
    var G__4300__delegate = function(k, x, y, more) {
      return cljs.core.reduce.call(null, function(p1__4285_SHARP_, p2__4286_SHARP_) {
        return max_key.call(null, k, p1__4285_SHARP_, p2__4286_SHARP_)
      }, max_key.call(null, k, x, y), more)
    };
    var G__4300 = function(k, x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__4300__delegate.call(this, k, x, y, more)
    };
    G__4300.cljs$lang$maxFixedArity = 3;
    G__4300.cljs$lang$applyTo = function(arglist__4301) {
      var k = cljs.core.first(arglist__4301);
      var x = cljs.core.first(cljs.core.next(arglist__4301));
      var y = cljs.core.first(cljs.core.next(cljs.core.next(arglist__4301)));
      var more = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__4301)));
      return G__4300__delegate.call(this, k, x, y, more)
    };
    return G__4300
  }();
  max_key = function(k, x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 2:
        return max_key__4296.call(this, k, x);
      case 3:
        return max_key__4297.call(this, k, x, y);
      default:
        return max_key__4298.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  max_key.cljs$lang$maxFixedArity = 3;
  max_key.cljs$lang$applyTo = max_key__4298.cljs$lang$applyTo;
  return max_key
}();
cljs.core.min_key = function() {
  var min_key = null;
  var min_key__4302 = function(k, x) {
    return x
  };
  var min_key__4303 = function(k, x, y) {
    if(cljs.core.truth_(k.call(null, x) < k.call(null, y))) {
      return x
    }else {
      return y
    }
  };
  var min_key__4304 = function() {
    var G__4306__delegate = function(k, x, y, more) {
      return cljs.core.reduce.call(null, function(p1__4294_SHARP_, p2__4295_SHARP_) {
        return min_key.call(null, k, p1__4294_SHARP_, p2__4295_SHARP_)
      }, min_key.call(null, k, x, y), more)
    };
    var G__4306 = function(k, x, y, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__4306__delegate.call(this, k, x, y, more)
    };
    G__4306.cljs$lang$maxFixedArity = 3;
    G__4306.cljs$lang$applyTo = function(arglist__4307) {
      var k = cljs.core.first(arglist__4307);
      var x = cljs.core.first(cljs.core.next(arglist__4307));
      var y = cljs.core.first(cljs.core.next(cljs.core.next(arglist__4307)));
      var more = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__4307)));
      return G__4306__delegate.call(this, k, x, y, more)
    };
    return G__4306
  }();
  min_key = function(k, x, y, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 2:
        return min_key__4302.call(this, k, x);
      case 3:
        return min_key__4303.call(this, k, x, y);
      default:
        return min_key__4304.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  min_key.cljs$lang$maxFixedArity = 3;
  min_key.cljs$lang$applyTo = min_key__4304.cljs$lang$applyTo;
  return min_key
}();
cljs.core.partition_all = function() {
  var partition_all = null;
  var partition_all__4310 = function(n, coll) {
    return partition_all.call(null, n, n, coll)
  };
  var partition_all__4311 = function(n, step, coll) {
    return new cljs.core.LazySeq(null, false, function() {
      var temp__3698__auto____4308 = cljs.core.seq.call(null, coll);
      if(cljs.core.truth_(temp__3698__auto____4308)) {
        var s__4309 = temp__3698__auto____4308;
        return cljs.core.cons.call(null, cljs.core.take.call(null, n, s__4309), partition_all.call(null, n, step, cljs.core.drop.call(null, step, s__4309)))
      }else {
        return null
      }
    })
  };
  partition_all = function(n, step, coll) {
    switch(arguments.length) {
      case 2:
        return partition_all__4310.call(this, n, step);
      case 3:
        return partition_all__4311.call(this, n, step, coll)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return partition_all
}();
cljs.core.take_while = function take_while(pred, coll) {
  return new cljs.core.LazySeq(null, false, function() {
    var temp__3698__auto____4313 = cljs.core.seq.call(null, coll);
    if(cljs.core.truth_(temp__3698__auto____4313)) {
      var s__4314 = temp__3698__auto____4313;
      if(cljs.core.truth_(pred.call(null, cljs.core.first.call(null, s__4314)))) {
        return cljs.core.cons.call(null, cljs.core.first.call(null, s__4314), take_while.call(null, pred, cljs.core.rest.call(null, s__4314)))
      }else {
        return null
      }
    }else {
      return null
    }
  })
};
cljs.core.Range = function(meta, start, end, step) {
  this.meta = meta;
  this.start = start;
  this.end = end;
  this.step = step
};
cljs.core.Range.cljs$core$IPrintable$_pr_seq = function(this__360__auto__) {
  return cljs.core.list.call(null, "cljs.core.Range")
};
cljs.core.Range.prototype.cljs$core$IHash$ = true;
cljs.core.Range.prototype.cljs$core$IHash$_hash = function(rng) {
  var this__4315 = this;
  return cljs.core.hash_coll.call(null, rng)
};
cljs.core.Range.prototype.cljs$core$ISequential$ = true;
cljs.core.Range.prototype.cljs$core$ICollection$ = true;
cljs.core.Range.prototype.cljs$core$ICollection$_conj = function(rng, o) {
  var this__4316 = this;
  return cljs.core.cons.call(null, o, rng)
};
cljs.core.Range.prototype.cljs$core$IReduce$ = true;
cljs.core.Range.prototype.cljs$core$IReduce$_reduce = function() {
  var G__4332 = null;
  var G__4332__4333 = function(rng, f) {
    var this__4317 = this;
    return cljs.core.ci_reduce.call(null, rng, f)
  };
  var G__4332__4334 = function(rng, f, s) {
    var this__4318 = this;
    return cljs.core.ci_reduce.call(null, rng, f, s)
  };
  G__4332 = function(rng, f, s) {
    switch(arguments.length) {
      case 2:
        return G__4332__4333.call(this, rng, f);
      case 3:
        return G__4332__4334.call(this, rng, f, s)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__4332
}();
cljs.core.Range.prototype.cljs$core$ISeqable$ = true;
cljs.core.Range.prototype.cljs$core$ISeqable$_seq = function(rng) {
  var this__4319 = this;
  var comp__4320 = cljs.core.truth_(this__4319.step > 0) ? cljs.core._LT_ : cljs.core._GT_;
  if(cljs.core.truth_(comp__4320.call(null, this__4319.start, this__4319.end))) {
    return rng
  }else {
    return null
  }
};
cljs.core.Range.prototype.cljs$core$ICounted$ = true;
cljs.core.Range.prototype.cljs$core$ICounted$_count = function(rng) {
  var this__4321 = this;
  if(cljs.core.truth_(cljs.core.not.call(null, cljs.core._seq.call(null, rng)))) {
    return 0
  }else {
    return Math["ceil"].call(null, (this__4321.end - this__4321.start) / this__4321.step)
  }
};
cljs.core.Range.prototype.cljs$core$ISeq$ = true;
cljs.core.Range.prototype.cljs$core$ISeq$_first = function(rng) {
  var this__4322 = this;
  return this__4322.start
};
cljs.core.Range.prototype.cljs$core$ISeq$_rest = function(rng) {
  var this__4323 = this;
  if(cljs.core.truth_(cljs.core._seq.call(null, rng))) {
    return new cljs.core.Range(this__4323.meta, this__4323.start + this__4323.step, this__4323.end, this__4323.step)
  }else {
    return cljs.core.list.call(null)
  }
};
cljs.core.Range.prototype.cljs$core$IEquiv$ = true;
cljs.core.Range.prototype.cljs$core$IEquiv$_equiv = function(rng, other) {
  var this__4324 = this;
  return cljs.core.equiv_sequential.call(null, rng, other)
};
cljs.core.Range.prototype.cljs$core$IWithMeta$ = true;
cljs.core.Range.prototype.cljs$core$IWithMeta$_with_meta = function(rng, meta) {
  var this__4325 = this;
  return new cljs.core.Range(meta, this__4325.start, this__4325.end, this__4325.step)
};
cljs.core.Range.prototype.cljs$core$IMeta$ = true;
cljs.core.Range.prototype.cljs$core$IMeta$_meta = function(rng) {
  var this__4326 = this;
  return this__4326.meta
};
cljs.core.Range.prototype.cljs$core$IIndexed$ = true;
cljs.core.Range.prototype.cljs$core$IIndexed$_nth = function() {
  var G__4336 = null;
  var G__4336__4337 = function(rng, n) {
    var this__4327 = this;
    if(cljs.core.truth_(n < cljs.core._count.call(null, rng))) {
      return this__4327.start + n * this__4327.step
    }else {
      if(cljs.core.truth_(function() {
        var and__3546__auto____4328 = this__4327.start > this__4327.end;
        if(cljs.core.truth_(and__3546__auto____4328)) {
          return cljs.core._EQ_.call(null, this__4327.step, 0)
        }else {
          return and__3546__auto____4328
        }
      }())) {
        return this__4327.start
      }else {
        throw new Error("Index out of bounds");
      }
    }
  };
  var G__4336__4338 = function(rng, n, not_found) {
    var this__4329 = this;
    if(cljs.core.truth_(n < cljs.core._count.call(null, rng))) {
      return this__4329.start + n * this__4329.step
    }else {
      if(cljs.core.truth_(function() {
        var and__3546__auto____4330 = this__4329.start > this__4329.end;
        if(cljs.core.truth_(and__3546__auto____4330)) {
          return cljs.core._EQ_.call(null, this__4329.step, 0)
        }else {
          return and__3546__auto____4330
        }
      }())) {
        return this__4329.start
      }else {
        return not_found
      }
    }
  };
  G__4336 = function(rng, n, not_found) {
    switch(arguments.length) {
      case 2:
        return G__4336__4337.call(this, rng, n);
      case 3:
        return G__4336__4338.call(this, rng, n, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__4336
}();
cljs.core.Range.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.Range.prototype.cljs$core$IEmptyableCollection$_empty = function(rng) {
  var this__4331 = this;
  return cljs.core.with_meta.call(null, cljs.core.List.EMPTY, this__4331.meta)
};
cljs.core.Range;
cljs.core.range = function() {
  var range = null;
  var range__4340 = function() {
    return range.call(null, 0, Number["MAX_VALUE"], 1)
  };
  var range__4341 = function(end) {
    return range.call(null, 0, end, 1)
  };
  var range__4342 = function(start, end) {
    return range.call(null, start, end, 1)
  };
  var range__4343 = function(start, end, step) {
    return new cljs.core.Range(null, start, end, step)
  };
  range = function(start, end, step) {
    switch(arguments.length) {
      case 0:
        return range__4340.call(this);
      case 1:
        return range__4341.call(this, start);
      case 2:
        return range__4342.call(this, start, end);
      case 3:
        return range__4343.call(this, start, end, step)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return range
}();
cljs.core.take_nth = function take_nth(n, coll) {
  return new cljs.core.LazySeq(null, false, function() {
    var temp__3698__auto____4345 = cljs.core.seq.call(null, coll);
    if(cljs.core.truth_(temp__3698__auto____4345)) {
      var s__4346 = temp__3698__auto____4345;
      return cljs.core.cons.call(null, cljs.core.first.call(null, s__4346), take_nth.call(null, n, cljs.core.drop.call(null, n, s__4346)))
    }else {
      return null
    }
  })
};
cljs.core.split_with = function split_with(pred, coll) {
  return cljs.core.Vector.fromArray([cljs.core.take_while.call(null, pred, coll), cljs.core.drop_while.call(null, pred, coll)])
};
cljs.core.partition_by = function partition_by(f, coll) {
  return new cljs.core.LazySeq(null, false, function() {
    var temp__3698__auto____4348 = cljs.core.seq.call(null, coll);
    if(cljs.core.truth_(temp__3698__auto____4348)) {
      var s__4349 = temp__3698__auto____4348;
      var fst__4350 = cljs.core.first.call(null, s__4349);
      var fv__4351 = f.call(null, fst__4350);
      var run__4352 = cljs.core.cons.call(null, fst__4350, cljs.core.take_while.call(null, function(p1__4347_SHARP_) {
        return cljs.core._EQ_.call(null, fv__4351, f.call(null, p1__4347_SHARP_))
      }, cljs.core.next.call(null, s__4349)));
      return cljs.core.cons.call(null, run__4352, partition_by.call(null, f, cljs.core.seq.call(null, cljs.core.drop.call(null, cljs.core.count.call(null, run__4352), s__4349))))
    }else {
      return null
    }
  })
};
cljs.core.frequencies = function frequencies(coll) {
  return cljs.core.reduce.call(null, function(counts, x) {
    return cljs.core.assoc.call(null, counts, x, cljs.core.get.call(null, counts, x, 0) + 1)
  }, cljs.core.ObjMap.fromObject([], {}), coll)
};
cljs.core.reductions = function() {
  var reductions = null;
  var reductions__4367 = function(f, coll) {
    return new cljs.core.LazySeq(null, false, function() {
      var temp__3695__auto____4363 = cljs.core.seq.call(null, coll);
      if(cljs.core.truth_(temp__3695__auto____4363)) {
        var s__4364 = temp__3695__auto____4363;
        return reductions.call(null, f, cljs.core.first.call(null, s__4364), cljs.core.rest.call(null, s__4364))
      }else {
        return cljs.core.list.call(null, f.call(null))
      }
    })
  };
  var reductions__4368 = function(f, init, coll) {
    return cljs.core.cons.call(null, init, new cljs.core.LazySeq(null, false, function() {
      var temp__3698__auto____4365 = cljs.core.seq.call(null, coll);
      if(cljs.core.truth_(temp__3698__auto____4365)) {
        var s__4366 = temp__3698__auto____4365;
        return reductions.call(null, f, f.call(null, init, cljs.core.first.call(null, s__4366)), cljs.core.rest.call(null, s__4366))
      }else {
        return null
      }
    }))
  };
  reductions = function(f, init, coll) {
    switch(arguments.length) {
      case 2:
        return reductions__4367.call(this, f, init);
      case 3:
        return reductions__4368.call(this, f, init, coll)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return reductions
}();
cljs.core.juxt = function() {
  var juxt = null;
  var juxt__4371 = function(f) {
    return function() {
      var G__4376 = null;
      var G__4376__4377 = function() {
        return cljs.core.vector.call(null, f.call(null))
      };
      var G__4376__4378 = function(x) {
        return cljs.core.vector.call(null, f.call(null, x))
      };
      var G__4376__4379 = function(x, y) {
        return cljs.core.vector.call(null, f.call(null, x, y))
      };
      var G__4376__4380 = function(x, y, z) {
        return cljs.core.vector.call(null, f.call(null, x, y, z))
      };
      var G__4376__4381 = function() {
        var G__4383__delegate = function(x, y, z, args) {
          return cljs.core.vector.call(null, cljs.core.apply.call(null, f, x, y, z, args))
        };
        var G__4383 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__4383__delegate.call(this, x, y, z, args)
        };
        G__4383.cljs$lang$maxFixedArity = 3;
        G__4383.cljs$lang$applyTo = function(arglist__4384) {
          var x = cljs.core.first(arglist__4384);
          var y = cljs.core.first(cljs.core.next(arglist__4384));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__4384)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__4384)));
          return G__4383__delegate.call(this, x, y, z, args)
        };
        return G__4383
      }();
      G__4376 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return G__4376__4377.call(this);
          case 1:
            return G__4376__4378.call(this, x);
          case 2:
            return G__4376__4379.call(this, x, y);
          case 3:
            return G__4376__4380.call(this, x, y, z);
          default:
            return G__4376__4381.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__4376.cljs$lang$maxFixedArity = 3;
      G__4376.cljs$lang$applyTo = G__4376__4381.cljs$lang$applyTo;
      return G__4376
    }()
  };
  var juxt__4372 = function(f, g) {
    return function() {
      var G__4385 = null;
      var G__4385__4386 = function() {
        return cljs.core.vector.call(null, f.call(null), g.call(null))
      };
      var G__4385__4387 = function(x) {
        return cljs.core.vector.call(null, f.call(null, x), g.call(null, x))
      };
      var G__4385__4388 = function(x, y) {
        return cljs.core.vector.call(null, f.call(null, x, y), g.call(null, x, y))
      };
      var G__4385__4389 = function(x, y, z) {
        return cljs.core.vector.call(null, f.call(null, x, y, z), g.call(null, x, y, z))
      };
      var G__4385__4390 = function() {
        var G__4392__delegate = function(x, y, z, args) {
          return cljs.core.vector.call(null, cljs.core.apply.call(null, f, x, y, z, args), cljs.core.apply.call(null, g, x, y, z, args))
        };
        var G__4392 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__4392__delegate.call(this, x, y, z, args)
        };
        G__4392.cljs$lang$maxFixedArity = 3;
        G__4392.cljs$lang$applyTo = function(arglist__4393) {
          var x = cljs.core.first(arglist__4393);
          var y = cljs.core.first(cljs.core.next(arglist__4393));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__4393)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__4393)));
          return G__4392__delegate.call(this, x, y, z, args)
        };
        return G__4392
      }();
      G__4385 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return G__4385__4386.call(this);
          case 1:
            return G__4385__4387.call(this, x);
          case 2:
            return G__4385__4388.call(this, x, y);
          case 3:
            return G__4385__4389.call(this, x, y, z);
          default:
            return G__4385__4390.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__4385.cljs$lang$maxFixedArity = 3;
      G__4385.cljs$lang$applyTo = G__4385__4390.cljs$lang$applyTo;
      return G__4385
    }()
  };
  var juxt__4373 = function(f, g, h) {
    return function() {
      var G__4394 = null;
      var G__4394__4395 = function() {
        return cljs.core.vector.call(null, f.call(null), g.call(null), h.call(null))
      };
      var G__4394__4396 = function(x) {
        return cljs.core.vector.call(null, f.call(null, x), g.call(null, x), h.call(null, x))
      };
      var G__4394__4397 = function(x, y) {
        return cljs.core.vector.call(null, f.call(null, x, y), g.call(null, x, y), h.call(null, x, y))
      };
      var G__4394__4398 = function(x, y, z) {
        return cljs.core.vector.call(null, f.call(null, x, y, z), g.call(null, x, y, z), h.call(null, x, y, z))
      };
      var G__4394__4399 = function() {
        var G__4401__delegate = function(x, y, z, args) {
          return cljs.core.vector.call(null, cljs.core.apply.call(null, f, x, y, z, args), cljs.core.apply.call(null, g, x, y, z, args), cljs.core.apply.call(null, h, x, y, z, args))
        };
        var G__4401 = function(x, y, z, var_args) {
          var args = null;
          if(goog.isDef(var_args)) {
            args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
          }
          return G__4401__delegate.call(this, x, y, z, args)
        };
        G__4401.cljs$lang$maxFixedArity = 3;
        G__4401.cljs$lang$applyTo = function(arglist__4402) {
          var x = cljs.core.first(arglist__4402);
          var y = cljs.core.first(cljs.core.next(arglist__4402));
          var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__4402)));
          var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__4402)));
          return G__4401__delegate.call(this, x, y, z, args)
        };
        return G__4401
      }();
      G__4394 = function(x, y, z, var_args) {
        var args = var_args;
        switch(arguments.length) {
          case 0:
            return G__4394__4395.call(this);
          case 1:
            return G__4394__4396.call(this, x);
          case 2:
            return G__4394__4397.call(this, x, y);
          case 3:
            return G__4394__4398.call(this, x, y, z);
          default:
            return G__4394__4399.apply(this, arguments)
        }
        throw"Invalid arity: " + arguments.length;
      };
      G__4394.cljs$lang$maxFixedArity = 3;
      G__4394.cljs$lang$applyTo = G__4394__4399.cljs$lang$applyTo;
      return G__4394
    }()
  };
  var juxt__4374 = function() {
    var G__4403__delegate = function(f, g, h, fs) {
      var fs__4370 = cljs.core.list_STAR_.call(null, f, g, h, fs);
      return function() {
        var G__4404 = null;
        var G__4404__4405 = function() {
          return cljs.core.reduce.call(null, function(p1__4353_SHARP_, p2__4354_SHARP_) {
            return cljs.core.conj.call(null, p1__4353_SHARP_, p2__4354_SHARP_.call(null))
          }, cljs.core.Vector.fromArray([]), fs__4370)
        };
        var G__4404__4406 = function(x) {
          return cljs.core.reduce.call(null, function(p1__4355_SHARP_, p2__4356_SHARP_) {
            return cljs.core.conj.call(null, p1__4355_SHARP_, p2__4356_SHARP_.call(null, x))
          }, cljs.core.Vector.fromArray([]), fs__4370)
        };
        var G__4404__4407 = function(x, y) {
          return cljs.core.reduce.call(null, function(p1__4357_SHARP_, p2__4358_SHARP_) {
            return cljs.core.conj.call(null, p1__4357_SHARP_, p2__4358_SHARP_.call(null, x, y))
          }, cljs.core.Vector.fromArray([]), fs__4370)
        };
        var G__4404__4408 = function(x, y, z) {
          return cljs.core.reduce.call(null, function(p1__4359_SHARP_, p2__4360_SHARP_) {
            return cljs.core.conj.call(null, p1__4359_SHARP_, p2__4360_SHARP_.call(null, x, y, z))
          }, cljs.core.Vector.fromArray([]), fs__4370)
        };
        var G__4404__4409 = function() {
          var G__4411__delegate = function(x, y, z, args) {
            return cljs.core.reduce.call(null, function(p1__4361_SHARP_, p2__4362_SHARP_) {
              return cljs.core.conj.call(null, p1__4361_SHARP_, cljs.core.apply.call(null, p2__4362_SHARP_, x, y, z, args))
            }, cljs.core.Vector.fromArray([]), fs__4370)
          };
          var G__4411 = function(x, y, z, var_args) {
            var args = null;
            if(goog.isDef(var_args)) {
              args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
            }
            return G__4411__delegate.call(this, x, y, z, args)
          };
          G__4411.cljs$lang$maxFixedArity = 3;
          G__4411.cljs$lang$applyTo = function(arglist__4412) {
            var x = cljs.core.first(arglist__4412);
            var y = cljs.core.first(cljs.core.next(arglist__4412));
            var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__4412)));
            var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__4412)));
            return G__4411__delegate.call(this, x, y, z, args)
          };
          return G__4411
        }();
        G__4404 = function(x, y, z, var_args) {
          var args = var_args;
          switch(arguments.length) {
            case 0:
              return G__4404__4405.call(this);
            case 1:
              return G__4404__4406.call(this, x);
            case 2:
              return G__4404__4407.call(this, x, y);
            case 3:
              return G__4404__4408.call(this, x, y, z);
            default:
              return G__4404__4409.apply(this, arguments)
          }
          throw"Invalid arity: " + arguments.length;
        };
        G__4404.cljs$lang$maxFixedArity = 3;
        G__4404.cljs$lang$applyTo = G__4404__4409.cljs$lang$applyTo;
        return G__4404
      }()
    };
    var G__4403 = function(f, g, h, var_args) {
      var fs = null;
      if(goog.isDef(var_args)) {
        fs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3), 0)
      }
      return G__4403__delegate.call(this, f, g, h, fs)
    };
    G__4403.cljs$lang$maxFixedArity = 3;
    G__4403.cljs$lang$applyTo = function(arglist__4413) {
      var f = cljs.core.first(arglist__4413);
      var g = cljs.core.first(cljs.core.next(arglist__4413));
      var h = cljs.core.first(cljs.core.next(cljs.core.next(arglist__4413)));
      var fs = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__4413)));
      return G__4403__delegate.call(this, f, g, h, fs)
    };
    return G__4403
  }();
  juxt = function(f, g, h, var_args) {
    var fs = var_args;
    switch(arguments.length) {
      case 1:
        return juxt__4371.call(this, f);
      case 2:
        return juxt__4372.call(this, f, g);
      case 3:
        return juxt__4373.call(this, f, g, h);
      default:
        return juxt__4374.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  juxt.cljs$lang$maxFixedArity = 3;
  juxt.cljs$lang$applyTo = juxt__4374.cljs$lang$applyTo;
  return juxt
}();
cljs.core.dorun = function() {
  var dorun = null;
  var dorun__4415 = function(coll) {
    while(true) {
      if(cljs.core.truth_(cljs.core.seq.call(null, coll))) {
        var G__4418 = cljs.core.next.call(null, coll);
        coll = G__4418;
        continue
      }else {
        return null
      }
      break
    }
  };
  var dorun__4416 = function(n, coll) {
    while(true) {
      if(cljs.core.truth_(function() {
        var and__3546__auto____4414 = cljs.core.seq.call(null, coll);
        if(cljs.core.truth_(and__3546__auto____4414)) {
          return n > 0
        }else {
          return and__3546__auto____4414
        }
      }())) {
        var G__4419 = n - 1;
        var G__4420 = cljs.core.next.call(null, coll);
        n = G__4419;
        coll = G__4420;
        continue
      }else {
        return null
      }
      break
    }
  };
  dorun = function(n, coll) {
    switch(arguments.length) {
      case 1:
        return dorun__4415.call(this, n);
      case 2:
        return dorun__4416.call(this, n, coll)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return dorun
}();
cljs.core.doall = function() {
  var doall = null;
  var doall__4421 = function(coll) {
    cljs.core.dorun.call(null, coll);
    return coll
  };
  var doall__4422 = function(n, coll) {
    cljs.core.dorun.call(null, n, coll);
    return coll
  };
  doall = function(n, coll) {
    switch(arguments.length) {
      case 1:
        return doall__4421.call(this, n);
      case 2:
        return doall__4422.call(this, n, coll)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return doall
}();
cljs.core.re_matches = function re_matches(re, s) {
  var matches__4424 = re.exec(s);
  if(cljs.core.truth_(cljs.core._EQ_.call(null, cljs.core.first.call(null, matches__4424), s))) {
    if(cljs.core.truth_(cljs.core._EQ_.call(null, cljs.core.count.call(null, matches__4424), 1))) {
      return cljs.core.first.call(null, matches__4424)
    }else {
      return cljs.core.vec.call(null, matches__4424)
    }
  }else {
    return null
  }
};
cljs.core.re_find = function re_find(re, s) {
  var matches__4425 = re.exec(s);
  if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, matches__4425))) {
    return null
  }else {
    if(cljs.core.truth_(cljs.core._EQ_.call(null, cljs.core.count.call(null, matches__4425), 1))) {
      return cljs.core.first.call(null, matches__4425)
    }else {
      return cljs.core.vec.call(null, matches__4425)
    }
  }
};
cljs.core.re_seq = function re_seq(re, s) {
  var match_data__4426 = cljs.core.re_find.call(null, re, s);
  var match_idx__4427 = s.search(re);
  var match_str__4428 = cljs.core.truth_(cljs.core.coll_QMARK_.call(null, match_data__4426)) ? cljs.core.first.call(null, match_data__4426) : match_data__4426;
  var post_match__4429 = cljs.core.subs.call(null, s, match_idx__4427 + cljs.core.count.call(null, match_str__4428));
  if(cljs.core.truth_(match_data__4426)) {
    return new cljs.core.LazySeq(null, false, function() {
      return cljs.core.cons.call(null, match_data__4426, re_seq.call(null, re, post_match__4429))
    })
  }else {
    return null
  }
};
cljs.core.re_pattern = function re_pattern(s) {
  return new RegExp(s)
};
cljs.core.pr_sequential = function pr_sequential(print_one, begin, sep, end, opts, coll) {
  return cljs.core.concat.call(null, cljs.core.Vector.fromArray([begin]), cljs.core.flatten1.call(null, cljs.core.interpose.call(null, cljs.core.Vector.fromArray([sep]), cljs.core.map.call(null, function(p1__4430_SHARP_) {
    return print_one.call(null, p1__4430_SHARP_, opts)
  }, coll))), cljs.core.Vector.fromArray([end]))
};
cljs.core.string_print = function string_print(x) {
  cljs.core._STAR_print_fn_STAR_.call(null, x);
  return null
};
cljs.core.flush = function flush() {
  return null
};
cljs.core.pr_seq = function pr_seq(obj, opts) {
  if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, obj))) {
    return cljs.core.list.call(null, "nil")
  }else {
    if(cljs.core.truth_(void 0 === obj)) {
      return cljs.core.list.call(null, "#<undefined>")
    }else {
      if(cljs.core.truth_("\ufdd0'else")) {
        return cljs.core.concat.call(null, cljs.core.truth_(function() {
          var and__3546__auto____4431 = cljs.core.get.call(null, opts, "\ufdd0'meta");
          if(cljs.core.truth_(and__3546__auto____4431)) {
            var and__3546__auto____4435 = function() {
              var x__445__auto____4432 = obj;
              if(cljs.core.truth_(function() {
                var and__3546__auto____4433 = x__445__auto____4432;
                if(cljs.core.truth_(and__3546__auto____4433)) {
                  var and__3546__auto____4434 = x__445__auto____4432.cljs$core$IMeta$;
                  if(cljs.core.truth_(and__3546__auto____4434)) {
                    return cljs.core.not.call(null, x__445__auto____4432.hasOwnProperty("cljs$core$IMeta$"))
                  }else {
                    return and__3546__auto____4434
                  }
                }else {
                  return and__3546__auto____4433
                }
              }())) {
                return true
              }else {
                return cljs.core.type_satisfies_.call(null, cljs.core.IMeta, x__445__auto____4432)
              }
            }();
            if(cljs.core.truth_(and__3546__auto____4435)) {
              return cljs.core.meta.call(null, obj)
            }else {
              return and__3546__auto____4435
            }
          }else {
            return and__3546__auto____4431
          }
        }()) ? cljs.core.concat.call(null, cljs.core.Vector.fromArray(["^"]), pr_seq.call(null, cljs.core.meta.call(null, obj), opts), cljs.core.Vector.fromArray([" "])) : null, cljs.core.truth_(function() {
          var x__445__auto____4436 = obj;
          if(cljs.core.truth_(function() {
            var and__3546__auto____4437 = x__445__auto____4436;
            if(cljs.core.truth_(and__3546__auto____4437)) {
              var and__3546__auto____4438 = x__445__auto____4436.cljs$core$IPrintable$;
              if(cljs.core.truth_(and__3546__auto____4438)) {
                return cljs.core.not.call(null, x__445__auto____4436.hasOwnProperty("cljs$core$IPrintable$"))
              }else {
                return and__3546__auto____4438
              }
            }else {
              return and__3546__auto____4437
            }
          }())) {
            return true
          }else {
            return cljs.core.type_satisfies_.call(null, cljs.core.IPrintable, x__445__auto____4436)
          }
        }()) ? cljs.core._pr_seq.call(null, obj, opts) : cljs.core.list.call(null, "#<", cljs.core.str.call(null, obj), ">"))
      }else {
        return null
      }
    }
  }
};
cljs.core.pr_str_with_opts = function pr_str_with_opts(objs, opts) {
  var first_obj__4439 = cljs.core.first.call(null, objs);
  var sb__4440 = new goog.string.StringBuffer;
  var G__4441__4442 = cljs.core.seq.call(null, objs);
  if(cljs.core.truth_(G__4441__4442)) {
    var obj__4443 = cljs.core.first.call(null, G__4441__4442);
    var G__4441__4444 = G__4441__4442;
    while(true) {
      if(cljs.core.truth_(obj__4443 === first_obj__4439)) {
      }else {
        sb__4440.append(" ")
      }
      var G__4445__4446 = cljs.core.seq.call(null, cljs.core.pr_seq.call(null, obj__4443, opts));
      if(cljs.core.truth_(G__4445__4446)) {
        var string__4447 = cljs.core.first.call(null, G__4445__4446);
        var G__4445__4448 = G__4445__4446;
        while(true) {
          sb__4440.append(string__4447);
          var temp__3698__auto____4449 = cljs.core.next.call(null, G__4445__4448);
          if(cljs.core.truth_(temp__3698__auto____4449)) {
            var G__4445__4450 = temp__3698__auto____4449;
            var G__4453 = cljs.core.first.call(null, G__4445__4450);
            var G__4454 = G__4445__4450;
            string__4447 = G__4453;
            G__4445__4448 = G__4454;
            continue
          }else {
          }
          break
        }
      }else {
      }
      var temp__3698__auto____4451 = cljs.core.next.call(null, G__4441__4444);
      if(cljs.core.truth_(temp__3698__auto____4451)) {
        var G__4441__4452 = temp__3698__auto____4451;
        var G__4455 = cljs.core.first.call(null, G__4441__4452);
        var G__4456 = G__4441__4452;
        obj__4443 = G__4455;
        G__4441__4444 = G__4456;
        continue
      }else {
      }
      break
    }
  }else {
  }
  return cljs.core.str.call(null, sb__4440)
};
cljs.core.pr_with_opts = function pr_with_opts(objs, opts) {
  var first_obj__4457 = cljs.core.first.call(null, objs);
  var G__4458__4459 = cljs.core.seq.call(null, objs);
  if(cljs.core.truth_(G__4458__4459)) {
    var obj__4460 = cljs.core.first.call(null, G__4458__4459);
    var G__4458__4461 = G__4458__4459;
    while(true) {
      if(cljs.core.truth_(obj__4460 === first_obj__4457)) {
      }else {
        cljs.core.string_print.call(null, " ")
      }
      var G__4462__4463 = cljs.core.seq.call(null, cljs.core.pr_seq.call(null, obj__4460, opts));
      if(cljs.core.truth_(G__4462__4463)) {
        var string__4464 = cljs.core.first.call(null, G__4462__4463);
        var G__4462__4465 = G__4462__4463;
        while(true) {
          cljs.core.string_print.call(null, string__4464);
          var temp__3698__auto____4466 = cljs.core.next.call(null, G__4462__4465);
          if(cljs.core.truth_(temp__3698__auto____4466)) {
            var G__4462__4467 = temp__3698__auto____4466;
            var G__4470 = cljs.core.first.call(null, G__4462__4467);
            var G__4471 = G__4462__4467;
            string__4464 = G__4470;
            G__4462__4465 = G__4471;
            continue
          }else {
          }
          break
        }
      }else {
      }
      var temp__3698__auto____4468 = cljs.core.next.call(null, G__4458__4461);
      if(cljs.core.truth_(temp__3698__auto____4468)) {
        var G__4458__4469 = temp__3698__auto____4468;
        var G__4472 = cljs.core.first.call(null, G__4458__4469);
        var G__4473 = G__4458__4469;
        obj__4460 = G__4472;
        G__4458__4461 = G__4473;
        continue
      }else {
        return null
      }
      break
    }
  }else {
    return null
  }
};
cljs.core.newline = function newline(opts) {
  cljs.core.string_print.call(null, "\n");
  if(cljs.core.truth_(cljs.core.get.call(null, opts, "\ufdd0'flush-on-newline"))) {
    return cljs.core.flush.call(null)
  }else {
    return null
  }
};
cljs.core._STAR_flush_on_newline_STAR_ = true;
cljs.core._STAR_print_readably_STAR_ = true;
cljs.core._STAR_print_meta_STAR_ = false;
cljs.core._STAR_print_dup_STAR_ = false;
cljs.core.pr_opts = function pr_opts() {
  return cljs.core.ObjMap.fromObject(["\ufdd0'flush-on-newline", "\ufdd0'readably", "\ufdd0'meta", "\ufdd0'dup"], {"\ufdd0'flush-on-newline":cljs.core._STAR_flush_on_newline_STAR_, "\ufdd0'readably":cljs.core._STAR_print_readably_STAR_, "\ufdd0'meta":cljs.core._STAR_print_meta_STAR_, "\ufdd0'dup":cljs.core._STAR_print_dup_STAR_})
};
cljs.core.pr_str = function() {
  var pr_str__delegate = function(objs) {
    return cljs.core.pr_str_with_opts.call(null, objs, cljs.core.pr_opts.call(null))
  };
  var pr_str = function(var_args) {
    var objs = null;
    if(goog.isDef(var_args)) {
      objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return pr_str__delegate.call(this, objs)
  };
  pr_str.cljs$lang$maxFixedArity = 0;
  pr_str.cljs$lang$applyTo = function(arglist__4474) {
    var objs = cljs.core.seq(arglist__4474);
    return pr_str__delegate.call(this, objs)
  };
  return pr_str
}();
cljs.core.pr = function() {
  var pr__delegate = function(objs) {
    return cljs.core.pr_with_opts.call(null, objs, cljs.core.pr_opts.call(null))
  };
  var pr = function(var_args) {
    var objs = null;
    if(goog.isDef(var_args)) {
      objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return pr__delegate.call(this, objs)
  };
  pr.cljs$lang$maxFixedArity = 0;
  pr.cljs$lang$applyTo = function(arglist__4475) {
    var objs = cljs.core.seq(arglist__4475);
    return pr__delegate.call(this, objs)
  };
  return pr
}();
cljs.core.print = function() {
  var cljs_core_print__delegate = function(objs) {
    return cljs.core.pr_with_opts.call(null, objs, cljs.core.assoc.call(null, cljs.core.pr_opts.call(null), "\ufdd0'readably", false))
  };
  var cljs_core_print = function(var_args) {
    var objs = null;
    if(goog.isDef(var_args)) {
      objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return cljs_core_print__delegate.call(this, objs)
  };
  cljs_core_print.cljs$lang$maxFixedArity = 0;
  cljs_core_print.cljs$lang$applyTo = function(arglist__4476) {
    var objs = cljs.core.seq(arglist__4476);
    return cljs_core_print__delegate.call(this, objs)
  };
  return cljs_core_print
}();
cljs.core.println = function() {
  var println__delegate = function(objs) {
    cljs.core.pr_with_opts.call(null, objs, cljs.core.assoc.call(null, cljs.core.pr_opts.call(null), "\ufdd0'readably", false));
    return cljs.core.newline.call(null, cljs.core.pr_opts.call(null))
  };
  var println = function(var_args) {
    var objs = null;
    if(goog.isDef(var_args)) {
      objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return println__delegate.call(this, objs)
  };
  println.cljs$lang$maxFixedArity = 0;
  println.cljs$lang$applyTo = function(arglist__4477) {
    var objs = cljs.core.seq(arglist__4477);
    return println__delegate.call(this, objs)
  };
  return println
}();
cljs.core.prn = function() {
  var prn__delegate = function(objs) {
    cljs.core.pr_with_opts.call(null, objs, cljs.core.pr_opts.call(null));
    return cljs.core.newline.call(null, cljs.core.pr_opts.call(null))
  };
  var prn = function(var_args) {
    var objs = null;
    if(goog.isDef(var_args)) {
      objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return prn__delegate.call(this, objs)
  };
  prn.cljs$lang$maxFixedArity = 0;
  prn.cljs$lang$applyTo = function(arglist__4478) {
    var objs = cljs.core.seq(arglist__4478);
    return prn__delegate.call(this, objs)
  };
  return prn
}();
cljs.core.HashMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.HashMap.prototype.cljs$core$IPrintable$_pr_seq = function(coll, opts) {
  var pr_pair__4479 = function(keyval) {
    return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "", " ", "", opts, keyval)
  };
  return cljs.core.pr_sequential.call(null, pr_pair__4479, "{", ", ", "}", opts, coll)
};
cljs.core.IPrintable["number"] = true;
cljs.core._pr_seq["number"] = function(n, opts) {
  return cljs.core.list.call(null, cljs.core.str.call(null, n))
};
cljs.core.IndexedSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IPrintable$_pr_seq = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", opts, coll)
};
cljs.core.Subvec.prototype.cljs$core$IPrintable$ = true;
cljs.core.Subvec.prototype.cljs$core$IPrintable$_pr_seq = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "[", " ", "]", opts, coll)
};
cljs.core.LazySeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.LazySeq.prototype.cljs$core$IPrintable$_pr_seq = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", opts, coll)
};
cljs.core.IPrintable["boolean"] = true;
cljs.core._pr_seq["boolean"] = function(bool, opts) {
  return cljs.core.list.call(null, cljs.core.str.call(null, bool))
};
cljs.core.Set.prototype.cljs$core$IPrintable$ = true;
cljs.core.Set.prototype.cljs$core$IPrintable$_pr_seq = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "#{", " ", "}", opts, coll)
};
cljs.core.IPrintable["string"] = true;
cljs.core._pr_seq["string"] = function(obj, opts) {
  if(cljs.core.truth_(cljs.core.keyword_QMARK_.call(null, obj))) {
    return cljs.core.list.call(null, cljs.core.str.call(null, ":", function() {
      var temp__3698__auto____4480 = cljs.core.namespace.call(null, obj);
      if(cljs.core.truth_(temp__3698__auto____4480)) {
        var nspc__4481 = temp__3698__auto____4480;
        return cljs.core.str.call(null, nspc__4481, "/")
      }else {
        return null
      }
    }(), cljs.core.name.call(null, obj)))
  }else {
    if(cljs.core.truth_(cljs.core.symbol_QMARK_.call(null, obj))) {
      return cljs.core.list.call(null, cljs.core.str.call(null, function() {
        var temp__3698__auto____4482 = cljs.core.namespace.call(null, obj);
        if(cljs.core.truth_(temp__3698__auto____4482)) {
          var nspc__4483 = temp__3698__auto____4482;
          return cljs.core.str.call(null, nspc__4483, "/")
        }else {
          return null
        }
      }(), cljs.core.name.call(null, obj)))
    }else {
      if(cljs.core.truth_("\ufdd0'else")) {
        return cljs.core.list.call(null, cljs.core.truth_("\ufdd0'readably".call(null, opts)) ? goog.string.quote.call(null, obj) : obj)
      }else {
        return null
      }
    }
  }
};
cljs.core.Vector.prototype.cljs$core$IPrintable$ = true;
cljs.core.Vector.prototype.cljs$core$IPrintable$_pr_seq = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "[", " ", "]", opts, coll)
};
cljs.core.List.prototype.cljs$core$IPrintable$ = true;
cljs.core.List.prototype.cljs$core$IPrintable$_pr_seq = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", opts, coll)
};
cljs.core.IPrintable["array"] = true;
cljs.core._pr_seq["array"] = function(a, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "#<Array [", ", ", "]>", opts, a)
};
cljs.core.PersistentQueueSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.PersistentQueueSeq.prototype.cljs$core$IPrintable$_pr_seq = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", opts, coll)
};
cljs.core.EmptyList.prototype.cljs$core$IPrintable$ = true;
cljs.core.EmptyList.prototype.cljs$core$IPrintable$_pr_seq = function(coll, opts) {
  return cljs.core.list.call(null, "()")
};
cljs.core.Cons.prototype.cljs$core$IPrintable$ = true;
cljs.core.Cons.prototype.cljs$core$IPrintable$_pr_seq = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", opts, coll)
};
cljs.core.Range.prototype.cljs$core$IPrintable$ = true;
cljs.core.Range.prototype.cljs$core$IPrintable$_pr_seq = function(coll, opts) {
  return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "(", " ", ")", opts, coll)
};
cljs.core.ObjMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.ObjMap.prototype.cljs$core$IPrintable$_pr_seq = function(coll, opts) {
  var pr_pair__4484 = function(keyval) {
    return cljs.core.pr_sequential.call(null, cljs.core.pr_seq, "", " ", "", opts, keyval)
  };
  return cljs.core.pr_sequential.call(null, pr_pair__4484, "{", ", ", "}", opts, coll)
};
cljs.core.Atom = function(state, meta, validator, watches) {
  this.state = state;
  this.meta = meta;
  this.validator = validator;
  this.watches = watches
};
cljs.core.Atom.cljs$core$IPrintable$_pr_seq = function(this__360__auto__) {
  return cljs.core.list.call(null, "cljs.core.Atom")
};
cljs.core.Atom.prototype.cljs$core$IHash$ = true;
cljs.core.Atom.prototype.cljs$core$IHash$_hash = function(this$) {
  var this__4485 = this;
  return goog.getUid.call(null, this$)
};
cljs.core.Atom.prototype.cljs$core$IWatchable$ = true;
cljs.core.Atom.prototype.cljs$core$IWatchable$_notify_watches = function(this$, oldval, newval) {
  var this__4486 = this;
  var G__4487__4488 = cljs.core.seq.call(null, this__4486.watches);
  if(cljs.core.truth_(G__4487__4488)) {
    var G__4490__4492 = cljs.core.first.call(null, G__4487__4488);
    var vec__4491__4493 = G__4490__4492;
    var key__4494 = cljs.core.nth.call(null, vec__4491__4493, 0, null);
    var f__4495 = cljs.core.nth.call(null, vec__4491__4493, 1, null);
    var G__4487__4496 = G__4487__4488;
    var G__4490__4497 = G__4490__4492;
    var G__4487__4498 = G__4487__4496;
    while(true) {
      var vec__4499__4500 = G__4490__4497;
      var key__4501 = cljs.core.nth.call(null, vec__4499__4500, 0, null);
      var f__4502 = cljs.core.nth.call(null, vec__4499__4500, 1, null);
      var G__4487__4503 = G__4487__4498;
      f__4502.call(null, key__4501, this$, oldval, newval);
      var temp__3698__auto____4504 = cljs.core.next.call(null, G__4487__4503);
      if(cljs.core.truth_(temp__3698__auto____4504)) {
        var G__4487__4505 = temp__3698__auto____4504;
        var G__4512 = cljs.core.first.call(null, G__4487__4505);
        var G__4513 = G__4487__4505;
        G__4490__4497 = G__4512;
        G__4487__4498 = G__4513;
        continue
      }else {
        return null
      }
      break
    }
  }else {
    return null
  }
};
cljs.core.Atom.prototype.cljs$core$IWatchable$_add_watch = function(this$, key, f) {
  var this__4506 = this;
  return this$.watches = cljs.core.assoc.call(null, this__4506.watches, key, f)
};
cljs.core.Atom.prototype.cljs$core$IWatchable$_remove_watch = function(this$, key) {
  var this__4507 = this;
  return this$.watches = cljs.core.dissoc.call(null, this__4507.watches, key)
};
cljs.core.Atom.prototype.cljs$core$IPrintable$ = true;
cljs.core.Atom.prototype.cljs$core$IPrintable$_pr_seq = function(a, opts) {
  var this__4508 = this;
  return cljs.core.concat.call(null, cljs.core.Vector.fromArray(["#<Atom: "]), cljs.core._pr_seq.call(null, this__4508.state, opts), ">")
};
cljs.core.Atom.prototype.cljs$core$IMeta$ = true;
cljs.core.Atom.prototype.cljs$core$IMeta$_meta = function(_) {
  var this__4509 = this;
  return this__4509.meta
};
cljs.core.Atom.prototype.cljs$core$IDeref$ = true;
cljs.core.Atom.prototype.cljs$core$IDeref$_deref = function(_) {
  var this__4510 = this;
  return this__4510.state
};
cljs.core.Atom.prototype.cljs$core$IEquiv$ = true;
cljs.core.Atom.prototype.cljs$core$IEquiv$_equiv = function(o, other) {
  var this__4511 = this;
  return o === other
};
cljs.core.Atom;
cljs.core.atom = function() {
  var atom = null;
  var atom__4520 = function(x) {
    return new cljs.core.Atom(x, null, null, null)
  };
  var atom__4521 = function() {
    var G__4523__delegate = function(x, p__4514) {
      var map__4515__4516 = p__4514;
      var map__4515__4517 = cljs.core.truth_(cljs.core.seq_QMARK_.call(null, map__4515__4516)) ? cljs.core.apply.call(null, cljs.core.hash_map, map__4515__4516) : map__4515__4516;
      var validator__4518 = cljs.core.get.call(null, map__4515__4517, "\ufdd0'validator");
      var meta__4519 = cljs.core.get.call(null, map__4515__4517, "\ufdd0'meta");
      return new cljs.core.Atom(x, meta__4519, validator__4518, null)
    };
    var G__4523 = function(x, var_args) {
      var p__4514 = null;
      if(goog.isDef(var_args)) {
        p__4514 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
      }
      return G__4523__delegate.call(this, x, p__4514)
    };
    G__4523.cljs$lang$maxFixedArity = 1;
    G__4523.cljs$lang$applyTo = function(arglist__4524) {
      var x = cljs.core.first(arglist__4524);
      var p__4514 = cljs.core.rest(arglist__4524);
      return G__4523__delegate.call(this, x, p__4514)
    };
    return G__4523
  }();
  atom = function(x, var_args) {
    var p__4514 = var_args;
    switch(arguments.length) {
      case 1:
        return atom__4520.call(this, x);
      default:
        return atom__4521.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  atom.cljs$lang$maxFixedArity = 1;
  atom.cljs$lang$applyTo = atom__4521.cljs$lang$applyTo;
  return atom
}();
cljs.core.reset_BANG_ = function reset_BANG_(a, new_value) {
  var temp__3698__auto____4525 = a.validator;
  if(cljs.core.truth_(temp__3698__auto____4525)) {
    var validate__4526 = temp__3698__auto____4525;
    if(cljs.core.truth_(validate__4526.call(null, new_value))) {
    }else {
      throw new Error(cljs.core.str.call(null, "Assert failed: ", "Validator rejected reference state", "\n", cljs.core.pr_str.call(null, cljs.core.with_meta(cljs.core.list("\ufdd1'validate", "\ufdd1'new-value"), cljs.core.hash_map("\ufdd0'line", 3061)))));
    }
  }else {
  }
  var old_value__4527 = a.state;
  a.state = new_value;
  cljs.core._notify_watches.call(null, a, old_value__4527, new_value);
  return new_value
};
cljs.core.swap_BANG_ = function() {
  var swap_BANG_ = null;
  var swap_BANG___4528 = function(a, f) {
    return cljs.core.reset_BANG_.call(null, a, f.call(null, a.state))
  };
  var swap_BANG___4529 = function(a, f, x) {
    return cljs.core.reset_BANG_.call(null, a, f.call(null, a.state, x))
  };
  var swap_BANG___4530 = function(a, f, x, y) {
    return cljs.core.reset_BANG_.call(null, a, f.call(null, a.state, x, y))
  };
  var swap_BANG___4531 = function(a, f, x, y, z) {
    return cljs.core.reset_BANG_.call(null, a, f.call(null, a.state, x, y, z))
  };
  var swap_BANG___4532 = function() {
    var G__4534__delegate = function(a, f, x, y, z, more) {
      return cljs.core.reset_BANG_.call(null, a, cljs.core.apply.call(null, f, a.state, x, y, z, more))
    };
    var G__4534 = function(a, f, x, y, z, var_args) {
      var more = null;
      if(goog.isDef(var_args)) {
        more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 5), 0)
      }
      return G__4534__delegate.call(this, a, f, x, y, z, more)
    };
    G__4534.cljs$lang$maxFixedArity = 5;
    G__4534.cljs$lang$applyTo = function(arglist__4535) {
      var a = cljs.core.first(arglist__4535);
      var f = cljs.core.first(cljs.core.next(arglist__4535));
      var x = cljs.core.first(cljs.core.next(cljs.core.next(arglist__4535)));
      var y = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__4535))));
      var z = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__4535)))));
      var more = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__4535)))));
      return G__4534__delegate.call(this, a, f, x, y, z, more)
    };
    return G__4534
  }();
  swap_BANG_ = function(a, f, x, y, z, var_args) {
    var more = var_args;
    switch(arguments.length) {
      case 2:
        return swap_BANG___4528.call(this, a, f);
      case 3:
        return swap_BANG___4529.call(this, a, f, x);
      case 4:
        return swap_BANG___4530.call(this, a, f, x, y);
      case 5:
        return swap_BANG___4531.call(this, a, f, x, y, z);
      default:
        return swap_BANG___4532.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  swap_BANG_.cljs$lang$maxFixedArity = 5;
  swap_BANG_.cljs$lang$applyTo = swap_BANG___4532.cljs$lang$applyTo;
  return swap_BANG_
}();
cljs.core.compare_and_set_BANG_ = function compare_and_set_BANG_(a, oldval, newval) {
  if(cljs.core.truth_(cljs.core._EQ_.call(null, a.state, oldval))) {
    cljs.core.reset_BANG_.call(null, a, newval);
    return true
  }else {
    return false
  }
};
cljs.core.deref = function deref(o) {
  return cljs.core._deref.call(null, o)
};
cljs.core.set_validator_BANG_ = function set_validator_BANG_(iref, val) {
  return iref.validator = val
};
cljs.core.get_validator = function get_validator(iref) {
  return iref.validator
};
cljs.core.alter_meta_BANG_ = function() {
  var alter_meta_BANG___delegate = function(iref, f, args) {
    return iref.meta = cljs.core.apply.call(null, f, iref.meta, args)
  };
  var alter_meta_BANG_ = function(iref, f, var_args) {
    var args = null;
    if(goog.isDef(var_args)) {
      args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2), 0)
    }
    return alter_meta_BANG___delegate.call(this, iref, f, args)
  };
  alter_meta_BANG_.cljs$lang$maxFixedArity = 2;
  alter_meta_BANG_.cljs$lang$applyTo = function(arglist__4536) {
    var iref = cljs.core.first(arglist__4536);
    var f = cljs.core.first(cljs.core.next(arglist__4536));
    var args = cljs.core.rest(cljs.core.next(arglist__4536));
    return alter_meta_BANG___delegate.call(this, iref, f, args)
  };
  return alter_meta_BANG_
}();
cljs.core.reset_meta_BANG_ = function reset_meta_BANG_(iref, m) {
  return iref.meta = m
};
cljs.core.add_watch = function add_watch(iref, key, f) {
  return cljs.core._add_watch.call(null, iref, key, f)
};
cljs.core.remove_watch = function remove_watch(iref, key) {
  return cljs.core._remove_watch.call(null, iref, key)
};
cljs.core.gensym_counter = null;
cljs.core.gensym = function() {
  var gensym = null;
  var gensym__4537 = function() {
    return gensym.call(null, "G__")
  };
  var gensym__4538 = function(prefix_string) {
    if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, cljs.core.gensym_counter))) {
      cljs.core.gensym_counter = cljs.core.atom.call(null, 0)
    }else {
    }
    return cljs.core.symbol.call(null, cljs.core.str.call(null, prefix_string, cljs.core.swap_BANG_.call(null, cljs.core.gensym_counter, cljs.core.inc)))
  };
  gensym = function(prefix_string) {
    switch(arguments.length) {
      case 0:
        return gensym__4537.call(this);
      case 1:
        return gensym__4538.call(this, prefix_string)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return gensym
}();
cljs.core.fixture1 = 1;
cljs.core.fixture2 = 2;
cljs.core.Delay = function(f, state) {
  this.f = f;
  this.state = state
};
cljs.core.Delay.cljs$core$IPrintable$_pr_seq = function(this__360__auto__) {
  return cljs.core.list.call(null, "cljs.core.Delay")
};
cljs.core.Delay.prototype.cljs$core$IPending$ = true;
cljs.core.Delay.prototype.cljs$core$IPending$_realized_QMARK_ = function(d) {
  var this__4540 = this;
  return cljs.core.not.call(null, cljs.core.nil_QMARK_.call(null, cljs.core.deref.call(null, this__4540.state)))
};
cljs.core.Delay.prototype.cljs$core$IDeref$ = true;
cljs.core.Delay.prototype.cljs$core$IDeref$_deref = function(_) {
  var this__4541 = this;
  if(cljs.core.truth_(cljs.core.deref.call(null, this__4541.state))) {
  }else {
    cljs.core.swap_BANG_.call(null, this__4541.state, this__4541.f)
  }
  return cljs.core.deref.call(null, this__4541.state)
};
cljs.core.Delay;
cljs.core.delay = function() {
  var delay__delegate = function(body) {
    return new cljs.core.Delay(function() {
      return cljs.core.apply.call(null, cljs.core.identity, body)
    }, cljs.core.atom.call(null, null))
  };
  var delay = function(var_args) {
    var body = null;
    if(goog.isDef(var_args)) {
      body = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
    }
    return delay__delegate.call(this, body)
  };
  delay.cljs$lang$maxFixedArity = 0;
  delay.cljs$lang$applyTo = function(arglist__4542) {
    var body = cljs.core.seq(arglist__4542);
    return delay__delegate.call(this, body)
  };
  return delay
}();
cljs.core.delay_QMARK_ = function delay_QMARK_(x) {
  return cljs.core.instance_QMARK_.call(null, cljs.core.Delay, x)
};
cljs.core.force = function force(x) {
  if(cljs.core.truth_(cljs.core.delay_QMARK_.call(null, x))) {
    return cljs.core.deref.call(null, x)
  }else {
    return x
  }
};
cljs.core.realized_QMARK_ = function realized_QMARK_(d) {
  return cljs.core._realized_QMARK_.call(null, d)
};
cljs.core.js__GT_clj = function() {
  var js__GT_clj__delegate = function(x, options) {
    var map__4543__4544 = options;
    var map__4543__4545 = cljs.core.truth_(cljs.core.seq_QMARK_.call(null, map__4543__4544)) ? cljs.core.apply.call(null, cljs.core.hash_map, map__4543__4544) : map__4543__4544;
    var keywordize_keys__4546 = cljs.core.get.call(null, map__4543__4545, "\ufdd0'keywordize-keys");
    var keyfn__4547 = cljs.core.truth_(keywordize_keys__4546) ? cljs.core.keyword : cljs.core.str;
    var f__4553 = function thisfn(x) {
      if(cljs.core.truth_(cljs.core.seq_QMARK_.call(null, x))) {
        return cljs.core.doall.call(null, cljs.core.map.call(null, thisfn, x))
      }else {
        if(cljs.core.truth_(cljs.core.coll_QMARK_.call(null, x))) {
          return cljs.core.into.call(null, cljs.core.empty.call(null, x), cljs.core.map.call(null, thisfn, x))
        }else {
          if(cljs.core.truth_(goog.isArray.call(null, x))) {
            return cljs.core.vec.call(null, cljs.core.map.call(null, thisfn, x))
          }else {
            if(cljs.core.truth_(goog.isObject.call(null, x))) {
              return cljs.core.into.call(null, cljs.core.ObjMap.fromObject([], {}), function() {
                var iter__509__auto____4552 = function iter__4548(s__4549) {
                  return new cljs.core.LazySeq(null, false, function() {
                    var s__4549__4550 = s__4549;
                    while(true) {
                      if(cljs.core.truth_(cljs.core.seq.call(null, s__4549__4550))) {
                        var k__4551 = cljs.core.first.call(null, s__4549__4550);
                        return cljs.core.cons.call(null, cljs.core.Vector.fromArray([keyfn__4547.call(null, k__4551), thisfn.call(null, x[k__4551])]), iter__4548.call(null, cljs.core.rest.call(null, s__4549__4550)))
                      }else {
                        return null
                      }
                      break
                    }
                  })
                };
                return iter__509__auto____4552.call(null, cljs.core.js_keys.call(null, x))
              }())
            }else {
              if(cljs.core.truth_("\ufdd0'else")) {
                return x
              }else {
                return null
              }
            }
          }
        }
      }
    };
    return f__4553.call(null, x)
  };
  var js__GT_clj = function(x, var_args) {
    var options = null;
    if(goog.isDef(var_args)) {
      options = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
    }
    return js__GT_clj__delegate.call(this, x, options)
  };
  js__GT_clj.cljs$lang$maxFixedArity = 1;
  js__GT_clj.cljs$lang$applyTo = function(arglist__4554) {
    var x = cljs.core.first(arglist__4554);
    var options = cljs.core.rest(arglist__4554);
    return js__GT_clj__delegate.call(this, x, options)
  };
  return js__GT_clj
}();
cljs.core.memoize = function memoize(f) {
  var mem__4555 = cljs.core.atom.call(null, cljs.core.ObjMap.fromObject([], {}));
  return function() {
    var G__4559__delegate = function(args) {
      var temp__3695__auto____4556 = cljs.core.get.call(null, cljs.core.deref.call(null, mem__4555), args);
      if(cljs.core.truth_(temp__3695__auto____4556)) {
        var v__4557 = temp__3695__auto____4556;
        return v__4557
      }else {
        var ret__4558 = cljs.core.apply.call(null, f, args);
        cljs.core.swap_BANG_.call(null, mem__4555, cljs.core.assoc, args, ret__4558);
        return ret__4558
      }
    };
    var G__4559 = function(var_args) {
      var args = null;
      if(goog.isDef(var_args)) {
        args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0), 0)
      }
      return G__4559__delegate.call(this, args)
    };
    G__4559.cljs$lang$maxFixedArity = 0;
    G__4559.cljs$lang$applyTo = function(arglist__4560) {
      var args = cljs.core.seq(arglist__4560);
      return G__4559__delegate.call(this, args)
    };
    return G__4559
  }()
};
cljs.core.trampoline = function() {
  var trampoline = null;
  var trampoline__4562 = function(f) {
    while(true) {
      var ret__4561 = f.call(null);
      if(cljs.core.truth_(cljs.core.fn_QMARK_.call(null, ret__4561))) {
        var G__4565 = ret__4561;
        f = G__4565;
        continue
      }else {
        return ret__4561
      }
      break
    }
  };
  var trampoline__4563 = function() {
    var G__4566__delegate = function(f, args) {
      return trampoline.call(null, function() {
        return cljs.core.apply.call(null, f, args)
      })
    };
    var G__4566 = function(f, var_args) {
      var args = null;
      if(goog.isDef(var_args)) {
        args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
      }
      return G__4566__delegate.call(this, f, args)
    };
    G__4566.cljs$lang$maxFixedArity = 1;
    G__4566.cljs$lang$applyTo = function(arglist__4567) {
      var f = cljs.core.first(arglist__4567);
      var args = cljs.core.rest(arglist__4567);
      return G__4566__delegate.call(this, f, args)
    };
    return G__4566
  }();
  trampoline = function(f, var_args) {
    var args = var_args;
    switch(arguments.length) {
      case 1:
        return trampoline__4562.call(this, f);
      default:
        return trampoline__4563.apply(this, arguments)
    }
    throw"Invalid arity: " + arguments.length;
  };
  trampoline.cljs$lang$maxFixedArity = 1;
  trampoline.cljs$lang$applyTo = trampoline__4563.cljs$lang$applyTo;
  return trampoline
}();
cljs.core.rand = function() {
  var rand = null;
  var rand__4568 = function() {
    return rand.call(null, 1)
  };
  var rand__4569 = function(n) {
    return Math.random() * n
  };
  rand = function(n) {
    switch(arguments.length) {
      case 0:
        return rand__4568.call(this);
      case 1:
        return rand__4569.call(this, n)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return rand
}();
cljs.core.rand_int = function rand_int(n) {
  return Math.floor(Math.random() * n)
};
cljs.core.rand_nth = function rand_nth(coll) {
  return cljs.core.nth.call(null, coll, cljs.core.rand_int.call(null, cljs.core.count.call(null, coll)))
};
cljs.core.group_by = function group_by(f, coll) {
  return cljs.core.reduce.call(null, function(ret, x) {
    var k__4571 = f.call(null, x);
    return cljs.core.assoc.call(null, ret, k__4571, cljs.core.conj.call(null, cljs.core.get.call(null, ret, k__4571, cljs.core.Vector.fromArray([])), x))
  }, cljs.core.ObjMap.fromObject([], {}), coll)
};
cljs.core.make_hierarchy = function make_hierarchy() {
  return cljs.core.ObjMap.fromObject(["\ufdd0'parents", "\ufdd0'descendants", "\ufdd0'ancestors"], {"\ufdd0'parents":cljs.core.ObjMap.fromObject([], {}), "\ufdd0'descendants":cljs.core.ObjMap.fromObject([], {}), "\ufdd0'ancestors":cljs.core.ObjMap.fromObject([], {})})
};
cljs.core.global_hierarchy = cljs.core.atom.call(null, cljs.core.make_hierarchy.call(null));
cljs.core.isa_QMARK_ = function() {
  var isa_QMARK_ = null;
  var isa_QMARK___4580 = function(child, parent) {
    return isa_QMARK_.call(null, cljs.core.deref.call(null, cljs.core.global_hierarchy), child, parent)
  };
  var isa_QMARK___4581 = function(h, child, parent) {
    var or__3548__auto____4572 = cljs.core._EQ_.call(null, child, parent);
    if(cljs.core.truth_(or__3548__auto____4572)) {
      return or__3548__auto____4572
    }else {
      var or__3548__auto____4573 = cljs.core.contains_QMARK_.call(null, "\ufdd0'ancestors".call(null, h).call(null, child), parent);
      if(cljs.core.truth_(or__3548__auto____4573)) {
        return or__3548__auto____4573
      }else {
        var and__3546__auto____4574 = cljs.core.vector_QMARK_.call(null, parent);
        if(cljs.core.truth_(and__3546__auto____4574)) {
          var and__3546__auto____4575 = cljs.core.vector_QMARK_.call(null, child);
          if(cljs.core.truth_(and__3546__auto____4575)) {
            var and__3546__auto____4576 = cljs.core._EQ_.call(null, cljs.core.count.call(null, parent), cljs.core.count.call(null, child));
            if(cljs.core.truth_(and__3546__auto____4576)) {
              var ret__4577 = true;
              var i__4578 = 0;
              while(true) {
                if(cljs.core.truth_(function() {
                  var or__3548__auto____4579 = cljs.core.not.call(null, ret__4577);
                  if(cljs.core.truth_(or__3548__auto____4579)) {
                    return or__3548__auto____4579
                  }else {
                    return cljs.core._EQ_.call(null, i__4578, cljs.core.count.call(null, parent))
                  }
                }())) {
                  return ret__4577
                }else {
                  var G__4583 = isa_QMARK_.call(null, h, child.call(null, i__4578), parent.call(null, i__4578));
                  var G__4584 = i__4578 + 1;
                  ret__4577 = G__4583;
                  i__4578 = G__4584;
                  continue
                }
                break
              }
            }else {
              return and__3546__auto____4576
            }
          }else {
            return and__3546__auto____4575
          }
        }else {
          return and__3546__auto____4574
        }
      }
    }
  };
  isa_QMARK_ = function(h, child, parent) {
    switch(arguments.length) {
      case 2:
        return isa_QMARK___4580.call(this, h, child);
      case 3:
        return isa_QMARK___4581.call(this, h, child, parent)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return isa_QMARK_
}();
cljs.core.parents = function() {
  var parents = null;
  var parents__4585 = function(tag) {
    return parents.call(null, cljs.core.deref.call(null, cljs.core.global_hierarchy), tag)
  };
  var parents__4586 = function(h, tag) {
    return cljs.core.not_empty.call(null, cljs.core.get.call(null, "\ufdd0'parents".call(null, h), tag))
  };
  parents = function(h, tag) {
    switch(arguments.length) {
      case 1:
        return parents__4585.call(this, h);
      case 2:
        return parents__4586.call(this, h, tag)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return parents
}();
cljs.core.ancestors = function() {
  var ancestors = null;
  var ancestors__4588 = function(tag) {
    return ancestors.call(null, cljs.core.deref.call(null, cljs.core.global_hierarchy), tag)
  };
  var ancestors__4589 = function(h, tag) {
    return cljs.core.not_empty.call(null, cljs.core.get.call(null, "\ufdd0'ancestors".call(null, h), tag))
  };
  ancestors = function(h, tag) {
    switch(arguments.length) {
      case 1:
        return ancestors__4588.call(this, h);
      case 2:
        return ancestors__4589.call(this, h, tag)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return ancestors
}();
cljs.core.descendants = function() {
  var descendants = null;
  var descendants__4591 = function(tag) {
    return descendants.call(null, cljs.core.deref.call(null, cljs.core.global_hierarchy), tag)
  };
  var descendants__4592 = function(h, tag) {
    return cljs.core.not_empty.call(null, cljs.core.get.call(null, "\ufdd0'descendants".call(null, h), tag))
  };
  descendants = function(h, tag) {
    switch(arguments.length) {
      case 1:
        return descendants__4591.call(this, h);
      case 2:
        return descendants__4592.call(this, h, tag)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return descendants
}();
cljs.core.derive = function() {
  var derive = null;
  var derive__4602 = function(tag, parent) {
    if(cljs.core.truth_(cljs.core.namespace.call(null, parent))) {
    }else {
      throw new Error(cljs.core.str.call(null, "Assert failed: ", cljs.core.pr_str.call(null, cljs.core.with_meta(cljs.core.list("\ufdd1'namespace", "\ufdd1'parent"), cljs.core.hash_map("\ufdd0'line", 3353)))));
    }
    cljs.core.swap_BANG_.call(null, cljs.core.global_hierarchy, derive, tag, parent);
    return null
  };
  var derive__4603 = function(h, tag, parent) {
    if(cljs.core.truth_(cljs.core.not_EQ_.call(null, tag, parent))) {
    }else {
      throw new Error(cljs.core.str.call(null, "Assert failed: ", cljs.core.pr_str.call(null, cljs.core.with_meta(cljs.core.list("\ufdd1'not=", "\ufdd1'tag", "\ufdd1'parent"), cljs.core.hash_map("\ufdd0'line", 3357)))));
    }
    var tp__4597 = "\ufdd0'parents".call(null, h);
    var td__4598 = "\ufdd0'descendants".call(null, h);
    var ta__4599 = "\ufdd0'ancestors".call(null, h);
    var tf__4600 = function(m, source, sources, target, targets) {
      return cljs.core.reduce.call(null, function(ret, k) {
        return cljs.core.assoc.call(null, ret, k, cljs.core.reduce.call(null, cljs.core.conj, cljs.core.get.call(null, targets, k, cljs.core.set([])), cljs.core.cons.call(null, target, targets.call(null, target))))
      }, m, cljs.core.cons.call(null, source, sources.call(null, source)))
    };
    var or__3548__auto____4601 = cljs.core.truth_(cljs.core.contains_QMARK_.call(null, tp__4597.call(null, tag), parent)) ? null : function() {
      if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null, ta__4599.call(null, tag), parent))) {
        throw new Error(cljs.core.str.call(null, tag, "already has", parent, "as ancestor"));
      }else {
      }
      if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null, ta__4599.call(null, parent), tag))) {
        throw new Error(cljs.core.str.call(null, "Cyclic derivation:", parent, "has", tag, "as ancestor"));
      }else {
      }
      return cljs.core.ObjMap.fromObject(["\ufdd0'parents", "\ufdd0'ancestors", "\ufdd0'descendants"], {"\ufdd0'parents":cljs.core.assoc.call(null, "\ufdd0'parents".call(null, h), tag, cljs.core.conj.call(null, cljs.core.get.call(null, tp__4597, tag, cljs.core.set([])), parent)), "\ufdd0'ancestors":tf__4600.call(null, "\ufdd0'ancestors".call(null, h), tag, td__4598, parent, ta__4599), "\ufdd0'descendants":tf__4600.call(null, "\ufdd0'descendants".call(null, h), parent, ta__4599, tag, td__4598)})
    }();
    if(cljs.core.truth_(or__3548__auto____4601)) {
      return or__3548__auto____4601
    }else {
      return h
    }
  };
  derive = function(h, tag, parent) {
    switch(arguments.length) {
      case 2:
        return derive__4602.call(this, h, tag);
      case 3:
        return derive__4603.call(this, h, tag, parent)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return derive
}();
cljs.core.underive = function() {
  var underive = null;
  var underive__4609 = function(tag, parent) {
    cljs.core.swap_BANG_.call(null, cljs.core.global_hierarchy, underive, tag, parent);
    return null
  };
  var underive__4610 = function(h, tag, parent) {
    var parentMap__4605 = "\ufdd0'parents".call(null, h);
    var childsParents__4606 = cljs.core.truth_(parentMap__4605.call(null, tag)) ? cljs.core.disj.call(null, parentMap__4605.call(null, tag), parent) : cljs.core.set([]);
    var newParents__4607 = cljs.core.truth_(cljs.core.not_empty.call(null, childsParents__4606)) ? cljs.core.assoc.call(null, parentMap__4605, tag, childsParents__4606) : cljs.core.dissoc.call(null, parentMap__4605, tag);
    var deriv_seq__4608 = cljs.core.flatten.call(null, cljs.core.map.call(null, function(p1__4594_SHARP_) {
      return cljs.core.cons.call(null, cljs.core.first.call(null, p1__4594_SHARP_), cljs.core.interpose.call(null, cljs.core.first.call(null, p1__4594_SHARP_), cljs.core.second.call(null, p1__4594_SHARP_)))
    }, cljs.core.seq.call(null, newParents__4607)));
    if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null, parentMap__4605.call(null, tag), parent))) {
      return cljs.core.reduce.call(null, function(p1__4595_SHARP_, p2__4596_SHARP_) {
        return cljs.core.apply.call(null, cljs.core.derive, p1__4595_SHARP_, p2__4596_SHARP_)
      }, cljs.core.make_hierarchy.call(null), cljs.core.partition.call(null, 2, deriv_seq__4608))
    }else {
      return h
    }
  };
  underive = function(h, tag, parent) {
    switch(arguments.length) {
      case 2:
        return underive__4609.call(this, h, tag);
      case 3:
        return underive__4610.call(this, h, tag, parent)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return underive
}();
cljs.core.reset_cache = function reset_cache(method_cache, method_table, cached_hierarchy, hierarchy) {
  cljs.core.swap_BANG_.call(null, method_cache, function(_) {
    return cljs.core.deref.call(null, method_table)
  });
  return cljs.core.swap_BANG_.call(null, cached_hierarchy, function(_) {
    return cljs.core.deref.call(null, hierarchy)
  })
};
cljs.core.prefers_STAR_ = function prefers_STAR_(x, y, prefer_table) {
  var xprefs__4612 = cljs.core.deref.call(null, prefer_table).call(null, x);
  var or__3548__auto____4614 = cljs.core.truth_(function() {
    var and__3546__auto____4613 = xprefs__4612;
    if(cljs.core.truth_(and__3546__auto____4613)) {
      return xprefs__4612.call(null, y)
    }else {
      return and__3546__auto____4613
    }
  }()) ? true : null;
  if(cljs.core.truth_(or__3548__auto____4614)) {
    return or__3548__auto____4614
  }else {
    var or__3548__auto____4616 = function() {
      var ps__4615 = cljs.core.parents.call(null, y);
      while(true) {
        if(cljs.core.truth_(cljs.core.count.call(null, ps__4615) > 0)) {
          if(cljs.core.truth_(prefers_STAR_.call(null, x, cljs.core.first.call(null, ps__4615), prefer_table))) {
          }else {
          }
          var G__4619 = cljs.core.rest.call(null, ps__4615);
          ps__4615 = G__4619;
          continue
        }else {
          return null
        }
        break
      }
    }();
    if(cljs.core.truth_(or__3548__auto____4616)) {
      return or__3548__auto____4616
    }else {
      var or__3548__auto____4618 = function() {
        var ps__4617 = cljs.core.parents.call(null, x);
        while(true) {
          if(cljs.core.truth_(cljs.core.count.call(null, ps__4617) > 0)) {
            if(cljs.core.truth_(prefers_STAR_.call(null, cljs.core.first.call(null, ps__4617), y, prefer_table))) {
            }else {
            }
            var G__4620 = cljs.core.rest.call(null, ps__4617);
            ps__4617 = G__4620;
            continue
          }else {
            return null
          }
          break
        }
      }();
      if(cljs.core.truth_(or__3548__auto____4618)) {
        return or__3548__auto____4618
      }else {
        return false
      }
    }
  }
};
cljs.core.dominates = function dominates(x, y, prefer_table) {
  var or__3548__auto____4621 = cljs.core.prefers_STAR_.call(null, x, y, prefer_table);
  if(cljs.core.truth_(or__3548__auto____4621)) {
    return or__3548__auto____4621
  }else {
    return cljs.core.isa_QMARK_.call(null, x, y)
  }
};
cljs.core.find_and_cache_best_method = function find_and_cache_best_method(name, dispatch_val, hierarchy, method_table, prefer_table, method_cache, cached_hierarchy) {
  var best_entry__4630 = cljs.core.reduce.call(null, function(be, p__4622) {
    var vec__4623__4624 = p__4622;
    var k__4625 = cljs.core.nth.call(null, vec__4623__4624, 0, null);
    var ___4626 = cljs.core.nth.call(null, vec__4623__4624, 1, null);
    var e__4627 = vec__4623__4624;
    if(cljs.core.truth_(cljs.core.isa_QMARK_.call(null, dispatch_val, k__4625))) {
      var be2__4629 = cljs.core.truth_(function() {
        var or__3548__auto____4628 = cljs.core.nil_QMARK_.call(null, be);
        if(cljs.core.truth_(or__3548__auto____4628)) {
          return or__3548__auto____4628
        }else {
          return cljs.core.dominates.call(null, k__4625, cljs.core.first.call(null, be), prefer_table)
        }
      }()) ? e__4627 : be;
      if(cljs.core.truth_(cljs.core.dominates.call(null, cljs.core.first.call(null, be2__4629), k__4625, prefer_table))) {
      }else {
        throw new Error(cljs.core.str.call(null, "Multiple methods in multimethod '", name, "' match dispatch value: ", dispatch_val, " -> ", k__4625, " and ", cljs.core.first.call(null, be2__4629), ", and neither is preferred"));
      }
      return be2__4629
    }else {
      return be
    }
  }, null, cljs.core.deref.call(null, method_table));
  if(cljs.core.truth_(best_entry__4630)) {
    if(cljs.core.truth_(cljs.core._EQ_.call(null, cljs.core.deref.call(null, cached_hierarchy), cljs.core.deref.call(null, hierarchy)))) {
      cljs.core.swap_BANG_.call(null, method_cache, cljs.core.assoc, dispatch_val, cljs.core.second.call(null, best_entry__4630));
      return cljs.core.second.call(null, best_entry__4630)
    }else {
      cljs.core.reset_cache.call(null, method_cache, method_table, cached_hierarchy, hierarchy);
      return find_and_cache_best_method.call(null, name, dispatch_val, hierarchy, method_table, prefer_table, method_cache, cached_hierarchy)
    }
  }else {
    return null
  }
};
cljs.core.IMultiFn = {};
cljs.core._reset = function _reset(mf) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____4631 = mf;
    if(cljs.core.truth_(and__3546__auto____4631)) {
      return mf.cljs$core$IMultiFn$_reset
    }else {
      return and__3546__auto____4631
    }
  }())) {
    return mf.cljs$core$IMultiFn$_reset(mf)
  }else {
    return function() {
      var or__3548__auto____4632 = cljs.core._reset[goog.typeOf.call(null, mf)];
      if(cljs.core.truth_(or__3548__auto____4632)) {
        return or__3548__auto____4632
      }else {
        var or__3548__auto____4633 = cljs.core._reset["_"];
        if(cljs.core.truth_(or__3548__auto____4633)) {
          return or__3548__auto____4633
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-reset", mf);
        }
      }
    }().call(null, mf)
  }
};
cljs.core._add_method = function _add_method(mf, dispatch_val, method) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____4634 = mf;
    if(cljs.core.truth_(and__3546__auto____4634)) {
      return mf.cljs$core$IMultiFn$_add_method
    }else {
      return and__3546__auto____4634
    }
  }())) {
    return mf.cljs$core$IMultiFn$_add_method(mf, dispatch_val, method)
  }else {
    return function() {
      var or__3548__auto____4635 = cljs.core._add_method[goog.typeOf.call(null, mf)];
      if(cljs.core.truth_(or__3548__auto____4635)) {
        return or__3548__auto____4635
      }else {
        var or__3548__auto____4636 = cljs.core._add_method["_"];
        if(cljs.core.truth_(or__3548__auto____4636)) {
          return or__3548__auto____4636
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-add-method", mf);
        }
      }
    }().call(null, mf, dispatch_val, method)
  }
};
cljs.core._remove_method = function _remove_method(mf, dispatch_val) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____4637 = mf;
    if(cljs.core.truth_(and__3546__auto____4637)) {
      return mf.cljs$core$IMultiFn$_remove_method
    }else {
      return and__3546__auto____4637
    }
  }())) {
    return mf.cljs$core$IMultiFn$_remove_method(mf, dispatch_val)
  }else {
    return function() {
      var or__3548__auto____4638 = cljs.core._remove_method[goog.typeOf.call(null, mf)];
      if(cljs.core.truth_(or__3548__auto____4638)) {
        return or__3548__auto____4638
      }else {
        var or__3548__auto____4639 = cljs.core._remove_method["_"];
        if(cljs.core.truth_(or__3548__auto____4639)) {
          return or__3548__auto____4639
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-remove-method", mf);
        }
      }
    }().call(null, mf, dispatch_val)
  }
};
cljs.core._prefer_method = function _prefer_method(mf, dispatch_val, dispatch_val_y) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____4640 = mf;
    if(cljs.core.truth_(and__3546__auto____4640)) {
      return mf.cljs$core$IMultiFn$_prefer_method
    }else {
      return and__3546__auto____4640
    }
  }())) {
    return mf.cljs$core$IMultiFn$_prefer_method(mf, dispatch_val, dispatch_val_y)
  }else {
    return function() {
      var or__3548__auto____4641 = cljs.core._prefer_method[goog.typeOf.call(null, mf)];
      if(cljs.core.truth_(or__3548__auto____4641)) {
        return or__3548__auto____4641
      }else {
        var or__3548__auto____4642 = cljs.core._prefer_method["_"];
        if(cljs.core.truth_(or__3548__auto____4642)) {
          return or__3548__auto____4642
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-prefer-method", mf);
        }
      }
    }().call(null, mf, dispatch_val, dispatch_val_y)
  }
};
cljs.core._get_method = function _get_method(mf, dispatch_val) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____4643 = mf;
    if(cljs.core.truth_(and__3546__auto____4643)) {
      return mf.cljs$core$IMultiFn$_get_method
    }else {
      return and__3546__auto____4643
    }
  }())) {
    return mf.cljs$core$IMultiFn$_get_method(mf, dispatch_val)
  }else {
    return function() {
      var or__3548__auto____4644 = cljs.core._get_method[goog.typeOf.call(null, mf)];
      if(cljs.core.truth_(or__3548__auto____4644)) {
        return or__3548__auto____4644
      }else {
        var or__3548__auto____4645 = cljs.core._get_method["_"];
        if(cljs.core.truth_(or__3548__auto____4645)) {
          return or__3548__auto____4645
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-get-method", mf);
        }
      }
    }().call(null, mf, dispatch_val)
  }
};
cljs.core._methods = function _methods(mf) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____4646 = mf;
    if(cljs.core.truth_(and__3546__auto____4646)) {
      return mf.cljs$core$IMultiFn$_methods
    }else {
      return and__3546__auto____4646
    }
  }())) {
    return mf.cljs$core$IMultiFn$_methods(mf)
  }else {
    return function() {
      var or__3548__auto____4647 = cljs.core._methods[goog.typeOf.call(null, mf)];
      if(cljs.core.truth_(or__3548__auto____4647)) {
        return or__3548__auto____4647
      }else {
        var or__3548__auto____4648 = cljs.core._methods["_"];
        if(cljs.core.truth_(or__3548__auto____4648)) {
          return or__3548__auto____4648
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-methods", mf);
        }
      }
    }().call(null, mf)
  }
};
cljs.core._prefers = function _prefers(mf) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____4649 = mf;
    if(cljs.core.truth_(and__3546__auto____4649)) {
      return mf.cljs$core$IMultiFn$_prefers
    }else {
      return and__3546__auto____4649
    }
  }())) {
    return mf.cljs$core$IMultiFn$_prefers(mf)
  }else {
    return function() {
      var or__3548__auto____4650 = cljs.core._prefers[goog.typeOf.call(null, mf)];
      if(cljs.core.truth_(or__3548__auto____4650)) {
        return or__3548__auto____4650
      }else {
        var or__3548__auto____4651 = cljs.core._prefers["_"];
        if(cljs.core.truth_(or__3548__auto____4651)) {
          return or__3548__auto____4651
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-prefers", mf);
        }
      }
    }().call(null, mf)
  }
};
cljs.core._dispatch = function _dispatch(mf, args) {
  if(cljs.core.truth_(function() {
    var and__3546__auto____4652 = mf;
    if(cljs.core.truth_(and__3546__auto____4652)) {
      return mf.cljs$core$IMultiFn$_dispatch
    }else {
      return and__3546__auto____4652
    }
  }())) {
    return mf.cljs$core$IMultiFn$_dispatch(mf, args)
  }else {
    return function() {
      var or__3548__auto____4653 = cljs.core._dispatch[goog.typeOf.call(null, mf)];
      if(cljs.core.truth_(or__3548__auto____4653)) {
        return or__3548__auto____4653
      }else {
        var or__3548__auto____4654 = cljs.core._dispatch["_"];
        if(cljs.core.truth_(or__3548__auto____4654)) {
          return or__3548__auto____4654
        }else {
          throw cljs.core.missing_protocol.call(null, "IMultiFn.-dispatch", mf);
        }
      }
    }().call(null, mf, args)
  }
};
cljs.core.do_dispatch = function do_dispatch(mf, dispatch_fn, args) {
  var dispatch_val__4655 = cljs.core.apply.call(null, dispatch_fn, args);
  var target_fn__4656 = cljs.core._get_method.call(null, mf, dispatch_val__4655);
  if(cljs.core.truth_(target_fn__4656)) {
  }else {
    throw new Error(cljs.core.str.call(null, "No method in multimethod '", cljs.core.name, "' for dispatch value: ", dispatch_val__4655));
  }
  return cljs.core.apply.call(null, target_fn__4656, args)
};
cljs.core.MultiFn = function(name, dispatch_fn, default_dispatch_val, hierarchy, method_table, prefer_table, method_cache, cached_hierarchy) {
  this.name = name;
  this.dispatch_fn = dispatch_fn;
  this.default_dispatch_val = default_dispatch_val;
  this.hierarchy = hierarchy;
  this.method_table = method_table;
  this.prefer_table = prefer_table;
  this.method_cache = method_cache;
  this.cached_hierarchy = cached_hierarchy
};
cljs.core.MultiFn.cljs$core$IPrintable$_pr_seq = function(this__360__auto__) {
  return cljs.core.list.call(null, "cljs.core.MultiFn")
};
cljs.core.MultiFn.prototype.cljs$core$IHash$ = true;
cljs.core.MultiFn.prototype.cljs$core$IHash$_hash = function(this$) {
  var this__4657 = this;
  return goog.getUid.call(null, this$)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$ = true;
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_reset = function(mf) {
  var this__4658 = this;
  cljs.core.swap_BANG_.call(null, this__4658.method_table, function(mf) {
    return cljs.core.ObjMap.fromObject([], {})
  });
  cljs.core.swap_BANG_.call(null, this__4658.method_cache, function(mf) {
    return cljs.core.ObjMap.fromObject([], {})
  });
  cljs.core.swap_BANG_.call(null, this__4658.prefer_table, function(mf) {
    return cljs.core.ObjMap.fromObject([], {})
  });
  cljs.core.swap_BANG_.call(null, this__4658.cached_hierarchy, function(mf) {
    return null
  });
  return mf
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_add_method = function(mf, dispatch_val, method) {
  var this__4659 = this;
  cljs.core.swap_BANG_.call(null, this__4659.method_table, cljs.core.assoc, dispatch_val, method);
  cljs.core.reset_cache.call(null, this__4659.method_cache, this__4659.method_table, this__4659.cached_hierarchy, this__4659.hierarchy);
  return mf
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_remove_method = function(mf, dispatch_val) {
  var this__4660 = this;
  cljs.core.swap_BANG_.call(null, this__4660.method_table, cljs.core.dissoc, dispatch_val);
  cljs.core.reset_cache.call(null, this__4660.method_cache, this__4660.method_table, this__4660.cached_hierarchy, this__4660.hierarchy);
  return mf
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_get_method = function(mf, dispatch_val) {
  var this__4661 = this;
  if(cljs.core.truth_(cljs.core._EQ_.call(null, cljs.core.deref.call(null, this__4661.cached_hierarchy), cljs.core.deref.call(null, this__4661.hierarchy)))) {
  }else {
    cljs.core.reset_cache.call(null, this__4661.method_cache, this__4661.method_table, this__4661.cached_hierarchy, this__4661.hierarchy)
  }
  var temp__3695__auto____4662 = cljs.core.deref.call(null, this__4661.method_cache).call(null, dispatch_val);
  if(cljs.core.truth_(temp__3695__auto____4662)) {
    var target_fn__4663 = temp__3695__auto____4662;
    return target_fn__4663
  }else {
    var temp__3695__auto____4664 = cljs.core.find_and_cache_best_method.call(null, this__4661.name, dispatch_val, this__4661.hierarchy, this__4661.method_table, this__4661.prefer_table, this__4661.method_cache, this__4661.cached_hierarchy);
    if(cljs.core.truth_(temp__3695__auto____4664)) {
      var target_fn__4665 = temp__3695__auto____4664;
      return target_fn__4665
    }else {
      return cljs.core.deref.call(null, this__4661.method_table).call(null, this__4661.default_dispatch_val)
    }
  }
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_prefer_method = function(mf, dispatch_val_x, dispatch_val_y) {
  var this__4666 = this;
  if(cljs.core.truth_(cljs.core.prefers_STAR_.call(null, dispatch_val_x, dispatch_val_y, this__4666.prefer_table))) {
    throw new Error(cljs.core.str.call(null, "Preference conflict in multimethod '", this__4666.name, "': ", dispatch_val_y, " is already preferred to ", dispatch_val_x));
  }else {
  }
  cljs.core.swap_BANG_.call(null, this__4666.prefer_table, function(old) {
    return cljs.core.assoc.call(null, old, dispatch_val_x, cljs.core.conj.call(null, cljs.core.get.call(null, old, dispatch_val_x, cljs.core.set([])), dispatch_val_y))
  });
  return cljs.core.reset_cache.call(null, this__4666.method_cache, this__4666.method_table, this__4666.cached_hierarchy, this__4666.hierarchy)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_methods = function(mf) {
  var this__4667 = this;
  return cljs.core.deref.call(null, this__4667.method_table)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_prefers = function(mf) {
  var this__4668 = this;
  return cljs.core.deref.call(null, this__4668.prefer_table)
};
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_dispatch = function(mf, args) {
  var this__4669 = this;
  return cljs.core.do_dispatch.call(null, mf, this__4669.dispatch_fn, args)
};
cljs.core.MultiFn;
cljs.core.MultiFn.prototype.call = function() {
  var G__4670__delegate = function(_, args) {
    return cljs.core._dispatch.call(null, this, args)
  };
  var G__4670 = function(_, var_args) {
    var args = null;
    if(goog.isDef(var_args)) {
      args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1), 0)
    }
    return G__4670__delegate.call(this, _, args)
  };
  G__4670.cljs$lang$maxFixedArity = 1;
  G__4670.cljs$lang$applyTo = function(arglist__4671) {
    var _ = cljs.core.first(arglist__4671);
    var args = cljs.core.rest(arglist__4671);
    return G__4670__delegate.call(this, _, args)
  };
  return G__4670
}();
cljs.core.MultiFn.prototype.apply = function(_, args) {
  return cljs.core._dispatch.call(null, this, args)
};
cljs.core.remove_all_methods = function remove_all_methods(multifn) {
  return cljs.core._reset.call(null, multifn)
};
cljs.core.remove_method = function remove_method(multifn, dispatch_val) {
  return cljs.core._remove_method.call(null, multifn, dispatch_val)
};
cljs.core.prefer_method = function prefer_method(multifn, dispatch_val_x, dispatch_val_y) {
  return cljs.core._prefer_method.call(null, multifn, dispatch_val_x, dispatch_val_y)
};
cljs.core.methods$ = function methods$(multifn) {
  return cljs.core._methods.call(null, multifn)
};
cljs.core.get_method = function get_method(multifn, dispatch_val) {
  return cljs.core._get_method.call(null, multifn, dispatch_val)
};
cljs.core.prefers = function prefers(multifn) {
  return cljs.core._prefers.call(null, multifn)
};
goog.provide("persistent_data_structures.utils");
goog.require("cljs.core");
persistent_data_structures.utils.unsigned_bit_shift_right = function unsigned_bit_shift_right(x, n) {
  return 4026531839 & x >> n
};
persistent_data_structures.utils.copy_array = function copy_array(from_array, to_array) {
  var c__2972 = cljs.core.count.call(null, from_array);
  while(true) {
    if(cljs.core.truth_(c__2972 > 0)) {
      to_array[c__2972 - 1] = from_array[c__2972 - 1];
      var G__2973 = c__2972 - 1;
      c__2972 = G__2973;
      continue
    }else {
    }
    break
  }
  return to_array
};
goog.provide("persistent_data_structures.vector");
goog.require("cljs.core");
goog.require("persistent_data_structures.utils");
persistent_data_structures.vector.VectorNode = function(array) {
  this.array = array
};
persistent_data_structures.vector.VectorNode.cljs$core$IPrintable$_pr_seq = function(this__361__auto__) {
  return cljs.core.list.call(null, "persistent_data_structures.vector.VectorNode")
};
persistent_data_structures.vector.VectorNode;
persistent_data_structures.vector.empty_node = new persistent_data_structures.vector.VectorNode(cljs.core.array.call(null, 32));
persistent_data_structures.vector.array_for = function array_for(vec, i) {
  var cnt__3224 = vec.cnt;
  var root__3225 = vec.root;
  var shift__3226 = vec.shift;
  var tail__3227 = vec.tail;
  var tailoff__3228 = cljs.core.truth_(cnt__3224 < 32) ? 0 : persistent_data_structures.utils.unsigned_bit_shift_right.call(null, cnt__3224 - 1, 5) << 5;
  if(cljs.core.truth_(function() {
    var and__3546__auto____3229 = i >= 0;
    if(cljs.core.truth_(and__3546__auto____3229)) {
      return i < cnt__3224
    }else {
      return and__3546__auto____3229
    }
  }())) {
    if(cljs.core.truth_(i >= tailoff__3228)) {
      return tail__3227
    }else {
      var node__3230 = root__3225;
      var level__3231 = shift__3226;
      while(true) {
        var arr__3232 = node__3230.array;
        if(cljs.core.truth_(level__3231 <= 0)) {
          return arr__3232
        }else {
          var new_node__3233 = arr__3232[persistent_data_structures.utils.unsigned_bit_shift_right.call(null, i, level__3231) & 31];
          var G__3234 = new_node__3233;
          var G__3235 = level__3231 - 5;
          node__3230 = G__3234;
          level__3231 = G__3235;
          continue
        }
        break
      }
    }
  }else {
    throw new persistent_data_structures.vector.IndexOutOfBoundsException;
  }
};
persistent_data_structures.vector.ChunkedVector = function(vec, node, i, offset, _meta) {
  this.vec = vec;
  this.node = node;
  this.i = i;
  this.offset = offset;
  this._meta = _meta
};
persistent_data_structures.vector.ChunkedVector.cljs$core$IPrintable$_pr_seq = function(this__360__auto__) {
  return cljs.core.list.call(null, "persistent_data_structures.vector.ChunkedVector")
};
persistent_data_structures.vector.ChunkedVector.prototype.cljs$core$IWithMeta$ = true;
persistent_data_structures.vector.ChunkedVector.prototype.cljs$core$IWithMeta$_with_meta = function(this$, m) {
  var this__3238 = this;
  return new persistent_data_structures.vector.ChunkedVector(this__3238.vec, this__3238.node, this__3238.i, this__3238.offset, m)
};
persistent_data_structures.vector.ChunkedVector.prototype.cljs$core$IMeta$ = true;
persistent_data_structures.vector.ChunkedVector.prototype.cljs$core$IMeta$_meta = function(this$) {
  var this__3239 = this;
  return this__3239._meta
};
persistent_data_structures.vector.ChunkedVector.prototype.cljs$core$ISeqable$ = true;
persistent_data_structures.vector.ChunkedVector.prototype.cljs$core$ISeqable$_seq = function(this$) {
  var this__3240 = this;
  return this$
};
persistent_data_structures.vector.ChunkedVector.prototype.cljs$core$ISeq$ = true;
persistent_data_structures.vector.ChunkedVector.prototype.cljs$core$ISeq$_first = function(this$) {
  var this__3241 = this;
  return this__3241.node[this__3241.offset]
};
persistent_data_structures.vector.ChunkedVector.prototype.cljs$core$ISeq$_rest = function(this$) {
  var this__3242 = this;
  if(cljs.core.truth_(this__3242.offset + 1 < cljs.core.count.call(null, this__3242.node))) {
    return new persistent_data_structures.vector.ChunkedVector(this__3242.vec, this__3242.node, this__3242.i, this__3242.offset + 1, this__3242._meta)
  }else {
    if(cljs.core.truth_(this__3242.i + cljs.core.count.call(null, this__3242.node) < cljs.core._count.call(null, this__3242.vec))) {
      return new persistent_data_structures.vector.ChunkedVector(this__3242.vec, persistent_data_structures.vector.array_for.call(null, this__3242.vec, this__3242.i + cljs.core.count.call(null, this__3242.node)), this__3242.i + cljs.core.count.call(null, this__3242.node), 0, this__3242._meta)
    }else {
      return null
    }
  }
};
persistent_data_structures.vector.ChunkedVector;
persistent_data_structures.vector.PVector = function(cnt, shift, root, tail, _meta) {
  this.cnt = cnt;
  this.shift = shift;
  this.root = root;
  this.tail = tail;
  this._meta = _meta
};
persistent_data_structures.vector.PVector.cljs$core$IPrintable$_pr_seq = function(this__360__auto__) {
  return cljs.core.list.call(null, "persistent_data_structures.vector.PVector")
};
persistent_data_structures.vector.PVector.prototype.cljs$core$IHash$ = true;
persistent_data_structures.vector.PVector.prototype.cljs$core$IHash$_hash = function(this$) {
  var this__3244 = this;
  return cljs.core.reduce.call(null, function(p1__3236_SHARP_, p2__3237_SHARP_) {
    return 31 * p1__3236_SHARP_ + cljs.core.hash.call(null, p2__3237_SHARP_)
  }, cljs.core._seq.call(null, this$))
};
persistent_data_structures.vector.PVector.prototype.cljs$core$IAssociative$ = true;
persistent_data_structures.vector.PVector.prototype.cljs$core$IAssociative$_contains_key = function(this$, key) {
  var this__3245 = this;
  var and__3546__auto____3246 = cljs.core.integer_QMARK_.call(null, key);
  if(cljs.core.truth_(and__3546__auto____3246)) {
    var and__3546__auto____3247 = key >= 0;
    if(cljs.core.truth_(and__3546__auto____3247)) {
      return key < this__3245.cnt
    }else {
      return and__3546__auto____3247
    }
  }else {
    return and__3546__auto____3246
  }
};
persistent_data_structures.vector.PVector.prototype.cljs$core$IFn$ = true;
persistent_data_structures.vector.PVector.prototype.call = function() {
  var G__3306 = null;
  var G__3306__3307 = function(this$, k) {
    var this__3248 = this;
    this$ = this;
    return cljs.core._nth.call(null, this$, k)
  };
  var G__3306__3308 = function(this$, k, not_found) {
    var this__3249 = this;
    this$ = this;
    return cljs.core._nth.call(null, this$, k, not_found)
  };
  G__3306 = function(this$, k, not_found) {
    switch(arguments.length) {
      case 2:
        return G__3306__3307.call(this, this$, k);
      case 3:
        return G__3306__3308.call(this, this$, k, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__3306
}();
persistent_data_structures.vector.PVector.prototype.cljs$core$ICollection$ = true;
persistent_data_structures.vector.PVector.prototype.cljs$core$ICollection$_conj = function(this$, o) {
  var this__3250 = this;
  var tailoff__3251 = cljs.core.truth_(this__3250.cnt < 32) ? 0 : persistent_data_structures.utils.unsigned_bit_shift_right.call(null, this__3250.cnt - 1, 5) << 5;
  if(cljs.core.truth_(this__3250.cnt - tailoff__3251 < 32)) {
    var tail_count__3252 = cljs.core.count.call(null, this__3250.tail);
    var new_tail__3253 = cljs.core.array.call(null, tail_count__3252 + 1);
    var ___3254 = persistent_data_structures.utils.copy_array.call(null, this__3250.tail, new_tail__3253);
    var ___3255 = new_tail__3253[tail_count__3252] = o;
    return new persistent_data_structures.vector.PVector(this__3250.cnt + 1, this__3250.shift, this__3250.root, new_tail__3253, this__3250._meta)
  }else {
    var tail_node__3257 = new persistent_data_structures.vector.VectorNode(this__3250.tail);
    var overflow_root_QMARK___3258 = persistent_data_structures.utils.unsigned_bit_shift_right.call(null, this__3250.cnt, 5) > 1 << this__3250.shift;
    var new_path__3262 = function new_path(level, node) {
      if(cljs.core.truth_(cljs.core._EQ_.call(null, level, 0))) {
        return node
      }else {
        var new_array__3259 = cljs.core.array.call(null, 32);
        var ret__3260 = new persistent_data_structures.vector.VectorNode(new_array__3259);
        var ___3261 = new_array__3259[0] = new_path.call(null, level - 5, node);
        return ret__3260
      }
    };
    var push_tail__3271 = function push_tail(level, parent, tail_node) {
      var subidx__3263 = persistent_data_structures.utils.unsigned_bit_shift_right.call(null, this__3250.cnt - 1, level) & 31;
      var parent_array__3264 = parent.array;
      var new_arr__3265 = cljs.core.array.call(null, cljs.core.count.call(null, parent_array__3264));
      var ___3266 = persistent_data_structures.utils.copy_array.call(null, parent_array__3264, new_arr__3265);
      var ret__3267 = new persistent_data_structures.vector.VectorNode(new_arr__3265);
      var node_to_insert__3269 = cljs.core.truth_(cljs.core._EQ_.call(null, level, 5)) ? tail_node : function() {
        var child__3268 = parent_array__3264[subidx__3263];
        if(cljs.core.truth_(child__3268)) {
          return push_tail.call(null, level - 5, child__3268, tail_node)
        }else {
          return new_path__3262.call(null, level - 5, tail_node)
        }
      }();
      var ___3270 = new_arr__3265[subidx__3263] = node_to_insert__3269;
      return ret__3267
    };
    var vec__3256__3275 = cljs.core.truth_(overflow_root_QMARK___3258) ? function() {
      var new_root_array__3272 = cljs.core.array.call(null, 32);
      var ___3273 = new_root_array__3272[0] = this__3250.root;
      var ___3274 = new_root_array__3272[1] = new_path__3262.call(null, this__3250.shift, tail_node__3257);
      return cljs.core.Vector.fromArray([this__3250.shift + 5, new persistent_data_structures.vector.VectorNode(new_root_array__3272)])
    }() : cljs.core.Vector.fromArray([this__3250.shift, push_tail__3271.call(null, this__3250.shift, this__3250.root, tail_node__3257)]);
    var new_shift__3276 = cljs.core.nth.call(null, vec__3256__3275, 0, null);
    var new_root__3277 = cljs.core.nth.call(null, vec__3256__3275, 1, null);
    return new persistent_data_structures.vector.PVector(this__3250.cnt + 1, new_shift__3276, new_root__3277, cljs.core.to_array.call(null, cljs.core.list.call(null, o)), this__3250._meta)
  }
};
persistent_data_structures.vector.PVector.prototype.cljs$core$ISeqable$ = true;
persistent_data_structures.vector.PVector.prototype.cljs$core$ISeqable$_seq = function(this$) {
  var this__3278 = this;
  return new persistent_data_structures.vector.ChunkedVector(this$, persistent_data_structures.vector.array_for.call(null, this$, 0), 0, 0, cljs.core.ObjMap.fromObject([], {}))
};
persistent_data_structures.vector.PVector.prototype.cljs$core$ICounted$ = true;
persistent_data_structures.vector.PVector.prototype.cljs$core$ICounted$_count = function(this$) {
  var this__3279 = this;
  return this__3279.cnt
};
persistent_data_structures.vector.PVector.prototype.cljs$core$IStack$ = true;
persistent_data_structures.vector.PVector.prototype.cljs$core$IStack$_peek = function(this$) {
  var this__3280 = this;
  if(cljs.core.truth_(cljs.core._count.call(null, this$) > 0)) {
    return cljs.core._nth.call(null, this$, this__3280.cnt - 1)
  }else {
    return null
  }
};
persistent_data_structures.vector.PVector.prototype.cljs$core$IStack$_pop = function(this$) {
  var this__3281 = this;
  throw new persistent_data_structures.vector.UnsupportedOperationException;
};
persistent_data_structures.vector.PVector.prototype.cljs$core$IVector$ = true;
persistent_data_structures.vector.PVector.prototype.cljs$core$IVector$_assoc_n = function(this$, i, val) {
  var this__3282 = this;
  var tailoff__3283 = cljs.core.truth_(this__3282.cnt < 32) ? 0 : persistent_data_structures.utils.unsigned_bit_shift_right.call(null, this__3282.cnt - 1, 5) << 5;
  if(cljs.core.truth_(function() {
    var and__3546__auto____3284 = i >= 0;
    if(cljs.core.truth_(and__3546__auto____3284)) {
      return i < this__3282.cnt
    }else {
      return and__3546__auto____3284
    }
  }())) {
    if(cljs.core.truth_(i >= tailoff__3283)) {
      var new_tail__3285 = cljs.core.array.call(null, cljs.core.count.call(null, this__3282.tail));
      var ___3286 = persistent_data_structures.utils.copy_array.call(null, this__3282.tail, new_tail__3285);
      var ___3287 = new_tail__3285[i & 31] = val;
      return new persistent_data_structures.vector.PVector(this__3282.cnt, this__3282.shift, this__3282.root, new_tail__3285, this__3282._meta)
    }else {
      var do_assoc__3293 = function do_assoc(level, node, i, val) {
        var node_array__3288 = node.array;
        var new_array__3289 = cljs.core.array.call(null, cljs.core.count.call(null, node_array__3288));
        var ___3290 = persistent_data_structures.utils.copy_array.call(null, node_array__3288, new_array__3289);
        var new_node__3291 = new persistent_data_structures.vector.VectorNode(new_array__3289);
        if(cljs.core.truth_(cljs.core._EQ_.call(null, level, 0))) {
          new_array__3289[i & 31] = val;
          return new_node__3291
        }else {
          var subidx__3292 = persistent_data_structures.utils.unsigned_bit_shift_right.call(null, i, level) & 31;
          new_array__3289[subidx__3292] = do_assoc.call(null, level - 5, node_array__3288[subidx__3292], i, val);
          return new_node__3291
        }
      };
      return new persistent_data_structures.vector.PVector(this__3282.cnt, this__3282.shift, do_assoc__3293.call(null, this__3282.shift, this__3282.root, i, val), this__3282.tail, this__3282._meta)
    }
  }else {
    if(cljs.core.truth_(cljs.core._EQ_.call(null, i, this__3282.cnt))) {
      return cljs.core._conj.call(null, this$, val)
    }else {
      if(cljs.core.truth_("\ufdd0'else")) {
        throw new persistent_data_structures.vector.IndexOutOfBoundsException;
      }else {
        return null
      }
    }
  }
};
persistent_data_structures.vector.PVector.prototype.cljs$core$IEquiv$ = true;
persistent_data_structures.vector.PVector.prototype.cljs$core$IEquiv$_equiv = function(this$, o) {
  var this__3294 = this;
  if(cljs.core.truth_(function() {
    var or__3548__auto____3295 = persistent_data_structures.vector.list_QMARK_.call(null, o);
    if(cljs.core.truth_(or__3548__auto____3295)) {
      return or__3548__auto____3295
    }else {
      return cljs.core.vector_QMARK_.call(null, o)
    }
  }())) {
    if(cljs.core.truth_(cljs.core.not_EQ_.call(null, cljs.core.count.call(null, o), cljs.core._count.call(null, this$)))) {
      return false
    }else {
      return cljs.core.every_QMARK_.call(null, cljs.core.map.call(null, cljs.core._EQ_, o, cljs.core._seq.call(null, this$)))
    }
  }else {
    if(cljs.core.truth_(cljs.core.not.call(null, cljs.core.sequential_QMARK_.call(null, o)))) {
      return false
    }else {
      var s__3296 = cljs.core._seq.call(null, this$);
      var a__3297 = cljs.core.seq.call(null, o);
      while(true) {
        if(cljs.core.truth_(function() {
          var and__3546__auto____3298 = cljs.core.nil_QMARK_.call(null, s__3296);
          if(cljs.core.truth_(and__3546__auto____3298)) {
            return cljs.core.nil_QMARK_.call(null, a__3297)
          }else {
            return and__3546__auto____3298
          }
        }())) {
          return true
        }else {
          if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, s__3296))) {
            return false
          }else {
            if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null, a__3297))) {
              return false
            }else {
              if(cljs.core.truth_(cljs.core.not_EQ_.call(null, cljs.core.first.call(null, s__3296), cljs.core.first.call(null, a__3297)))) {
                return false
              }else {
                if(cljs.core.truth_("\ufdd0'else")) {
                  var G__3310 = cljs.core.rest.call(null, s__3296);
                  var G__3311 = cljs.core.rest.call(null, a__3297);
                  s__3296 = G__3310;
                  a__3297 = G__3311;
                  continue
                }else {
                  return null
                }
              }
            }
          }
        }
        break
      }
    }
  }
};
persistent_data_structures.vector.PVector.prototype.cljs$core$IWithMeta$ = true;
persistent_data_structures.vector.PVector.prototype.cljs$core$IWithMeta$_with_meta = function(this$, m) {
  var this__3299 = this;
  return new persistent_data_structures.vector.PVector(this__3299.cnt, this__3299.shift, this__3299.root, this__3299.tail, m)
};
persistent_data_structures.vector.PVector.prototype.cljs$core$IMeta$ = true;
persistent_data_structures.vector.PVector.prototype.cljs$core$IMeta$_meta = function(this$) {
  var this__3300 = this;
  return this__3300._meta
};
persistent_data_structures.vector.PVector.prototype.cljs$core$IIndexed$ = true;
persistent_data_structures.vector.PVector.prototype.cljs$core$IIndexed$_nth = function() {
  var G__3312 = null;
  var G__3312__3313 = function(this$, i) {
    var this__3301 = this;
    var node__3302 = persistent_data_structures.vector.array_for.call(null, this$, i);
    return node__3302[i & 31]
  };
  var G__3312__3314 = function(this$, i, not_found) {
    var this__3303 = this;
    if(cljs.core.truth_(function() {
      var and__3546__auto____3304 = i >= 0;
      if(cljs.core.truth_(and__3546__auto____3304)) {
        return i < this__3303.cnt
      }else {
        return and__3546__auto____3304
      }
    }())) {
      return not_found
    }else {
      return cljs.core._nth.call(null, this$, i)
    }
  };
  G__3312 = function(this$, i, not_found) {
    switch(arguments.length) {
      case 2:
        return G__3312__3313.call(this, this$, i);
      case 3:
        return G__3312__3314.call(this, this$, i, not_found)
    }
    throw"Invalid arity: " + arguments.length;
  };
  return G__3312
}();
persistent_data_structures.vector.PVector.prototype.cljs$core$IEmptyableCollection$ = true;
persistent_data_structures.vector.PVector.prototype.cljs$core$IEmptyableCollection$_empty = function(this$) {
  var this__3305 = this;
  return new persistent_data_structures.vector.PVector(0, 5, persistent_data_structures.vector.empty_node, cljs.core.to_array.call(null, cljs.core.List.EMPTY), this__3305._meta)
};
persistent_data_structures.vector.PVector;
persistent_data_structures.vector.pvec = function pvec(coll) {
  var reversed_partition__3324 = function reversed_partition(n, coll) {
    var ret__3316 = cljs.core.List.EMPTY;
    var co__3317 = coll;
    var remaining__3318 = cljs.core.count.call(null, coll);
    while(true) {
      if(cljs.core.truth_(cljs.core.empty_QMARK_.call(null, co__3317))) {
        return ret__3316
      }else {
        var rem__3319 = 32 < remaining__3318 ? 32 : remaining__3318;
        var ret_array__3320 = cljs.core.array.call(null, rem__3319);
        var next_co__3323 = function() {
          var cnt__3321 = 0;
          var coll__3322 = co__3317;
          while(true) {
            if(cljs.core.truth_(cljs.core._EQ_.call(null, cnt__3321, rem__3319))) {
              return coll__3322
            }else {
              ret_array__3320[cnt__3321] = cljs.core.first.call(null, coll__3322);
              var G__3339 = cnt__3321 + 1;
              var G__3340 = cljs.core.rest.call(null, coll__3322);
              cnt__3321 = G__3339;
              coll__3322 = G__3340;
              continue
            }
            break
          }
        }();
        var G__3341 = cljs.core.cons.call(null, ret_array__3320, ret__3316);
        var G__3342 = next_co__3323;
        var G__3343 = remaining__3318 - rem__3319;
        ret__3316 = G__3341;
        co__3317 = G__3342;
        remaining__3318 = G__3343;
        continue
      }
      break
    }
  };
  var grouped_coll__3325 = reversed_partition__3324.call(null, 32, coll);
  var big_groups__3326 = cljs.core.rest.call(null, grouped_coll__3325);
  var tail__3327 = cljs.core.first.call(null, grouped_coll__3325);
  var reversed_map__3330 = function(f, coll) {
    var ret__3328 = cljs.core.List.EMPTY;
    var coll__3329 = coll;
    while(true) {
      if(cljs.core.truth_(cljs.core.empty_QMARK_.call(null, coll__3329))) {
        return ret__3328
      }else {
        var G__3344 = cljs.core.cons.call(null, f.call(null, cljs.core.first.call(null, coll__3329)), ret__3328);
        var G__3345 = cljs.core.rest.call(null, coll__3329);
        ret__3328 = G__3344;
        coll__3329 = G__3345;
        continue
      }
      break
    }
  };
  var c__3331 = 32 * (cljs.core.count.call(null, grouped_coll__3325) - 1) + cljs.core.count.call(null, tail__3327);
  var shift__3334 = function() {
    var level__3332 = 0;
    var c__3333 = persistent_data_structures.utils.unsigned_bit_shift_right.call(null, c__3331, 5);
    while(true) {
      if(cljs.core.truth_(c__3333 <= 32)) {
        return 5 * (level__3332 + 1)
      }else {
        var G__3346 = level__3332 + 1;
        var G__3347 = c__3333 >> 5;
        level__3332 = G__3346;
        c__3333 = G__3347;
        continue
      }
      break
    }
  }();
  var root__3338 = function() {
    var groups__3335 = big_groups__3326;
    var level__3336 = shift__3334;
    while(true) {
      var vector_nodes__3337 = reversed_map__3330.call(null, function(groups__3335, level__3336) {
        return function(p1__3243_SHARP_) {
          return new persistent_data_structures.vector.VectorNode(p1__3243_SHARP_)
        }
      }(groups__3335, level__3336), groups__3335);
      if(cljs.core.truth_(cljs.core._EQ_.call(null, level__3336, 5))) {
        return new persistent_data_structures.vector.VectorNode(cljs.core.to_array.call(null, vector_nodes__3337))
      }else {
        var G__3348 = reversed_partition__3324.call(null, 32, vector_nodes__3337);
        var G__3349 = level__3336 - 5;
        groups__3335 = G__3348;
        level__3336 = G__3349;
        continue
      }
      break
    }
  }();
  return new persistent_data_structures.vector.PVector(c__3331, shift__3334, root__3338, tail__3327, cljs.core.ObjMap.fromObject([], {}))
};
goog.exportSymbol("persistent_data_structures.vector.pvec", persistent_data_structures.vector.pvec);
persistent_data_structures.vector.empty_pvector = function empty_pvector() {
  return new persistent_data_structures.vector.PVector(0, 5, persistent_data_structures.vector.empty_node, cljs.core.to_array.call(null, cljs.core.List.EMPTY), cljs.core.ObjMap.fromObject([], {}))
};
