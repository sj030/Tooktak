import {FileInputBox} from "../commons/FileInputBox";
import {Grid} from "../layout/Grid";


export default function UploadBox() {
    return (
        <Grid>
            <FileInputBox color={"red"} label={"metadata file"}/>
            <FileInputBox color={"blue"} label={"data file"}/>
        </Grid>
    );
}