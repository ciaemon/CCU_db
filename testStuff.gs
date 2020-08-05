function onSelectionChange(e) {
  if (SpreadsheetApp.getActiveSheet().getName() == 'Current request') {
    SpreadsheetApp.getUi().alert('Changing!');
  }
}
