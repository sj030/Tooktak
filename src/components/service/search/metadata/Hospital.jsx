import {DropBox} from "../../../commons/DropBox";
import {useEffect, useState} from "react";
import {useAttributeDispatch} from "../../../../contexts/FilterContext";
import {getMetadata} from "../../../../services/hospital";

export default function Hospital() {
    const [metadata, setMetadata] = useState(null);
    const attributeDispatch = useAttributeDispatch();
    const useSetHospital = (hospital) => {
        attributeDispatch({
            type: "reset",
            payload: metadata ? metadata.filter(item=>item.name===hospital)[0].attributes : []
        });
    }
    useEffect(() => {
        setMetadata(getMetadata())
    }, []);

    return <DropBox label="병원"
                    options={metadata ? metadata.map((data) => data.name) : []}
                    select={useSetHospital}
    />
}
