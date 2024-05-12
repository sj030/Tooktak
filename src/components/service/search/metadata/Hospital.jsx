import {DropBox} from "../../../commons/DropBox";
import { useHospitals, useSetHospital} from "../../../../contexts/MetadataContext";

export default function Hospital() {
    const hospitals=useHospitals();
    const setHospital = useSetHospital();
    return <DropBox label="병원"
                    options={hospitals}
                    select={setHospital}
    />
}
