import React, {useState} from 'react';
import {useRouter} from "next/router";
import {decodeURL} from "../utils/urlUtils";
import BasicHeader from "../hoc/BasicHeader";
import {base, footer, meta} from "../config";
import MainHOC from "../hoc/MainHOC";
import Footer from "../components/Footer/Footer";
import BasicWrapper from "../hoc/BasicWrapper";
import HeadingComponent from "../components/HeadingComponent";
import Input from "../components/Input";

export default function Page() {
    // This whole approach sucks and is unreadable

    try {
        const router = useRouter()
        const {value} = router.query
        const decodedValue = decodeURL(value)
        if (typeof window !== "undefined" && decodedValue) {
            if (decodedValue.endsWith(base.passphrase)) {
                const [password, setPassword] = useState("")

                function keyPressHandler(e) {
                    if (e.charCode === 13 && password) {
                        const decodedWithPass = decodeURL(decodedValue.slice(0, decodedValue.length - base.passphrase.length), password)
                        if (decodedWithPass) {
                            if (decodedWithPass.startsWith("http//") || decodedWithPass.startsWith("https://")) {
                                window.location.href = decodedWithPass
                            } else {
                                alert("Try again")
                            }
                        }
                    }
                }

                function changeHandler(e) {
                    setPassword(e.target.value)
                }

                return contentMaker(() => passComponent({password, changeHandler, keyPressHandler}))
            } else {
                window.location.href = decodedValue
            }
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
    return <h1 className={headingClassName}>Redirecting</h1>
}

function passComponent({password, changeHandler, keyPressHandler}) {
    return <Input className="text-center" placeholder="Password" value={password}
                  onChangeHandler={changeHandler} onKeyPressHandler={keyPressHandler}/>
}

function errorComponent() {
    return <h1 className={headingClassName}>Something went wrong</h1>
}
