import React from "react";

export default function Heading({children}) {
    return (
        <h1 className="mt-16 md:mt-24 text-center text-2xl font-semibold">{children}</h1>
    )
}
