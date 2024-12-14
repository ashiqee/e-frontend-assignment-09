import { getCurrentUser } from "@/services/AuthService";
import CheckoutPage from "./CheckoutPages";

export default async function Checkout() {
    const user = await getCurrentUser();

    return (
        <div className="container mx-auto">
            <CheckoutPage user={user}/>

            

        </div>
    );
}