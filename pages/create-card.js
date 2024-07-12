import Image from "next/image";
import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import QRCode from 'qrcode.react';
import CreateCard from "@/components/CreateCard";

const inter = Inter({ subsets: ["latin"] });

export default function Create() {


    return (
        <main className="">
            <CreateCard />
        </main>
    );
}