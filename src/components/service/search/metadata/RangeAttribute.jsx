import {useAttributeDispatch} from "../../../../contexts/FilterContext";
import RangeBox from "../../../commons/RangeBox";

export default function RangeAttribute({name}) {
    const dispatch= useAttributeDispatch();
    const setRange = (StartOrEnd, value) => {
        dispatch({
            type: "range",
            name: name,
            [StartOrEnd]: value
        })
    }
    return (
        <RangeBox
            label={name}
            setRange={setRange}
        />
    );
}