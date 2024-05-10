import {useAttributes} from "../../../../contexts/FilterContext";
import {SelectAttribute} from "./SelectAttribute";
import RangeAttribute from "./RangeAttribute";
import TextAttribute from "./TextAttribute";
import {Grid} from "../../../commons/Grid";


export default function AttributeList() {
    const attributes = useAttributes();
    return <Grid>
            {attributes.map((attribute) => {
                switch (attribute.option) {
                    case "text":
                        return <TextAttribute
                            key={attribute.name}
                            name={attribute.name}
                        />
                    case "checkbox":
                        return <SelectAttribute
                            key={attribute.name}
                            name={attribute.name}
                            options={attribute.list}
                        />
                    case "range":
                        return <RangeAttribute
                            key={attribute.name}
                            name={attribute.name}
                        />
                    default:
                        return null;
                }
            })}
    </Grid>
}