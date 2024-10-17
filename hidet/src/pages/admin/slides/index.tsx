import React from "react";
import { useState, useEffect } from "react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Slides from "@/components/admin/slides";
import Header from "@/components/admin/photos/Header";



export default function SlidePage (){
    return (
        <>
            <div className='bg-gray-200 min-h-screen'>
                <Header slideName="Slides" />
                <Slides />
            </div>
        </>
    )
}
