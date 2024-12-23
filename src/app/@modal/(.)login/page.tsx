import Modal from "@/components/modal";
import SnsLogin from "@/components/snsLogin";

export default function Page() {
  return (
    <>
      <Modal width="30%" borderRadius="80px">
        <SnsLogin />
      </Modal>
    </>
  );
}
