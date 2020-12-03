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

  const handleClose = (): void => (
    onHide()
  );

  return (
    <>
      {
        image && (
          <ImageModals show={show} onHide={handleClose}>
            <ModalDialog centered>
              <ImageContent src={image.url} />
            </ModalDialog>
          </ImageModals>
        )
      }
    </>
  );
};

const ImageModals = styled(Modal)({
  '.modal-content': {
    maxWidth: 'none',
    backgroundColor: 'rgba(0,0,0,0)',
    border: 'none',
  },

  '.modal-dialog': {
    maxWidth: 'none',
    width: 'fit-content',
  },
});

const ImageContent = styled(Image)({
  maxHeight: '80vh',
  margin: '0 auto',
});

export default ImageModal;
