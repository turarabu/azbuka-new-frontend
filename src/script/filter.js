export default {
    items: filterItems,
    range: filterRange,
    select: filterSelect,
    search: filterSearch
}

function filterItems (items, filters) {
    var list = items

    for ( let filter of filters )
        list = responses.call(this, filter, list)

    return list
}

function responses (filter, items) {
    var list = []

    for ( let item of items ) {
        let value = get(filter.key, item, filter.prop)

        if (value === false)
            continue

        else if ( this[filter.type](value, filter) === true )
            list.push(item)
    }

    return list
}

function filterRange (value, filter) {
    return value >= filter.min && value <= filter.max
}

function filterSelect (value, filter) {
    return filter.options.includes(value)
}

function filterSearch (value, filter) {
    return value.toLowerCase().search( filter.text.toLowerCase() ) >= 0
}

function get (type, item, prop) {
    if (type === 'root')
        return rootProp(item, prop)

    else if (type === 'prop')
        return childProp(item, prop)

    return false
}

function rootProp (item, prop) {
    var keys = prop.split('.')

    for ( let key of keys )
        item = item[key]

    return item
}

function childProp (item, prop) {
    var props = []

    for ( let itemProp of item.properties ) {
        if ( itemProp.childs && itemProp.childs.length > 0 )
            props.push( ...itemProp.childs )
        else props.push( itemProp )
    }

    for ( let checkProp of props ) {
        if ( checkProp.id === prop )
            return checkProp.value
    }

    return false
}