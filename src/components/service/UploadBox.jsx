import {InputFile} from "../commons/InputFile";
import {Grid} from "../layout/Grid";


export default function UploadBox() {
    return (
        <Grid>
            <InputFile color={"red"} label={"metadata file"}/>
            <InputFile color={"blue"}  label={"data file"}/>
        </Grid>
    );
}