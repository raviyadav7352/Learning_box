const DeleteYesModal = ({ isOpen, onClose, onConfirm, pdfToDelete }) => {
    if (!isOpen) return null;

    return (
            <div className="modal-content borderR12 p10 pT5 bg-white">
                <p className="fs14 fw-500 color-theme ">Are you sure to delete</p>
                <p className=" color-success fw-500 ellipsis  fs12">{pdfToDelete && pdfToDelete.name}?</p>
                <div className="modal-buttons flex justify gap10 mT10">
                    <button className="u-btn u-btn-plain xsm" onClick={() => onConfirm(pdfToDelete.ref)}>Confirm</button>
                    <button className="u-btn u-btn-primary xsm" onClick={onClose}>Cancel</button>
                </div>
            </div>
    );
};
      
export default DeleteYesModal 