export function flex( {just = 'center', direction = 'row', align = 'center', wrap = 'nowrap'} ) {
    return `display: flex; justify-content: ${just}; align-items: ${align}; flex-direction: ${direction}; flex-wrap: ${wrap};`;
}