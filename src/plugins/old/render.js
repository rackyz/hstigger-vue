import util from './util'
let out = {}

out.renderIndex = () => {
    return (h, params) => h("span", params.index + 1)
}

out.renderDing = (key,event,eventHandler,option={})=>{
    return (h,params)=>{
        let ding_id = params.row[key]
        if(ding_id)
            return h("a",{
                style:{
                    padding:"2px 10px",
                    background:"#3af",
                    filter:"dropShadow(1px 1px 2px #333)",
                    color:"#fff",
                    fontSize:"12px",
                    cursor:"pointer"
                }, on: {
                    click: e => {
                        eventHandler('ding', params.row)
                    }
                }
                }, 'DING'
                
                )
        else{
            return out.renderEmpty(h)
        }
    }
}

out.renderSMS = (key, event, eventHandler, option = {}) => {
    option.options = option.options || []
    return (h, params) => {
        let ding_id = params.row[key]
        let enable = false
        if (ding_id){
            let DropDownMenu = h("DropdownMenu", {
                slot: "list"
            }, option.options.map((v, i) =>{
                if (v.enable_key && params.row[v.enable_key])
                    enable = true
                return h("DropdownItem", {
                    props: {
                        name: v.event,
                        disabled: (!v.enable_key || params.row[v.enable_key]) ? false: true
                    }
                }, [v.name])
            }
               
            ))

            let drop = h("Dropdown", {
                style: {
                    right: '15px'
                },
                props: {
                    trigger: "click",
                    transfer: true
                },
                on: {
                    "on-click": (e) => eventHandler(e, {
                        contract_id: params.row.id,
                        ding_id:params.row.ding_id
                    })
                }
            }, [DropDownMenu, h("a", {
               
                style: {
                    padding: "2px 10px",
                    background: enable? "#6f3":"#aaa",
                    filter: "dropShadow(1px 1px 2px #333)",
                    color: "#fff",
                    fontSize: "12px",
                    cursor: "pointer"
                }
            }, '短信提醒')])

            return drop
        }
        else {
            return out.renderEmpty(h)
        }
    }
}

out.renderLink = (key, event, eventHandler, option = {}) => {
    return (h, params) => h("a", {
        style: {
            float: option.align ? "auto" : "left",
            textAlign: option.align || "left",
            margin: "0 5px"
        },
        on: {
            click() {
                eventHandler(event, params.row, option)
            }
        }
    }, (option.valmapper ? option.valmapper(params, key) : params.row[key]))

}

out.renderList = (key,option={})=>{
    const colors = option.colors || []
    
    return (h,params)=>{
        let items = params.row[key].map((value,i)=> h("span", {
                 style: {
                     textAlign: option.align || "left",
                     margin: "0 5px",
                     color:colors[i] || '#333'
                 },
             }, value)
        )

        return h('div',items)
    }


    
}

out.renderText = (key, option = {}, onEvent) => {
    return (h, params) => {
        let value = (option.valmapper ? option.valmapper(params, key) : params.row[key]) !== undefined ? (option.valmapper ? option.valmapper(params, key) : params.row[key]) : option.defaultValue
        
        

        if (option.editable == true && onEvent) {
            let button = h('Icon',{
                class:"small-icon-button",
                style:{
                    marginLeft:"5px"
                },
                    props:{
                    type:'md-create',
                    size:"14"
                 },
                on:{
                    click:()=>{
                        onEvent('edit-text',params.row,key)
                    }
                }})

            value = [value, button]
            if(option.options){
                let DropDownMenu = h("DropdownMenu", {
                    slot: "list"
                }, option.options.map((v, i) =>
                    h("DropdownItem", {
                        props: {
                            name: v
                        }
                    }, [v])
                ))

                let drop = h("Dropdown", {
                    style:{
                        right:'15px'
                    },
                    props: {
                        trigger: "click",
                        transfer: true
                    },
                    on: {
                        "on-click": (e) => onEvent('change-state', {
                            id: params.row.id,
                            [key]: e
                        })
                    }
                }, [DropDownMenu, h('span',{style:{fontSize:'10px',marginLeft:"5px",color:"lightblue"}},'[选择]')])
            

                value.push(drop)
            }
            
        }

        return h("span", {
            style: {
                float: option.align ? "auto" : "left",
                textAlign: option.align || "left",
                margin: "0 5px"
            },
        }, value)
        

    }
    
}

