import { Workbook, Worksheet } from 'exceljs';
import * as fs from 'fs';

export const CreateExcel = (
    filename: string,
    sheet: string = 'Report',
    data: any,
    template: 'none' | 'medical' = 'none',
    company_data?: any,
    path: string = `excel/`
): Promise<string> => {
    return new Promise((resolve) => {
        if (data.length <= 0) resolve(null);

        const rows = data.map(doc => Object.values(doc));
        const keys = Object.keys(data[0]);

        const book = new Workbook();
        const addSheet = book.addWorksheet(sheet);

        switch (template) {
            case 'medical':
                medicalTemplate(
                    addSheet,
                    rows,
                    keys,
                    book,
                    company_data
                );
                break;
            default:
                none(addSheet, rows, keys);
                break;
        }

        const FILE = `${path}${filename}.xlsx`;
        const URL_PATH = `public/storage/${FILE}`;
        if (fs.existsSync(path)) book.xlsx.writeFile(URL_PATH);
        else {
            fs.mkdirSync(`public/storage/excel`, { recursive: true });
            book.xlsx.writeFile(URL_PATH);
        }
        resolve(FILE);
    });
}
const none = (addSheet: Worksheet, rows: any[], keys: string[]) => {

    rows.unshift(keys);
    addSheet.addRows(rows);

    for (let index = 1; index <= keys.length; index++) {
        addSheet.getColumn(index).width = 25;
    }
    addSheet.getRow(1).font = { size: 11.5, bold: true, color: { argb: 'FFFFFF' } };
    addSheet.getRow(1).fill = { type: 'pattern', pattern: 'solid' }
    addSheet.getRow(1).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }

    addSheet.getRow(1).border = {
        top: { style: 'thin', color: { argb: '000000' } },
        left: { style: 'thin', color: { argb: 'FFFFFF' } },
        bottom: { style: 'thin', color: { argb: '000000' } },
        right: { style: 'thin', color: { argb: 'FFFFFF' } },
    };
}

const medicalTemplate = (
    addSheet: Worksheet,
    rows: any[],
    keys: string[],
    workbook: Workbook,
    company: any
) => {

    // Header and company info 
    const logo = './public/img/logo.png';
    addSheet.getColumn(1).width = 25;

    const imageId = workbook.addImage({
        filename: logo,
        extension: 'jpeg',
    });

    addSheet.addImage(imageId, 'A1:A3');

    addSheet.getColumn(2).width = 50;
    addSheet.getColumn(3).width = 50;
    const company_data = [
        '',
        `${company?.email}\n${company?.phone}\n${company?.address}`
    ]
    addSheet.addRow(company_data);
    addSheet.getRow(1).alignment = { vertical: 'middle', wrapText: true }
    addSheet.getRow(1).border = {
        bottom: { style: 'thin', color: { argb: 'FFFFFF' } }
    }
    addSheet.getRow(1).font = { size: 12 }

    addSheet.getCell('B3').value = 'HISTORIAL MEDICO';
    addSheet.getRow(3).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true }
    addSheet.getRow(3).font = { bold: true, size: 16 };

    [
        'A4', 'B4', 'C4',
        'A6', 'B6', 'C6',
        'A8', 'B8', 'C8',
        'A10', 'B10', 'C10',
        'A12', 'B12', 'C12',
        'A14',
        'A16',
    ].map((key, index, self) => {
        const cell = addSheet.getCell(key);
        if (index === self.length - 1) {
            addSheet.mergeCells('A14:C14');
            addSheet.mergeCells(`${key}:C16`);
        }
        cell.value = keys[index];
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: '808080' },
            bgColor: { argb: '808080' }
        };
        cell.font = { bold: true, size: 12, color: { argb: 'FFFFFF' } };
        cell.alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
        cell.border = {
            top: { style: 'thin', color: { argb: '000000' } },
            left: { style: 'thin', color: { argb: '000000' } },
            bottom: { style: 'thin', color: { argb: '000000' } },
            right: { style: 'thin', color: { argb: '000000' } },
        }
    });
    addSheet.getRow(15).height = 50;
    addSheet.mergeCells('A15:C15');
    addSheet.getRow(17).height = 50;
    addSheet.mergeCells('A17:C17');
    [
        'A5', 'B5', 'C5',
        'A7', 'B7', 'C7',
        'A9', 'B9', 'C9',
        'A11', 'B11', 'C11',
        'A13', 'B13', 'C13',
        'A15',
        'A17',
    ].map((key, index) => {
        const cell = addSheet.getCell(key);
        cell.value = rows[0][index];
        cell.border = {
            top: { style: 'thin', color: { argb: '000000' } },
            left: { style: 'thin', color: { argb: '000000' } },
            bottom: { style: 'thin', color: { argb: '000000' } },
            right: { style: 'thin', color: { argb: '000000' } },
        }
    })
    
}