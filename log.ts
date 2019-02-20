//
// Copyright (c) YanJibin <qivmvip AT gmail DOT net> All rights reserved.
// Licensed under the MIT license,  see LICENSE file in the project root.
//
// author : YanJibin <qivmvip AT gmail DOT net>
// date   : 2019-02-19
// desc   : a simple log with timestamp, level, tag and etc.
//


export interface LogOutput {
  dbg(msg: string, ...opt: any[]): void;
  inf(msg: string, ...opt: any[]): void;
  wrn(msg: string, ...opt: any[]): void;
  err(msg: string, ...opt: any[]): void;
  wtf(msg: string, ...opt: any[]): void;
}

class ConsoleOutput implements LogOutput {
  dbg(msg: string, ...opt: any[]): void {
    console.log(msg, ...opt);
  }
  inf(msg: string, ...opt: any[]): void {
    console.info(msg, ...opt);
  }
  wrn(msg: string, ...opt: any[]): void {
    console.warn(msg, ...opt);
  }
  err(msg: string, ...opt: any[]): void {
    console.error(msg, ...opt);
  }
  wtf(msg: string, ...opt: any[]): void {
    console.error(msg, ...opt);
  }
}

export class Log {
  private constructor() {
    throw new Error("Log is a utility class");
  }

  static readonly LEVEL_DBG = -1;
  static readonly LEVEL_INF = 0;
  static readonly LEVEL_WRN = 1;
  static readonly LEVEL_ERR = 2;
  static readonly LEVEL_WTF = 99;

  private static readonly DEFAULT_OUTPUT = new ConsoleOutput();
  private static readonly DEFAULT_FILTER_LEVEL = Log.LEVEL_INF;
  private static readonly FILTER_TAG_ALL = "";

  private static _output = Log.DEFAULT_OUTPUT;
  private static _available = true;
  //private static _async = true;
  private static _filterLevel = Log.DEFAULT_FILTER_LEVEL;
  private static _filterTag = Log.FILTER_TAG_ALL;
  private static _hasTimestamp = true;
  private static _hasLevel = true;
  private static _hasTag = true;

  static reset() {
    Log._output = Log.DEFAULT_OUTPUT;
    Log._available = true;
    Log._filterLevel = Log.DEFAULT_FILTER_LEVEL;
    Log._filterTag = Log.FILTER_TAG_ALL;
    Log._hasTimestamp = true;
    Log._hasLevel = true;
    Log._hasTag = true;
  }

  static output(): LogOutput {
    return Log._output;
  }
  static setOutput(ouput: LogOutput): void {
    Log._output = ouput;
  }
  static resetOutput(): void {
    Log._output = Log.DEFAULT_OUTPUT;
  }

  static available() : boolean {
    return this._available;
  }
  static enable(): void {
    Log._available = true;
  }
  static disable(): void {
    Log._available = false;
  }

/*
  static async(): boolean {
    return Log._async;
  }
  static sync(async: boolean) {
    Log._async = async;
  }
*/

  static filterTag(): string {
    return Log._filterTag;
  }
  static setFilterTag(filterTag: string):void {
    Log._filterTag = filterTag;
  }
  static clearFilterTag(): void {
    Log._filterTag = Log.FILTER_TAG_ALL;
  }

  static filterLevel(): number {
    return Log._filterLevel;
  }
  static setFilterLevel(filterLevel: number): void {
    Log._filterLevel = filterLevel;
  }
  static resetFilterLevel() {
    Log._filterLevel = Log.DEFAULT_FILTER_LEVEL;
  }

  static hasTimestamp(): boolean {
    return Log._hasTimestamp;
  }
  static keepTimestamp(): void {
    Log._hasTimestamp = true;
  }
  static discardTimestamp(): void {
    Log._hasTimestamp = false;
  }

  static hasLevel(): boolean {
    return Log._hasLevel;
  }
  static keepLevel(): void {
    Log._hasLevel = true;
  }
  static discardLevel(): void {
    Log._hasLevel = false;
  }

