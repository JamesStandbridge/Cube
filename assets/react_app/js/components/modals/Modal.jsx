import React, {useState, forwardRef} from "react";
import Modal from '@material-ui/core/Modal';
import CategoryForm from '../form/app/CategoryForm'

const CustomModal = ({btnTitle, children}) => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <div>
            <button onClick={handleOpen}>{btnTitle}</button>
            <Modal
                open = {open}
                onClose = {handleClose}
            >
                {React.cloneElement(children, { onCloseModal: handleClose })}
            </Modal>
        </div>
    )

}

export default CustomModal