out.renderUser = (key, option, users = []) => {
    return (h, params) => {
        let id = (option.valmapper ? option.valmapper(params, key) : params.row[key])
        let user = users.find(v => v.id == id)
        if (user) {
            let avatar = h("Avatar", {
                props: {
                    size: "small",
                    src: user.avatar
                },
                style: {
                    marginRight: "8px",
                    width: "20px",
                    height: "20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center"

                }
            }, user.name[0])

            return h("div", {
                style: {
                    display: "flex",
                    alignItems: "center",
                    padding: "0 5px",
                    justifyContent: "center"
                }
            }, [avatar, user.name])
        } else {
            return h("span", "-")
        }

    }
}




out.renderBool = (key, option = {},onEvent) => {
    let texts = option.texts || ["否", "是"]
    let colors = option.colors || ["red", "green"]
    return (h, params) => {
        let v = (option.valmapper ? option.valmapper(params, key) : params.row[key]) || 0


       


        v = v ? 1 : 0

         if (option.type == "star") {
             return h("Icon",{
                 props:{
                     type:v?"ios-star":"ios-star-outline",
                     size:20
                 },
                 class:'star-icon-button',
                 on:{
                     click:option.editable?()=>{
                         onEvent('edit-bool',params.row,key)
                     }:undefined
                 }
             })
         }

         if(option.tooltipTo){
             return h("Tooltip",{
                 props:{
                     transfer:true,
                     theme:'light'
                 },
                  style: {
                      color: v?'green':'#aaa'
                  }
             },[v?'查看':'无',
             h('div',{slot:"content"},[
             (params.row[option.tooltipTo])  && typeof (params.row[option.tooltipTo]) == "object" ?
               params.row[option.tooltipTo].map(v => h("p", v)): h("p", params.row[option.tooltipTo])]
             )
            ])
         }

        return h("span", {
            style: {
                color: colors[v]
            }
        }, texts[v])
    }
}

out.renderTool = (buttons, eventHandler, option, authorize, userinfo) => {
    const predefined = {
        edit: "编辑",
        delete: "删除"
    }
    return (h, params) => h("div", buttons.map(v => {
        let b = v
        if (typeof v == "string" && predefined[v]) {
            b = {
                event: v,
                label: predefined[v]
            }
        }


        return h("Button", {
            props: {
                size: "small",
                disabled: (authorize ? (!authorize(b.event, params.row, userinfo)) : false) || (v.CheckDisabled ? v.CheckDisabled(params.row) : false)
            },
            style: {
                marginRight: "10px"
            },
            on: {
                click: () => {
                    if (eventHandler)
                        eventHandler(b.event, params.row, option)
                }
            }
        }, b.label)

    }))
}

out.renderTime = (key, option = {}) => {
    return (h, params) => {
        let t = option.type || "smart"
        let time = (option.valmapper ? option.valmapper(params, key) : params.row[key])
        if (!time)
            return h("span", "-")
        let m = moment(time)
        let o = ""
        if (t == "smart") {
            o = m.fromNow()
        } else if (t == "date") {
            o = m.format("L")
        } else {
            o = m.format("LL")
        }
        return h("span", {
            style: {
                color: "green"
            }
        }, o)
    }
}

