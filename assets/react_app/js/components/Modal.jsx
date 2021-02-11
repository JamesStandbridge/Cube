import React, {useState} from "react";
import Modal from '@material-ui/core/Modal';


const CustomModal = ({btnTitle, children}) => {
    const [open, setOpen] = useState(false)

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    console.log(children)
    return (
        <div>
            <button onClick={handleOpen}>{btnTitle}</button>
            <Modal
            open = {open}
            onClose = {handleClose}

            >
                {children}
            </Modal>
        </div>
    )

}

export default CustomModal