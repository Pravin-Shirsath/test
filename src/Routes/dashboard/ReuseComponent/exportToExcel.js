var XLSX = require("xlsx");

export const exportToExcel=(data,fileName)=> {
  console.log(data, fileName, "daaataa and fileee name")
  const worksheet = XLSX.utils.json_to_sheet(data);
const workbook = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(workbook, worksheet, fileName);
const file = XLSX.writeFile(workbook, `${fileName}.xlsx`, { type: 'array' });

const blob = new Blob([file], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = fileName;
document.body.appendChild(a);
a.click();
document.body.removeChild(a);
}
