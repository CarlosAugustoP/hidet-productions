import React, { useEffect, useState, useRef } from 'react';
import Header from '@/components/admin/photos/Header';
import Posts from '@/components/admin/photos/Posts';

export default function Index() {
    return (
        <>
            <div className='bg-gray-200 min-h-screen'>
                <Header />
                <Posts />
            </div>
        </>
    )
}