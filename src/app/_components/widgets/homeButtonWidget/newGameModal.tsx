import Modal from '@/app/_components/modal/modal';
type NewGameModalProps = {
  isModalOpen: boolean;
  onClose: (e: Event) => void;
};
const NewGameModal = ({ isModalOpen, onClose }: NewGameModalProps) => {
  return (
    <Modal isModalOpen={isModalOpen} onClose={onClose}>
      {/* <Modal isModalOpen={isModalOpen} onClose={onClose} className=" mt-auto h-fit max-h-full w-[628px] max-w-full rounded-2xl"> */}

      <div className="flex h-96 w-96 flex-col items-center justify-center rounded-2xl border-4 border-catan-red">
        <h1>New Game</h1>
      </div>
    </Modal>
  );
};

export default NewGameModal;
