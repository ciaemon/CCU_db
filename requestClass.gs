/**
* Проверка - выполнена ли заявка
*/
function isCompleted(id) {
  var endTime = SpreadsheetApp.openById(id).getSheets()[0].getRange('I4').getValue();
  if (endTime != '') { return true; }
  return false;
 
}


function getEmail(id) {
  var ss = SpreadsheetApp.openById(id);
  var range = ss.getSheets()[0].getRange('B2:C30');
  var values = range.getValues();
  for (i = 0; i < values.length; i++) {
    if (values[i][0].indexOf('mail') != -1) {
    return values[i][1];
    }
  }
  return Session.getEffectiveUser().getEmail();

}

class Request {
  constructor(sheet) { this.sheet = sheet;}
  get custName()       { return this.sheet.getRange('C2').getValue();}
  get url()            { return this.sheet.getParent().getUrl();}
  get framesPath()     { return this.sheet.getRange('I13').getValue();}
  get reqDate()        { return this.sheet.getRange('E2').getValue();}
  get lab()            { return this.sheet.getRange('C6').getValue();}
  get organization()   { return this.sheet.getRange('C5').getValue();}
  get cifer()          { return this.sheet.getRange('E3').getValue();}
  get samplesNumber()  { return this.sheet.getRange('I7').getValue();}
  get project()        { return this.sheet.getRange('C4').getValue();}
  get operator()       { return this.sheet.getRange('I6').getValue();}
  get experimentDate() { return this.sheet.getRange('I2').getValue();}
  get instrument()     { return this.sheet.getRange('I5').getValue();}
  get startTime()      { return this.sheet.getRange('I3').getValue();}
  get endTime()        { return this.sheet.getRange('I4').getValue();}
  get result()         { return this.sheet.getRange('I9').getValue();}
  get isSendToCust()   { return this.sheet.getRange('I10').getValue();}
  get publication()    { return this.sheet.getRange('I11').getValue();}
  get comment()        { return this.sheet.getRange('G17').getValue();}
      
}

