import Navbar from "@/components/home/Navbar";
import ReservationForm from "@/components/booking/ReservationForm";

export default function ReservationPage() {
  return (
    <>
      <Navbar token={null} />
      <ReservationForm />
    </>
  );
}
