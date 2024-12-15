import React from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";

import RegistrationForm from "./RegistrationForm";

export default function RegistrationTabs() {
    const [selected, setSelected] = React.useState<React.Key | null | undefined>("customer");

    return (
        <div className="flex flex-col w-full">
            <Card className="max-w-full w-full h-full">
                <CardBody className="overflow-hidden">
                    <div role="tablist">
                        <Tabs
                            fullWidth
                            aria-label="Tabs form"
                            selectedKey={selected as string}
                            size="md"
                            onSelectionChange={setSelected}
                        >
                            <Tab key="customer" title="Become A Customer">
                                <div aria-selected={selected === "customer"} role="tab" onClick={() => setSelected("customer")}>
                                    Customer Registration
                                    <RegistrationForm userRole={"CUSTOMER"} />
                                </div>
                            </Tab>
                            <Tab key="vendor" title="Become A Vendor">
                                <div aria-selected={selected === "vendor"} role="tab" onClick={() => setSelected("vendor")}>
                                    Vendor Registration
                                    <RegistrationForm userRole={"VENDOR"} />
                                </div>
                            </Tab>
                        </Tabs>
                    </div>
                </CardBody>
            </Card>
        </div>
    );
}
