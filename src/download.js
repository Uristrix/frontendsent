// eslint-disable-next-line no-unused-vars
import React from "react";
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
const Download = (data) =>
{
    let wb = XLSX.utils.book_new();
    wb.Props = {
        Title: "SheetJS Tutorial",
        Subject: "Test",
        Author: "UriStrix",
        CreatedDate: new Date()
    };

    wb.SheetNames.push("Test Sheet");
    let ws_data = [['hello' , 'world']];
    let ws = XLSX.utils.aoa_to_sheet(ws_data);
    wb.Sheets["Test Sheet"] = ws;
    let wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});
    let s2ab = (s)=> {

        let buf = new ArrayBuffer(s.length);
        let view = new Uint8Array(buf);
        for (let i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;
        return buf;

    }
    return ()=>{
        FileSaver.saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'test.xlsx');
    };
}

export default Download


