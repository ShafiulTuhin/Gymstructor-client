import ProceedToPayment from "@/components/user/ProceedToPayment";
import { getSingleClass } from "@/lib/actions/classes";

export const metadata = {
  title: "Gymstructor | Payment",
  description: "Proceed to payment page by a click",
};

const PaymentInformationPage = async ({ params }) => {
  const { id } = await params;
  const myClass = await getSingleClass(id);

  return <ProceedToPayment myClass={myClass} />;
};

export default PaymentInformationPage;
