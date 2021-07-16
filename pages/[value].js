import React from 'react';
import {useRouter} from "next/router";
import {decodeURL} from "../utils/urlUtils";

export default function Page() {
    try {
        const router = useRouter()
        const {value} = router.query
        const decodedValue = decodeURL(value)
        if (typeof window !== "undefined" && decodedValue) {
            window.location.href = decodedValue
        }
        return redirectComponent()
    } catch (e) {
        return errorComponent()
    }
}

const headingClassName = "mt-16 md:mt-24 text-center text-2xl font-semibold"
function redirectComponent() {
    return <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <h1 className={headingClassName}>
            Redirecting
        </h1>
    </div>
}

function errorComponent() {
    return <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <h1 className={headingClassName}>
            Something went wrong
        </h1>
    </div>
}
