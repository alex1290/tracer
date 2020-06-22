import React, { useState } from 'react';
import { Segment, Form, Button, Message, Input } from 'semantic-ui-react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import xlsx from 'xlsx'

const UrlGenerator = props => {
    const [email, setEmail] = useState("")
    const [url, setUrl] = useState(null)
    const [excel, setExcel] = useState(null)
    const [sheetName, setSheetName] = useState("")
    const [fileName, setFileName] = useState("")
    const [mutiDataError, setMutiDataError] = useState(null)

    const generateUrl = str => {
        let webUrl = "https://wicanvas.wistron.com/?id="
        let encode = btoa(str)
        let result = webUrl + encode
        return result
    }

    const readFile = e => {
        setMutiDataError(null)
        setExcel(null)
        const file = e.target.files;
        const reader = new FileReader();
        let result = [];
        reader.onload = (ev) => {
            try {
                var data = ev.target.result
                var workbook = xlsx.read(data, { type: 'binary' })
            } catch (e) {
                console.log('fail');
                return;
            }
            var fromTo = '';
            // 遍歷每張表讀取
            for (let sheet in workbook.Sheets) {
                setSheetName(sheet);
                if (workbook.Sheets.hasOwnProperty(sheet)) {
                    fromTo = workbook.Sheets[sheet]['!ref'];
                    result = result.concat(xlsx.utils.sheet_to_json(workbook.Sheets[sheet]));
                    break;
                }
            }
            let hasEmail = false
            result.forEach(i => {
                for (let key in i) {
                    if (key === 'email') {
                        hasEmail = true
                        i["url"] = generateUrl(i[key])
                    }
                }
            })
            if (hasEmail) {
                setExcel(result)
                setFileName(file[0].name)
            } else {
                setMutiDataError("沒有Email欄位")
                setSheetName("");
            }

        }
        reader.readAsBinaryString(file[0]);
    }

    // 将workbook装化成blob对象
    function workbook2blob(workbook) {
        // 生成excel的配置项
        var wopts = {
            // 要生成的文件类型
            bookType: 'xlsx',
            // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
            bookSST: false,
            // 二进制类型
            type: 'binary'
        }
        var wbout = xlsx.write(workbook, wopts)
        var blob = new Blob([s2ab(wbout)], {
            type: 'application/octet-stream'
        })
        return blob
    }

    function s2ab(s) {
        var buf = new ArrayBuffer(s.length)
        var view = new Uint8Array(buf)
        for (var i = 0; i != s.length; ++i) {
            view[i] = s.charCodeAt(i) & 0xff
        }
        return buf
    }

    function openDownloadDialog(blob, fileName) {
        if (typeof blob == 'object' && blob instanceof Blob) {
            blob = URL.createObjectURL(blob) // 创建blob地址
        }
        var aLink = document.createElement('a')
        aLink.href = blob
        // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，有时候 file:///模式下不会生效
        aLink.download = fileName || ''
        var event
        if (window.MouseEvent) event = new MouseEvent('click')
        //   移动端
        else {
            event = document.createEvent('MouseEvents')
            event.initMouseEvent(
                'click',
                true,
                false,
                window,
                0,
                0,
                0,
                0,
                0,
                false,
                false,
                false,
                false,
                0,
                null
            )
        }
        aLink.dispatchEvent(event)
        URL.revokeObjectURL(blob)
    }

    const downloadFile = () => {
        const data = excel
        let wb = xlsx.utils.book_new()
        let sheet = xlsx.utils.json_to_sheet(data)
        xlsx.utils.book_append_sheet(wb, sheet, sheetName)
        const workbookBlob = workbook2blob(wb)
        openDownloadDialog(workbookBlob, fileName)
    }

    return (
        <Segment basic>
            <Segment>
                <Form>
                    <Form.Field>
                        <label>單筆資料</label>
                        <input placeholder='請輸入E-mail' value={email} onChange={e => { setEmail(e.target.value); setUrl(null); }} />
                    </Form.Field>
                    <CopyToClipboard text={email !== "" && generateUrl(email)}
                        onCopy={() => setUrl(generateUrl(email))}>
                        <Button type="submit" disabled={email === ""}>產生URL</Button>
                    </CopyToClipboard>
                </Form>
                {
                    url && <Message success header="URL產生並複製到剪貼簿成功!" />
                }
            </Segment>
            <Segment>
                <Message warning content="只接受 .xlsx 的Excel檔案，且必須有Email欄位" />
                <Form>
                    <Form.Field>
                        <label>多筆資料</label>
                        <Input placeholder='請放入 Excel 檔案' id="excelFile" type="file" accept=".xlsx" onChange={e => readFile(e)} />
                    </Form.Field>
                </Form>
                {
                    excel && (
                        <Message success>
                            <Message.Header>檔案轉存成功</Message.Header>
                            <Message.Content><button color="green" onClick={() => downloadFile()}>下載檔案</button></Message.Content>
                        </Message>
                    )
                }
                {
                    mutiDataError && (
                        <Message negative content={mutiDataError} />
                    )
                }
            </Segment>
        </Segment>
    )
}

export default UrlGenerator;