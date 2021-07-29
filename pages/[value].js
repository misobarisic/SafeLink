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
import ButtonWrapper from "../hoc/ButtonWrapper";

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

                content = <>
                    <Input className="text-center" placeholder="Password" value={password}
                           onChangeHandler={changeHandler} onKeyPressHandler={keyPressHandler}/>
                    {password ? <ButtonWrapper>
                        <button
                            className="relative inline-flex items-center mx-1 my-1 px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            onClick={decode}>Decode
                        </button>
                    </ButtonWrapper> : ""}
                </>
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

