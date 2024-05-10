import {useAttributeDispatch} from "../../../../contexts/FilterContext";
import {TextBox} from "../../../commons/TextBox";

export default function TextAttribute({name}) {
    const dispatch = useAttributeDispatch();
    const setText = (value) => {
        dispatch({
            type: "text",
            name: name,
            value: value
        })
    }
    return (
        <TextBox
            label={name}
            placeholder={name}
            setText={setText}
        />
    );
}