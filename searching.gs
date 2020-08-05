var fieldMap = new Map();
fieldMap.set('шифру','E3')
        .set('лаборатории','C6')
        .set('ФИО','C2');

function searchField() {
  return SpreadsheetApp.getActiveSheet().getRange('B3').getValue();
}

function isArchivedSearch() {
  return SpreadsheetApp.getActiveSheet().getRange('C4').getValue();
}

function isCurrentSearch() {
  return SpreadsheetApp.getActiveSheet().getRange('D4').getValue();
}

function searchNew() {
  var resultIds = [];
  var field = searchField();
  var query = SpreadsheetApp.getUi().prompt('Введите запрос для поиска по ' + field).getResponseText();
  if (isArchivedSearch()) {
    console.log('Start archived search');
    var files = DriveApp.getFolderById(completedFolderId).getFilesByType(MimeType.GOOGLE_SHEETS)
    while (files.hasNext()) {
      var fileId = files.next().getId();
      console.log('Analyzing id ' + fileId);
      if (isResult(fileId, query, field)) {
        console.log('Pushing ' + fileId);
        resultIds.push(fileId);
        
      }
    }
  }
if (isCurrentSearch()) {
    var files = DriveApp.getFolderById(requestFolderId).getFiles();
    while (files.hasNext()) {
      var fileId = files.next().getId();
      if (isResult(fileId, query, field)) {
        resultIds.push(fileId);
      }
    }
  }
  console.log(resultIds);
  return resultIds;
}

function isResult(id, query, field) {
  var regex = new RegExp(query, 'i');
  var text = SpreadsheetApp.openById(id).getSheets()[0].getRange(fieldMap.get(field)).getDisplayValue();
  return regex.test(text);
}

function displayResults(resultIds) {
  var resultsSheet = SpreadsheetApp.getActive().getSheetByName('results').clear();
  
  for (i = 0; i < resultIds.length; i++) {
    var ss = SpreadsheetApp.openById(resultIds[i]).getSheets()[0];
    var url = ss.getParent().getUrl();
    var name = ss.getRange('C2').getValue();
    var reqDate = ss.getRange('E2').getValue();
    var lab = ss.getRange('C6').getValue();
    var cifer = ss.getRange('E3').getValue();
    var experimentDate = ss.getRange('I2').getValue();
    resultsSheet.appendRow([reqDate, url, lab, name, cifer, experimentDate]);
  }
}

function searchAndDisplay() {
  displayResults(searchNew());
  
}
