import {
    useAttributeDispatch,
    useMetadata,
} from "../../../../contexts/MetadataContext";
import {Grid} from "../../../commons/Grid";
import {TextBox} from "../../../commons/TextBox";
import RangeBox from "../../../commons/RangeBox";
import {DropBox} from "../../../commons/DropBox";


export default function AttributeList() {
    const metadata = useMetadata();
    const attributes = metadata ? metadata.attributes : [];
    const hospital = metadata ? metadata.name : '';
    const { setText, setRange, setCheckbox } = useAttributeDispatch();
    return <Grid>
        {attributes.map((attribute) => {
            switch (attribute.option) {
                case "text":
                    return <TextBox
                        key={hospital + attribute.name}
                        label={attribute.name}
                        placeholder={attribute.type}
                        setText={(value) => setText(attribute.name, value)}
                    />
                case "checkbox":
                    return <DropBox
                        key={hospital + attribute.name}
                        label={attribute.name}
                        options={attribute.list}
                        select={(value) => setCheckbox(attribute.name, value)}
                    />
                case "range":
                    return <RangeBox
                        key={hospital + attribute.name}
                        label={attribute.name}
                        setRange={(start, end) => setRange(attribute.name, start, end)}
                    />
                default:
                    return null;
            }
        })}
    </Grid>
}