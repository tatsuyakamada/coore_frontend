import React from 'react';
import { Image, Modal, ModalDialog } from 'react-bootstrap';
import styled from 'styled-components';

import { Image as ImageType } from '../../interfaces/domains/image';

type Props = {
  show: boolean;
  image: ImageType | null;
  onHide: () => void;
};

const ImageModal: React.FC<Props> = (props) => {
  const { show, image, onHide } = props;

  const handleClose = (): void => onHide();

  return (
    <>
      {
        image && (
          <ImageModals show={show} centered onHide={handleClose}>
            <ModalDialog centered>
              <ImageContent src={image.url} style={{ maxWidth: '90vh' }} />
            </ModalDialog>
          </ImageModals>
        )
      }
    </>
  );
};

const ImageModals = styled(Modal)`
  .modal-content {
    max-width: none;
    background-color: rgba(0, 0, 0, 0);
    border: none;
  };

  .modal-dialog {
    max-width: none;
    width: fit-content;
  };
`;

const ImageContent = styled(Image)`
  max-height: 80vh;
  width: 100%;
  margin: 0 auto;
`;

export default ImageModal;
