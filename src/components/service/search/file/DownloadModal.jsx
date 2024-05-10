import Modal from "../../../commons/Modal";

export default function DownloadModal({active, setActive}) {
    return <Modal body={"downloading"}
                  onClose={() => {
                  }}
                  title={"Downloading..."}
                  active={active}
                  setActive={setActive}
    />
}