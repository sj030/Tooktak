import {DropBox} from "../../../commons/DropBox";
import {useAttributes, useAttributeVisible, useHospital, useHospitals} from "../../../../contexts/MetadataContext";
import CheckItem from "../../../commons/CheckItem";

export default function Hospital() {
    const hospitals = useHospitals();
    const {hospital, setHospital} = useHospital();
    const attributes = useAttributes();
    const setVisibility = useAttributeVisible();
    return <div className="level">
        <DropBox label="병원"
                 options={hospitals}
                 setValue={setHospital}
                 value={hospital}
        />
        <div className="box">
            {attributes.map((item) => <CheckItem
                key={hospital + item.name}
                label={item.name}
                setChecked={() => setVisibility(item.name, !item.visible)}/>)}
        </div>
    </div>
}