out.renderState = (key, option = {}, onEvent) => {
    let colors = option.colors || ["grey", "orange", "green", "darkgreen", "red","purple","blue","yellowgreen","black","pink"]

    let states = option.states
    

    return (h, params) => {
          let startIndex = option.startIndex || 0
        let stateIndex = (option.valmapper ? option.valmapper(params, key) : params.row[key]) || 0
        let stateStatic = h("span", {
            style: {
                padding: "3px 8px",
                backgroundColor: colors[stateIndex - startIndex], 
                color: "#fff",
                borderRadius: "5px",
                fontSize: "10px",
                whiteSpace:'nowrap'
            }
        }, states ? states[stateIndex - startIndex] : stateIndex)

         if (option.type == "star") {
             stateStatic =  h("Icon", {
                 props: {
                     type:"md-star" ,
                     size: 20
                 },
                 style:{
                     color:colors[stateIndex]
                 },
                 class: 'star-icon-button'
             })
         }



        if (option.editable) {
          
            let DropDownMenu = h("DropdownMenu", {
                slot: "list"
            }, states.map((v, i) =>
                h("DropdownItem", {
                    props: {
                        name: i + startIndex,
                        selected: i == stateIndex - startIndex
                    }
                }, [h("Icon", {
                props: {
                    type: "md-star",
                    size: 14
                },
                style: {
                    color: colors[i]
                },
                class: 'star-icon-button'
                }), v])
            ))

           

            return h("Dropdown", {
                props: {
                    trigger: "click",
                    transfer: true
                },
                on: {
                    "on-click": (e) => onEvent('change-state', {
                        id: params.row.id,
                        [key]: e
                    })
                }
            }, [DropDownMenu, stateStatic])
        } else {
            return stateStatic
        }
    }




}

function mapColor(ch, base = 10000) {
    if (typeof ch != 'string')
        return "#aaa"
    let d = ch.charCodeAt(0)

    const dRange = 40896 - 19968
    d = d - 19968
    if (d < 0)
        d = 10000
    let baseColor = base || 180 * 180 * 180
    let colorRange = 256 * 256 * 256 - baseColor
    let mapped = baseColor + parseInt((d * colorRange / dRange))

    mapped = mapped.toString(16)
    while (mapped.length < 6)
        mapped = '0' + mapped

    return '#' + mapped
}

out.renderType = (key, option = {}) => {
    return (h, params) => {
        let type = (option.valmapper ? option.valmapper(params, key) : params.row[key])
        if (option.store && option.getters) {
            let types = option.store.getters[option.getters]
            if (option.getters_key)
                types = types(option.getters_key)

            type = types.find(v => v.id == type)
            if (type)
                return h("span", {

                    style: {
                        padding: "2px 7px",
                        backgroundColor: type.color || mapColor(type.name, option.base),
                        color: "#fff",
                        lineHeight: "auto",
                        borderRadius: "15px",
                        fontSize: "10px"
                    }
                }, type.name)
            else
                return h("span", "-")

        } else {
            if (type)
                return h("span", {
                    style: {
                        color: mapColor(type, option.base)
                    }
                }, type)
            else
                return h("span", "-")
        }

    }
}

function renderSize(value) {
    if (null == value || value == '') {
        return "0 Bytes";
    }
    var unitArr = new Array("Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB");
    var index = 0;
    var srcsize = parseFloat(value);
    index = Math.floor(Math.log(srcsize) / Math.log(1024));
    var size = srcsize / Math.pow(1024, index);
    size = size.toFixed(2); //保留的小数位数
    return size + unitArr[index];
}

out.renderFileSize = (key, option = {}) => {
    return (h, params) => {
        let size = (option.valmapper ? option.valmapper(params, key) : params.row[key])
        return h('span', renderSize(size))
    }

}

out.renderHTML = (h, html) => {
    return h('span', {
        style: {
            textAlign: 'left',
            float: 'left',
            marginLeft: '0.5rem'
        },
        domProps: {
            innerHTML: html
        },
    })
}
out.moment = (date, format) => {
    if (!date)
        return moment()
    if (date.includes(':') && !format) {
        return moment(date)
    } else if (format) {
        return moment(date, format)
    } else {
        return moment(date, 'YYYY-MM-DD')
    }
}

out.durationOfDate = (d1, d2) => {
    if (d1 && d2) {
        let md1 = d1.includes(':') ? moment(d1) : moment(d1, 'YYYY-MM-DD')
        let md2 = d2.includes(':') ? moment(d2) : moment(d2, 'YYYY-MM-DD')
        return moment.duration(md2 - md1)
    }
}

out.isBeforeToday = (d, format, vnow) => {
    let md = moment(d, format)
    let today = moment(vnow).startOf('day')
    if (md < today) {
        return true
    } else
        return false
}

