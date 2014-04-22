/** es5-sham.min.js from https://github.com/kriskowal/es5-shim and the minified version of this patch https://github.com/abe33/source-map/commit/61131e53ceb3b69d387da3c6daad6adbbaaae9b3 for PhantomJS 1.9.x. */
if(!Function.prototype.bind) {Function.prototype.bind = function(scope){var self = this;return function(){return self.apply(scope, arguments);};}}
(function(definition){if(typeof define=="function"){define(definition)}else if(typeof YUI=="function"){YUI.add("es5-sham",definition)}else{definition()}})(function(){var call=Function.prototype.call;var prototypeOfObject=Object.prototype;var owns=call.bind(prototypeOfObject.hasOwnProperty);var defineGetter;var defineSetter;var lookupGetter;var lookupSetter;var supportsAccessors;if(supportsAccessors=owns(prototypeOfObject,"__defineGetter__")){defineGetter=call.bind(prototypeOfObject.__defineGetter__);defineSetter=call.bind(prototypeOfObject.__defineSetter__);lookupGetter=call.bind(prototypeOfObject.__lookupGetter__);lookupSetter=call.bind(prototypeOfObject.__lookupSetter__)}if(!Object.getPrototypeOf){Object.getPrototypeOf=function getPrototypeOf(object){return object.__proto__||(object.constructor?object.constructor.prototype:prototypeOfObject)}}function doesGetOwnPropertyDescriptorWork(object){try{object.sentinel=0;return Object.getOwnPropertyDescriptor(object,"sentinel").value===0}catch(exception){}}if(Object.defineProperty){var getOwnPropertyDescriptorWorksOnObject=doesGetOwnPropertyDescriptorWork({});var getOwnPropertyDescriptorWorksOnDom=typeof document=="undefined"||doesGetOwnPropertyDescriptorWork(document.createElement("div"));if(!getOwnPropertyDescriptorWorksOnDom||!getOwnPropertyDescriptorWorksOnObject){var getOwnPropertyDescriptorFallback=Object.getOwnPropertyDescriptor}}if(!Object.getOwnPropertyDescriptor||getOwnPropertyDescriptorFallback){var ERR_NON_OBJECT="Object.getOwnPropertyDescriptor called on a non-object: ";Object.getOwnPropertyDescriptor=function getOwnPropertyDescriptor(object,property){if(typeof object!="object"&&typeof object!="function"||object===null){throw new TypeError(ERR_NON_OBJECT+object)}if(getOwnPropertyDescriptorFallback){try{return getOwnPropertyDescriptorFallback.call(Object,object,property)}catch(exception){}}if(!owns(object,property)){return}var descriptor={enumerable:true,configurable:true};if(supportsAccessors){var prototype=object.__proto__;object.__proto__=prototypeOfObject;var getter=lookupGetter(object,property);var setter=lookupSetter(object,property);object.__proto__=prototype;if(getter||setter){if(getter){descriptor.get=getter}if(setter){descriptor.set=setter}return descriptor}}descriptor.value=object[property];descriptor.writable=true;return descriptor}}if(!Object.getOwnPropertyNames){Object.getOwnPropertyNames=function getOwnPropertyNames(object){return Object.keys(object)}}if(!Object.create){var createEmpty;var supportsProto=Object.prototype.__proto__===null;if(supportsProto||typeof document=="undefined"){createEmpty=function(){return{__proto__:null}}}else{createEmpty=function(){var iframe=document.createElement("iframe");var parent=document.body||document.documentElement;iframe.style.display="none";parent.appendChild(iframe);iframe.src="javascript:";var empty=iframe.contentWindow.Object.prototype;parent.removeChild(iframe);iframe=null;delete empty.constructor;delete empty.hasOwnProperty;delete empty.propertyIsEnumerable;delete empty.isPrototypeOf;delete empty.toLocaleString;delete empty.toString;delete empty.valueOf;empty.__proto__=null;function Empty(){}Empty.prototype=empty;createEmpty=function(){return new Empty};return new Empty}}Object.create=function create(prototype,properties){var object;function Type(){}if(prototype===null){object=createEmpty()}else{if(typeof prototype!=="object"&&typeof prototype!=="function"){throw new TypeError("Object prototype may only be an Object or null")}Type.prototype=prototype;object=new Type;object.__proto__=prototype}if(properties!==void 0){Object.defineProperties(object,properties)}return object}}function doesDefinePropertyWork(object){try{Object.defineProperty(object,"sentinel",{});return"sentinel"in object}catch(exception){}}if(Object.defineProperty){var definePropertyWorksOnObject=doesDefinePropertyWork({});var definePropertyWorksOnDom=typeof document=="undefined"||doesDefinePropertyWork(document.createElement("div"));if(!definePropertyWorksOnObject||!definePropertyWorksOnDom){var definePropertyFallback=Object.defineProperty,definePropertiesFallback=Object.defineProperties}}if(!Object.defineProperty||definePropertyFallback){var ERR_NON_OBJECT_DESCRIPTOR="Property description must be an object: ";var ERR_NON_OBJECT_TARGET="Object.defineProperty called on non-object: ";var ERR_ACCESSORS_NOT_SUPPORTED="getters & setters can not be defined "+"on this javascript engine";Object.defineProperty=function defineProperty(object,property,descriptor){if(typeof object!="object"&&typeof object!="function"||object===null){throw new TypeError(ERR_NON_OBJECT_TARGET+object)}if(typeof descriptor!="object"&&typeof descriptor!="function"||descriptor===null){throw new TypeError(ERR_NON_OBJECT_DESCRIPTOR+descriptor)}if(definePropertyFallback){try{return definePropertyFallback.call(Object,object,property,descriptor)}catch(exception){}}if(owns(descriptor,"value")){if(supportsAccessors&&(lookupGetter(object,property)||lookupSetter(object,property))){var prototype=object.__proto__;object.__proto__=prototypeOfObject;delete object[property];object[property]=descriptor.value;object.__proto__=prototype}else{object[property]=descriptor.value}}else{if(!supportsAccessors){throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED)}if(owns(descriptor,"get")){defineGetter(object,property,descriptor.get)}if(owns(descriptor,"set")){defineSetter(object,property,descriptor.set)}}return object}}if(!Object.defineProperties||definePropertiesFallback){Object.defineProperties=function defineProperties(object,properties){if(definePropertiesFallback){try{return definePropertiesFallback.call(Object,object,properties)}catch(exception){}}for(var property in properties){if(owns(properties,property)&&property!="__proto__"){Object.defineProperty(object,property,properties[property])}}return object}}if(!Object.seal){Object.seal=function seal(object){return object}}if(!Object.freeze){Object.freeze=function freeze(object){return object}}try{Object.freeze(function(){})}catch(exception){Object.freeze=function freeze(freezeObject){return function freeze(object){if(typeof object=="function"){return object}else{return freezeObject(object)}}}(Object.freeze)}if(!Object.preventExtensions){Object.preventExtensions=function preventExtensions(object){return object}}if(!Object.isSealed){Object.isSealed=function isSealed(object){return false}}if(!Object.isFrozen){Object.isFrozen=function isFrozen(object){return false}}if(!Object.isExtensible){Object.isExtensible=function isExtensible(object){if(Object(object)!==object){throw new TypeError}var name="";while(owns(object,name)){name+="?"}object[name]=true;var returnValue=owns(object,name);delete object[name];return returnValue}}});

