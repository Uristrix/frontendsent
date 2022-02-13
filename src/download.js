import React from "react";
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';


const Download = (props) => {

    let wb = XLSX.utils.book_new();
    wb.Props = {
        Title: "Table",
        Subject: "Test",
        Author: "UriStrix",
        CreatedDate: new Date()
    };

    let merge = []
    let begin = 1;
    for(let el of props.data['data'])
    {
        const len = el['sentences'].length;
        for(let j = 0; j < 2; j++)
           merge.push({s:{r:begin, c:j}, e:{r:begin+len-1, c:j}})

        begin += len
    }

    const keys = Object.keys(props.data['data'][0])
        .concat(Object.keys(props.data['data'][0]['sentences'][0])).slice(0,-1)

    let arr = [keys]
    for(let el of props.data['data'])
    {
        let temp = Object.values(el).slice(0,2)
        temp[0] = temp[0].join(', ')

        for(let val of el['sentences'])
        {
            const sent = [val['text'],
                val['date/time'].join(', '),
                val['keywords'].join(', '),
                val['rest entities'].join(', ')
            ]

            arr.push(temp.concat(sent))
        }
    }

    wb.SheetNames.push("table");
    wb.Sheets['table'] = XLSX.utils.aoa_to_sheet(arr)
    wb.Sheets['table']['!merges'] = merge

    const wbout = XLSX.write(wb, {bookType:'xlsx',  type: 'binary'});

     const s2ab = (s) => {
        const buf = new ArrayBuffer(s.length);                                //convert s to arrayBuffer
        const view = new Uint8Array(buf);                                     //create uint8array as viewer

        for (let i=0; i<s.length; i++)
            view[i] = s.charCodeAt(i) & 0xFF;                                 //convert to octet

        return buf;
    }

    const ret = ()=>{FileSaver.saveAs(new Blob([s2ab(wbout)],{type:"application/octet-stream"}), 'table.xlsx');}

    return <button className="btn-floating btn-large waves-effect waves-light light-blue button"
                   style={{'opacity':'0'}}
            type='submit' onClick= {ret}>
        <i className="material-icons left">get_app</i>
    </button>
}

export default Download