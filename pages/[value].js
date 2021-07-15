import React from 'react';
import {useRouter} from "next/router";
import {decodeURL} from "../utils/urlUtils";

export default function Page() {
    const router = useRouter()
    const {value} = router.query
    const decodedValue = decodeURL(value) || "https://misobarisic.com/go/safelink"
    if (typeof window !== "undefined") {
        window.location.href = decodedValue
    }
    return <></>
}
