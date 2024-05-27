import {Button} from "../../../commons/Button";
import {useDownload} from "../../../../contexts/FileContext";
import {getDownload} from "../../../../services/download";

export default function DownloadFooter({setProgress, setActive}) {
    const download = useDownload();
    return <Button children={"다운로드"} onClick={async () => {
        try {
            const opts = {
                types: [
                    {
                        description: 'Zip Files',
                        accept: {'application/zip': ['.zip']}
                    },
                ],
            };
            const handle = await window.showSaveFilePicker(opts);
            const writable = await handle.createWritable();
            const {data: {zipId, fileSize}} = await download();
            setActive(true);
            await getDownload(zipId, fileSize, setProgress);
            await writable.close();
            alert('파일 다운로드 완료!');
            setActive(false);
        } catch (error) {
            console.error('파일 다운로드 중 오류 발생:', error);
        }
    }
    }/>
}