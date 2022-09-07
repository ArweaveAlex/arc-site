import { Button } from "@/components/atoms/Button";
import { language } from "@/language";

export default function ConnectWallet() {
    return (
        <Button
            disabled
            type={"primary"}
            label={language.connectWallet}
            handlePress={() => console.log('connect wallet')}
        />
    )
}