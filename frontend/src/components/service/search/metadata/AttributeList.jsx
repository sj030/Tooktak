import {
    useAttributeDispatch,
    useMetadata,
} from "../../../../contexts/MetadataContext";
import {Grid} from "../../../layout/Grid";
import {TextBox} from "../../../commons/TextBox";
import RangeBox from "../../../commons/RangeBox";
import {DropBox} from "../../../commons/DropBox";


export default function AttributeList() {
    const {hospital,attributes} = useMetadata();
    const { setAttribute } = useAttributeDispatch();
    return <Grid>
        {attributes.map((attribute) => {
            if(attribute.visible) {
                switch (attribute.option) {
                    case "text":
                        return <TextBox
                            key={hospital + attribute.name}
                            label={attribute.name}
                            placeholder={"(전체선택)"}
                            setValue={(value) => setAttribute(attribute.name, value)}
                            value={attribute.value}
                        />
                    case "checkbox":
                        return <DropBox
                            key={hospital + attribute.name}
                            label={attribute.name}
                            options={attribute.list}
                            setValue={(value) => setAttribute(attribute.name, value)}
                            value={attribute.value}
                        />
                    case "range":
                        return <RangeBox
                            key={hospital + attribute.name}
                            label={attribute.name}
                            setStart={(start) => setAttribute(attribute.name, {...attribute.value, min: start})}
                            setEnd={(end) => setAttribute(attribute.name, {...attribute.value, max: end})}
                            value={attribute.value}
                            placeholder1={"(전체선택)"}
                            placeholder2={"(전체선택)"}
                        />
                    default:
                        return null;
                }
            }else{
                return null;
            }
        })}
    </Grid>
}