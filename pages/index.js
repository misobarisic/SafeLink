import {useState} from "react"

import {footer, meta} from "../config"
import {generateURL, generateURLwithPass} from "../utils/urlUtils"
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
    const [password, setPassword] = useState("")
    const onChange = (e, setFunc) => {
        const value = e.target.value
        setFunc(value)
    }

    return (
        <BasicWrapper>
            <BasicHeader {...meta}/>
            <MainHOC>
                <WelcomeComponent/>
                <Input className="text-center" placeholder="Link" value={value}
                       onChangeHandler={e => onChange(e, setValue)}/>
                <Input className="text-center" placeholder="Password (optional)" value={password}
                       onChangeHandler={e => onChange(e, setPassword)}/>
                {value ? <ButtonWrapper>
                    <a onClick={() => alert("URL copied to clipboard")}>
                        <ClipboardButton text="Generate and copy URL"
                                         clipboardData={`${origin}/${password ? generateURLwithPass(value, password) : generateURL(value)}`}/>
                    </a>
                </ButtonWrapper> : ""}
            </MainHOC>
            <Footer {...footer}/>
        </BasicWrapper>
    )
}
