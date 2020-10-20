
function start() {
  var ssId = SpreadsheetApp.getActive().getId();
  var folderId = requestFolderId;
  SpreadsheetApp.getActive().toast('Проверяю почту...', 'Пожалуйста, подождите');
//  unreadAttachment();
  getExcelAttachments();
  SpreadsheetApp.getActive().toast('Конвертирую заявки...', 'Пожалуйста, подождите');
  convert(folderId);
  SpreadsheetApp.getActive().toast('Добавляю новые заявки на лист...', 'Пожалуйста, подождите');
  var count = merge(folderId);
  SpreadsheetApp.flush();
  SpreadsheetApp.getActive().toast(Utilities.formatString('Было добавлено %d новых заявок', count), 'Готово!', 10);
}



function convert(folderId) {
  var folderIncoming = DriveApp.getFolderById(folderId);
  var files = folderIncoming.getFilesByType(MimeType.MICROSOFT_EXCEL);
  while (files.hasNext()) {
    var source = files.next();
    var sourceId = source.getId();
    var fileName = source.getName().replace('.xlsx', '');
    
    var file = {
        title: fileName,
      };
      
    file = Drive.Files.copy(file, sourceId, {convert: true});
    file.description = source.getDescription();    
    folderIncoming.removeFile(source);
   
    
    
  }
}
  
function merge(folderId) {
  var folderIncoming = DriveApp.getFolderById(folderId);
  var sheetFiles = folderIncoming.getFilesByType(MimeType.GOOGLE_SHEETS);
  var sheet = SpreadsheetApp.getActive().getSheetByName('IdSheet');
  sheet.getDataRange().setFontColor(null);
  var lastRow = sheet.getDataRange().getNumRows();
  var idRange = sheet.getRange(1, 2, lastRow);
  var idArray = idRange.getValues();
  var count = 0;  
  while (sheetFiles.hasNext()) {
    var currentFile = sheetFiles.next();
    
    const id = currentFile.getId();
    const reqObj = parseById(id);
    const rejectMessage = constructRejectMessage(reqObj);
    const warnMessage = constructWarnMessage(reqObj);
    const email = currentFile.getDescription();
    let message = '';
    message += rejectMessage === '' ? '' : 'Заявка отклонена по следующим причинам: \n' + rejectMessage;
    message += warnMessage === '' ? '' : 'Обратите внимание на проблемы в заявке: \n' + warnMessage;
    if (message !== '') {
      GmailApp.sendEmail(email, 'В вашей заявке с шифром ' + reqObj.cifer + 'обнаружены проблемы', message);
    }
    if (rejectMessage !== '') {
      continue;
    }
    
    if (!contains(currentFile.getId(), idArray)) {
      var accessType = DriveApp.Access.ANYONE_WITH_LINK;
      var permissionType = DriveApp.Permission.COMMENT;
      currentFile.setSharing(accessType, permissionType);
      var timeZone = SpreadsheetApp.getActive().getSpreadsheetTimeZone();
      SpreadsheetApp.open(currentFile).setSpreadsheetTimeZone(timeZone);
      sheet.appendRow([currentFile.getName(), currentFile.getId(), currentFile.getUrl()]);
      var newRow = sheet.getRange(sheet.getLastRow(), 1, 1, 3);
      newRow.setFontColor('red');
      count++;
      sendToCustomer(currentFile.getId(), 'first');
      
    }
   }
  return count;
  
}



function contains(element, idArray) {
  for (i = 0; i < idArray.length; i++) {
    if (idArray[i][0] === element) {
    return true;
    }
  }
  return false;
}

  


function getRequest() {
  var sheet = SpreadsheetApp.getActive().getSheetByName('Card');
  var cell = SpreadsheetApp.getCurrentCell();
  
  if (cell.getColumn() === 9 && cell.getRow() > 1 && cell.getSheet().getIndex() === 3 && !cell.isBlank()) {
    var extCard = sheet.getParent().getRangeByName('ExtendedCard');
    extCard.clearContent();
    var dest = sheet.getRange('A4:B4');
    dest.setValues([[cell.getValue(), DriveApp.getFileById(cell.getValue()).getUrl()]]);
    sheet.getRange('A5').setFormula('IMPORTRANGE($A$4;"A1:H29")');
    extCard.setValues(extCard.getValues());
    
  }
}

function updateRequest() {
  var ss = SpreadsheetApp.getActive();
  var card = ss.getRangeByName('RequestCard');
  var destId =  ss.getSheetByName('Card').getRange('A4').getValue();
  var destSheet = SpreadsheetApp.openById(destId).getSheets()[0];
  destSheet.clearContents();
  var destRange = destSheet.getRange(1, 1, card.getNumRows(), card.getNumColumns());
  destRange.setValues(card.getValues());
  
  if (destSheet.getRange('C15').getValue() == 'да') {
  sendToCustomer(destId, 'update');
  }
}

function sendToCustomer(requestId, type) {
  var sheet = SpreadsheetApp.openById(requestId).getSheets()[0];
  var cifer = sheet.getRange('E3').getValue();
  var email = getEmail(requestId);
  var url = DriveApp.getFileById(requestId).getUrl();
  var message = '';
  var subject = '';
  
  
  switch (type) {
    case 'update' :
      subject = Utilities.formatString('Ваша заявка с шифром %s обновлена', cifer);
      message = Utilities.formatString('Заявка доступна по следующей ссылке %s', url);
      break;
    case 'first' :
      subject = Utilities.formatString('Ваша заявка с шифром %s успешно внесена в базу', cifer);
      message = Utilities.formatString('Заявка доступна по следующей ссылке %s', url);
      break;
    case 'archive' :
      subject = Utilities.formatString('Ваша заявка с шифром %s выполнена', cifer);
      message = Utilities.formatString('Заявка доступна по следующей ссылке %s', url);
    }
  GmailApp.sendEmail(email, subject, message);  
}