out.dateAddDays = (d, days) => {
    if (d && days) {
        let m = d.includes(':') ? moment(d) : moment(d, 'YYYY-MM-DD')
        return m.add(days, 'days')
    } else {
        return moment(d)
    }
}

out.days2months = (d) => {
    let days = parseInt(d)
    return (days / 30.4)
}

out.dateOffset = (d1, d2) => {
    return moment.duration(moment(d2) - moment(d1))
}


out.renderDateSimple = (h, d, hl) => {
    if (typeof d == 'string' && d != "null" && d != "") {
        let m = d.includes('T') ? moment(d) : moment(d, 'YYYY-MM-DD')
        let dateString = m.startOf("day").format('YYYY-MM-DD')
        return h('div', {
            style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'

            }
        }, [h('div', {
            style: {
                color: hl ? 'blue' : '#777',
                textAlign: 'cener',
                fontSize: '0.7rem',
                lineHeight: '1rem'
            }
        }, dateString)])
    } else {
        return h('span', {}, '-')
    }

}

out.renderDate = (h, d, highlight) => {
    if (typeof d == 'string' && d != "null" && d != "") {
        let m = d.includes('T') ? moment(d) : moment(d, 'YYYY-MM-DD')
        let dateString = m.startOf("day").format('YYYY/MM/DD')
        let dateSmart = m.fromNow()
        if (dateSmart.includes('小时'))
            dateSmart = '1天内'
        return h('div', {
            style: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'

            }
        }, [h('div', {
            style: {
                color: highlight ? 'blue' : '#777',
                textAlign: 'cener',
                fontSize: '0.7rem',
                lineHeight: '0.9rem'
            }
        }, dateString), h('div', {
            style: {
                color: '#aaa',
                fontSize: '0.5rem',

                lineHeight: '0.6rem',
                textAlign: 'center'
            }
        }, dateSmart)])
    } else {
        return h('span', {}, '-')
    }

}

out.renderCompareMark = (h, d, r) => {

    return h('Icon', {
        props: {
            type: d >= 0 ? 'md-arrow-dropup' : 'md-arrow-dropdown',
            size: 14
        },
        style: {
            color: !r ? ((d > 0) ? 'red' : 'green') : (d >= 0 ? 'green' : 'red')
        }
    })
}

out.renderMark = (h, d, r) => {
    return h('Icon', {
        props: {
            type: 'ios-checkmark-circle-outline',
            size: 16
        },
        style: {
            color: 'green',
            marginLeft: '0.25rem',
            marginRight: '0.25rem'
        }
    })
}

out.renderCompare = (h, d, offset, colorReverse, renderFunc, inline) => {
    if (d || offset) {
        const styleInline = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }

        const styleNotInline = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }

        let renderItems = [h('div', {
            style: {
                color: '#777',
                textAlign: 'center',
                fontSize: '0.7rem',
                lineHeight: '1rem',

            }
        }, [renderFunc ? renderFunc(h, d) : d])]
        if (offset != 0 && (Math.abs(offset) > 0.01))
            renderItems.push(h('div', {
                style: {
                    color: colorReverse ? (offset >= 0 ? 'green' : 'red') : (offset > 0 ? 'red' : 'green'),
                    fontSize: '10px',

                    lineHeight: inline ? '' : '0.6rem',
                    textAlign: 'center',
                    display: "flex",
                    alignItems: "center"
                }
            }, [h('span', {
                style: {
                    marginLeft: inline ? '0.5rem' : '',
                    marginRight: '0.25rem'
                }
            }, offset > 0 ? '+' : '-'), renderFunc ? renderFunc(h, Math.abs(offset)) : offset.toFixed(2)]))
        return h('div', {
            style: inline ? styleInline : styleNotInline
        }, renderItems)
    } else {
        return h('span', {}, '-')
    }

}


