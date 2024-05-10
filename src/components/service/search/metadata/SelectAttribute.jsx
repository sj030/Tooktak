import {useAttributeDispatch} from "../../../../contexts/FilterContext";
import {DropBox} from "../../../commons/DropBox";

export function SelectAttribute({name,options}) {
    const dispatch=useAttributeDispatch();
    const setCbx = (value) => {
        dispatch({
            type: "checkbox",
            name: name,
            value: value
        })
    }
    return (
        <DropBox
            label={name}
            options={options}
            select={setCbx}
        />
    );
}
