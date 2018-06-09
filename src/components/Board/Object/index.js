import React, { PureComponent } from "react"

import ObjectProperty from "../ObjectProperty"
import PropertyWrapper from "../PropertyWrapper"
import Markdown from "../Markdown"
import { SYMBOLS } from "../../Interpreter/symbols"

import "./style.sass"

const _m = SYMBOLS.meta
const _doc = SYMBOLS.doc

/*
    `Object.betterEntries(obj)` returns array of triplets [value, key, obj],
    so it is aligned with `Array.filter` and `Array.map` with signatures
    of [elem, index, array]
*/

Object.betterEntries = (obj) => {
    const entries = Object.entries(obj)
    return entries.map(([key, value]) => [value, key, obj])
}

const isSilent = ([value, key, props]) => !(props[_m] && props[_m][key] && props[_m][key].silent)

export default class ObjectVis extends PureComponent {
    render() {
        const { data } = this.props

        const props = Object.betterEntries(data)
            .filter(isSilent)
            .map(([value, key, props]) => {
                const _meta = (props[_m] && props[_m][key]) ? props[_m][key] : null

                return (
                    <ObjectProperty {...{
                        key,
                        name: key,
                        data: value,
                        _meta
                    }} />
                )
            })

        return (
            <PropertyWrapper type="object" symbol="{}" {...this.props}>
                <div className="properties">
                    {data[_doc] ? <Markdown>{data[_doc]}</Markdown> : null}
                    {props}
                </div>
            </PropertyWrapper>
        )
    }
}