out.renderComparePercent = (h, d, percent, colorReverse, renderFunc, inline) => {
    if (d || percent) {
        const styleInline = {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        }

        const styleNotInline = {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center'
        }

        let renderItems = [h('div', {
            style: {
                color: '#777',
                textAlign: 'center',
                fontSize: '0.7rem',
                lineHeight: '1rem',

            }
        }, [renderFunc ? renderFunc(h, d) : d])]
        renderItems.push(h('div', {
            style: {
                color: colorReverse ? (percent <= 0 ? 'green' : 'red') : (percent > 0 ? 'red' : 'green'),
                fontSize: '10px',

                lineHeight: inline ? '' : '0.6rem',
                textAlign: 'center',
                display: "flex",
                alignItems: "center"
            }
        }, [out.renderCompareMark(h, percent, colorReverse), Math.abs(percent * 100).toFixed(1) + '%']))
        return h('div', {
            style: inline ? styleInline : styleNotInline
        }, renderItems)
    } else {
        return h('span', {}, '-')
    }

}


// d1 > d2, return 0
out.offsetMonth = (d1, d2) => {
    let dm1 = moment(d1)
    let dm2 = moment(d2)
    let y1 = dm1.year()
    let y2 = dm2.year()
    let m1 = dm1.month() + 1
    let m2 = dm2.month() + 1

    let offset = 0
    if (y2 > y1) {
        offset = (y2 - y1 - 1) * 12 + (12 - m1 + 1) + m2
    } else {
        offset = m2 - m1 + 1
    }
    return offset
}

out.offsetYear = (d1, d2) => {
    return parseInt(d2) - parseInt(d1)
}

out.calcInDuration = (inStart, inEnd, outStart, outEnd) => {
    let start, end
    if (inStart.isBefore(outStart)) {
        if (inEnd.isBefore(outStart))
            return 0
        else {
            start = outStart
            end = inEnd.isBefore(outEnd) ? inEnd : outEnd
        }
    } else {
        if (inStart.isAfter(outEnd)) {
            return 0
        } else {
            start = inStart
            end = inEnd.isBefore(outEnd) ? inEnd : outEnd
        }
    }
    if (end < start)
        return 0

    return moment.duration(end - start).as('month')
}

out.renderProgressValue = (h, percent, value, color = '#cef', bgcolor = '#fff') => {
    value = value || (percent * 100).toFixed(1) + '%'
    let percentItems = []
    if (typeof percent != 'undefined')
        percentItems.push(h("div", {
            style: {
                position: 'absolute',
                left: 0,
                height: "1.8rem",
                zIndex: '0',

                background: color,
                width: (percent && percent > 100 ? 100 : (percent || 0)) + '%'
            }
        }))
    else
        return

    percentItems.push(h('div', {
        style: {
            zIndex: 1,
            color: '#333',
            position: 'relative',
            width: "100%",
            textAligh: "right"
        }
    }, [value]))

    return h("div", {
        style: {
            position: "relative",
            height: "2rem",
            display: 'flex',
            alignItems: 'center',

            background: bgcolor,
            justifyContent: 'center',
            margin: '0 0.5rem'
        }
    }, percentItems)
}


out.renderCompareProgress = (h, percent) => {
    let percentItems = []
    if (typeof percent != 'undefined')
        percentItems.push(h("div", {
            style: {
                position: 'absolute',
                left: 0,
                height: "2rem",
                zIndex: '0',

                background: percent > 100 ? '#5cb515' : '#fa3833',
                width: (percent && percent > 100 ? 100 : (percent || 0)) + '%'
            }
        }))
    else
        return
    percentItems.push(h('span', {
        style: {
            zIndex: 1,
            color: 'white',
            position: 'relative'
        }
    }, (percent || 0) + '%'))

    return h("div", {
        style: {
            position: "relative",
            height: "2rem",
            display: 'flex',
            alignItems: 'center',

            background: '#ddd',
            justifyContent: 'center',
            margin: '0 0.5rem'
        }
    }, percentItems)
}


