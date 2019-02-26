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

function test() : void {
  const TAG = "TAG";
  const TAGX = "TAGX";
  const TAGY = "TAGY";

  console.log("Log.available() is :", Log.available());

  Log.inf(TAG, "hello, log.js");

  Log.vrb(TAG, "this vrb log is invisible");
  Log.dbg(TAG, "this dbg log is invisible");

  Log.setFilterLevel(Log.LEVEL_DBG);
  Log.vrb(TAG, "now this vrb log is visible");
  Log.dbg(TAG, "now this dbg log is visible");

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
  Log.inf(TAGX, "this log is invisible");
  Log.inf(TAGY, "this log is invisible");

  Log.clearFilterTag();
  Log.inf(TAG, "now, all this log is visible");
  Log.inf(TAGX, "now, all this log is visible");
  Log.inf(TAGY, "now, all this log is visible");

  Log.wrn(TAG, "this is warning log");

  Log.err(TAG, "this is err log", new Error("---err-0---"));

  Log.wtf(TAG, "this is wtf log", new Error("---wtf-0---"));

  Log.err(TAG, "this is err log", new Error("---err-1---"));


  Log.disable();
  Log.inf("now, this log is not available");

  Log.enable();
  Log.inf(TAG, "now, this log is available");

  Log.inf(TAG, "String with String Substitution --- %s ---", "XXX");

  Log.inf( TAG
         , "a lot of option parameters"
         , 123
         , (new Date())
         , {foo: "bar", abc: "xyz", 123 : 123}
         , "Oops ..."
         )

  Log.inf(TAG);

  Log.inf("");

  //Log.inf(undefined);

  Log.inf(TAG, "have a nice day");
}

test();
