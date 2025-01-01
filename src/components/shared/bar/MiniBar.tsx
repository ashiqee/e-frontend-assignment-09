import Link from "next/link";

export default function MiniBar() {
    return (
        <div className="p-2 text-sm  bg-[#1B1A41]/75 text-white">
<div className="flex gap-2 justify-between md:px-6  container mx-auto items-center">
<p>+123456789</p>

<p>
Get 20% off today with code Kidzbazar. Limited stock!
</p>

<div className="flex gap-2 items-center">
<Link href={"/register"}>Become a seller</Link>
<Link href={"/track-order"}>Track order</Link>
</div>

</div>

        </div>
    );
}