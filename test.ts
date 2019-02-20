//
// Copyright (c) YanJibin <qivmvip AT gmail DOT net> All rights reserved.
// Licensed under the MIT license,  see LICENSE file in the project root.
//
// author : YanJibin <qivmvip AT gmail DOT net>
// date   : 2019-02-21
// desc   : test log.ts
//


// run on node
//  > tsc test.ts
//  > node test.js
//
// run on deno
//  import {Log} from "./log.ts";
//
import {Log} from "./log";

const TAG = "TAG";
const TAG0 = "TAG-000";
const TAG1 = "TAG-111"; 

console.log("log is available :", Log.available);

Log.inf(TAG, "hello, log.js");

Log.dbg(TAG, "this log is invisible");

Log.setFilterLevel(Log.LEVEL_DBG);
Log.dbg(TAG, "now the debug log is visible");

Log.discardTimestamp();
Log.inf(TAG, "now, this log is without timestamp prefix");

Log.discardLevel()
Log.inf(TAG, "now, this log is without level prefix");

Log.discardTag()
Log.inf(TAG, "now, this log is without tag prefix");

Log.reset();
Log.inf(TAG, "now, this log is with default prefix");

Log.setFilterTag(TAG);
Log.inf(TAG, "ONLY tag =", TAG, "log is visible");
Log.inf(TAG0, "this log is invisible");
Log.inf(TAG1, "this log is invisible");

Log.clearFilterTag();
Log.inf(TAG, "now, all this log is visible");
Log.inf(TAG0, "now, all this log is visible");
Log.inf(TAG1, "now, all this log is visible");

Log.wrn(TAG, "this is warning log");

Log.err(TAG, "this err log", new Error("---err-0---"));

Log.wtf(TAG, "this wtf log", new Error("---wtf-0---"));

Log.err(TAG, "this err log", new Error("---err-1---"));


Log.disable();
Log.inf("now, the log is not available");

Log.enable();
Log.inf(TAG, "now, log is available");

Log.inf(TAG, "String with String Substitution --- %s ---", "XXX");

Log.inf( TAG
       , "a lot of option parameters"
       , 123
       , (new Date())
       , {foo: "bar", abc: "xyz", 123 : 123}
       )

Log.inf(TAG);

Log.inf("");

Log.inf(undefined);

Log.inf(TAG, "have a nice day");
