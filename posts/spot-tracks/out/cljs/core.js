goog.provide('cljs.core');
goog.require('goog.string');
goog.require('goog.string.StringBuffer');
goog.require('goog.object');
goog.require('goog.array');
/**
* Each runtime environment provides a diffenent way to print output.
* Whatever function *print-fn* is bound to will be passed any
* Strings which should be printed.
*/
cljs.core._STAR_print_fn_STAR_ = (function _STAR_print_fn_STAR_(_){
throw (new Error("No *print-fn* fn set for evaluation environment"));
});
/**
* Internal - do not use!
*/
cljs.core.truth_ = (function truth_(x){
return (x != null && x !== false);
});
/**
* Internal - do not use!
*/
cljs.core.type_satisfies_ = (function type_satisfies_(p,x){
var or__3548__auto____2233 = cljs.core.aget.call(null,p,goog.typeOf.call(null,x));

if(cljs.core.truth_(or__3548__auto____2233))
{return or__3548__auto____2233;
} else
{var or__3548__auto____2234 = cljs.core.aget.call(null,p,"_");

if(cljs.core.truth_(or__3548__auto____2234))
{return or__3548__auto____2234;
} else
{return false;
}
}
});
/**
* When compiled for a command-line target, whatever
* function *main-fn* is set to will be called with the command-line
* argv as arguments
*/
cljs.core._STAR_main_cli_fn_STAR_ = null;
cljs.core.missing_protocol = (function missing_protocol(proto,obj){
return Error.call(null,"No protocol method "+proto+" defined for type "+goog.typeOf.call(null,obj)+": "+obj);
});
/**
* Returns a javascript array, cloned from the passed in array
*/
cljs.core.aclone = (function aclone(array_like){
return Array.prototype.slice.call(array_like);
});
/**
* Creates a new javascript array.
* @param {...*} var_args
*/
cljs.core.array = (function array(var_args){
return Array.prototype.slice.call(arguments);
});
/**
* Returns the value at the index.
*/
cljs.core.aget = (function aget(array,i){
return array[i];
});
/**
* Sets the value at the index.
*/
cljs.core.aset = (function aset(array,i,val){
return (array[i] = val);
});
/**
* Returns the length of the Java array. Works on arrays of all types.
*/
cljs.core.alength = (function alength(array){
return array.length;
});
cljs.core.ICounted = {};
cljs.core._count = (function _count(coll){
if(cljs.core.truth_((function (){var and__3546__auto____2235 = coll;

if(cljs.core.truth_(and__3546__auto____2235))
{return coll.cljs$core$ICounted$_count;
} else
{return and__3546__auto____2235;
}
})()))
{return coll.cljs$core$ICounted$_count(coll);
} else
{return (function (){var or__3548__auto____2236 = cljs.core.aget.call(null,cljs.core._count,goog.typeOf.call(null,coll));

if(cljs.core.truth_(or__3548__auto____2236))
{return or__3548__auto____2236;
} else
{var or__3548__auto____2237 = cljs.core.aget.call(null,cljs.core._count,"_");

if(cljs.core.truth_(or__3548__auto____2237))
{return or__3548__auto____2237;
} else
{throw cljs.core.missing_protocol.call(null,"ICounted.-count",coll);
}
}
})().call(null,coll);
}
});
cljs.core.IEmptyableCollection = {};
cljs.core._empty = (function _empty(coll){
if(cljs.core.truth_((function (){var and__3546__auto____2238 = coll;

if(cljs.core.truth_(and__3546__auto____2238))
{return coll.cljs$core$IEmptyableCollection$_empty;
} else
{return and__3546__auto____2238;
}
})()))
{return coll.cljs$core$IEmptyableCollection$_empty(coll);
} else
{return (function (){var or__3548__auto____2239 = cljs.core.aget.call(null,cljs.core._empty,goog.typeOf.call(null,coll));

if(cljs.core.truth_(or__3548__auto____2239))
{return or__3548__auto____2239;
} else
{var or__3548__auto____2240 = cljs.core.aget.call(null,cljs.core._empty,"_");

if(cljs.core.truth_(or__3548__auto____2240))
{return or__3548__auto____2240;
} else
{throw cljs.core.missing_protocol.call(null,"IEmptyableCollection.-empty",coll);
}
}
})().call(null,coll);
}
});
cljs.core.ICollection = {};
cljs.core._conj = (function _conj(coll,o){
if(cljs.core.truth_((function (){var and__3546__auto____2241 = coll;

if(cljs.core.truth_(and__3546__auto____2241))
{return coll.cljs$core$ICollection$_conj;
} else
{return and__3546__auto____2241;
}
})()))
{return coll.cljs$core$ICollection$_conj(coll,o);
} else
{return (function (){var or__3548__auto____2242 = cljs.core.aget.call(null,cljs.core._conj,goog.typeOf.call(null,coll));

if(cljs.core.truth_(or__3548__auto____2242))
{return or__3548__auto____2242;
} else
{var or__3548__auto____2243 = cljs.core.aget.call(null,cljs.core._conj,"_");

if(cljs.core.truth_(or__3548__auto____2243))
{return or__3548__auto____2243;
} else
{throw cljs.core.missing_protocol.call(null,"ICollection.-conj",coll);
}
}
})().call(null,coll,o);
}
});
cljs.core.IIndexed = {};
cljs.core._nth = (function() {
var _nth = null;
var _nth__2250 = (function (coll,n){
if(cljs.core.truth_((function (){var and__3546__auto____2244 = coll;

if(cljs.core.truth_(and__3546__auto____2244))
{return coll.cljs$core$IIndexed$_nth;
} else
{return and__3546__auto____2244;
}
})()))
{return coll.cljs$core$IIndexed$_nth(coll,n);
} else
{return (function (){var or__3548__auto____2245 = cljs.core.aget.call(null,cljs.core._nth,goog.typeOf.call(null,coll));

if(cljs.core.truth_(or__3548__auto____2245))
{return or__3548__auto____2245;
} else
{var or__3548__auto____2246 = cljs.core.aget.call(null,cljs.core._nth,"_");

if(cljs.core.truth_(or__3548__auto____2246))
{return or__3548__auto____2246;
} else
{throw cljs.core.missing_protocol.call(null,"IIndexed.-nth",coll);
}
}
})().call(null,coll,n);
}
});
var _nth__2251 = (function (coll,n,not_found){
if(cljs.core.truth_((function (){var and__3546__auto____2247 = coll;

if(cljs.core.truth_(and__3546__auto____2247))
{return coll.cljs$core$IIndexed$_nth;
} else
{return and__3546__auto____2247;
}
})()))
{return coll.cljs$core$IIndexed$_nth(coll,n,not_found);
} else
{return (function (){var or__3548__auto____2248 = cljs.core.aget.call(null,cljs.core._nth,goog.typeOf.call(null,coll));

if(cljs.core.truth_(or__3548__auto____2248))
{return or__3548__auto____2248;
} else
{var or__3548__auto____2249 = cljs.core.aget.call(null,cljs.core._nth,"_");

if(cljs.core.truth_(or__3548__auto____2249))
{return or__3548__auto____2249;
} else
{throw cljs.core.missing_protocol.call(null,"IIndexed.-nth",coll);
}
}
})().call(null,coll,n,not_found);
}
});
_nth = function(coll,n,not_found){
switch(arguments.length){
case  2 :
return _nth__2250.call(this,coll,n);
case  3 :
return _nth__2251.call(this,coll,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return _nth;
})()
;
cljs.core.ISeq = {};
cljs.core._first = (function _first(coll){
if(cljs.core.truth_((function (){var and__3546__auto____2253 = coll;

if(cljs.core.truth_(and__3546__auto____2253))
{return coll.cljs$core$ISeq$_first;
} else
{return and__3546__auto____2253;
}
})()))
{return coll.cljs$core$ISeq$_first(coll);
} else
{return (function (){var or__3548__auto____2254 = cljs.core.aget.call(null,cljs.core._first,goog.typeOf.call(null,coll));

if(cljs.core.truth_(or__3548__auto____2254))
{return or__3548__auto____2254;
} else
{var or__3548__auto____2255 = cljs.core.aget.call(null,cljs.core._first,"_");

if(cljs.core.truth_(or__3548__auto____2255))
{return or__3548__auto____2255;
} else
{throw cljs.core.missing_protocol.call(null,"ISeq.-first",coll);
}
}
})().call(null,coll);
}
});
cljs.core._rest = (function _rest(coll){
if(cljs.core.truth_((function (){var and__3546__auto____2256 = coll;

if(cljs.core.truth_(and__3546__auto____2256))
{return coll.cljs$core$ISeq$_rest;
} else
{return and__3546__auto____2256;
}
})()))
{return coll.cljs$core$ISeq$_rest(coll);
} else
{return (function (){var or__3548__auto____2257 = cljs.core.aget.call(null,cljs.core._rest,goog.typeOf.call(null,coll));

if(cljs.core.truth_(or__3548__auto____2257))
{return or__3548__auto____2257;
} else
{var or__3548__auto____2258 = cljs.core.aget.call(null,cljs.core._rest,"_");

if(cljs.core.truth_(or__3548__auto____2258))
{return or__3548__auto____2258;
} else
{throw cljs.core.missing_protocol.call(null,"ISeq.-rest",coll);
}
}
})().call(null,coll);
}
});
cljs.core.ILookup = {};
cljs.core._lookup = (function() {
var _lookup = null;
var _lookup__2265 = (function (o,k){
if(cljs.core.truth_((function (){var and__3546__auto____2259 = o;

if(cljs.core.truth_(and__3546__auto____2259))
{return o.cljs$core$ILookup$_lookup;
} else
{return and__3546__auto____2259;
}
})()))
{return o.cljs$core$ILookup$_lookup(o,k);
} else
{return (function (){var or__3548__auto____2260 = cljs.core.aget.call(null,cljs.core._lookup,goog.typeOf.call(null,o));

if(cljs.core.truth_(or__3548__auto____2260))
{return or__3548__auto____2260;
} else
{var or__3548__auto____2261 = cljs.core.aget.call(null,cljs.core._lookup,"_");

if(cljs.core.truth_(or__3548__auto____2261))
{return or__3548__auto____2261;
} else
{throw cljs.core.missing_protocol.call(null,"ILookup.-lookup",o);
}
}
})().call(null,o,k);
}
});
var _lookup__2266 = (function (o,k,not_found){
if(cljs.core.truth_((function (){var and__3546__auto____2262 = o;

if(cljs.core.truth_(and__3546__auto____2262))
{return o.cljs$core$ILookup$_lookup;
} else
{return and__3546__auto____2262;
}
})()))
{return o.cljs$core$ILookup$_lookup(o,k,not_found);
} else
{return (function (){var or__3548__auto____2263 = cljs.core.aget.call(null,cljs.core._lookup,goog.typeOf.call(null,o));

if(cljs.core.truth_(or__3548__auto____2263))
{return or__3548__auto____2263;
} else
{var or__3548__auto____2264 = cljs.core.aget.call(null,cljs.core._lookup,"_");

if(cljs.core.truth_(or__3548__auto____2264))
{return or__3548__auto____2264;
} else
{throw cljs.core.missing_protocol.call(null,"ILookup.-lookup",o);
}
}
})().call(null,o,k,not_found);
}
});
_lookup = function(o,k,not_found){
switch(arguments.length){
case  2 :
return _lookup__2265.call(this,o,k);
case  3 :
return _lookup__2266.call(this,o,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return _lookup;
})()
;
cljs.core.IAssociative = {};
cljs.core._contains_key_QMARK_ = (function _contains_key_QMARK_(coll,k){
if(cljs.core.truth_((function (){var and__3546__auto____2268 = coll;

if(cljs.core.truth_(and__3546__auto____2268))
{return coll.cljs$core$IAssociative$_contains_key_QMARK_;
} else
{return and__3546__auto____2268;
}
})()))
{return coll.cljs$core$IAssociative$_contains_key_QMARK_(coll,k);
} else
{return (function (){var or__3548__auto____2269 = cljs.core.aget.call(null,cljs.core._contains_key_QMARK_,goog.typeOf.call(null,coll));

if(cljs.core.truth_(or__3548__auto____2269))
{return or__3548__auto____2269;
} else
{var or__3548__auto____2270 = cljs.core.aget.call(null,cljs.core._contains_key_QMARK_,"_");

if(cljs.core.truth_(or__3548__auto____2270))
{return or__3548__auto____2270;
} else
{throw cljs.core.missing_protocol.call(null,"IAssociative.-contains-key?",coll);
}
}
})().call(null,coll,k);
}
});
cljs.core._assoc = (function _assoc(coll,k,v){
if(cljs.core.truth_((function (){var and__3546__auto____2271 = coll;

if(cljs.core.truth_(and__3546__auto____2271))
{return coll.cljs$core$IAssociative$_assoc;
} else
{return and__3546__auto____2271;
}
})()))
{return coll.cljs$core$IAssociative$_assoc(coll,k,v);
} else
{return (function (){var or__3548__auto____2272 = cljs.core.aget.call(null,cljs.core._assoc,goog.typeOf.call(null,coll));

if(cljs.core.truth_(or__3548__auto____2272))
{return or__3548__auto____2272;
} else
{var or__3548__auto____2273 = cljs.core.aget.call(null,cljs.core._assoc,"_");

if(cljs.core.truth_(or__3548__auto____2273))
{return or__3548__auto____2273;
} else
{throw cljs.core.missing_protocol.call(null,"IAssociative.-assoc",coll);
}
}
})().call(null,coll,k,v);
}
});
cljs.core.IMap = {};
cljs.core._dissoc = (function _dissoc(coll,k){
if(cljs.core.truth_((function (){var and__3546__auto____2274 = coll;

if(cljs.core.truth_(and__3546__auto____2274))
{return coll.cljs$core$IMap$_dissoc;
} else
{return and__3546__auto____2274;
}
})()))
{return coll.cljs$core$IMap$_dissoc(coll,k);
} else
{return (function (){var or__3548__auto____2275 = cljs.core.aget.call(null,cljs.core._dissoc,goog.typeOf.call(null,coll));

if(cljs.core.truth_(or__3548__auto____2275))
{return or__3548__auto____2275;
} else
{var or__3548__auto____2276 = cljs.core.aget.call(null,cljs.core._dissoc,"_");

if(cljs.core.truth_(or__3548__auto____2276))
{return or__3548__auto____2276;
} else
{throw cljs.core.missing_protocol.call(null,"IMap.-dissoc",coll);
}
}
})().call(null,coll,k);
}
});
cljs.core.ISet = {};
cljs.core._disjoin = (function _disjoin(coll,v){
if(cljs.core.truth_((function (){var and__3546__auto____2277 = coll;

if(cljs.core.truth_(and__3546__auto____2277))
{return coll.cljs$core$ISet$_disjoin;
} else
{return and__3546__auto____2277;
}
})()))
{return coll.cljs$core$ISet$_disjoin(coll,v);
} else
{return (function (){var or__3548__auto____2278 = cljs.core.aget.call(null,cljs.core._disjoin,goog.typeOf.call(null,coll));

if(cljs.core.truth_(or__3548__auto____2278))
{return or__3548__auto____2278;
} else
{var or__3548__auto____2279 = cljs.core.aget.call(null,cljs.core._disjoin,"_");

if(cljs.core.truth_(or__3548__auto____2279))
{return or__3548__auto____2279;
} else
{throw cljs.core.missing_protocol.call(null,"ISet.-disjoin",coll);
}
}
})().call(null,coll,v);
}
});
cljs.core.IStack = {};
cljs.core._peek = (function _peek(coll){
if(cljs.core.truth_((function (){var and__3546__auto____2280 = coll;

if(cljs.core.truth_(and__3546__auto____2280))
{return coll.cljs$core$IStack$_peek;
} else
{return and__3546__auto____2280;
}
})()))
{return coll.cljs$core$IStack$_peek(coll);
} else
{return (function (){var or__3548__auto____2281 = cljs.core.aget.call(null,cljs.core._peek,goog.typeOf.call(null,coll));

if(cljs.core.truth_(or__3548__auto____2281))
{return or__3548__auto____2281;
} else
{var or__3548__auto____2282 = cljs.core.aget.call(null,cljs.core._peek,"_");

if(cljs.core.truth_(or__3548__auto____2282))
{return or__3548__auto____2282;
} else
{throw cljs.core.missing_protocol.call(null,"IStack.-peek",coll);
}
}
})().call(null,coll);
}
});
cljs.core._pop = (function _pop(coll){
if(cljs.core.truth_((function (){var and__3546__auto____2283 = coll;

if(cljs.core.truth_(and__3546__auto____2283))
{return coll.cljs$core$IStack$_pop;
} else
{return and__3546__auto____2283;
}
})()))
{return coll.cljs$core$IStack$_pop(coll);
} else
{return (function (){var or__3548__auto____2284 = cljs.core.aget.call(null,cljs.core._pop,goog.typeOf.call(null,coll));

if(cljs.core.truth_(or__3548__auto____2284))
{return or__3548__auto____2284;
} else
{var or__3548__auto____2285 = cljs.core.aget.call(null,cljs.core._pop,"_");

if(cljs.core.truth_(or__3548__auto____2285))
{return or__3548__auto____2285;
} else
{throw cljs.core.missing_protocol.call(null,"IStack.-pop",coll);
}
}
})().call(null,coll);
}
});
cljs.core.IVector = {};
cljs.core._assoc_n = (function _assoc_n(coll,n,val){
if(cljs.core.truth_((function (){var and__3546__auto____2286 = coll;

if(cljs.core.truth_(and__3546__auto____2286))
{return coll.cljs$core$IVector$_assoc_n;
} else
{return and__3546__auto____2286;
}
})()))
{return coll.cljs$core$IVector$_assoc_n(coll,n,val);
} else
{return (function (){var or__3548__auto____2287 = cljs.core.aget.call(null,cljs.core._assoc_n,goog.typeOf.call(null,coll));

if(cljs.core.truth_(or__3548__auto____2287))
{return or__3548__auto____2287;
} else
{var or__3548__auto____2288 = cljs.core.aget.call(null,cljs.core._assoc_n,"_");

if(cljs.core.truth_(or__3548__auto____2288))
{return or__3548__auto____2288;
} else
{throw cljs.core.missing_protocol.call(null,"IVector.-assoc-n",coll);
}
}
})().call(null,coll,n,val);
}
});
cljs.core.IDeref = {};
cljs.core._deref = (function _deref(o){
if(cljs.core.truth_((function (){var and__3546__auto____2289 = o;

if(cljs.core.truth_(and__3546__auto____2289))
{return o.cljs$core$IDeref$_deref;
} else
{return and__3546__auto____2289;
}
})()))
{return o.cljs$core$IDeref$_deref(o);
} else
{return (function (){var or__3548__auto____2290 = cljs.core.aget.call(null,cljs.core._deref,goog.typeOf.call(null,o));

if(cljs.core.truth_(or__3548__auto____2290))
{return or__3548__auto____2290;
} else
{var or__3548__auto____2291 = cljs.core.aget.call(null,cljs.core._deref,"_");

if(cljs.core.truth_(or__3548__auto____2291))
{return or__3548__auto____2291;
} else
{throw cljs.core.missing_protocol.call(null,"IDeref.-deref",o);
}
}
})().call(null,o);
}
});
cljs.core.IDerefWithTimeout = {};
cljs.core._deref_with_timeout = (function _deref_with_timeout(o,msec,timeout_val){
if(cljs.core.truth_((function (){var and__3546__auto____2292 = o;

if(cljs.core.truth_(and__3546__auto____2292))
{return o.cljs$core$IDerefWithTimeout$_deref_with_timeout;
} else
{return and__3546__auto____2292;
}
})()))
{return o.cljs$core$IDerefWithTimeout$_deref_with_timeout(o,msec,timeout_val);
} else
{return (function (){var or__3548__auto____2293 = cljs.core.aget.call(null,cljs.core._deref_with_timeout,goog.typeOf.call(null,o));

if(cljs.core.truth_(or__3548__auto____2293))
{return or__3548__auto____2293;
} else
{var or__3548__auto____2294 = cljs.core.aget.call(null,cljs.core._deref_with_timeout,"_");

if(cljs.core.truth_(or__3548__auto____2294))
{return or__3548__auto____2294;
} else
{throw cljs.core.missing_protocol.call(null,"IDerefWithTimeout.-deref-with-timeout",o);
}
}
})().call(null,o,msec,timeout_val);
}
});
cljs.core.IMeta = {};
cljs.core._meta = (function _meta(o){
if(cljs.core.truth_((function (){var and__3546__auto____2295 = o;

if(cljs.core.truth_(and__3546__auto____2295))
{return o.cljs$core$IMeta$_meta;
} else
{return and__3546__auto____2295;
}
})()))
{return o.cljs$core$IMeta$_meta(o);
} else
{return (function (){var or__3548__auto____2296 = cljs.core.aget.call(null,cljs.core._meta,goog.typeOf.call(null,o));

if(cljs.core.truth_(or__3548__auto____2296))
{return or__3548__auto____2296;
} else
{var or__3548__auto____2297 = cljs.core.aget.call(null,cljs.core._meta,"_");

if(cljs.core.truth_(or__3548__auto____2297))
{return or__3548__auto____2297;
} else
{throw cljs.core.missing_protocol.call(null,"IMeta.-meta",o);
}
}
})().call(null,o);
}
});
cljs.core.IWithMeta = {};
cljs.core._with_meta = (function _with_meta(o,meta){
if(cljs.core.truth_((function (){var and__3546__auto____2298 = o;

if(cljs.core.truth_(and__3546__auto____2298))
{return o.cljs$core$IWithMeta$_with_meta;
} else
{return and__3546__auto____2298;
}
})()))
{return o.cljs$core$IWithMeta$_with_meta(o,meta);
} else
{return (function (){var or__3548__auto____2299 = cljs.core.aget.call(null,cljs.core._with_meta,goog.typeOf.call(null,o));

if(cljs.core.truth_(or__3548__auto____2299))
{return or__3548__auto____2299;
} else
{var or__3548__auto____2300 = cljs.core.aget.call(null,cljs.core._with_meta,"_");

if(cljs.core.truth_(or__3548__auto____2300))
{return or__3548__auto____2300;
} else
{throw cljs.core.missing_protocol.call(null,"IWithMeta.-with-meta",o);
}
}
})().call(null,o,meta);
}
});
cljs.core.IReduce = {};
cljs.core._reduce = (function() {
var _reduce = null;
var _reduce__2307 = (function (coll,f){
if(cljs.core.truth_((function (){var and__3546__auto____2301 = coll;

if(cljs.core.truth_(and__3546__auto____2301))
{return coll.cljs$core$IReduce$_reduce;
} else
{return and__3546__auto____2301;
}
})()))
{return coll.cljs$core$IReduce$_reduce(coll,f);
} else
{return (function (){var or__3548__auto____2302 = cljs.core.aget.call(null,cljs.core._reduce,goog.typeOf.call(null,coll));

if(cljs.core.truth_(or__3548__auto____2302))
{return or__3548__auto____2302;
} else
{var or__3548__auto____2303 = cljs.core.aget.call(null,cljs.core._reduce,"_");

if(cljs.core.truth_(or__3548__auto____2303))
{return or__3548__auto____2303;
} else
{throw cljs.core.missing_protocol.call(null,"IReduce.-reduce",coll);
}
}
})().call(null,coll,f);
}
});
var _reduce__2308 = (function (coll,f,start){
if(cljs.core.truth_((function (){var and__3546__auto____2304 = coll;

if(cljs.core.truth_(and__3546__auto____2304))
{return coll.cljs$core$IReduce$_reduce;
} else
{return and__3546__auto____2304;
}
})()))
{return coll.cljs$core$IReduce$_reduce(coll,f,start);
} else
{return (function (){var or__3548__auto____2305 = cljs.core.aget.call(null,cljs.core._reduce,goog.typeOf.call(null,coll));

if(cljs.core.truth_(or__3548__auto____2305))
{return or__3548__auto____2305;
} else
{var or__3548__auto____2306 = cljs.core.aget.call(null,cljs.core._reduce,"_");

if(cljs.core.truth_(or__3548__auto____2306))
{return or__3548__auto____2306;
} else
{throw cljs.core.missing_protocol.call(null,"IReduce.-reduce",coll);
}
}
})().call(null,coll,f,start);
}
});
_reduce = function(coll,f,start){
switch(arguments.length){
case  2 :
return _reduce__2307.call(this,coll,f);
case  3 :
return _reduce__2308.call(this,coll,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
return _reduce;
})()
;
cljs.core.IEquiv = {};
cljs.core._equiv = (function _equiv(o,other){
if(cljs.core.truth_((function (){var and__3546__auto____2310 = o;

if(cljs.core.truth_(and__3546__auto____2310))
{return o.cljs$core$IEquiv$_equiv;
} else
{return and__3546__auto____2310;
}
})()))
{return o.cljs$core$IEquiv$_equiv(o,other);
} else
{return (function (){var or__3548__auto____2311 = cljs.core.aget.call(null,cljs.core._equiv,goog.typeOf.call(null,o));

if(cljs.core.truth_(or__3548__auto____2311))
{return or__3548__auto____2311;
} else
{var or__3548__auto____2312 = cljs.core.aget.call(null,cljs.core._equiv,"_");

if(cljs.core.truth_(or__3548__auto____2312))
{return or__3548__auto____2312;
} else
{throw cljs.core.missing_protocol.call(null,"IEquiv.-equiv",o);
}
}
})().call(null,o,other);
}
});
cljs.core.IHash = {};
cljs.core._hash = (function _hash(o){
if(cljs.core.truth_((function (){var and__3546__auto____2313 = o;

if(cljs.core.truth_(and__3546__auto____2313))
{return o.cljs$core$IHash$_hash;
} else
{return and__3546__auto____2313;
}
})()))
{return o.cljs$core$IHash$_hash(o);
} else
{return (function (){var or__3548__auto____2314 = cljs.core.aget.call(null,cljs.core._hash,goog.typeOf.call(null,o));

if(cljs.core.truth_(or__3548__auto____2314))
{return or__3548__auto____2314;
} else
{var or__3548__auto____2315 = cljs.core.aget.call(null,cljs.core._hash,"_");

if(cljs.core.truth_(or__3548__auto____2315))
{return or__3548__auto____2315;
} else
{throw cljs.core.missing_protocol.call(null,"IHash.-hash",o);
}
}
})().call(null,o);
}
});
cljs.core.ISeqable = {};
cljs.core._seq = (function _seq(o){
if(cljs.core.truth_((function (){var and__3546__auto____2316 = o;

if(cljs.core.truth_(and__3546__auto____2316))
{return o.cljs$core$ISeqable$_seq;
} else
{return and__3546__auto____2316;
}
})()))
{return o.cljs$core$ISeqable$_seq(o);
} else
{return (function (){var or__3548__auto____2317 = cljs.core.aget.call(null,cljs.core._seq,goog.typeOf.call(null,o));

if(cljs.core.truth_(or__3548__auto____2317))
{return or__3548__auto____2317;
} else
{var or__3548__auto____2318 = cljs.core.aget.call(null,cljs.core._seq,"_");

if(cljs.core.truth_(or__3548__auto____2318))
{return or__3548__auto____2318;
} else
{throw cljs.core.missing_protocol.call(null,"ISeqable.-seq",o);
}
}
})().call(null,o);
}
});
cljs.core.ISequential = {};
cljs.core.IRecord = {};
cljs.core.IPrintable = {};
cljs.core._pr_seq = (function _pr_seq(o,opts){
if(cljs.core.truth_((function (){var and__3546__auto____2319 = o;

if(cljs.core.truth_(and__3546__auto____2319))
{return o.cljs$core$IPrintable$_pr_seq;
} else
{return and__3546__auto____2319;
}
})()))
{return o.cljs$core$IPrintable$_pr_seq(o,opts);
} else
{return (function (){var or__3548__auto____2320 = cljs.core.aget.call(null,cljs.core._pr_seq,goog.typeOf.call(null,o));

if(cljs.core.truth_(or__3548__auto____2320))
{return or__3548__auto____2320;
} else
{var or__3548__auto____2321 = cljs.core.aget.call(null,cljs.core._pr_seq,"_");

if(cljs.core.truth_(or__3548__auto____2321))
{return or__3548__auto____2321;
} else
{throw cljs.core.missing_protocol.call(null,"IPrintable.-pr-seq",o);
}
}
})().call(null,o,opts);
}
});
cljs.core.IPending = {};
cljs.core._realized_QMARK_ = (function _realized_QMARK_(d){
if(cljs.core.truth_((function (){var and__3546__auto____2322 = d;

if(cljs.core.truth_(and__3546__auto____2322))
{return d.cljs$core$IPending$_realized_QMARK_;
} else
{return and__3546__auto____2322;
}
})()))
{return d.cljs$core$IPending$_realized_QMARK_(d);
} else
{return (function (){var or__3548__auto____2323 = cljs.core.aget.call(null,cljs.core._realized_QMARK_,goog.typeOf.call(null,d));

if(cljs.core.truth_(or__3548__auto____2323))
{return or__3548__auto____2323;
} else
{var or__3548__auto____2324 = cljs.core.aget.call(null,cljs.core._realized_QMARK_,"_");

if(cljs.core.truth_(or__3548__auto____2324))
{return or__3548__auto____2324;
} else
{throw cljs.core.missing_protocol.call(null,"IPending.-realized?",d);
}
}
})().call(null,d);
}
});
cljs.core.IWatchable = {};
cljs.core._notify_watches = (function _notify_watches(this$,oldval,newval){
if(cljs.core.truth_((function (){var and__3546__auto____2325 = this$;

if(cljs.core.truth_(and__3546__auto____2325))
{return this$.cljs$core$IWatchable$_notify_watches;
} else
{return and__3546__auto____2325;
}
})()))
{return this$.cljs$core$IWatchable$_notify_watches(this$,oldval,newval);
} else
{return (function (){var or__3548__auto____2326 = cljs.core.aget.call(null,cljs.core._notify_watches,goog.typeOf.call(null,this$));

if(cljs.core.truth_(or__3548__auto____2326))
{return or__3548__auto____2326;
} else
{var or__3548__auto____2327 = cljs.core.aget.call(null,cljs.core._notify_watches,"_");

if(cljs.core.truth_(or__3548__auto____2327))
{return or__3548__auto____2327;
} else
{throw cljs.core.missing_protocol.call(null,"IWatchable.-notify-watches",this$);
}
}
})().call(null,this$,oldval,newval);
}
});
cljs.core._add_watch = (function _add_watch(this$,key,f){
if(cljs.core.truth_((function (){var and__3546__auto____2328 = this$;

if(cljs.core.truth_(and__3546__auto____2328))
{return this$.cljs$core$IWatchable$_add_watch;
} else
{return and__3546__auto____2328;
}
})()))
{return this$.cljs$core$IWatchable$_add_watch(this$,key,f);
} else
{return (function (){var or__3548__auto____2329 = cljs.core.aget.call(null,cljs.core._add_watch,goog.typeOf.call(null,this$));

if(cljs.core.truth_(or__3548__auto____2329))
{return or__3548__auto____2329;
} else
{var or__3548__auto____2330 = cljs.core.aget.call(null,cljs.core._add_watch,"_");

if(cljs.core.truth_(or__3548__auto____2330))
{return or__3548__auto____2330;
} else
{throw cljs.core.missing_protocol.call(null,"IWatchable.-add-watch",this$);
}
}
})().call(null,this$,key,f);
}
});
cljs.core._remove_watch = (function _remove_watch(this$,key){
if(cljs.core.truth_((function (){var and__3546__auto____2331 = this$;

if(cljs.core.truth_(and__3546__auto____2331))
{return this$.cljs$core$IWatchable$_remove_watch;
} else
{return and__3546__auto____2331;
}
})()))
{return this$.cljs$core$IWatchable$_remove_watch(this$,key);
} else
{return (function (){var or__3548__auto____2332 = cljs.core.aget.call(null,cljs.core._remove_watch,goog.typeOf.call(null,this$));

if(cljs.core.truth_(or__3548__auto____2332))
{return or__3548__auto____2332;
} else
{var or__3548__auto____2333 = cljs.core.aget.call(null,cljs.core._remove_watch,"_");

if(cljs.core.truth_(or__3548__auto____2333))
{return or__3548__auto____2333;
} else
{throw cljs.core.missing_protocol.call(null,"IWatchable.-remove-watch",this$);
}
}
})().call(null,this$,key);
}
});
cljs.core.identical_QMARK_ = (function identical_QMARK_(x,y){
return (x === y);
});
cljs.core._EQ_ = (function _EQ_(x,y){
return cljs.core._equiv.call(null,x,y);
});
cljs.core.nil_QMARK_ = (function nil_QMARK_(x){
return cljs.core.identical_QMARK_.call(null,x,null);
});
cljs.core.aset.call(null,cljs.core.IHash,"null",true);
cljs.core.aset.call(null,cljs.core._hash,"null",(function (o){
return 0;
}));
cljs.core.aset.call(null,cljs.core.ILookup,"null",true);
cljs.core.aset.call(null,cljs.core._lookup,"null",(function() {
var G__2334 = null;
var G__2334__2335 = (function (o,k){
return null;
});
var G__2334__2336 = (function (o,k,not_found){
return not_found;
});
G__2334 = function(o,k,not_found){
switch(arguments.length){
case  2 :
return G__2334__2335.call(this,o,k);
case  3 :
return G__2334__2336.call(this,o,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__2334;
})()
);
cljs.core.aset.call(null,cljs.core.IAssociative,"null",true);
cljs.core.aset.call(null,cljs.core._assoc,"null",(function (_,k,v){
return cljs.core.hash_map.call(null,k,v);
}));
cljs.core.aset.call(null,cljs.core.ICollection,"null",true);
cljs.core.aset.call(null,cljs.core._conj,"null",(function (_,o){
return cljs.core.list.call(null,o);
}));
cljs.core.aset.call(null,cljs.core.IReduce,"null",true);
cljs.core.aset.call(null,cljs.core._reduce,"null",(function() {
var G__2338 = null;
var G__2338__2339 = (function (_,f){
return f.call(null);
});
var G__2338__2340 = (function (_,f,start){
return start;
});
G__2338 = function(_,f,start){
switch(arguments.length){
case  2 :
return G__2338__2339.call(this,_,f);
case  3 :
return G__2338__2340.call(this,_,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
return G__2338;
})()
);
cljs.core.aset.call(null,cljs.core.IPrintable,"null",true);
cljs.core.aset.call(null,cljs.core._pr_seq,"null",(function (o){
return cljs.core.list.call(null,"nil");
}));
cljs.core.aset.call(null,cljs.core.ISet,"null",true);
cljs.core.aset.call(null,cljs.core._disjoin,"null",(function (_,v){
return null;
}));
cljs.core.aset.call(null,cljs.core.ICounted,"null",true);
cljs.core.aset.call(null,cljs.core._count,"null",(function (_){
return 0;
}));
cljs.core.aset.call(null,cljs.core.IStack,"null",true);
cljs.core.aset.call(null,cljs.core._peek,"null",(function (_){
return null;
}));
cljs.core.aset.call(null,cljs.core._pop,"null",(function (_){
return null;
}));
cljs.core.aset.call(null,cljs.core.ISeq,"null",true);
cljs.core.aset.call(null,cljs.core._first,"null",(function (_){
return null;
}));
cljs.core.aset.call(null,cljs.core._rest,"null",(function (_){
return cljs.core.list.call(null);
}));
cljs.core.aset.call(null,cljs.core.IEquiv,"null",true);
cljs.core.aset.call(null,cljs.core._equiv,"null",(function (_,o){
return cljs.core.nil_QMARK_.call(null,o);
}));
cljs.core.aset.call(null,cljs.core.IWithMeta,"null",true);
cljs.core.aset.call(null,cljs.core._with_meta,"null",(function (_,meta){
return null;
}));
cljs.core.aset.call(null,cljs.core.IMeta,"null",true);
cljs.core.aset.call(null,cljs.core._meta,"null",(function (_){
return null;
}));
cljs.core.aset.call(null,cljs.core.IIndexed,"null",true);
cljs.core.aset.call(null,cljs.core._nth,"null",(function() {
var G__2342 = null;
var G__2342__2343 = (function (_,n){
return null;
});
var G__2342__2344 = (function (_,n,not_found){
return not_found;
});
G__2342 = function(_,n,not_found){
switch(arguments.length){
case  2 :
return G__2342__2343.call(this,_,n);
case  3 :
return G__2342__2344.call(this,_,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__2342;
})()
);
cljs.core.aset.call(null,cljs.core.IEmptyableCollection,"null",true);
cljs.core.aset.call(null,cljs.core._empty,"null",(function (_){
return null;
}));
cljs.core.aset.call(null,cljs.core.IMap,"null",true);
cljs.core.aset.call(null,cljs.core._dissoc,"null",(function (_,k){
return null;
}));
Date.prototype.cljs$core$IEquiv$ = true;
Date.prototype.cljs$core$IEquiv$_equiv = (function (o,other){
return cljs.core.identical_QMARK_.call(null,o.toString(),other.toString());
});
cljs.core.aset.call(null,cljs.core.IHash,"number",true);
cljs.core.aset.call(null,cljs.core._hash,"number",(function (o){
return o;
}));
cljs.core.aset.call(null,cljs.core.IEquiv,"number",true);
cljs.core.aset.call(null,cljs.core._equiv,"number",(function (x,o){
return cljs.core.identical_QMARK_.call(null,x,o);
}));
cljs.core.aset.call(null,cljs.core.IHash,"boolean",true);
cljs.core.aset.call(null,cljs.core._hash,"boolean",(function (o){
return ((o === true) ? 1 : 0);
}));
cljs.core.aset.call(null,cljs.core.IHash,"function",true);
cljs.core.aset.call(null,cljs.core._hash,"function",(function (o){
return goog.getUid.call(null,o);
}));
/**
* Returns a number one greater than num.
*/
cljs.core.inc = (function inc(x){
return (x + 1);
});
/**
* Accepts any collection which satisfies the ICount and IIndexed protocols and
* reduces them without incurring seq initialization
*/
cljs.core.ci_reduce = (function() {
var ci_reduce = null;
var ci_reduce__2352 = (function (cicoll,f){
if(cljs.core.truth_(cljs.core._EQ_.call(null,0,cljs.core._count.call(null,cicoll))))
{return f.call(null);
} else
{var val__2346 = cljs.core._nth.call(null,cicoll,0);
var n__2347 = 1;

while(true){
if(cljs.core.truth_(cljs.core._LT_.call(null,n__2347,cljs.core._count.call(null,cicoll))))
{{
var G__2356 = f.call(null,val__2346,cljs.core._nth.call(null,cicoll,n__2347));
var G__2357 = cljs.core.inc.call(null,n__2347);
val__2346 = G__2356;
n__2347 = G__2357;
continue;
}
} else
{return val__2346;
}
break;
}
}
});
var ci_reduce__2353 = (function (cicoll,f,val){
var val__2348 = val;
var n__2349 = 0;

while(true){
if(cljs.core.truth_(cljs.core._LT_.call(null,n__2349,cljs.core._count.call(null,cicoll))))
{{
var G__2358 = f.call(null,val__2348,cljs.core._nth.call(null,cicoll,n__2349));
var G__2359 = cljs.core.inc.call(null,n__2349);
val__2348 = G__2358;
n__2349 = G__2359;
continue;
}
} else
{return val__2348;
}
break;
}
});
var ci_reduce__2354 = (function (cicoll,f,val,idx){
var val__2350 = val;
var n__2351 = idx;

while(true){
if(cljs.core.truth_(cljs.core._LT_.call(null,n__2351,cljs.core._count.call(null,cicoll))))
{{
var G__2360 = f.call(null,val__2350,cljs.core._nth.call(null,cicoll,n__2351));
var G__2361 = cljs.core.inc.call(null,n__2351);
val__2350 = G__2360;
n__2351 = G__2361;
continue;
}
} else
{return val__2350;
}
break;
}
});
ci_reduce = function(cicoll,f,val,idx){
switch(arguments.length){
case  2 :
return ci_reduce__2352.call(this,cicoll,f);
case  3 :
return ci_reduce__2353.call(this,cicoll,f,val);
case  4 :
return ci_reduce__2354.call(this,cicoll,f,val,idx);
}
throw('Invalid arity: ' + arguments.length);
};
return ci_reduce;
})()
;

/**
* @constructor
*/
cljs.core.IndexedSeq = (function (a,i){
this.a = a;
this.i = i;
})
cljs.core.IndexedSeq.prototype.cljs$core$IHash$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IHash$_hash = (function (coll){
var this__2362 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.IndexedSeq.prototype.cljs$core$IReduce$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IReduce$_reduce = (function() {
var G__2375 = null;
var G__2375__2376 = (function (coll,f){
var this__2363 = this;
return cljs.core.ci_reduce.call(null,coll,f,cljs.core.aget.call(null,this__2363.a,this__2363.i),cljs.core.inc.call(null,this__2363.i));
});
var G__2375__2377 = (function (coll,f,start){
var this__2364 = this;
return cljs.core.ci_reduce.call(null,coll,f,start,this__2364.i);
});
G__2375 = function(coll,f,start){
switch(arguments.length){
case  2 :
return G__2375__2376.call(this,coll,f);
case  3 :
return G__2375__2377.call(this,coll,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
return G__2375;
})()
;
cljs.core.IndexedSeq.prototype.cljs$core$ICollection$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$ICollection$_conj = (function (coll,o){
var this__2365 = this;
return cljs.core.cons.call(null,o,coll);
});
cljs.core.IndexedSeq.prototype.cljs$core$IEquiv$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IEquiv$_equiv = (function (coll,other){
var this__2366 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.IndexedSeq.prototype.cljs$core$ISequential$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IIndexed$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IIndexed$_nth = (function() {
var G__2379 = null;
var G__2379__2380 = (function (coll,n){
var this__2367 = this;
var i__2368 = cljs.core._PLUS_.call(null,n,this__2367.i);

if(cljs.core.truth_(cljs.core._LT_.call(null,i__2368,this__2367.a.length)))
{return cljs.core.aget.call(null,this__2367.a,i__2368);
} else
{return null;
}
});
var G__2379__2381 = (function (coll,n,not_found){
var this__2369 = this;
var i__2370 = cljs.core._PLUS_.call(null,n,this__2369.i);

if(cljs.core.truth_(cljs.core._LT_.call(null,i__2370,this__2369.a.length)))
{return cljs.core.aget.call(null,this__2369.a,i__2370);
} else
{return not_found;
}
});
G__2379 = function(coll,n,not_found){
switch(arguments.length){
case  2 :
return G__2379__2380.call(this,coll,n);
case  3 :
return G__2379__2381.call(this,coll,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__2379;
})()
;
cljs.core.IndexedSeq.prototype.cljs$core$ICounted$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$ICounted$_count = (function (_){
var this__2371 = this;
return cljs.core._.call(null,this__2371.a.length,this__2371.i);
});
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$_first = (function (_){
var this__2372 = this;
return cljs.core.aget.call(null,this__2372.a,this__2372.i);
});
cljs.core.IndexedSeq.prototype.cljs$core$ISeq$_rest = (function (_){
var this__2373 = this;
if(cljs.core.truth_(cljs.core._LT_.call(null,cljs.core.inc.call(null,this__2373.i),this__2373.a.length)))
{return (new cljs.core.IndexedSeq(this__2373.a,cljs.core.inc.call(null,this__2373.i)));
} else
{return cljs.core.list.call(null);
}
});
cljs.core.IndexedSeq.prototype.cljs$core$ISeqable$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$ISeqable$_seq = (function (this$){
var this__2374 = this;
return this$;
});
cljs.core.prim_seq = (function prim_seq(prim,i){
if(cljs.core.truth_(cljs.core._EQ_.call(null,0,prim.length)))
{return null;
} else
{return (new cljs.core.IndexedSeq(prim,i));
}
});
cljs.core.array_seq = (function array_seq(array,i){
return cljs.core.prim_seq.call(null,array,i);
});
cljs.core.aset.call(null,cljs.core.IReduce,"array",true);
cljs.core.aset.call(null,cljs.core._reduce,"array",(function() {
var G__2383 = null;
var G__2383__2384 = (function (array,f){
return cljs.core.ci_reduce.call(null,array,f);
});
var G__2383__2385 = (function (array,f,start){
return cljs.core.ci_reduce.call(null,array,f,start);
});
G__2383 = function(array,f,start){
switch(arguments.length){
case  2 :
return G__2383__2384.call(this,array,f);
case  3 :
return G__2383__2385.call(this,array,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
return G__2383;
})()
);
cljs.core.aset.call(null,cljs.core.ILookup,"array",true);
cljs.core.aset.call(null,cljs.core._lookup,"array",(function() {
var G__2387 = null;
var G__2387__2388 = (function (array,k){
return cljs.core.aget.call(null,array,k);
});
var G__2387__2389 = (function (array,k,not_found){
return cljs.core._nth.call(null,array,k,not_found);
});
G__2387 = function(array,k,not_found){
switch(arguments.length){
case  2 :
return G__2387__2388.call(this,array,k);
case  3 :
return G__2387__2389.call(this,array,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__2387;
})()
);
cljs.core.aset.call(null,cljs.core.IIndexed,"array",true);
cljs.core.aset.call(null,cljs.core._nth,"array",(function() {
var G__2391 = null;
var G__2391__2392 = (function (array,n){
if(cljs.core.truth_(cljs.core._LT_.call(null,n,array.length)))
{return cljs.core.aget.call(null,array,n);
} else
{return null;
}
});
var G__2391__2393 = (function (array,n,not_found){
if(cljs.core.truth_(cljs.core._LT_.call(null,n,array.length)))
{return cljs.core.aget.call(null,array,n);
} else
{return not_found;
}
});
G__2391 = function(array,n,not_found){
switch(arguments.length){
case  2 :
return G__2391__2392.call(this,array,n);
case  3 :
return G__2391__2393.call(this,array,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__2391;
})()
);
cljs.core.aset.call(null,cljs.core.ICounted,"array",true);
cljs.core.aset.call(null,cljs.core._count,"array",(function (a){
return a.length;
}));
cljs.core.aset.call(null,cljs.core.ISeqable,"array",true);
cljs.core.aset.call(null,cljs.core._seq,"array",(function (array){
return cljs.core.array_seq.call(null,array,0);
}));
/**
* Returns a seq on the collection. If the collection is
* empty, returns nil.  (seq nil) returns nil. seq also works on
* Strings.
*/
cljs.core.seq = (function seq(coll){
if(cljs.core.truth_(coll))
{return cljs.core._seq.call(null,coll);
} else
{return null;
}
});
/**
* Returns the first item in the collection. Calls seq on its
* argument. If coll is nil, returns nil.
*/
cljs.core.first = (function first(coll){
var temp__3698__auto____2395 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____2395))
{var s__2396 = temp__3698__auto____2395;

return cljs.core._first.call(null,s__2396);
} else
{return null;
}
});
/**
* Returns a possibly empty seq of the items after the first. Calls seq on its
* argument.
*/
cljs.core.rest = (function rest(coll){
return cljs.core._rest.call(null,cljs.core.seq.call(null,coll));
});
/**
* Returns a seq of the items after the first. Calls seq on its
* argument.  If there are no more items, returns nil
*/
cljs.core.next = (function next(coll){
if(cljs.core.truth_(coll))
{return cljs.core.seq.call(null,cljs.core.rest.call(null,coll));
} else
{return null;
}
});
/**
* Same as (first (next x))
*/
cljs.core.second = (function second(coll){
return cljs.core.first.call(null,cljs.core.next.call(null,coll));
});
/**
* Same as (first (first x))
*/
cljs.core.ffirst = (function ffirst(coll){
return cljs.core.first.call(null,cljs.core.first.call(null,coll));
});
/**
* Same as (next (first x))
*/
cljs.core.nfirst = (function nfirst(coll){
return cljs.core.next.call(null,cljs.core.first.call(null,coll));
});
/**
* Same as (first (next x))
*/
cljs.core.fnext = (function fnext(coll){
return cljs.core.first.call(null,cljs.core.next.call(null,coll));
});
/**
* Same as (next (next x))
*/
cljs.core.nnext = (function nnext(coll){
return cljs.core.next.call(null,cljs.core.next.call(null,coll));
});
/**
* Return the last item in coll, in linear time
*/
cljs.core.last = (function last(s){
while(true){
if(cljs.core.truth_(cljs.core.next.call(null,s)))
{{
var G__2397 = cljs.core.next.call(null,s);
s = G__2397;
continue;
}
} else
{return cljs.core.first.call(null,s);
}
break;
}
});
cljs.core.aset.call(null,cljs.core.ICounted,"_",true);
cljs.core.aset.call(null,cljs.core._count,"_",(function (x){
var s__2398 = cljs.core.seq.call(null,x);
var n__2399 = 0;

while(true){
if(cljs.core.truth_(s__2398))
{{
var G__2400 = cljs.core.next.call(null,s__2398);
var G__2401 = cljs.core.inc.call(null,n__2399);
s__2398 = G__2400;
n__2399 = G__2401;
continue;
}
} else
{return n__2399;
}
break;
}
}));
cljs.core.aset.call(null,cljs.core.IEquiv,"_",true);
cljs.core.aset.call(null,cljs.core._equiv,"_",(function (x,o){
return cljs.core.identical_QMARK_.call(null,x,o);
}));
/**
* Returns true if x is logical false, false otherwise.
*/
cljs.core.not = (function not(x){
if(cljs.core.truth_(x))
{return false;
} else
{return true;
}
});
/**
* conj[oin]. Returns a new collection with the xs
* 'added'. (conj nil item) returns (item).  The 'addition' may
* happen at different 'places' depending on the concrete type.
* @param {...*} var_args
*/
cljs.core.conj = (function() {
var conj = null;
var conj__2402 = (function (coll,x){
return cljs.core._conj.call(null,coll,x);
});
var conj__2403 = (function() { 
var G__2405__delegate = function (coll,x,xs){
while(true){
if(cljs.core.truth_(xs))
{{
var G__2406 = conj.call(null,coll,x);
var G__2407 = cljs.core.first.call(null,xs);
var G__2408 = cljs.core.next.call(null,xs);
coll = G__2406;
x = G__2407;
xs = G__2408;
continue;
}
} else
{return conj.call(null,coll,x);
}
break;
}
};
var G__2405 = function (coll,x,var_args){
var xs = null;
if (goog.isDef(var_args)) {
  xs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__2405__delegate.call(this, coll, x, xs);
};
G__2405.cljs$lang$maxFixedArity = 2;
G__2405.cljs$lang$applyTo = (function (arglist__2409){
var coll = cljs.core.first(arglist__2409);
var x = cljs.core.first(cljs.core.next(arglist__2409));
var xs = cljs.core.rest(cljs.core.next(arglist__2409));
return G__2405__delegate.call(this, coll, x, xs);
});
return G__2405;
})()
;
conj = function(coll,x,var_args){
var xs = var_args;
switch(arguments.length){
case  2 :
return conj__2402.call(this,coll,x);
default:
return conj__2403.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
conj.cljs$lang$maxFixedArity = 2;
conj.cljs$lang$applyTo = conj__2403.cljs$lang$applyTo;
return conj;
})()
;
/**
* Returns an empty collection of the same category as coll, or nil
*/
cljs.core.empty = (function empty(coll){
return cljs.core._empty.call(null,coll);
});
/**
* Returns the number of items in the collection. (count nil) returns
* 0.  Also works on strings, arrays, and Maps
*/
cljs.core.count = (function count(coll){
return cljs.core._count.call(null,coll);
});
/**
* Returns the value at the index. get returns nil if index out of
* bounds, nth throws an exception unless not-found is supplied.  nth
* also works for strings, arrays, regex Matchers and Lists, and,
* in O(n) time, for sequences.
*/
cljs.core.nth = (function() {
var nth = null;
var nth__2410 = (function (coll,n){
return cljs.core._nth.call(null,coll,n);
});
var nth__2411 = (function (coll,n,not_found){
return cljs.core._nth.call(null,coll,n,not_found);
});
nth = function(coll,n,not_found){
switch(arguments.length){
case  2 :
return nth__2410.call(this,coll,n);
case  3 :
return nth__2411.call(this,coll,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return nth;
})()
;
/**
* Returns the value mapped to key, not-found or nil if key not present.
*/
cljs.core.get = (function() {
var get = null;
var get__2413 = (function (o,k){
return cljs.core._lookup.call(null,o,k);
});
var get__2414 = (function (o,k,not_found){
return cljs.core._lookup.call(null,o,k,not_found);
});
get = function(o,k,not_found){
switch(arguments.length){
case  2 :
return get__2413.call(this,o,k);
case  3 :
return get__2414.call(this,o,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return get;
})()
;
/**
* assoc[iate]. When applied to a map, returns a new map of the
* same (hashed/sorted) type, that contains the mapping of key(s) to
* val(s). When applied to a vector, returns a new vector that
* contains val at index.
* @param {...*} var_args
*/
cljs.core.assoc = (function() {
var assoc = null;
var assoc__2417 = (function (coll,k,v){
return cljs.core._assoc.call(null,coll,k,v);
});
var assoc__2418 = (function() { 
var G__2420__delegate = function (coll,k,v,kvs){
while(true){
var ret__2416 = assoc.call(null,coll,k,v);

if(cljs.core.truth_(kvs))
{{
var G__2421 = ret__2416;
var G__2422 = cljs.core.first.call(null,kvs);
var G__2423 = cljs.core.second.call(null,kvs);
var G__2424 = cljs.core.nnext.call(null,kvs);
coll = G__2421;
k = G__2422;
v = G__2423;
kvs = G__2424;
continue;
}
} else
{return ret__2416;
}
break;
}
};
var G__2420 = function (coll,k,v,var_args){
var kvs = null;
if (goog.isDef(var_args)) {
  kvs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__2420__delegate.call(this, coll, k, v, kvs);
};
G__2420.cljs$lang$maxFixedArity = 3;
G__2420.cljs$lang$applyTo = (function (arglist__2425){
var coll = cljs.core.first(arglist__2425);
var k = cljs.core.first(cljs.core.next(arglist__2425));
var v = cljs.core.first(cljs.core.next(cljs.core.next(arglist__2425)));
var kvs = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__2425)));
return G__2420__delegate.call(this, coll, k, v, kvs);
});
return G__2420;
})()
;
assoc = function(coll,k,v,var_args){
var kvs = var_args;
switch(arguments.length){
case  3 :
return assoc__2417.call(this,coll,k,v);
default:
return assoc__2418.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
assoc.cljs$lang$maxFixedArity = 3;
assoc.cljs$lang$applyTo = assoc__2418.cljs$lang$applyTo;
return assoc;
})()
;
/**
* dissoc[iate]. Returns a new map of the same (hashed/sorted) type,
* that does not contain a mapping for key(s).
* @param {...*} var_args
*/
cljs.core.dissoc = (function() {
var dissoc = null;
var dissoc__2427 = (function (coll){
return coll;
});
var dissoc__2428 = (function (coll,k){
return cljs.core._dissoc.call(null,coll,k);
});
var dissoc__2429 = (function() { 
var G__2431__delegate = function (coll,k,ks){
while(true){
var ret__2426 = dissoc.call(null,coll,k);

if(cljs.core.truth_(ks))
{{
var G__2432 = ret__2426;
var G__2433 = cljs.core.first.call(null,ks);
var G__2434 = cljs.core.next.call(null,ks);
coll = G__2432;
k = G__2433;
ks = G__2434;
continue;
}
} else
{return ret__2426;
}
break;
}
};
var G__2431 = function (coll,k,var_args){
var ks = null;
if (goog.isDef(var_args)) {
  ks = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__2431__delegate.call(this, coll, k, ks);
};
G__2431.cljs$lang$maxFixedArity = 2;
G__2431.cljs$lang$applyTo = (function (arglist__2435){
var coll = cljs.core.first(arglist__2435);
var k = cljs.core.first(cljs.core.next(arglist__2435));
var ks = cljs.core.rest(cljs.core.next(arglist__2435));
return G__2431__delegate.call(this, coll, k, ks);
});
return G__2431;
})()
;
dissoc = function(coll,k,var_args){
var ks = var_args;
switch(arguments.length){
case  1 :
return dissoc__2427.call(this,coll);
case  2 :
return dissoc__2428.call(this,coll,k);
default:
return dissoc__2429.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
dissoc.cljs$lang$maxFixedArity = 2;
dissoc.cljs$lang$applyTo = dissoc__2429.cljs$lang$applyTo;
return dissoc;
})()
;
/**
* Returns an object of the same type and value as obj, with
* map m as its metadata.
*/
cljs.core.with_meta = (function with_meta(o,meta){
return cljs.core._with_meta.call(null,o,meta);
});
/**
* Returns the metadata of obj, returns nil if there is no metadata.
*/
cljs.core.meta = (function meta(o){
if(cljs.core.truth_((function (){var x__169__auto____2436 = o;

if(cljs.core.truth_((function (){var and__3546__auto____2437 = x__169__auto____2436;

if(cljs.core.truth_(and__3546__auto____2437))
{var and__3546__auto____2438 = x__169__auto____2436.cljs$core$IMeta$;

if(cljs.core.truth_(and__3546__auto____2438))
{return cljs.core.not.call(null,x__169__auto____2436.hasOwnProperty("cljs$core$IMeta$"));
} else
{return and__3546__auto____2438;
}
} else
{return and__3546__auto____2437;
}
})()))
{return true;
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IMeta,x__169__auto____2436);
}
})()))
{return cljs.core._meta.call(null,o);
} else
{return null;
}
});
/**
* For a list or queue, same as first, for a vector, same as, but much
* more efficient than, last. If the collection is empty, returns nil.
*/
cljs.core.peek = (function peek(coll){
return cljs.core._peek.call(null,coll);
});
/**
* For a list or queue, returns a new list/queue without the first
* item, for a vector, returns a new vector without the last item.
* Note - not the same as next/butlast.
*/
cljs.core.pop = (function pop(coll){
return cljs.core._pop.call(null,coll);
});
/**
* disj[oin]. Returns a new set of the same (hashed/sorted) type, that
* does not contain key(s).
* @param {...*} var_args
*/
cljs.core.disj = (function() {
var disj = null;
var disj__2440 = (function (coll){
return coll;
});
var disj__2441 = (function (coll,k){
return cljs.core._disjoin.call(null,coll,k);
});
var disj__2442 = (function() { 
var G__2444__delegate = function (coll,k,ks){
while(true){
var ret__2439 = disj.call(null,coll,k);

if(cljs.core.truth_(ks))
{{
var G__2445 = ret__2439;
var G__2446 = cljs.core.first.call(null,ks);
var G__2447 = cljs.core.next.call(null,ks);
coll = G__2445;
k = G__2446;
ks = G__2447;
continue;
}
} else
{return ret__2439;
}
break;
}
};
var G__2444 = function (coll,k,var_args){
var ks = null;
if (goog.isDef(var_args)) {
  ks = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__2444__delegate.call(this, coll, k, ks);
};
G__2444.cljs$lang$maxFixedArity = 2;
G__2444.cljs$lang$applyTo = (function (arglist__2448){
var coll = cljs.core.first(arglist__2448);
var k = cljs.core.first(cljs.core.next(arglist__2448));
var ks = cljs.core.rest(cljs.core.next(arglist__2448));
return G__2444__delegate.call(this, coll, k, ks);
});
return G__2444;
})()
;
disj = function(coll,k,var_args){
var ks = var_args;
switch(arguments.length){
case  1 :
return disj__2440.call(this,coll);
case  2 :
return disj__2441.call(this,coll,k);
default:
return disj__2442.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
disj.cljs$lang$maxFixedArity = 2;
disj.cljs$lang$applyTo = disj__2442.cljs$lang$applyTo;
return disj;
})()
;
cljs.core.hash = (function hash(o){
return cljs.core._hash.call(null,o);
});
/**
* Returns true if coll has no items - same as (not (seq coll)).
* Please use the idiom (seq x) rather than (not (empty? x))
*/
cljs.core.empty_QMARK_ = (function empty_QMARK_(coll){
return cljs.core.not.call(null,cljs.core.seq.call(null,coll));
});
/**
* Returns true if x satisfies ICollection
*/
cljs.core.coll_QMARK_ = (function coll_QMARK_(x){
if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,x)))
{return false;
} else
{var x__169__auto____2449 = x;

if(cljs.core.truth_((function (){var and__3546__auto____2450 = x__169__auto____2449;

if(cljs.core.truth_(and__3546__auto____2450))
{var and__3546__auto____2451 = x__169__auto____2449.cljs$core$ICollection$;

if(cljs.core.truth_(and__3546__auto____2451))
{return cljs.core.not.call(null,x__169__auto____2449.hasOwnProperty("cljs$core$ICollection$"));
} else
{return and__3546__auto____2451;
}
} else
{return and__3546__auto____2450;
}
})()))
{return true;
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ICollection,x__169__auto____2449);
}
}
});
/**
* Returns true if x satisfies ISet
*/
cljs.core.set_QMARK_ = (function set_QMARK_(x){
if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,x)))
{return false;
} else
{var x__169__auto____2452 = x;

if(cljs.core.truth_((function (){var and__3546__auto____2453 = x__169__auto____2452;

if(cljs.core.truth_(and__3546__auto____2453))
{var and__3546__auto____2454 = x__169__auto____2452.cljs$core$ISet$;

if(cljs.core.truth_(and__3546__auto____2454))
{return cljs.core.not.call(null,x__169__auto____2452.hasOwnProperty("cljs$core$ISet$"));
} else
{return and__3546__auto____2454;
}
} else
{return and__3546__auto____2453;
}
})()))
{return true;
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISet,x__169__auto____2452);
}
}
});
/**
* Returns true if coll implements Associative
*/
cljs.core.associative_QMARK_ = (function associative_QMARK_(x){
var x__169__auto____2455 = x;

if(cljs.core.truth_((function (){var and__3546__auto____2456 = x__169__auto____2455;

if(cljs.core.truth_(and__3546__auto____2456))
{var and__3546__auto____2457 = x__169__auto____2455.cljs$core$IAssociative$;

if(cljs.core.truth_(and__3546__auto____2457))
{return cljs.core.not.call(null,x__169__auto____2455.hasOwnProperty("cljs$core$IAssociative$"));
} else
{return and__3546__auto____2457;
}
} else
{return and__3546__auto____2456;
}
})()))
{return true;
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IAssociative,x__169__auto____2455);
}
});
/**
* Returns true if coll satisfies ISequential
*/
cljs.core.sequential_QMARK_ = (function sequential_QMARK_(x){
var x__169__auto____2458 = x;

if(cljs.core.truth_((function (){var and__3546__auto____2459 = x__169__auto____2458;

if(cljs.core.truth_(and__3546__auto____2459))
{var and__3546__auto____2460 = x__169__auto____2458.cljs$core$ISequential$;

if(cljs.core.truth_(and__3546__auto____2460))
{return cljs.core.not.call(null,x__169__auto____2458.hasOwnProperty("cljs$core$ISequential$"));
} else
{return and__3546__auto____2460;
}
} else
{return and__3546__auto____2459;
}
})()))
{return true;
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISequential,x__169__auto____2458);
}
});
/**
* Returns true if coll implements count in constant time
*/
cljs.core.counted_QMARK_ = (function counted_QMARK_(x){
var x__169__auto____2461 = x;

if(cljs.core.truth_((function (){var and__3546__auto____2462 = x__169__auto____2461;

if(cljs.core.truth_(and__3546__auto____2462))
{var and__3546__auto____2463 = x__169__auto____2461.cljs$core$ICounted$;

if(cljs.core.truth_(and__3546__auto____2463))
{return cljs.core.not.call(null,x__169__auto____2461.hasOwnProperty("cljs$core$ICounted$"));
} else
{return and__3546__auto____2463;
}
} else
{return and__3546__auto____2462;
}
})()))
{return true;
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ICounted,x__169__auto____2461);
}
});
/**
* Return true if x satisfies IMap
*/
cljs.core.map_QMARK_ = (function map_QMARK_(x){
if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,x)))
{return false;
} else
{var x__169__auto____2464 = x;

if(cljs.core.truth_((function (){var and__3546__auto____2465 = x__169__auto____2464;

if(cljs.core.truth_(and__3546__auto____2465))
{var and__3546__auto____2466 = x__169__auto____2464.cljs$core$IMap$;

if(cljs.core.truth_(and__3546__auto____2466))
{return cljs.core.not.call(null,x__169__auto____2464.hasOwnProperty("cljs$core$IMap$"));
} else
{return and__3546__auto____2466;
}
} else
{return and__3546__auto____2465;
}
})()))
{return true;
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IMap,x__169__auto____2464);
}
}
});
/**
* Return true if x satisfies IVector
*/
cljs.core.vector_QMARK_ = (function vector_QMARK_(x){
var x__169__auto____2467 = x;

if(cljs.core.truth_((function (){var and__3546__auto____2468 = x__169__auto____2467;

if(cljs.core.truth_(and__3546__auto____2468))
{var and__3546__auto____2469 = x__169__auto____2467.cljs$core$IVector$;

if(cljs.core.truth_(and__3546__auto____2469))
{return cljs.core.not.call(null,x__169__auto____2467.hasOwnProperty("cljs$core$IVector$"));
} else
{return and__3546__auto____2469;
}
} else
{return and__3546__auto____2468;
}
})()))
{return true;
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IVector,x__169__auto____2467);
}
});
cljs.core.js_obj = (function js_obj(){
return {};
});
cljs.core.js_keys = (function js_keys(obj){
var keys__2470 = cljs.core.array.call(null);

goog.object.forEach.call(null,obj,(function (val,key,obj){
return keys__2470.push(key);
}));
return keys__2470;
});
cljs.core.js_delete = (function js_delete(obj,key){
return delete obj[key];
});
cljs.core.lookup_sentinel = cljs.core.js_obj.call(null);
/**
* Returns true if x is the value false, false otherwise.
*/
cljs.core.false_QMARK_ = (function false_QMARK_(x){
return x === false;
});
/**
* Returns true if x is the value true, false otherwise.
*/
cljs.core.true_QMARK_ = (function true_QMARK_(x){
return x === true;
});
cljs.core.undefined_QMARK_ = (function undefined_QMARK_(x){
return (void 0 === x);
});
cljs.core.instance_QMARK_ = (function instance_QMARK_(t,o){
return (o instanceof t);
});
/**
* Return true if s satisfies ISeq
*/
cljs.core.seq_QMARK_ = (function seq_QMARK_(s){
if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,s)))
{return false;
} else
{var x__169__auto____2471 = s;

if(cljs.core.truth_((function (){var and__3546__auto____2472 = x__169__auto____2471;

if(cljs.core.truth_(and__3546__auto____2472))
{var and__3546__auto____2473 = x__169__auto____2471.cljs$core$ISeq$;

if(cljs.core.truth_(and__3546__auto____2473))
{return cljs.core.not.call(null,x__169__auto____2471.hasOwnProperty("cljs$core$ISeq$"));
} else
{return and__3546__auto____2473;
}
} else
{return and__3546__auto____2472;
}
})()))
{return true;
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.ISeq,x__169__auto____2471);
}
}
});
cljs.core.boolean$ = (function boolean$(x){
if(cljs.core.truth_(x))
{return true;
} else
{return false;
}
});
cljs.core.string_QMARK_ = (function string_QMARK_(x){
var and__3546__auto____2474 = goog.isString.call(null,x);

if(cljs.core.truth_(and__3546__auto____2474))
{return cljs.core.not.call(null,(function (){var or__3548__auto____2475 = cljs.core._EQ_.call(null,x.charAt(0),"﷐");

if(cljs.core.truth_(or__3548__auto____2475))
{return or__3548__auto____2475;
} else
{return cljs.core._EQ_.call(null,x.charAt(0),"﷑");
}
})());
} else
{return and__3546__auto____2474;
}
});
cljs.core.keyword_QMARK_ = (function keyword_QMARK_(x){
var and__3546__auto____2476 = goog.isString.call(null,x);

if(cljs.core.truth_(and__3546__auto____2476))
{return cljs.core._EQ_.call(null,x.charAt(0),"﷐");
} else
{return and__3546__auto____2476;
}
});
cljs.core.symbol_QMARK_ = (function symbol_QMARK_(x){
var and__3546__auto____2477 = goog.isString.call(null,x);

if(cljs.core.truth_(and__3546__auto____2477))
{return cljs.core._EQ_.call(null,x.charAt(0),"﷑");
} else
{return and__3546__auto____2477;
}
});
cljs.core.number_QMARK_ = (function number_QMARK_(n){
return goog.isNumber.call(null,n);
});
cljs.core.fn_QMARK_ = (function fn_QMARK_(f){
return goog.isFunction.call(null,f);
});
/**
* Returns true if n is an integer.  Warning: returns true on underflow condition.
*/
cljs.core.integer_QMARK_ = (function integer_QMARK_(n){
var and__3546__auto____2478 = cljs.core.number_QMARK_.call(null,n);

if(cljs.core.truth_(and__3546__auto____2478))
{return (n == n.toFixed());
} else
{return and__3546__auto____2478;
}
});
/**
* Returns true if key is present in the given collection, otherwise
* returns false.  Note that for numerically indexed collections like
* vectors and arrays, this tests if the numeric key is within the
* range of indexes. 'contains?' operates constant or logarithmic time;
* it will not perform a linear search for a value.  See also 'some'.
*/
cljs.core.contains_QMARK_ = (function contains_QMARK_(coll,v){
if(cljs.core.truth_(cljs.core.identical_QMARK_.call(null,cljs.core._lookup.call(null,coll,v,cljs.core.lookup_sentinel),cljs.core.lookup_sentinel)))
{return false;
} else
{return true;
}
});
/**
* Returns the map entry for key, or nil if key not present.
*/
cljs.core.find = (function find(coll,k){
if(cljs.core.truth_((function (){var and__3546__auto____2479 = coll;

if(cljs.core.truth_(and__3546__auto____2479))
{var and__3546__auto____2480 = cljs.core.associative_QMARK_.call(null,coll);

if(cljs.core.truth_(and__3546__auto____2480))
{return cljs.core.contains_QMARK_.call(null,coll,k);
} else
{return and__3546__auto____2480;
}
} else
{return and__3546__auto____2479;
}
})()))
{return cljs.core.Vector.fromArray([k,cljs.core._lookup.call(null,coll,k)]);
} else
{return null;
}
});
/**
* Returns true if no two of the arguments are =
* @param {...*} var_args
*/
cljs.core.distinct_QMARK_ = (function() {
var distinct_QMARK_ = null;
var distinct_QMARK___2485 = (function (x){
return true;
});
var distinct_QMARK___2486 = (function (x,y){
return cljs.core.not.call(null,cljs.core._EQ_.call(null,x,y));
});
var distinct_QMARK___2487 = (function() { 
var G__2489__delegate = function (x,y,more){
if(cljs.core.truth_(cljs.core.not.call(null,cljs.core._EQ_.call(null,x,y))))
{var s__2481 = cljs.core.set([y,x]);
var xs__2482 = more;

while(true){
var x__2483 = cljs.core.first.call(null,xs__2482);
var etc__2484 = cljs.core.next.call(null,xs__2482);

if(cljs.core.truth_(xs__2482))
{if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null,s__2481,x__2483)))
{return false;
} else
{{
var G__2490 = cljs.core.conj.call(null,s__2481,x__2483);
var G__2491 = etc__2484;
s__2481 = G__2490;
xs__2482 = G__2491;
continue;
}
}
} else
{return true;
}
break;
}
} else
{return false;
}
};
var G__2489 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__2489__delegate.call(this, x, y, more);
};
G__2489.cljs$lang$maxFixedArity = 2;
G__2489.cljs$lang$applyTo = (function (arglist__2492){
var x = cljs.core.first(arglist__2492);
var y = cljs.core.first(cljs.core.next(arglist__2492));
var more = cljs.core.rest(cljs.core.next(arglist__2492));
return G__2489__delegate.call(this, x, y, more);
});
return G__2489;
})()
;
distinct_QMARK_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return distinct_QMARK___2485.call(this,x);
case  2 :
return distinct_QMARK___2486.call(this,x,y);
default:
return distinct_QMARK___2487.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
distinct_QMARK_.cljs$lang$maxFixedArity = 2;
distinct_QMARK_.cljs$lang$applyTo = distinct_QMARK___2487.cljs$lang$applyTo;
return distinct_QMARK_;
})()
;
/**
* Comparator. Returns a negative number, zero, or a positive number
* when x is logically 'less than', 'equal to', or 'greater than'
* y. Uses google.array.defaultCompare.
*/
cljs.core.compare = (function compare(x,y){
return goog.array.defaultCompare.call(null,x,y);
});
/**
* Given a fn that might be boolean valued or a comparator,
* return a fn that is a comparator.
*/
cljs.core.fn__GT_comparator = (function fn__GT_comparator(f){
if(cljs.core.truth_(cljs.core._EQ_.call(null,f,cljs.core.compare)))
{return cljs.core.compare;
} else
{return (function (x,y){
var r__2493 = f.call(null,x,y);

if(cljs.core.truth_(cljs.core.number_QMARK_.call(null,r__2493)))
{return r__2493;
} else
{if(cljs.core.truth_(r__2493))
{return -1;
} else
{if(cljs.core.truth_(f.call(null,y,x)))
{return 1;
} else
{return 0;
}
}
}
});
}
});
/**
* Returns a sorted sequence of the items in coll. Comp can be
* boolean-valued comparison funcion, or a -/0/+ valued comparator.
* Comp defaults to compare.
*/
cljs.core.sort = (function() {
var sort = null;
var sort__2495 = (function (coll){
return sort.call(null,cljs.core.compare,coll);
});
var sort__2496 = (function (comp,coll){
if(cljs.core.truth_(cljs.core.seq.call(null,coll)))
{var a__2494 = cljs.core.to_array.call(null,coll);

goog.array.stableSort.call(null,a__2494,cljs.core.fn__GT_comparator.call(null,comp));
return cljs.core.seq.call(null,a__2494);
} else
{return cljs.core.List.EMPTY;
}
});
sort = function(comp,coll){
switch(arguments.length){
case  1 :
return sort__2495.call(this,comp);
case  2 :
return sort__2496.call(this,comp,coll);
}
throw('Invalid arity: ' + arguments.length);
};
return sort;
})()
;
/**
* Returns a sorted sequence of the items in coll, where the sort
* order is determined by comparing (keyfn item).  Comp can be
* boolean-valued comparison funcion, or a -/0/+ valued comparator.
* Comp defaults to compare.
*/
cljs.core.sort_by = (function() {
var sort_by = null;
var sort_by__2498 = (function (keyfn,coll){
return sort_by.call(null,keyfn,cljs.core.compare,coll);
});
var sort_by__2499 = (function (keyfn,comp,coll){
return cljs.core.sort.call(null,(function (x,y){
return cljs.core.fn__GT_comparator.call(null,comp).call(null,keyfn.call(null,x),keyfn.call(null,y));
}),coll);
});
sort_by = function(keyfn,comp,coll){
switch(arguments.length){
case  2 :
return sort_by__2498.call(this,keyfn,comp);
case  3 :
return sort_by__2499.call(this,keyfn,comp,coll);
}
throw('Invalid arity: ' + arguments.length);
};
return sort_by;
})()
;
/**
* f should be a function of 2 arguments. If val is not supplied,
* returns the result of applying f to the first 2 items in coll, then
* applying f to that result and the 3rd item, etc. If coll contains no
* items, f must accept no arguments as well, and reduce returns the
* result of calling f with no arguments.  If coll has only 1 item, it
* is returned and f is not called.  If val is supplied, returns the
* result of applying f to val and the first item in coll, then
* applying f to that result and the 2nd item, etc. If coll contains no
* items, returns val and f is not called.
*/
cljs.core.reduce = (function() {
var reduce = null;
var reduce__2501 = (function (f,coll){
return cljs.core._reduce.call(null,coll,f);
});
var reduce__2502 = (function (f,val,coll){
return cljs.core._reduce.call(null,coll,f,val);
});
reduce = function(f,val,coll){
switch(arguments.length){
case  2 :
return reduce__2501.call(this,f,val);
case  3 :
return reduce__2502.call(this,f,val,coll);
}
throw('Invalid arity: ' + arguments.length);
};
return reduce;
})()
;
cljs.core.seq_reduce = (function() {
var seq_reduce = null;
var seq_reduce__2508 = (function (f,coll){
var temp__3695__auto____2504 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3695__auto____2504))
{var s__2505 = temp__3695__auto____2504;

return cljs.core.reduce.call(null,f,cljs.core.first.call(null,s__2505),cljs.core.next.call(null,s__2505));
} else
{return f.call(null);
}
});
var seq_reduce__2509 = (function (f,val,coll){
var val__2506 = val;
var coll__2507 = cljs.core.seq.call(null,coll);

while(true){
if(cljs.core.truth_(coll__2507))
{{
var G__2511 = f.call(null,val__2506,cljs.core.first.call(null,coll__2507));
var G__2512 = cljs.core.next.call(null,coll__2507);
val__2506 = G__2511;
coll__2507 = G__2512;
continue;
}
} else
{return val__2506;
}
break;
}
});
seq_reduce = function(f,val,coll){
switch(arguments.length){
case  2 :
return seq_reduce__2508.call(this,f,val);
case  3 :
return seq_reduce__2509.call(this,f,val,coll);
}
throw('Invalid arity: ' + arguments.length);
};
return seq_reduce;
})()
;
cljs.core.aset.call(null,cljs.core.IReduce,"_",true);
cljs.core.aset.call(null,cljs.core._reduce,"_",(function() {
var G__2513 = null;
var G__2513__2514 = (function (coll,f){
return cljs.core.seq_reduce.call(null,f,coll);
});
var G__2513__2515 = (function (coll,f,start){
return cljs.core.seq_reduce.call(null,f,start,coll);
});
G__2513 = function(coll,f,start){
switch(arguments.length){
case  2 :
return G__2513__2514.call(this,coll,f);
case  3 :
return G__2513__2515.call(this,coll,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
return G__2513;
})()
);
/**
* Returns the sum of nums. (+) returns 0.
* @param {...*} var_args
*/
cljs.core._PLUS_ = (function() {
var _PLUS_ = null;
var _PLUS___2517 = (function (){
return 0;
});
var _PLUS___2518 = (function (x){
return x;
});
var _PLUS___2519 = (function (x,y){
return (x + y);
});
var _PLUS___2520 = (function() { 
var G__2522__delegate = function (x,y,more){
return cljs.core.reduce.call(null,_PLUS_,_PLUS_.call(null,x,y),more);
};
var G__2522 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__2522__delegate.call(this, x, y, more);
};
G__2522.cljs$lang$maxFixedArity = 2;
G__2522.cljs$lang$applyTo = (function (arglist__2523){
var x = cljs.core.first(arglist__2523);
var y = cljs.core.first(cljs.core.next(arglist__2523));
var more = cljs.core.rest(cljs.core.next(arglist__2523));
return G__2522__delegate.call(this, x, y, more);
});
return G__2522;
})()
;
_PLUS_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  0 :
return _PLUS___2517.call(this);
case  1 :
return _PLUS___2518.call(this,x);
case  2 :
return _PLUS___2519.call(this,x,y);
default:
return _PLUS___2520.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
_PLUS_.cljs$lang$maxFixedArity = 2;
_PLUS_.cljs$lang$applyTo = _PLUS___2520.cljs$lang$applyTo;
return _PLUS_;
})()
;
/**
* If no ys are supplied, returns the negation of x, else subtracts
* the ys from x and returns the result.
* @param {...*} var_args
*/
cljs.core._ = (function() {
var _ = null;
var ___2524 = (function (x){
return (- x);
});
var ___2525 = (function (x,y){
return (x - y);
});
var ___2526 = (function() { 
var G__2528__delegate = function (x,y,more){
return cljs.core.reduce.call(null,_,_.call(null,x,y),more);
};
var G__2528 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__2528__delegate.call(this, x, y, more);
};
G__2528.cljs$lang$maxFixedArity = 2;
G__2528.cljs$lang$applyTo = (function (arglist__2529){
var x = cljs.core.first(arglist__2529);
var y = cljs.core.first(cljs.core.next(arglist__2529));
var more = cljs.core.rest(cljs.core.next(arglist__2529));
return G__2528__delegate.call(this, x, y, more);
});
return G__2528;
})()
;
_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return ___2524.call(this,x);
case  2 :
return ___2525.call(this,x,y);
default:
return ___2526.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
_.cljs$lang$maxFixedArity = 2;
_.cljs$lang$applyTo = ___2526.cljs$lang$applyTo;
return _;
})()
;
/**
* Returns the product of nums. (*) returns 1.
* @param {...*} var_args
*/
cljs.core._STAR_ = (function() {
var _STAR_ = null;
var _STAR___2530 = (function (){
return 1;
});
var _STAR___2531 = (function (x){
return x;
});
var _STAR___2532 = (function (x,y){
return (x * y);
});
var _STAR___2533 = (function() { 
var G__2535__delegate = function (x,y,more){
return cljs.core.reduce.call(null,_STAR_,_STAR_.call(null,x,y),more);
};
var G__2535 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__2535__delegate.call(this, x, y, more);
};
G__2535.cljs$lang$maxFixedArity = 2;
G__2535.cljs$lang$applyTo = (function (arglist__2536){
var x = cljs.core.first(arglist__2536);
var y = cljs.core.first(cljs.core.next(arglist__2536));
var more = cljs.core.rest(cljs.core.next(arglist__2536));
return G__2535__delegate.call(this, x, y, more);
});
return G__2535;
})()
;
_STAR_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  0 :
return _STAR___2530.call(this);
case  1 :
return _STAR___2531.call(this,x);
case  2 :
return _STAR___2532.call(this,x,y);
default:
return _STAR___2533.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
_STAR_.cljs$lang$maxFixedArity = 2;
_STAR_.cljs$lang$applyTo = _STAR___2533.cljs$lang$applyTo;
return _STAR_;
})()
;
/**
* If no denominators are supplied, returns 1/numerator,
* else returns numerator divided by all of the denominators.
* @param {...*} var_args
*/
cljs.core._SLASH_ = (function() {
var _SLASH_ = null;
var _SLASH___2537 = (function (x){
return (1 / x);
});
var _SLASH___2538 = (function (x,y){
return (x / y);
});
var _SLASH___2539 = (function() { 
var G__2541__delegate = function (x,y,more){
return cljs.core.reduce.call(null,_SLASH_,_SLASH_.call(null,x,y),more);
};
var G__2541 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__2541__delegate.call(this, x, y, more);
};
G__2541.cljs$lang$maxFixedArity = 2;
G__2541.cljs$lang$applyTo = (function (arglist__2542){
var x = cljs.core.first(arglist__2542);
var y = cljs.core.first(cljs.core.next(arglist__2542));
var more = cljs.core.rest(cljs.core.next(arglist__2542));
return G__2541__delegate.call(this, x, y, more);
});
return G__2541;
})()
;
_SLASH_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return _SLASH___2537.call(this,x);
case  2 :
return _SLASH___2538.call(this,x,y);
default:
return _SLASH___2539.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
_SLASH_.cljs$lang$maxFixedArity = 2;
_SLASH_.cljs$lang$applyTo = _SLASH___2539.cljs$lang$applyTo;
return _SLASH_;
})()
;
/**
* Returns non-nil if nums are in monotonically increasing order,
* otherwise false.
* @param {...*} var_args
*/
cljs.core._LT_ = (function() {
var _LT_ = null;
var _LT___2543 = (function (x){
return true;
});
var _LT___2544 = (function (x,y){
return (x < y);
});
var _LT___2545 = (function() { 
var G__2547__delegate = function (x,y,more){
while(true){
if(cljs.core.truth_(_LT_.call(null,x,y)))
{if(cljs.core.truth_(cljs.core.next.call(null,more)))
{{
var G__2548 = y;
var G__2549 = cljs.core.first.call(null,more);
var G__2550 = cljs.core.next.call(null,more);
x = G__2548;
y = G__2549;
more = G__2550;
continue;
}
} else
{return _LT_.call(null,y,cljs.core.first.call(null,more));
}
} else
{return false;
}
break;
}
};
var G__2547 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__2547__delegate.call(this, x, y, more);
};
G__2547.cljs$lang$maxFixedArity = 2;
G__2547.cljs$lang$applyTo = (function (arglist__2551){
var x = cljs.core.first(arglist__2551);
var y = cljs.core.first(cljs.core.next(arglist__2551));
var more = cljs.core.rest(cljs.core.next(arglist__2551));
return G__2547__delegate.call(this, x, y, more);
});
return G__2547;
})()
;
_LT_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return _LT___2543.call(this,x);
case  2 :
return _LT___2544.call(this,x,y);
default:
return _LT___2545.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
_LT_.cljs$lang$maxFixedArity = 2;
_LT_.cljs$lang$applyTo = _LT___2545.cljs$lang$applyTo;
return _LT_;
})()
;
/**
* Returns non-nil if nums are in monotonically non-decreasing order,
* otherwise false.
* @param {...*} var_args
*/
cljs.core._LT__EQ_ = (function() {
var _LT__EQ_ = null;
var _LT__EQ___2552 = (function (x){
return true;
});
var _LT__EQ___2553 = (function (x,y){
return (x <= y);
});
var _LT__EQ___2554 = (function() { 
var G__2556__delegate = function (x,y,more){
while(true){
if(cljs.core.truth_(_LT__EQ_.call(null,x,y)))
{if(cljs.core.truth_(cljs.core.next.call(null,more)))
{{
var G__2557 = y;
var G__2558 = cljs.core.first.call(null,more);
var G__2559 = cljs.core.next.call(null,more);
x = G__2557;
y = G__2558;
more = G__2559;
continue;
}
} else
{return _LT__EQ_.call(null,y,cljs.core.first.call(null,more));
}
} else
{return false;
}
break;
}
};
var G__2556 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__2556__delegate.call(this, x, y, more);
};
G__2556.cljs$lang$maxFixedArity = 2;
G__2556.cljs$lang$applyTo = (function (arglist__2560){
var x = cljs.core.first(arglist__2560);
var y = cljs.core.first(cljs.core.next(arglist__2560));
var more = cljs.core.rest(cljs.core.next(arglist__2560));
return G__2556__delegate.call(this, x, y, more);
});
return G__2556;
})()
;
_LT__EQ_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return _LT__EQ___2552.call(this,x);
case  2 :
return _LT__EQ___2553.call(this,x,y);
default:
return _LT__EQ___2554.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
_LT__EQ_.cljs$lang$maxFixedArity = 2;
_LT__EQ_.cljs$lang$applyTo = _LT__EQ___2554.cljs$lang$applyTo;
return _LT__EQ_;
})()
;
/**
* Returns non-nil if nums are in monotonically decreasing order,
* otherwise false.
* @param {...*} var_args
*/
cljs.core._GT_ = (function() {
var _GT_ = null;
var _GT___2561 = (function (x){
return true;
});
var _GT___2562 = (function (x,y){
return (x > y);
});
var _GT___2563 = (function() { 
var G__2565__delegate = function (x,y,more){
while(true){
if(cljs.core.truth_(_GT_.call(null,x,y)))
{if(cljs.core.truth_(cljs.core.next.call(null,more)))
{{
var G__2566 = y;
var G__2567 = cljs.core.first.call(null,more);
var G__2568 = cljs.core.next.call(null,more);
x = G__2566;
y = G__2567;
more = G__2568;
continue;
}
} else
{return _GT_.call(null,y,cljs.core.first.call(null,more));
}
} else
{return false;
}
break;
}
};
var G__2565 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__2565__delegate.call(this, x, y, more);
};
G__2565.cljs$lang$maxFixedArity = 2;
G__2565.cljs$lang$applyTo = (function (arglist__2569){
var x = cljs.core.first(arglist__2569);
var y = cljs.core.first(cljs.core.next(arglist__2569));
var more = cljs.core.rest(cljs.core.next(arglist__2569));
return G__2565__delegate.call(this, x, y, more);
});
return G__2565;
})()
;
_GT_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return _GT___2561.call(this,x);
case  2 :
return _GT___2562.call(this,x,y);
default:
return _GT___2563.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
_GT_.cljs$lang$maxFixedArity = 2;
_GT_.cljs$lang$applyTo = _GT___2563.cljs$lang$applyTo;
return _GT_;
})()
;
/**
* Returns non-nil if nums are in monotonically non-increasing order,
* otherwise false.
* @param {...*} var_args
*/
cljs.core._GT__EQ_ = (function() {
var _GT__EQ_ = null;
var _GT__EQ___2570 = (function (x){
return true;
});
var _GT__EQ___2571 = (function (x,y){
return (x >= y);
});
var _GT__EQ___2572 = (function() { 
var G__2574__delegate = function (x,y,more){
while(true){
if(cljs.core.truth_(_GT__EQ_.call(null,x,y)))
{if(cljs.core.truth_(cljs.core.next.call(null,more)))
{{
var G__2575 = y;
var G__2576 = cljs.core.first.call(null,more);
var G__2577 = cljs.core.next.call(null,more);
x = G__2575;
y = G__2576;
more = G__2577;
continue;
}
} else
{return _GT__EQ_.call(null,y,cljs.core.first.call(null,more));
}
} else
{return false;
}
break;
}
};
var G__2574 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__2574__delegate.call(this, x, y, more);
};
G__2574.cljs$lang$maxFixedArity = 2;
G__2574.cljs$lang$applyTo = (function (arglist__2578){
var x = cljs.core.first(arglist__2578);
var y = cljs.core.first(cljs.core.next(arglist__2578));
var more = cljs.core.rest(cljs.core.next(arglist__2578));
return G__2574__delegate.call(this, x, y, more);
});
return G__2574;
})()
;
_GT__EQ_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return _GT__EQ___2570.call(this,x);
case  2 :
return _GT__EQ___2571.call(this,x,y);
default:
return _GT__EQ___2572.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
_GT__EQ_.cljs$lang$maxFixedArity = 2;
_GT__EQ_.cljs$lang$applyTo = _GT__EQ___2572.cljs$lang$applyTo;
return _GT__EQ_;
})()
;
/**
* Returns a number one less than num.
*/
cljs.core.dec = (function dec(x){
return cljs.core._.call(null,x,1);
});
/**
* Returns the greatest of the nums.
* @param {...*} var_args
*/
cljs.core.max = (function() {
var max = null;
var max__2579 = (function (x){
return x;
});
var max__2580 = (function (x,y){
return ((x > y) ? x : y);
});
var max__2581 = (function() { 
var G__2583__delegate = function (x,y,more){
return cljs.core.reduce.call(null,max,max.call(null,x,y),more);
};
var G__2583 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__2583__delegate.call(this, x, y, more);
};
G__2583.cljs$lang$maxFixedArity = 2;
G__2583.cljs$lang$applyTo = (function (arglist__2584){
var x = cljs.core.first(arglist__2584);
var y = cljs.core.first(cljs.core.next(arglist__2584));
var more = cljs.core.rest(cljs.core.next(arglist__2584));
return G__2583__delegate.call(this, x, y, more);
});
return G__2583;
})()
;
max = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return max__2579.call(this,x);
case  2 :
return max__2580.call(this,x,y);
default:
return max__2581.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
max.cljs$lang$maxFixedArity = 2;
max.cljs$lang$applyTo = max__2581.cljs$lang$applyTo;
return max;
})()
;
/**
* Returns the least of the nums.
* @param {...*} var_args
*/
cljs.core.min = (function() {
var min = null;
var min__2585 = (function (x){
return x;
});
var min__2586 = (function (x,y){
return ((x < y) ? x : y);
});
var min__2587 = (function() { 
var G__2589__delegate = function (x,y,more){
return cljs.core.reduce.call(null,min,min.call(null,x,y),more);
};
var G__2589 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__2589__delegate.call(this, x, y, more);
};
G__2589.cljs$lang$maxFixedArity = 2;
G__2589.cljs$lang$applyTo = (function (arglist__2590){
var x = cljs.core.first(arglist__2590);
var y = cljs.core.first(cljs.core.next(arglist__2590));
var more = cljs.core.rest(cljs.core.next(arglist__2590));
return G__2589__delegate.call(this, x, y, more);
});
return G__2589;
})()
;
min = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return min__2585.call(this,x);
case  2 :
return min__2586.call(this,x,y);
default:
return min__2587.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
min.cljs$lang$maxFixedArity = 2;
min.cljs$lang$applyTo = min__2587.cljs$lang$applyTo;
return min;
})()
;
cljs.core.fix = (function fix(q){
if(cljs.core.truth_(cljs.core._GT__EQ_.call(null,q,0)))
{return Math.floor.call(null,q);
} else
{return Math.ceil.call(null,q);
}
});
/**
* Modulus of num and div. Truncates toward negative infinity.
*/
cljs.core.mod = (function mod(n,d){
return (n % d);
});
/**
* quot[ient] of dividing numerator by denominator.
*/
cljs.core.quot = (function quot(n,d){
var rem__2591 = cljs.core.mod.call(null,n,d);

return cljs.core.fix.call(null,((n - rem__2591) / d));
});
/**
* remainder of dividing numerator by denominator.
*/
cljs.core.rem = (function rem(n,d){
var q__2592 = cljs.core.quot.call(null,n,d);

return (n - (d * q__2592));
});
/**
* Returns a random floating point number between 0 (inclusive) and n (default 1) (exclusive).
*/
cljs.core.rand = (function() {
var rand = null;
var rand__2593 = (function (){
return Math.random.call(null);
});
var rand__2594 = (function (n){
return cljs.core._STAR_.call(null,n,rand.call(null));
});
rand = function(n){
switch(arguments.length){
case  0 :
return rand__2593.call(this);
case  1 :
return rand__2594.call(this,n);
}
throw('Invalid arity: ' + arguments.length);
};
return rand;
})()
;
/**
* Returns a random integer between 0 (inclusive) and n (exclusive).
*/
cljs.core.rand_int = (function rand_int(n){
return cljs.core.fix.call(null,cljs.core.rand.call(null,n));
});
/**
* Bitwise exclusive or
*/
cljs.core.bit_xor = (function bit_xor(x,y){
return (x ^ y);
});
/**
* Bitwise and
*/
cljs.core.bit_and = (function bit_and(x,y){
return (x & y);
});
/**
* Bitwise or
*/
cljs.core.bit_or = (function bit_or(x,y){
return (x | y);
});
/**
* Bitwise and
*/
cljs.core.bit_and_not = (function bit_and_not(x,y){
return (x & ~y);
});
/**
* Clear bit at index n
*/
cljs.core.bit_clear = (function bit_clear(x,n){
return (x & ~(1 << n));
});
/**
* Flip bit at index n
*/
cljs.core.bit_flip = (function bit_flip(x,n){
return (x ^ (1 << n));
});
/**
* Bitwise complement
*/
cljs.core.bit_not = (function bit_not(x){
return (~x);
});
/**
* Set bit at index n
*/
cljs.core.bit_set = (function bit_set(x,n){
return (x | (1 << n));
});
/**
* Test bit at index n
*/
cljs.core.bit_test = (function bit_test(x,n){
return ((x & (1 << n)) != 0);
});
/**
* Bitwise shift left
*/
cljs.core.bit_shift_left = (function bit_shift_left(x,n){
return (x << n);
});
/**
* Bitwise shift right
*/
cljs.core.bit_shift_right = (function bit_shift_right(x,n){
return (x >> n);
});
/**
* Returns non-nil if nums all have the equivalent
* value (type-independent), otherwise false
* @param {...*} var_args
*/
cljs.core._EQ__EQ_ = (function() {
var _EQ__EQ_ = null;
var _EQ__EQ___2596 = (function (x){
return true;
});
var _EQ__EQ___2597 = (function (x,y){
return cljs.core._equiv.call(null,x,y);
});
var _EQ__EQ___2598 = (function() { 
var G__2600__delegate = function (x,y,more){
while(true){
if(cljs.core.truth_(_EQ__EQ_.call(null,x,y)))
{if(cljs.core.truth_(cljs.core.next.call(null,more)))
{{
var G__2601 = y;
var G__2602 = cljs.core.first.call(null,more);
var G__2603 = cljs.core.next.call(null,more);
x = G__2601;
y = G__2602;
more = G__2603;
continue;
}
} else
{return _EQ__EQ_.call(null,y,cljs.core.first.call(null,more));
}
} else
{return false;
}
break;
}
};
var G__2600 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__2600__delegate.call(this, x, y, more);
};
G__2600.cljs$lang$maxFixedArity = 2;
G__2600.cljs$lang$applyTo = (function (arglist__2604){
var x = cljs.core.first(arglist__2604);
var y = cljs.core.first(cljs.core.next(arglist__2604));
var more = cljs.core.rest(cljs.core.next(arglist__2604));
return G__2600__delegate.call(this, x, y, more);
});
return G__2600;
})()
;
_EQ__EQ_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return _EQ__EQ___2596.call(this,x);
case  2 :
return _EQ__EQ___2597.call(this,x,y);
default:
return _EQ__EQ___2598.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
_EQ__EQ_.cljs$lang$maxFixedArity = 2;
_EQ__EQ_.cljs$lang$applyTo = _EQ__EQ___2598.cljs$lang$applyTo;
return _EQ__EQ_;
})()
;
/**
* Returns true if num is greater than zero, else false
*/
cljs.core.pos_QMARK_ = (function pos_QMARK_(n){
return cljs.core._LT_.call(null,0,n);
});
cljs.core.zero_QMARK_ = (function zero_QMARK_(n){
return cljs.core._EQ__EQ_.call(null,0,n);
});
/**
* Returns true if num is less than zero, else false
*/
cljs.core.neg_QMARK_ = (function neg_QMARK_(x){
return (x < 0);
});
/**
* Returns the nth next of coll, (seq coll) when n is 0.
*/
cljs.core.nthnext = (function nthnext(coll,n){
var n__2605 = n;
var xs__2606 = cljs.core.seq.call(null,coll);

while(true){
if(cljs.core.truth_((function (){var and__3546__auto____2607 = xs__2606;

if(cljs.core.truth_(and__3546__auto____2607))
{return cljs.core.pos_QMARK_.call(null,n__2605);
} else
{return and__3546__auto____2607;
}
})()))
{{
var G__2608 = cljs.core.dec.call(null,n__2605);
var G__2609 = cljs.core.next.call(null,xs__2606);
n__2605 = G__2608;
xs__2606 = G__2609;
continue;
}
} else
{return xs__2606;
}
break;
}
});
cljs.core.aset.call(null,cljs.core.IIndexed,"_",true);
cljs.core.aset.call(null,cljs.core._nth,"_",(function() {
var G__2614 = null;
var G__2614__2615 = (function (coll,n){
var temp__3695__auto____2610 = cljs.core.nthnext.call(null,coll,n);

if(cljs.core.truth_(temp__3695__auto____2610))
{var xs__2611 = temp__3695__auto____2610;

return cljs.core.first.call(null,xs__2611);
} else
{throw (new Error("Index out of bounds"));
}
});
var G__2614__2616 = (function (coll,n,not_found){
var temp__3695__auto____2612 = cljs.core.nthnext.call(null,coll,n);

if(cljs.core.truth_(temp__3695__auto____2612))
{var xs__2613 = temp__3695__auto____2612;

return cljs.core.first.call(null,xs__2613);
} else
{return not_found;
}
});
G__2614 = function(coll,n,not_found){
switch(arguments.length){
case  2 :
return G__2614__2615.call(this,coll,n);
case  3 :
return G__2614__2616.call(this,coll,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__2614;
})()
);
/**
* Internal - do not use!
* @param {...*} var_args
*/
cljs.core.str_STAR_ = (function() {
var str_STAR_ = null;
var str_STAR___2618 = (function (){
return "";
});
var str_STAR___2619 = (function (x){
if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,x)))
{return "";
} else
{if(cljs.core.truth_("﷐'else"))
{return x.toString();
} else
{return null;
}
}
});
var str_STAR___2620 = (function() { 
var G__2622__delegate = function (x,ys){
return (function (sb,more){
while(true){
if(cljs.core.truth_(more))
{{
var G__2623 = sb.append(str_STAR_.call(null,cljs.core.first.call(null,more)));
var G__2624 = cljs.core.next.call(null,more);
sb = G__2623;
more = G__2624;
continue;
}
} else
{return str_STAR_.call(null,sb);
}
break;
}
}).call(null,(new goog.string.StringBuffer(str_STAR_.call(null,x))),ys);
};
var G__2622 = function (x,var_args){
var ys = null;
if (goog.isDef(var_args)) {
  ys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return G__2622__delegate.call(this, x, ys);
};
G__2622.cljs$lang$maxFixedArity = 1;
G__2622.cljs$lang$applyTo = (function (arglist__2625){
var x = cljs.core.first(arglist__2625);
var ys = cljs.core.rest(arglist__2625);
return G__2622__delegate.call(this, x, ys);
});
return G__2622;
})()
;
str_STAR_ = function(x,var_args){
var ys = var_args;
switch(arguments.length){
case  0 :
return str_STAR___2618.call(this);
case  1 :
return str_STAR___2619.call(this,x);
default:
return str_STAR___2620.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
str_STAR_.cljs$lang$maxFixedArity = 1;
str_STAR_.cljs$lang$applyTo = str_STAR___2620.cljs$lang$applyTo;
return str_STAR_;
})()
;
/**
* With no args, returns the empty string. With one arg x, returns
* x.toString().  (str nil) returns the empty string. With more than
* one arg, returns the concatenation of the str values of the args.
* @param {...*} var_args
*/
cljs.core.str = (function() {
var str = null;
var str__2626 = (function (){
return "";
});
var str__2627 = (function (x){
if(cljs.core.truth_(cljs.core.symbol_QMARK_.call(null,x)))
{return x.substring(2,x.length);
} else
{if(cljs.core.truth_(cljs.core.keyword_QMARK_.call(null,x)))
{return cljs.core.str_STAR_.call(null,":",x.substring(2,x.length));
} else
{if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,x)))
{return "";
} else
{if(cljs.core.truth_("﷐'else"))
{return x.toString();
} else
{return null;
}
}
}
}
});
var str__2628 = (function() { 
var G__2630__delegate = function (x,ys){
return cljs.core.apply.call(null,cljs.core.str_STAR_,x,ys);
};
var G__2630 = function (x,var_args){
var ys = null;
if (goog.isDef(var_args)) {
  ys = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return G__2630__delegate.call(this, x, ys);
};
G__2630.cljs$lang$maxFixedArity = 1;
G__2630.cljs$lang$applyTo = (function (arglist__2631){
var x = cljs.core.first(arglist__2631);
var ys = cljs.core.rest(arglist__2631);
return G__2630__delegate.call(this, x, ys);
});
return G__2630;
})()
;
str = function(x,var_args){
var ys = var_args;
switch(arguments.length){
case  0 :
return str__2626.call(this);
case  1 :
return str__2627.call(this,x);
default:
return str__2628.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
str.cljs$lang$maxFixedArity = 1;
str.cljs$lang$applyTo = str__2628.cljs$lang$applyTo;
return str;
})()
;
/**
* Returns the substring of s beginning at start inclusive, and ending
* at end (defaults to length of string), exclusive.
*/
cljs.core.subs = (function() {
var subs = null;
var subs__2632 = (function (s,start){
return s.substring(start);
});
var subs__2633 = (function (s,start,end){
return s.substring(start,end);
});
subs = function(s,start,end){
switch(arguments.length){
case  2 :
return subs__2632.call(this,s,start);
case  3 :
return subs__2633.call(this,s,start,end);
}
throw('Invalid arity: ' + arguments.length);
};
return subs;
})()
;
/**
* Returns a Symbol with the given namespace and name.
*/
cljs.core.symbol = (function() {
var symbol = null;
var symbol__2635 = (function (name){
if(cljs.core.truth_(cljs.core.symbol_QMARK_.call(null,name)))
{name;
} else
{if(cljs.core.truth_(cljs.core.keyword_QMARK_.call(null,name)))
{cljs.core.str_STAR_.call(null,"﷑","'",cljs.core.subs.call(null,name,2));
} else
{}
}
return cljs.core.str_STAR_.call(null,"﷑","'",name);
});
var symbol__2636 = (function (ns,name){
return symbol.call(null,cljs.core.str_STAR_.call(null,ns,"/",name));
});
symbol = function(ns,name){
switch(arguments.length){
case  1 :
return symbol__2635.call(this,ns);
case  2 :
return symbol__2636.call(this,ns,name);
}
throw('Invalid arity: ' + arguments.length);
};
return symbol;
})()
;
/**
* Returns a Keyword with the given namespace and name.  Do not use :
* in the keyword strings, it will be added automatically.
*/
cljs.core.keyword = (function() {
var keyword = null;
var keyword__2638 = (function (name){
if(cljs.core.truth_(cljs.core.keyword_QMARK_.call(null,name)))
{return name;
} else
{if(cljs.core.truth_(cljs.core.symbol_QMARK_.call(null,name)))
{return cljs.core.str_STAR_.call(null,"﷐","'",cljs.core.subs.call(null,name,2));
} else
{if(cljs.core.truth_("﷐'else"))
{return cljs.core.str_STAR_.call(null,"﷐","'",name);
} else
{return null;
}
}
}
});
var keyword__2639 = (function (ns,name){
return keyword.call(null,cljs.core.str_STAR_.call(null,ns,"/",name));
});
keyword = function(ns,name){
switch(arguments.length){
case  1 :
return keyword__2638.call(this,ns);
case  2 :
return keyword__2639.call(this,ns,name);
}
throw('Invalid arity: ' + arguments.length);
};
return keyword;
})()
;
/**
* Assumes x is sequential. Returns true if x equals y, otherwise
* returns false.
*/
cljs.core.equiv_sequential = (function equiv_sequential(x,y){
return cljs.core.boolean$.call(null,(cljs.core.truth_(cljs.core.sequential_QMARK_.call(null,y))?(function (){var xs__2641 = cljs.core.seq.call(null,x);
var ys__2642 = cljs.core.seq.call(null,y);

while(true){
if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,xs__2641)))
{return cljs.core.nil_QMARK_.call(null,ys__2642);
} else
{if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,ys__2642)))
{return false;
} else
{if(cljs.core.truth_(cljs.core._EQ_.call(null,cljs.core.first.call(null,xs__2641),cljs.core.first.call(null,ys__2642))))
{{
var G__2643 = cljs.core.next.call(null,xs__2641);
var G__2644 = cljs.core.next.call(null,ys__2642);
xs__2641 = G__2643;
ys__2642 = G__2644;
continue;
}
} else
{if(cljs.core.truth_("﷐'else"))
{return false;
} else
{return null;
}
}
}
}
break;
}
})():null));
});
cljs.core.hash_combine = (function hash_combine(seed,hash){
return cljs.core.bit_xor.call(null,seed,cljs.core._PLUS_.call(null,hash,2654435769,cljs.core.bit_shift_left.call(null,seed,6),cljs.core.bit_shift_right.call(null,seed,2)));
});
cljs.core.hash_coll = (function hash_coll(coll){
return cljs.core.reduce.call(null,(function (p1__2645_SHARP_,p2__2646_SHARP_){
return cljs.core.hash_combine.call(null,p1__2645_SHARP_,cljs.core.hash.call(null,p2__2646_SHARP_));
}),cljs.core.hash.call(null,cljs.core.first.call(null,coll)),cljs.core.next.call(null,coll));
});
/**
* Takes a JavaScript object and a map of names to functions and
* attaches said functions as methods on the object.  Any references to
* JavaScript's implict this (via the this-as macro) will resolve to the
* object that the function is attached.
*/
cljs.core.extend_object_BANG_ = (function extend_object_BANG_(obj,fn_map){
var G__2647__2648 = cljs.core.seq.call(null,fn_map);

if(cljs.core.truth_(G__2647__2648))
{var G__2650__2652 = cljs.core.first.call(null,G__2647__2648);
var vec__2651__2653 = G__2650__2652;
var key_name__2654 = cljs.core.nth.call(null,vec__2651__2653,0,null);
var f__2655 = cljs.core.nth.call(null,vec__2651__2653,1,null);
var G__2647__2656 = G__2647__2648;

var G__2650__2657 = G__2650__2652;
var G__2647__2658 = G__2647__2656;

while(true){
var vec__2659__2660 = G__2650__2657;
var key_name__2661 = cljs.core.nth.call(null,vec__2659__2660,0,null);
var f__2662 = cljs.core.nth.call(null,vec__2659__2660,1,null);
var G__2647__2663 = G__2647__2658;

var str_name__2664 = cljs.core.name.call(null,key_name__2661);

obj[str_name__2664] = f__2662;
var temp__3698__auto____2665 = cljs.core.next.call(null,G__2647__2663);

if(cljs.core.truth_(temp__3698__auto____2665))
{var G__2647__2666 = temp__3698__auto____2665;

{
var G__2667 = cljs.core.first.call(null,G__2647__2666);
var G__2668 = G__2647__2666;
G__2650__2657 = G__2667;
G__2647__2658 = G__2668;
continue;
}
} else
{}
break;
}
} else
{}
return obj;
});

/**
* @constructor
*/
cljs.core.List = (function (meta,first,rest,count){
this.meta = meta;
this.first = first;
this.rest = rest;
this.count = count;
})
cljs.core.List.prototype.cljs$core$IHash$ = true;
cljs.core.List.prototype.cljs$core$IHash$_hash = (function (coll){
var this__2669 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.List.prototype.cljs$core$ISequential$ = true;
cljs.core.List.prototype.cljs$core$ICollection$ = true;
cljs.core.List.prototype.cljs$core$ICollection$_conj = (function (coll,o){
var this__2670 = this;
return (new cljs.core.List(this__2670.meta,o,coll,cljs.core.inc.call(null,this__2670.count)));
});
cljs.core.List.prototype.cljs$core$ISeqable$ = true;
cljs.core.List.prototype.cljs$core$ISeqable$_seq = (function (coll){
var this__2671 = this;
return coll;
});
cljs.core.List.prototype.cljs$core$ICounted$ = true;
cljs.core.List.prototype.cljs$core$ICounted$_count = (function (coll){
var this__2672 = this;
return this__2672.count;
});
cljs.core.List.prototype.cljs$core$IStack$ = true;
cljs.core.List.prototype.cljs$core$IStack$_peek = (function (coll){
var this__2673 = this;
return this__2673.first;
});
cljs.core.List.prototype.cljs$core$IStack$_pop = (function (coll){
var this__2674 = this;
return cljs.core._rest.call(null,coll);
});
cljs.core.List.prototype.cljs$core$ISeq$ = true;
cljs.core.List.prototype.cljs$core$ISeq$_first = (function (coll){
var this__2675 = this;
return this__2675.first;
});
cljs.core.List.prototype.cljs$core$ISeq$_rest = (function (coll){
var this__2676 = this;
return this__2676.rest;
});
cljs.core.List.prototype.cljs$core$IEquiv$ = true;
cljs.core.List.prototype.cljs$core$IEquiv$_equiv = (function (coll,other){
var this__2677 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.List.prototype.cljs$core$IWithMeta$ = true;
cljs.core.List.prototype.cljs$core$IWithMeta$_with_meta = (function (coll,meta){
var this__2678 = this;
return (new cljs.core.List(meta,this__2678.first,this__2678.rest,this__2678.count));
});
cljs.core.List.prototype.cljs$core$IMeta$ = true;
cljs.core.List.prototype.cljs$core$IMeta$_meta = (function (coll){
var this__2679 = this;
return this__2679.meta;
});
cljs.core.List.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.List.prototype.cljs$core$IEmptyableCollection$_empty = (function (coll){
var this__2680 = this;
return cljs.core.List.EMPTY;
});

/**
* @constructor
*/
cljs.core.EmptyList = (function (meta){
this.meta = meta;
})
cljs.core.EmptyList.prototype.cljs$core$IHash$ = true;
cljs.core.EmptyList.prototype.cljs$core$IHash$_hash = (function (coll){
var this__2681 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.EmptyList.prototype.cljs$core$ISequential$ = true;
cljs.core.EmptyList.prototype.cljs$core$ICollection$ = true;
cljs.core.EmptyList.prototype.cljs$core$ICollection$_conj = (function (coll,o){
var this__2682 = this;
return (new cljs.core.List(this__2682.meta,o,null,1));
});
cljs.core.EmptyList.prototype.cljs$core$ISeqable$ = true;
cljs.core.EmptyList.prototype.cljs$core$ISeqable$_seq = (function (coll){
var this__2683 = this;
return null;
});
cljs.core.EmptyList.prototype.cljs$core$ICounted$ = true;
cljs.core.EmptyList.prototype.cljs$core$ICounted$_count = (function (coll){
var this__2684 = this;
return 0;
});
cljs.core.EmptyList.prototype.cljs$core$IStack$ = true;
cljs.core.EmptyList.prototype.cljs$core$IStack$_peek = (function (coll){
var this__2685 = this;
return null;
});
cljs.core.EmptyList.prototype.cljs$core$IStack$_pop = (function (coll){
var this__2686 = this;
return null;
});
cljs.core.EmptyList.prototype.cljs$core$ISeq$ = true;
cljs.core.EmptyList.prototype.cljs$core$ISeq$_first = (function (coll){
var this__2687 = this;
return null;
});
cljs.core.EmptyList.prototype.cljs$core$ISeq$_rest = (function (coll){
var this__2688 = this;
return null;
});
cljs.core.EmptyList.prototype.cljs$core$IEquiv$ = true;
cljs.core.EmptyList.prototype.cljs$core$IEquiv$_equiv = (function (coll,other){
var this__2689 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.EmptyList.prototype.cljs$core$IWithMeta$ = true;
cljs.core.EmptyList.prototype.cljs$core$IWithMeta$_with_meta = (function (coll,meta){
var this__2690 = this;
return (new cljs.core.EmptyList(meta));
});
cljs.core.EmptyList.prototype.cljs$core$IMeta$ = true;
cljs.core.EmptyList.prototype.cljs$core$IMeta$_meta = (function (coll){
var this__2691 = this;
return this__2691.meta;
});
cljs.core.EmptyList.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.EmptyList.prototype.cljs$core$IEmptyableCollection$_empty = (function (coll){
var this__2692 = this;
return coll;
});
cljs.core.List.EMPTY = (new cljs.core.EmptyList(null));
/**
* Returns a seq of the items in coll in reverse order. Not lazy.
*/
cljs.core.reverse = (function reverse(coll){
return cljs.core.reduce.call(null,cljs.core.conj,cljs.core.List.EMPTY,coll);
});
/**
* @param {...*} var_args
*/
cljs.core.list = (function() { 
var list__delegate = function (items){
return cljs.core.reduce.call(null,cljs.core.conj,cljs.core.List.EMPTY,cljs.core.reverse.call(null,items));
};
var list = function (var_args){
var items = null;
if (goog.isDef(var_args)) {
  items = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return list__delegate.call(this, items);
};
list.cljs$lang$maxFixedArity = 0;
list.cljs$lang$applyTo = (function (arglist__2693){
var items = cljs.core.seq( arglist__2693 );;
return list__delegate.call(this, items);
});
return list;
})()
;

/**
* @constructor
*/
cljs.core.Cons = (function (meta,first,rest){
this.meta = meta;
this.first = first;
this.rest = rest;
})
cljs.core.Cons.prototype.cljs$core$ISeqable$ = true;
cljs.core.Cons.prototype.cljs$core$ISeqable$_seq = (function (coll){
var this__2694 = this;
return coll;
});
cljs.core.Cons.prototype.cljs$core$IHash$ = true;
cljs.core.Cons.prototype.cljs$core$IHash$_hash = (function (coll){
var this__2695 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.Cons.prototype.cljs$core$IEquiv$ = true;
cljs.core.Cons.prototype.cljs$core$IEquiv$_equiv = (function (coll,other){
var this__2696 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.Cons.prototype.cljs$core$ISequential$ = true;
cljs.core.Cons.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.Cons.prototype.cljs$core$IEmptyableCollection$_empty = (function (coll){
var this__2697 = this;
return cljs.core.with_meta.call(null,cljs.core.List.EMPTY,this__2697.meta);
});
cljs.core.Cons.prototype.cljs$core$ICollection$ = true;
cljs.core.Cons.prototype.cljs$core$ICollection$_conj = (function (coll,o){
var this__2698 = this;
return (new cljs.core.Cons(null,o,coll));
});
cljs.core.Cons.prototype.cljs$core$ISeq$ = true;
cljs.core.Cons.prototype.cljs$core$ISeq$_first = (function (coll){
var this__2699 = this;
return this__2699.first;
});
cljs.core.Cons.prototype.cljs$core$ISeq$_rest = (function (coll){
var this__2700 = this;
if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,this__2700.rest)))
{return cljs.core.List.EMPTY;
} else
{return this__2700.rest;
}
});
cljs.core.Cons.prototype.cljs$core$IMeta$ = true;
cljs.core.Cons.prototype.cljs$core$IMeta$_meta = (function (coll){
var this__2701 = this;
return this__2701.meta;
});
cljs.core.Cons.prototype.cljs$core$IWithMeta$ = true;
cljs.core.Cons.prototype.cljs$core$IWithMeta$_with_meta = (function (coll,meta){
var this__2702 = this;
return (new cljs.core.Cons(meta,this__2702.first,this__2702.rest));
});
/**
* Returns a new seq where x is the first element and seq is the rest.
*/
cljs.core.cons = (function cons(x,seq){
return (new cljs.core.Cons(null,x,seq));
});
cljs.core.aset.call(null,cljs.core.IReduce,"string",true);
cljs.core.aset.call(null,cljs.core._reduce,"string",(function() {
var G__2703 = null;
var G__2703__2704 = (function (string,f){
return cljs.core.ci_reduce.call(null,string,f);
});
var G__2703__2705 = (function (string,f,start){
return cljs.core.ci_reduce.call(null,string,f,start);
});
G__2703 = function(string,f,start){
switch(arguments.length){
case  2 :
return G__2703__2704.call(this,string,f);
case  3 :
return G__2703__2705.call(this,string,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
return G__2703;
})()
);
cljs.core.aset.call(null,cljs.core.ILookup,"string",true);
cljs.core.aset.call(null,cljs.core._lookup,"string",(function() {
var G__2707 = null;
var G__2707__2708 = (function (string,k){
return cljs.core._nth.call(null,string,k);
});
var G__2707__2709 = (function (string,k,not_found){
return cljs.core._nth.call(null,string,k,not_found);
});
G__2707 = function(string,k,not_found){
switch(arguments.length){
case  2 :
return G__2707__2708.call(this,string,k);
case  3 :
return G__2707__2709.call(this,string,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__2707;
})()
);
cljs.core.aset.call(null,cljs.core.IIndexed,"string",true);
cljs.core.aset.call(null,cljs.core._nth,"string",(function() {
var G__2711 = null;
var G__2711__2712 = (function (string,n){
if(cljs.core.truth_(cljs.core._LT_.call(null,n,cljs.core._count.call(null,string))))
{return string.charAt(n);
} else
{return null;
}
});
var G__2711__2713 = (function (string,n,not_found){
if(cljs.core.truth_(cljs.core._LT_.call(null,n,cljs.core._count.call(null,string))))
{return string.charAt(n);
} else
{return not_found;
}
});
G__2711 = function(string,n,not_found){
switch(arguments.length){
case  2 :
return G__2711__2712.call(this,string,n);
case  3 :
return G__2711__2713.call(this,string,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__2711;
})()
);
cljs.core.aset.call(null,cljs.core.ICounted,"string",true);
cljs.core.aset.call(null,cljs.core._count,"string",(function (s){
return s.length;
}));
cljs.core.aset.call(null,cljs.core.ISeqable,"string",true);
cljs.core.aset.call(null,cljs.core._seq,"string",(function (string){
return cljs.core.prim_seq.call(null,string,0);
}));
cljs.core.aset.call(null,cljs.core.IHash,"string",true);
cljs.core.aset.call(null,cljs.core._hash,"string",(function (o){
return goog.string.hashCode.call(null,o);
}));
String['prototype']['call'] = (function() {
var G__2715 = null;
var G__2715__2716 = (function (_,coll){
return cljs.core.get.call(null,coll,this.toString());
});
var G__2715__2717 = (function (_,coll,not_found){
return cljs.core.get.call(null,coll,this.toString(),not_found);
});
G__2715 = function(_,coll,not_found){
switch(arguments.length){
case  2 :
return G__2715__2716.call(this,_,coll);
case  3 :
return G__2715__2717.call(this,_,coll,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__2715;
})()
;
String['prototype']['apply'] = (function (s,args){
if(cljs.core.truth_(cljs.core._LT_.call(null,cljs.core.count.call(null,args),2)))
{return cljs.core.get.call(null,cljs.core.aget.call(null,args,0),s);
} else
{return cljs.core.get.call(null,cljs.core.aget.call(null,args,0),s,cljs.core.aget.call(null,args,1));
}
});
cljs.core.lazy_seq_value = (function lazy_seq_value(lazy_seq){
var x__2719 = lazy_seq.x;

if(cljs.core.truth_(lazy_seq.realized))
{return x__2719;
} else
{lazy_seq.x = x__2719.call(null);
lazy_seq.realized = true;
return lazy_seq.x;
}
});

/**
* @constructor
*/
cljs.core.LazySeq = (function (meta,realized,x){
this.meta = meta;
this.realized = realized;
this.x = x;
})
cljs.core.LazySeq.prototype.cljs$core$ISeqable$ = true;
cljs.core.LazySeq.prototype.cljs$core$ISeqable$_seq = (function (coll){
var this__2720 = this;
return cljs.core.seq.call(null,cljs.core.lazy_seq_value.call(null,coll));
});
cljs.core.LazySeq.prototype.cljs$core$IHash$ = true;
cljs.core.LazySeq.prototype.cljs$core$IHash$_hash = (function (coll){
var this__2721 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.LazySeq.prototype.cljs$core$IEquiv$ = true;
cljs.core.LazySeq.prototype.cljs$core$IEquiv$_equiv = (function (coll,other){
var this__2722 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.LazySeq.prototype.cljs$core$ISequential$ = true;
cljs.core.LazySeq.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.LazySeq.prototype.cljs$core$IEmptyableCollection$_empty = (function (coll){
var this__2723 = this;
return cljs.core.with_meta.call(null,cljs.core.List.EMPTY,this__2723.meta);
});
cljs.core.LazySeq.prototype.cljs$core$ICollection$ = true;
cljs.core.LazySeq.prototype.cljs$core$ICollection$_conj = (function (coll,o){
var this__2724 = this;
return cljs.core.cons.call(null,o,coll);
});
cljs.core.LazySeq.prototype.cljs$core$ISeq$ = true;
cljs.core.LazySeq.prototype.cljs$core$ISeq$_first = (function (coll){
var this__2725 = this;
return cljs.core.first.call(null,cljs.core.lazy_seq_value.call(null,coll));
});
cljs.core.LazySeq.prototype.cljs$core$ISeq$_rest = (function (coll){
var this__2726 = this;
return cljs.core.rest.call(null,cljs.core.lazy_seq_value.call(null,coll));
});
cljs.core.LazySeq.prototype.cljs$core$IMeta$ = true;
cljs.core.LazySeq.prototype.cljs$core$IMeta$_meta = (function (coll){
var this__2727 = this;
return this__2727.meta;
});
cljs.core.LazySeq.prototype.cljs$core$IWithMeta$ = true;
cljs.core.LazySeq.prototype.cljs$core$IWithMeta$_with_meta = (function (coll,meta){
var this__2728 = this;
return (new cljs.core.LazySeq(meta,this__2728.realized,this__2728.x));
});
/**
* Naive impl of to-array as a start.
*/
cljs.core.to_array = (function to_array(s){
var ary__2729 = cljs.core.array.call(null);

var s__2730 = s;

while(true){
if(cljs.core.truth_(cljs.core.seq.call(null,s__2730)))
{ary__2729.push(cljs.core.first.call(null,s__2730));
{
var G__2731 = cljs.core.next.call(null,s__2730);
s__2730 = G__2731;
continue;
}
} else
{return ary__2729;
}
break;
}
});
cljs.core.bounded_count = (function bounded_count(s,n){
var s__2732 = s;
var i__2733 = n;
var sum__2734 = 0;

while(true){
if(cljs.core.truth_((function (){var and__3546__auto____2735 = cljs.core.pos_QMARK_.call(null,i__2733);

if(cljs.core.truth_(and__3546__auto____2735))
{return cljs.core.seq.call(null,s__2732);
} else
{return and__3546__auto____2735;
}
})()))
{{
var G__2736 = cljs.core.next.call(null,s__2732);
var G__2737 = cljs.core.dec.call(null,i__2733);
var G__2738 = cljs.core.inc.call(null,sum__2734);
s__2732 = G__2736;
i__2733 = G__2737;
sum__2734 = G__2738;
continue;
}
} else
{return sum__2734;
}
break;
}
});
cljs.core.spread = (function spread(arglist){
if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,arglist)))
{return null;
} else
{if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,cljs.core.next.call(null,arglist))))
{return cljs.core.seq.call(null,cljs.core.first.call(null,arglist));
} else
{if(cljs.core.truth_("﷐'else"))
{return cljs.core.cons.call(null,cljs.core.first.call(null,arglist),spread.call(null,cljs.core.next.call(null,arglist)));
} else
{return null;
}
}
}
});
/**
* Returns a lazy seq representing the concatenation of the elements in the supplied colls.
* @param {...*} var_args
*/
cljs.core.concat = (function() {
var concat = null;
var concat__2742 = (function (){
return (new cljs.core.LazySeq(null,false,(function (){
return null;
})));
});
var concat__2743 = (function (x){
return (new cljs.core.LazySeq(null,false,(function (){
return x;
})));
});
var concat__2744 = (function (x,y){
return (new cljs.core.LazySeq(null,false,(function (){
var s__2739 = cljs.core.seq.call(null,x);

if(cljs.core.truth_(s__2739))
{return cljs.core.cons.call(null,cljs.core.first.call(null,s__2739),concat.call(null,cljs.core.rest.call(null,s__2739),y));
} else
{return y;
}
})));
});
var concat__2745 = (function() { 
var G__2747__delegate = function (x,y,zs){
var cat__2741 = (function cat(xys,zs){
return (new cljs.core.LazySeq(null,false,(function (){
var xys__2740 = cljs.core.seq.call(null,xys);

if(cljs.core.truth_(xys__2740))
{return cljs.core.cons.call(null,cljs.core.first.call(null,xys__2740),cat.call(null,cljs.core.rest.call(null,xys__2740),zs));
} else
{if(cljs.core.truth_(zs))
{return cat.call(null,cljs.core.first.call(null,zs),cljs.core.next.call(null,zs));
} else
{return null;
}
}
})));
});

return cat__2741.call(null,concat.call(null,x,y),zs);
};
var G__2747 = function (x,y,var_args){
var zs = null;
if (goog.isDef(var_args)) {
  zs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__2747__delegate.call(this, x, y, zs);
};
G__2747.cljs$lang$maxFixedArity = 2;
G__2747.cljs$lang$applyTo = (function (arglist__2748){
var x = cljs.core.first(arglist__2748);
var y = cljs.core.first(cljs.core.next(arglist__2748));
var zs = cljs.core.rest(cljs.core.next(arglist__2748));
return G__2747__delegate.call(this, x, y, zs);
});
return G__2747;
})()
;
concat = function(x,y,var_args){
var zs = var_args;
switch(arguments.length){
case  0 :
return concat__2742.call(this);
case  1 :
return concat__2743.call(this,x);
case  2 :
return concat__2744.call(this,x,y);
default:
return concat__2745.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
concat.cljs$lang$maxFixedArity = 2;
concat.cljs$lang$applyTo = concat__2745.cljs$lang$applyTo;
return concat;
})()
;
/**
* Creates a new list containing the items prepended to the rest, the
* last of which will be treated as a sequence.
* @param {...*} var_args
*/
cljs.core.list_STAR_ = (function() {
var list_STAR_ = null;
var list_STAR___2749 = (function (args){
return cljs.core.seq.call(null,args);
});
var list_STAR___2750 = (function (a,args){
return cljs.core.cons.call(null,a,args);
});
var list_STAR___2751 = (function (a,b,args){
return cljs.core.cons.call(null,a,cljs.core.cons.call(null,b,args));
});
var list_STAR___2752 = (function (a,b,c,args){
return cljs.core.cons.call(null,a,cljs.core.cons.call(null,b,cljs.core.cons.call(null,c,args)));
});
var list_STAR___2753 = (function() { 
var G__2755__delegate = function (a,b,c,d,more){
return cljs.core.cons.call(null,a,cljs.core.cons.call(null,b,cljs.core.cons.call(null,c,cljs.core.cons.call(null,d,cljs.core.spread.call(null,more)))));
};
var G__2755 = function (a,b,c,d,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4),0);
} 
return G__2755__delegate.call(this, a, b, c, d, more);
};
G__2755.cljs$lang$maxFixedArity = 4;
G__2755.cljs$lang$applyTo = (function (arglist__2756){
var a = cljs.core.first(arglist__2756);
var b = cljs.core.first(cljs.core.next(arglist__2756));
var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__2756)));
var d = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__2756))));
var more = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__2756))));
return G__2755__delegate.call(this, a, b, c, d, more);
});
return G__2755;
})()
;
list_STAR_ = function(a,b,c,d,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return list_STAR___2749.call(this,a);
case  2 :
return list_STAR___2750.call(this,a,b);
case  3 :
return list_STAR___2751.call(this,a,b,c);
case  4 :
return list_STAR___2752.call(this,a,b,c,d);
default:
return list_STAR___2753.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
list_STAR_.cljs$lang$maxFixedArity = 4;
list_STAR_.cljs$lang$applyTo = list_STAR___2753.cljs$lang$applyTo;
return list_STAR_;
})()
;
/**
* Applies fn f to the argument list formed by prepending intervening arguments to args.
* First cut.  Not lazy.  Needs to use emitted toApply.
* @param {...*} var_args
*/
cljs.core.apply = (function() {
var apply = null;
var apply__2766 = (function (f,args){
var fixed_arity__2757 = f.cljs$lang$maxFixedArity;

if(cljs.core.truth_(f.cljs$lang$applyTo))
{if(cljs.core.truth_(cljs.core._LT__EQ_.call(null,cljs.core.bounded_count.call(null,args,cljs.core.inc.call(null,fixed_arity__2757)),fixed_arity__2757)))
{return f.apply(f,cljs.core.to_array.call(null,args));
} else
{return f.cljs$lang$applyTo(args);
}
} else
{return f.apply(f,cljs.core.to_array.call(null,args));
}
});
var apply__2767 = (function (f,x,args){
var arglist__2758 = cljs.core.list_STAR_.call(null,x,args);
var fixed_arity__2759 = f.cljs$lang$maxFixedArity;

if(cljs.core.truth_(f.cljs$lang$applyTo))
{if(cljs.core.truth_(cljs.core._LT__EQ_.call(null,cljs.core.bounded_count.call(null,arglist__2758,fixed_arity__2759),fixed_arity__2759)))
{return f.apply(f,cljs.core.to_array.call(null,arglist__2758));
} else
{return f.cljs$lang$applyTo(arglist__2758);
}
} else
{return f.apply(f,cljs.core.to_array.call(null,arglist__2758));
}
});
var apply__2768 = (function (f,x,y,args){
var arglist__2760 = cljs.core.list_STAR_.call(null,x,y,args);
var fixed_arity__2761 = f.cljs$lang$maxFixedArity;

if(cljs.core.truth_(f.cljs$lang$applyTo))
{if(cljs.core.truth_(cljs.core._LT__EQ_.call(null,cljs.core.bounded_count.call(null,arglist__2760,fixed_arity__2761),fixed_arity__2761)))
{return f.apply(f,cljs.core.to_array.call(null,arglist__2760));
} else
{return f.cljs$lang$applyTo(arglist__2760);
}
} else
{return f.apply(f,cljs.core.to_array.call(null,arglist__2760));
}
});
var apply__2769 = (function (f,x,y,z,args){
var arglist__2762 = cljs.core.list_STAR_.call(null,x,y,z,args);
var fixed_arity__2763 = f.cljs$lang$maxFixedArity;

if(cljs.core.truth_(f.cljs$lang$applyTo))
{if(cljs.core.truth_(cljs.core._LT__EQ_.call(null,cljs.core.bounded_count.call(null,arglist__2762,fixed_arity__2763),fixed_arity__2763)))
{return f.apply(f,cljs.core.to_array.call(null,arglist__2762));
} else
{return f.cljs$lang$applyTo(arglist__2762);
}
} else
{return f.apply(f,cljs.core.to_array.call(null,arglist__2762));
}
});
var apply__2770 = (function() { 
var G__2772__delegate = function (f,a,b,c,d,args){
var arglist__2764 = cljs.core.cons.call(null,a,cljs.core.cons.call(null,b,cljs.core.cons.call(null,c,cljs.core.cons.call(null,d,cljs.core.spread.call(null,args)))));
var fixed_arity__2765 = f.cljs$lang$maxFixedArity;

if(cljs.core.truth_(f.cljs$lang$applyTo))
{if(cljs.core.truth_(cljs.core._LT__EQ_.call(null,cljs.core.bounded_count.call(null,arglist__2764,fixed_arity__2765),fixed_arity__2765)))
{return f.apply(f,cljs.core.to_array.call(null,arglist__2764));
} else
{return f.cljs$lang$applyTo(arglist__2764);
}
} else
{return f.apply(f,cljs.core.to_array.call(null,arglist__2764));
}
};
var G__2772 = function (f,a,b,c,d,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 5),0);
} 
return G__2772__delegate.call(this, f, a, b, c, d, args);
};
G__2772.cljs$lang$maxFixedArity = 5;
G__2772.cljs$lang$applyTo = (function (arglist__2773){
var f = cljs.core.first(arglist__2773);
var a = cljs.core.first(cljs.core.next(arglist__2773));
var b = cljs.core.first(cljs.core.next(cljs.core.next(arglist__2773)));
var c = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__2773))));
var d = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__2773)))));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__2773)))));
return G__2772__delegate.call(this, f, a, b, c, d, args);
});
return G__2772;
})()
;
apply = function(f,a,b,c,d,var_args){
var args = var_args;
switch(arguments.length){
case  2 :
return apply__2766.call(this,f,a);
case  3 :
return apply__2767.call(this,f,a,b);
case  4 :
return apply__2768.call(this,f,a,b,c);
case  5 :
return apply__2769.call(this,f,a,b,c,d);
default:
return apply__2770.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
apply.cljs$lang$maxFixedArity = 5;
apply.cljs$lang$applyTo = apply__2770.cljs$lang$applyTo;
return apply;
})()
;
/**
* Returns an object of the same type and value as obj, with
* (apply f (meta obj) args) as its metadata.
* @param {...*} var_args
*/
cljs.core.vary_meta = (function() { 
var vary_meta__delegate = function (obj,f,args){
return cljs.core.with_meta.call(null,obj,cljs.core.apply.call(null,f,cljs.core.meta.call(null,obj),args));
};
var vary_meta = function (obj,f,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return vary_meta__delegate.call(this, obj, f, args);
};
vary_meta.cljs$lang$maxFixedArity = 2;
vary_meta.cljs$lang$applyTo = (function (arglist__2774){
var obj = cljs.core.first(arglist__2774);
var f = cljs.core.first(cljs.core.next(arglist__2774));
var args = cljs.core.rest(cljs.core.next(arglist__2774));
return vary_meta__delegate.call(this, obj, f, args);
});
return vary_meta;
})()
;
/**
* Same as (not (= obj1 obj2))
* @param {...*} var_args
*/
cljs.core.not_EQ_ = (function() {
var not_EQ_ = null;
var not_EQ___2775 = (function (x){
return false;
});
var not_EQ___2776 = (function (x,y){
return cljs.core.not.call(null,cljs.core._EQ_.call(null,x,y));
});
var not_EQ___2777 = (function() { 
var G__2779__delegate = function (x,y,more){
return cljs.core.not.call(null,cljs.core.apply.call(null,cljs.core._EQ_,x,y,more));
};
var G__2779 = function (x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__2779__delegate.call(this, x, y, more);
};
G__2779.cljs$lang$maxFixedArity = 2;
G__2779.cljs$lang$applyTo = (function (arglist__2780){
var x = cljs.core.first(arglist__2780);
var y = cljs.core.first(cljs.core.next(arglist__2780));
var more = cljs.core.rest(cljs.core.next(arglist__2780));
return G__2779__delegate.call(this, x, y, more);
});
return G__2779;
})()
;
not_EQ_ = function(x,y,var_args){
var more = var_args;
switch(arguments.length){
case  1 :
return not_EQ___2775.call(this,x);
case  2 :
return not_EQ___2776.call(this,x,y);
default:
return not_EQ___2777.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
not_EQ_.cljs$lang$maxFixedArity = 2;
not_EQ_.cljs$lang$applyTo = not_EQ___2777.cljs$lang$applyTo;
return not_EQ_;
})()
;
/**
* If coll is empty, returns nil, else coll
*/
cljs.core.not_empty = (function not_empty(coll){
if(cljs.core.truth_(cljs.core.seq.call(null,coll)))
{return coll;
} else
{return null;
}
});
/**
* Returns true if (pred x) is logical true for every x in coll, else
* false.
*/
cljs.core.every_QMARK_ = (function every_QMARK_(pred,coll){
while(true){
if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,cljs.core.seq.call(null,coll))))
{return true;
} else
{if(cljs.core.truth_(pred.call(null,cljs.core.first.call(null,coll))))
{{
var G__2781 = pred;
var G__2782 = cljs.core.next.call(null,coll);
pred = G__2781;
coll = G__2782;
continue;
}
} else
{if(cljs.core.truth_("﷐'else"))
{return false;
} else
{return null;
}
}
}
break;
}
});
/**
* Returns false if (pred x) is logical true for every x in
* coll, else true.
*/
cljs.core.not_every_QMARK_ = (function not_every_QMARK_(pred,coll){
return cljs.core.not.call(null,cljs.core.every_QMARK_.call(null,pred,coll));
});
/**
* Returns the first logical true value of (pred x) for any x in coll,
* else nil.  One common idiom is to use a set as pred, for example
* this will return :fred if :fred is in the sequence, otherwise nil:
* (some #{:fred} coll)
*/
cljs.core.some = (function some(pred,coll){
while(true){
if(cljs.core.truth_(cljs.core.seq.call(null,coll)))
{var or__3548__auto____2783 = pred.call(null,cljs.core.first.call(null,coll));

if(cljs.core.truth_(or__3548__auto____2783))
{return or__3548__auto____2783;
} else
{{
var G__2784 = pred;
var G__2785 = cljs.core.next.call(null,coll);
pred = G__2784;
coll = G__2785;
continue;
}
}
} else
{return null;
}
break;
}
});
/**
* Returns false if (pred x) is logical true for any x in coll,
* else true.
*/
cljs.core.not_any_QMARK_ = (function not_any_QMARK_(pred,coll){
return cljs.core.not.call(null,cljs.core.some.call(null,pred,coll));
});
/**
* Returns true if n is even, throws an exception if n is not an integer
*/
cljs.core.even_QMARK_ = (function even_QMARK_(n){
if(cljs.core.truth_(cljs.core.integer_QMARK_.call(null,n)))
{return cljs.core.zero_QMARK_.call(null,cljs.core.bit_and.call(null,n,1));
} else
{throw (new Error(cljs.core.str.call(null,"Argument must be an integer: ",n)));
}
});
/**
* Returns true if n is odd, throws an exception if n is not an integer
*/
cljs.core.odd_QMARK_ = (function odd_QMARK_(n){
return cljs.core.not.call(null,cljs.core.even_QMARK_.call(null,n));
});
cljs.core.identity = (function identity(x){
return x;
});
/**
* Takes a fn f and returns a fn that takes the same arguments as f,
* has the same effects, if any, and returns the opposite truth value.
*/
cljs.core.complement = (function complement(f){
return (function() {
var G__2786 = null;
var G__2786__2787 = (function (){
return cljs.core.not.call(null,f.call(null));
});
var G__2786__2788 = (function (x){
return cljs.core.not.call(null,f.call(null,x));
});
var G__2786__2789 = (function (x,y){
return cljs.core.not.call(null,f.call(null,x,y));
});
var G__2786__2790 = (function() { 
var G__2792__delegate = function (x,y,zs){
return cljs.core.not.call(null,cljs.core.apply.call(null,f,x,y,zs));
};
var G__2792 = function (x,y,var_args){
var zs = null;
if (goog.isDef(var_args)) {
  zs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__2792__delegate.call(this, x, y, zs);
};
G__2792.cljs$lang$maxFixedArity = 2;
G__2792.cljs$lang$applyTo = (function (arglist__2793){
var x = cljs.core.first(arglist__2793);
var y = cljs.core.first(cljs.core.next(arglist__2793));
var zs = cljs.core.rest(cljs.core.next(arglist__2793));
return G__2792__delegate.call(this, x, y, zs);
});
return G__2792;
})()
;
G__2786 = function(x,y,var_args){
var zs = var_args;
switch(arguments.length){
case  0 :
return G__2786__2787.call(this);
case  1 :
return G__2786__2788.call(this,x);
case  2 :
return G__2786__2789.call(this,x,y);
default:
return G__2786__2790.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
G__2786.cljs$lang$maxFixedArity = 2;
G__2786.cljs$lang$applyTo = G__2786__2790.cljs$lang$applyTo;
return G__2786;
})()
});
/**
* Returns a function that takes any number of arguments and returns x.
*/
cljs.core.constantly = (function constantly(x){
return (function() { 
var G__2794__delegate = function (args){
return x;
};
var G__2794 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__2794__delegate.call(this, args);
};
G__2794.cljs$lang$maxFixedArity = 0;
G__2794.cljs$lang$applyTo = (function (arglist__2795){
var args = cljs.core.seq( arglist__2795 );;
return G__2794__delegate.call(this, args);
});
return G__2794;
})()
;
});
/**
* Takes a set of functions and returns a fn that is the composition
* of those fns.  The returned fn takes a variable number of args,
* applies the rightmost of fns to the args, the next
* fn (right-to-left) to the result, etc.
* 
* TODO: Implement apply
* @param {...*} var_args
*/
cljs.core.comp = (function() {
var comp = null;
var comp__2799 = (function (){
return cljs.core.identity;
});
var comp__2800 = (function (f){
return f;
});
var comp__2801 = (function (f,g){
return (function() {
var G__2805 = null;
var G__2805__2806 = (function (){
return f.call(null,g.call(null));
});
var G__2805__2807 = (function (x){
return f.call(null,g.call(null,x));
});
var G__2805__2808 = (function (x,y){
return f.call(null,g.call(null,x,y));
});
var G__2805__2809 = (function (x,y,z){
return f.call(null,g.call(null,x,y,z));
});
var G__2805__2810 = (function() { 
var G__2812__delegate = function (x,y,z,args){
return f.call(null,cljs.core.apply.call(null,g,x,y,z,args));
};
var G__2812 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__2812__delegate.call(this, x, y, z, args);
};
G__2812.cljs$lang$maxFixedArity = 3;
G__2812.cljs$lang$applyTo = (function (arglist__2813){
var x = cljs.core.first(arglist__2813);
var y = cljs.core.first(cljs.core.next(arglist__2813));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__2813)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__2813)));
return G__2812__delegate.call(this, x, y, z, args);
});
return G__2812;
})()
;
G__2805 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return G__2805__2806.call(this);
case  1 :
return G__2805__2807.call(this,x);
case  2 :
return G__2805__2808.call(this,x,y);
case  3 :
return G__2805__2809.call(this,x,y,z);
default:
return G__2805__2810.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
G__2805.cljs$lang$maxFixedArity = 3;
G__2805.cljs$lang$applyTo = G__2805__2810.cljs$lang$applyTo;
return G__2805;
})()
});
var comp__2802 = (function (f,g,h){
return (function() {
var G__2814 = null;
var G__2814__2815 = (function (){
return f.call(null,g.call(null,h.call(null)));
});
var G__2814__2816 = (function (x){
return f.call(null,g.call(null,h.call(null,x)));
});
var G__2814__2817 = (function (x,y){
return f.call(null,g.call(null,h.call(null,x,y)));
});
var G__2814__2818 = (function (x,y,z){
return f.call(null,g.call(null,h.call(null,x,y,z)));
});
var G__2814__2819 = (function() { 
var G__2821__delegate = function (x,y,z,args){
return f.call(null,g.call(null,cljs.core.apply.call(null,h,x,y,z,args)));
};
var G__2821 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__2821__delegate.call(this, x, y, z, args);
};
G__2821.cljs$lang$maxFixedArity = 3;
G__2821.cljs$lang$applyTo = (function (arglist__2822){
var x = cljs.core.first(arglist__2822);
var y = cljs.core.first(cljs.core.next(arglist__2822));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__2822)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__2822)));
return G__2821__delegate.call(this, x, y, z, args);
});
return G__2821;
})()
;
G__2814 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return G__2814__2815.call(this);
case  1 :
return G__2814__2816.call(this,x);
case  2 :
return G__2814__2817.call(this,x,y);
case  3 :
return G__2814__2818.call(this,x,y,z);
default:
return G__2814__2819.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
G__2814.cljs$lang$maxFixedArity = 3;
G__2814.cljs$lang$applyTo = G__2814__2819.cljs$lang$applyTo;
return G__2814;
})()
});
var comp__2803 = (function() { 
var G__2823__delegate = function (f1,f2,f3,fs){
var fs__2796 = cljs.core.reverse.call(null,cljs.core.list_STAR_.call(null,f1,f2,f3,fs));

return (function() { 
var G__2824__delegate = function (args){
var ret__2797 = cljs.core.apply.call(null,cljs.core.first.call(null,fs__2796),args);
var fs__2798 = cljs.core.next.call(null,fs__2796);

while(true){
if(cljs.core.truth_(fs__2798))
{{
var G__2825 = cljs.core.first.call(null,fs__2798).call(null,ret__2797);
var G__2826 = cljs.core.next.call(null,fs__2798);
ret__2797 = G__2825;
fs__2798 = G__2826;
continue;
}
} else
{return ret__2797;
}
break;
}
};
var G__2824 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__2824__delegate.call(this, args);
};
G__2824.cljs$lang$maxFixedArity = 0;
G__2824.cljs$lang$applyTo = (function (arglist__2827){
var args = cljs.core.seq( arglist__2827 );;
return G__2824__delegate.call(this, args);
});
return G__2824;
})()
;
};
var G__2823 = function (f1,f2,f3,var_args){
var fs = null;
if (goog.isDef(var_args)) {
  fs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__2823__delegate.call(this, f1, f2, f3, fs);
};
G__2823.cljs$lang$maxFixedArity = 3;
G__2823.cljs$lang$applyTo = (function (arglist__2828){
var f1 = cljs.core.first(arglist__2828);
var f2 = cljs.core.first(cljs.core.next(arglist__2828));
var f3 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__2828)));
var fs = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__2828)));
return G__2823__delegate.call(this, f1, f2, f3, fs);
});
return G__2823;
})()
;
comp = function(f1,f2,f3,var_args){
var fs = var_args;
switch(arguments.length){
case  0 :
return comp__2799.call(this);
case  1 :
return comp__2800.call(this,f1);
case  2 :
return comp__2801.call(this,f1,f2);
case  3 :
return comp__2802.call(this,f1,f2,f3);
default:
return comp__2803.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
comp.cljs$lang$maxFixedArity = 3;
comp.cljs$lang$applyTo = comp__2803.cljs$lang$applyTo;
return comp;
})()
;
/**
* Takes a function f and fewer than the normal arguments to f, and
* returns a fn that takes a variable number of additional args. When
* called, the returned function calls f with args + additional args.
* 
* TODO: Implement apply
* @param {...*} var_args
*/
cljs.core.partial = (function() {
var partial = null;
var partial__2829 = (function (f,arg1){
return (function() { 
var G__2834__delegate = function (args){
return cljs.core.apply.call(null,f,arg1,args);
};
var G__2834 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__2834__delegate.call(this, args);
};
G__2834.cljs$lang$maxFixedArity = 0;
G__2834.cljs$lang$applyTo = (function (arglist__2835){
var args = cljs.core.seq( arglist__2835 );;
return G__2834__delegate.call(this, args);
});
return G__2834;
})()
;
});
var partial__2830 = (function (f,arg1,arg2){
return (function() { 
var G__2836__delegate = function (args){
return cljs.core.apply.call(null,f,arg1,arg2,args);
};
var G__2836 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__2836__delegate.call(this, args);
};
G__2836.cljs$lang$maxFixedArity = 0;
G__2836.cljs$lang$applyTo = (function (arglist__2837){
var args = cljs.core.seq( arglist__2837 );;
return G__2836__delegate.call(this, args);
});
return G__2836;
})()
;
});
var partial__2831 = (function (f,arg1,arg2,arg3){
return (function() { 
var G__2838__delegate = function (args){
return cljs.core.apply.call(null,f,arg1,arg2,arg3,args);
};
var G__2838 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__2838__delegate.call(this, args);
};
G__2838.cljs$lang$maxFixedArity = 0;
G__2838.cljs$lang$applyTo = (function (arglist__2839){
var args = cljs.core.seq( arglist__2839 );;
return G__2838__delegate.call(this, args);
});
return G__2838;
})()
;
});
var partial__2832 = (function() { 
var G__2840__delegate = function (f,arg1,arg2,arg3,more){
return (function() { 
var G__2841__delegate = function (args){
return cljs.core.apply.call(null,f,arg1,arg2,arg3,cljs.core.concat.call(null,more,args));
};
var G__2841 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__2841__delegate.call(this, args);
};
G__2841.cljs$lang$maxFixedArity = 0;
G__2841.cljs$lang$applyTo = (function (arglist__2842){
var args = cljs.core.seq( arglist__2842 );;
return G__2841__delegate.call(this, args);
});
return G__2841;
})()
;
};
var G__2840 = function (f,arg1,arg2,arg3,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4),0);
} 
return G__2840__delegate.call(this, f, arg1, arg2, arg3, more);
};
G__2840.cljs$lang$maxFixedArity = 4;
G__2840.cljs$lang$applyTo = (function (arglist__2843){
var f = cljs.core.first(arglist__2843);
var arg1 = cljs.core.first(cljs.core.next(arglist__2843));
var arg2 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__2843)));
var arg3 = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__2843))));
var more = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__2843))));
return G__2840__delegate.call(this, f, arg1, arg2, arg3, more);
});
return G__2840;
})()
;
partial = function(f,arg1,arg2,arg3,var_args){
var more = var_args;
switch(arguments.length){
case  2 :
return partial__2829.call(this,f,arg1);
case  3 :
return partial__2830.call(this,f,arg1,arg2);
case  4 :
return partial__2831.call(this,f,arg1,arg2,arg3);
default:
return partial__2832.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
partial.cljs$lang$maxFixedArity = 4;
partial.cljs$lang$applyTo = partial__2832.cljs$lang$applyTo;
return partial;
})()
;
/**
* Takes a function f, and returns a function that calls f, replacing
* a nil first argument to f with the supplied value x. Higher arity
* versions can replace arguments in the second and third
* positions (y, z). Note that the function f can take any number of
* arguments, not just the one(s) being nil-patched.
*/
cljs.core.fnil = (function() {
var fnil = null;
var fnil__2844 = (function (f,x){
return (function() {
var G__2848 = null;
var G__2848__2849 = (function (a){
return f.call(null,(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,a))?x:a));
});
var G__2848__2850 = (function (a,b){
return f.call(null,(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,a))?x:a),b);
});
var G__2848__2851 = (function (a,b,c){
return f.call(null,(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,a))?x:a),b,c);
});
var G__2848__2852 = (function() { 
var G__2854__delegate = function (a,b,c,ds){
return cljs.core.apply.call(null,f,(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,a))?x:a),b,c,ds);
};
var G__2854 = function (a,b,c,var_args){
var ds = null;
if (goog.isDef(var_args)) {
  ds = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__2854__delegate.call(this, a, b, c, ds);
};
G__2854.cljs$lang$maxFixedArity = 3;
G__2854.cljs$lang$applyTo = (function (arglist__2855){
var a = cljs.core.first(arglist__2855);
var b = cljs.core.first(cljs.core.next(arglist__2855));
var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__2855)));
var ds = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__2855)));
return G__2854__delegate.call(this, a, b, c, ds);
});
return G__2854;
})()
;
G__2848 = function(a,b,c,var_args){
var ds = var_args;
switch(arguments.length){
case  1 :
return G__2848__2849.call(this,a);
case  2 :
return G__2848__2850.call(this,a,b);
case  3 :
return G__2848__2851.call(this,a,b,c);
default:
return G__2848__2852.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
G__2848.cljs$lang$maxFixedArity = 3;
G__2848.cljs$lang$applyTo = G__2848__2852.cljs$lang$applyTo;
return G__2848;
})()
});
var fnil__2845 = (function (f,x,y){
return (function() {
var G__2856 = null;
var G__2856__2857 = (function (a,b){
return f.call(null,(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,a))?x:a),(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,b))?y:b));
});
var G__2856__2858 = (function (a,b,c){
return f.call(null,(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,a))?x:a),(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,b))?y:b),c);
});
var G__2856__2859 = (function() { 
var G__2861__delegate = function (a,b,c,ds){
return cljs.core.apply.call(null,f,(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,a))?x:a),(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,b))?y:b),c,ds);
};
var G__2861 = function (a,b,c,var_args){
var ds = null;
if (goog.isDef(var_args)) {
  ds = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__2861__delegate.call(this, a, b, c, ds);
};
G__2861.cljs$lang$maxFixedArity = 3;
G__2861.cljs$lang$applyTo = (function (arglist__2862){
var a = cljs.core.first(arglist__2862);
var b = cljs.core.first(cljs.core.next(arglist__2862));
var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__2862)));
var ds = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__2862)));
return G__2861__delegate.call(this, a, b, c, ds);
});
return G__2861;
})()
;
G__2856 = function(a,b,c,var_args){
var ds = var_args;
switch(arguments.length){
case  2 :
return G__2856__2857.call(this,a,b);
case  3 :
return G__2856__2858.call(this,a,b,c);
default:
return G__2856__2859.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
G__2856.cljs$lang$maxFixedArity = 3;
G__2856.cljs$lang$applyTo = G__2856__2859.cljs$lang$applyTo;
return G__2856;
})()
});
var fnil__2846 = (function (f,x,y,z){
return (function() {
var G__2863 = null;
var G__2863__2864 = (function (a,b){
return f.call(null,(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,a))?x:a),(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,b))?y:b));
});
var G__2863__2865 = (function (a,b,c){
return f.call(null,(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,a))?x:a),(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,b))?y:b),(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,c))?z:c));
});
var G__2863__2866 = (function() { 
var G__2868__delegate = function (a,b,c,ds){
return cljs.core.apply.call(null,f,(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,a))?x:a),(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,b))?y:b),(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,c))?z:c),ds);
};
var G__2868 = function (a,b,c,var_args){
var ds = null;
if (goog.isDef(var_args)) {
  ds = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__2868__delegate.call(this, a, b, c, ds);
};
G__2868.cljs$lang$maxFixedArity = 3;
G__2868.cljs$lang$applyTo = (function (arglist__2869){
var a = cljs.core.first(arglist__2869);
var b = cljs.core.first(cljs.core.next(arglist__2869));
var c = cljs.core.first(cljs.core.next(cljs.core.next(arglist__2869)));
var ds = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__2869)));
return G__2868__delegate.call(this, a, b, c, ds);
});
return G__2868;
})()
;
G__2863 = function(a,b,c,var_args){
var ds = var_args;
switch(arguments.length){
case  2 :
return G__2863__2864.call(this,a,b);
case  3 :
return G__2863__2865.call(this,a,b,c);
default:
return G__2863__2866.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
G__2863.cljs$lang$maxFixedArity = 3;
G__2863.cljs$lang$applyTo = G__2863__2866.cljs$lang$applyTo;
return G__2863;
})()
});
fnil = function(f,x,y,z){
switch(arguments.length){
case  2 :
return fnil__2844.call(this,f,x);
case  3 :
return fnil__2845.call(this,f,x,y);
case  4 :
return fnil__2846.call(this,f,x,y,z);
}
throw('Invalid arity: ' + arguments.length);
};
return fnil;
})()
;
/**
* Returns a lazy sequence consisting of the result of applying f to 0
* and the first item of coll, followed by applying f to 1 and the second
* item in coll, etc, until coll is exhausted. Thus function f should
* accept 2 arguments, index and item.
*/
cljs.core.map_indexed = (function map_indexed(f,coll){
var mapi__2872 = (function mpi(idx,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____2870 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____2870))
{var s__2871 = temp__3698__auto____2870;

return cljs.core.cons.call(null,f.call(null,idx,cljs.core.first.call(null,s__2871)),mpi.call(null,cljs.core.inc.call(null,idx),cljs.core.rest.call(null,s__2871)));
} else
{return null;
}
})));
});

return mapi__2872.call(null,0,coll);
});
/**
* Returns a lazy sequence of the non-nil results of (f item). Note,
* this means false return values will be included.  f must be free of
* side-effects.
*/
cljs.core.keep = (function keep(f,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____2873 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____2873))
{var s__2874 = temp__3698__auto____2873;

var x__2875 = f.call(null,cljs.core.first.call(null,s__2874));

if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,x__2875)))
{return keep.call(null,f,cljs.core.rest.call(null,s__2874));
} else
{return cljs.core.cons.call(null,x__2875,keep.call(null,f,cljs.core.rest.call(null,s__2874)));
}
} else
{return null;
}
})));
});
/**
* Returns a lazy sequence of the non-nil results of (f index item). Note,
* this means false return values will be included.  f must be free of
* side-effects.
*/
cljs.core.keep_indexed = (function keep_indexed(f,coll){
var keepi__2885 = (function kpi(idx,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____2882 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____2882))
{var s__2883 = temp__3698__auto____2882;

var x__2884 = f.call(null,idx,cljs.core.first.call(null,s__2883));

if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,x__2884)))
{return kpi.call(null,cljs.core.inc.call(null,idx),cljs.core.rest.call(null,s__2883));
} else
{return cljs.core.cons.call(null,x__2884,kpi.call(null,cljs.core.inc.call(null,idx),cljs.core.rest.call(null,s__2883)));
}
} else
{return null;
}
})));
});

return keepi__2885.call(null,0,coll);
});
/**
* Takes a set of predicates and returns a function f that returns true if all of its
* composing predicates return a logical true value against all of its arguments, else it returns
* false. Note that f is short-circuiting in that it will stop execution on the first
* argument that triggers a logical false result against the original predicates.
* @param {...*} var_args
*/
cljs.core.every_pred = (function() {
var every_pred = null;
var every_pred__2930 = (function (p){
return (function() {
var ep1 = null;
var ep1__2935 = (function (){
return true;
});
var ep1__2936 = (function (x){
return cljs.core.boolean$.call(null,p.call(null,x));
});
var ep1__2937 = (function (x,y){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____2892 = p.call(null,x);

if(cljs.core.truth_(and__3546__auto____2892))
{return p.call(null,y);
} else
{return and__3546__auto____2892;
}
})());
});
var ep1__2938 = (function (x,y,z){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____2893 = p.call(null,x);

if(cljs.core.truth_(and__3546__auto____2893))
{var and__3546__auto____2894 = p.call(null,y);

if(cljs.core.truth_(and__3546__auto____2894))
{return p.call(null,z);
} else
{return and__3546__auto____2894;
}
} else
{return and__3546__auto____2893;
}
})());
});
var ep1__2939 = (function() { 
var G__2941__delegate = function (x,y,z,args){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____2895 = ep1.call(null,x,y,z);

if(cljs.core.truth_(and__3546__auto____2895))
{return cljs.core.every_QMARK_.call(null,p,args);
} else
{return and__3546__auto____2895;
}
})());
};
var G__2941 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__2941__delegate.call(this, x, y, z, args);
};
G__2941.cljs$lang$maxFixedArity = 3;
G__2941.cljs$lang$applyTo = (function (arglist__2942){
var x = cljs.core.first(arglist__2942);
var y = cljs.core.first(cljs.core.next(arglist__2942));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__2942)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__2942)));
return G__2941__delegate.call(this, x, y, z, args);
});
return G__2941;
})()
;
ep1 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return ep1__2935.call(this);
case  1 :
return ep1__2936.call(this,x);
case  2 :
return ep1__2937.call(this,x,y);
case  3 :
return ep1__2938.call(this,x,y,z);
default:
return ep1__2939.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
ep1.cljs$lang$maxFixedArity = 3;
ep1.cljs$lang$applyTo = ep1__2939.cljs$lang$applyTo;
return ep1;
})()
});
var every_pred__2931 = (function (p1,p2){
return (function() {
var ep2 = null;
var ep2__2943 = (function (){
return true;
});
var ep2__2944 = (function (x){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____2896 = p1.call(null,x);

if(cljs.core.truth_(and__3546__auto____2896))
{return p2.call(null,x);
} else
{return and__3546__auto____2896;
}
})());
});
var ep2__2945 = (function (x,y){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____2897 = p1.call(null,x);

if(cljs.core.truth_(and__3546__auto____2897))
{var and__3546__auto____2898 = p1.call(null,y);

if(cljs.core.truth_(and__3546__auto____2898))
{var and__3546__auto____2899 = p2.call(null,x);

if(cljs.core.truth_(and__3546__auto____2899))
{return p2.call(null,y);
} else
{return and__3546__auto____2899;
}
} else
{return and__3546__auto____2898;
}
} else
{return and__3546__auto____2897;
}
})());
});
var ep2__2946 = (function (x,y,z){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____2900 = p1.call(null,x);

if(cljs.core.truth_(and__3546__auto____2900))
{var and__3546__auto____2901 = p1.call(null,y);

if(cljs.core.truth_(and__3546__auto____2901))
{var and__3546__auto____2902 = p1.call(null,z);

if(cljs.core.truth_(and__3546__auto____2902))
{var and__3546__auto____2903 = p2.call(null,x);

if(cljs.core.truth_(and__3546__auto____2903))
{var and__3546__auto____2904 = p2.call(null,y);

if(cljs.core.truth_(and__3546__auto____2904))
{return p2.call(null,z);
} else
{return and__3546__auto____2904;
}
} else
{return and__3546__auto____2903;
}
} else
{return and__3546__auto____2902;
}
} else
{return and__3546__auto____2901;
}
} else
{return and__3546__auto____2900;
}
})());
});
var ep2__2947 = (function() { 
var G__2949__delegate = function (x,y,z,args){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____2905 = ep2.call(null,x,y,z);

if(cljs.core.truth_(and__3546__auto____2905))
{return cljs.core.every_QMARK_.call(null,(function (p1__2876_SHARP_){
var and__3546__auto____2906 = p1.call(null,p1__2876_SHARP_);

if(cljs.core.truth_(and__3546__auto____2906))
{return p2.call(null,p1__2876_SHARP_);
} else
{return and__3546__auto____2906;
}
}),args);
} else
{return and__3546__auto____2905;
}
})());
};
var G__2949 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__2949__delegate.call(this, x, y, z, args);
};
G__2949.cljs$lang$maxFixedArity = 3;
G__2949.cljs$lang$applyTo = (function (arglist__2950){
var x = cljs.core.first(arglist__2950);
var y = cljs.core.first(cljs.core.next(arglist__2950));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__2950)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__2950)));
return G__2949__delegate.call(this, x, y, z, args);
});
return G__2949;
})()
;
ep2 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return ep2__2943.call(this);
case  1 :
return ep2__2944.call(this,x);
case  2 :
return ep2__2945.call(this,x,y);
case  3 :
return ep2__2946.call(this,x,y,z);
default:
return ep2__2947.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
ep2.cljs$lang$maxFixedArity = 3;
ep2.cljs$lang$applyTo = ep2__2947.cljs$lang$applyTo;
return ep2;
})()
});
var every_pred__2932 = (function (p1,p2,p3){
return (function() {
var ep3 = null;
var ep3__2951 = (function (){
return true;
});
var ep3__2952 = (function (x){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____2907 = p1.call(null,x);

if(cljs.core.truth_(and__3546__auto____2907))
{var and__3546__auto____2908 = p2.call(null,x);

if(cljs.core.truth_(and__3546__auto____2908))
{return p3.call(null,x);
} else
{return and__3546__auto____2908;
}
} else
{return and__3546__auto____2907;
}
})());
});
var ep3__2953 = (function (x,y){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____2909 = p1.call(null,x);

if(cljs.core.truth_(and__3546__auto____2909))
{var and__3546__auto____2910 = p2.call(null,x);

if(cljs.core.truth_(and__3546__auto____2910))
{var and__3546__auto____2911 = p3.call(null,x);

if(cljs.core.truth_(and__3546__auto____2911))
{var and__3546__auto____2912 = p1.call(null,y);

if(cljs.core.truth_(and__3546__auto____2912))
{var and__3546__auto____2913 = p2.call(null,y);

if(cljs.core.truth_(and__3546__auto____2913))
{return p3.call(null,y);
} else
{return and__3546__auto____2913;
}
} else
{return and__3546__auto____2912;
}
} else
{return and__3546__auto____2911;
}
} else
{return and__3546__auto____2910;
}
} else
{return and__3546__auto____2909;
}
})());
});
var ep3__2954 = (function (x,y,z){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____2914 = p1.call(null,x);

if(cljs.core.truth_(and__3546__auto____2914))
{var and__3546__auto____2915 = p2.call(null,x);

if(cljs.core.truth_(and__3546__auto____2915))
{var and__3546__auto____2916 = p3.call(null,x);

if(cljs.core.truth_(and__3546__auto____2916))
{var and__3546__auto____2917 = p1.call(null,y);

if(cljs.core.truth_(and__3546__auto____2917))
{var and__3546__auto____2918 = p2.call(null,y);

if(cljs.core.truth_(and__3546__auto____2918))
{var and__3546__auto____2919 = p3.call(null,y);

if(cljs.core.truth_(and__3546__auto____2919))
{var and__3546__auto____2920 = p1.call(null,z);

if(cljs.core.truth_(and__3546__auto____2920))
{var and__3546__auto____2921 = p2.call(null,z);

if(cljs.core.truth_(and__3546__auto____2921))
{return p3.call(null,z);
} else
{return and__3546__auto____2921;
}
} else
{return and__3546__auto____2920;
}
} else
{return and__3546__auto____2919;
}
} else
{return and__3546__auto____2918;
}
} else
{return and__3546__auto____2917;
}
} else
{return and__3546__auto____2916;
}
} else
{return and__3546__auto____2915;
}
} else
{return and__3546__auto____2914;
}
})());
});
var ep3__2955 = (function() { 
var G__2957__delegate = function (x,y,z,args){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____2922 = ep3.call(null,x,y,z);

if(cljs.core.truth_(and__3546__auto____2922))
{return cljs.core.every_QMARK_.call(null,(function (p1__2877_SHARP_){
var and__3546__auto____2923 = p1.call(null,p1__2877_SHARP_);

if(cljs.core.truth_(and__3546__auto____2923))
{var and__3546__auto____2924 = p2.call(null,p1__2877_SHARP_);

if(cljs.core.truth_(and__3546__auto____2924))
{return p3.call(null,p1__2877_SHARP_);
} else
{return and__3546__auto____2924;
}
} else
{return and__3546__auto____2923;
}
}),args);
} else
{return and__3546__auto____2922;
}
})());
};
var G__2957 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__2957__delegate.call(this, x, y, z, args);
};
G__2957.cljs$lang$maxFixedArity = 3;
G__2957.cljs$lang$applyTo = (function (arglist__2958){
var x = cljs.core.first(arglist__2958);
var y = cljs.core.first(cljs.core.next(arglist__2958));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__2958)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__2958)));
return G__2957__delegate.call(this, x, y, z, args);
});
return G__2957;
})()
;
ep3 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return ep3__2951.call(this);
case  1 :
return ep3__2952.call(this,x);
case  2 :
return ep3__2953.call(this,x,y);
case  3 :
return ep3__2954.call(this,x,y,z);
default:
return ep3__2955.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
ep3.cljs$lang$maxFixedArity = 3;
ep3.cljs$lang$applyTo = ep3__2955.cljs$lang$applyTo;
return ep3;
})()
});
var every_pred__2933 = (function() { 
var G__2959__delegate = function (p1,p2,p3,ps){
var ps__2925 = cljs.core.list_STAR_.call(null,p1,p2,p3,ps);

return (function() {
var epn = null;
var epn__2960 = (function (){
return true;
});
var epn__2961 = (function (x){
return cljs.core.every_QMARK_.call(null,(function (p1__2878_SHARP_){
return p1__2878_SHARP_.call(null,x);
}),ps__2925);
});
var epn__2962 = (function (x,y){
return cljs.core.every_QMARK_.call(null,(function (p1__2879_SHARP_){
var and__3546__auto____2926 = p1__2879_SHARP_.call(null,x);

if(cljs.core.truth_(and__3546__auto____2926))
{return p1__2879_SHARP_.call(null,y);
} else
{return and__3546__auto____2926;
}
}),ps__2925);
});
var epn__2963 = (function (x,y,z){
return cljs.core.every_QMARK_.call(null,(function (p1__2880_SHARP_){
var and__3546__auto____2927 = p1__2880_SHARP_.call(null,x);

if(cljs.core.truth_(and__3546__auto____2927))
{var and__3546__auto____2928 = p1__2880_SHARP_.call(null,y);

if(cljs.core.truth_(and__3546__auto____2928))
{return p1__2880_SHARP_.call(null,z);
} else
{return and__3546__auto____2928;
}
} else
{return and__3546__auto____2927;
}
}),ps__2925);
});
var epn__2964 = (function() { 
var G__2966__delegate = function (x,y,z,args){
return cljs.core.boolean$.call(null,(function (){var and__3546__auto____2929 = epn.call(null,x,y,z);

if(cljs.core.truth_(and__3546__auto____2929))
{return cljs.core.every_QMARK_.call(null,(function (p1__2881_SHARP_){
return cljs.core.every_QMARK_.call(null,p1__2881_SHARP_,args);
}),ps__2925);
} else
{return and__3546__auto____2929;
}
})());
};
var G__2966 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__2966__delegate.call(this, x, y, z, args);
};
G__2966.cljs$lang$maxFixedArity = 3;
G__2966.cljs$lang$applyTo = (function (arglist__2967){
var x = cljs.core.first(arglist__2967);
var y = cljs.core.first(cljs.core.next(arglist__2967));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__2967)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__2967)));
return G__2966__delegate.call(this, x, y, z, args);
});
return G__2966;
})()
;
epn = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return epn__2960.call(this);
case  1 :
return epn__2961.call(this,x);
case  2 :
return epn__2962.call(this,x,y);
case  3 :
return epn__2963.call(this,x,y,z);
default:
return epn__2964.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
epn.cljs$lang$maxFixedArity = 3;
epn.cljs$lang$applyTo = epn__2964.cljs$lang$applyTo;
return epn;
})()
};
var G__2959 = function (p1,p2,p3,var_args){
var ps = null;
if (goog.isDef(var_args)) {
  ps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__2959__delegate.call(this, p1, p2, p3, ps);
};
G__2959.cljs$lang$maxFixedArity = 3;
G__2959.cljs$lang$applyTo = (function (arglist__2968){
var p1 = cljs.core.first(arglist__2968);
var p2 = cljs.core.first(cljs.core.next(arglist__2968));
var p3 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__2968)));
var ps = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__2968)));
return G__2959__delegate.call(this, p1, p2, p3, ps);
});
return G__2959;
})()
;
every_pred = function(p1,p2,p3,var_args){
var ps = var_args;
switch(arguments.length){
case  1 :
return every_pred__2930.call(this,p1);
case  2 :
return every_pred__2931.call(this,p1,p2);
case  3 :
return every_pred__2932.call(this,p1,p2,p3);
default:
return every_pred__2933.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
every_pred.cljs$lang$maxFixedArity = 3;
every_pred.cljs$lang$applyTo = every_pred__2933.cljs$lang$applyTo;
return every_pred;
})()
;
/**
* Takes a set of predicates and returns a function f that returns the first logical true value
* returned by one of its composing predicates against any of its arguments, else it returns
* logical false. Note that f is short-circuiting in that it will stop execution on the first
* argument that triggers a logical true result against the original predicates.
* @param {...*} var_args
*/
cljs.core.some_fn = (function() {
var some_fn = null;
var some_fn__3008 = (function (p){
return (function() {
var sp1 = null;
var sp1__3013 = (function (){
return null;
});
var sp1__3014 = (function (x){
return p.call(null,x);
});
var sp1__3015 = (function (x,y){
var or__3548__auto____2970 = p.call(null,x);

if(cljs.core.truth_(or__3548__auto____2970))
{return or__3548__auto____2970;
} else
{return p.call(null,y);
}
});
var sp1__3016 = (function (x,y,z){
var or__3548__auto____2971 = p.call(null,x);

if(cljs.core.truth_(or__3548__auto____2971))
{return or__3548__auto____2971;
} else
{var or__3548__auto____2972 = p.call(null,y);

if(cljs.core.truth_(or__3548__auto____2972))
{return or__3548__auto____2972;
} else
{return p.call(null,z);
}
}
});
var sp1__3017 = (function() { 
var G__3019__delegate = function (x,y,z,args){
var or__3548__auto____2973 = sp1.call(null,x,y,z);

if(cljs.core.truth_(or__3548__auto____2973))
{return or__3548__auto____2973;
} else
{return cljs.core.some.call(null,p,args);
}
};
var G__3019 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3019__delegate.call(this, x, y, z, args);
};
G__3019.cljs$lang$maxFixedArity = 3;
G__3019.cljs$lang$applyTo = (function (arglist__3020){
var x = cljs.core.first(arglist__3020);
var y = cljs.core.first(cljs.core.next(arglist__3020));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3020)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3020)));
return G__3019__delegate.call(this, x, y, z, args);
});
return G__3019;
})()
;
sp1 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return sp1__3013.call(this);
case  1 :
return sp1__3014.call(this,x);
case  2 :
return sp1__3015.call(this,x,y);
case  3 :
return sp1__3016.call(this,x,y,z);
default:
return sp1__3017.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
sp1.cljs$lang$maxFixedArity = 3;
sp1.cljs$lang$applyTo = sp1__3017.cljs$lang$applyTo;
return sp1;
})()
});
var some_fn__3009 = (function (p1,p2){
return (function() {
var sp2 = null;
var sp2__3021 = (function (){
return null;
});
var sp2__3022 = (function (x){
var or__3548__auto____2974 = p1.call(null,x);

if(cljs.core.truth_(or__3548__auto____2974))
{return or__3548__auto____2974;
} else
{return p2.call(null,x);
}
});
var sp2__3023 = (function (x,y){
var or__3548__auto____2975 = p1.call(null,x);

if(cljs.core.truth_(or__3548__auto____2975))
{return or__3548__auto____2975;
} else
{var or__3548__auto____2976 = p1.call(null,y);

if(cljs.core.truth_(or__3548__auto____2976))
{return or__3548__auto____2976;
} else
{var or__3548__auto____2977 = p2.call(null,x);

if(cljs.core.truth_(or__3548__auto____2977))
{return or__3548__auto____2977;
} else
{return p2.call(null,y);
}
}
}
});
var sp2__3024 = (function (x,y,z){
var or__3548__auto____2978 = p1.call(null,x);

if(cljs.core.truth_(or__3548__auto____2978))
{return or__3548__auto____2978;
} else
{var or__3548__auto____2979 = p1.call(null,y);

if(cljs.core.truth_(or__3548__auto____2979))
{return or__3548__auto____2979;
} else
{var or__3548__auto____2980 = p1.call(null,z);

if(cljs.core.truth_(or__3548__auto____2980))
{return or__3548__auto____2980;
} else
{var or__3548__auto____2981 = p2.call(null,x);

if(cljs.core.truth_(or__3548__auto____2981))
{return or__3548__auto____2981;
} else
{var or__3548__auto____2982 = p2.call(null,y);

if(cljs.core.truth_(or__3548__auto____2982))
{return or__3548__auto____2982;
} else
{return p2.call(null,z);
}
}
}
}
}
});
var sp2__3025 = (function() { 
var G__3027__delegate = function (x,y,z,args){
var or__3548__auto____2983 = sp2.call(null,x,y,z);

if(cljs.core.truth_(or__3548__auto____2983))
{return or__3548__auto____2983;
} else
{return cljs.core.some.call(null,(function (p1__2886_SHARP_){
var or__3548__auto____2984 = p1.call(null,p1__2886_SHARP_);

if(cljs.core.truth_(or__3548__auto____2984))
{return or__3548__auto____2984;
} else
{return p2.call(null,p1__2886_SHARP_);
}
}),args);
}
};
var G__3027 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3027__delegate.call(this, x, y, z, args);
};
G__3027.cljs$lang$maxFixedArity = 3;
G__3027.cljs$lang$applyTo = (function (arglist__3028){
var x = cljs.core.first(arglist__3028);
var y = cljs.core.first(cljs.core.next(arglist__3028));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3028)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3028)));
return G__3027__delegate.call(this, x, y, z, args);
});
return G__3027;
})()
;
sp2 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return sp2__3021.call(this);
case  1 :
return sp2__3022.call(this,x);
case  2 :
return sp2__3023.call(this,x,y);
case  3 :
return sp2__3024.call(this,x,y,z);
default:
return sp2__3025.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
sp2.cljs$lang$maxFixedArity = 3;
sp2.cljs$lang$applyTo = sp2__3025.cljs$lang$applyTo;
return sp2;
})()
});
var some_fn__3010 = (function (p1,p2,p3){
return (function() {
var sp3 = null;
var sp3__3029 = (function (){
return null;
});
var sp3__3030 = (function (x){
var or__3548__auto____2985 = p1.call(null,x);

if(cljs.core.truth_(or__3548__auto____2985))
{return or__3548__auto____2985;
} else
{var or__3548__auto____2986 = p2.call(null,x);

if(cljs.core.truth_(or__3548__auto____2986))
{return or__3548__auto____2986;
} else
{return p3.call(null,x);
}
}
});
var sp3__3031 = (function (x,y){
var or__3548__auto____2987 = p1.call(null,x);

if(cljs.core.truth_(or__3548__auto____2987))
{return or__3548__auto____2987;
} else
{var or__3548__auto____2988 = p2.call(null,x);

if(cljs.core.truth_(or__3548__auto____2988))
{return or__3548__auto____2988;
} else
{var or__3548__auto____2989 = p3.call(null,x);

if(cljs.core.truth_(or__3548__auto____2989))
{return or__3548__auto____2989;
} else
{var or__3548__auto____2990 = p1.call(null,y);

if(cljs.core.truth_(or__3548__auto____2990))
{return or__3548__auto____2990;
} else
{var or__3548__auto____2991 = p2.call(null,y);

if(cljs.core.truth_(or__3548__auto____2991))
{return or__3548__auto____2991;
} else
{return p3.call(null,y);
}
}
}
}
}
});
var sp3__3032 = (function (x,y,z){
var or__3548__auto____2992 = p1.call(null,x);

if(cljs.core.truth_(or__3548__auto____2992))
{return or__3548__auto____2992;
} else
{var or__3548__auto____2993 = p2.call(null,x);

if(cljs.core.truth_(or__3548__auto____2993))
{return or__3548__auto____2993;
} else
{var or__3548__auto____2994 = p3.call(null,x);

if(cljs.core.truth_(or__3548__auto____2994))
{return or__3548__auto____2994;
} else
{var or__3548__auto____2995 = p1.call(null,y);

if(cljs.core.truth_(or__3548__auto____2995))
{return or__3548__auto____2995;
} else
{var or__3548__auto____2996 = p2.call(null,y);

if(cljs.core.truth_(or__3548__auto____2996))
{return or__3548__auto____2996;
} else
{var or__3548__auto____2997 = p3.call(null,y);

if(cljs.core.truth_(or__3548__auto____2997))
{return or__3548__auto____2997;
} else
{var or__3548__auto____2998 = p1.call(null,z);

if(cljs.core.truth_(or__3548__auto____2998))
{return or__3548__auto____2998;
} else
{var or__3548__auto____2999 = p2.call(null,z);

if(cljs.core.truth_(or__3548__auto____2999))
{return or__3548__auto____2999;
} else
{return p3.call(null,z);
}
}
}
}
}
}
}
}
});
var sp3__3033 = (function() { 
var G__3035__delegate = function (x,y,z,args){
var or__3548__auto____3000 = sp3.call(null,x,y,z);

if(cljs.core.truth_(or__3548__auto____3000))
{return or__3548__auto____3000;
} else
{return cljs.core.some.call(null,(function (p1__2887_SHARP_){
var or__3548__auto____3001 = p1.call(null,p1__2887_SHARP_);

if(cljs.core.truth_(or__3548__auto____3001))
{return or__3548__auto____3001;
} else
{var or__3548__auto____3002 = p2.call(null,p1__2887_SHARP_);

if(cljs.core.truth_(or__3548__auto____3002))
{return or__3548__auto____3002;
} else
{return p3.call(null,p1__2887_SHARP_);
}
}
}),args);
}
};
var G__3035 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3035__delegate.call(this, x, y, z, args);
};
G__3035.cljs$lang$maxFixedArity = 3;
G__3035.cljs$lang$applyTo = (function (arglist__3036){
var x = cljs.core.first(arglist__3036);
var y = cljs.core.first(cljs.core.next(arglist__3036));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3036)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3036)));
return G__3035__delegate.call(this, x, y, z, args);
});
return G__3035;
})()
;
sp3 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return sp3__3029.call(this);
case  1 :
return sp3__3030.call(this,x);
case  2 :
return sp3__3031.call(this,x,y);
case  3 :
return sp3__3032.call(this,x,y,z);
default:
return sp3__3033.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
sp3.cljs$lang$maxFixedArity = 3;
sp3.cljs$lang$applyTo = sp3__3033.cljs$lang$applyTo;
return sp3;
})()
});
var some_fn__3011 = (function() { 
var G__3037__delegate = function (p1,p2,p3,ps){
var ps__3003 = cljs.core.list_STAR_.call(null,p1,p2,p3,ps);

return (function() {
var spn = null;
var spn__3038 = (function (){
return null;
});
var spn__3039 = (function (x){
return cljs.core.some.call(null,(function (p1__2888_SHARP_){
return p1__2888_SHARP_.call(null,x);
}),ps__3003);
});
var spn__3040 = (function (x,y){
return cljs.core.some.call(null,(function (p1__2889_SHARP_){
var or__3548__auto____3004 = p1__2889_SHARP_.call(null,x);

if(cljs.core.truth_(or__3548__auto____3004))
{return or__3548__auto____3004;
} else
{return p1__2889_SHARP_.call(null,y);
}
}),ps__3003);
});
var spn__3041 = (function (x,y,z){
return cljs.core.some.call(null,(function (p1__2890_SHARP_){
var or__3548__auto____3005 = p1__2890_SHARP_.call(null,x);

if(cljs.core.truth_(or__3548__auto____3005))
{return or__3548__auto____3005;
} else
{var or__3548__auto____3006 = p1__2890_SHARP_.call(null,y);

if(cljs.core.truth_(or__3548__auto____3006))
{return or__3548__auto____3006;
} else
{return p1__2890_SHARP_.call(null,z);
}
}
}),ps__3003);
});
var spn__3042 = (function() { 
var G__3044__delegate = function (x,y,z,args){
var or__3548__auto____3007 = spn.call(null,x,y,z);

if(cljs.core.truth_(or__3548__auto____3007))
{return or__3548__auto____3007;
} else
{return cljs.core.some.call(null,(function (p1__2891_SHARP_){
return cljs.core.some.call(null,p1__2891_SHARP_,args);
}),ps__3003);
}
};
var G__3044 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3044__delegate.call(this, x, y, z, args);
};
G__3044.cljs$lang$maxFixedArity = 3;
G__3044.cljs$lang$applyTo = (function (arglist__3045){
var x = cljs.core.first(arglist__3045);
var y = cljs.core.first(cljs.core.next(arglist__3045));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3045)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3045)));
return G__3044__delegate.call(this, x, y, z, args);
});
return G__3044;
})()
;
spn = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return spn__3038.call(this);
case  1 :
return spn__3039.call(this,x);
case  2 :
return spn__3040.call(this,x,y);
case  3 :
return spn__3041.call(this,x,y,z);
default:
return spn__3042.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
spn.cljs$lang$maxFixedArity = 3;
spn.cljs$lang$applyTo = spn__3042.cljs$lang$applyTo;
return spn;
})()
};
var G__3037 = function (p1,p2,p3,var_args){
var ps = null;
if (goog.isDef(var_args)) {
  ps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3037__delegate.call(this, p1, p2, p3, ps);
};
G__3037.cljs$lang$maxFixedArity = 3;
G__3037.cljs$lang$applyTo = (function (arglist__3046){
var p1 = cljs.core.first(arglist__3046);
var p2 = cljs.core.first(cljs.core.next(arglist__3046));
var p3 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3046)));
var ps = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3046)));
return G__3037__delegate.call(this, p1, p2, p3, ps);
});
return G__3037;
})()
;
some_fn = function(p1,p2,p3,var_args){
var ps = var_args;
switch(arguments.length){
case  1 :
return some_fn__3008.call(this,p1);
case  2 :
return some_fn__3009.call(this,p1,p2);
case  3 :
return some_fn__3010.call(this,p1,p2,p3);
default:
return some_fn__3011.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
some_fn.cljs$lang$maxFixedArity = 3;
some_fn.cljs$lang$applyTo = some_fn__3011.cljs$lang$applyTo;
return some_fn;
})()
;
/**
* Returns a lazy sequence consisting of the result of applying f to the
* set of first items of each coll, followed by applying f to the set
* of second items in each coll, until any one of the colls is
* exhausted.  Any remaining items in other colls are ignored. Function
* f should accept number-of-colls arguments.
* @param {...*} var_args
*/
cljs.core.map = (function() {
var map = null;
var map__3059 = (function (f,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____3047 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____3047))
{var s__3048 = temp__3698__auto____3047;

return cljs.core.cons.call(null,f.call(null,cljs.core.first.call(null,s__3048)),map.call(null,f,cljs.core.rest.call(null,s__3048)));
} else
{return null;
}
})));
});
var map__3060 = (function (f,c1,c2){
return (new cljs.core.LazySeq(null,false,(function (){
var s1__3049 = cljs.core.seq.call(null,c1);
var s2__3050 = cljs.core.seq.call(null,c2);

if(cljs.core.truth_((function (){var and__3546__auto____3051 = s1__3049;

if(cljs.core.truth_(and__3546__auto____3051))
{return s2__3050;
} else
{return and__3546__auto____3051;
}
})()))
{return cljs.core.cons.call(null,f.call(null,cljs.core.first.call(null,s1__3049),cljs.core.first.call(null,s2__3050)),map.call(null,f,cljs.core.rest.call(null,s1__3049),cljs.core.rest.call(null,s2__3050)));
} else
{return null;
}
})));
});
var map__3061 = (function (f,c1,c2,c3){
return (new cljs.core.LazySeq(null,false,(function (){
var s1__3052 = cljs.core.seq.call(null,c1);
var s2__3053 = cljs.core.seq.call(null,c2);
var s3__3054 = cljs.core.seq.call(null,c3);

if(cljs.core.truth_((function (){var and__3546__auto____3055 = s1__3052;

if(cljs.core.truth_(and__3546__auto____3055))
{var and__3546__auto____3056 = s2__3053;

if(cljs.core.truth_(and__3546__auto____3056))
{return s3__3054;
} else
{return and__3546__auto____3056;
}
} else
{return and__3546__auto____3055;
}
})()))
{return cljs.core.cons.call(null,f.call(null,cljs.core.first.call(null,s1__3052),cljs.core.first.call(null,s2__3053),cljs.core.first.call(null,s3__3054)),map.call(null,f,cljs.core.rest.call(null,s1__3052),cljs.core.rest.call(null,s2__3053),cljs.core.rest.call(null,s3__3054)));
} else
{return null;
}
})));
});
var map__3062 = (function() { 
var G__3064__delegate = function (f,c1,c2,c3,colls){
var step__3058 = (function step(cs){
return (new cljs.core.LazySeq(null,false,(function (){
var ss__3057 = map.call(null,cljs.core.seq,cs);

if(cljs.core.truth_(cljs.core.every_QMARK_.call(null,cljs.core.identity,ss__3057)))
{return cljs.core.cons.call(null,map.call(null,cljs.core.first,ss__3057),step.call(null,map.call(null,cljs.core.rest,ss__3057)));
} else
{return null;
}
})));
});

return map.call(null,(function (p1__2969_SHARP_){
return cljs.core.apply.call(null,f,p1__2969_SHARP_);
}),step__3058.call(null,cljs.core.conj.call(null,colls,c3,c2,c1)));
};
var G__3064 = function (f,c1,c2,c3,var_args){
var colls = null;
if (goog.isDef(var_args)) {
  colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 4),0);
} 
return G__3064__delegate.call(this, f, c1, c2, c3, colls);
};
G__3064.cljs$lang$maxFixedArity = 4;
G__3064.cljs$lang$applyTo = (function (arglist__3065){
var f = cljs.core.first(arglist__3065);
var c1 = cljs.core.first(cljs.core.next(arglist__3065));
var c2 = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3065)));
var c3 = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3065))));
var colls = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3065))));
return G__3064__delegate.call(this, f, c1, c2, c3, colls);
});
return G__3064;
})()
;
map = function(f,c1,c2,c3,var_args){
var colls = var_args;
switch(arguments.length){
case  2 :
return map__3059.call(this,f,c1);
case  3 :
return map__3060.call(this,f,c1,c2);
case  4 :
return map__3061.call(this,f,c1,c2,c3);
default:
return map__3062.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
map.cljs$lang$maxFixedArity = 4;
map.cljs$lang$applyTo = map__3062.cljs$lang$applyTo;
return map;
})()
;
/**
* Returns a lazy sequence of the first n items in coll, or all items if
* there are fewer than n.
*/
cljs.core.take = (function take(n,coll){
return (new cljs.core.LazySeq(null,false,(function (){
if(cljs.core.truth_(cljs.core.pos_QMARK_.call(null,n)))
{var temp__3698__auto____3066 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____3066))
{var s__3067 = temp__3698__auto____3066;

return cljs.core.cons.call(null,cljs.core.first.call(null,s__3067),take.call(null,cljs.core.dec.call(null,n),cljs.core.rest.call(null,s__3067)));
} else
{return null;
}
} else
{return null;
}
})));
});
/**
* Returns a lazy sequence of all but the first n items in coll.
*/
cljs.core.drop = (function drop(n,coll){
var step__3070 = (function (n,coll){
while(true){
var s__3068 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_((function (){var and__3546__auto____3069 = cljs.core.pos_QMARK_.call(null,n);

if(cljs.core.truth_(and__3546__auto____3069))
{return s__3068;
} else
{return and__3546__auto____3069;
}
})()))
{{
var G__3071 = cljs.core.dec.call(null,n);
var G__3072 = cljs.core.rest.call(null,s__3068);
n = G__3071;
coll = G__3072;
continue;
}
} else
{return s__3068;
}
break;
}
});

return (new cljs.core.LazySeq(null,false,(function (){
return step__3070.call(null,n,coll);
})));
});
/**
* Return a lazy sequence of all but the last n (default 1) items in coll
*/
cljs.core.drop_last = (function() {
var drop_last = null;
var drop_last__3073 = (function (s){
return drop_last.call(null,1,s);
});
var drop_last__3074 = (function (n,s){
return cljs.core.map.call(null,(function (x,_){
return x;
}),s,cljs.core.drop.call(null,n,s));
});
drop_last = function(n,s){
switch(arguments.length){
case  1 :
return drop_last__3073.call(this,n);
case  2 :
return drop_last__3074.call(this,n,s);
}
throw('Invalid arity: ' + arguments.length);
};
return drop_last;
})()
;
/**
* Returns a seq of the last n items in coll.  Depending on the type
* of coll may be no better than linear time.  For vectors, see also subvec.
*/
cljs.core.take_last = (function take_last(n,coll){
var s__3076 = cljs.core.seq.call(null,coll);
var lead__3077 = cljs.core.seq.call(null,cljs.core.drop.call(null,n,coll));

while(true){
if(cljs.core.truth_(lead__3077))
{{
var G__3078 = cljs.core.next.call(null,s__3076);
var G__3079 = cljs.core.next.call(null,lead__3077);
s__3076 = G__3078;
lead__3077 = G__3079;
continue;
}
} else
{return s__3076;
}
break;
}
});
/**
* Returns a lazy sequence of the items in coll starting from the first
* item for which (pred item) returns nil.
*/
cljs.core.drop_while = (function drop_while(pred,coll){
var step__3082 = (function (pred,coll){
while(true){
var s__3080 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_((function (){var and__3546__auto____3081 = s__3080;

if(cljs.core.truth_(and__3546__auto____3081))
{return pred.call(null,cljs.core.first.call(null,s__3080));
} else
{return and__3546__auto____3081;
}
})()))
{{
var G__3083 = pred;
var G__3084 = cljs.core.rest.call(null,s__3080);
pred = G__3083;
coll = G__3084;
continue;
}
} else
{return s__3080;
}
break;
}
});

return (new cljs.core.LazySeq(null,false,(function (){
return step__3082.call(null,pred,coll);
})));
});
/**
* Returns a lazy (infinite!) sequence of repetitions of the items in coll.
*/
cljs.core.cycle = (function cycle(coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____3085 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____3085))
{var s__3086 = temp__3698__auto____3085;

return cljs.core.concat.call(null,s__3086,cycle.call(null,s__3086));
} else
{return null;
}
})));
});
/**
* Returns a vector of [(take n coll) (drop n coll)]
*/
cljs.core.split_at = (function split_at(n,coll){
return cljs.core.Vector.fromArray([cljs.core.take.call(null,n,coll),cljs.core.drop.call(null,n,coll)]);
});
/**
* Returns a lazy (infinite!, or length n if supplied) sequence of xs.
*/
cljs.core.repeat = (function() {
var repeat = null;
var repeat__3087 = (function (x){
return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.cons.call(null,x,repeat.call(null,x));
})));
});
var repeat__3088 = (function (n,x){
return cljs.core.take.call(null,n,repeat.call(null,x));
});
repeat = function(n,x){
switch(arguments.length){
case  1 :
return repeat__3087.call(this,n);
case  2 :
return repeat__3088.call(this,n,x);
}
throw('Invalid arity: ' + arguments.length);
};
return repeat;
})()
;
/**
* Returns a lazy seq of n xs.
*/
cljs.core.replicate = (function replicate(n,x){
return cljs.core.take.call(null,n,cljs.core.repeat.call(null,x));
});
/**
* Takes a function of no args, presumably with side effects, and
* returns an infinite (or length n if supplied) lazy sequence of calls
* to it
*/
cljs.core.repeatedly = (function() {
var repeatedly = null;
var repeatedly__3090 = (function (f){
return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.cons.call(null,f.call(null),repeatedly.call(null,f));
})));
});
var repeatedly__3091 = (function (n,f){
return cljs.core.take.call(null,n,repeatedly.call(null,f));
});
repeatedly = function(n,f){
switch(arguments.length){
case  1 :
return repeatedly__3090.call(this,n);
case  2 :
return repeatedly__3091.call(this,n,f);
}
throw('Invalid arity: ' + arguments.length);
};
return repeatedly;
})()
;
/**
* Returns a lazy sequence of x, (f x), (f (f x)) etc. f must be free of side-effects
*/
cljs.core.iterate = (function iterate(f,x){
return cljs.core.cons.call(null,x,(new cljs.core.LazySeq(null,false,(function (){
return iterate.call(null,f,f.call(null,x));
}))));
});
/**
* Returns a lazy seq of the first item in each coll, then the second etc.
* @param {...*} var_args
*/
cljs.core.interleave = (function() {
var interleave = null;
var interleave__3097 = (function (c1,c2){
return (new cljs.core.LazySeq(null,false,(function (){
var s1__3093 = cljs.core.seq.call(null,c1);
var s2__3094 = cljs.core.seq.call(null,c2);

if(cljs.core.truth_((function (){var and__3546__auto____3095 = s1__3093;

if(cljs.core.truth_(and__3546__auto____3095))
{return s2__3094;
} else
{return and__3546__auto____3095;
}
})()))
{return cljs.core.cons.call(null,cljs.core.first.call(null,s1__3093),cljs.core.cons.call(null,cljs.core.first.call(null,s2__3094),interleave.call(null,cljs.core.rest.call(null,s1__3093),cljs.core.rest.call(null,s2__3094))));
} else
{return null;
}
})));
});
var interleave__3098 = (function() { 
var G__3100__delegate = function (c1,c2,colls){
return (new cljs.core.LazySeq(null,false,(function (){
var ss__3096 = cljs.core.map.call(null,cljs.core.seq,cljs.core.conj.call(null,colls,c2,c1));

if(cljs.core.truth_(cljs.core.every_QMARK_.call(null,cljs.core.identity,ss__3096)))
{return cljs.core.concat.call(null,cljs.core.map.call(null,cljs.core.first,ss__3096),cljs.core.apply.call(null,interleave,cljs.core.map.call(null,cljs.core.rest,ss__3096)));
} else
{return null;
}
})));
};
var G__3100 = function (c1,c2,var_args){
var colls = null;
if (goog.isDef(var_args)) {
  colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3100__delegate.call(this, c1, c2, colls);
};
G__3100.cljs$lang$maxFixedArity = 2;
G__3100.cljs$lang$applyTo = (function (arglist__3101){
var c1 = cljs.core.first(arglist__3101);
var c2 = cljs.core.first(cljs.core.next(arglist__3101));
var colls = cljs.core.rest(cljs.core.next(arglist__3101));
return G__3100__delegate.call(this, c1, c2, colls);
});
return G__3100;
})()
;
interleave = function(c1,c2,var_args){
var colls = var_args;
switch(arguments.length){
case  2 :
return interleave__3097.call(this,c1,c2);
default:
return interleave__3098.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
interleave.cljs$lang$maxFixedArity = 2;
interleave.cljs$lang$applyTo = interleave__3098.cljs$lang$applyTo;
return interleave;
})()
;
/**
* Returns a lazy seq of the elements of coll separated by sep
*/
cljs.core.interpose = (function interpose(sep,coll){
return cljs.core.drop.call(null,1,cljs.core.interleave.call(null,cljs.core.repeat.call(null,sep),coll));
});
/**
* Take a collection of collections, and return a lazy seq
* of items from the inner collection
*/
cljs.core.flatten1 = (function flatten1(colls){
var cat__3104 = (function cat(coll,colls){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3695__auto____3102 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3695__auto____3102))
{var coll__3103 = temp__3695__auto____3102;

return cljs.core.cons.call(null,cljs.core.first.call(null,coll__3103),cat.call(null,cljs.core.rest.call(null,coll__3103),colls));
} else
{if(cljs.core.truth_(cljs.core.seq.call(null,colls)))
{return cat.call(null,cljs.core.first.call(null,colls),cljs.core.rest.call(null,colls));
} else
{return null;
}
}
})));
});

return cat__3104.call(null,null,colls);
});
/**
* Returns the result of applying concat to the result of applying map
* to f and colls.  Thus function f should return a collection.
* @param {...*} var_args
*/
cljs.core.mapcat = (function() {
var mapcat = null;
var mapcat__3105 = (function (f,coll){
return cljs.core.flatten1.call(null,cljs.core.map.call(null,f,coll));
});
var mapcat__3106 = (function() { 
var G__3108__delegate = function (f,coll,colls){
return cljs.core.flatten1.call(null,cljs.core.apply.call(null,cljs.core.map,f,coll,colls));
};
var G__3108 = function (f,coll,var_args){
var colls = null;
if (goog.isDef(var_args)) {
  colls = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return G__3108__delegate.call(this, f, coll, colls);
};
G__3108.cljs$lang$maxFixedArity = 2;
G__3108.cljs$lang$applyTo = (function (arglist__3109){
var f = cljs.core.first(arglist__3109);
var coll = cljs.core.first(cljs.core.next(arglist__3109));
var colls = cljs.core.rest(cljs.core.next(arglist__3109));
return G__3108__delegate.call(this, f, coll, colls);
});
return G__3108;
})()
;
mapcat = function(f,coll,var_args){
var colls = var_args;
switch(arguments.length){
case  2 :
return mapcat__3105.call(this,f,coll);
default:
return mapcat__3106.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
mapcat.cljs$lang$maxFixedArity = 2;
mapcat.cljs$lang$applyTo = mapcat__3106.cljs$lang$applyTo;
return mapcat;
})()
;
/**
* Returns a lazy sequence of the items in coll for which
* (pred item) returns true. pred must be free of side-effects.
*/
cljs.core.filter = (function filter(pred,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____3110 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____3110))
{var s__3111 = temp__3698__auto____3110;

var f__3112 = cljs.core.first.call(null,s__3111);
var r__3113 = cljs.core.rest.call(null,s__3111);

if(cljs.core.truth_(pred.call(null,f__3112)))
{return cljs.core.cons.call(null,f__3112,filter.call(null,pred,r__3113));
} else
{return filter.call(null,pred,r__3113);
}
} else
{return null;
}
})));
});
/**
* Returns a lazy sequence of the items in coll for which
* (pred item) returns false. pred must be free of side-effects.
*/
cljs.core.remove = (function remove(pred,coll){
return cljs.core.filter.call(null,cljs.core.complement.call(null,pred),coll);
});
/**
* Returns a lazy sequence of the nodes in a tree, via a depth-first walk.
* branch? must be a fn of one arg that returns true if passed a node
* that can have children (but may not).  children must be a fn of one
* arg that returns a sequence of the children. Will only be called on
* nodes for which branch? returns true. Root is the root node of the
* tree.
*/
cljs.core.tree_seq = (function tree_seq(branch_QMARK_,children,root){
var walk__3115 = (function walk(node){
return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.cons.call(null,node,(cljs.core.truth_(branch_QMARK_.call(null,node))?cljs.core.mapcat.call(null,walk,children.call(null,node)):null));
})));
});

return walk__3115.call(null,root);
});
/**
* Takes any nested combination of sequential things (lists, vectors,
* etc.) and returns their contents as a single, flat sequence.
* (flatten nil) returns nil.
*/
cljs.core.flatten = (function flatten(x){
return cljs.core.filter.call(null,(function (p1__3114_SHARP_){
return cljs.core.not.call(null,cljs.core.sequential_QMARK_.call(null,p1__3114_SHARP_));
}),cljs.core.rest.call(null,cljs.core.tree_seq.call(null,cljs.core.sequential_QMARK_,cljs.core.seq,x)));
});
/**
* Returns a new coll consisting of to-coll with all of the items of
* from-coll conjoined.
*/
cljs.core.into = (function into(to,from){
return cljs.core.reduce.call(null,cljs.core._conj,to,from);
});
/**
* Returns a lazy sequence of lists of n items each, at offsets step
* apart. If step is not supplied, defaults to n, i.e. the partitions
* do not overlap. If a pad collection is supplied, use its elements as
* necessary to complete last partition upto n items. In case there are
* not enough padding elements, return a partition with less than n items.
*/
cljs.core.partition = (function() {
var partition = null;
var partition__3122 = (function (n,coll){
return partition.call(null,n,n,coll);
});
var partition__3123 = (function (n,step,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____3116 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____3116))
{var s__3117 = temp__3698__auto____3116;

var p__3118 = cljs.core.take.call(null,n,s__3117);

if(cljs.core.truth_(cljs.core._EQ_.call(null,n,cljs.core.count.call(null,p__3118))))
{return cljs.core.cons.call(null,p__3118,partition.call(null,n,step,cljs.core.drop.call(null,step,s__3117)));
} else
{return null;
}
} else
{return null;
}
})));
});
var partition__3124 = (function (n,step,pad,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____3119 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____3119))
{var s__3120 = temp__3698__auto____3119;

var p__3121 = cljs.core.take.call(null,n,s__3120);

if(cljs.core.truth_(cljs.core._EQ_.call(null,n,cljs.core.count.call(null,p__3121))))
{return cljs.core.cons.call(null,p__3121,partition.call(null,n,step,pad,cljs.core.drop.call(null,step,s__3120)));
} else
{return cljs.core.list.call(null,cljs.core.take.call(null,n,cljs.core.concat.call(null,p__3121,pad)));
}
} else
{return null;
}
})));
});
partition = function(n,step,pad,coll){
switch(arguments.length){
case  2 :
return partition__3122.call(this,n,step);
case  3 :
return partition__3123.call(this,n,step,pad);
case  4 :
return partition__3124.call(this,n,step,pad,coll);
}
throw('Invalid arity: ' + arguments.length);
};
return partition;
})()
;
/**
* Returns the value in a nested associative structure,
* where ks is a sequence of ke(ys. Returns nil if the key is not present,
* or the not-found value if supplied.
*/
cljs.core.get_in = (function() {
var get_in = null;
var get_in__3130 = (function (m,ks){
return cljs.core.reduce.call(null,cljs.core.get,m,ks);
});
var get_in__3131 = (function (m,ks,not_found){
var sentinel__3126 = cljs.core.lookup_sentinel;
var m__3127 = m;
var ks__3128 = cljs.core.seq.call(null,ks);

while(true){
if(cljs.core.truth_(ks__3128))
{var m__3129 = cljs.core.get.call(null,m__3127,cljs.core.first.call(null,ks__3128),sentinel__3126);

if(cljs.core.truth_(cljs.core.identical_QMARK_.call(null,sentinel__3126,m__3129)))
{return not_found;
} else
{{
var G__3133 = sentinel__3126;
var G__3134 = m__3129;
var G__3135 = cljs.core.next.call(null,ks__3128);
sentinel__3126 = G__3133;
m__3127 = G__3134;
ks__3128 = G__3135;
continue;
}
}
} else
{return m__3127;
}
break;
}
});
get_in = function(m,ks,not_found){
switch(arguments.length){
case  2 :
return get_in__3130.call(this,m,ks);
case  3 :
return get_in__3131.call(this,m,ks,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return get_in;
})()
;
/**
* Associates a value in a nested associative structure, where ks is a
* sequence of keys and v is the new value and returns a new nested structure.
* If any levels do not exist, hash-maps will be created.
*/
cljs.core.assoc_in = (function assoc_in(m,p__3136,v){
var vec__3137__3138 = p__3136;
var k__3139 = cljs.core.nth.call(null,vec__3137__3138,0,null);
var ks__3140 = cljs.core.nthnext.call(null,vec__3137__3138,1);

if(cljs.core.truth_(ks__3140))
{return cljs.core.assoc.call(null,m,k__3139,assoc_in.call(null,cljs.core.get.call(null,m,k__3139),ks__3140,v));
} else
{return cljs.core.assoc.call(null,m,k__3139,v);
}
});
/**
* 'Updates' a value in a nested associative structure, where ks is a
* sequence of keys and f is a function that will take the old value
* and any supplied args and return the new value, and returns a new
* nested structure.  If any levels do not exist, hash-maps will be
* created.
* @param {...*} var_args
*/
cljs.core.update_in = (function() { 
var update_in__delegate = function (m,p__3141,f,args){
var vec__3142__3143 = p__3141;
var k__3144 = cljs.core.nth.call(null,vec__3142__3143,0,null);
var ks__3145 = cljs.core.nthnext.call(null,vec__3142__3143,1);

if(cljs.core.truth_(ks__3145))
{return cljs.core.assoc.call(null,m,k__3144,cljs.core.apply.call(null,update_in,cljs.core.get.call(null,m,k__3144),ks__3145,f,args));
} else
{return cljs.core.assoc.call(null,m,k__3144,cljs.core.apply.call(null,f,cljs.core.get.call(null,m,k__3144),args));
}
};
var update_in = function (m,p__3141,f,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return update_in__delegate.call(this, m, p__3141, f, args);
};
update_in.cljs$lang$maxFixedArity = 3;
update_in.cljs$lang$applyTo = (function (arglist__3146){
var m = cljs.core.first(arglist__3146);
var p__3141 = cljs.core.first(cljs.core.next(arglist__3146));
var f = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3146)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3146)));
return update_in__delegate.call(this, m, p__3141, f, args);
});
return update_in;
})()
;

/**
* @constructor
*/
cljs.core.Vector = (function (meta,array){
this.meta = meta;
this.array = array;
})
cljs.core.Vector.prototype.cljs$core$IHash$ = true;
cljs.core.Vector.prototype.cljs$core$IHash$_hash = (function (coll){
var this__3147 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.Vector.prototype.cljs$core$ILookup$ = true;
cljs.core.Vector.prototype.cljs$core$ILookup$_lookup = (function() {
var G__3172 = null;
var G__3172__3173 = (function (coll,k){
var this__3148 = this;
return cljs.core._nth.call(null,coll,k,null);
});
var G__3172__3174 = (function (coll,k,not_found){
var this__3149 = this;
return cljs.core._nth.call(null,coll,k,not_found);
});
G__3172 = function(coll,k,not_found){
switch(arguments.length){
case  2 :
return G__3172__3173.call(this,coll,k);
case  3 :
return G__3172__3174.call(this,coll,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3172;
})()
;
cljs.core.Vector.prototype.cljs$core$IAssociative$ = true;
cljs.core.Vector.prototype.cljs$core$IAssociative$_assoc = (function (coll,k,v){
var this__3150 = this;
var new_array__3151 = cljs.core.aclone.call(null,this__3150.array);

cljs.core.aset.call(null,new_array__3151,k,v);
return (new cljs.core.Vector(this__3150.meta,new_array__3151));
});
cljs.core.Vector.prototype.cljs$core$ISequential$ = true;
cljs.core.Vector.prototype.cljs$core$ICollection$ = true;
cljs.core.Vector.prototype.cljs$core$ICollection$_conj = (function (coll,o){
var this__3152 = this;
var new_array__3153 = cljs.core.aclone.call(null,this__3152.array);

new_array__3153.push(o);
return (new cljs.core.Vector(this__3152.meta,new_array__3153));
});
cljs.core.Vector.prototype.cljs$core$IReduce$ = true;
cljs.core.Vector.prototype.cljs$core$IReduce$_reduce = (function() {
var G__3176 = null;
var G__3176__3177 = (function (v,f){
var this__3154 = this;
return cljs.core.ci_reduce.call(null,this__3154.array,f);
});
var G__3176__3178 = (function (v,f,start){
var this__3155 = this;
return cljs.core.ci_reduce.call(null,this__3155.array,f,start);
});
G__3176 = function(v,f,start){
switch(arguments.length){
case  2 :
return G__3176__3177.call(this,v,f);
case  3 :
return G__3176__3178.call(this,v,f,start);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3176;
})()
;
cljs.core.Vector.prototype.cljs$core$ISeqable$ = true;
cljs.core.Vector.prototype.cljs$core$ISeqable$_seq = (function (coll){
var this__3156 = this;
if(cljs.core.truth_(cljs.core._GT_.call(null,this__3156.array.length,0)))
{var vector_seq__3157 = (function vector_seq(i){
return (new cljs.core.LazySeq(null,false,(function (){
if(cljs.core.truth_(cljs.core._LT_.call(null,i,this__3156.array.length)))
{return cljs.core.cons.call(null,cljs.core.aget.call(null,this__3156.array,i),vector_seq.call(null,cljs.core.inc.call(null,i)));
} else
{return null;
}
})));
});

return vector_seq__3157.call(null,0);
} else
{return null;
}
});
cljs.core.Vector.prototype.cljs$core$ICounted$ = true;
cljs.core.Vector.prototype.cljs$core$ICounted$_count = (function (coll){
var this__3158 = this;
return this__3158.array.length;
});
cljs.core.Vector.prototype.cljs$core$IStack$ = true;
cljs.core.Vector.prototype.cljs$core$IStack$_peek = (function (coll){
var this__3159 = this;
var count__3160 = this__3159.array.length;

if(cljs.core.truth_(cljs.core._GT_.call(null,count__3160,0)))
{return cljs.core.aget.call(null,this__3159.array,cljs.core.dec.call(null,count__3160));
} else
{return null;
}
});
cljs.core.Vector.prototype.cljs$core$IStack$_pop = (function (coll){
var this__3161 = this;
if(cljs.core.truth_(cljs.core._GT_.call(null,this__3161.array.length,0)))
{var new_array__3162 = cljs.core.aclone.call(null,this__3161.array);

new_array__3162.pop();
return (new cljs.core.Vector(this__3161.meta,new_array__3162));
} else
{throw (new Error("Can't pop empty vector"));
}
});
cljs.core.Vector.prototype.cljs$core$IVector$ = true;
cljs.core.Vector.prototype.cljs$core$IVector$_assoc_n = (function (coll,n,val){
var this__3163 = this;
return cljs.core._assoc.call(null,coll,n,val);
});
cljs.core.Vector.prototype.cljs$core$IEquiv$ = true;
cljs.core.Vector.prototype.cljs$core$IEquiv$_equiv = (function (coll,other){
var this__3164 = this;
return cljs.core.equiv_sequential.call(null,coll,other);
});
cljs.core.Vector.prototype.cljs$core$IWithMeta$ = true;
cljs.core.Vector.prototype.cljs$core$IWithMeta$_with_meta = (function (coll,meta){
var this__3165 = this;
return (new cljs.core.Vector(meta,this__3165.array));
});
cljs.core.Vector.prototype.cljs$core$IMeta$ = true;
cljs.core.Vector.prototype.cljs$core$IMeta$_meta = (function (coll){
var this__3166 = this;
return this__3166.meta;
});
cljs.core.Vector.prototype.cljs$core$IIndexed$ = true;
cljs.core.Vector.prototype.cljs$core$IIndexed$_nth = (function() {
var G__3180 = null;
var G__3180__3181 = (function (coll,n){
var this__3167 = this;
if(cljs.core.truth_((function (){var and__3546__auto____3168 = cljs.core._LT__EQ_.call(null,0,n);

if(cljs.core.truth_(and__3546__auto____3168))
{return cljs.core._LT_.call(null,n,this__3167.array.length);
} else
{return and__3546__auto____3168;
}
})()))
{return cljs.core.aget.call(null,this__3167.array,n);
} else
{return null;
}
});
var G__3180__3182 = (function (coll,n,not_found){
var this__3169 = this;
if(cljs.core.truth_((function (){var and__3546__auto____3170 = cljs.core._LT__EQ_.call(null,0,n);

if(cljs.core.truth_(and__3546__auto____3170))
{return cljs.core._LT_.call(null,n,this__3169.array.length);
} else
{return and__3546__auto____3170;
}
})()))
{return cljs.core.aget.call(null,this__3169.array,n);
} else
{return not_found;
}
});
G__3180 = function(coll,n,not_found){
switch(arguments.length){
case  2 :
return G__3180__3181.call(this,coll,n);
case  3 :
return G__3180__3182.call(this,coll,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3180;
})()
;
cljs.core.Vector.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.Vector.prototype.cljs$core$IEmptyableCollection$_empty = (function (coll){
var this__3171 = this;
return cljs.core.with_meta.call(null,cljs.core.Vector.EMPTY,this__3171.meta);
});
cljs.core.Vector.EMPTY = (new cljs.core.Vector(null,cljs.core.array.call(null)));
cljs.core.Vector.fromArray = (function (xs){
return (new cljs.core.Vector(null,xs));
});
cljs.core.Vector.prototype.call = (function() {
var G__3184 = null;
var G__3184__3185 = (function (_,k){
return cljs.core._lookup.call(null,this,k);
});
var G__3184__3186 = (function (_,k,not_found){
return cljs.core._lookup.call(null,this,k,not_found);
});
G__3184 = function(_,k,not_found){
switch(arguments.length){
case  2 :
return G__3184__3185.call(this,_,k);
case  3 :
return G__3184__3186.call(this,_,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3184;
})()
;
cljs.core.vec = (function vec(coll){
return cljs.core.reduce.call(null,cljs.core.conj,cljs.core.Vector.EMPTY,coll);
});
/**
* @param {...*} var_args
*/
cljs.core.vector = (function() { 
var vector__delegate = function (args){
return cljs.core.vec.call(null,args);
};
var vector = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return vector__delegate.call(this, args);
};
vector.cljs$lang$maxFixedArity = 0;
vector.cljs$lang$applyTo = (function (arglist__3188){
var args = cljs.core.seq( arglist__3188 );;
return vector__delegate.call(this, args);
});
return vector;
})()
;

/**
* @constructor
*/
cljs.core.NeverEquiv = (function (){
})
cljs.core.NeverEquiv.prototype.cljs$core$IEquiv$ = true;
cljs.core.NeverEquiv.prototype.cljs$core$IEquiv$_equiv = (function (o,other){
var this__3189 = this;
return false;
});
cljs.core.never_equiv = (new cljs.core.NeverEquiv());
/**
* Assumes y is a map. Returns true if x equals y, otherwise returns
* false.
*/
cljs.core.equiv_map = (function equiv_map(x,y){
return cljs.core.boolean$.call(null,(cljs.core.truth_(cljs.core.map_QMARK_.call(null,y))?(cljs.core.truth_(cljs.core._EQ_.call(null,cljs.core.count.call(null,x),cljs.core.count.call(null,y)))?cljs.core.every_QMARK_.call(null,cljs.core.identity,cljs.core.map.call(null,(function (xkv){
return cljs.core._EQ_.call(null,cljs.core.get.call(null,y,cljs.core.first.call(null,xkv),cljs.core.never_equiv),cljs.core.second.call(null,xkv));
}),x)):null):null));
});
cljs.core.scan_array = (function scan_array(incr,k,array){
var len__3190 = array.length;

var i__3191 = 0;

while(true){
if(cljs.core.truth_(cljs.core._LT_.call(null,i__3191,len__3190)))
{if(cljs.core.truth_(cljs.core._EQ_.call(null,k,cljs.core.aget.call(null,array,i__3191))))
{return i__3191;
} else
{{
var G__3192 = cljs.core._PLUS_.call(null,i__3191,incr);
i__3191 = G__3192;
continue;
}
}
} else
{return null;
}
break;
}
});
cljs.core.obj_map_contains_key_QMARK_ = (function() {
var obj_map_contains_key_QMARK_ = null;
var obj_map_contains_key_QMARK___3194 = (function (k,strobj){
return obj_map_contains_key_QMARK_.call(null,k,strobj,true,false);
});
var obj_map_contains_key_QMARK___3195 = (function (k,strobj,true_val,false_val){
if(cljs.core.truth_((function (){var and__3546__auto____3193 = goog.isString.call(null,k);

if(cljs.core.truth_(and__3546__auto____3193))
{return strobj.hasOwnProperty(k);
} else
{return and__3546__auto____3193;
}
})()))
{return true_val;
} else
{return false_val;
}
});
obj_map_contains_key_QMARK_ = function(k,strobj,true_val,false_val){
switch(arguments.length){
case  2 :
return obj_map_contains_key_QMARK___3194.call(this,k,strobj);
case  4 :
return obj_map_contains_key_QMARK___3195.call(this,k,strobj,true_val,false_val);
}
throw('Invalid arity: ' + arguments.length);
};
return obj_map_contains_key_QMARK_;
})()
;

/**
* @constructor
*/
cljs.core.ObjMap = (function (meta,keys,strobj){
this.meta = meta;
this.keys = keys;
this.strobj = strobj;
})
cljs.core.ObjMap.prototype.cljs$core$IHash$ = true;
cljs.core.ObjMap.prototype.cljs$core$IHash$_hash = (function (coll){
var this__3198 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.ObjMap.prototype.cljs$core$ILookup$ = true;
cljs.core.ObjMap.prototype.cljs$core$ILookup$_lookup = (function() {
var G__3217 = null;
var G__3217__3218 = (function (coll,k){
var this__3199 = this;
return cljs.core._lookup.call(null,coll,k,null);
});
var G__3217__3219 = (function (coll,k,not_found){
var this__3200 = this;
return cljs.core.obj_map_contains_key_QMARK_.call(null,k,this__3200.strobj,cljs.core.aget.call(null,this__3200.strobj,k),not_found);
});
G__3217 = function(coll,k,not_found){
switch(arguments.length){
case  2 :
return G__3217__3218.call(this,coll,k);
case  3 :
return G__3217__3219.call(this,coll,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3217;
})()
;
cljs.core.ObjMap.prototype.cljs$core$IAssociative$ = true;
cljs.core.ObjMap.prototype.cljs$core$IAssociative$_assoc = (function (coll,k,v){
var this__3201 = this;
if(cljs.core.truth_(goog.isString.call(null,k)))
{var new_strobj__3202 = goog.object.clone.call(null,this__3201.strobj);
var overwrite_QMARK___3203 = new_strobj__3202.hasOwnProperty(k);

cljs.core.aset.call(null,new_strobj__3202,k,v);
if(cljs.core.truth_(overwrite_QMARK___3203))
{return (new cljs.core.ObjMap(this__3201.meta,this__3201.keys,new_strobj__3202));
} else
{var new_keys__3204 = cljs.core.aclone.call(null,this__3201.keys);

new_keys__3204.push(k);
return (new cljs.core.ObjMap(this__3201.meta,new_keys__3204,new_strobj__3202));
}
} else
{return cljs.core.with_meta.call(null,cljs.core.into.call(null,cljs.core.hash_map.call(null,k,v),cljs.core.seq.call(null,coll)),this__3201.meta);
}
});
cljs.core.ObjMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_ = (function (coll,k){
var this__3205 = this;
return cljs.core.obj_map_contains_key_QMARK_.call(null,k,this__3205.strobj);
});
cljs.core.ObjMap.prototype.cljs$core$ICollection$ = true;
cljs.core.ObjMap.prototype.cljs$core$ICollection$_conj = (function (coll,entry){
var this__3206 = this;
if(cljs.core.truth_(cljs.core.vector_QMARK_.call(null,entry)))
{return cljs.core._assoc.call(null,coll,cljs.core._nth.call(null,entry,0),cljs.core._nth.call(null,entry,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,coll,entry);
}
});
cljs.core.ObjMap.prototype.cljs$core$ISeqable$ = true;
cljs.core.ObjMap.prototype.cljs$core$ISeqable$_seq = (function (coll){
var this__3207 = this;
if(cljs.core.truth_(cljs.core.pos_QMARK_.call(null,this__3207.keys.length)))
{return cljs.core.map.call(null,(function (p1__3197_SHARP_){
return cljs.core.vector.call(null,p1__3197_SHARP_,cljs.core.aget.call(null,this__3207.strobj,p1__3197_SHARP_));
}),this__3207.keys);
} else
{return null;
}
});
cljs.core.ObjMap.prototype.cljs$core$ICounted$ = true;
cljs.core.ObjMap.prototype.cljs$core$ICounted$_count = (function (coll){
var this__3208 = this;
return this__3208.keys.length;
});
cljs.core.ObjMap.prototype.cljs$core$IEquiv$ = true;
cljs.core.ObjMap.prototype.cljs$core$IEquiv$_equiv = (function (coll,other){
var this__3209 = this;
return cljs.core.equiv_map.call(null,coll,other);
});
cljs.core.ObjMap.prototype.cljs$core$IWithMeta$ = true;
cljs.core.ObjMap.prototype.cljs$core$IWithMeta$_with_meta = (function (coll,meta){
var this__3210 = this;
return (new cljs.core.ObjMap(meta,this__3210.keys,this__3210.strobj));
});
cljs.core.ObjMap.prototype.cljs$core$IMeta$ = true;
cljs.core.ObjMap.prototype.cljs$core$IMeta$_meta = (function (coll){
var this__3211 = this;
return this__3211.meta;
});
cljs.core.ObjMap.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.ObjMap.prototype.cljs$core$IEmptyableCollection$_empty = (function (coll){
var this__3212 = this;
return cljs.core.with_meta.call(null,cljs.core.ObjMap.EMPTY,this__3212.meta);
});
cljs.core.ObjMap.prototype.cljs$core$IMap$ = true;
cljs.core.ObjMap.prototype.cljs$core$IMap$_dissoc = (function (coll,k){
var this__3213 = this;
if(cljs.core.truth_((function (){var and__3546__auto____3214 = goog.isString.call(null,k);

if(cljs.core.truth_(and__3546__auto____3214))
{return this__3213.strobj.hasOwnProperty(k);
} else
{return and__3546__auto____3214;
}
})()))
{var new_keys__3215 = cljs.core.aclone.call(null,this__3213.keys);
var new_strobj__3216 = goog.object.clone.call(null,this__3213.strobj);

new_keys__3215.splice(cljs.core.scan_array.call(null,1,k,new_keys__3215),1);
cljs.core.js_delete.call(null,new_strobj__3216,k);
return (new cljs.core.ObjMap(this__3213.meta,new_keys__3215,new_strobj__3216));
} else
{return coll;
}
});
cljs.core.ObjMap.EMPTY = (new cljs.core.ObjMap(null,cljs.core.array.call(null),cljs.core.js_obj.call(null)));
cljs.core.ObjMap.fromObject = (function (ks,obj){
return (new cljs.core.ObjMap(null,ks,obj));
});
cljs.core.ObjMap.prototype.call = (function() {
var G__3222 = null;
var G__3222__3223 = (function (_,k){
return cljs.core._lookup.call(null,this,k);
});
var G__3222__3224 = (function (_,k,not_found){
return cljs.core._lookup.call(null,this,k,not_found);
});
G__3222 = function(_,k,not_found){
switch(arguments.length){
case  2 :
return G__3222__3223.call(this,_,k);
case  3 :
return G__3222__3224.call(this,_,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3222;
})()
;

/**
* @constructor
*/
cljs.core.HashMap = (function (meta,count,hashobj){
this.meta = meta;
this.count = count;
this.hashobj = hashobj;
})
cljs.core.HashMap.prototype.cljs$core$IHash$ = true;
cljs.core.HashMap.prototype.cljs$core$IHash$_hash = (function (coll){
var this__3226 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.HashMap.prototype.cljs$core$ILookup$ = true;
cljs.core.HashMap.prototype.cljs$core$ILookup$_lookup = (function() {
var G__3256 = null;
var G__3256__3257 = (function (coll,k){
var this__3227 = this;
return cljs.core._lookup.call(null,coll,k,null);
});
var G__3256__3258 = (function (coll,k,not_found){
var this__3228 = this;
var bucket__3229 = cljs.core.aget.call(null,this__3228.hashobj,cljs.core.hash.call(null,k));
var i__3230 = (cljs.core.truth_(bucket__3229)?cljs.core.scan_array.call(null,2,k,bucket__3229):null);

if(cljs.core.truth_(i__3230))
{return cljs.core.aget.call(null,bucket__3229,cljs.core.inc.call(null,i__3230));
} else
{return not_found;
}
});
G__3256 = function(coll,k,not_found){
switch(arguments.length){
case  2 :
return G__3256__3257.call(this,coll,k);
case  3 :
return G__3256__3258.call(this,coll,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3256;
})()
;
cljs.core.HashMap.prototype.cljs$core$IAssociative$ = true;
cljs.core.HashMap.prototype.cljs$core$IAssociative$_assoc = (function (coll,k,v){
var this__3231 = this;
var h__3232 = cljs.core.hash.call(null,k);
var bucket__3233 = cljs.core.aget.call(null,this__3231.hashobj,h__3232);

if(cljs.core.truth_(bucket__3233))
{var new_bucket__3234 = cljs.core.aclone.call(null,bucket__3233);
var new_hashobj__3235 = goog.object.clone.call(null,this__3231.hashobj);

cljs.core.aset.call(null,new_hashobj__3235,h__3232,new_bucket__3234);
var temp__3695__auto____3236 = cljs.core.scan_array.call(null,2,k,new_bucket__3234);

if(cljs.core.truth_(temp__3695__auto____3236))
{var i__3237 = temp__3695__auto____3236;

cljs.core.aset.call(null,new_bucket__3234,cljs.core.inc.call(null,i__3237),v);
return (new cljs.core.HashMap(this__3231.meta,this__3231.count,new_hashobj__3235));
} else
{new_bucket__3234.push(k,v);
return (new cljs.core.HashMap(this__3231.meta,cljs.core.inc.call(null,this__3231.count),new_hashobj__3235));
}
} else
{var new_hashobj__3238 = goog.object.clone.call(null,this__3231.hashobj);

cljs.core.aset.call(null,new_hashobj__3238,h__3232,cljs.core.array.call(null,k,v));
return (new cljs.core.HashMap(this__3231.meta,cljs.core.inc.call(null,this__3231.count),new_hashobj__3238));
}
});
cljs.core.HashMap.prototype.cljs$core$IAssociative$_contains_key_QMARK_ = (function (coll,k){
var this__3239 = this;
var bucket__3240 = cljs.core.aget.call(null,this__3239.hashobj,cljs.core.hash.call(null,k));
var i__3241 = (cljs.core.truth_(bucket__3240)?cljs.core.scan_array.call(null,2,k,bucket__3240):null);

if(cljs.core.truth_(i__3241))
{return true;
} else
{return false;
}
});
cljs.core.HashMap.prototype.cljs$core$ICollection$ = true;
cljs.core.HashMap.prototype.cljs$core$ICollection$_conj = (function (coll,entry){
var this__3242 = this;
if(cljs.core.truth_(cljs.core.vector_QMARK_.call(null,entry)))
{return cljs.core._assoc.call(null,coll,cljs.core._nth.call(null,entry,0),cljs.core._nth.call(null,entry,1));
} else
{return cljs.core.reduce.call(null,cljs.core._conj,coll,entry);
}
});
cljs.core.HashMap.prototype.cljs$core$ISeqable$ = true;
cljs.core.HashMap.prototype.cljs$core$ISeqable$_seq = (function (coll){
var this__3243 = this;
if(cljs.core.truth_(cljs.core.pos_QMARK_.call(null,this__3243.count)))
{var hashes__3244 = cljs.core.js_keys.call(null,this__3243.hashobj);

return cljs.core.mapcat.call(null,(function (p1__3221_SHARP_){
return cljs.core.map.call(null,cljs.core.vec,cljs.core.partition.call(null,2,cljs.core.aget.call(null,this__3243.hashobj,p1__3221_SHARP_)));
}),hashes__3244);
} else
{return null;
}
});
cljs.core.HashMap.prototype.cljs$core$ICounted$ = true;
cljs.core.HashMap.prototype.cljs$core$ICounted$_count = (function (coll){
var this__3245 = this;
return this__3245.count;
});
cljs.core.HashMap.prototype.cljs$core$IEquiv$ = true;
cljs.core.HashMap.prototype.cljs$core$IEquiv$_equiv = (function (coll,other){
var this__3246 = this;
return cljs.core.equiv_map.call(null,coll,other);
});
cljs.core.HashMap.prototype.cljs$core$IWithMeta$ = true;
cljs.core.HashMap.prototype.cljs$core$IWithMeta$_with_meta = (function (coll,meta){
var this__3247 = this;
return (new cljs.core.HashMap(meta,this__3247.count,this__3247.hashobj));
});
cljs.core.HashMap.prototype.cljs$core$IMeta$ = true;
cljs.core.HashMap.prototype.cljs$core$IMeta$_meta = (function (coll){
var this__3248 = this;
return this__3248.meta;
});
cljs.core.HashMap.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.HashMap.prototype.cljs$core$IEmptyableCollection$_empty = (function (coll){
var this__3249 = this;
return cljs.core.with_meta.call(null,cljs.core.HashMap.EMPTY,this__3249.meta);
});
cljs.core.HashMap.prototype.cljs$core$IMap$ = true;
cljs.core.HashMap.prototype.cljs$core$IMap$_dissoc = (function (coll,k){
var this__3250 = this;
var h__3251 = cljs.core.hash.call(null,k);
var bucket__3252 = cljs.core.aget.call(null,this__3250.hashobj,h__3251);
var i__3253 = (cljs.core.truth_(bucket__3252)?cljs.core.scan_array.call(null,2,k,bucket__3252):null);

if(cljs.core.truth_(cljs.core.not.call(null,i__3253)))
{return coll;
} else
{var new_hashobj__3254 = goog.object.clone.call(null,this__3250.hashobj);

if(cljs.core.truth_(cljs.core._GT_.call(null,3,bucket__3252.length)))
{cljs.core.js_delete.call(null,new_hashobj__3254,h__3251);
} else
{var new_bucket__3255 = cljs.core.aclone.call(null,bucket__3252);

new_bucket__3255.splice(i__3253,2);
cljs.core.aset.call(null,new_hashobj__3254,h__3251,new_bucket__3255);
}
return (new cljs.core.HashMap(this__3250.meta,cljs.core.dec.call(null,this__3250.count),new_hashobj__3254));
}
});
cljs.core.HashMap.EMPTY = (new cljs.core.HashMap(null,0,cljs.core.js_obj.call(null)));
cljs.core.HashMap.fromArrays = (function (ks,vs){
var len__3260 = ks.length;

var i__3261 = 0;
var out__3262 = cljs.core.HashMap.EMPTY;

while(true){
if(cljs.core.truth_(cljs.core._LT_.call(null,i__3261,len__3260)))
{{
var G__3263 = cljs.core.inc.call(null,i__3261);
var G__3264 = cljs.core.assoc.call(null,out__3262,cljs.core.aget.call(null,ks,i__3261),cljs.core.aget.call(null,vs,i__3261));
i__3261 = G__3263;
out__3262 = G__3264;
continue;
}
} else
{return out__3262;
}
break;
}
});
cljs.core.HashMap.prototype.call = (function() {
var G__3265 = null;
var G__3265__3266 = (function (_,k){
return cljs.core._lookup.call(null,this,k);
});
var G__3265__3267 = (function (_,k,not_found){
return cljs.core._lookup.call(null,this,k,not_found);
});
G__3265 = function(_,k,not_found){
switch(arguments.length){
case  2 :
return G__3265__3266.call(this,_,k);
case  3 :
return G__3265__3267.call(this,_,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3265;
})()
;
/**
* keyval => key val
* Returns a new hash map with supplied mappings.
* @param {...*} var_args
*/
cljs.core.hash_map = (function() { 
var hash_map__delegate = function (keyvals){
var in$__3269 = cljs.core.seq.call(null,keyvals);
var out__3270 = cljs.core.HashMap.EMPTY;

while(true){
if(cljs.core.truth_(in$__3269))
{{
var G__3271 = cljs.core.nnext.call(null,in$__3269);
var G__3272 = cljs.core.assoc.call(null,out__3270,cljs.core.first.call(null,in$__3269),cljs.core.second.call(null,in$__3269));
in$__3269 = G__3271;
out__3270 = G__3272;
continue;
}
} else
{return out__3270;
}
break;
}
};
var hash_map = function (var_args){
var keyvals = null;
if (goog.isDef(var_args)) {
  keyvals = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return hash_map__delegate.call(this, keyvals);
};
hash_map.cljs$lang$maxFixedArity = 0;
hash_map.cljs$lang$applyTo = (function (arglist__3273){
var keyvals = cljs.core.seq( arglist__3273 );;
return hash_map__delegate.call(this, keyvals);
});
return hash_map;
})()
;
/**
* Returns a sequence of the map's keys.
*/
cljs.core.keys = (function keys(hash_map){
return cljs.core.seq.call(null,cljs.core.map.call(null,cljs.core.first,hash_map));
});
/**
* Returns a sequence of the map's values.
*/
cljs.core.vals = (function vals(hash_map){
return cljs.core.seq.call(null,cljs.core.map.call(null,cljs.core.second,hash_map));
});
/**
* Returns a map that consists of the rest of the maps conj-ed onto
* the first.  If a key occurs in more than one map, the mapping from
* the latter (left-to-right) will be the mapping in the result.
* @param {...*} var_args
*/
cljs.core.merge = (function() { 
var merge__delegate = function (maps){
if(cljs.core.truth_(cljs.core.some.call(null,cljs.core.identity,maps)))
{return cljs.core.reduce.call(null,(function (p1__3274_SHARP_,p2__3275_SHARP_){
return cljs.core.conj.call(null,(function (){var or__3548__auto____3276 = p1__3274_SHARP_;

if(cljs.core.truth_(or__3548__auto____3276))
{return or__3548__auto____3276;
} else
{return cljs.core.ObjMap.fromObject([],{});
}
})(),p2__3275_SHARP_);
}),maps);
} else
{return null;
}
};
var merge = function (var_args){
var maps = null;
if (goog.isDef(var_args)) {
  maps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return merge__delegate.call(this, maps);
};
merge.cljs$lang$maxFixedArity = 0;
merge.cljs$lang$applyTo = (function (arglist__3277){
var maps = cljs.core.seq( arglist__3277 );;
return merge__delegate.call(this, maps);
});
return merge;
})()
;
/**
* Returns a map that consists of the rest of the maps conj-ed onto
* the first.  If a key occurs in more than one map, the mapping(s)
* from the latter (left-to-right) will be combined with the mapping in
* the result by calling (f val-in-result val-in-latter).
* @param {...*} var_args
*/
cljs.core.merge_with = (function() { 
var merge_with__delegate = function (f,maps){
if(cljs.core.truth_(cljs.core.some.call(null,cljs.core.identity,maps)))
{var merge_entry__3280 = (function (m,e){
var k__3278 = cljs.core.first.call(null,e);
var v__3279 = cljs.core.second.call(null,e);

if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null,m,k__3278)))
{return cljs.core.assoc.call(null,m,k__3278,f.call(null,cljs.core.get.call(null,m,k__3278),v__3279));
} else
{return cljs.core.assoc.call(null,m,k__3278,v__3279);
}
});
var merge2__3282 = (function (m1,m2){
return cljs.core.reduce.call(null,merge_entry__3280,(function (){var or__3548__auto____3281 = m1;

if(cljs.core.truth_(or__3548__auto____3281))
{return or__3548__auto____3281;
} else
{return cljs.core.ObjMap.fromObject([],{});
}
})(),cljs.core.seq.call(null,m2));
});

return cljs.core.reduce.call(null,merge2__3282,maps);
} else
{return null;
}
};
var merge_with = function (f,var_args){
var maps = null;
if (goog.isDef(var_args)) {
  maps = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return merge_with__delegate.call(this, f, maps);
};
merge_with.cljs$lang$maxFixedArity = 1;
merge_with.cljs$lang$applyTo = (function (arglist__3283){
var f = cljs.core.first(arglist__3283);
var maps = cljs.core.rest(arglist__3283);
return merge_with__delegate.call(this, f, maps);
});
return merge_with;
})()
;
/**
* Returns a map containing only those entries in map whose key is in keys
*/
cljs.core.select_keys = (function select_keys(map,keyseq){
var ret__3285 = cljs.core.ObjMap.fromObject([],{});
var keys__3286 = cljs.core.seq.call(null,keyseq);

while(true){
if(cljs.core.truth_(keys__3286))
{var key__3287 = cljs.core.first.call(null,keys__3286);
var entry__3288 = cljs.core.get.call(null,map,key__3287,"﷐'user/not-found");

{
var G__3289 = (cljs.core.truth_(cljs.core.not_EQ_.call(null,entry__3288,"﷐'user/not-found"))?cljs.core.assoc.call(null,ret__3285,key__3287,entry__3288):ret__3285);
var G__3290 = cljs.core.next.call(null,keys__3286);
ret__3285 = G__3289;
keys__3286 = G__3290;
continue;
}
} else
{return ret__3285;
}
break;
}
});

/**
* @constructor
*/
cljs.core.Set = (function (meta,hash_map){
this.meta = meta;
this.hash_map = hash_map;
})
cljs.core.Set.prototype.cljs$core$IHash$ = true;
cljs.core.Set.prototype.cljs$core$IHash$_hash = (function (coll){
var this__3291 = this;
return cljs.core.hash_coll.call(null,coll);
});
cljs.core.Set.prototype.cljs$core$ILookup$ = true;
cljs.core.Set.prototype.cljs$core$ILookup$_lookup = (function() {
var G__3304 = null;
var G__3304__3305 = (function (coll,v){
var this__3292 = this;
return cljs.core._lookup.call(null,coll,v,null);
});
var G__3304__3306 = (function (coll,v,not_found){
var this__3293 = this;
if(cljs.core.truth_(cljs.core._contains_key_QMARK_.call(null,this__3293.hash_map,v)))
{return v;
} else
{return not_found;
}
});
G__3304 = function(coll,v,not_found){
switch(arguments.length){
case  2 :
return G__3304__3305.call(this,coll,v);
case  3 :
return G__3304__3306.call(this,coll,v,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3304;
})()
;
cljs.core.Set.prototype.cljs$core$ICollection$ = true;
cljs.core.Set.prototype.cljs$core$ICollection$_conj = (function (coll,o){
var this__3294 = this;
return (new cljs.core.Set(this__3294.meta,cljs.core.assoc.call(null,this__3294.hash_map,o,null)));
});
cljs.core.Set.prototype.cljs$core$ISeqable$ = true;
cljs.core.Set.prototype.cljs$core$ISeqable$_seq = (function (coll){
var this__3295 = this;
return cljs.core.keys.call(null,this__3295.hash_map);
});
cljs.core.Set.prototype.cljs$core$ISet$ = true;
cljs.core.Set.prototype.cljs$core$ISet$_disjoin = (function (coll,v){
var this__3296 = this;
return (new cljs.core.Set(this__3296.meta,cljs.core.dissoc.call(null,this__3296.hash_map,v)));
});
cljs.core.Set.prototype.cljs$core$ICounted$ = true;
cljs.core.Set.prototype.cljs$core$ICounted$_count = (function (coll){
var this__3297 = this;
return cljs.core.count.call(null,cljs.core.seq.call(null,coll));
});
cljs.core.Set.prototype.cljs$core$IEquiv$ = true;
cljs.core.Set.prototype.cljs$core$IEquiv$_equiv = (function (coll,other){
var this__3298 = this;
var and__3546__auto____3299 = cljs.core.set_QMARK_.call(null,other);

if(cljs.core.truth_(and__3546__auto____3299))
{var and__3546__auto____3300 = cljs.core._EQ_.call(null,cljs.core.count.call(null,coll),cljs.core.count.call(null,other));

if(cljs.core.truth_(and__3546__auto____3300))
{return cljs.core.every_QMARK_.call(null,(function (p1__3284_SHARP_){
return cljs.core.contains_QMARK_.call(null,coll,p1__3284_SHARP_);
}),other);
} else
{return and__3546__auto____3300;
}
} else
{return and__3546__auto____3299;
}
});
cljs.core.Set.prototype.cljs$core$IWithMeta$ = true;
cljs.core.Set.prototype.cljs$core$IWithMeta$_with_meta = (function (coll,meta){
var this__3301 = this;
return (new cljs.core.Set(meta,this__3301.hash_map));
});
cljs.core.Set.prototype.cljs$core$IMeta$ = true;
cljs.core.Set.prototype.cljs$core$IMeta$_meta = (function (coll){
var this__3302 = this;
return this__3302.meta;
});
cljs.core.Set.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.Set.prototype.cljs$core$IEmptyableCollection$_empty = (function (coll){
var this__3303 = this;
return cljs.core.with_meta.call(null,cljs.core.Set.EMPTY,this__3303.meta);
});
cljs.core.Set.EMPTY = (new cljs.core.Set(null,cljs.core.hash_map.call(null)));
cljs.core.Set.prototype.call = (function() {
var G__3308 = null;
var G__3308__3309 = (function (_,k){
return cljs.core._lookup.call(null,this,k);
});
var G__3308__3310 = (function (_,k,not_found){
return cljs.core._lookup.call(null,this,k,not_found);
});
G__3308 = function(_,k,not_found){
switch(arguments.length){
case  2 :
return G__3308__3309.call(this,_,k);
case  3 :
return G__3308__3310.call(this,_,k,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3308;
})()
;
/**
* Returns a set of the distinct elements of coll.
*/
cljs.core.set = (function set(coll){
var in$__3313 = cljs.core.seq.call(null,coll);
var out__3314 = cljs.core.Set.EMPTY;

while(true){
if(cljs.core.truth_(cljs.core.not.call(null,cljs.core.empty_QMARK_.call(null,in$__3313))))
{{
var G__3315 = cljs.core.rest.call(null,in$__3313);
var G__3316 = cljs.core.conj.call(null,out__3314,cljs.core.first.call(null,in$__3313));
in$__3313 = G__3315;
out__3314 = G__3316;
continue;
}
} else
{return out__3314;
}
break;
}
});
/**
* Given a map of replacement pairs and a vector/collection, returns a
* vector/seq with any elements = a key in smap replaced with the
* corresponding val in smap
*/
cljs.core.replace = (function replace(smap,coll){
if(cljs.core.truth_(cljs.core.vector_QMARK_.call(null,coll)))
{var n__3317 = cljs.core.count.call(null,coll);

return cljs.core.reduce.call(null,(function (v,i){
var temp__3695__auto____3318 = cljs.core.find.call(null,smap,cljs.core.nth.call(null,v,i));

if(cljs.core.truth_(temp__3695__auto____3318))
{var e__3319 = temp__3695__auto____3318;

return cljs.core.assoc.call(null,v,i,cljs.core.second.call(null,e__3319));
} else
{return v;
}
}),coll,cljs.core.take.call(null,n__3317,cljs.core.iterate.call(null,cljs.core.inc,0)));
} else
{return cljs.core.map.call(null,(function (p1__3312_SHARP_){
var temp__3695__auto____3320 = cljs.core.find.call(null,smap,p1__3312_SHARP_);

if(cljs.core.truth_(temp__3695__auto____3320))
{var e__3321 = temp__3695__auto____3320;

return cljs.core.second.call(null,e__3321);
} else
{return p1__3312_SHARP_;
}
}),coll);
}
});
/**
* Returns a lazy sequence of the elements of coll with duplicates removed
*/
cljs.core.distinct = (function distinct(coll){
var step__3329 = (function step(xs,seen){
return (new cljs.core.LazySeq(null,false,(function (){
return (function (p__3322,seen){
while(true){
var vec__3323__3324 = p__3322;
var f__3325 = cljs.core.nth.call(null,vec__3323__3324,0,null);
var xs__3326 = vec__3323__3324;

var temp__3698__auto____3327 = cljs.core.seq.call(null,xs__3326);

if(cljs.core.truth_(temp__3698__auto____3327))
{var s__3328 = temp__3698__auto____3327;

if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null,seen,f__3325)))
{{
var G__3330 = cljs.core.rest.call(null,s__3328);
var G__3331 = seen;
p__3322 = G__3330;
seen = G__3331;
continue;
}
} else
{return cljs.core.cons.call(null,f__3325,step.call(null,cljs.core.rest.call(null,s__3328),cljs.core.conj.call(null,seen,f__3325)));
}
} else
{return null;
}
break;
}
}).call(null,xs,seen);
})));
});

return step__3329.call(null,coll,cljs.core.set([]));
});
cljs.core.butlast = (function butlast(s){
var ret__3332 = cljs.core.Vector.fromArray([]);
var s__3333 = s;

while(true){
if(cljs.core.truth_(cljs.core.next.call(null,s__3333)))
{{
var G__3334 = cljs.core.conj.call(null,ret__3332,cljs.core.first.call(null,s__3333));
var G__3335 = cljs.core.next.call(null,s__3333);
ret__3332 = G__3334;
s__3333 = G__3335;
continue;
}
} else
{return cljs.core.seq.call(null,ret__3332);
}
break;
}
});
/**
* Returns the name String of a string, symbol or keyword.
*/
cljs.core.name = (function name(x){
if(cljs.core.truth_(cljs.core.string_QMARK_.call(null,x)))
{return x;
} else
{if(cljs.core.truth_((function (){var or__3548__auto____3336 = cljs.core.keyword_QMARK_.call(null,x);

if(cljs.core.truth_(or__3548__auto____3336))
{return or__3548__auto____3336;
} else
{return cljs.core.symbol_QMARK_.call(null,x);
}
})()))
{var i__3337 = x.lastIndexOf("/");

if(cljs.core.truth_(cljs.core._LT_.call(null,i__3337,0)))
{return cljs.core.subs.call(null,x,2);
} else
{return cljs.core.subs.call(null,x,cljs.core.inc.call(null,i__3337));
}
} else
{if(cljs.core.truth_("﷐'else"))
{throw (new Error(cljs.core.str.call(null,"Doesn't support name: ",x)));
} else
{return null;
}
}
}
});
/**
* Returns the namespace String of a symbol or keyword, or nil if not present.
*/
cljs.core.namespace = (function namespace(x){
if(cljs.core.truth_((function (){var or__3548__auto____3338 = cljs.core.keyword_QMARK_.call(null,x);

if(cljs.core.truth_(or__3548__auto____3338))
{return or__3548__auto____3338;
} else
{return cljs.core.symbol_QMARK_.call(null,x);
}
})()))
{var i__3339 = x.lastIndexOf("/");

if(cljs.core.truth_(cljs.core._GT_.call(null,i__3339,-1)))
{return cljs.core.subs.call(null,x,2,i__3339);
} else
{return null;
}
} else
{throw (new Error(cljs.core.str.call(null,"Doesn't support namespace: ",x)));
}
});
/**
* Returns a map with the keys mapped to the corresponding vals.
*/
cljs.core.zipmap = (function zipmap(keys,vals){
var map__3342 = cljs.core.ObjMap.fromObject([],{});
var ks__3343 = cljs.core.seq.call(null,keys);
var vs__3344 = cljs.core.seq.call(null,vals);

while(true){
if(cljs.core.truth_((function (){var and__3546__auto____3345 = ks__3343;

if(cljs.core.truth_(and__3546__auto____3345))
{return vs__3344;
} else
{return and__3546__auto____3345;
}
})()))
{{
var G__3346 = cljs.core.assoc.call(null,map__3342,cljs.core.first.call(null,ks__3343),cljs.core.first.call(null,vs__3344));
var G__3347 = cljs.core.next.call(null,ks__3343);
var G__3348 = cljs.core.next.call(null,vs__3344);
map__3342 = G__3346;
ks__3343 = G__3347;
vs__3344 = G__3348;
continue;
}
} else
{return map__3342;
}
break;
}
});
/**
* Returns the x for which (k x), a number, is greatest.
* @param {...*} var_args
*/
cljs.core.max_key = (function() {
var max_key = null;
var max_key__3351 = (function (k,x){
return x;
});
var max_key__3352 = (function (k,x,y){
if(cljs.core.truth_(cljs.core._GT_.call(null,k.call(null,x),k.call(null,y))))
{return x;
} else
{return y;
}
});
var max_key__3353 = (function() { 
var G__3355__delegate = function (k,x,y,more){
return cljs.core.reduce.call(null,(function (p1__3340_SHARP_,p2__3341_SHARP_){
return max_key.call(null,k,p1__3340_SHARP_,p2__3341_SHARP_);
}),max_key.call(null,k,x,y),more);
};
var G__3355 = function (k,x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3355__delegate.call(this, k, x, y, more);
};
G__3355.cljs$lang$maxFixedArity = 3;
G__3355.cljs$lang$applyTo = (function (arglist__3356){
var k = cljs.core.first(arglist__3356);
var x = cljs.core.first(cljs.core.next(arglist__3356));
var y = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3356)));
var more = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3356)));
return G__3355__delegate.call(this, k, x, y, more);
});
return G__3355;
})()
;
max_key = function(k,x,y,var_args){
var more = var_args;
switch(arguments.length){
case  2 :
return max_key__3351.call(this,k,x);
case  3 :
return max_key__3352.call(this,k,x,y);
default:
return max_key__3353.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
max_key.cljs$lang$maxFixedArity = 3;
max_key.cljs$lang$applyTo = max_key__3353.cljs$lang$applyTo;
return max_key;
})()
;
/**
* Returns the x for which (k x), a number, is least.
* @param {...*} var_args
*/
cljs.core.min_key = (function() {
var min_key = null;
var min_key__3357 = (function (k,x){
return x;
});
var min_key__3358 = (function (k,x,y){
if(cljs.core.truth_(cljs.core._LT_.call(null,k.call(null,x),k.call(null,y))))
{return x;
} else
{return y;
}
});
var min_key__3359 = (function() { 
var G__3361__delegate = function (k,x,y,more){
return cljs.core.reduce.call(null,(function (p1__3349_SHARP_,p2__3350_SHARP_){
return min_key.call(null,k,p1__3349_SHARP_,p2__3350_SHARP_);
}),min_key.call(null,k,x,y),more);
};
var G__3361 = function (k,x,y,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3361__delegate.call(this, k, x, y, more);
};
G__3361.cljs$lang$maxFixedArity = 3;
G__3361.cljs$lang$applyTo = (function (arglist__3362){
var k = cljs.core.first(arglist__3362);
var x = cljs.core.first(cljs.core.next(arglist__3362));
var y = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3362)));
var more = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3362)));
return G__3361__delegate.call(this, k, x, y, more);
});
return G__3361;
})()
;
min_key = function(k,x,y,var_args){
var more = var_args;
switch(arguments.length){
case  2 :
return min_key__3357.call(this,k,x);
case  3 :
return min_key__3358.call(this,k,x,y);
default:
return min_key__3359.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
min_key.cljs$lang$maxFixedArity = 3;
min_key.cljs$lang$applyTo = min_key__3359.cljs$lang$applyTo;
return min_key;
})()
;
/**
* Returns a lazy sequence of lists like partition, but may include
* partitions with fewer than n items at the end.
*/
cljs.core.partition_all = (function() {
var partition_all = null;
var partition_all__3365 = (function (n,coll){
return partition_all.call(null,n,n,coll);
});
var partition_all__3366 = (function (n,step,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____3363 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____3363))
{var s__3364 = temp__3698__auto____3363;

return cljs.core.cons.call(null,cljs.core.take.call(null,n,s__3364),partition_all.call(null,n,step,cljs.core.drop.call(null,step,s__3364)));
} else
{return null;
}
})));
});
partition_all = function(n,step,coll){
switch(arguments.length){
case  2 :
return partition_all__3365.call(this,n,step);
case  3 :
return partition_all__3366.call(this,n,step,coll);
}
throw('Invalid arity: ' + arguments.length);
};
return partition_all;
})()
;
/**
* Returns a lazy sequence of successive items from coll while
* (pred item) returns true. pred must be free of side-effects.
*/
cljs.core.take_while = (function take_while(pred,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____3368 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____3368))
{var s__3369 = temp__3698__auto____3368;

if(cljs.core.truth_(pred.call(null,cljs.core.first.call(null,s__3369))))
{return cljs.core.cons.call(null,cljs.core.first.call(null,s__3369),take_while.call(null,pred,cljs.core.rest.call(null,s__3369)));
} else
{return null;
}
} else
{return null;
}
})));
});

/**
* @constructor
*/
cljs.core.Range = (function (meta,start,end,step){
this.meta = meta;
this.start = start;
this.end = end;
this.step = step;
})
cljs.core.Range.prototype.cljs$core$IHash$ = true;
cljs.core.Range.prototype.cljs$core$IHash$_hash = (function (rng){
var this__3370 = this;
return cljs.core.hash_coll.call(null,rng);
});
cljs.core.Range.prototype.cljs$core$ISequential$ = true;
cljs.core.Range.prototype.cljs$core$ICollection$ = true;
cljs.core.Range.prototype.cljs$core$ICollection$_conj = (function (rng,o){
var this__3371 = this;
return cljs.core.cons.call(null,o,rng);
});
cljs.core.Range.prototype.cljs$core$IReduce$ = true;
cljs.core.Range.prototype.cljs$core$IReduce$_reduce = (function() {
var G__3387 = null;
var G__3387__3388 = (function (rng,f){
var this__3372 = this;
return cljs.core.ci_reduce.call(null,rng,f);
});
var G__3387__3389 = (function (rng,f,s){
var this__3373 = this;
return cljs.core.ci_reduce.call(null,rng,f,s);
});
G__3387 = function(rng,f,s){
switch(arguments.length){
case  2 :
return G__3387__3388.call(this,rng,f);
case  3 :
return G__3387__3389.call(this,rng,f,s);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3387;
})()
;
cljs.core.Range.prototype.cljs$core$ISeqable$ = true;
cljs.core.Range.prototype.cljs$core$ISeqable$_seq = (function (rng){
var this__3374 = this;
var comp__3375 = (cljs.core.truth_(cljs.core.pos_QMARK_.call(null,this__3374.step))?cljs.core._LT_:cljs.core._GT_);

if(cljs.core.truth_(comp__3375.call(null,this__3374.start,this__3374.end)))
{return rng;
} else
{return null;
}
});
cljs.core.Range.prototype.cljs$core$ICounted$ = true;
cljs.core.Range.prototype.cljs$core$ICounted$_count = (function (rng){
var this__3376 = this;
if(cljs.core.truth_(cljs.core.not.call(null,cljs.core._seq.call(null,rng))))
{return 0;
} else
{return Math['ceil'].call(null,cljs.core._SLASH_.call(null,cljs.core._.call(null,this__3376.end,this__3376.start),this__3376.step));
}
});
cljs.core.Range.prototype.cljs$core$ISeq$ = true;
cljs.core.Range.prototype.cljs$core$ISeq$_first = (function (rng){
var this__3377 = this;
return this__3377.start;
});
cljs.core.Range.prototype.cljs$core$ISeq$_rest = (function (rng){
var this__3378 = this;
if(cljs.core.truth_(cljs.core._seq.call(null,rng)))
{return (new cljs.core.Range(this__3378.meta,cljs.core._PLUS_.call(null,this__3378.start,this__3378.step),this__3378.end,this__3378.step));
} else
{return cljs.core.list.call(null);
}
});
cljs.core.Range.prototype.cljs$core$IEquiv$ = true;
cljs.core.Range.prototype.cljs$core$IEquiv$_equiv = (function (rng,other){
var this__3379 = this;
return cljs.core.equiv_sequential.call(null,rng,other);
});
cljs.core.Range.prototype.cljs$core$IWithMeta$ = true;
cljs.core.Range.prototype.cljs$core$IWithMeta$_with_meta = (function (rng,meta){
var this__3380 = this;
return (new cljs.core.Range(meta,this__3380.start,this__3380.end,this__3380.step));
});
cljs.core.Range.prototype.cljs$core$IMeta$ = true;
cljs.core.Range.prototype.cljs$core$IMeta$_meta = (function (rng){
var this__3381 = this;
return this__3381.meta;
});
cljs.core.Range.prototype.cljs$core$IIndexed$ = true;
cljs.core.Range.prototype.cljs$core$IIndexed$_nth = (function() {
var G__3391 = null;
var G__3391__3392 = (function (rng,n){
var this__3382 = this;
if(cljs.core.truth_(cljs.core._LT_.call(null,n,cljs.core._count.call(null,rng))))
{return cljs.core._PLUS_.call(null,this__3382.start,cljs.core._STAR_.call(null,n,this__3382.step));
} else
{if(cljs.core.truth_((function (){var and__3546__auto____3383 = cljs.core._GT_.call(null,this__3382.start,this__3382.end);

if(cljs.core.truth_(and__3546__auto____3383))
{return cljs.core._EQ_.call(null,this__3382.step,0);
} else
{return and__3546__auto____3383;
}
})()))
{return this__3382.start;
} else
{throw (new Error("Index out of bounds"));
}
}
});
var G__3391__3393 = (function (rng,n,not_found){
var this__3384 = this;
if(cljs.core.truth_(cljs.core._LT_.call(null,n,cljs.core._count.call(null,rng))))
{return cljs.core._PLUS_.call(null,this__3384.start,cljs.core._STAR_.call(null,n,this__3384.step));
} else
{if(cljs.core.truth_((function (){var and__3546__auto____3385 = cljs.core._GT_.call(null,this__3384.start,this__3384.end);

if(cljs.core.truth_(and__3546__auto____3385))
{return cljs.core._EQ_.call(null,this__3384.step,0);
} else
{return and__3546__auto____3385;
}
})()))
{return this__3384.start;
} else
{return not_found;
}
}
});
G__3391 = function(rng,n,not_found){
switch(arguments.length){
case  2 :
return G__3391__3392.call(this,rng,n);
case  3 :
return G__3391__3393.call(this,rng,n,not_found);
}
throw('Invalid arity: ' + arguments.length);
};
return G__3391;
})()
;
cljs.core.Range.prototype.cljs$core$IEmptyableCollection$ = true;
cljs.core.Range.prototype.cljs$core$IEmptyableCollection$_empty = (function (rng){
var this__3386 = this;
return cljs.core.with_meta.call(null,cljs.core.List.EMPTY,this__3386.meta);
});
/**
* Returns a lazy seq of nums from start (inclusive) to end
* (exclusive), by step, where start defaults to 0, step to 1,
* and end to infinity.
*/
cljs.core.range = (function() {
var range = null;
var range__3395 = (function (){
return range.call(null,0,Number['MAX_VALUE'],1);
});
var range__3396 = (function (end){
return range.call(null,0,end,1);
});
var range__3397 = (function (start,end){
return range.call(null,start,end,1);
});
var range__3398 = (function (start,end,step){
return (new cljs.core.Range(null,start,end,step));
});
range = function(start,end,step){
switch(arguments.length){
case  0 :
return range__3395.call(this);
case  1 :
return range__3396.call(this,start);
case  2 :
return range__3397.call(this,start,end);
case  3 :
return range__3398.call(this,start,end,step);
}
throw('Invalid arity: ' + arguments.length);
};
return range;
})()
;
/**
* Returns a lazy seq of every nth item in coll.
*/
cljs.core.take_nth = (function take_nth(n,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____3400 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____3400))
{var s__3401 = temp__3698__auto____3400;

return cljs.core.cons.call(null,cljs.core.first.call(null,s__3401),take_nth.call(null,n,cljs.core.drop.call(null,n,s__3401)));
} else
{return null;
}
})));
});
/**
* Returns a vector of [(take-while pred coll) (drop-while pred coll)]
*/
cljs.core.split_with = (function split_with(pred,coll){
return cljs.core.Vector.fromArray([cljs.core.take_while.call(null,pred,coll),cljs.core.drop_while.call(null,pred,coll)]);
});
/**
* Applies f to each value in coll, splitting it each time f returns
* a new value.  Returns a lazy seq of partitions.
*/
cljs.core.partition_by = (function partition_by(f,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____3403 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____3403))
{var s__3404 = temp__3698__auto____3403;

var fst__3405 = cljs.core.first.call(null,s__3404);
var fv__3406 = f.call(null,fst__3405);
var run__3407 = cljs.core.cons.call(null,fst__3405,cljs.core.take_while.call(null,(function (p1__3402_SHARP_){
return cljs.core._EQ_.call(null,fv__3406,f.call(null,p1__3402_SHARP_));
}),cljs.core.next.call(null,s__3404)));

return cljs.core.cons.call(null,run__3407,partition_by.call(null,f,cljs.core.seq.call(null,cljs.core.drop.call(null,cljs.core.count.call(null,run__3407),s__3404))));
} else
{return null;
}
})));
});
/**
* Returns a map from distinct items in coll to the number of times
* they appear.
*/
cljs.core.frequencies = (function frequencies(coll){
return cljs.core.reduce.call(null,(function (counts,x){
return cljs.core.assoc.call(null,counts,x,cljs.core.inc.call(null,cljs.core.get.call(null,counts,x,0)));
}),cljs.core.ObjMap.fromObject([],{}),coll);
});
/**
* Returns a lazy seq of the intermediate values of the reduction (as
* per reduce) of coll by f, starting with init.
*/
cljs.core.reductions = (function() {
var reductions = null;
var reductions__3422 = (function (f,coll){
return (new cljs.core.LazySeq(null,false,(function (){
var temp__3695__auto____3418 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3695__auto____3418))
{var s__3419 = temp__3695__auto____3418;

return reductions.call(null,f,cljs.core.first.call(null,s__3419),cljs.core.rest.call(null,s__3419));
} else
{return cljs.core.list.call(null,f.call(null));
}
})));
});
var reductions__3423 = (function (f,init,coll){
return cljs.core.cons.call(null,init,(new cljs.core.LazySeq(null,false,(function (){
var temp__3698__auto____3420 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(temp__3698__auto____3420))
{var s__3421 = temp__3698__auto____3420;

return reductions.call(null,f,f.call(null,init,cljs.core.first.call(null,s__3421)),cljs.core.rest.call(null,s__3421));
} else
{return null;
}
}))));
});
reductions = function(f,init,coll){
switch(arguments.length){
case  2 :
return reductions__3422.call(this,f,init);
case  3 :
return reductions__3423.call(this,f,init,coll);
}
throw('Invalid arity: ' + arguments.length);
};
return reductions;
})()
;
/**
* Takes a set of functions and returns a fn that is the juxtaposition
* of those fns.  The returned fn takes a variable number of args, and
* returns a vector containing the result of applying each fn to the
* args (left-to-right).
* ((juxt a b c) x) => [(a x) (b x) (c x)]
* 
* TODO: Implement apply
* @param {...*} var_args
*/
cljs.core.juxt = (function() {
var juxt = null;
var juxt__3426 = (function (f){
return (function() {
var G__3431 = null;
var G__3431__3432 = (function (){
return cljs.core.vector.call(null,f.call(null));
});
var G__3431__3433 = (function (x){
return cljs.core.vector.call(null,f.call(null,x));
});
var G__3431__3434 = (function (x,y){
return cljs.core.vector.call(null,f.call(null,x,y));
});
var G__3431__3435 = (function (x,y,z){
return cljs.core.vector.call(null,f.call(null,x,y,z));
});
var G__3431__3436 = (function() { 
var G__3438__delegate = function (x,y,z,args){
return cljs.core.vector.call(null,cljs.core.apply.call(null,f,x,y,z,args));
};
var G__3438 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3438__delegate.call(this, x, y, z, args);
};
G__3438.cljs$lang$maxFixedArity = 3;
G__3438.cljs$lang$applyTo = (function (arglist__3439){
var x = cljs.core.first(arglist__3439);
var y = cljs.core.first(cljs.core.next(arglist__3439));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3439)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3439)));
return G__3438__delegate.call(this, x, y, z, args);
});
return G__3438;
})()
;
G__3431 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return G__3431__3432.call(this);
case  1 :
return G__3431__3433.call(this,x);
case  2 :
return G__3431__3434.call(this,x,y);
case  3 :
return G__3431__3435.call(this,x,y,z);
default:
return G__3431__3436.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
G__3431.cljs$lang$maxFixedArity = 3;
G__3431.cljs$lang$applyTo = G__3431__3436.cljs$lang$applyTo;
return G__3431;
})()
});
var juxt__3427 = (function (f,g){
return (function() {
var G__3440 = null;
var G__3440__3441 = (function (){
return cljs.core.vector.call(null,f.call(null),g.call(null));
});
var G__3440__3442 = (function (x){
return cljs.core.vector.call(null,f.call(null,x),g.call(null,x));
});
var G__3440__3443 = (function (x,y){
return cljs.core.vector.call(null,f.call(null,x,y),g.call(null,x,y));
});
var G__3440__3444 = (function (x,y,z){
return cljs.core.vector.call(null,f.call(null,x,y,z),g.call(null,x,y,z));
});
var G__3440__3445 = (function() { 
var G__3447__delegate = function (x,y,z,args){
return cljs.core.vector.call(null,cljs.core.apply.call(null,f,x,y,z,args),cljs.core.apply.call(null,g,x,y,z,args));
};
var G__3447 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3447__delegate.call(this, x, y, z, args);
};
G__3447.cljs$lang$maxFixedArity = 3;
G__3447.cljs$lang$applyTo = (function (arglist__3448){
var x = cljs.core.first(arglist__3448);
var y = cljs.core.first(cljs.core.next(arglist__3448));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3448)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3448)));
return G__3447__delegate.call(this, x, y, z, args);
});
return G__3447;
})()
;
G__3440 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return G__3440__3441.call(this);
case  1 :
return G__3440__3442.call(this,x);
case  2 :
return G__3440__3443.call(this,x,y);
case  3 :
return G__3440__3444.call(this,x,y,z);
default:
return G__3440__3445.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
G__3440.cljs$lang$maxFixedArity = 3;
G__3440.cljs$lang$applyTo = G__3440__3445.cljs$lang$applyTo;
return G__3440;
})()
});
var juxt__3428 = (function (f,g,h){
return (function() {
var G__3449 = null;
var G__3449__3450 = (function (){
return cljs.core.vector.call(null,f.call(null),g.call(null),h.call(null));
});
var G__3449__3451 = (function (x){
return cljs.core.vector.call(null,f.call(null,x),g.call(null,x),h.call(null,x));
});
var G__3449__3452 = (function (x,y){
return cljs.core.vector.call(null,f.call(null,x,y),g.call(null,x,y),h.call(null,x,y));
});
var G__3449__3453 = (function (x,y,z){
return cljs.core.vector.call(null,f.call(null,x,y,z),g.call(null,x,y,z),h.call(null,x,y,z));
});
var G__3449__3454 = (function() { 
var G__3456__delegate = function (x,y,z,args){
return cljs.core.vector.call(null,cljs.core.apply.call(null,f,x,y,z,args),cljs.core.apply.call(null,g,x,y,z,args),cljs.core.apply.call(null,h,x,y,z,args));
};
var G__3456 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3456__delegate.call(this, x, y, z, args);
};
G__3456.cljs$lang$maxFixedArity = 3;
G__3456.cljs$lang$applyTo = (function (arglist__3457){
var x = cljs.core.first(arglist__3457);
var y = cljs.core.first(cljs.core.next(arglist__3457));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3457)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3457)));
return G__3456__delegate.call(this, x, y, z, args);
});
return G__3456;
})()
;
G__3449 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return G__3449__3450.call(this);
case  1 :
return G__3449__3451.call(this,x);
case  2 :
return G__3449__3452.call(this,x,y);
case  3 :
return G__3449__3453.call(this,x,y,z);
default:
return G__3449__3454.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
G__3449.cljs$lang$maxFixedArity = 3;
G__3449.cljs$lang$applyTo = G__3449__3454.cljs$lang$applyTo;
return G__3449;
})()
});
var juxt__3429 = (function() { 
var G__3458__delegate = function (f,g,h,fs){
var fs__3425 = cljs.core.list_STAR_.call(null,f,g,h,fs);

return (function() {
var G__3459 = null;
var G__3459__3460 = (function (){
return cljs.core.reduce.call(null,(function (p1__3408_SHARP_,p2__3409_SHARP_){
return cljs.core.conj.call(null,p1__3408_SHARP_,p2__3409_SHARP_.call(null));
}),cljs.core.Vector.fromArray([]),fs__3425);
});
var G__3459__3461 = (function (x){
return cljs.core.reduce.call(null,(function (p1__3410_SHARP_,p2__3411_SHARP_){
return cljs.core.conj.call(null,p1__3410_SHARP_,p2__3411_SHARP_.call(null,x));
}),cljs.core.Vector.fromArray([]),fs__3425);
});
var G__3459__3462 = (function (x,y){
return cljs.core.reduce.call(null,(function (p1__3412_SHARP_,p2__3413_SHARP_){
return cljs.core.conj.call(null,p1__3412_SHARP_,p2__3413_SHARP_.call(null,x,y));
}),cljs.core.Vector.fromArray([]),fs__3425);
});
var G__3459__3463 = (function (x,y,z){
return cljs.core.reduce.call(null,(function (p1__3414_SHARP_,p2__3415_SHARP_){
return cljs.core.conj.call(null,p1__3414_SHARP_,p2__3415_SHARP_.call(null,x,y,z));
}),cljs.core.Vector.fromArray([]),fs__3425);
});
var G__3459__3464 = (function() { 
var G__3466__delegate = function (x,y,z,args){
return cljs.core.reduce.call(null,(function (p1__3416_SHARP_,p2__3417_SHARP_){
return cljs.core.conj.call(null,p1__3416_SHARP_,cljs.core.apply.call(null,p2__3417_SHARP_,x,y,z,args));
}),cljs.core.Vector.fromArray([]),fs__3425);
};
var G__3466 = function (x,y,z,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3466__delegate.call(this, x, y, z, args);
};
G__3466.cljs$lang$maxFixedArity = 3;
G__3466.cljs$lang$applyTo = (function (arglist__3467){
var x = cljs.core.first(arglist__3467);
var y = cljs.core.first(cljs.core.next(arglist__3467));
var z = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3467)));
var args = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3467)));
return G__3466__delegate.call(this, x, y, z, args);
});
return G__3466;
})()
;
G__3459 = function(x,y,z,var_args){
var args = var_args;
switch(arguments.length){
case  0 :
return G__3459__3460.call(this);
case  1 :
return G__3459__3461.call(this,x);
case  2 :
return G__3459__3462.call(this,x,y);
case  3 :
return G__3459__3463.call(this,x,y,z);
default:
return G__3459__3464.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
G__3459.cljs$lang$maxFixedArity = 3;
G__3459.cljs$lang$applyTo = G__3459__3464.cljs$lang$applyTo;
return G__3459;
})()
};
var G__3458 = function (f,g,h,var_args){
var fs = null;
if (goog.isDef(var_args)) {
  fs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 3),0);
} 
return G__3458__delegate.call(this, f, g, h, fs);
};
G__3458.cljs$lang$maxFixedArity = 3;
G__3458.cljs$lang$applyTo = (function (arglist__3468){
var f = cljs.core.first(arglist__3468);
var g = cljs.core.first(cljs.core.next(arglist__3468));
var h = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3468)));
var fs = cljs.core.rest(cljs.core.next(cljs.core.next(arglist__3468)));
return G__3458__delegate.call(this, f, g, h, fs);
});
return G__3458;
})()
;
juxt = function(f,g,h,var_args){
var fs = var_args;
switch(arguments.length){
case  1 :
return juxt__3426.call(this,f);
case  2 :
return juxt__3427.call(this,f,g);
case  3 :
return juxt__3428.call(this,f,g,h);
default:
return juxt__3429.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
juxt.cljs$lang$maxFixedArity = 3;
juxt.cljs$lang$applyTo = juxt__3429.cljs$lang$applyTo;
return juxt;
})()
;
/**
* When lazy sequences are produced via functions that have side
* effects, any effects other than those needed to produce the first
* element in the seq do not occur until the seq is consumed. dorun can
* be used to force any effects. Walks through the successive nexts of
* the seq, does not retain the head and returns nil.
*/
cljs.core.dorun = (function() {
var dorun = null;
var dorun__3470 = (function (coll){
while(true){
if(cljs.core.truth_(cljs.core.seq.call(null,coll)))
{{
var G__3473 = cljs.core.next.call(null,coll);
coll = G__3473;
continue;
}
} else
{return null;
}
break;
}
});
var dorun__3471 = (function (n,coll){
while(true){
if(cljs.core.truth_((function (){var and__3546__auto____3469 = cljs.core.seq.call(null,coll);

if(cljs.core.truth_(and__3546__auto____3469))
{return cljs.core.pos_QMARK_.call(null,n);
} else
{return and__3546__auto____3469;
}
})()))
{{
var G__3474 = cljs.core.dec.call(null,n);
var G__3475 = cljs.core.next.call(null,coll);
n = G__3474;
coll = G__3475;
continue;
}
} else
{return null;
}
break;
}
});
dorun = function(n,coll){
switch(arguments.length){
case  1 :
return dorun__3470.call(this,n);
case  2 :
return dorun__3471.call(this,n,coll);
}
throw('Invalid arity: ' + arguments.length);
};
return dorun;
})()
;
/**
* When lazy sequences are produced via functions that have side
* effects, any effects other than those needed to produce the first
* element in the seq do not occur until the seq is consumed. doall can
* be used to force any effects. Walks through the successive nexts of
* the seq, retains the head and returns it, thus causing the entire
* seq to reside in memory at one time.
*/
cljs.core.doall = (function() {
var doall = null;
var doall__3476 = (function (coll){
cljs.core.dorun.call(null,coll);
return coll;
});
var doall__3477 = (function (n,coll){
cljs.core.dorun.call(null,n,coll);
return coll;
});
doall = function(n,coll){
switch(arguments.length){
case  1 :
return doall__3476.call(this,n);
case  2 :
return doall__3477.call(this,n,coll);
}
throw('Invalid arity: ' + arguments.length);
};
return doall;
})()
;
/**
* Returns the result of (re-find re s) if re fully matches s.
*/
cljs.core.re_matches = (function re_matches(re,s){
var matches__3479 = re.exec(s);

if(cljs.core.truth_(cljs.core._EQ_.call(null,cljs.core.first.call(null,matches__3479),s)))
{if(cljs.core.truth_(cljs.core._EQ_.call(null,cljs.core.count.call(null,matches__3479),1)))
{return cljs.core.first.call(null,matches__3479);
} else
{return cljs.core.vec.call(null,matches__3479);
}
} else
{return null;
}
});
/**
* Returns the first regex match, if any, of s to re, using
* re.exec(s). Returns a vector, containing first the matching
* substring, then any capturing groups if the regular expression contains
* capturing groups.
*/
cljs.core.re_find = (function re_find(re,s){
var matches__3480 = re.exec(s);

if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,matches__3480)))
{return null;
} else
{if(cljs.core.truth_(cljs.core._EQ_.call(null,cljs.core.count.call(null,matches__3480),1)))
{return cljs.core.first.call(null,matches__3480);
} else
{return cljs.core.vec.call(null,matches__3480);
}
}
});
/**
* Returns a lazy sequence of successive matches of re in s.
*/
cljs.core.re_seq = (function re_seq(re,s){
var match_data__3481 = cljs.core.re_find.call(null,re,s);
var match_idx__3482 = s.search(re);
var match_str__3483 = (cljs.core.truth_(cljs.core.coll_QMARK_.call(null,match_data__3481))?cljs.core.first.call(null,match_data__3481):match_data__3481);
var post_match__3484 = cljs.core.subs.call(null,s,cljs.core._PLUS_.call(null,match_idx__3482,cljs.core.count.call(null,match_str__3483)));

if(cljs.core.truth_(match_data__3481))
{return (new cljs.core.LazySeq(null,false,(function (){
return cljs.core.cons.call(null,match_data__3481,re_seq.call(null,re,post_match__3484));
})));
} else
{return null;
}
});
/**
* Returns an instance of RegExp which has compiled the provided string.
*/
cljs.core.re_pattern = (function re_pattern(s){
return (new RegExp(s));
});
cljs.core.pr_sequential = (function pr_sequential(print_one,begin,sep,end,opts,coll){
return cljs.core.concat.call(null,cljs.core.Vector.fromArray([begin]),cljs.core.flatten1.call(null,cljs.core.interpose.call(null,cljs.core.Vector.fromArray([sep]),cljs.core.map.call(null,(function (p1__3485_SHARP_){
return print_one.call(null,p1__3485_SHARP_,opts);
}),coll))),cljs.core.Vector.fromArray([end]));
});
cljs.core.string_print = (function string_print(x){
cljs.core._STAR_print_fn_STAR_.call(null,x);
return null;
});
cljs.core.flush = (function flush(){
return null;
});
cljs.core.pr_seq = (function pr_seq(obj,opts){
if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,obj)))
{return cljs.core.list.call(null,"nil");
} else
{if(cljs.core.truth_(cljs.core.undefined_QMARK_.call(null,obj)))
{return cljs.core.list.call(null,"#<undefined>");
} else
{if(cljs.core.truth_("﷐'else"))
{return cljs.core.concat.call(null,(cljs.core.truth_((function (){var and__3546__auto____3486 = cljs.core.get.call(null,opts,"﷐'meta");

if(cljs.core.truth_(and__3546__auto____3486))
{var and__3546__auto____3490 = (function (){var x__169__auto____3487 = obj;

if(cljs.core.truth_((function (){var and__3546__auto____3488 = x__169__auto____3487;

if(cljs.core.truth_(and__3546__auto____3488))
{var and__3546__auto____3489 = x__169__auto____3487.cljs$core$IMeta$;

if(cljs.core.truth_(and__3546__auto____3489))
{return cljs.core.not.call(null,x__169__auto____3487.hasOwnProperty("cljs$core$IMeta$"));
} else
{return and__3546__auto____3489;
}
} else
{return and__3546__auto____3488;
}
})()))
{return true;
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IMeta,x__169__auto____3487);
}
})();

if(cljs.core.truth_(and__3546__auto____3490))
{return cljs.core.meta.call(null,obj);
} else
{return and__3546__auto____3490;
}
} else
{return and__3546__auto____3486;
}
})())?cljs.core.concat.call(null,cljs.core.Vector.fromArray(["^"]),pr_seq.call(null,cljs.core.meta.call(null,obj),opts),cljs.core.Vector.fromArray([" "])):null),(cljs.core.truth_((function (){var x__169__auto____3491 = obj;

if(cljs.core.truth_((function (){var and__3546__auto____3492 = x__169__auto____3491;

if(cljs.core.truth_(and__3546__auto____3492))
{var and__3546__auto____3493 = x__169__auto____3491.cljs$core$IPrintable$;

if(cljs.core.truth_(and__3546__auto____3493))
{return cljs.core.not.call(null,x__169__auto____3491.hasOwnProperty("cljs$core$IPrintable$"));
} else
{return and__3546__auto____3493;
}
} else
{return and__3546__auto____3492;
}
})()))
{return true;
} else
{return cljs.core.type_satisfies_.call(null,cljs.core.IPrintable,x__169__auto____3491);
}
})())?cljs.core._pr_seq.call(null,obj,opts):cljs.core.list.call(null,"#<",cljs.core.str.call(null,obj),">")));
} else
{return null;
}
}
}
});
/**
* Prints a sequence of objects to a string, observing all the
* options given in opts
*/
cljs.core.pr_str_with_opts = (function pr_str_with_opts(objs,opts){
var first_obj__3494 = cljs.core.first.call(null,objs);
var sb__3495 = (new goog.string.StringBuffer());

var G__3496__3497 = cljs.core.seq.call(null,objs);

if(cljs.core.truth_(G__3496__3497))
{var obj__3498 = cljs.core.first.call(null,G__3496__3497);
var G__3496__3499 = G__3496__3497;

while(true){
if(cljs.core.truth_(cljs.core.identical_QMARK_.call(null,obj__3498,first_obj__3494)))
{} else
{sb__3495.append(" ");
}
var G__3500__3501 = cljs.core.seq.call(null,cljs.core.pr_seq.call(null,obj__3498,opts));

if(cljs.core.truth_(G__3500__3501))
{var string__3502 = cljs.core.first.call(null,G__3500__3501);
var G__3500__3503 = G__3500__3501;

while(true){
sb__3495.append(string__3502);
var temp__3698__auto____3504 = cljs.core.next.call(null,G__3500__3503);

if(cljs.core.truth_(temp__3698__auto____3504))
{var G__3500__3505 = temp__3698__auto____3504;

{
var G__3508 = cljs.core.first.call(null,G__3500__3505);
var G__3509 = G__3500__3505;
string__3502 = G__3508;
G__3500__3503 = G__3509;
continue;
}
} else
{}
break;
}
} else
{}
var temp__3698__auto____3506 = cljs.core.next.call(null,G__3496__3499);

if(cljs.core.truth_(temp__3698__auto____3506))
{var G__3496__3507 = temp__3698__auto____3506;

{
var G__3510 = cljs.core.first.call(null,G__3496__3507);
var G__3511 = G__3496__3507;
obj__3498 = G__3510;
G__3496__3499 = G__3511;
continue;
}
} else
{}
break;
}
} else
{}
return cljs.core.str.call(null,sb__3495);
});
/**
* Prints a sequence of objects using string-print, observing all
* the options given in opts
*/
cljs.core.pr_with_opts = (function pr_with_opts(objs,opts){
var first_obj__3512 = cljs.core.first.call(null,objs);

var G__3513__3514 = cljs.core.seq.call(null,objs);

if(cljs.core.truth_(G__3513__3514))
{var obj__3515 = cljs.core.first.call(null,G__3513__3514);
var G__3513__3516 = G__3513__3514;

while(true){
if(cljs.core.truth_(cljs.core.identical_QMARK_.call(null,obj__3515,first_obj__3512)))
{} else
{cljs.core.string_print.call(null," ");
}
var G__3517__3518 = cljs.core.seq.call(null,cljs.core.pr_seq.call(null,obj__3515,opts));

if(cljs.core.truth_(G__3517__3518))
{var string__3519 = cljs.core.first.call(null,G__3517__3518);
var G__3517__3520 = G__3517__3518;

while(true){
cljs.core.string_print.call(null,string__3519);
var temp__3698__auto____3521 = cljs.core.next.call(null,G__3517__3520);

if(cljs.core.truth_(temp__3698__auto____3521))
{var G__3517__3522 = temp__3698__auto____3521;

{
var G__3525 = cljs.core.first.call(null,G__3517__3522);
var G__3526 = G__3517__3522;
string__3519 = G__3525;
G__3517__3520 = G__3526;
continue;
}
} else
{}
break;
}
} else
{}
var temp__3698__auto____3523 = cljs.core.next.call(null,G__3513__3516);

if(cljs.core.truth_(temp__3698__auto____3523))
{var G__3513__3524 = temp__3698__auto____3523;

{
var G__3527 = cljs.core.first.call(null,G__3513__3524);
var G__3528 = G__3513__3524;
obj__3515 = G__3527;
G__3513__3516 = G__3528;
continue;
}
} else
{return null;
}
break;
}
} else
{return null;
}
});
cljs.core.newline = (function newline(opts){
cljs.core.string_print.call(null,"\n");
if(cljs.core.truth_(cljs.core.get.call(null,opts,"﷐'flush-on-newline")))
{return cljs.core.flush.call(null);
} else
{return null;
}
});
cljs.core._STAR_flush_on_newline_STAR_ = true;
cljs.core._STAR_print_readably_STAR_ = true;
cljs.core._STAR_print_meta_STAR_ = false;
cljs.core._STAR_print_dup_STAR_ = false;
cljs.core.pr_opts = (function pr_opts(){
return cljs.core.ObjMap.fromObject(["﷐'flush-on-newline","﷐'readably","﷐'meta","﷐'dup"],{"﷐'flush-on-newline":cljs.core._STAR_flush_on_newline_STAR_,"﷐'readably":cljs.core._STAR_print_readably_STAR_,"﷐'meta":cljs.core._STAR_print_meta_STAR_,"﷐'dup":cljs.core._STAR_print_dup_STAR_});
});
/**
* pr to a string, returning it. Fundamental entrypoint to IPrintable.
* @param {...*} var_args
*/
cljs.core.pr_str = (function() { 
var pr_str__delegate = function (objs){
return cljs.core.pr_str_with_opts.call(null,objs,cljs.core.pr_opts.call(null));
};
var pr_str = function (var_args){
var objs = null;
if (goog.isDef(var_args)) {
  objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return pr_str__delegate.call(this, objs);
};
pr_str.cljs$lang$maxFixedArity = 0;
pr_str.cljs$lang$applyTo = (function (arglist__3529){
var objs = cljs.core.seq( arglist__3529 );;
return pr_str__delegate.call(this, objs);
});
return pr_str;
})()
;
/**
* Prints the object(s) using string-print.  Prints the
* object(s), separated by spaces if there is more than one.
* By default, pr and prn print in a way that objects can be
* read by the reader
* @param {...*} var_args
*/
cljs.core.pr = (function() { 
var pr__delegate = function (objs){
return cljs.core.pr_with_opts.call(null,objs,cljs.core.pr_opts.call(null));
};
var pr = function (var_args){
var objs = null;
if (goog.isDef(var_args)) {
  objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return pr__delegate.call(this, objs);
};
pr.cljs$lang$maxFixedArity = 0;
pr.cljs$lang$applyTo = (function (arglist__3530){
var objs = cljs.core.seq( arglist__3530 );;
return pr__delegate.call(this, objs);
});
return pr;
})()
;
/**
* Prints the object(s) using string-print.
* print and println produce output for human consumption.
* @param {...*} var_args
*/
cljs.core.print = (function() { 
var cljs_core_print__delegate = function (objs){
return cljs.core.pr_with_opts.call(null,objs,cljs.core.assoc.call(null,cljs.core.pr_opts.call(null),"﷐'readably",false));
};
var cljs_core_print = function (var_args){
var objs = null;
if (goog.isDef(var_args)) {
  objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return cljs_core_print__delegate.call(this, objs);
};
cljs_core_print.cljs$lang$maxFixedArity = 0;
cljs_core_print.cljs$lang$applyTo = (function (arglist__3531){
var objs = cljs.core.seq( arglist__3531 );;
return cljs_core_print__delegate.call(this, objs);
});
return cljs_core_print;
})()
;
/**
* Same as print followed by (newline)
* @param {...*} var_args
*/
cljs.core.println = (function() { 
var println__delegate = function (objs){
cljs.core.pr_with_opts.call(null,objs,cljs.core.assoc.call(null,cljs.core.pr_opts.call(null),"﷐'readably",false));
return cljs.core.newline.call(null,cljs.core.pr_opts.call(null));
};
var println = function (var_args){
var objs = null;
if (goog.isDef(var_args)) {
  objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return println__delegate.call(this, objs);
};
println.cljs$lang$maxFixedArity = 0;
println.cljs$lang$applyTo = (function (arglist__3532){
var objs = cljs.core.seq( arglist__3532 );;
return println__delegate.call(this, objs);
});
return println;
})()
;
/**
* Same as pr followed by (newline).
* @param {...*} var_args
*/
cljs.core.prn = (function() { 
var prn__delegate = function (objs){
cljs.core.pr_with_opts.call(null,objs,cljs.core.pr_opts.call(null));
return cljs.core.newline.call(null,cljs.core.pr_opts.call(null));
};
var prn = function (var_args){
var objs = null;
if (goog.isDef(var_args)) {
  objs = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return prn__delegate.call(this, objs);
};
prn.cljs$lang$maxFixedArity = 0;
prn.cljs$lang$applyTo = (function (arglist__3533){
var objs = cljs.core.seq( arglist__3533 );;
return prn__delegate.call(this, objs);
});
return prn;
})()
;
cljs.core.HashMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.HashMap.prototype.cljs$core$IPrintable$_pr_seq = (function (coll,opts){
var pr_pair__3534 = (function (keyval){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,""," ","",opts,keyval);
});

return cljs.core.pr_sequential.call(null,pr_pair__3534,"{",", ","}",opts,coll);
});
cljs.core.aset.call(null,cljs.core.IPrintable,"number",true);
cljs.core.aset.call(null,cljs.core._pr_seq,"number",(function (n,opts){
return cljs.core.list.call(null,cljs.core.str.call(null,n));
}));
cljs.core.IndexedSeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.IndexedSeq.prototype.cljs$core$IPrintable$_pr_seq = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
cljs.core.LazySeq.prototype.cljs$core$IPrintable$ = true;
cljs.core.LazySeq.prototype.cljs$core$IPrintable$_pr_seq = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
cljs.core.aset.call(null,cljs.core.IPrintable,"boolean",true);
cljs.core.aset.call(null,cljs.core._pr_seq,"boolean",(function (bool,opts){
return cljs.core.list.call(null,cljs.core.str.call(null,bool));
}));
cljs.core.Set.prototype.cljs$core$IPrintable$ = true;
cljs.core.Set.prototype.cljs$core$IPrintable$_pr_seq = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"#{"," ","}",opts,coll);
});
cljs.core.aset.call(null,cljs.core.IPrintable,"string",true);
cljs.core.aset.call(null,cljs.core._pr_seq,"string",(function (obj,opts){
if(cljs.core.truth_(cljs.core.keyword_QMARK_.call(null,obj)))
{return cljs.core.list.call(null,cljs.core.str.call(null,":",(function (){var temp__3698__auto____3535 = cljs.core.namespace.call(null,obj);

if(cljs.core.truth_(temp__3698__auto____3535))
{var nspc__3536 = temp__3698__auto____3535;

return cljs.core.str.call(null,nspc__3536,"/");
} else
{return null;
}
})(),cljs.core.name.call(null,obj)));
} else
{if(cljs.core.truth_(cljs.core.symbol_QMARK_.call(null,obj)))
{return cljs.core.list.call(null,cljs.core.str.call(null,(function (){var temp__3698__auto____3537 = cljs.core.namespace.call(null,obj);

if(cljs.core.truth_(temp__3698__auto____3537))
{var nspc__3538 = temp__3698__auto____3537;

return cljs.core.str.call(null,nspc__3538,"/");
} else
{return null;
}
})(),cljs.core.name.call(null,obj)));
} else
{if(cljs.core.truth_("﷐'else"))
{return cljs.core.list.call(null,(cljs.core.truth_("﷐'readably".call(null,opts))?goog.string.quote.call(null,obj):obj));
} else
{return null;
}
}
}
}));
cljs.core.Vector.prototype.cljs$core$IPrintable$ = true;
cljs.core.Vector.prototype.cljs$core$IPrintable$_pr_seq = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"["," ","]",opts,coll);
});
cljs.core.List.prototype.cljs$core$IPrintable$ = true;
cljs.core.List.prototype.cljs$core$IPrintable$_pr_seq = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
cljs.core.aset.call(null,cljs.core.IPrintable,"array",true);
cljs.core.aset.call(null,cljs.core._pr_seq,"array",(function (a,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"#<Array [",", ","]>",opts,a);
}));
cljs.core.EmptyList.prototype.cljs$core$IPrintable$ = true;
cljs.core.EmptyList.prototype.cljs$core$IPrintable$_pr_seq = (function (coll,opts){
return cljs.core.list.call(null,"()");
});
cljs.core.Cons.prototype.cljs$core$IPrintable$ = true;
cljs.core.Cons.prototype.cljs$core$IPrintable$_pr_seq = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
cljs.core.Range.prototype.cljs$core$IPrintable$ = true;
cljs.core.Range.prototype.cljs$core$IPrintable$_pr_seq = (function (coll,opts){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,"("," ",")",opts,coll);
});
cljs.core.ObjMap.prototype.cljs$core$IPrintable$ = true;
cljs.core.ObjMap.prototype.cljs$core$IPrintable$_pr_seq = (function (coll,opts){
var pr_pair__3539 = (function (keyval){
return cljs.core.pr_sequential.call(null,cljs.core.pr_seq,""," ","",opts,keyval);
});

return cljs.core.pr_sequential.call(null,pr_pair__3539,"{",", ","}",opts,coll);
});

/**
* @constructor
*/
cljs.core.Atom = (function (state,meta,validator,watches){
this.state = state;
this.meta = meta;
this.validator = validator;
this.watches = watches;
})
cljs.core.Atom.prototype.cljs$core$IWatchable$ = true;
cljs.core.Atom.prototype.cljs$core$IWatchable$_notify_watches = (function (this$,oldval,newval){
var this__3540 = this;
var G__3541__3542 = cljs.core.seq.call(null,this__3540.watches);

if(cljs.core.truth_(G__3541__3542))
{var G__3544__3546 = cljs.core.first.call(null,G__3541__3542);
var vec__3545__3547 = G__3544__3546;
var key__3548 = cljs.core.nth.call(null,vec__3545__3547,0,null);
var f__3549 = cljs.core.nth.call(null,vec__3545__3547,1,null);
var G__3541__3550 = G__3541__3542;

var G__3544__3551 = G__3544__3546;
var G__3541__3552 = G__3541__3550;

while(true){
var vec__3553__3554 = G__3544__3551;
var key__3555 = cljs.core.nth.call(null,vec__3553__3554,0,null);
var f__3556 = cljs.core.nth.call(null,vec__3553__3554,1,null);
var G__3541__3557 = G__3541__3552;

f__3556.call(null,key__3555,this$,oldval,newval);
var temp__3698__auto____3558 = cljs.core.next.call(null,G__3541__3557);

if(cljs.core.truth_(temp__3698__auto____3558))
{var G__3541__3559 = temp__3698__auto____3558;

{
var G__3566 = cljs.core.first.call(null,G__3541__3559);
var G__3567 = G__3541__3559;
G__3544__3551 = G__3566;
G__3541__3552 = G__3567;
continue;
}
} else
{return null;
}
break;
}
} else
{return null;
}
});
cljs.core.Atom.prototype.cljs$core$IWatchable$_add_watch = (function (this$,key,f){
var this__3560 = this;
return this$.watches = cljs.core.assoc.call(null,this__3560.watches,key,f);
});
cljs.core.Atom.prototype.cljs$core$IWatchable$_remove_watch = (function (this$,key){
var this__3561 = this;
return this$.watches = cljs.core.dissoc.call(null,this__3561.watches,key);
});
cljs.core.Atom.prototype.cljs$core$IPrintable$ = true;
cljs.core.Atom.prototype.cljs$core$IPrintable$_pr_seq = (function (a,opts){
var this__3562 = this;
return cljs.core.concat.call(null,cljs.core.Vector.fromArray(["#<Atom: "]),cljs.core._pr_seq.call(null,this__3562.state,opts),">");
});
cljs.core.Atom.prototype.cljs$core$IMeta$ = true;
cljs.core.Atom.prototype.cljs$core$IMeta$_meta = (function (_){
var this__3563 = this;
return this__3563.meta;
});
cljs.core.Atom.prototype.cljs$core$IDeref$ = true;
cljs.core.Atom.prototype.cljs$core$IDeref$_deref = (function (_){
var this__3564 = this;
return this__3564.state;
});
cljs.core.Atom.prototype.cljs$core$IEquiv$ = true;
cljs.core.Atom.prototype.cljs$core$IEquiv$_equiv = (function (o,other){
var this__3565 = this;
return cljs.core.identical_QMARK_.call(null,o,other);
});
/**
* Creates and returns an Atom with an initial value of x and zero or
* more options (in any order):
* 
* :meta metadata-map
* 
* :validator validate-fn
* 
* If metadata-map is supplied, it will be come the metadata on the
* atom. validate-fn must be nil or a side-effect-free fn of one
* argument, which will be passed the intended new state on any state
* change. If the new state is unacceptable, the validate-fn should
* return false or throw an Error.  If either of these error conditions
* occur, then the value of the atom will not change.
* @param {...*} var_args
*/
cljs.core.atom = (function() {
var atom = null;
var atom__3574 = (function (x){
return (new cljs.core.Atom(x,null,null,null));
});
var atom__3575 = (function() { 
var G__3577__delegate = function (x,p__3568){
var map__3569__3570 = p__3568;
var map__3569__3571 = (cljs.core.truth_(cljs.core.seq_QMARK_.call(null,map__3569__3570))?cljs.core.apply.call(null,cljs.core.hash_map,map__3569__3570):map__3569__3570);
var validator__3572 = cljs.core.get.call(null,map__3569__3571,"﷐'validator");
var meta__3573 = cljs.core.get.call(null,map__3569__3571,"﷐'meta");

return (new cljs.core.Atom(x,meta__3573,validator__3572,null));
};
var G__3577 = function (x,var_args){
var p__3568 = null;
if (goog.isDef(var_args)) {
  p__3568 = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return G__3577__delegate.call(this, x, p__3568);
};
G__3577.cljs$lang$maxFixedArity = 1;
G__3577.cljs$lang$applyTo = (function (arglist__3578){
var x = cljs.core.first(arglist__3578);
var p__3568 = cljs.core.rest(arglist__3578);
return G__3577__delegate.call(this, x, p__3568);
});
return G__3577;
})()
;
atom = function(x,var_args){
var p__3568 = var_args;
switch(arguments.length){
case  1 :
return atom__3574.call(this,x);
default:
return atom__3575.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
atom.cljs$lang$maxFixedArity = 1;
atom.cljs$lang$applyTo = atom__3575.cljs$lang$applyTo;
return atom;
})()
;
/**
* Sets the value of atom to newval without regard for the
* current value. Returns newval.
*/
cljs.core.reset_BANG_ = (function reset_BANG_(a,new_value){
var temp__3698__auto____3579 = a.validator;

if(cljs.core.truth_(temp__3698__auto____3579))
{var validate__3580 = temp__3698__auto____3579;

if(cljs.core.truth_(validate__3580.call(null,new_value)))
{} else
{throw (new Error(cljs.core.str.call(null,"Assert failed: ","Validator rejected reference state","\n",cljs.core.pr_str.call(null,cljs.core.list("﷑'validate","﷑'new-value")))));
}
} else
{}
var old_value__3581 = a.state;

a.state = new_value;
cljs.core._notify_watches.call(null,a,old_value__3581,new_value);
return new_value;
});
/**
* Atomically swaps the value of atom to be:
* (apply f current-value-of-atom args). Note that f may be called
* multiple times, and thus should be free of side effects.  Returns
* the value that was swapped in.
* @param {...*} var_args
*/
cljs.core.swap_BANG_ = (function() {
var swap_BANG_ = null;
var swap_BANG___3582 = (function (a,f){
return cljs.core.reset_BANG_.call(null,a,f.call(null,a.state));
});
var swap_BANG___3583 = (function (a,f,x){
return cljs.core.reset_BANG_.call(null,a,f.call(null,a.state,x));
});
var swap_BANG___3584 = (function (a,f,x,y){
return cljs.core.reset_BANG_.call(null,a,f.call(null,a.state,x,y));
});
var swap_BANG___3585 = (function (a,f,x,y,z){
return cljs.core.reset_BANG_.call(null,a,f.call(null,a.state,x,y,z));
});
var swap_BANG___3586 = (function() { 
var G__3588__delegate = function (a,f,x,y,z,more){
return cljs.core.reset_BANG_.call(null,a,cljs.core.apply.call(null,f,a.state,x,y,z,more));
};
var G__3588 = function (a,f,x,y,z,var_args){
var more = null;
if (goog.isDef(var_args)) {
  more = cljs.core.array_seq(Array.prototype.slice.call(arguments, 5),0);
} 
return G__3588__delegate.call(this, a, f, x, y, z, more);
};
G__3588.cljs$lang$maxFixedArity = 5;
G__3588.cljs$lang$applyTo = (function (arglist__3589){
var a = cljs.core.first(arglist__3589);
var f = cljs.core.first(cljs.core.next(arglist__3589));
var x = cljs.core.first(cljs.core.next(cljs.core.next(arglist__3589)));
var y = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3589))));
var z = cljs.core.first(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3589)))));
var more = cljs.core.rest(cljs.core.next(cljs.core.next(cljs.core.next(cljs.core.next(arglist__3589)))));
return G__3588__delegate.call(this, a, f, x, y, z, more);
});
return G__3588;
})()
;
swap_BANG_ = function(a,f,x,y,z,var_args){
var more = var_args;
switch(arguments.length){
case  2 :
return swap_BANG___3582.call(this,a,f);
case  3 :
return swap_BANG___3583.call(this,a,f,x);
case  4 :
return swap_BANG___3584.call(this,a,f,x,y);
case  5 :
return swap_BANG___3585.call(this,a,f,x,y,z);
default:
return swap_BANG___3586.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
swap_BANG_.cljs$lang$maxFixedArity = 5;
swap_BANG_.cljs$lang$applyTo = swap_BANG___3586.cljs$lang$applyTo;
return swap_BANG_;
})()
;
/**
* Atomically sets the value of atom to newval if and only if the
* current value of the atom is identical to oldval. Returns true if
* set happened, else false.
*/
cljs.core.compare_and_set_BANG_ = (function compare_and_set_BANG_(a,oldval,newval){
if(cljs.core.truth_(cljs.core._EQ_.call(null,a.state,oldval)))
{cljs.core.reset_BANG_.call(null,a,newval);
return true;
} else
{return false;
}
});
cljs.core.deref = (function deref(o){
return cljs.core._deref.call(null,o);
});
/**
* Sets the validator-fn for an atom. validator-fn must be nil or a
* side-effect-free fn of one argument, which will be passed the intended
* new state on any state change. If the new state is unacceptable, the
* validator-fn should return false or throw an Error. If the current state
* is not acceptable to the new validator, an Error will be thrown and the
* validator will not be changed.
*/
cljs.core.set_validator_BANG_ = (function set_validator_BANG_(iref,val){
return iref.validator = val;
});
/**
* Gets the validator-fn for a var/ref/agent/atom.
*/
cljs.core.get_validator = (function get_validator(iref){
return iref.validator;
});
/**
* Atomically sets the metadata for a namespace/var/ref/agent/atom to be:
* 
* (apply f its-current-meta args)
* 
* f must be free of side-effects
* @param {...*} var_args
*/
cljs.core.alter_meta_BANG_ = (function() { 
var alter_meta_BANG___delegate = function (iref,f,args){
return iref.meta = cljs.core.apply.call(null,f,iref.meta,args);
};
var alter_meta_BANG_ = function (iref,f,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 2),0);
} 
return alter_meta_BANG___delegate.call(this, iref, f, args);
};
alter_meta_BANG_.cljs$lang$maxFixedArity = 2;
alter_meta_BANG_.cljs$lang$applyTo = (function (arglist__3590){
var iref = cljs.core.first(arglist__3590);
var f = cljs.core.first(cljs.core.next(arglist__3590));
var args = cljs.core.rest(cljs.core.next(arglist__3590));
return alter_meta_BANG___delegate.call(this, iref, f, args);
});
return alter_meta_BANG_;
})()
;
/**
* Atomically resets the metadata for an atom
*/
cljs.core.reset_meta_BANG_ = (function reset_meta_BANG_(iref,m){
return iref.meta = m;
});
/**
* Alpha - subject to change.
* 
* Adds a watch function to an atom reference. The watch fn must be a
* fn of 4 args: a key, the reference, its old-state, its
* new-state. Whenever the reference's state might have been changed,
* any registered watches will have their functions called. The watch
* fn will be called synchronously. Note that an atom's state
* may have changed again prior to the fn call, so use old/new-state
* rather than derefing the reference. Keys must be unique per
* reference, and can be used to remove the watch with remove-watch,
* but are otherwise considered opaque by the watch mechanism.  Bear in
* mind that regardless of the result or action of the watch fns the
* atom's value will change.  Example:
* 
* (def a (atom 0))
* (add-watch a :inc (fn [k r o n] (assert (== 0 n))))
* (swap! a inc)
* ;; Assertion Error
* (deref a)
* ;=> 1
*/
cljs.core.add_watch = (function add_watch(iref,key,f){
return cljs.core._add_watch.call(null,iref,key,f);
});
/**
* Alpha - subject to change.
* 
* Removes a watch (set by add-watch) from a reference
*/
cljs.core.remove_watch = (function remove_watch(iref,key){
return cljs.core._remove_watch.call(null,iref,key);
});
cljs.core.gensym_counter = null;
/**
* Returns a new symbol with a unique name. If a prefix string is
* supplied, the name is prefix# where # is some unique number. If
* prefix is not supplied, the prefix is 'G__'.
*/
cljs.core.gensym = (function() {
var gensym = null;
var gensym__3591 = (function (){
return gensym.call(null,"G__");
});
var gensym__3592 = (function (prefix_string){
if(cljs.core.truth_(cljs.core.nil_QMARK_.call(null,cljs.core.gensym_counter)))
{cljs.core.gensym_counter = cljs.core.atom.call(null,0);
} else
{}
return cljs.core.symbol.call(null,cljs.core.str.call(null,prefix_string,cljs.core.swap_BANG_.call(null,cljs.core.gensym_counter,cljs.core.inc)));
});
gensym = function(prefix_string){
switch(arguments.length){
case  0 :
return gensym__3591.call(this);
case  1 :
return gensym__3592.call(this,prefix_string);
}
throw('Invalid arity: ' + arguments.length);
};
return gensym;
})()
;
cljs.core.fixture1 = 1;
cljs.core.fixture2 = 2;

/**
* @constructor
*/
cljs.core.Delay = (function (f,state){
this.f = f;
this.state = state;
})
cljs.core.Delay.prototype.cljs$core$IPending$ = true;
cljs.core.Delay.prototype.cljs$core$IPending$_realized_QMARK_ = (function (d){
var this__3594 = this;
return cljs.core.not.call(null,cljs.core.nil_QMARK_.call(null,cljs.core.deref.call(null,this__3594.state)));
});
cljs.core.Delay.prototype.cljs$core$IDeref$ = true;
cljs.core.Delay.prototype.cljs$core$IDeref$_deref = (function (_){
var this__3595 = this;
if(cljs.core.truth_(cljs.core.deref.call(null,this__3595.state)))
{} else
{cljs.core.swap_BANG_.call(null,this__3595.state,this__3595.f);
}
return cljs.core.deref.call(null,this__3595.state);
});
/**
* Takes a body of expressions and yields a Delay object that will
* invoke the body only the first time it is forced (with force or deref/@), and
* will cache the result and return it on all subsequent force
* calls.
* @param {...*} var_args
*/
cljs.core.delay = (function() { 
var delay__delegate = function (body){
return (new cljs.core.Delay((function (){
return cljs.core.apply.call(null,cljs.core.identity,body);
}),cljs.core.atom.call(null,null)));
};
var delay = function (var_args){
var body = null;
if (goog.isDef(var_args)) {
  body = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return delay__delegate.call(this, body);
};
delay.cljs$lang$maxFixedArity = 0;
delay.cljs$lang$applyTo = (function (arglist__3596){
var body = cljs.core.seq( arglist__3596 );;
return delay__delegate.call(this, body);
});
return delay;
})()
;
/**
* returns true if x is a Delay created with delay
*/
cljs.core.delay_QMARK_ = (function delay_QMARK_(x){
return cljs.core.instance_QMARK_.call(null,cljs.core.Delay,x);
});
/**
* If x is a Delay, returns the (possibly cached) value of its expression, else returns x
*/
cljs.core.force = (function force(x){
if(cljs.core.truth_(cljs.core.delay_QMARK_.call(null,x)))
{return cljs.core.deref.call(null,x);
} else
{return x;
}
});
/**
* Returns true if a value has been produced for a promise, delay, future or lazy sequence.
*/
cljs.core.realized_QMARK_ = (function realized_QMARK_(d){
return cljs.core._realized_QMARK_.call(null,d);
});
/**
* Recursively transforms JavaScript arrays into ClojureScript
* vectors, and JavaScript objects into ClojureScript maps.  With
* option ':keywordize-keys true' will convert object fields from
* strings to keywords.
* @param {...*} var_args
*/
cljs.core.js__GT_clj = (function() { 
var js__GT_clj__delegate = function (x,options){
var map__3597__3598 = options;
var map__3597__3599 = (cljs.core.truth_(cljs.core.seq_QMARK_.call(null,map__3597__3598))?cljs.core.apply.call(null,cljs.core.hash_map,map__3597__3598):map__3597__3598);
var keywordize_keys__3600 = cljs.core.get.call(null,map__3597__3599,"﷐'keywordize-keys");
var keyfn__3601 = (cljs.core.truth_(keywordize_keys__3600)?cljs.core.keyword:cljs.core.str);
var f__3607 = (function thisfn(x){
if(cljs.core.truth_(cljs.core.seq_QMARK_.call(null,x)))
{return cljs.core.doall.call(null,cljs.core.map.call(null,thisfn,x));
} else
{if(cljs.core.truth_(cljs.core.coll_QMARK_.call(null,x)))
{return cljs.core.into.call(null,cljs.core.empty.call(null,x),cljs.core.map.call(null,thisfn,x));
} else
{if(cljs.core.truth_(goog.isArray.call(null,x)))
{return cljs.core.vec.call(null,cljs.core.map.call(null,thisfn,x));
} else
{if(cljs.core.truth_(goog.isObject.call(null,x)))
{return cljs.core.into.call(null,cljs.core.ObjMap.fromObject([],{}),(function (){var iter__233__auto____3606 = (function iter__3602(s__3603){
return (new cljs.core.LazySeq(null,false,(function (){
var s__3603__3604 = s__3603;

while(true){
if(cljs.core.truth_(cljs.core.seq.call(null,s__3603__3604)))
{var k__3605 = cljs.core.first.call(null,s__3603__3604);

return cljs.core.cons.call(null,cljs.core.Vector.fromArray([keyfn__3601.call(null,k__3605),thisfn.call(null,cljs.core.aget.call(null,x,k__3605))]),iter__3602.call(null,cljs.core.rest.call(null,s__3603__3604)));
} else
{return null;
}
break;
}
})));
});

return iter__233__auto____3606.call(null,cljs.core.js_keys.call(null,x));
})());
} else
{if(cljs.core.truth_("﷐'else"))
{return x;
} else
{return null;
}
}
}
}
}
});

return f__3607.call(null,x);
};
var js__GT_clj = function (x,var_args){
var options = null;
if (goog.isDef(var_args)) {
  options = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return js__GT_clj__delegate.call(this, x, options);
};
js__GT_clj.cljs$lang$maxFixedArity = 1;
js__GT_clj.cljs$lang$applyTo = (function (arglist__3608){
var x = cljs.core.first(arglist__3608);
var options = cljs.core.rest(arglist__3608);
return js__GT_clj__delegate.call(this, x, options);
});
return js__GT_clj;
})()
;
/**
* Returns a memoized version of a referentially transparent function. The
* memoized version of the function keeps a cache of the mapping from arguments
* to results and, when calls with the same arguments are repeated often, has
* higher performance at the expense of higher memory use.
*/
cljs.core.memoize = (function memoize(f){
var mem__3609 = cljs.core.atom.call(null,cljs.core.ObjMap.fromObject([],{}));

return (function() { 
var G__3613__delegate = function (args){
var temp__3695__auto____3610 = cljs.core.get.call(null,cljs.core.deref.call(null,mem__3609),args);

if(cljs.core.truth_(temp__3695__auto____3610))
{var v__3611 = temp__3695__auto____3610;

return v__3611;
} else
{var ret__3612 = cljs.core.apply.call(null,f,args);

cljs.core.swap_BANG_.call(null,mem__3609,cljs.core.assoc,args,ret__3612);
return ret__3612;
}
};
var G__3613 = function (var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 0),0);
} 
return G__3613__delegate.call(this, args);
};
G__3613.cljs$lang$maxFixedArity = 0;
G__3613.cljs$lang$applyTo = (function (arglist__3614){
var args = cljs.core.seq( arglist__3614 );;
return G__3613__delegate.call(this, args);
});
return G__3613;
})()
;
});
/**
* trampoline can be used to convert algorithms requiring mutual
* recursion without stack consumption. Calls f with supplied args, if
* any. If f returns a fn, calls that fn with no arguments, and
* continues to repeat, until the return value is not a fn, then
* returns that non-fn value. Note that if you want to return a fn as a
* final value, you must wrap it in some data structure and unpack it
* after trampoline returns.
* @param {...*} var_args
*/
cljs.core.trampoline = (function() {
var trampoline = null;
var trampoline__3616 = (function (f){
while(true){
var ret__3615 = f.call(null);

if(cljs.core.truth_(cljs.core.fn_QMARK_.call(null,ret__3615)))
{{
var G__3619 = ret__3615;
f = G__3619;
continue;
}
} else
{return ret__3615;
}
break;
}
});
var trampoline__3617 = (function() { 
var G__3620__delegate = function (f,args){
return trampoline.call(null,(function (){
return cljs.core.apply.call(null,f,args);
}));
};
var G__3620 = function (f,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return G__3620__delegate.call(this, f, args);
};
G__3620.cljs$lang$maxFixedArity = 1;
G__3620.cljs$lang$applyTo = (function (arglist__3621){
var f = cljs.core.first(arglist__3621);
var args = cljs.core.rest(arglist__3621);
return G__3620__delegate.call(this, f, args);
});
return G__3620;
})()
;
trampoline = function(f,var_args){
var args = var_args;
switch(arguments.length){
case  1 :
return trampoline__3616.call(this,f);
default:
return trampoline__3617.apply(this,arguments);
}
throw('Invalid arity: ' + arguments.length);
};
trampoline.cljs$lang$maxFixedArity = 1;
trampoline.cljs$lang$applyTo = trampoline__3617.cljs$lang$applyTo;
return trampoline;
})()
;
/**
* Returns a random floating point number between 0 (inclusive) and
* n (default 1) (exclusive).
*/
cljs.core.rand = (function() {
var rand = null;
var rand__3622 = (function (){
return rand.call(null,1);
});
var rand__3623 = (function (n){
return Math.random() * n;
});
rand = function(n){
switch(arguments.length){
case  0 :
return rand__3622.call(this);
case  1 :
return rand__3623.call(this,n);
}
throw('Invalid arity: ' + arguments.length);
};
return rand;
})()
;
/**
* Returns a random integer between 0 (inclusive) and n (exclusive).
*/
cljs.core.rand_int = (function rand_int(n){
return Math.floor(Math.random() * n);
});
/**
* Return a random element of the (sequential) collection. Will have
* the same performance characteristics as nth for the given
* collection.
*/
cljs.core.rand_nth = (function rand_nth(coll){
return cljs.core.nth.call(null,coll,cljs.core.rand_int.call(null,cljs.core.count.call(null,coll)));
});
/**
* Returns a map of the elements of coll keyed by the result of
* f on each element. The value at each key will be a vector of the
* corresponding elements, in the order they appeared in coll.
*/
cljs.core.group_by = (function group_by(f,coll){
return cljs.core.reduce.call(null,(function (ret,x){
var k__3625 = f.call(null,x);

return cljs.core.assoc.call(null,ret,k__3625,cljs.core.conj.call(null,cljs.core.get.call(null,ret,k__3625,cljs.core.Vector.fromArray([])),x));
}),cljs.core.ObjMap.fromObject([],{}),coll);
});
/**
* Creates a hierarchy object for use with derive, isa? etc.
*/
cljs.core.make_hierarchy = (function make_hierarchy(){
return cljs.core.ObjMap.fromObject(["﷐'parents","﷐'descendants","﷐'ancestors"],{"﷐'parents":cljs.core.ObjMap.fromObject([],{}),"﷐'descendants":cljs.core.ObjMap.fromObject([],{}),"﷐'ancestors":cljs.core.ObjMap.fromObject([],{})});
});
cljs.core.global_hierarchy = cljs.core.atom.call(null,cljs.core.make_hierarchy.call(null));
/**
* Returns true if (= child parent), or child is directly or indirectly derived from
* parent, either via a Java type inheritance relationship or a
* relationship established via derive. h must be a hierarchy obtained
* from make-hierarchy, if not supplied defaults to the global
* hierarchy
*/
cljs.core.isa_QMARK_ = (function() {
var isa_QMARK_ = null;
var isa_QMARK___3634 = (function (child,parent){
return isa_QMARK_.call(null,cljs.core.deref.call(null,cljs.core.global_hierarchy),child,parent);
});
var isa_QMARK___3635 = (function (h,child,parent){
var or__3548__auto____3626 = cljs.core._EQ_.call(null,child,parent);

if(cljs.core.truth_(or__3548__auto____3626))
{return or__3548__auto____3626;
} else
{var or__3548__auto____3627 = cljs.core.contains_QMARK_.call(null,"﷐'ancestors".call(null,h).call(null,child),parent);

if(cljs.core.truth_(or__3548__auto____3627))
{return or__3548__auto____3627;
} else
{var and__3546__auto____3628 = cljs.core.vector_QMARK_.call(null,parent);

if(cljs.core.truth_(and__3546__auto____3628))
{var and__3546__auto____3629 = cljs.core.vector_QMARK_.call(null,child);

if(cljs.core.truth_(and__3546__auto____3629))
{var and__3546__auto____3630 = cljs.core._EQ_.call(null,cljs.core.count.call(null,parent),cljs.core.count.call(null,child));

if(cljs.core.truth_(and__3546__auto____3630))
{var ret__3631 = true;
var i__3632 = 0;

while(true){
if(cljs.core.truth_((function (){var or__3548__auto____3633 = cljs.core.not.call(null,ret__3631);

if(cljs.core.truth_(or__3548__auto____3633))
{return or__3548__auto____3633;
} else
{return cljs.core._EQ_.call(null,i__3632,cljs.core.count.call(null,parent));
}
})()))
{return ret__3631;
} else
{{
var G__3637 = isa_QMARK_.call(null,h,child.call(null,i__3632),parent.call(null,i__3632));
var G__3638 = cljs.core.inc.call(null,i__3632);
ret__3631 = G__3637;
i__3632 = G__3638;
continue;
}
}
break;
}
} else
{return and__3546__auto____3630;
}
} else
{return and__3546__auto____3629;
}
} else
{return and__3546__auto____3628;
}
}
}
});
isa_QMARK_ = function(h,child,parent){
switch(arguments.length){
case  2 :
return isa_QMARK___3634.call(this,h,child);
case  3 :
return isa_QMARK___3635.call(this,h,child,parent);
}
throw('Invalid arity: ' + arguments.length);
};
return isa_QMARK_;
})()
;
/**
* Returns the immediate parents of tag, either via a Java type
* inheritance relationship or a relationship established via derive. h
* must be a hierarchy obtained from make-hierarchy, if not supplied
* defaults to the global hierarchy
*/
cljs.core.parents = (function() {
var parents = null;
var parents__3639 = (function (tag){
return parents.call(null,cljs.core.deref.call(null,cljs.core.global_hierarchy),tag);
});
var parents__3640 = (function (h,tag){
return cljs.core.not_empty.call(null,cljs.core.get.call(null,"﷐'parents".call(null,h),tag));
});
parents = function(h,tag){
switch(arguments.length){
case  1 :
return parents__3639.call(this,h);
case  2 :
return parents__3640.call(this,h,tag);
}
throw('Invalid arity: ' + arguments.length);
};
return parents;
})()
;
/**
* Returns the immediate and indirect parents of tag, either via a Java type
* inheritance relationship or a relationship established via derive. h
* must be a hierarchy obtained from make-hierarchy, if not supplied
* defaults to the global hierarchy
*/
cljs.core.ancestors = (function() {
var ancestors = null;
var ancestors__3642 = (function (tag){
return ancestors.call(null,cljs.core.deref.call(null,cljs.core.global_hierarchy),tag);
});
var ancestors__3643 = (function (h,tag){
return cljs.core.not_empty.call(null,cljs.core.get.call(null,"﷐'ancestors".call(null,h),tag));
});
ancestors = function(h,tag){
switch(arguments.length){
case  1 :
return ancestors__3642.call(this,h);
case  2 :
return ancestors__3643.call(this,h,tag);
}
throw('Invalid arity: ' + arguments.length);
};
return ancestors;
})()
;
/**
* Returns the immediate and indirect children of tag, through a
* relationship established via derive. h must be a hierarchy obtained
* from make-hierarchy, if not supplied defaults to the global
* hierarchy. Note: does not work on Java type inheritance
* relationships.
*/
cljs.core.descendants = (function() {
var descendants = null;
var descendants__3645 = (function (tag){
return descendants.call(null,cljs.core.deref.call(null,cljs.core.global_hierarchy),tag);
});
var descendants__3646 = (function (h,tag){
return cljs.core.not_empty.call(null,cljs.core.get.call(null,"﷐'descendants".call(null,h),tag));
});
descendants = function(h,tag){
switch(arguments.length){
case  1 :
return descendants__3645.call(this,h);
case  2 :
return descendants__3646.call(this,h,tag);
}
throw('Invalid arity: ' + arguments.length);
};
return descendants;
})()
;
/**
* Establishes a parent/child relationship between parent and
* tag. Parent must be a namespace-qualified symbol or keyword and
* child can be either a namespace-qualified symbol or keyword or a
* class. h must be a hierarchy obtained from make-hierarchy, if not
* supplied defaults to, and modifies, the global hierarchy.
*/
cljs.core.derive = (function() {
var derive = null;
var derive__3656 = (function (tag,parent){
if(cljs.core.truth_(cljs.core.namespace.call(null,parent)))
{} else
{throw (new Error(cljs.core.str.call(null,"Assert failed: ",cljs.core.pr_str.call(null,cljs.core.list("﷑'namespace","﷑'parent")))));
}
cljs.core.swap_BANG_.call(null,cljs.core.global_hierarchy,derive,tag,parent);
return null;
});
var derive__3657 = (function (h,tag,parent){
if(cljs.core.truth_(cljs.core.not_EQ_.call(null,tag,parent)))
{} else
{throw (new Error(cljs.core.str.call(null,"Assert failed: ",cljs.core.pr_str.call(null,cljs.core.list("﷑'not=","﷑'tag","﷑'parent")))));
}
var tp__3651 = "﷐'parents".call(null,h);
var td__3652 = "﷐'descendants".call(null,h);
var ta__3653 = "﷐'ancestors".call(null,h);
var tf__3654 = (function (m,source,sources,target,targets){
return cljs.core.reduce.call(null,(function (ret,k){
return cljs.core.assoc.call(null,ret,k,cljs.core.reduce.call(null,cljs.core.conj,cljs.core.get.call(null,targets,k,cljs.core.set([])),cljs.core.cons.call(null,target,targets.call(null,target))));
}),m,cljs.core.cons.call(null,source,sources.call(null,source)));
});

var or__3548__auto____3655 = (cljs.core.truth_(cljs.core.contains_QMARK_.call(null,tp__3651.call(null,tag),parent))?null:(function (){if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null,ta__3653.call(null,tag),parent)))
{throw (new Error(cljs.core.str.call(null,tag,"already has",parent,"as ancestor")));
} else
{}
if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null,ta__3653.call(null,parent),tag)))
{throw (new Error(cljs.core.str.call(null,"Cyclic derivation:",parent,"has",tag,"as ancestor")));
} else
{}
return cljs.core.ObjMap.fromObject(["﷐'parents","﷐'ancestors","﷐'descendants"],{"﷐'parents":cljs.core.assoc.call(null,"﷐'parents".call(null,h),tag,cljs.core.conj.call(null,cljs.core.get.call(null,tp__3651,tag,cljs.core.set([])),parent)),"﷐'ancestors":tf__3654.call(null,"﷐'ancestors".call(null,h),tag,td__3652,parent,ta__3653),"﷐'descendants":tf__3654.call(null,"﷐'descendants".call(null,h),parent,ta__3653,tag,td__3652)});
})());

if(cljs.core.truth_(or__3548__auto____3655))
{return or__3548__auto____3655;
} else
{return h;
}
});
derive = function(h,tag,parent){
switch(arguments.length){
case  2 :
return derive__3656.call(this,h,tag);
case  3 :
return derive__3657.call(this,h,tag,parent);
}
throw('Invalid arity: ' + arguments.length);
};
return derive;
})()
;
/**
* Removes a parent/child relationship between parent and
* tag. h must be a hierarchy obtained from make-hierarchy, if not
* supplied defaults to, and modifies, the global hierarchy.
*/
cljs.core.underive = (function() {
var underive = null;
var underive__3663 = (function (tag,parent){
cljs.core.swap_BANG_.call(null,cljs.core.global_hierarchy,underive,tag,parent);
return null;
});
var underive__3664 = (function (h,tag,parent){
var parentMap__3659 = "﷐'parents".call(null,h);
var childsParents__3660 = (cljs.core.truth_(parentMap__3659.call(null,tag))?cljs.core.disj.call(null,parentMap__3659.call(null,tag),parent):cljs.core.set([]));
var newParents__3661 = (cljs.core.truth_(cljs.core.not_empty.call(null,childsParents__3660))?cljs.core.assoc.call(null,parentMap__3659,tag,childsParents__3660):cljs.core.dissoc.call(null,parentMap__3659,tag));
var deriv_seq__3662 = cljs.core.flatten.call(null,cljs.core.map.call(null,(function (p1__3648_SHARP_){
return cljs.core.cons.call(null,cljs.core.first.call(null,p1__3648_SHARP_),cljs.core.interpose.call(null,cljs.core.first.call(null,p1__3648_SHARP_),cljs.core.second.call(null,p1__3648_SHARP_)));
}),cljs.core.seq.call(null,newParents__3661)));

if(cljs.core.truth_(cljs.core.contains_QMARK_.call(null,parentMap__3659.call(null,tag),parent)))
{return cljs.core.reduce.call(null,(function (p1__3649_SHARP_,p2__3650_SHARP_){
return cljs.core.apply.call(null,cljs.core.derive,p1__3649_SHARP_,p2__3650_SHARP_);
}),cljs.core.make_hierarchy.call(null),cljs.core.partition.call(null,2,deriv_seq__3662));
} else
{return h;
}
});
underive = function(h,tag,parent){
switch(arguments.length){
case  2 :
return underive__3663.call(this,h,tag);
case  3 :
return underive__3664.call(this,h,tag,parent);
}
throw('Invalid arity: ' + arguments.length);
};
return underive;
})()
;
cljs.core.reset_cache = (function reset_cache(method_cache,method_table,cached_hierarchy,hierarchy){
cljs.core.swap_BANG_.call(null,method_cache,(function (_){
return cljs.core.deref.call(null,method_table);
}));
return cljs.core.swap_BANG_.call(null,cached_hierarchy,(function (_){
return cljs.core.deref.call(null,hierarchy);
}));
});
cljs.core.prefers_STAR_ = (function prefers_STAR_(x,y,prefer_table){
var xprefs__3666 = cljs.core.deref.call(null,prefer_table).call(null,x);

var or__3548__auto____3668 = (cljs.core.truth_((function (){var and__3546__auto____3667 = xprefs__3666;

if(cljs.core.truth_(and__3546__auto____3667))
{return xprefs__3666.call(null,y);
} else
{return and__3546__auto____3667;
}
})())?true:null);

if(cljs.core.truth_(or__3548__auto____3668))
{return or__3548__auto____3668;
} else
{var or__3548__auto____3670 = (function (){var ps__3669 = cljs.core.parents.call(null,y);

while(true){
if(cljs.core.truth_(cljs.core.pos_QMARK_.call(null,cljs.core.count.call(null,ps__3669))))
{if(cljs.core.truth_(prefers_STAR_.call(null,x,cljs.core.first.call(null,ps__3669),prefer_table)))
{} else
{}
{
var G__3673 = cljs.core.rest.call(null,ps__3669);
ps__3669 = G__3673;
continue;
}
} else
{return null;
}
break;
}
})();

if(cljs.core.truth_(or__3548__auto____3670))
{return or__3548__auto____3670;
} else
{var or__3548__auto____3672 = (function (){var ps__3671 = cljs.core.parents.call(null,x);

while(true){
if(cljs.core.truth_(cljs.core.pos_QMARK_.call(null,cljs.core.count.call(null,ps__3671))))
{if(cljs.core.truth_(prefers_STAR_.call(null,cljs.core.first.call(null,ps__3671),y,prefer_table)))
{} else
{}
{
var G__3674 = cljs.core.rest.call(null,ps__3671);
ps__3671 = G__3674;
continue;
}
} else
{return null;
}
break;
}
})();

if(cljs.core.truth_(or__3548__auto____3672))
{return or__3548__auto____3672;
} else
{return false;
}
}
}
});
cljs.core.dominates = (function dominates(x,y,prefer_table){
var or__3548__auto____3675 = cljs.core.prefers_STAR_.call(null,x,y,prefer_table);

if(cljs.core.truth_(or__3548__auto____3675))
{return or__3548__auto____3675;
} else
{return cljs.core.isa_QMARK_.call(null,x,y);
}
});
cljs.core.find_and_cache_best_method = (function find_and_cache_best_method(name,dispatch_val,hierarchy,method_table,prefer_table,method_cache,cached_hierarchy){
var best_entry__3684 = cljs.core.reduce.call(null,(function (be,p__3676){
var vec__3677__3678 = p__3676;
var k__3679 = cljs.core.nth.call(null,vec__3677__3678,0,null);
var ___3680 = cljs.core.nth.call(null,vec__3677__3678,1,null);
var e__3681 = vec__3677__3678;

if(cljs.core.truth_(cljs.core.isa_QMARK_.call(null,dispatch_val,k__3679)))
{var be2__3683 = (cljs.core.truth_((function (){var or__3548__auto____3682 = cljs.core.nil_QMARK_.call(null,be);

if(cljs.core.truth_(or__3548__auto____3682))
{return or__3548__auto____3682;
} else
{return cljs.core.dominates.call(null,k__3679,cljs.core.first.call(null,be),prefer_table);
}
})())?e__3681:be);

if(cljs.core.truth_(cljs.core.dominates.call(null,cljs.core.first.call(null,be2__3683),k__3679,prefer_table)))
{} else
{throw (new Error(cljs.core.str.call(null,"Multiple methods in multimethod '",name,"' match dispatch value: ",dispatch_val," -> ",k__3679," and ",cljs.core.first.call(null,be2__3683),", and neither is preferred")));
}
return be2__3683;
} else
{return null;
}
}),null,cljs.core.deref.call(null,method_table));

if(cljs.core.truth_(best_entry__3684))
{if(cljs.core.truth_(cljs.core._EQ_.call(null,cljs.core.deref.call(null,cached_hierarchy),cljs.core.deref.call(null,hierarchy))))
{cljs.core.swap_BANG_.call(null,method_cache,cljs.core.assoc,dispatch_val,cljs.core.second.call(null,best_entry__3684));
return cljs.core.second.call(null,best_entry__3684);
} else
{cljs.core.reset_cache.call(null,method_cache,method_table,cached_hierarchy,hierarchy);
return find_and_cache_best_method.call(null,name,dispatch_val,hierarchy,method_table,prefer_table,method_cache,cached_hierarchy);
}
} else
{return null;
}
});
cljs.core.IMultiFn = {};
cljs.core._reset = (function _reset(mf){
if(cljs.core.truth_((function (){var and__3546__auto____3685 = mf;

if(cljs.core.truth_(and__3546__auto____3685))
{return mf.cljs$core$IMultiFn$_reset;
} else
{return and__3546__auto____3685;
}
})()))
{return mf.cljs$core$IMultiFn$_reset(mf);
} else
{return (function (){var or__3548__auto____3686 = cljs.core.aget.call(null,cljs.core._reset,goog.typeOf.call(null,mf));

if(cljs.core.truth_(or__3548__auto____3686))
{return or__3548__auto____3686;
} else
{var or__3548__auto____3687 = cljs.core.aget.call(null,cljs.core._reset,"_");

if(cljs.core.truth_(or__3548__auto____3687))
{return or__3548__auto____3687;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-reset",mf);
}
}
})().call(null,mf);
}
});
cljs.core._add_method = (function _add_method(mf,dispatch_val,method){
if(cljs.core.truth_((function (){var and__3546__auto____3688 = mf;

if(cljs.core.truth_(and__3546__auto____3688))
{return mf.cljs$core$IMultiFn$_add_method;
} else
{return and__3546__auto____3688;
}
})()))
{return mf.cljs$core$IMultiFn$_add_method(mf,dispatch_val,method);
} else
{return (function (){var or__3548__auto____3689 = cljs.core.aget.call(null,cljs.core._add_method,goog.typeOf.call(null,mf));

if(cljs.core.truth_(or__3548__auto____3689))
{return or__3548__auto____3689;
} else
{var or__3548__auto____3690 = cljs.core.aget.call(null,cljs.core._add_method,"_");

if(cljs.core.truth_(or__3548__auto____3690))
{return or__3548__auto____3690;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-add-method",mf);
}
}
})().call(null,mf,dispatch_val,method);
}
});
cljs.core._remove_method = (function _remove_method(mf,dispatch_val){
if(cljs.core.truth_((function (){var and__3546__auto____3691 = mf;

if(cljs.core.truth_(and__3546__auto____3691))
{return mf.cljs$core$IMultiFn$_remove_method;
} else
{return and__3546__auto____3691;
}
})()))
{return mf.cljs$core$IMultiFn$_remove_method(mf,dispatch_val);
} else
{return (function (){var or__3548__auto____3692 = cljs.core.aget.call(null,cljs.core._remove_method,goog.typeOf.call(null,mf));

if(cljs.core.truth_(or__3548__auto____3692))
{return or__3548__auto____3692;
} else
{var or__3548__auto____3693 = cljs.core.aget.call(null,cljs.core._remove_method,"_");

if(cljs.core.truth_(or__3548__auto____3693))
{return or__3548__auto____3693;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-remove-method",mf);
}
}
})().call(null,mf,dispatch_val);
}
});
cljs.core._prefer_method = (function _prefer_method(mf,dispatch_val,dispatch_val_y){
if(cljs.core.truth_((function (){var and__3546__auto____3694 = mf;

if(cljs.core.truth_(and__3546__auto____3694))
{return mf.cljs$core$IMultiFn$_prefer_method;
} else
{return and__3546__auto____3694;
}
})()))
{return mf.cljs$core$IMultiFn$_prefer_method(mf,dispatch_val,dispatch_val_y);
} else
{return (function (){var or__3548__auto____3695 = cljs.core.aget.call(null,cljs.core._prefer_method,goog.typeOf.call(null,mf));

if(cljs.core.truth_(or__3548__auto____3695))
{return or__3548__auto____3695;
} else
{var or__3548__auto____3696 = cljs.core.aget.call(null,cljs.core._prefer_method,"_");

if(cljs.core.truth_(or__3548__auto____3696))
{return or__3548__auto____3696;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-prefer-method",mf);
}
}
})().call(null,mf,dispatch_val,dispatch_val_y);
}
});
cljs.core._get_method = (function _get_method(mf,dispatch_val){
if(cljs.core.truth_((function (){var and__3546__auto____3697 = mf;

if(cljs.core.truth_(and__3546__auto____3697))
{return mf.cljs$core$IMultiFn$_get_method;
} else
{return and__3546__auto____3697;
}
})()))
{return mf.cljs$core$IMultiFn$_get_method(mf,dispatch_val);
} else
{return (function (){var or__3548__auto____3698 = cljs.core.aget.call(null,cljs.core._get_method,goog.typeOf.call(null,mf));

if(cljs.core.truth_(or__3548__auto____3698))
{return or__3548__auto____3698;
} else
{var or__3548__auto____3699 = cljs.core.aget.call(null,cljs.core._get_method,"_");

if(cljs.core.truth_(or__3548__auto____3699))
{return or__3548__auto____3699;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-get-method",mf);
}
}
})().call(null,mf,dispatch_val);
}
});
cljs.core._methods = (function _methods(mf){
if(cljs.core.truth_((function (){var and__3546__auto____3700 = mf;

if(cljs.core.truth_(and__3546__auto____3700))
{return mf.cljs$core$IMultiFn$_methods;
} else
{return and__3546__auto____3700;
}
})()))
{return mf.cljs$core$IMultiFn$_methods(mf);
} else
{return (function (){var or__3548__auto____3701 = cljs.core.aget.call(null,cljs.core._methods,goog.typeOf.call(null,mf));

if(cljs.core.truth_(or__3548__auto____3701))
{return or__3548__auto____3701;
} else
{var or__3548__auto____3702 = cljs.core.aget.call(null,cljs.core._methods,"_");

if(cljs.core.truth_(or__3548__auto____3702))
{return or__3548__auto____3702;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-methods",mf);
}
}
})().call(null,mf);
}
});
cljs.core._prefers = (function _prefers(mf){
if(cljs.core.truth_((function (){var and__3546__auto____3703 = mf;

if(cljs.core.truth_(and__3546__auto____3703))
{return mf.cljs$core$IMultiFn$_prefers;
} else
{return and__3546__auto____3703;
}
})()))
{return mf.cljs$core$IMultiFn$_prefers(mf);
} else
{return (function (){var or__3548__auto____3704 = cljs.core.aget.call(null,cljs.core._prefers,goog.typeOf.call(null,mf));

if(cljs.core.truth_(or__3548__auto____3704))
{return or__3548__auto____3704;
} else
{var or__3548__auto____3705 = cljs.core.aget.call(null,cljs.core._prefers,"_");

if(cljs.core.truth_(or__3548__auto____3705))
{return or__3548__auto____3705;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-prefers",mf);
}
}
})().call(null,mf);
}
});
cljs.core._invoke = (function _invoke(mf,args){
if(cljs.core.truth_((function (){var and__3546__auto____3706 = mf;

if(cljs.core.truth_(and__3546__auto____3706))
{return mf.cljs$core$IMultiFn$_invoke;
} else
{return and__3546__auto____3706;
}
})()))
{return mf.cljs$core$IMultiFn$_invoke(mf,args);
} else
{return (function (){var or__3548__auto____3707 = cljs.core.aget.call(null,cljs.core._invoke,goog.typeOf.call(null,mf));

if(cljs.core.truth_(or__3548__auto____3707))
{return or__3548__auto____3707;
} else
{var or__3548__auto____3708 = cljs.core.aget.call(null,cljs.core._invoke,"_");

if(cljs.core.truth_(or__3548__auto____3708))
{return or__3548__auto____3708;
} else
{throw cljs.core.missing_protocol.call(null,"IMultiFn.-invoke",mf);
}
}
})().call(null,mf,args);
}
});
cljs.core.do_invoke = (function do_invoke(mf,dispatch_fn,args){
var dispatch_val__3709 = cljs.core.apply.call(null,dispatch_fn,args);
var target_fn__3710 = cljs.core._get_method.call(null,mf,dispatch_val__3709);

if(cljs.core.truth_(target_fn__3710))
{} else
{throw (new Error(cljs.core.str.call(null,"No method in multimethod '",cljs.core.name,"' for dispatch value: ",dispatch_val__3709)));
}
return cljs.core.apply.call(null,target_fn__3710,args);
});

/**
* @constructor
*/
cljs.core.MultiFn = (function (name,dispatch_fn,default_dispatch_val,hierarchy,method_table,prefer_table,method_cache,cached_hierarchy){
this.name = name;
this.dispatch_fn = dispatch_fn;
this.default_dispatch_val = default_dispatch_val;
this.hierarchy = hierarchy;
this.method_table = method_table;
this.prefer_table = prefer_table;
this.method_cache = method_cache;
this.cached_hierarchy = cached_hierarchy;
})
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$ = true;
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_reset = (function (mf){
var this__3711 = this;
cljs.core.swap_BANG_.call(null,this__3711.method_table,(function (mf){
return cljs.core.ObjMap.fromObject([],{});
}));
cljs.core.swap_BANG_.call(null,this__3711.method_cache,(function (mf){
return cljs.core.ObjMap.fromObject([],{});
}));
cljs.core.swap_BANG_.call(null,this__3711.prefer_table,(function (mf){
return cljs.core.ObjMap.fromObject([],{});
}));
cljs.core.swap_BANG_.call(null,this__3711.cached_hierarchy,(function (mf){
return null;
}));
return mf;
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_add_method = (function (mf,dispatch_val,method){
var this__3712 = this;
cljs.core.swap_BANG_.call(null,this__3712.method_table,cljs.core.assoc,dispatch_val,method);
cljs.core.reset_cache.call(null,this__3712.method_cache,this__3712.method_table,this__3712.cached_hierarchy,this__3712.hierarchy);
return mf;
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_remove_method = (function (mf,dispatch_val){
var this__3713 = this;
cljs.core.swap_BANG_.call(null,this__3713.method_table,cljs.core.dissoc,dispatch_val);
cljs.core.reset_cache.call(null,this__3713.method_cache,this__3713.method_table,this__3713.cached_hierarchy,this__3713.hierarchy);
return mf;
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_get_method = (function (mf,dispatch_val){
var this__3714 = this;
if(cljs.core.truth_(cljs.core._EQ_.call(null,cljs.core.deref.call(null,this__3714.cached_hierarchy),cljs.core.deref.call(null,this__3714.hierarchy))))
{} else
{cljs.core.reset_cache.call(null,this__3714.method_cache,this__3714.method_table,this__3714.cached_hierarchy,this__3714.hierarchy);
}
var temp__3695__auto____3715 = cljs.core.deref.call(null,this__3714.method_cache).call(null,dispatch_val);

if(cljs.core.truth_(temp__3695__auto____3715))
{var target_fn__3716 = temp__3695__auto____3715;

return target_fn__3716;
} else
{var temp__3695__auto____3717 = cljs.core.find_and_cache_best_method.call(null,this__3714.name,dispatch_val,this__3714.hierarchy,this__3714.method_table,this__3714.prefer_table,this__3714.method_cache,this__3714.cached_hierarchy);

if(cljs.core.truth_(temp__3695__auto____3717))
{var target_fn__3718 = temp__3695__auto____3717;

return target_fn__3718;
} else
{return cljs.core.deref.call(null,this__3714.method_table).call(null,this__3714.default_dispatch_val);
}
}
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_prefer_method = (function (mf,dispatch_val_x,dispatch_val_y){
var this__3719 = this;
if(cljs.core.truth_(cljs.core.prefers_STAR_.call(null,dispatch_val_x,dispatch_val_y,this__3719.prefer_table)))
{throw (new Error(cljs.core.str.call(null,"Preference conflict in multimethod '",this__3719.name,"': ",dispatch_val_y," is already preferred to ",dispatch_val_x)));
} else
{}
cljs.core.swap_BANG_.call(null,this__3719.prefer_table,(function (old){
return cljs.core.assoc.call(null,old,dispatch_val_x,cljs.core.conj.call(null,cljs.core.get.call(null,old,dispatch_val_x,cljs.core.set([])),dispatch_val_y));
}));
return cljs.core.reset_cache.call(null,this__3719.method_cache,this__3719.method_table,this__3719.cached_hierarchy,this__3719.hierarchy);
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_methods = (function (mf){
var this__3720 = this;
return cljs.core.deref.call(null,this__3720.method_table);
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_prefers = (function (mf){
var this__3721 = this;
return cljs.core.deref.call(null,this__3721.prefer_table);
});
cljs.core.MultiFn.prototype.cljs$core$IMultiFn$_invoke = (function (mf,args){
var this__3722 = this;
return cljs.core.do_invoke.call(null,mf,this__3722.dispatch_fn,args);
});
cljs.core.MultiFn.prototype.call = (function() { 
var G__3723__delegate = function (_,args){
return cljs.core._invoke.call(null,this,args);
};
var G__3723 = function (_,var_args){
var args = null;
if (goog.isDef(var_args)) {
  args = cljs.core.array_seq(Array.prototype.slice.call(arguments, 1),0);
} 
return G__3723__delegate.call(this, _, args);
};
G__3723.cljs$lang$maxFixedArity = 1;
G__3723.cljs$lang$applyTo = (function (arglist__3724){
var _ = cljs.core.first(arglist__3724);
var args = cljs.core.rest(arglist__3724);
return G__3723__delegate.call(this, _, args);
});
return G__3723;
})()
;
/**
* Removes all of the methods of multimethod.
*/
cljs.core.remove_all_methods = (function remove_all_methods(multifn){
return cljs.core._reset.call(null,multifn);
});
/**
* Removes the method of multimethod associated with dispatch-value.
*/
cljs.core.remove_method = (function remove_method(multifn,dispatch_val){
return cljs.core._remove_method.call(null,multifn,dispatch_val);
});
/**
* Causes the multimethod to prefer matches of dispatch-val-x over dispatch-val-y
* when there is a conflict
*/
cljs.core.prefer_method = (function prefer_method(multifn,dispatch_val_x,dispatch_val_y){
return cljs.core._prefer_method.call(null,multifn,dispatch_val_x,dispatch_val_y);
});
/**
* Given a multimethod, returns a map of dispatch values -> dispatch fns
*/
cljs.core.methods$ = (function methods$(multifn){
return cljs.core._methods.call(null,multifn);
});
/**
* Given a multimethod and a dispatch value, returns the dispatch fn
* that would apply to that value, or nil if none apply and no default
*/
cljs.core.get_method = (function get_method(multifn,dispatch_val){
return cljs.core._get_method.call(null,multifn,dispatch_val);
});
/**
* Given a multimethod, returns a map of preferred value -> set of other values
*/
cljs.core.prefers = (function prefers(multifn){
return cljs.core._prefers.call(null,multifn);
});
