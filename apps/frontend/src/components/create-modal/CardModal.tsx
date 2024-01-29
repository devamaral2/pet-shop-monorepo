import {
  Box,
  BoxProps as ChakraBoxProps,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { ReactNode, forwardRef, useImperativeHandle, useState } from "react";

interface PropTypes extends ChakraBoxProps {
  children: ReactNode;
  buttonContent: ReactNode;
  title: string;
}
export function Overlay() {
  return <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />;
}

export const CardModal = forwardRef(
  ({ title, children, buttonContent, ...props }: PropTypes, ref) => {
    const [overlay, setOverlay] = useState(<Overlay />);
    const { isOpen, onOpen, onClose } = useDisclosure();
    useImperativeHandle(ref, () => ({
      closeModal() {
        onClose();
      },
      openModal() {
        onOpen();
      },
    }));

    const handleClose = () => {
      onClose();
    };

    return (
      <>
        {buttonContent && (
          <Box
            onClick={() => {
              setOverlay(<Overlay />);
              onOpen();
            }}
            _hover={{
              cursor: "pointer",
              borderColor: "green.600",
            }}
          >
            {buttonContent}
          </Box>
        )}
        <Modal
          isCentered
          isOpen={isOpen}
          onClose={() => handleClose()}
          closeOnOverlayClick
        >
          {overlay}

          <ModalContent
            maxW="600px"
            maxH="600px"
            p="2rem"
            mx=".5rem"
            className="card-transition"
            {...props}
          >
            <ModalHeader px={{ base: 2, md: 4 }} pt={{ base: 2, md: 3 }}>
              {title}
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody id="modal-scroll" p={[".5rem", ".5rem", "1rem", "1rem"]}>
              {children}
            </ModalBody>
          </ModalContent>
        </Modal>
      </>
    );
  }
);
