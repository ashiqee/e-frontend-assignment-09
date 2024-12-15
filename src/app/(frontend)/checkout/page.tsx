import CheckoutPage from "./CheckoutPages";

import { getCurrentUser } from "@/services/AuthService";

export default async function Checkout() {
    const user = await getCurrentUser();

    return (
        <div className="container mx-auto">
            <CheckoutPage user={user}/>

            

        </div>
    );
}