"use client"

import { Icon } from '@iconify-icon/react';
import Logo from "../../components/logo";

const DashboardPage = () => {
    return (
        <div className="min-h-[960px] h-[100vh] w-[100%] m-auto">
            <div className="w-full h-full grid grid-cols-2">
                <div className="w-[250px] h-full">
                    <div className="w-full h-[60px] px-4 py-3 border-r-[1px] border-b-[1px] border-[#E9EAEB]">
                        <Logo width={128} height={35} />
                    </div>
                    <div className="w-full h-full py-5 px-4 border-[1px] border-[#E9EAEB] border-t-0">
                        {/* siderbar main menu */}
                        <div className="mb-5 w-full h-full">
                            <div className="text-[#717680] text-[14px] mb-3">
                                Main Menu
                            </div>
                            <ul className="w-full flex flex-col gap-[6px]">
                                <li className="p-2 h-10 bg-[#EA0A2A] rounded-lg px-3 py-2 text-white flex items-center gap-3">
                                    <Icon icon="hugeicons:home-01" width={24} />
                                    <span>Dashboard</span>
                                </li>
                                <li className="p-2 h-10 rounded-lg px-3 py-2 text-[#414651] flex items-center gap-3">
                                    <Icon icon="hugeicons:home-01" width={24} />
                                    <span>Profile</span>
                                </li>
                                <li className="p-2 h-10 rounded-lg px-3 py-2 text-[#414651] flex items-center gap-3">
                                    <Icon icon="hugeicons:truck-delivery" width={24} />
                                    <span>Landmark</span>
                                </li>
                                <li className="p-2 h-10 rounded-lg px-3 py-2 text-[#414651] flex items-center gap-3">
                                    <Icon icon="hugeicons:truck-delivery" width={24} />
                                    <span>Items</span>
                                </li>
                            </ul>
                        </div>

                        {/* sidebar CRM */}
                        <div className="mb-5 w-full h-full">
                            <div>Main Menu</div>
                            <div>
                                <ul>
                                    <li>Dashboard</li>
                                    <li>Profile</li>
                                    <li>Settings</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div>sdf</div>
            </div>
        </div>
    );
};

export default DashboardPage;