/** Determine if the Blob constructor works. This helps out PhantomJS 1.9.x. Should return true on modern browsers. */
function doesBlobConstructorWork(){try{return !!new Blob();}catch(e){return false;}}

/** BlobBuilder shim. We fall back to BlobBuilder if Blob constructor doesn't work. This helps out PhantomJS 1.9.x. */
var BlobBuilder=BlobBuilder||self.WebKitBlobBuilder||self.MozBlobBuilder||(function(view){"use strict";var get_class=function(object){return Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1]},FakeBlobBuilder=function(){},FakeBlob=function(data,type){this.data=data;this.size=data.length;this.type=type},FBB_proto=FakeBlobBuilder.prototype=[],FB_proto=FakeBlob.prototype,FileReaderSync=view.FileReaderSync,FileException=function(type){this.code=this[this.name=type]},file_ex_codes=("NOT_FOUND_ERR SECURITY_ERR ABORT_ERR NOT_READABLE_ERR ENCODING_ERR "+"NO_MODIFICATION_ALLOWED_ERR INVALID_STATE_ERR SYNTAX_ERR").split(" "),file_ex_code=file_ex_codes.length,URL=view.URL=view.URL||view.webkitURL||view,real_create_object_url,real_revoke_object_url,btoa=view.btoa,can_apply_typed_arrays=false,can_apply_typed_arrays_test=function(pass){can_apply_typed_arrays=!pass},ArrayBuffer=view.ArrayBuffer,Uint8Array=view.Uint8Array;while(file_ex_code--){FileException.prototype[file_ex_codes[file_ex_code]]=file_ex_code+1}try{if(Uint8Array){can_apply_typed_arrays_test.apply(0,new Uint8Array(1))}}catch(ex){}if(!URL.createObjectURL){URL={}}real_create_object_url=URL.createObjectURL;real_revoke_object_url=URL.revokeObjectURL;URL.createObjectURL=function(blob){var type=blob.type;if(type===null){type="application/octet-stream"}if(blob instanceof FakeBlob){if(btoa){return"data:"+type+";base64,"+btoa(blob.data)}else{return"data:"+type+","+encodeURIComponent(blob.data)}}else if(real_create_object_url){return real_create_object_url.call(URL,blob)}};URL.revokeObjectURL=function(object_url){if(object_url.substring(0,5)!=="data:"&&real_revoke_object_url){real_revoke_object_url.call(URL,object_url)}};FBB_proto.append=function(data){var bb=this;if(Uint8Array&&data instanceof ArrayBuffer){if(can_apply_typed_arrays){bb.push(String.fromCharCode.apply(String,new Uint8Array(data)))}else{var str="",buf=new Uint8Array(data),i=0,buf_len=buf.length;for(;i<buf_len;i++){str+=String.fromCharCode(buf[i])}}}else if(get_class(data)==="Blob"||get_class(data)==="File"){if(FileReaderSync){var fr=new FileReaderSync;bb.push(fr.readAsBinaryString(data))}else{throw new FileException("NOT_READABLE_ERR")}}else if(data instanceof FakeBlob){bb.push(data.data)}else{if(typeof data!=="string"){data+=""}bb.push(unescape(encodeURIComponent(data)))}};FBB_proto.getBlob=function(type){if(!arguments.length){type=null}return new FakeBlob(this.join(""),type)};FBB_proto.toString=function(){return"[object BlobBuilder]"};FB_proto.slice=function(start,end,type){var args=arguments.length;if(args<3){type=null}return new FakeBlob(this.data.slice(start,args>1?end:this.data.length),type)};FB_proto.toString=function(){return"[object Blob]"};return FakeBlobBuilder}(self));

