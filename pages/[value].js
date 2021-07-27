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
import Heading from "../components/Heading";

export default function Page() {
    let content = <></>
    try {
        const router = useRouter()
        const {value} = router.query
        const decodedValue = decodeURL(value)
        if (typeof window !== "undefined" && decodedValue) {
            if (decodedValue.endsWith(base.passphrase)) {
                const [password, setPassword] = useState("")
                const keyPressHandler = e => {
                    if (e.charCode === 13 && password) decode()
                }
                const decode = () => {
                    const decodedWithPass = decodeURL(decodedValue.slice(0, decodedValue.length - base.passphrase.length), password)
                    if (decodedWithPass) {
                        if (decodedWithPass.startsWith("http//") || decodedWithPass.startsWith("https://")) {
                            window.location.href = decodedWithPass
                        } else {
                            setPassword("")
                            alert("Try again")
                        }
                    }
                }
                const changeHandler = e => {
                    setPassword(e.target.value)
                }

                content = <Input className="text-center" placeholder="Password" value={password}
                                 onChangeHandler={changeHandler} onKeyPressHandler={keyPressHandler}/>
            } else {
                content = <Heading children="Redirecting"/>
                window.location.href = decodedValue
            }
        }
    } catch (e) {
        content = <Heading children="Something went wrong"/>
    }

    return <BasicWrapper>
        <BasicHeader {...meta}/>
        <MainHOC>
            <HeadingComponent/>
            {content}
        </MainHOC>
        <Footer {...footer}/>
    </BasicWrapper>
}

