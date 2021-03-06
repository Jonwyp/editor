import React from "react";
import { Header, Modal, Button, Icon } from "semantic-ui-react";

const ConfirmDeleteModal = ({
  openDeleteModal,
  confirmDelete,
  closeDeleteModal
}) => {
  return (
    <Modal open={openDeleteModal} onClose={closeDeleteModal}>
      <Header content="Delete" />
      <Modal.Content>
        <p>Delete article?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button
          aria-label="close save message"
          color="green"
          onClick={confirmDelete}
        >
          <Icon name="checkmark" /> Yes
        </Button>
        <Button
          aria-label="close save message"
          color="red"
          onClick={closeDeleteModal}
        >
          <Icon name="close" /> No
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ConfirmDeleteModal;
