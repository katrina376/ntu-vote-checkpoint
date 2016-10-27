var station_id;
var step_id;
var to_step_id;
var station_name;
var to_step_name;
var to_step_description;
var has_next_button;

function doGet(e) {
  if (!e.parameter.s) {
    return HtmlService.createHtmlOutputFromFile('404')
                      .setSandboxMode(HtmlService.SandboxMode.IFRAME);
  }

  station_id = (e.parameter.s) ? e.parameter.s : 1;
  step_id = currentStep(station_id);
  to_step_id = step_id + 1;

  station_name = rangelist('station')[station_id]['name'].getValue();
  to_step_name = rangelist('step')[to_step_id]['name'].getValue();
  to_step_description = rangelist('step')[to_step_id]['description'].getValue();
  has_next_button = (to_step_id < getStepsNum(rangelist('step'))) ? true : false;
  url = ScriptApp.getService().getUrl();

  return HtmlService.createTemplateFromFile('view')
                    .evaluate()
                    .setSandboxMode(HtmlService.SandboxMode.IFRAME)
                    .setTitle("NTUVote-checkpoint")
                    .addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function getStepData(sid) {
  return ({
    "step_id": sid,
    "step_name": rangelist('step')[sid]['name'].getValue(),
    "step_description": rangelist('step')[sid]['description'].getValue()
  });
}

function include(filename){
    return HtmlService.createTemplateFromFile(filename).evaluate().getContent();
}

function process(d) {
  var current = new Date();

  openSheet(SHEET_NAMES['log']).appendRow([current, d.station_id, d.to_step_id]);
  rangelist('state')[d.station_id][d.to_step_id].setValue(current);

  new_step_id = Number(d.to_step_id) + 1;

  return ({
    "step_id": new_step_id,
    "step_name": rangelist('step')[new_step_id]['name'].getValue(),
    "step_description": rangelist('step')[new_step_id]['description'].getValue(),
    "has_next_button": (new_step_id < getStepsNum(rangelist('step'))) ? true : false
  });
}

function getStepsNum(r) {
  var len = 0;

  for (var k in r) {
    len++;
  }

  return len;
}

function currentStep(station_id) {
  var states = rangelist('state')[station_id];
  var current = 0;

  for (var i = 1; i <= getStepsNum(rangelist('step')); ++i) {
    if (!states[i].getValue()) {
      current = i - 1;
      break;
    }
  }

  return current;
}

function openSheet(name) {
  return SpreadsheetApp.openById(DB_ID).getSheetByName(SHEET_NAMES[name]);
}

function rangelist(name) {
  var table = openSheet(name);
  var items = table.getRange("1:1").getValues();
  var nums = table.getRange("A:A").getValues();

  var res = {};

  for (var row = 1; row < nums.length; ++row) {
    var rowObj = {};
    var num = nums[row][0];

    for (var col = 1; col < items[0].length; ++col) {
      var item = items[0][col];
      rowObj[item] = table.getRange(row+1,col+1);
    }

    res[num] = rowObj;
  }

  return res;
}