  static hasTag(): boolean {
    return Log._hasTag;
  }
  static keepTag(): void {
    Log._hasTag = true;
  }
  static discardTag(): void {
    Log._hasTag = false;
  }

  static dbg(tag: string, msg?: any, ...opt: any[]): void {
    Log.write(Log.LEVEL_DBG, tag, msg, ...opt);
  }
  static inf(tag: string, msg?: any, ...opt: any[]): void {
    Log.write(Log.LEVEL_INF, tag, msg, ...opt);
  }
  static wrn(tag: string, msg?: any, ...opt: any[]): void {
    Log.write(Log.LEVEL_WRN, tag, msg, ...opt);
  }
  static err(tag: string, msg?: any, ...opt: any[]): void {
    Log.write(Log.LEVEL_ERR, tag, msg, ...opt);
  }
  static wtf(tag: string, msg?: any, ...opt: any[]): void {
    Log.write(Log.LEVEL_WTF, tag, msg, ...opt);
  }

  private static write( level: number
                      , tag: string
                      , msg?: any
                      , ...opt: any[]): void {
    if (!Log._available) {
      return;
    }
    if (Log._filterLevel > level) {
      return;
    }
    if (Log.FILTER_TAG_ALL != Log._filterTag && tag != Log._filterTag) {
      return;
    }
    const head = Log.buildHead(level, tag);
    if ("string" === typeof(msg)) {
      Log.writeMessage(level, (head + " " + msg), ...opt);
    } else {
      if (undefined === msg) {
        Log.writeMessage(level, head, ...opt);
      } else {
        Log.writeMessage(level, head, msg, ...opt);
      }
    }
  }

  private static buildHead(level: number, tag: string): string {
    let head = "";
    if (Log._hasTimestamp) {
      head += Log.buildDate();
    }
    if (Log._hasLevel) {
      if ("" != head) {
        head += " | ";
      }
      head += Log.buildLevel(level);
    }
    if (Log._hasTag) {
      if ("" != head) {
        head += " | ";
      }
      head += tag;
    }
    if ("" != head) {
      head = "[ " + head + " ] ";
    }
    return head;
  }

  private static buildDate(): string {
    const d = new Date();
    const year = d.getFullYear().toString();
    const month = (d.getMonth() + 1).toString();
    const date = d.getDate().toString();
    const hour = d.getHours().toString();
    const min = d.getMinutes().toString();
    const sec = d.getSeconds().toString();
    const msec = d.getMilliseconds().toString();
    return   Log.fix(year, 4)
           + "-"
           + Log.fix(month, 2)
           + "-"
           + Log.fix(date, 2)
           + "."
           + Log.fix(hour, 2)
           + ":"
           + Log.fix(min, 2)
           + ":"
           + Log.fix(sec, 2)
           + "."
           + Log.fix(msec, 3);
  }

  private static buildLevel(level: number): string {
    switch (level) {
      case Log.LEVEL_DBG:
        return "DBG";
      case Log.LEVEL_INF:
        return "INF";
      case Log.LEVEL_WRN:
        return "WRN";
      case Log.LEVEL_ERR:
        return "ERR";
      case Log.LEVEL_WTF:
        return "WTF";
      default:
        return "UKN";
    }
  }

  private static writeMessage(level: number, s: string, ...opt: any[]): void {
    switch (level) {
      case Log.LEVEL_DBG:
        Log._output.dbg(s, ...opt);
        break;
      case Log.LEVEL_INF:
          Log._output.inf(s, ...opt);
        break;
      case Log.LEVEL_WRN:
        Log._output.wrn(s, ...opt);
        break;
      case Log.LEVEL_ERR:
        Log._output.err(s, ...opt);
        break;
      case Log.LEVEL_WTF:
        Log._output.wtf(s, ...opt);
        break;
      default:
        break;
    }
  }

  private static fix(s: string, len: number): string {
    let ret = s;
    if (len < 0) {
      return ret;
    }
    const padding = len - s.length;
    for (let i = 0; i < padding; ++i) {
      ret = "0" + ret;
    }
    return ret;
  };
}
