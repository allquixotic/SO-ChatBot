(function() {
  "use strict";
  
  function utf8_to_b64( str ) {
  return window.btoa(unescape(encodeURIComponent( str )));
}

function explode(text, max) {
    // clean the text
    //text = text.replace(/  +/g, " ").replace(/^ /, "").replace(/ $/, "");
    // return empty string if text is undefined
    if (typeof text === "undefined") return "";
    // if max hasn't been defined, max = 50
    if (typeof max === "undefined") max = 50;
    // return the initial text if already less than max
    if (text.length <= max) return text;
    // get the first part of the text
    var exploded = text.substring(0, max);
    // get the next part of the text
    text = text.substring(max);
    // if next part doesn't start with a space
    if (text.charAt(0) !== " ") {
        // while the first part doesn't end with a space && the first part still has at least one char
        while (exploded.charAt(exploded.length - 1) !== " " && exploded.length > 0) {
            // add the last char of the first part at the beginning of the next part
            text = exploded.charAt(exploded.length - 1) + text;
            // remove the last char of the first part
            exploded = exploded.substring(0, exploded.length - 1);
        }
        // if the first part has been emptied (case of a text bigger than max without any space)
        if (exploded.length == 0) {
            // re-explode the text without caring about spaces
            exploded = text.substring(0, max);
            text = text.substring(max);
        // if the first part isn't empty
        } else {
            // remove the last char of the first part, because it's a space
            exploded = exploded.substring(0, exploded.length - 1);
        }
    // if the next part starts with a space
    } else {
        // remove the first char of the next part
        text = text.substring(1);
    }
    // return the first part and the exploded next part, concatenated by \n
    return exploded + "\n" + explode(text);
}

  bot.addCommand(bot.CommunityCommand({
    name : 'export',
    fun : function(args) {
        var mem = utf8_to_b64(JSON.stringify(bot.memory.data)),
        user_name = args.get( 'user_name' ),
        maxSize = 498 - user_name.length;

        return explode(mem, maxSize);
      }, 
    permissions : { del : 'NONE', use : 'OWNER' },
    description : 'Blurts out a message with the persistent memory storage for export `/export`'
  }));
})();
