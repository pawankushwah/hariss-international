import Image from "next/image";

export default function Logo({ width = 183, height = 50, twClass }: { width?: number; height?: number; twClass?: string }) {
    return (
        <Image
            src="/logoLoginPage.png"
            alt="Login Illustration"
            width={width}
            height={height}
            className={twClass}
        />
    );
}