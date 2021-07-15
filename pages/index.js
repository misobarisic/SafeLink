import {useState} from "react"

import {footer, meta} from "../config"
import {generateURL} from "../utils/urlUtils"
import Footer from "../components/Footer/Footer";
import WelcomeComponent from "../components/WelcomeComponent";
import MainHOC from "../hoc/MainHOC";
import BasicHeader from "../hoc/BasicHeader";
import ClipboardButton from "../components/ClipboardButton";
import BasicWrapper from "../hoc/BasicWrapper";
import ButtonWrapper from "../hoc/ButtonWrapper";
import Input from "../components/Input"

export default function Page() {
    const [origin, setOrigin] = useState("")
    if (typeof window !== 'undefined' && !origin) {
        setOrigin(window.location.origin)
    }

    const [value, setValue] = useState("")
    const onChange = e => {
        const value = e.target.value
        const encoded = generateURL(value)
        console.log(encoded)
        setValue(value)
    }

    return (
        <BasicWrapper>
            <BasicHeader {...meta}/>
            <MainHOC>
                <WelcomeComponent/>
                <Input className="text-center" placeholder="https://github.com" value={value}
                       onChangeHandler={onChange}/>
                {value ? <ButtonWrapper>
                    <a onClick={() => alert("URL copied to clipboard")}>
                        <ClipboardButton text="Generate and copy URL"
                                         clipboardData={`${origin}/${generateURL(value)}`}/>
                    </a>
                </ButtonWrapper> : ""}
            </MainHOC>
            <Footer {...footer}/>
        </BasicWrapper>
    )
}
