// eslint-disable-next-line no-unused-vars
import React from "react";
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';


const Download = (props) => {
    // const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    // const fileExtension = '.xlsx';

    let wb = XLSX.utils.book_new();
    wb.Props = {
        Title: "Table",
        Subject: "Test",
        Author: "UriStrix",
        CreatedDate: new Date()
    };

    wb.SheetNames.push("table");

    let ws_data = [['hello' , 'world'],['lol', 'kek']];
    wb.Sheets["table"] = XLSX.utils.aoa_to_sheet(ws_data);

    let wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});

     const s2ab = (s) => {
        let buf = new ArrayBuffer(s.length);                                //convert s to arrayBuffer
        let view = new Uint8Array(buf);                                     //create uint8array as viewer
        for (let i=0; i<s.length; i++) view[i] = s.charCodeAt(i) & 0xFF;    //convert to octet
        return buf;
    }

    const ret = ()=>{FileSaver.saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'table.xlsx');}

    return <button className="btn-floating btn-large waves-effect waves-light light-blue button"
            type='submit' onClick= {ret}>
        <i className="material-icons left">get_app</i>
    </button>
}

export default Download


