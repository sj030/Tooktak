import Modal from "../../../commons/Modal";
import ProgressBar from "../../../commons/ProgressBar";

export default function DownloadModal({progress,active, setActive}) {
    return <Modal body={<>
        <ProgressBar percent={progress.percent}/>
        <p>{progress.message}</p>
    </>}
                  onClose={() => {
                  }}
                  title={"Downloading..."}
                  active={active}
                  setActive={setActive}
    />
}