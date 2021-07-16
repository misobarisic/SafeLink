import React from 'react';
import {useRouter} from "next/router";
import {decodeURL} from "../utils/urlUtils";
import BasicHeader from "../hoc/BasicHeader";
import {footer, meta} from "../config";
import MainHOC from "../hoc/MainHOC";
import Footer from "../components/Footer/Footer";
import BasicWrapper from "../hoc/BasicWrapper";
import HeadingComponent from "../components/HeadingComponent";

export default function Page() {
    try {
        const router = useRouter()
        const {value} = router.query
        const decodedValue = decodeURL(value)
        if (typeof window !== "undefined" && decodedValue) {
            window.location.href = decodedValue
        }
        return contentMaker(redirectComponent)
    } catch (e) {
        return contentMaker(errorComponent)
    }
}

function contentMaker(func) {
    return <BasicWrapper>
        <BasicHeader {...meta}/>
        <MainHOC>
            <HeadingComponent/>
            {func()}
        </MainHOC>
        <Footer {...footer}/>
    </BasicWrapper>
}
const headingClassName = "mt-16 md:mt-24 text-center text-2xl font-semibold"
function redirectComponent() {
    return
    <h1 className={headingClassName}>Redirecting</h1>
}

function errorComponent() {
    return <h1 className={headingClassName}>Something went wrong</h1>
}
