/**
 * ECEE — Militant Take Over vote tracker
 * Bound to: https://docs.google.com/spreadsheets/d/1bmuLWDGUB8Bj1isX46eh3EomRwcaD1dI
 *
 * Deploy once:
 *  1. Open the Google Sheet
 *  2. Extensions → Apps Script
 *  3. Paste this file, Save
 *  4. Deploy → New deployment → Web app
 *       Execute as: Me
 *       Who has access: Anyone
 *  5. Copy the /exec URL into VOTE_SHEET.appsScriptUrl in src/lib/event.ts
 */

var SHEET_ID = "1bmuLWDGUB8Bj1isX46eh3EomRwcaD1dI";
var LOG_NAME = "VoteLog";
var SONGS = [
  "WIN",
  "RATHER BE",
  "MORE",
  "LEAN",
  "KITGUM",
  "GAME OVER",
  "BROKE BOYZ",
  "MILITIA",
];

function doGet(e) {
  return handle_(e);
}

function doPost(e) {
  return handle_(e);
}

function handle_(e) {
  var p = (e && e.parameter) || {};
  var result = recordVote_(p);
  var payload = JSON.stringify(result);
  var cb = p.callback;
  var mime = cb
    ? ContentService.MimeType.JAVASCRIPT
    : ContentService.MimeType.JSON;
  var body = cb ? cb + "(" + payload + ")" : payload;
  return ContentService.createTextOutput(body).setMimeType(mime);
}

function recordVote_(p) {
  var lock = LockService.getScriptLock();
  lock.waitLock(15000);
  try {
    var ss = SpreadsheetApp.openById(SHEET_ID);
    var log = ss.getSheetByName(LOG_NAME);
    if (!log) {
      log = ss.insertSheet(LOG_NAME);
      log.appendRow([
        "Timestamp",
        "Song",
        "Song ID",
        "Previous",
        "Client ID",
        "Source",
      ]);
      log.getRange(1, 1, 1, 6).setFontWeight("bold");
      log.setFrozenRows(1);
    }

    var song = String(p.song || "").toUpperCase().trim();
    if (SONGS.indexOf(song) === -1) {
      return { ok: false, error: "Unknown song" };
    }

    log.appendRow([
      new Date(),
      song,
      p.songId || "",
      p.previous || "",
      p.clientId || "",
      p.source || "website",
    ]);

    refreshDashboard_(ss);

    return { ok: true, song: song };
  } catch (err) {
    return { ok: false, error: String(err) };
  } finally {
    lock.releaseLock();
  }
}

function refreshDashboard_(ss) {
  var log = ss.getSheetByName(LOG_NAME);
  var dash = ss.getSheets()[0];
  if (!log || !dash) return;

  var values = log.getDataRange().getValues();
  var counts = {};
  SONGS.forEach(function (s) {
    counts[s] = 0;
  });
  for (var i = 1; i < values.length; i++) {
    var name = String(values[i][1] || "").toUpperCase().trim();
    if (counts.hasOwnProperty(name)) counts[name] += 1;
  }

  var last = dash.getLastRow();
  var data = dash.getRange(1, 1, last, 6).getValues();
  var total = 0;
  SONGS.forEach(function (s) {
    total += counts[s];
  });

  for (var r = 0; r < data.length; r++) {
    var title = String(data[r][1] || "").toUpperCase().trim();
    if (!counts.hasOwnProperty(title)) continue;
    var votes = counts[title];
    var pct = total ? votes / total : 0;
    dash.getRange(r + 1, 4).setValue(votes);
    dash.getRange(r + 1, 5).setValue(pct);
  }
}
