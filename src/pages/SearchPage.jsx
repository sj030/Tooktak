import FilterBox from "../components/serviceComponents/FilterBox";
import FileList from "../components/serviceComponents/Filelist";
import { useEffect, useState } from "react";
import { getFile, getFilter } from "../services/search";
import { downloadFile } from "../services/download";
export default function Search() {
  const [filter, setFilter] = useState({});
  const [fileList, setFileList] = useState([]);
  const [selectFile, setSelectFile] = useState([]);
  //get filter data
  useEffect(() => {
    getFilter();
  }, []);
  //get file list
  const onSearch = () => {
    getFile(filter);
  };
  const onDownload = () => {
    downloadFile(selectFile);
  };
  return (
    <>
      <FilterBox />
      <FileList />
    </>
  );
}