const renderProgress = (h, percent, percent2) => {

    let percentItems = []
    if (typeof percent != 'undefined')
        percentItems.push(h("div", {
            style: {
                position: 'absolute',
                left: 0,
                height: "2rem",
                zIndex: '0',
                transition: 'all 0.3s',
                background: '#5fabf1',
                width: (percent && percent > 100 ? 100 : (percent || 0)) + '%'
            }
        }))
    else
        return
    if (percent2) {
        percentItems.push(h("div", {
            style: {
                position: 'absolute',
                left: 0,
                height: "2rem",
                zIndex: '1',
                color: "#eee",
                background: 'green',
                textAlign: 'center',
                width: (percent2 && percent2 > 100 ? 100 : (percent2 || 0)) + '%'
            }
        }, (percent2 && percent2 > 100 ? 100 : (percent2 ? percent2.toFixed(2) : 0)) + '%'))
    }

    if (typeof percent == 'string')
        percent = parseFloat(percent)

    if (typeof percent != 'number')
        percent = 0
    if (percent > 100)
        percent = 100
    else
        percent = percent.toFixed(2)

    percentItems.push(h('span', {
        style: {
            zIndex: 1,
            position: 'relative'
        }
    }, (percent + '%')))

    return h("div", {
        style: {
            position: "relative",
            height: "2rem",
            display: 'flex',
            alignItems: 'center',
            background: '#ddd',
            justifyContent: 'center',
            margin: '0 0.5rem'
        }
    }, percentItems)
}


const renderFullAmount = (h, amount, highlight, center, percentTo) => {
   
    if (amount) {
        if (typeof highlight == 'boolean')
            highlight = "red"

        let pt = null
        let percent = 0
        if (percentTo) {
            percent = parseInt(amount / percentTo * 100)
            pt = h('Progress', {
                props: {
                    percent,
                    strokeWidth:3,
                },
                style:{
                    position:"absolute",
                    bottom:0,
                    left:0,
                    right:0,
                    color:"darkred"
                }
            })
        }

        let value = [h("span", {
            style: {
                color: "#aaa",
                position: "relative",
                    top: "-3px",
              
            }
        }, "¥"), h("span", {
            style: {
                position: "relative",
                    top: "-3px",
                color: highlight ? highlight : "#888",
                marginLeft: "0.2rem",
                
                marginRight: center ? '' : "1rem"
            }
        }, `${util.formatSalarySemicolon(amount)}`)]

        if(percentTo)
            value.push(pt)

        return h("div", {
            style: {
                display: "flex",
                alignItems: "center",
                justifyContent: center ? "center" : "flex-end",
                whiteSpace: "nowrap",
                  position: "relative",
                  height:"40px"
            }
        },value)
    }
}

out.renderEmpty = (h) => {
    return h('span', {}, '-')
}


const renderAmount = (h, amount, highlight, center, percentTo) => {
    amount = amount || 0
    if (typeof highlight == 'boolean' && highlight)
        highlight = "red"

    let pt = null
    if (percentTo) {
        let percent = amount / percentTo
        pt = h('Progress', {
            props: {
                percent
            }
        })
    }


    return h("div", {
        style: {
            display: "flex",
            alignItems: "center",
            justifyContent: center ? "center" : "flex-end",
            whiteSpace: "nowrap"
        }
    }, [h("span", {
        style: {
            color: "#aaa",
        }
    }, "¥"), h("span", {
        style: {
            color: highlight ? highlight : "#888",
            marginLeft: "0.2rem",
            marginRight: center ? '' : "1rem"
        }
    }, util.formatSalary(amount)), pt])

}

out.renderNumber = (key, option = {}) => {

    

    return (h, params) => {
        let n = (option.valmapper ? option.valmapper(params, key) : params.row[key]) || 0

         let percentTo = undefined
         if (option.percentTo)
             percentTo = params.row[option.percentTo]
        if (option.hideZero && n == 0)
            return out.renderEmpty(h)

      if (option.type == 'amount') {
         
          return renderAmount(h, n, option.hightlight, option.center, percentTo)
      } else if (option.type == 'fullAmount') {
          return renderFullAmount(h, n, option.hightlight, option.center, percentTo)
      } else if(option.type =='percent'){
          return renderProgress(h,n)
      }
        else {
            if (option.formatter && n)
                return h('span', {
                    style: {
                        whiteSpace: "nowrap"
                    }
                }, option.formatter(n))
            else
                return h('span', {
                    style: {
                        whiteSpace: "nowrap"
                    }
                }, n)
        }
    }

}