var IO = window.IO = {
	//event handling
	events : {},
	preventDefault : false,

	//register for an event
	register : function ( name, fun, thisArg ) {
		if ( !this.events[name] ) {
			this.events[ name ] = [];
		}
		this.events[ name ].push({
			fun : fun,
			thisArg : thisArg,
			args : Array.prototype.slice.call( arguments, 3 )
		});

		return this;
	},

	unregister : function ( name, fun ) {
		if ( !this.events[name] ) {
			return this;
		}

		this.events[ name ] = this.events[ name ].filter(function ( obj ) {
			return obj.fun !== fun;
		});

		return this;
	},

	//fire event!
	fire : function ( name ) {
		this.preventDefault = false;

		if ( !this.events[name] ) {
			return;
		}

		var args = Array.prototype.slice.call( arguments, 1 ),
			that = this;
		this.events[ name ].forEach( fireEvent );

		function fireEvent( evt ) {
			var call = evt.fun.apply( evt.thisArg, evt.args.concat(args) );

			that.preventDefault = call === false;
		}
	},

	urlstringify : (function () {
		//simple types, for which toString does the job
		//used in singularStringify
		var simplies = { number : true, string : true, boolean : true };

		var singularStringify = function ( thing ) {
			if ( typeof thing in simplies ) {
				return encodeURIComponent( thing.toString() );
			}
			return '';
		};

		var arrayStringify = function ( key, array ) {
			key = singularStringify( key );

			return array.map(function ( val ) {
				return pair( key, val, true );
			}).join( '&' );
		};

		//returns a key=value pair. pass in dontStringifyKey so that, well, the
		// key won't be stringified (used in arrayStringify)
		var pair = function ( key, val, dontStringifyKey ) {
			if ( !dontStringifyKey ) {
				key = singularStringify( key );
			}

			return key + '=' + singularStringify( val );
		};

		return function ( obj ) {

			return Object.keys( obj ).map(function ( key ) {
				var val = obj[ key ];

				if ( Array.isArray(val) ) {
					return arrayStringify( key, val );
				}
				else {
					return pair( key, val );
				}
			}).join( '&' );
		};
	}()),

	loadScript : function ( url, cb ) {
		var script = document.createElement( 'script' );
		script.src = url;
		script.onload = cb;

		document.head.appendChild( script );
	}
};

