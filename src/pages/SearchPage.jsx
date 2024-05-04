import FilterBox from "../components/serviceComponents/FilterBox";
import FileList from "../components/serviceComponents/Filelist";
import { useState } from "react";
import { getFile } from "../services/search";
export default function Search() {
  const [fileList, setFileList] = useState([]);
  const onSearch = (filter) => {
    setFileList(getFile(filter));
  };
  return (
    <>
      <FilterBox onSearch={onSearch} />
      <FileList fileList={fileList} />
    </>
  );
}