out.renderFileType = (key, option = {}) => {
    return (h, params) => {
        let type = (option.valmapper ? option.valmapper(params, key) : params.row[key])
        const colors = {
            png: 'purple',
            image: 'purple',
            gif: 'purple',
            jpg: 'purple',
            jpeg: 'purple',
            xls: 'green',
            xlsx: 'green',
            ppt: 'orange',
            pptx: 'orange',
            doc: 'blue',
            docx: 'blue'

        }
        return h('span', {
            style: {
                padding: "0px 5px",
                background: colors[type] || "#333",
                color: "#fff",
                filter: "drop-shadow(1px 1px 1px #333)",
                borderRadius: "2px"
            }
        }, type)
    }
}

out.render = (columnsDefinition, onEvent, auth, attachedDataSet, store) => {
    return columnsDefinition.map((v, i) => {
        if (v.option)
            v.option.store = store
        let col = {
            key: v.key,
            title: v.title,
            align: "center",
            width: v.width,
            fixed: v.fixed,
            ellipse: true,
            maxWidth: v.maxWidth,
            minWidth: v.minWidth || 60,
            sortable: true,
            sortMethod: (type) => {
                if (type == 'asc') {
                    return (a, b) => {
                        if (a[v.key] == null || a[v.key] == undefined)
                            return -1

                        if (b[v.key] == null || a[v.key] == undefined)
                            return 1

                        return a[v.key] > b[v.key] ? 1 : -1
                    }
                } else {
                    return (a, b) => {
                        if (b[v.key] == null || b[v.key] == undefined)
                            return -1

                        if (a[v.key] == null || a[v.key] == undefined)
                            return 1
                        return a[v.key] > b[v.key] ? -1 : 1
                    }
                }
            }
        }

        if (v.type == "index") {
            col.type = 'index'
              col.sortable = false
        } else if(v.type=='ding'){
            col.render = out.renderDing(v.key,v.event,onEvent,v.option)

            col.sortable = false
        } else if (v.type == 'sms') {
            col.render = out.renderSMS(v.key, v.event, onEvent, v.option)

            col.sortable = false
        } else if (v.type == "link") {
            col.render = out.renderLink(v.key, v.event, onEvent, v.option)
        } else if (v.type == "text") {
            col.render = out.renderText(v.key, v.option, onEvent)
        } else if (v.type == "list") {
            col.render = out.renderList(v.key, v.option, onEvent)
        } else if (v.type == "tool") {
            col.render = out.renderTool(v.buttons, onEvent, v.option, auth, attachedDataSet.userinfo)
        } else if (v.type == "time") {
            col.render = out.renderTime(v.key, v.option)
            col.width = 100
            col.sortMethod = (type) => {
                if (type == 'asc') {
                    return (a, b) => {
                        if (a[v.key] == null || a[v.key] == undefined)
                            return -1

                        if (b[v.key] == null || b[v.key] == undefined)
                            return 1

                        return moment(a[v.key]).isAfter(b[v.key]) ? 1 : -1
                    }
                } else {
                    return (a, b) => {
                        if (b[v.key] == null || b[v.key] == undefined)
                            return -1

                        if (a[v.key] == null || a[v.key] == undefined)
                            return 1
                        return moment(a[v.key]).isAfter(b[v.key]) ? -1 : 1
                    }
                }
            }
        } else if (v.type == "user") {
            col.render = out.renderUser(v.key, v.option, attachedDataSet.users)
        } else if (v.type == "state") {
            col.render = out.renderState(v.key, v.option, onEvent)
        } else if (v.type == "type") {
            col.render = out.renderType(v.key, v.option)
        } else if (v.type == "bool") {
            col.render = out.renderBool(v.key, v.option, onEvent)
        } else if (v.type == 'filetype') {
            col.render = out.renderFileType(v.key, v.option)
        } else if (v.type == 'filesize') {
            col.render = out.renderFileSize(v.key, v.option)
        } else if (v.type == 'number') {
            col.render = out.renderNumber(v.key, v.option)
            col.width = 120

        }

        return col
    })
}



export default out