//turns some html tags into markdown. a major assumption is that the input is
// properly sanitised - that is, all <, &, etc entered by the user got turned
// into html entities.
IO.htmlToMarkdown = (function () {

// A string value is the delimiter (what replaces the tag)
var markdown = {
	i : '*',
	b : '**',
	strike : '---',
	code : '`',

	a : function ( $0, $1, text ) {
		var href = /href="([^"]+?)"/.exec( $0 );

		if ( !href ) {
			return $0;
		}
		return '[' + text + '](' + href[1] + ')';
	},
};
var htmlRe = /<(\S+)[^\>]*>([^<]+)<\/\1>/g;

return function ( html ) {
	var delim;

	return html.replace( htmlRe, decodeHtml );

	function decodeHtml ( $0, tag, text ) {
		if ( !markdown.hasOwnProperty(tag) ) {
			return $0;
		}

		delim = markdown[ tag ];

		return delim.apply ?
			markdown[ tag ].apply( markdown, arguments ) :
			delim + text + delim;
	}
};
}());

IO.decodehtmlEntities = (function () {
var entities; //will be filled in the following line
//#build static/htmlEntities.js

/*
  &       -all entities start with &
  (
   #      -charcode entities also have a #
   x?     -hex charcodes
  )?
  [\w;]   -now the entity (alphanumeric, separated by ;)
  +?      -capture em until there aint no more (don't get the trailing ;)
  ;       -trailing ;
*/
var entityRegex = /&(#x?)?[\w;]+?;/g;
var replaceEntities = function ( entities ) {
	//remove the & and split into each separate entity
	return entities.slice( 1 ).split( ';' ).map( decodeEntity ).join( '' );
};
var decodeEntity = function ( entity ) {
	if ( !entity ) {
		return '';
	}

	//starts with a #, it's charcode
	if ( entity[0] === '#' ) {
		return decodeCharcodeEntity( entity );
	}

	if ( !entities.hasOwnProperty(entity) ) {
		//I hate this so. so. so much. it's just wrong.
		return '&' + entity +';';
	}
	return entities[ entity ];
};
var decodeCharcodeEntity = function ( entity ) {
	//remove the # prefix
	entity = entity.slice( 1 );

	var cc;
	//hex entities
	if ( entity[0] === 'x' ) {
		cc = parseInt( entity.slice(1), 16 );
	}
	//decimal entities
	else {
		cc = parseInt( entity, 10 );
	}

	return String.fromCharCode( cc );
};

return function ( html ) {
	return html.replace( entityRegex, replaceEntities );
};
}());

//build IO.in and IO.out
[ 'in', 'out' ].forEach(function ( dir ) {
	var fullName = dir + 'put';

	IO[ dir ] = {
		buffer : [],

		receive : function ( obj ) {
			IO.fire( 'receive' + fullName, obj );

			if ( IO.preventDefault ) {
				return this;
			}

			this.buffer.push( obj );

			return this;
		},

		//unload the next item in the buffer
		tick : function () {
			if ( this.buffer.length ) {
				IO.fire( fullName, this.buffer.shift() );
			}

			return this;
		},

		//unload everything in the buffer
		flush : function () {
			IO.fire( 'before' + fullName );

			if ( !this.buffer.length ) {
				return this;
			}

			var i = this.buffer.length;
			while( i --> 0 ) {
				this.tick();
			}

			IO.fire( 'after' + fullName );

			this.buffer = [];
			return this;
		}
	};
});

IO.relativeUrlToAbsolute = function ( url ) {
	//the anchor's href *property* will always be absolute, unlike the href
	// *attribute*
	var a = document.createElement( 'a' );
	a.setAttribute( 'href', url );

	return a.href;
};

IO.injectScript = function ( url ) {
	var script = document.createElement( 'script' );
	script.src = url;

	document.head.appendChild( script );
	return script;
};

IO.xhr = function ( params ) {
	//merge in the defaults
	params = Object.merge({
		method   : 'GET',
		headers  : {},
		complete : function (){}
	}, params );

	params.headers = Object.merge({
		'Content-Type' : 'application/x-www-form-urlencoded'
	}, params.headers );

	//if the data is an object, and not a fakey String object, dress it up
	if ( typeof params.data === 'object' && !params.data.charAt ) {
		params.data = IO.urlstringify( params.data );
	}

	var xhr = new XMLHttpRequest();
	xhr.open( params.method, params.url );

	if ( params.document ) {
		xhr.responseType = 'document';
	}

	xhr.addEventListener( 'load', function () {
		params.complete.call(
			params.thisArg, xhr.response, xhr
		);
	});

	Object.iterate( params.headers, xhr.setRequestHeader.bind(xhr) );

	xhr.send( params.data );

	return xhr;
};

IO.jsonp = function ( opts ) {
	opts.data = opts.data || {};
	opts.jsonpName = opts.jsonpName || 'jsonp';

	var script = document.createElement( 'script' ),
		semiRandom;

	do {
		semiRandom = 'IO' + ( Date.now() * Math.ceil(Math.random()) );
	} while ( window[semiRandom] );

	//this is the callback function, called from the "jsonp file"
	window[ semiRandom ] = function () {
		opts.fun.apply( opts.thisArg, arguments );

		//cleanup
		delete window[ semiRandom ];
		script.parentNode.removeChild( script );
	};

	//add the jsonp parameter to the data we're sending
	opts.data[ opts.jsonpName ] = semiRandom;

	//start preparing the url to be sent
	if ( opts.url.indexOf('?') === -1 ) {
		opts.url += '?';
	}

	//append the data to be sent, in string form, to the url
	opts.url += '&' + this.urlstringify( opts.data );

	script.onerror = opts.error;

	script.src = opts.url;
	document.head.appendChild( script );
};

//generic, pre-made call to be used inside commands
IO.jsonp.google = function ( query, cb ) {
	IO.jsonp({
		url : 'http://ajax.googleapis.com/ajax/services/search/web',
		jsonpName : 'callback',
		data : {
			v : '1.0',
			q : query
		},
		fun : cb
	});
};
