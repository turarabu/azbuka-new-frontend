export default { catalog, items }


// Catalog sort
function catalog (catalog, items) {
    for ( let c of catalog ) {
        c.items = getItems(c.id, items)

        if ( c.filters && c.filters.length > 0 )
            c.filters = sortFilters(c.filters, c.items)

        if ( c.isCollection > 0 ) {
            for ( let c2 of catalog ) {
                if ( c2.collections === undefined )
                    c2.collections = []

                if ( c.parentId === c2.id && c.items.length > 0 ) {
                    c2.collections.push(c)
                }
            }
        }
    }

    return catalog
}

function getItems (id, items) {
    var list = []

    for ( let item of items ) {
        if ( item.parentId === id )
            list.push(item)
    }

    return list
}

function sortFilters (filters, items) {
    var props = getProps(items)

    for ( let filter of filters)
        filter = filterValues(filter, props)

    return filters
}

function filterValues (filter, props) {
    if ( props[filter.prop] === undefined )
        props[filter.prop] = [0]

    if ( filter.type === 'range' )
        return Object.assign(filter, {
            key: 'prop',
            max: Math.max( ...props[filter.prop] ),
            min: Math.min( ...props[filter.prop] )
        })

    else return Object.assign(filter, {
        key: 'prop',
        options: props[filter.prop]
    })
}

function getProps (items) {
    var props = []
    var result = {}

    for ( let item of items ) {
        for ( let prop of item.properties ) {
            if ( prop.childs && prop.childs.length > 0 )
                props.push( ...prop.childs )
            
            else props.push( prop )
        }
    }

    for ( let prop of props ) {
        if ( result[prop.id] === undefined )
            result[prop.id] = [prop.value]

        else if ( result[prop.id].includes(prop.value) === false )
            result[prop.id].push(prop.value)
    }

    return result
}


// Items sort
function items (items) {
    for ( let item of items )
        item.prices = sortPrices(item)

    return items
}

function sortPrices (item) {
    var prices = {
        discounts: [],
        maxs: [],
        mins: []
    }

    if ( item.specs[0] === undefined ) {
        return {
            discounts: [0],
            maxs: [0],
            mins: [0]
        }
    }

    for (let option of item.specs[0].options ) {
        let discount = Math.max( ...getDiscounts(option) )

        prices.discounts.push( discount )
        prices.maxs.push( option.prices.current )
        prices.mins.push( (100 - discount) / 100 * option.prices.current )
    }

    return prices
}

function getDiscounts (option) {
    var discounts = [0]

    for ( let discount of option.prices.discounts )
        discounts.push(discount.discount)

    return discounts
}